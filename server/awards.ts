// Driver Rewards automation — the engine that actually hands out the awards.
//
// One cycle:
//   1. pull active drivers from the CRM + this month's fleet snapshot (Samsara)
//   2. build a DriverStats snapshot per driver (tenure from the CRM, miles/MPG/safety
//      from the fleet provider) and rank the fleet for the cohort rules
//   3. evaluate the reward matrix in src/data/rewardsProgram.ts
//   4. write every NEW award to the driver_awards ledger (unique on
//      driver + rule + period, so nothing is ever awarded twice)
//   5. email the driver their digital certificate(s)
//   6. Telegram the team for every physical item, and queue it for shipping
//
// Run it nightly (server/index.ts) or on demand via POST /api/rewards/run.

import { storage } from "./storage";
import {
  evaluateRewards,
  ALL_RULES,
  ruleCadence,
  type DriverStats,
  type EarnedAward,
  type Reward,
  type RewardRule,
} from "../src/data/rewardsProgram";
import { getFleetSnapshot, statsForDriver, type FleetSnapshot } from "./fleetProvider";
import { appBaseUrl, sendEmail, sendTelegramNotification } from "./notify";
import type { Driver } from "../shared/schema";

const RULE_BY_ID = new Map<string, RewardRule>(ALL_RULES.map((r) => [r.id, r]));

/** Ledger rows created during a single run, so email/notify results can be written back. */
interface PendingRow { driverId: number; awardId: number; hasDigital: boolean; hasGift: boolean }

export interface AwardRunOptions {
  /** Override "now" — used by tests and by manual back-dated runs. */
  now?: Date;
  /** false = seed the ledger silently (no emails, no Telegram, no shipping queue).
   *  Use this for the very first run so existing drivers do not get a backlog blast. */
  notify?: boolean;
  /** Evaluate and report, but write nothing and send nothing. */
  dryRun?: boolean;
}

export interface AwardRunSummary {
  ranAt: string;
  period: string;
  fleetSource: FleetSnapshot["source"];
  driversEvaluated: number;
  newAwards: number;
  emailsSent: number;
  emailsFailed: number;
  giftsQueued: number;
  dryRun: boolean;
  notified: boolean;
  warnings: string[];
  awards: Array<{ driver: string; ruleId: string; event: string; period: string; kinds: string[] }>;
}

function daysSince(d: Date | string | null | undefined, now: Date): number {
  if (!d) return 0;
  const t = new Date(d).getTime();
  if (Number.isNaN(t)) return 0;
  return Math.max(0, Math.floor((now.getTime() - t) / 86_400_000));
}

function esc(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string),
  );
}

/** Not every digital reward is a certificate — "leaderboard eligible" and portal
 *  badges are recorded in the ledger and shown in the driver portal, but they do
 *  not generate a certificate or an email. Only actual certificates do. */
function isCertificate(reward: Reward): boolean {
  return reward.kind === "digital" && /certificate/i.test(reward.label);
}

/** Human title for the certificate: prefer the reward's own wording. */
function certTitle(rule: RewardRule, reward: Reward): string {
  const label = reward.label.trim();
  if (/certificate/i.test(label)) {
    return label.charAt(0).toUpperCase() + label.slice(1);
  }
  return rule.event;
}

function buildCertUrl(base: string, o: {
  name: string; title: string; subtitle: string; category: string; date: string; certId: string;
}): string {
  const q = new URLSearchParams({
    name: o.name, title: o.title, subtitle: o.subtitle,
    category: o.category, date: o.date, certId: o.certId,
  });
  return `${base}/api/rewards/certificate?${q.toString()}`;
}

/** Rank helper: 1 = best. Only drivers with a value are ranked. */
function rankBy<T>(items: T[], value: (t: T) => number | undefined): Map<T, number> {
  const scored = items
    .map((item) => ({ item, v: value(item) }))
    .filter((x): x is { item: T; v: number } => typeof x.v === "number" && Number.isFinite(x.v))
    .sort((a, b) => b.v - a.v);
  const out = new Map<T, number>();
  scored.forEach((x, i) => out.set(x.item, i + 1));
  return out;
}

/**
 * Run one award cycle. Safe to call repeatedly - the ledger makes it idempotent.
 */
