# Driver Rewards — Integration Specification

For the XXII Century development team. This is the API-level contract: every service the
rewards automation calls, every endpoint it exposes, the data it needs and where each
field comes from, and how the certificates are produced.

Companions: [REWARDS-HANDOVER.md](REWARDS-HANDOVER.md) is the transfer plan and go-live
runbook; [REWARDS-AUTOMATION.md](REWARDS-AUTOMATION.md) is the operational reference.

---

## 0. One-paragraph summary

The rewards engine runs inside the existing Express app. Once a day it reads the driver
roster from our own Postgres, pulls last month's fleet metrics from **Samsara**, decides
what each driver has newly earned, records it in an append-only ledger, emails
certificates through **Resend**, and posts a shipping alert to **Telegram**. Three
outbound APIs, one inbound HTTP surface, no queues, no third-party workflow tool.

```
  ┌── Postgres (ours) ───────┐        ┌── Samsara API ──────────────┐
  │ drivers, driver_awards   │        │ roster, fuel report, safety │
  └────────────┬─────────────┘        └───────────────┬─────────────┘
               │                                      │
               └──────────────► award cycle ◄─────────┘
                              (server/awards.ts)
                                     │
                    ┌────────────────┼─────────────────┐
                    ▼                ▼                 ▼
              Resend API       Telegram API      driver_awards
           (certificate mail)  (gift alert)      (audit + dedupe)
```

---

# Part A — APIs we consume

## A1. Samsara

**Base URL** `https://api.samsara.com` (`https://api.eu.samsara.com` for EU-hosted
accounts — set `SAMSARA_BASE_URL`).
**Auth** `Authorization: Bearer <SAMSARA_API_TOKEN>` on every request.
**Token type** A read-only API token from Samsara's Settings → API Tokens.

### Scopes required

| Scope | Used for |
| --- | --- |
| Read Drivers | The roster: driver id, name, assigned vehicle. |
| Read Reports (fuel & energy) | Monthly MPG, distance, idle time. |
| Read Safety / Driver Safety Scores | Monthly safety score and harsh-event count. |

Nothing is ever written back to Samsara. A read-only token is sufficient and preferred.

### Endpoints called

**1. Driver roster** — once per cycle.

```http
GET /fleet/drivers?limit=512
Authorization: Bearer <token>
```

```jsonc
{
  "data": [
    {
      "id": "494123",
      "name": "Michael Torres",
      "staticAssignedVehicle": { "id": "281474", "name": "1187" }
    }
  ],
  "pagination": { "hasNextPage": true, "endCursor": "MjAyNS0wOC0wMV..." }
}
```

**2. Fuel & energy report** — called twice: once for the reporting month, once for the
month before it (the prior month powers the Most-Improved MPG award).

```http
GET /fleet/reports/drivers/fuel-energy?startTime=2026-08-01T00:00:00.000Z&endTime=2026-09-01T00:00:00.000Z&limit=512
```

```jsonc
{
  "data": [
    {
      "driver": { "id": "494123", "name": "Michael Torres" },
      "fuelEfficiencyMpg": 8.4,
      "distanceDrivenMeters": 18000000,
      "engineIdleTimeDurationMs": 900000,
      "engineRunTimeDurationMs": 10000000
    }
  ],
  "pagination": { "hasNextPage": false }
}
```

**3. Driver safety score** — once per driver, for the reporting month.

```http
GET /fleet/drivers/{driverId}/safety/score?startTime=...&endTime=...
```

```jsonc
{ "data": { "safetyScore": 98, "harshEventCount": 0 } }
```

### Confirm the field names — this is the one integration task we could not finish

Samsara's JSON keys differ by account and API version, and we do not have access to
yours. `pickNumber()` in `server/fleetProvider.ts` therefore accepts several candidate
names per field, and `logShapeOnce()` prints the **real** keys of the first row of each
report to the server log on the first run:

```
[fleet] drivers row keys: id, name, staticAssignedVehicle, ...
[fleet] fuel-energy row keys: driver, fuelEfficiencyMpg, distanceDrivenMeters, ...
[fleet] safety-score row keys: safetyScore, harshEventCount, ...
```

Run one cycle with the token set, read those three lines, then trim each candidate list
to what your account actually returns. Current candidates:

