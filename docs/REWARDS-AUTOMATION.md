# Driver Rewards — Automation & Samsara Integration

Operational reference for the XXII Century development team. The API-level contract -
every endpoint we call and expose, the data contract, and how certificates are produced -
is in [INTEGRATION-SPEC.md](INTEGRATION-SPEC.md).

**What it does today:** every day the server evaluates every active driver against the
reward matrix, grants what is newly earned, emails the driver their certificate(s),
and pings the ops team on Telegram for every physical gift that now has to be shipped.
It is already wired end to end and runs on tenure/CRM data. Adding one environment
variable (`SAMSARA_API_TOKEN`) turns on the fleet-driven awards (MPG, safety, mileage).

**What you need to do:** confirm the Samsara field names in `server/fleetProvider.ts`
against your account, fill the gaps listed in [Data still missing](#7-data-still-missing),
and run the migration + seed run once. Nothing in the reward rules has to change.

---

## 1. Moving parts

| File | Role |
| --- | --- |
| `src/data/rewardsProgram.ts` | **Single source of truth** for the reward matrix and the pure evaluation engine. Also drives the public `/loyalty` page — edit rewards here and both the site and the automation change together. |
| `server/fleetProvider.ts` | The **only** file that talks to Samsara. Returns a normalized `FleetSnapshot`. |
| `server/awards.ts` | The award cycle: evaluate → dedupe against the ledger → email → notify the team. |
| `server/certificate.ts` | The certificate artwork - one design per reward category. |
| `server/brandAssets.ts` | The XXII logo inlined as a data URI, so a certificate is one self-contained file. |
| `server/notify.ts` | Resend (driver email) + Telegram (team) helpers. |
| `shared/schema.ts` | `driver_awards` ledger table + the `drivers.samsara_driver_id` / `drivers.driver_type` columns. |
| `src/pages/portal/Rewards.tsx` | Ops UI: gift queue, award history, manual run button. `/portal/rewards`. |
| `scripts/award-cycle-smoke.ts` | Offline end-to-end test — no DB, no API keys needed. |
| `scripts/preview-certificates.ts` | Renders one certificate per category into `exports/certificates/` for visual review. |

## 2. Data flow

```
  drivers table (CRM)            Samsara API
  hireDate, status,              /fleet/drivers
  driver_type, email             /fleet/reports/drivers/fuel-energy
        |                        /fleet/drivers/{id}/safety/score
        |                                |
        |                        server/fleetProvider.ts
        |                        (normalizes -> FleetStats, per month)
        |                                |
        +--------------+-----------------+
                       |
              server/awards.ts
              - builds DriverStats per driver
              - ranks the fleet (Top-3 MPG, best safety)
              - evaluateRewards() from rewardsProgram.ts
                       |
              driver_awards ledger  <-- unique(driver_id, rule_id, period_key)
                       |                 THIS is what prevents double-awarding
        +--------------+------------------+
        |                                 |
  digital -> Resend email            branded -> Telegram to the team
  with certificate link(s)                     + fulfillment = "pending"
                                               (shows in /portal/rewards)
```

## 3. Setup

### 3.1 Migration

The ledger table and two new driver columns ship in `shared/schema.ts`:

```bash
npm run db:push
```

New columns on `drivers`:

- `samsara_driver_id` — links a CRM driver to their Samsara record (see 4.2).
- `driver_type` — `company` (default) or `owner_operator`. Owner-operators buy their
  own fuel, so the MPG rules skip them. Set this correctly or owner-operators will be
  ranked against company drivers on the fuel leaderboard.

### 3.2 Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | Already in use. |
| `RESEND_API_KEY` | yes | Sends the certificate emails. Already in use for the retention surveys. |
| `RESEND_FROM_EMAIL` | no | Defaults to `XXII Century <noreply@ava.rankmehigher.com>`. Point this at a `goxxii.com` sender once the domain is verified in Resend. |
| `TELEGRAM_BOT_TOKEN` | yes | Team gift notifications. Already in use. |
| `TELEGRAM_CHAT_ID` | no | Defaults to the existing ops group. |
| `APP_URL` | recommended | Base URL used in certificate/portal links. Defaults to `https://goxxii.com`. |
| `SAMSARA_API_TOKEN` | **for fleet awards** | Read-only API token. Without it the engine still runs, it just cannot award MPG/safety/mileage. |
| `SAMSARA_BASE_URL` | no | Defaults to `https://api.samsara.com`. Only needed for EU-hosted accounts. |
| `REWARDS_AUTORUN` | no | Set to `on` to enable the built-in daily timer. **Defaults to OFF** — set it only AFTER the seed run, or leave it off and drive the cycle from your own cron. |
| `REWARDS_CRON_SECRET` | no | Lets an external scheduler call `POST /api/rewards/run` with an `x-cron-secret` header instead of a portal login. |

### 3.3 The first run — do this once, in this order

The engine grants everything a driver is *currently* eligible for. On a fleet that has
been running for years that means a five-year driver would get a burst of back-dated
certificates and the team would get a gift ticket for a welcome kit they handed out in
2021. So seed the ledger silently first:

```bash
# 1. Preview — writes nothing, sends nothing. Read the output.
curl -X POST "https://goxxii.com/api/rewards/run?dryRun=1" -H "x-cron-secret: $REWARDS_CRON_SECRET"

# 2. Seed — writes the ledger, sends NO emails and queues NO gifts.
curl -X POST "https://goxxii.com/api/rewards/run?notify=0" -H "x-cron-secret: $REWARDS_CRON_SECRET"
```

From then on the daily run only ever fires for genuinely new milestones. The portal's
**Preview run** button does the same as step 1.

## 4. Wiring Samsara

### 4.1 Endpoints used

| Samsara endpoint | Feeds |
| --- | --- |
| `GET /fleet/drivers` | roster, name + assigned truck (used for matching) |
| `GET /fleet/reports/drivers/fuel-energy?startTime&endTime` | `mpg`, `priorMpg`, `monthMiles`, `idlePct` |
| `GET /fleet/drivers/{id}/safety/score?startTime&endTime` | `safetyScore`, `harshEvents` |

**Verify the JSON keys.** Samsara's field names vary by account and API version.
`pickNumber()` in `fleetProvider.ts` tries several candidate names, and `logShapeOnce()`
prints the real keys of the first row of each report to the server log:

```
[fleet] fuel-energy row keys: driver, fuelEfficiencyMpg, distanceDrivenMeters, ...
```

Run the cycle once with the token set, read those three log lines, then trim each
candidate list in `pickNumber(...)` to the keys your account actually returns. If a key
is missing entirely, the field comes back `undefined` and the rules that depend on it
simply do not fire — nothing crashes and nobody gets a wrong award.

### 4.2 Matching a CRM driver to a Samsara driver

`statsForDriver()` resolves in this order:

1. `drivers.samsara_driver_id` — **do this**, it is the only unambiguous match.
2. Truck number (`drivers.truck_number` vs the Samsara vehicle name).
3. Full name, case-insensitive.

The name fallback exists so the system works before you backfill the ids. Two drivers
with the same name would collide, so backfill `samsara_driver_id` and treat the
fallbacks as a migration aid, not a permanent design.

### 4.3 Months, not days

`getFleetSnapshot(now, monthsBack = 1)` reports on the **last complete month**. Monthly
awards (Top-3 MPG, best safety, most-improved) are judged only after the month closes —
ranking a half-finished month would crown a winner on the 3rd and leave everyone else no
way to catch up. So a run on 5 September grants the August leaderboard awards, once.

## 5. Scheduling

Built in: `server/index.ts` runs a cycle 2 minutes after boot and every 24 h after that.
Repeat runs are harmless — the ledger's unique index means a restart loop cannot
double-award anyone.

To use your own scheduler instead, leave `REWARDS_AUTORUN` unset and call:

```bash
curl -X POST https://goxxii.com/api/rewards/run -H "x-cron-secret: $REWARDS_CRON_SECRET"
```

Daily is the right cadence: tenure milestones need to land on the right day, and the
monthly awards resolve themselves on the first run after the month ends.

## 6. API reference

| Endpoint | Auth | Purpose |
| --- | --- | --- |
| `POST /api/rewards/run` | portal session **or** `x-cron-secret` | Run a cycle. `?dryRun=1` = report only. `?notify=0` = write the ledger silently. Returns the run summary. |
| `GET /api/rewards/program` | public | The full reward matrix as JSON. |
| `POST /api/rewards/evaluate` | public | Stateless: POST a `DriverStats` snapshot, get the earned awards back. Useful for testing rule changes. |
| `GET /api/rewards/status/:token` | public (per-driver token) | The driver's own page data: tenure, progress to next milestone, and every granted award with its certificate link. |
| `GET /api/rewards/certificate?name&title&subtitle&category&date&certId` | public | The print-ready certificate HTML. `category` selects the design; an unknown or missing one falls back to a neutral theme. Render to PDF/PNG with headless Chrome if you want an attachment instead of a link. |
| `GET /api/portal/awards[?driverId=]` | portal | Award history. |
| `GET /api/portal/gifts` | portal | The physical-gift queue (`fulfillment = "pending"`), with driver name/truck/phone. |
| `POST /api/portal/gifts/:id/shipped` | portal | Mark a gift shipped. Body: `{ "note": "optional" }`. |

## 7. Data still missing

These rules are **written and wired but dormant** because nothing supplies their input
yet. Each one starts working the moment the field is populated in `FleetStats` — no
change to the rules engine:

| Rule | Needs | Where to get it |
| --- | --- | --- |
| `MI-01` 100k miles, `MI-02` 350k miles | `lifetimeMiles` | The fuel-energy report only returns distance **for the requested window**. Either read the driver's lifetime odometer from Samsara, or accumulate `monthMiles` into a per-driver total in the DB each month. **This is the biggest gap — mileage milestones cannot fire until it exists.** |
| `SF-05` safe-mile milestones | `safeMiles` | Currently falls back to `lifetimeMiles`. Decide whether "safe miles" means lifetime miles minus miles in accident-involved periods. Note the rule's `test` only checks the 100k tier — the 250k/500k tiers need separate rule ids if you want them to award separately. |
| `SF-02` zero-violation month | `violationsMonth` | Not in the Samsara fuel/safety endpoints. Source from your DOT/compliance system, or count Samsara safety events, then set `violationsMonth` in `fleetProvider.ts`. Until then it never fires (it will *not* falsely award — `undefined` fails the `=== 0` test). |
| `SF-03` clean DOT inspection | `cleanInspection` | An event, not a metric. Post it from whoever records inspections. |
| `SF-04` accident-free year | `accidentFreeDays` | Days since the last recorded accident — from your incident log. |
| `MPG-04` Elite Fuel Club | `eliteFuelMonths` | Consecutive months at 8.0+ MPG. Compute from the `driver_awards` history (count consecutive `MPG-01` months) or store a rolling counter. |
| `REF-01` referral hired & retained | `referralHiredRetained` | From recruiting: referral hired and still active at 90 days. |

Two smaller notes:

- **Certificates are links, not attachments.** The email links to the certificate HTML,
  which prints cleanly. If you want a PDF attached, render
  `/api/rewards/certificate?...` with headless Chrome and attach the result in
  `sendEmail()`.
- **Only rewards whose label says "certificate" produce a certificate.** Digital rewards
  like *leaderboard eligible* or *portal badge* are recorded in the ledger and shown in
  the driver portal, but they do not trigger an email. That is deliberate — see
  `isCertificate()` in `server/awards.ts`.


## 7a. Certificate files

Every award email attaches the certificate as a **PDF** (~230 KB each), rendered from the
certificate HTML by headless Chromium in `server/certificateRender.ts`. The link stays in
the email too.

- `puppeteer` ships its own Chromium (~300 MB on `npm install`) — no system Chrome needed.
  Slim containers may still need `libnss3`, `libatk-1.0-0`, `libgbm1`, `libasound2`.
- If Chromium cannot start the run does **not** fail: it logs one warning and sends
  link-only emails.
- Attachments are capped at 6 MB per driver; the rest stay reachable via the links.

## 7b. Certificate artwork

Five designs, one per reward category, each with its own emblem, accent colour, body
copy and sign-off line - so a safety award does not look like a fuel award. The design
is selected by the `category` query parameter, which the engine fills in from the rule's
own category, so a new rule inherits the right artwork automatically.

- The sheet is a fixed 1600x1000 canvas: exact in print and PDF, and scaled down to fit
  on screen (the stage carries the scaled size, so the page reflows rather than scrolling).
- Everything is inline - system font stack, logo as a data URI, artwork as SVG. No network
  access is needed to render it, which is what makes headless-Chrome PDF export reliable.
- To review the artwork after changing it:

```bash
npx tsx scripts/preview-certificates.ts   # writes exports/certificates/*.html
```

Two deliberate deviations from the design reference we were given:

1. The reference reads "CERTICATE OF" - a typo. The rendered certificates say
   "CERTIFICATE OF".
2. The Onboarding & Tenure emblem is a calendar-with-check rather than a handshake. A
   line-art handshake is illegible at emblem size; if you supply a handshake as a clean
   SVG we will drop it straight into `ICONS` in `server/certificate.ts`.

Renaming a category in `src/data/rewardsProgram.ts` also means renaming its key in
`THEMES` in `server/certificate.ts`, or that category quietly falls back to the neutral
design.

## 8. Testing

```bash
npx tsx scripts/award-cycle-smoke.ts
```

Runs the real engine against an in-memory driver list with the database, Samsara,
Resend and Telegram all stubbed. It prints every email and gift notification that would
go out, then runs a second cycle and asserts it grants **zero** new awards — that second
pass is the regression test for the whole dedupe design. Extend the fake driver list in
that file when you add rules.

Exit code 0 = pass.

## 9. Failure modes

| Symptom | Cause / where to look |
| --- | --- |
| Run summary says `fleetSource: "none"` | `SAMSARA_API_TOKEN` is unset. Tenure awards still work. |
| Warnings like `fuel-energy (current month): Samsara ... -> 401` | Token lacks the report scope, or is expired. Fleet awards are skipped for that run; the cycle does not abort. |
| Driver earned awards but got no email | Check `driver_awards.email_status` — `skipped` means no email on file, `failed` records the Resend error in `email_error`. The run summary also lists it under `warnings`. |
| Same certificate sent twice | Should be impossible — the unique index `driver_awards_unique` is the guard. If it happens, check the migration actually created that index. |
| A gift never reached the team | `driver_awards.team_notified = false` with `fulfillment = "pending"` means Telegram failed. The row is still in `/portal/rewards`, so nothing is lost. |
| Everyone suddenly got a welcome kit | The ledger was wiped, or the run happened before the `notify=0` seed run (§3.3). |
