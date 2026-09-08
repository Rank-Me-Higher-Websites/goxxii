// Offline smoke test for the rewards automation.
//
//   npx tsx scripts/award-cycle-smoke.ts
//
// Runs the real engine (server/awards.ts + server/fleetProvider.ts) against an
// in-memory driver list and a stubbed network layer, so it needs no database,
// no Samsara token and no Resend/Telegram key. It prints what WOULD be emailed
// and what WOULD be shipped, then runs a second cycle to prove the ledger makes
// the run idempotent (second pass must grant 0 new awards).

process.env.DATABASE_URL ||= "postgres://smoke:smoke@127.0.0.1:5432/smoke";
process.env.APP_URL = "https://goxxii.com";
process.env.RESEND_API_KEY = "smoke-test-key";
process.env.TELEGRAM_BOT_TOKEN = "smoke-test-token";
process.env.SAMSARA_API_TOKEN = "smoke-test-samsara";

// Imported dynamically, AFTER the env vars above are set — static imports would
// hoist above them and server/db.ts would abort on a missing DATABASE_URL.
const { storage } = await import("../server/storage");
const { runAwardCycle } = await import("../server/awards");

const NOW = new Date("2026-08-04T12:00:00Z");

// --- fake CRM -------------------------------------------------------------
const drivers = [
  { id: 1, firstName: "Michael", lastName: "Torres", email: "michael@example.com", phone: "312-555-0101",
    hireDate: new Date("2025-07-19"), status: "active", truckNumber: "1187", driverType: "company",
    samsaraDriverId: "S-1", surveyToken: "tok-michael", recruiter: null, retentionScore: null,
    riskLevel: null, notes: null, nextSurveyEmailAt: null },
  { id: 2, firstName: "Dwayne", lastName: "Ellis", email: "dwayne@example.com", phone: "312-555-0102",
    hireDate: new Date("2024-02-06"), status: "active", truckNumber: "1203", driverType: "owner_operator",
    samsaraDriverId: "S-2", surveyToken: "tok-dwayne", recruiter: null, retentionScore: null,
    riskLevel: null, notes: null, nextSurveyEmailAt: null },
  { id: 3, firstName: "Jamal", lastName: "Whitfield", email: null, phone: "312-555-0103",
    hireDate: new Date("2026-08-03"), status: "active", truckNumber: "1290", driverType: "company",
    samsaraDriverId: "S-3", surveyToken: "tok-jamal", recruiter: null, retentionScore: null,
    riskLevel: null, notes: null, nextSurveyEmailAt: null },
  { id: 4, firstName: "Gone", lastName: "Driver", email: "gone@example.com", phone: null,
    hireDate: new Date("2022-01-01"), status: "inactive", truckNumber: "1000", driverType: "company",
    samsaraDriverId: "S-4", surveyToken: "tok-gone", recruiter: null, retentionScore: null,
    riskLevel: null, notes: null, nextSurveyEmailAt: null },
];

// --- fake ledger ----------------------------------------------------------
const ledger: any[] = [];
let nextId = 1;
(storage as any).getDrivers = async () => drivers;
(storage as any).getDriverAwards = async (driverId?: number) =>
  driverId === undefined ? ledger : ledger.filter((a) => a.driverId === driverId);
(storage as any).createDriverAward = async (a: any) => {
  const key = `${a.driverId}|${a.ruleId}|${a.periodKey}`;
  if (ledger.some((x) => `${x.driverId}|${x.ruleId}|${x.periodKey}` === key)) return undefined; // unique index
  const row = { ...a, id: nextId++, createdAt: new Date() };
  ledger.push(row);
  return row;
};
(storage as any).updateDriverAward = async (id: number, data: any) => {
  const row = ledger.find((x) => x.id === id);
  if (row) Object.assign(row, data);
  return row;
};

// --- fake network ---------------------------------------------------------
const emails: Array<{ to: string; subject: string; certLinks: string[] }> = [];
const telegrams: string[] = [];

const json = (body: unknown) =>
  new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });

globalThis.fetch = (async (input: any, init: any) => {
  const url = String(input);

  if (url.includes("api.resend.com")) {
    const body = JSON.parse(init.body);
    emails.push({
      to: body.to[0],
      subject: body.subject,
      certLinks: Array.from(String(body.html).matchAll(/href="([^"]*certificate[^"]*)"/g)).map((m: any) => m[1]),
    });
    return json({ id: "email_stub" });
  }
  if (url.includes("api.telegram.org")) {
    telegrams.push(JSON.parse(init.body).text);
    return json({ ok: true });
  }
  // --- Samsara stubs ---
  if (url.includes("/fleet/drivers?")) {
    // Served in two pages, so the cursor pagination is exercised: a fleet bigger
    // than one page must not silently lose drivers.
    if (!url.includes("after=")) {
      return json({
        data: [{ id: "S-1", name: "Michael Torres", staticAssignedVehicle: { name: "1187" } }],
        pagination: { hasNextPage: true, endCursor: "page2" },
      });
    }
    return json({
      data: [
        { id: "S-2", name: "Dwayne Ellis", staticAssignedVehicle: { name: "1203" } },
        { id: "S-3", name: "Jamal Whitfield", staticAssignedVehicle: { name: "1290" } },
      ],
      pagination: { hasNextPage: false },
    });
  }
  if (url.includes("/fleet/reports/drivers/fuel-energy")) {
    // The engine reports on the last COMPLETE month, so "current" is July and
    // the prior-month comparison window is June.
    const prior = url.includes("2026-06-01");
    return json({ data: [
      { driver: { id: "S-1" }, fuelEfficiencyMpg: prior ? 8.1 : 8.4,
        distanceDrivenMeters: 180_000_000, engineIdleTimeDurationMs: 900_000, engineRunTimeDurationMs: 10_000_000 },
      { driver: { id: "S-2" }, fuelEfficiencyMpg: prior ? 7.4 : 8.1,
        distanceDrivenMeters: 174_000_000, engineIdleTimeDurationMs: 1_100_000, engineRunTimeDurationMs: 10_000_000 },
      { driver: { id: "S-3" }, fuelEfficiencyMpg: prior ? 0 : 7.0,
        distanceDrivenMeters: 1_000_000, engineIdleTimeDurationMs: 200_000, engineRunTimeDurationMs: 1_000_000 },
    ] });
  }
  if (url.includes("/safety/score")) {
    const id = url.split("/fleet/drivers/")[1].split("/")[0];
    const scores: Record<string, number> = { "S-1": 98, "S-2": 95, "S-3": 92 };
    return json({ data: { safetyScore: scores[id] ?? 80, harshEventCount: 0 } });
  }
  throw new Error(`unstubbed fetch: ${url}`);
}) as any;

// --- run ------------------------------------------------------------------
function line(label: string, value: unknown) {
  console.log(`  ${label.padEnd(22)} ${String(value)}`);
}

const pass1 = await runAwardCycle({ now: NOW });

console.log("\n=== PASS 1 ===");
line("fleet source", pass1.fleetSource);
line("drivers evaluated", pass1.driversEvaluated);
line("new awards", pass1.newAwards);
line("emails sent", pass1.emailsSent);
line("gifts queued", pass1.giftsQueued);
for (const a of pass1.awards) console.log(`   • ${a.driver} — ${a.ruleId} ${a.event} [${a.period}] (${a.kinds.join("+")})`);
for (const w of pass1.warnings) console.log(`   ! ${w}`);

console.log("\n--- emails ---");
for (const e of emails) {
  console.log(`   -> ${e.to}: ${e.subject}`);
  for (const l of e.certLinks) console.log(`      cert: ${l.slice(0, 150)}`);
}

console.log("\n--- team notifications ---");
for (const t of telegrams) console.log(`   ${t.replace(/<[^>]+>/g, "").split("\n").join("\n   ")}\n`);

console.log("--- gift queue (fulfillment=pending) ---");
for (const a of ledger.filter((x) => x.fulfillment === "pending")) {
  const d = drivers.find((x) => x.id === a.driverId)!;
  console.log(`   ${d.firstName} ${d.lastName} — ${a.rewards.filter((r: any) => r.kind === "branded").map((r: any) => r.label).join("; ")}`);
}

const emailCountAfterPass1 = emails.length;
const pass2 = await runAwardCycle({ now: NOW });

console.log("\n=== PASS 2 (same day, must be a no-op) ===");
line("new awards", pass2.newAwards);
line("emails sent", pass2.emailsSent);
line("extra emails", emails.length - emailCountAfterPass1);

const ok =
  pass1.newAwards > 0 &&
  pass2.newAwards === 0 &&
  emails.length === emailCountAfterPass1 &&
  !ledger.some((a) => a.driverId === 4); // inactive driver must never be awarded

console.log(`\n${ok ? "PASS" : "FAIL"} — idempotent: ${pass2.newAwards === 0}, no duplicate emails: ${emails.length === emailCountAfterPass1}`);
process.exit(ok ? 0 : 1);