| FleetStats field | Candidate keys tried, in order | Unit conversion |
| --- | --- | --- |
| `mpg`, `priorMpg` | `fuelEfficiencyMpg`, `efficiency.mpg`, `fuelEfficiency.mpg`, `mpg` | none |
| `monthMiles` | `distanceDrivenMeters`, `distanceMeters`, `totalDistanceMeters` | metres ÷ 1609.344 |
| `idlePct` | `engineIdleTimeDurationMs` ÷ `engineRunTimeDurationMs` (also `idleTimeMs`/`runTimeMs`) | ratio × 100 |
| `safetyScore` | `safetyScore`, `score`, `driverSafetyScore` | none |
| `harshEvents` | `harshEventCount`, `totalHarshEventCount`, `harshEvents` | none |

**A missing key is not an error.** The field comes back `undefined`, the rules that need
it do not fire, and everything else still runs. Nobody is awarded on absent data.

### Pagination

Samsara caps a page at 512 rows and returns `pagination.hasNextPage` /
`pagination.endCursor`. `samsaraGetAll()` follows the cursor until the last page, capped
at 20 pages (10,240 rows) as a runaway guard; hitting that cap is reported as a run
warning rather than silently truncating. **Do not remove this** — a fleet larger than one
page would otherwise lose drivers from the leaderboards with no error anywhere.

### Reporting window

Always the **last complete month**: `getFleetSnapshot(now, monthsBack = 1)`. Monthly
awards are judged only after a month closes, so nobody is crowned on the 3rd. A run on
5 September awards the August leaderboard, once. `startTime` is inclusive, `endTime`
exclusive, both RFC-3339 UTC.

### Matching a Samsara driver to one of ours

| Order | Match on | Notes |
| --- | --- | --- |
| 1 | `drivers.samsara_driver_id` = Samsara `id` | The only unambiguous match. **Backfill this.** |
| 2 | `drivers.truck_number` = assigned vehicle name | Case-insensitive, trimmed. |
| 3 | `"first last"` = Samsara `name` | Case-insensitive. Collides on duplicate names. |

2 and 3 are migration aids so the system works before the backfill, not a permanent design.

### Errors and rate limits

Every Samsara call is wrapped: a non-2xx response throws, is caught, and lands in
`summary.warnings` — the cycle continues with whatever it did get. There is no retry
loop today; the next daily run retries naturally. If your account's rate limits require
throttling, add it inside `samsaraGet()` — it is the single choke point for every call.

### Not used (but available if you want them)

Samsara webhooks could push DVIR/inspection and safety events to us in real time, which
is one way to supply the `cleanInspection` event listed in Part C. We deliberately did
not build a webhook receiver: it adds a public endpoint to secure, and a daily pull is
enough for a rewards program.

## A2. Resend (driver email)

```http
POST https://api.resend.com/emails
Authorization: Bearer <RESEND_API_KEY>
Content-Type: application/json

{ "from": "XXII Century <noreply@goxxii.com>", "to": ["driver@example.com"],
  "subject": "You earned it — 1 year", "html": "<!-- award email -->" }
```

One email per driver per cycle, listing all of that driver's new certificates. Already in
use for the retention surveys, so the key exists. **Action for XXII:** verify `goxxii.com`
in Resend and set `RESEND_FROM_EMAIL`, so certificates come from your own domain instead
of the shared `ava.rankmehigher.com` sender.

Failures are recorded per award in `driver_awards.email_status` / `email_error`, never
swallowed.

## A3. Telegram Bot API (team alert)

```http
POST https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/sendMessage
{ "chat_id": "-1003752172558", "text": "🎁 <b>PHYSICAL GIFT REQUIRED</b> …", "parse_mode": "HTML" }
```

One message per driver who earned physical items, naming the driver, truck, phone and
each item. Telegram failures never break the cycle — the award is already in the gift
queue in the portal, and `team_notified` stays `false` so you can see it did not send.

---

# Part B — APIs we expose

All JSON. Portal endpoints use the existing session cookie auth (`requireAuth`).

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/rewards/run` | portal session **or** `x-cron-secret` | Run one award cycle. |
| GET | `/api/rewards/program` | public | The full reward matrix as JSON. |
| POST | `/api/rewards/evaluate` | public | Stateless rule evaluation for a supplied `DriverStats`. |
| GET | `/api/rewards/status/:token` | per-driver token | A driver's own rewards page data. |
| GET | `/api/rewards/certificate` | public | The certificate HTML (see Part D). |
| GET | `/api/portal/awards` | portal | Award history. `?driverId=` to filter. |
| GET | `/api/portal/gifts` | portal | The physical-gift queue. |
| POST | `/api/portal/gifts/:id/shipped` | portal | Mark a gift shipped. |

### POST /api/rewards/run

Query (or JSON body) parameters:

| Param | Effect |
| --- | --- |
| `dryRun=1` | Evaluate and report. Writes nothing, sends nothing. |
| `notify=0` | Write the ledger silently: no emails, no Telegram, no shipping queue. Use for the first seed run. |

```bash
curl -X POST "https://goxxii.com/api/rewards/run?dryRun=1" \
  -H "x-cron-secret: $REWARDS_CRON_SECRET"
