import { Router } from "express";
import { requireAuth } from "./auth";
import { storage } from "./storage";
import { insertDriverSchema, insertCheckInSchema, insertLeadSchema } from "../shared/schema";
import {
  evaluateRewards,
  REWARD_PROGRAM,
  ALL_RULES,
  type DriverStats,
} from "../src/data/rewardsProgram";
import { renderCertificateHTML } from "./certificate";
import { sendTelegramNotification, sendEmail, appBaseUrl } from "./notify";
import { runAwardCycle } from "./awards";
import crypto from "crypto";

/** Constant-time secret comparison, so the cron secret can't be recovered by
 *  timing how long a wrong guess takes to reject. */
function secretMatches(given: string | undefined, expected: string): boolean {
  if (!given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function generateToken(): string {
  return crypto.randomBytes(24).toString("hex");
}

export function registerRoutes(router: Router) {
  router.get("/api/portal/stats", requireAuth, async (_req, res, next) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (err) { next(err); }
  });

  router.get("/api/portal/drivers", requireAuth, async (_req, res, next) => {
    try {
      const drivers = await storage.getDrivers();
      res.json(drivers);
    } catch (err) { next(err); }
  });

  router.get("/api/portal/drivers/:id", requireAuth, async (req, res, next) => {
    try {
      const driver = await storage.getDriver(Number(req.params.id));
      if (!driver) return res.status(404).json({ message: "Driver not found" });
      res.json(driver);
    } catch (err) { next(err); }
  });

  router.post("/api/portal/drivers", requireAuth, async (req, res, next) => {
    try {
      const body = { ...req.body };
      if (typeof body.hireDate === "string") body.hireDate = new Date(body.hireDate);
      body.surveyToken = generateToken();
      const parsed = insertDriverSchema.parse(body);
      const driver = await storage.createDriver(parsed);
      res.json(driver);
    } catch (err) { next(err); }
  });

  router.patch("/api/portal/drivers/:id", requireAuth, async (req, res, next) => {
    try {
      const allowedFields = ["firstName", "lastName", "phone", "email", "status", "truckNumber", "recruiter", "notes"];
      const sanitized: Record<string, any> = {};
      for (const key of allowedFields) {
        if (req.body[key] !== undefined) sanitized[key] = req.body[key];
      }
      if (req.body.hireDate) sanitized.hireDate = new Date(req.body.hireDate);
      const driver = await storage.updateDriver(Number(req.params.id), sanitized);
      if (!driver) return res.status(404).json({ message: "Driver not found" });
      res.json(driver);
    } catch (err) { next(err); }
  });

  router.post("/api/portal/drivers/:id/regenerate-token", requireAuth, async (req, res, next) => {
    try {
      const driver = await storage.updateDriver(Number(req.params.id), { surveyToken: generateToken() });
      if (!driver) return res.status(404).json({ message: "Driver not found" });
      res.json(driver);
    } catch (err) { next(err); }
  });

  router.delete("/api/portal/drivers/:id", requireAuth, async (req, res, next) => {
    try {
      await storage.deleteDriver(Number(req.params.id));
      res.json({ ok: true });
    } catch (err) { next(err); }
  });

  router.get("/api/portal/check-ins", requireAuth, async (req, res, next) => {
    try {
      const driverId = req.query.driverId ? Number(req.query.driverId) : undefined;
      const checkIns = await storage.getCheckIns(driverId);
      res.json(checkIns);
    } catch (err) { next(err); }
  });

  router.get("/api/portal/check-ins/:id", requireAuth, async (req, res, next) => {
    try {
      const checkIn = await storage.getCheckIn(Number(req.params.id));
      if (!checkIn) return res.status(404).json({ message: "Check-in not found" });
      res.json(checkIn);
    } catch (err) { next(err); }
  });

  router.post("/api/portal/check-ins", requireAuth, async (req, res, next) => {
    try {
      const body = { ...req.body };
      if (typeof body.completedAt === "string") body.completedAt = new Date(body.completedAt);
      const parsed = insertCheckInSchema.parse(body);
      const checkIn = await storage.createCheckIn(parsed);
      await recalculateDriverScore(checkIn.driverId);

      if (checkIn.status === "completed") {
        await scheduleNextSurveyEmail(checkIn.driverId, checkIn.checkInType);
        const d = await storage.getDriver(checkIn.driverId);
        if (d) {
          sendTelegramNotification(`✅ <b>Survey Completed (Portal)</b>\nDriver: ${d.firstName} ${d.lastName}\nWeek: ${checkIn.checkInType}\nTime: ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}`);
        }
      }

      res.json(checkIn);
    } catch (err) { next(err); }
  });

  router.patch("/api/portal/check-ins/:id", requireAuth, async (req, res, next) => {
    try {
      const allowedFields = ["status", "responses", "completedAt"];
      const sanitized: Record<string, any> = {};
      for (const key of allowedFields) {
        if (req.body[key] !== undefined) sanitized[key] = req.body[key];
      }
      if (typeof sanitized.completedAt === "string") sanitized.completedAt = new Date(sanitized.completedAt);
      const checkIn = await storage.updateCheckIn(Number(req.params.id), sanitized);
      if (!checkIn) return res.status(404).json({ message: "Check-in not found" });
      if (checkIn.status === "completed") {
        await recalculateDriverScore(checkIn.driverId);
        await scheduleNextSurveyEmail(checkIn.driverId, checkIn.checkInType);
        const d = await storage.getDriver(checkIn.driverId);
        if (d) {
          sendTelegramNotification(`✅ <b>Survey Completed (Portal Update)</b>\nDriver: ${d.firstName} ${d.lastName}\nWeek: ${checkIn.checkInType}\nTime: ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}`);
        }
      }
      res.json(checkIn);
    } catch (err) { next(err); }
  });

  // ===== PUBLIC SURVEY ENDPOINTS =====

  router.get("/api/survey/:token", async (req, res, next) => {
    try {
      const driver = await storage.getDriverByToken(req.params.token);
      if (!driver) return res.status(404).json({ message: "Survey not found" });

      const checkIns = await storage.getCheckIns(driver.id);
      const completedTypes = checkIns
        .filter(c => c.status === "completed")
        .map(c => c.checkInType);

      const weekOrder = ["week1", "week2", "week3", "week4"];
      const nextWeek = weekOrder.find(w => !completedTypes.includes(w));

      res.json({
        driver: {
          id: driver.id,
          firstName: driver.firstName,
          lastName: driver.lastName,
          truckNumber: driver.truckNumber,
        },
        completedWeeks: completedTypes,
        nextWeek,
        allComplete: weekOrder.every(w => completedTypes.includes(w)),
      });
    } catch (err) { next(err); }
  });

  router.post("/api/survey/:token/submit", async (req, res, next) => {
    try {
      const driver = await storage.getDriverByToken(req.params.token);
      if (!driver) return res.status(404).json({ message: "Survey not found" });

      const { checkInType, responses } = req.body;
      if (!checkInType || !responses) {
        return res.status(400).json({ message: "Missing checkInType or responses" });
      }

      const validTypes = ["week1", "week2", "week3", "week4"];
      if (!validTypes.includes(checkInType)) {
        return res.status(400).json({ message: "Invalid check-in type" });
      }

      const existing = await storage.getCheckIns(driver.id);
      const alreadyDone = existing.find(c => c.checkInType === checkInType && c.status === "completed");
      if (alreadyDone) {
        return res.status(400).json({ message: "This survey has already been completed" });
      }

      const weekOrder = ["week1", "week2", "week3", "week4"];
      const completedTypes = existing.filter(c => c.status === "completed").map(c => c.checkInType);
      const nextWeekIndex = weekOrder.findIndex(w => !completedTypes.includes(w));
      const expectedNext = nextWeekIndex >= 0 ? weekOrder[nextWeekIndex] : null;
      if (expectedNext && checkInType !== expectedNext) {
        return res.status(400).json({ message: `Please complete ${expectedNext} first` });
      }

      const checkIn = await storage.createCheckIn({
        driverId: driver.id,
        checkInType,
        status: "completed",
        completedAt: new Date(),
        responses,
      });

      await recalculateDriverScore(driver.id);

      await scheduleNextSurveyEmail(driver.id, checkInType);

      sendTelegramNotification(`✅ <b>Survey Submitted</b>\nDriver: ${driver.firstName} ${driver.lastName}\nEmail: ${driver.email || "N/A"}\nWeek: ${checkInType}\nTime: ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}`);

      res.json({ success: true, checkInId: checkIn.id });
    } catch (err) { next(err); }
  });

  router.get("/api/survey/:token/:week", async (req, res, next) => {
    try {
      const driver = await storage.getDriverByToken(req.params.token);
      if (!driver) return res.status(404).json({ message: "Survey not found" });

      const validWeeks = ["week1", "week2", "week3", "week4", "exit"];
      const week = req.params.week;
      if (!validWeeks.includes(week)) {
        return res.status(400).json({ message: "Invalid week" });
      }

      const checkIns = await storage.getCheckIns(driver.id);
      const completedTypes = checkIns
        .filter(c => c.status === "completed")
        .map(c => c.checkInType);

      const alreadyCompleted = completedTypes.includes(week);

      res.json({
        driver: {
          id: driver.id,
          firstName: driver.firstName,
          lastName: driver.lastName,
          truckNumber: driver.truckNumber,
        },
        week,
        alreadyCompleted,
        completedWeeks: completedTypes,
      });
    } catch (err) { next(err); }
  });

  router.post("/api/survey/:token/:week/submit", async (req, res, next) => {
    try {
      const driver = await storage.getDriverByToken(req.params.token);
      if (!driver) return res.status(404).json({ message: "Survey not found" });

      const validWeeks = ["week1", "week2", "week3", "week4", "exit"];
      const week = req.params.week;
      if (!validWeeks.includes(week)) {
        return res.status(400).json({ message: "Invalid week" });
      }

      const { responses } = req.body;
      if (!responses) {
        return res.status(400).json({ message: "Missing responses" });
      }

      const existing = await storage.getCheckIns(driver.id);
      const alreadyDone = existing.find(c => c.checkInType === week && c.status === "completed");
      if (alreadyDone) {
        return res.status(400).json({ message: "This week's survey has already been completed" });
      }

      const checkIn = await storage.createCheckIn({
        driverId: driver.id,
        checkInType: week,
        status: "completed",
        completedAt: new Date(),
        responses,
      });

      await recalculateDriverScore(driver.id);

      await scheduleNextSurveyEmail(driver.id, week);

      sendTelegramNotification(`✅ <b>Survey Submitted</b>\nDriver: ${driver.firstName} ${driver.lastName}\nEmail: ${driver.email || "N/A"}\nWeek: ${week}\nTime: ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}`);

      res.json({ success: true, checkInId: checkIn.id });
    } catch (err) { next(err); }
  });

  router.post("/api/survey/register", async (req, res, next) => {
    try {
      const { firstName, lastName, phone, email, truckNumber, recruiter } = req.body;
      if (!firstName || !lastName) {
        return res.status(400).json({ message: "First name and last name are required" });
      }

      const token = generateToken();
      const driver = await storage.createDriver({
        firstName,
        lastName,
        phone: phone || null,
        email: email || null,
        truckNumber: truckNumber || null,
        recruiter: recruiter || null,
        hireDate: new Date(),
        status: "active",
        surveyToken: token,
      });

      sendTelegramNotification(`🆕 <b>New Driver Registered</b>\nDriver: ${driver.firstName} ${driver.lastName}\nEmail: ${driver.email || "N/A"}\nPhone: ${driver.phone || "N/A"}\nTruck: ${driver.truckNumber || "N/A"}\nRecruiter: ${driver.recruiter || "N/A"}\nTime: ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}`);

      res.json({ success: true, token: driver.surveyToken, driverId: driver.id });
    } catch (err) { next(err); }
  });

  // ===== LEAD LOGGING =====
  // Public: log lead to DB. Frontends call this in parallel with any external webhook.
  const ALLOWED_SOURCES = new Set([
    "website-qualify-form",
    "website-fleet-contact",
    "website-inline-lead",
    "website-lead-dialog",
    "website-driver-funnel",
    "website-contact-form",
    "website-estimate-form",
    "website-freight-quote",
    "other",
  ]);

  function clean(v: unknown, max = 500): string | null {
    if (v === undefined || v === null) return null;
    const s = String(v).trim();
    if (!s) return null;
    return s.slice(0, max);
  }

  router.post("/api/leads", async (req, res) => {
    try {
      const body = req.body || {};
      const name = clean(body.name, 255);
      const phone = clean(body.phone, 50);
      const message = clean(body.message, 2000);
      const email = clean(body.email, 255);
      const vehicle = clean(body.vehicle, 255);
      const recruiter = clean(body.recruiter, 100);
      const rawSource = clean(body.source, 100) || "other";
      const source = ALLOWED_SOURCES.has(rawSource) ? rawSource : "other";

      if (!name || !phone) {
        return res.status(400).json({ success: false, message: "name and phone are required" });
      }

      const lead = await storage.createLead({
        name, phone, email, vehicle, message, source, recruiter,
        payload: body,
      });

      sendTelegramNotification(
        `📥 <b>New Lead</b>\n` +
        `<b>Name:</b> ${name}\n` +
        `<b>Phone:</b> ${phone}\n` +
        (email ? `<b>Email:</b> ${email}\n` : "") +
        (vehicle ? `<b>Vehicle:</b> ${vehicle}\n` : "") +
        (recruiter ? `<b>Recruiter:</b> ${recruiter}\n` : "") +
        `<b>Source:</b> ${source}\n` +
        (message ? `<b>Message:</b> ${message.slice(0, 300)}\n` : "")
      );

      res.json({ success: true, id: lead.id });
    } catch (err: any) {
      console.error("Lead insert error:", err);
      res.status(500).json({ success: false, message: "Failed to save lead" });
    }
  });

  // Admin: list all leads. Bearer token from LEADS_ADMIN_TOKEN.
  router.get("/api/leads", async (req, res) => {
    try {
      const token = process.env.LEADS_ADMIN_TOKEN;
      if (!token) return res.status(500).json({ message: "LEADS_ADMIN_TOKEN not configured" });
      const auth = req.headers.authorization || "";
      if (auth !== `Bearer ${token}`) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const leads = await storage.getLeads();
      res.json({ count: leads.length, leads });
    } catch (err) {
      console.error("Lead fetch error:", err);
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  router.post("/api/qualify", async (req, res, next) => {
    try {
      const recruiterWebhooks: Record<string, string> = {
        ben: "https://cdlagency.app.n8n.cloud/webhook/b5f7191e-89be-47b8-8765-684f749af90e",
        milos: "https://cdlagency.app.n8n.cloud/webhook/556a9f88-17b9-4696-92a1-799e7d8a5333",
      };
      const recruiter = req.body.recruiter || "ben";
      const webhookUrl = recruiterWebhooks[recruiter] || recruiterWebhooks.ben;
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      res.json({ success: true, status: response.status });
    } catch (err) {
      console.error("Webhook proxy error:", err);
      res.status(500).json({ success: false, message: "Failed to send to webhook" });
    }
  });

  router.post("/api/portal/send-test-emails", requireAuth, async (req, res, next) => {
    try {
      const { email, firstName, token } = req.body;
      if (!email || !firstName || !token) {
        return res.status(400).json({ message: "Missing email, firstName, or token" });
      }
      const weeks = ["week1", "week2", "week3", "week4"];
      const results: { week: string; status: string }[] = [];
      for (const week of weeks) {
        try {
          await sendSurveyEmail(email, firstName, token, week);
          sendTelegramNotification(`🧪 <b>Test Email Sent</b>\nTo: ${firstName} (${email})\nWeek: ${week}\nTime: ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}`);
          results.push({ week, status: "sent" });
        } catch (err: any) {
          results.push({ week, status: `error: ${err.message}` });
        }
      }
      res.json({ results });
    } catch (err) { next(err); }
  });

  // Send survey emails (for Resend integration)
  router.post("/api/portal/send-survey-emails", requireAuth, async (_req, res, next) => {
    try {
      const allDrivers = await storage.getDrivers();
      const activeDrivers = allDrivers.filter(d => d.status === "active" && d.email && d.surveyToken);

      const results: { driverId: number; name: string; status: string; week?: string }[] = [];

      for (const driver of activeDrivers) {
        const checkIns = await storage.getCheckIns(driver.id);
        const completedTypes = checkIns.filter(c => c.status === "completed").map(c => c.checkInType);

        if (completedTypes.includes("week1")) {
          results.push({ driverId: driver.id, name: `${driver.firstName} ${driver.lastName}`, status: "already_started" });
          continue;
        }

        try {
          await sendSurveyEmail(driver.email!, driver.firstName, driver.surveyToken!, "week1");
          sendTelegramNotification(`📧 <b>Survey Email Sent (Manual)</b>\nDriver: ${driver.firstName} ${driver.lastName}\nEmail: ${driver.email}\nWeek: week1\nTime: ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}`);
          results.push({ driverId: driver.id, name: `${driver.firstName} ${driver.lastName}`, status: "sent", week: "week1" });
        } catch (emailErr: any) {
          results.push({ driverId: driver.id, name: `${driver.firstName} ${driver.lastName}`, status: `error: ${emailErr.message}` });
        }
      }

      res.json({ sent: results.filter(r => r.status === "sent").length, total: activeDrivers.length, results });
    } catch (err) { next(err); }
  });

  // ===== DRIVER REWARDS PROGRAM =====

  // Helper: days between hireDate and now.
  function daysSince(d?: Date | string | null): number {
    if (!d) return 0;
    const t = new Date(d).getTime();
    if (Number.isNaN(t)) return 0;
    return Math.max(0, Math.floor((Date.now() - t) / 86_400_000));
  }

  // Public: the full program matrix (for the marketing page / n8n reference).
  router.get("/api/rewards/program", (_req, res) => {
    res.json({ categories: REWARD_PROGRAM, rules: ALL_RULES.length });
  });

  // n8n engine: POST a driver stats snapshot, get every earned award back.
  // n8n populates the rank/event fields from fleet-wide data before calling.
  router.post("/api/rewards/evaluate", (req, res) => {
    const stats = (req.body || {}) as DriverStats;
    const earned = evaluateRewards(stats);
    res.json({ earned, count: earned.length });
  });

  // Public, no-login: a driver's personal rewards page data, keyed by their token.
  // Reuses the existing per-driver survey token — the email's "My Rewards" link carries it.
  router.get("/api/rewards/status/:token", async (req, res, next) => {
    try {
      const driver = await storage.getDriverByToken(req.params.token);
      if (!driver) return res.status(404).json({ found: false });

      const tenureDays = daysSince(driver.hireDate);
      const tenureYears = Math.floor(tenureDays / 365);
      // Only tenure/onboarding is derivable from the CRM. Fleet stats (miles, MPG,
      // safety) are supplied by n8n; when absent those awards simply don't show yet.
      const stats: DriverStats = {
        status: driver.status === "active" ? "active" : "inactive",
        tenureDays,
        tenureYears,
      };
      const earned = evaluateRewards(stats);

      // Progress toward the next tenure milestone, for the progress bars.
      const tenureTargets = [30, 60, 90, 182, 365, 730, 1095, 1825, 3650];
      const nextTarget = tenureTargets.find((t) => t > tenureDays) ?? null;

      // What the automation has actually granted (with certificate links).
      const granted = await storage.getDriverAwards(driver.id);

      res.json({
        found: true,
        driver: { firstName: driver.firstName, lastName: driver.lastName },
        stats: { tenureDays, tenureYears },
        earned,
        granted: granted.map((a) => ({
          ruleId: a.ruleId,
          event: a.event,
          category: a.category,
          rewards: a.rewards,
          certUrl: a.certUrl,
          awardedAt: a.createdAt,
          giftStatus: a.fulfillment,
        })),
        nextMilestone: nextTarget
          ? { target: nextTarget, current: tenureDays, remaining: nextTarget - tenureDays }
          : null,
      });
    } catch (err) { next(err); }
  });

  // ===== AWARD AUTOMATION =====

  // Runs one award cycle: evaluate every active driver, grant what is newly earned,
  // email the certificates, and ping the team for anything physical.
  // Auth: a logged-in portal user, or the cron secret header (for an external scheduler).
  //   ?dryRun=1  -> evaluate and report, write/send nothing
  //   ?notify=0  -> write the ledger silently (use this for the FIRST run, so existing
  //                 drivers do not get a backlog of emails and gift tickets)
  router.post("/api/rewards/run", async (req, res, next) => {
    const secret = process.env.REWARDS_CRON_SECRET;
    const headerSecret = req.get("x-cron-secret");
    const authed = typeof (req as any).isAuthenticated === "function" && (req as any).isAuthenticated();
    if (!authed && !(secret && secretMatches(headerSecret, secret))) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const isOn = (v: unknown) => v === "1" || v === "true" || v === true;
      const isOff = (v: unknown) => v === "0" || v === "false" || v === false;
      const notifyParam = req.query.notify ?? req.body?.notify;
      const summary = await runAwardCycle({
        dryRun: isOn(req.query.dryRun ?? req.body?.dryRun),
        notify: !isOff(notifyParam),
      });
      res.json(summary);
    } catch (err: any) {
      if (String(err?.message).includes("already running")) {
        return res.status(409).json({ message: "An award cycle is already running" });
      }
      next(err);
    }
  });

  // Portal: full award history (optionally for one driver).
  router.get("/api/portal/awards", requireAuth, async (req, res, next) => {
    try {
      const driverId = req.query.driverId ? Number(req.query.driverId) : undefined;
      if (driverId !== undefined && !Number.isInteger(driverId)) {
        return res.status(400).json({ error: "Invalid driverId" });
      }
      res.json(await storage.getDriverAwards(driverId));
    } catch (err) { next(err); }
  });

  // Portal: the physical-gift queue — everything the team still has to ship.
  router.get("/api/portal/gifts", requireAuth, async (_req, res, next) => {
    try {
      const pending = await storage.getPendingGifts();
      const drivers = await storage.getDrivers();
      const byId = new Map(drivers.map((d) => [d.id, d]));
      res.json(pending.map((a) => {
        const d = byId.get(a.driverId);
        return {
          ...a,
          driverName: d ? `${d.firstName} ${d.lastName}` : `Driver #${a.driverId}`,
          truckNumber: d?.truckNumber ?? null,
          phone: d?.phone ?? null,
        };
      }));
    } catch (err) { next(err); }
  });

  // Portal: mark a physical gift as shipped/handed over.
  router.post("/api/portal/gifts/:id/shipped", requireAuth, async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
      const note = typeof req.body?.note === "string" ? req.body.note.slice(0, 500) : null;
      const updated = await storage.updateDriverAward(id, {
        fulfillment: "shipped",
        fulfilledAt: new Date(),
        fulfillmentNote: note,
      });
      if (!updated) return res.status(404).json({ error: "Award not found" });
      res.json(updated);
    } catch (err) { next(err); }
  });

  // Certificate file: branded, print-ready HTML. n8n renders it to PDF/PNG and
  // attaches it to the driver's email; drivers can also open it to print.
  router.get("/api/rewards/certificate", (req, res) => {
    const name = String(req.query.name || "XXII Driver").slice(0, 80);
    const title = String(req.query.title || "Certificate of Achievement").slice(0, 80);
    const subtitle = req.query.subtitle ? String(req.query.subtitle).slice(0, 160) : undefined;
    const date =
      String(req.query.date || "").slice(0, 40) ||
      new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
    const certId = String(req.query.certId || "XXII-CERT").slice(0, 40);
    // Selects the per-category design (emblem, accent, copy). Unknown or missing
    // categories fall back to the neutral theme rather than failing.
    const category = req.query.category ? String(req.query.category).slice(0, 60) : undefined;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(renderCertificateHTML({ name, title, subtitle, category, date, certId }));
  });
}

async function scheduleNextSurveyEmail(driverId: number, justCompletedWeek: string) {
  try {
    const weekOrder = ["week1", "week2", "week3", "week4"];
    const justCompletedIndex = weekOrder.indexOf(justCompletedWeek);

    if (justCompletedIndex < 0 || justCompletedIndex >= weekOrder.length - 1) {
      await storage.updateDriver(driverId, { nextSurveyEmailAt: null });
      return;
    }

    const nextEmailDate = new Date();
    nextEmailDate.setDate(nextEmailDate.getDate() + 7);
    await storage.updateDriver(driverId, { nextSurveyEmailAt: nextEmailDate });
    console.log(`Scheduled next survey email for driver ${driverId} at ${nextEmailDate.toISOString()}`);
  } catch (err) {
    console.error(`Failed to schedule next survey email for driver ${driverId}:`, err);
  }
}

export async function processPendingSurveyEmails() {
  try {
    const allDrivers = await storage.getDrivers();
    const now = new Date();

    const dueDrivers = allDrivers.filter(d =>
      d.status === "active" &&
      d.email &&
      d.surveyToken &&
      d.nextSurveyEmailAt &&
      new Date(d.nextSurveyEmailAt) <= now
    );

    for (const driver of dueDrivers) {
      try {
        const checkIns = await storage.getCheckIns(driver.id);
        const completedTypes = checkIns.filter(c => c.status === "completed").map(c => c.checkInType);
        const weekOrder = ["week1", "week2", "week3", "week4"];
        const nextWeek = weekOrder.find(w => !completedTypes.includes(w));

        if (!nextWeek) {
          await storage.updateDriver(driver.id, { nextSurveyEmailAt: null });
          continue;
        }

        await sendSurveyEmail(driver.email!, driver.firstName, driver.surveyToken!, nextWeek);
        await storage.updateDriver(driver.id, { nextSurveyEmailAt: null });
        sendTelegramNotification(`📧 <b>Survey Email Sent (Auto-Scheduled)</b>\nDriver: ${driver.firstName} ${driver.lastName}\nEmail: ${driver.email}\nWeek: ${nextWeek}\nTime: ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })}`);
        console.log(`Auto-sent ${nextWeek} survey email to ${driver.firstName} ${driver.lastName}`);
      } catch (emailErr) {
        console.error(`Failed to send scheduled email to driver ${driver.id}:`, emailErr);
      }
    }

    if (dueDrivers.length > 0) {
      console.log(`Processed ${dueDrivers.length} scheduled survey emails`);
    }
  } catch (err) {
    console.error("Error processing pending survey emails:", err);
  }
}

async function sendSurveyEmail(email: string, firstName: string, token: string, week: string) {
  const surveyUrl = `${appBaseUrl()}/survey/${token}`;
  const weekLabels: Record<string, string> = {
    week1: "Week 1 — Seamless Start",
    week2: "Week 2 — Operational Flow",
    week3: "Week 3 — Settling In",
    week4: "Week 4 — Partnership Fit",
  };

  await sendEmail({
    to: email,
    subject: `XXII Century — ${weekLabels[week] || week} Check-In`,
    html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #1a2332; color: #e2e8f0; padding: 40px 30px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-family: Oswald, Arial, sans-serif; font-size: 24px; margin: 0; color: #ffffff;">XXII CENTURY</h1>
            <p style="color: #8b9bb4; font-size: 12px; letter-spacing: 2px; margin-top: 4px;">TRUCKING</p>
          </div>
          <p style="font-size: 16px; color: #e2e8f0;">Hey ${firstName},</p>
          <p style="color: #8b9bb4; font-size: 14px; line-height: 1.6;">It's time for your <strong style="color: #e2e8f0;">${weekLabels[week] || week}</strong> check-in. Your feedback helps us make sure we're delivering on our promises.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${surveyUrl}" style="display: inline-block; background: #265ee1; color: #ffffff; text-decoration: none; padding: 14px 36px; border-radius: 8px; font-weight: 600; font-size: 14px;">Complete Your Check-In</a>
          </div>
          <p style="color: #8b9bb4; font-size: 13px; line-height: 1.6;">This takes about 3 minutes. Your responses are confidential and help us improve your experience.</p>
          <hr style="border: none; border-top: 1px solid #2d3748; margin: 30px 0;" />
          <p style="color: #5a6a7e; font-size: 11px; text-align: center;">XXII Century Trucking — goxxii.com</p>
        </div>
      `,
  });
}

async function recalculateDriverScore(driverId: number) {
  const checkIns = await storage.getCheckIns(driverId);
  const completed = checkIns.filter(c => c.status === "completed" && c.responses);

  if (completed.length === 0) return;

  let totalScore = 0;
  let factors = 0;

  for (const checkIn of completed) {
    const responses = checkIn.responses as Record<string, any>;
    if (!responses) continue;

    if (responses.promise_match) {
      const matchScore = responses.promise_match === "fully" ? 100 :
                         responses.promise_match === "partially" ? 50 : 10;
      totalScore += matchScore;
      factors++;
    }

    if (responses.nps_score !== undefined) {
      totalScore += (Number(responses.nps_score) / 10) * 100;
      factors++;
    }

    if (responses.profitable_long_term) {
      const profitScore = responses.profitable_long_term === "yes" ? 100 :
                          responses.profitable_long_term === "somewhat" ? 60 : 20;
      totalScore += profitScore;
      factors++;
    }

    if (responses.considered_leaving) {
      totalScore += responses.considered_leaving === "no" ? 100 : 20;
      factors++;
    }

    if (responses.feel_supported !== undefined) {
      totalScore += responses.feel_supported === "yes" ? 100 : 30;
      factors++;
    }

    if (responses.feel_respected !== undefined) {
      totalScore += responses.feel_respected === "yes" ? 100 : 30;
      factors++;
    }

    if (responses.dispatcher_responsiveness) {
      const ratingMap: Record<string, number> = { excellent: 100, good: 75, average: 50, poor: 20 };
      totalScore += ratingMap[responses.dispatcher_responsiveness] || 50;
      factors++;
    }

    if (responses.pay_aligned !== undefined) {
      totalScore += responses.pay_aligned === "yes" ? 100 :
                    responses.pay_aligned === "somewhat" ? 60 : 20;
      factors++;
    }

    if (responses.home_time_satisfaction) {
      const satMap: Record<string, number> = { very_satisfied: 100, satisfied: 80, neutral: 50, dissatisfied: 25, very_dissatisfied: 10 };
      totalScore += satMap[responses.home_time_satisfaction] || 50;
      factors++;
    }

    if (responses.overall_satisfaction) {
      const satMap: Record<string, number> = { very_satisfied: 100, satisfied: 80, neutral: 50, dissatisfied: 25, very_dissatisfied: 10 };
      totalScore += satMap[responses.overall_satisfaction] || 50;
      factors++;
    }

    // ===== Exit survey factors =====
    if (responses.job_satisfaction !== undefined) {
      totalScore += (Number(responses.job_satisfaction) / 10) * 100;
      factors++;
    }

    if (responses.would_recommend !== undefined) {
      totalScore += responses.would_recommend === "yes" ? 100 : 20;
      factors++;
    }

    if (responses.pay_competitiveness) {
      const compMap: Record<string, number> = { much_better: 100, better: 80, same: 60, worse: 30, much_worse: 10 };
      totalScore += compMap[responses.pay_competitiveness] ?? 50;
      factors++;
    }

    if (responses.management_support) {
      const ratingMap: Record<string, number> = { excellent: 100, good: 75, average: 50, poor: 20 };
      totalScore += ratingMap[responses.management_support] ?? 50;
      factors++;
    }

    if (responses.communication_effective !== undefined) {
      totalScore += responses.communication_effective === "yes" ? 100 : 30;
      factors++;
    }

    if (responses.felt_safe !== undefined) {
      totalScore += responses.felt_safe === "yes" ? 100 : 20;
      factors++;
    }
  }

  const avgScore = factors > 0 ? Math.round(totalScore / factors) : 50;

  let riskLevel = "low";
  if (avgScore < 40) riskLevel = "critical";
  else if (avgScore < 60) riskLevel = "high";
  else if (avgScore < 75) riskLevel = "medium";

  let aiSummary = "";
  if (avgScore >= 75) {
    aiSummary = "Driver shows strong satisfaction and engagement. Low flight risk.";
  } else if (avgScore >= 60) {
    aiSummary = "Some areas of concern detected. Monitor closely and address specific feedback.";
  } else if (avgScore >= 40) {
    aiSummary = "Multiple risk factors identified. Immediate intervention recommended to prevent turnover.";
  } else {
    aiSummary = "Critical retention risk. Driver is likely considering leaving. Urgent management attention required.";
  }

  await storage.updateDriver(driverId, {
    retentionScore: avgScore,
    riskLevel,
  });

  for (const checkIn of completed) {
    if (!checkIn.aiRiskScore) {
      await storage.updateCheckIn(checkIn.id, {
        aiRiskScore: avgScore,
        aiSummary,
      });
    }
  }
}