async function runAwardCycleInner(opts: AwardRunOptions = {}): Promise<AwardRunSummary> {
  const now = opts.now ?? new Date();
  const notify = opts.notify !== false;
  const dryRun = opts.dryRun === true;
  const base = appBaseUrl();

  const pendingRows: PendingRow[] = [];

  // Monthly rules are always judged on the last COMPLETE month (see getFleetSnapshot).
  const snapshot = await getFleetSnapshot(now);
  const period = snapshot.periodKey;

  const summary: AwardRunSummary = {
    ranAt: now.toISOString(),
    period,
    fleetSource: snapshot.source,
    driversEvaluated: 0,
    newAwards: 0,
    emailsSent: 0,
    emailsFailed: 0,
    giftsQueued: 0,
    dryRun,
    notified: notify && !dryRun,
    warnings: [],
    awards: [],
  };

  summary.fleetSource = snapshot.source;
  summary.warnings.push(...snapshot.warnings);

  const allDrivers = await storage.getDrivers();
  const drivers = allDrivers.filter((d) => d.status === "active");
  summary.driversEvaluated = drivers.length;

  // --- Build a stats snapshot per driver -----------------------------------
  const stats = new Map<number, DriverStats>();
  for (const d of drivers) {
    const fleet = statsForDriver(snapshot, d);
    const tenureDays = daysSince(d.hireDate, now);
    stats.set(d.id, {
      status: "active",
      driverType: d.driverType === "owner_operator" ? "owner_operator" : "company",
      tenureDays,
      tenureYears: Math.floor(tenureDays / 365),
      lifetimeMiles: fleet?.lifetimeMiles,
      safeMiles: fleet?.safeMiles ?? fleet?.lifetimeMiles,
      monthlyMpg: fleet?.mpg,
      priorMonthMpg: fleet?.priorMpg,
      idlePct: fleet?.idlePct,
      violationsMonth: fleet?.violationsMonth,
    });
  }

  // --- Cohort ranks (Top-3 MPG, best safety score) -------------------------
  const companyDrivers = drivers.filter((d) => d.driverType !== "owner_operator");
  const mpgRanks = rankBy(companyDrivers, (d) => stats.get(d.id)?.monthlyMpg);
  const safetyRanks = rankBy(drivers, (d) => statsForDriver(snapshot, d)?.safetyScore);
  for (const d of drivers) {
    const s = stats.get(d.id)!;
    s.mpgRank = mpgRanks.get(d);
    s.safetyRank = safetyRanks.get(d);
  }

  // Most-Improved MPG (MPG-03) has no per-driver test — it is a single winner.
  let mostImprovedId: number | undefined;
  let bestDelta = 0;
  for (const d of companyDrivers) {
    const s = stats.get(d.id)!;
    if (!s.monthlyMpg || !s.priorMonthMpg) continue;
    const delta = s.monthlyMpg - s.priorMonthMpg;
    if (delta > bestDelta) {
      bestDelta = delta;
      mostImprovedId = d.id;
    }
  }

  // --- Evaluate + persist ---------------------------------------------------
  const perDriverDigital = new Map<number, Array<{ rule: RewardRule; category: string; reward: Reward; url: string }>>();
  const perDriverGifts = new Map<number, Array<{ rule: RewardRule; reward: Reward }>>();

  for (const driver of drivers) {
    const s = stats.get(driver.id)!;
    const earned: EarnedAward[] = evaluateRewards(s);

    if (driver.id === mostImprovedId) {
      const rule = RULE_BY_ID.get("MPG-03");
      if (rule) {
        earned.push({ ruleId: rule.id, event: rule.event, category: "Fuel Efficiency (MPG)", rewards: rule.rewards });
      }
    }

    for (const award of earned) {
      const rule = RULE_BY_ID.get(award.ruleId);
      if (!rule) continue;
      const periodKey = ruleCadence(rule) === "monthly" ? period : "once";
      const fullName = `${driver.firstName} ${driver.lastName}`;
      const certId = `${rule.id}-${periodKey}-${String(driver.id).padStart(5, "0")}`.toUpperCase();

      const certificates = award.rewards.filter(isCertificate);
      const branded = award.rewards.filter((r) => r.kind === "branded");
      const dateLabel = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
      const primaryCertUrl = certificates.length
        ? buildCertUrl(base, {
            name: fullName,
            title: certTitle(rule, certificates[0]),
            subtitle: rule.when,
            category: award.category,
            date: dateLabel,
            certId,
          })
        : "";

      if (dryRun) {
        summary.newAwards++;
        summary.awards.push({
          driver: fullName, ruleId: rule.id, event: rule.event, period: periodKey,
          kinds: award.rewards.map((r) => r.kind),
        });
        continue;
      }

      // The unique index does the deduplication: no row back = already awarded.
      const created = await storage.createDriverAward({
        driverId: driver.id,
        ruleId: rule.id,
        periodKey,
        event: rule.event,
        category: award.category,
        rewards: award.rewards,
        certId: certificates.length ? certId : null,
        certUrl: primaryCertUrl || null,
        fulfillment: branded.length && notify ? "pending" : "none",
        fulfillmentNote: branded.length && !notify ? "seeded — not queued for shipping" : null,
        fulfilledAt: null,
        emailStatus: !notify ? "skipped" : certificates.length ? "pending" : "skipped",
        emailError: null,
        teamNotified: false,
      });
      if (!created) continue; // already granted in an earlier run

      summary.newAwards++;
      summary.awards.push({
        driver: fullName, ruleId: rule.id, event: rule.event, period: periodKey,
        kinds: award.rewards.map((r) => r.kind),
      });

      if (!notify) continue;

      if (certificates.length) {
        const list = perDriverDigital.get(driver.id) ?? [];
        for (const reward of certificates) {
          list.push({
            rule,
            category: award.category,
            reward,
            url: buildCertUrl(base, {
              name: fullName,
              title: certTitle(rule, reward),
              subtitle: rule.when,
              category: award.category,
              date: dateLabel,
              certId,
            }),
          });
        }
        perDriverDigital.set(driver.id, list);
      }
      if (branded.length) {
        const list = perDriverGifts.get(driver.id) ?? [];
        for (const reward of branded) list.push({ rule, reward });
        perDriverGifts.set(driver.id, list);
        summary.giftsQueued += branded.length;
      }

      // Remember the row so we can stamp the email/notify result below.
      pendingRows.push({ driverId: driver.id, awardId: created.id, hasDigital: certificates.length > 0, hasGift: branded.length > 0 });
    }
  }

  // --- Driver emails: one message per driver, all their new certificates ----
  for (const driver of drivers) {
    const items = perDriverDigital.get(driver.id);
    if (!items || !items.length) continue;
    const rows = pendingRows.filter((r) => r.driverId === driver.id && r.hasDigital);

    if (!driver.email) {
      for (const r of rows) await storage.updateDriverAward(r.awardId, { emailStatus: "skipped", emailError: "no email on file" });
      summary.warnings.push(`${driver.firstName} ${driver.lastName} earned ${items.length} award(s) but has no email on file.`);
      continue;
    }

    try {
      await sendEmail({
        to: driver.email,
        subject: items.length === 1
          ? `You earned it — ${items[0].rule.event}`
          : `You earned ${items.length} new XXII Century awards`,
        html: awardEmailHTML(driver, items, base),
      });
      for (const r of rows) await storage.updateDriverAward(r.awardId, { emailStatus: "sent" });
      summary.emailsSent++;
    } catch (err: any) {
      const message = String(err?.message || err).slice(0, 500);
      for (const r of rows) await storage.updateDriverAward(r.awardId, { emailStatus: "failed", emailError: message });
      summary.emailsFailed++;
      summary.warnings.push(`email to ${driver.email} failed: ${message}`);
    }
  }

  // --- Team notification: physical items that now need shipping ------------
  for (const driver of drivers) {
    const gifts = perDriverGifts.get(driver.id);
    if (!gifts || !gifts.length) continue;
    const lines = gifts.map((g) => `• <b>${esc(g.reward.label)}</b>\n   (${esc(g.rule.event)})`).join("\n");
    await sendTelegramNotification(
      `🎁 <b>PHYSICAL GIFT REQUIRED</b>\n` +
        `Driver: <b>${esc(driver.firstName)} ${esc(driver.lastName)}</b>\n` +
        `Truck: ${esc(driver.truckNumber || "N/A")}\n` +
        `Phone: ${esc(driver.phone || "N/A")}\n\n` +
        `${lines}\n\n` +
        `Mark it shipped: ${base}/portal/rewards\n` +
        `Time: ${now.toLocaleString("en-US", { timeZone: "America/Chicago" })}`,
    );
    for (const r of pendingRows.filter((x) => x.driverId === driver.id && x.hasGift)) {
      await storage.updateDriverAward(r.awardId, { teamNotified: true });
    }
  }

  if (notify && !dryRun && summary.newAwards > 0) {
    await sendTelegramNotification(
      `🏆 <b>Rewards run — ${esc(period)}</b>\n` +
        `New awards: ${summary.newAwards}\n` +
        `Certificate emails sent: ${summary.emailsSent}${summary.emailsFailed ? ` (failed: ${summary.emailsFailed})` : ""}\n` +
        `Gifts queued: ${summary.giftsQueued}\n` +
        `Fleet data: ${summary.fleetSource}`,
    );
  }

  console.log(
    `[rewards] ${period} run: ${summary.newAwards} new award(s), ${summary.emailsSent} email(s), ` +
      `${summary.giftsQueued} gift(s) queued, fleet=${summary.fleetSource}${dryRun ? " (dry run)" : ""}`,
  );
  return summary;
}