```

```jsonc
{
  "ranAt": "2026-09-05T04:00:00.000Z",
  "period": "2026-08",
  "fleetSource": "samsara",          // "none" when SAMSARA_API_TOKEN is unset
  "driversEvaluated": 42,
  "newAwards": 7,
  "emailsSent": 5,
  "emailsFailed": 0,
  "giftsQueued": 2,
  "dryRun": true,
  "notified": false,
  "warnings": ["safety score 494999: Samsara /fleet/drivers/... -> 404"],
  "awards": [
    { "driver": "Michael Torres", "ruleId": "TEN-05", "event": "1 year",
      "period": "once", "kinds": ["digital", "branded"] }
  ]
}
```

Status codes: `200` success · `401` neither a session nor a valid cron secret ·
`409` a cycle is already running (the manual button and the daily timer cannot overlap) ·
`500` unexpected failure.

### POST /api/rewards/evaluate

Stateless — no database, no side effects. Useful for testing rule changes.

```bash
curl -X POST https://goxxii.com/api/rewards/evaluate \
  -H "Content-Type: application/json" \
  -d '{"status":"active","tenureDays":400,"monthlyMpg":8.4,"idlePct":9,"driverType":"company"}'
```

```jsonc
{ "count": 2, "earned": [ { "ruleId": "TEN-05", "event": "1 year",
  "category": "Onboarding & Tenure", "rewards": [ { "kind": "digital", "label": "1-Year certificate" } ] } ] }
```

### GET /api/rewards/status/:token

The driver-facing page (`/loyalty/:token`) calls this. `:token` is the driver's existing
survey token — no login, no PII in the URL beyond the opaque token.

```jsonc
{
  "found": true,
  "driver": { "firstName": "Michael", "lastName": "Torres" },
  "stats": { "tenureDays": 412, "tenureYears": 1 },
  "earned": [ /* what they qualify for right now */ ],
  "granted": [ { "ruleId": "TEN-05", "event": "1 year", "category": "Onboarding & Tenure",
                 "certUrl": "https://goxxii.com/api/rewards/certificate?...",
                 "awardedAt": "2026-08-05T04:00:12.000Z", "giftStatus": "shipped" } ],
  "nextMilestone": { "target": 730, "current": 412, "remaining": 318 }
}
```

### GET /api/portal/gifts · POST /api/portal/gifts/:id/shipped

```jsonc
// GET
[{ "id": 31, "driverId": 12, "driverName": "Michael Torres", "truckNumber": "1187",
   "phone": "312-555-0101", "event": "1 year", "category": "Onboarding & Tenure",
   "rewards": [{ "kind": "branded", "label": "premium embroidered jacket + challenge coin" }],
   "fulfillment": "pending", "createdAt": "2026-08-05T04:00:12.000Z" }]

// POST body (optional)
{ "note": "shipped UPS 1Z999…" }
```

---

# Part C — The data contract

`DriverStats` (in `src/data/rewardsProgram.ts`) is the only input the rule engine sees.
Everything above exists to fill this object.

| Field | Source today | Status |
| --- | --- | --- |
| `status` | `drivers.status` | Live |
| `tenureDays`, `tenureYears` | `drivers.hire_date` | Live |
| `driverType` | `drivers.driver_type` | Live — **set owner-operators correctly** |
| `monthlyMpg`, `priorMonthMpg` | Samsara fuel/energy | Live (with Samsara token) |
| `idlePct` | Samsara idle ÷ run time | Live (with Samsara token) |
| `mpgRank`, `safetyRank` | computed by us across the fleet | Live (with Samsara token) |
| `lifetimeMiles` | — | **Needed** |
| `safeMiles` | falls back to `lifetimeMiles` | Needed — definition required |
| `violationsMonth` | — | Needed |
| `cleanInspection` | — | Needed (event) |
| `accidentFreeDays` | — | Needed |
| `eliteFuelMonths` | — | Derivable from our own ledger |
| `referralHiredRetained` | — | Needed (event) |

## What we still need an API or a feed for

Each of these switches on rules that are already written and wired. Give us any of the
three shapes below and nothing else has to change.

| Data | Rules it unlocks | Where it likely lives | Suggested shape |
| --- | --- | --- | --- |
| **Lifetime odometer miles per driver** | 100k and 350k mileage milestones, safe-mile milestones | Samsara vehicle odometer, or accumulate our monthly figure | Add to `FleetStats.lifetimeMiles` in `fleetProvider.ts` |
| **Violations this month** | Zero-violation month | DOT/compliance system, or a count of Samsara safety events | `FleetStats.violationsMonth` |
| **Clean DOT inspection** | Clean-inspection badge | Whoever files inspections | Event → `POST /api/rewards/evaluate` shape, or a column we read |
| **Days since last accident** | Accident-free year | Incident log | `FleetStats.accidentFreeDays` |
| **Referral hired + 90 days retained** | Referral award | Recruiting | Event or a flag on the driver row |

Three integration shapes, in order of preference:

1. **Pull** — you expose a read endpoint, we call it inside `fleetProvider.ts`. Preferred:
   it fits the existing daily cycle and needs no new public surface from us.
2. **Column** — you write the value onto the `drivers` row (or a small table) from your
   own system, and we read it. Simplest if the data already lives in your database.
3. **Push** — we add an authenticated `POST /api/rewards/events` endpoint you call when
   an inspection passes or a referral matures. Best for one-off events; tell us and we
   will build it.

---

# Part D — How the certificates are produced

**There is no image generator and no design tool in the loop.** A certificate is an HTML
page rendered by our own server from the award data — deterministic, versioned in git,
and free to regenerate. That is why the driver's name, the milestone, the date and the
certificate ID are always correct: they are printed from the ledger row, not typed into a
template by hand.

```
award row ──► GET /api/rewards/certificate?name&title&subtitle&category&date&certId
                        │
                        ├─ picks the design by `category` (5 designs; unknown → neutral)
                        ├─ draws the chevrons, medal and emblem as inline SVG
                        ├─ inlines the XXII logo as a data URI (server/brandAssets.ts)
                        └─ returns one self-contained HTML file, 1600 × 1000
```

- **Self-contained on purpose.** No external CSS, fonts, or images — so it renders
  identically in an email client, offline, and inside headless Chrome. That is what makes
  PDF export reliable.
- **Fixed 1600 × 1000 canvas** for exact print output; on screen it scales down to fit
  (the wrapper carries the scaled size, so the page reflows instead of scrolling).
- **Five designs**, one per reward category, each with its own emblem, accent, body copy
  and tagline. The category comes from the rule itself, so a new rule inherits the right
  artwork automatically.
- Renaming a category in `src/data/rewardsProgram.ts` means renaming its key in `THEMES`
  in `server/certificate.ts`, or that category quietly falls back to the neutral design.

Regenerate all five for review:

```bash
npx tsx scripts/preview-certificates.ts   # → exports/certificates/*.html
```

## If you want PNG or PDF files instead of links

Today the email links to the certificate page, which prints cleanly. To attach a file
instead, render that same URL with headless Chrome. Add `puppeteer` and this helper:

```ts
// npm i puppeteer
import puppeteer from "puppeteer";

export async function renderCertificateFile(url: string, as: "png" | "pdf"): Promise<Buffer> {
  const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  try {
    const page = await browser.newPage();
    // At exactly 1600x1000 the page's fit factor is 1, so this is a 1:1 capture.
    await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: "networkidle0" });
    return as === "png"
      ? await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: 1600, height: 1000 } })
      : await page.pdf({ width: "1600px", height: "1000px", printBackground: true });
  } finally {
    await browser.close();
  }
}
```

Then attach the buffer in `sendEmail()` (Resend takes `attachments: [{ filename, content }]`
with base64 content). Notes: `deviceScaleFactor: 2` gives a 3200 × 2000 PNG, good for
print and social; a PDF keeps the text selectable; and Chromium adds ~300 MB to the
deployment, which is the main reason we did not add it unasked.

---

# Part E — Database changes

Applied with `npm run db:push` (drizzle-kit). Equivalent DDL:

```sql
ALTER TABLE drivers ADD COLUMN samsara_driver_id varchar(64);
ALTER TABLE drivers ADD COLUMN driver_type varchar(20) NOT NULL DEFAULT 'company';