function awardEmailHTML(
  driver: Driver,
  items: Array<{ rule: RewardRule; category: string; reward: Reward; url: string }>,
  base: string,
): string {
  const cards = items
    .map(
      (i) => `
        <div style="background:#111c2e;border:1px solid #24344d;border-radius:10px;padding:18px 20px;margin-bottom:14px;">
          <p style="margin:0;color:#2ec478;font-size:11px;letter-spacing:2px;font-weight:700;">${esc(i.category)}</p>
          <p style="margin:6px 0 2px;color:#ffffff;font-size:17px;font-weight:700;">${esc(i.rule.event)}</p>
          <p style="margin:0 0 14px;color:#8b9bb4;font-size:13px;">${esc(i.reward.label)}</p>
          <a href="${i.url}" style="display:inline-block;background:#265ee1;color:#fff;text-decoration:none;padding:11px 24px;border-radius:8px;font-weight:600;font-size:13px;">View &amp; print certificate</a>
        </div>`,
    )
    .join("");

  const portalLink = driver.surveyToken ? `${base}/loyalty/${driver.surveyToken}` : `${base}/loyalty`;

  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#1a2332;color:#e2e8f0;padding:40px 30px;border-radius:12px;">
    <div style="text-align:center;margin-bottom:28px;">
      <h1 style="font-family:Oswald,Arial,sans-serif;font-size:24px;margin:0;color:#ffffff;">XXII CENTURY</h1>
      <p style="color:#8b9bb4;font-size:12px;letter-spacing:2px;margin-top:4px;">DRIVER REWARDS</p>
    </div>
    <p style="font-size:16px;color:#e2e8f0;">Hey ${esc(driver.firstName)},</p>
    <p style="color:#8b9bb4;font-size:14px;line-height:1.6;">
      Your miles just earned you something. ${items.length === 1 ? "Here is your new award" : `Here are your ${items.length} new awards`} —
      the certificate${items.length === 1 ? "" : "s"} below ${items.length === 1 ? "is" : "are"} yours to keep, print and hang in the cab.
    </p>
    ${cards}
    <p style="color:#8b9bb4;font-size:13px;line-height:1.6;">
      Any branded gear tied to this milestone is already on its way — our team packs and ships it from the office.
    </p>
    <div style="text-align:center;margin:26px 0 10px;">
      <a href="${portalLink}" style="color:#5b9bff;font-size:13px;text-decoration:none;">See all your rewards and progress →</a>
    </div>
    <hr style="border:none;border-top:1px solid #2d3748;margin:26px 0;" />
    <p style="color:#5a6a7e;font-size:11px;text-align:center;">XXII Century Trucking — goxxii.com</p>
  </div>`;
}

// Only one writing cycle at a time: the daily timer and the portal button must not
// overlap, or two runs could email the same driver twice before either has written
// its ledger rows. Dry runs write nothing, so they are never blocked.
let cycleInProgress = false;

export async function runAwardCycle(opts: AwardRunOptions = {}): Promise<AwardRunSummary> {
  const writes = opts.dryRun !== true;
  if (writes && cycleInProgress) {
    throw new Error("An award cycle is already running");
  }
  if (writes) cycleInProgress = true;
  try {
    return await runAwardCycleInner(opts);
  } finally {
    if (writes) cycleInProgress = false;
  }
}