CREATE TABLE driver_awards (
  id               serial PRIMARY KEY,
  driver_id        integer      NOT NULL,
  rule_id          varchar(32)  NOT NULL,
  period_key       varchar(16)  NOT NULL,   -- 'once' or '2026-08'
  event            varchar(255) NOT NULL,
  category         varchar(255) NOT NULL,
  rewards          jsonb        NOT NULL,
  cert_id          varchar(64),
  cert_url         text,
  fulfillment      varchar(20)  NOT NULL DEFAULT 'none',   -- none | pending | shipped
  fulfillment_note text,
  fulfilled_at     timestamp,
  email_status     varchar(20)  NOT NULL DEFAULT 'pending',-- pending | sent | skipped | failed
  email_error      text,
  team_notified    boolean      NOT NULL DEFAULT false,
  created_at       timestamp    NOT NULL DEFAULT now()
);

-- The whole no-duplicate-awards guarantee lives here.
CREATE UNIQUE INDEX driver_awards_unique ON driver_awards (driver_id, rule_id, period_key);
```

The ledger is append-only in practice: rows are inserted once and only their delivery
columns (`email_status`, `fulfillment`, `team_notified`) are updated afterwards.

---

# Part F — Configuration

Every variable is documented in `.env.example`. The ones this integration adds:

| Variable | Required | Notes |
| --- | --- | --- |
| `SAMSARA_API_TOKEN` | for fleet awards | Read-only token. Absent → `fleetSource: "none"`, tenure awards still run. |
| `SAMSARA_BASE_URL` | no | EU-hosted accounts only. |
| `REWARDS_AUTORUN` | no | `on` enables the built-in daily timer. **Defaults to OFF** so a fresh deploy cannot email drivers before the ledger is seeded. |
| `REWARDS_CRON_SECRET` | no | Enables `x-cron-secret` on `/api/rewards/run`. Generate with `openssl rand -hex 32`. |
| `APP_URL` | recommended | Base URL used in certificate and portal links. |
| `RESEND_FROM_EMAIL` | recommended | Set once `goxxii.com` is verified in Resend. |

Secrets live only in the server environment. `.gitignore` now excludes `.env*` (it did
not before — check nothing was committed historically).

---

# Part G — Scheduling, concurrency, idempotency

- **Schedule:** built-in timer, one cycle 2 minutes after boot and every 24 h. Replace
  with your own cron by leaving `REWARDS_AUTORUN` unset and using the cron-secret endpoint.
- **Idempotency:** the unique index. A repeat run inserts nothing and therefore emails
  nothing. Safe to run by hand, on every deploy, or twice by accident.
- **Concurrency:** a writing cycle takes an in-process lock; a second overlapping run
  gets `409`. Dry runs are never blocked. Note this lock is per process — if you scale to
  multiple instances, move the schedule to a single worker or take a Postgres advisory
  lock.
- **Cost of a cycle:** 2 report calls + 1 call per driver for safety scores + 1 email per
  awarded driver. A 50-driver fleet is ~53 Samsara requests a day.

---

# Part H — Failure behaviour

| Failure | What happens |
| --- | --- |
| Samsara token missing | `fleetSource: "none"`, warning in the summary, tenure awards still granted. |
| One Samsara endpoint 4xx/5xx | Warning in the summary; that field is absent; dependent rules do not fire; cycle completes. |
| Resend rejects an email | `email_status = "failed"`, error stored in `email_error`, counted in `emailsFailed`. The award still exists. |
| Telegram down | Logged; `team_notified` stays `false`; the gift is still in `/portal/gifts`. |
| Driver has no email | `email_status = "skipped"`, named in `warnings`. |
| Two runs at once | Second returns `409`; even if it did run, the unique index prevents duplicates. |

Everything a run did is in the returned summary and in the ledger — there is no state
hidden in memory between runs.

---

# Part I — Test plan

1. `npm run rewards:smoke` — runs the real engine against a stubbed database, Samsara,
   Resend and Telegram. Exercises cursor pagination, owner-operator exclusion, the
   no-email path, and asserts a second pass grants **zero** awards. Exit code 0 = pass.
2. `npx tsx scripts/preview-certificates.ts` — renders all five certificate designs.
3. `POST /api/rewards/run?dryRun=1` against production — confirms Samsara connectivity
   (`fleetSource: "samsara"`) without writing or sending anything.
4. Live test: a driver hired today with a real email → exactly one email, one Telegram
   alert, one portal row; run again and confirm nothing repeats.

---

# Part J — Open questions for XXII

1. Which system owns **lifetime odometer miles**? Until it is answered the mileage
   milestones cannot fire — the largest remaining gap.
2. Does "safe miles" mean lifetime miles, or lifetime miles excluding accident-involved
   periods?
3. Push or pull for inspections and referrals? (Part C, three shapes.)
4. Certificates as links, or PDF attachments? (Part D.)
5. Are owner-operators flagged in your data today, or do we need a one-off list?
