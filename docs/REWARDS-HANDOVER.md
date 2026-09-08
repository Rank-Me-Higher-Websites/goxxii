# Driver Rewards Automation — Handover

For the XXII Century development team. Companions:
[INTEGRATION-SPEC.md](INTEGRATION-SPEC.md) is the API-level contract (every endpoint we
call and expose, the data contract, and how certificates are produced);
[REWARDS-AUTOMATION.md](REWARDS-AUTOMATION.md) is the operational reference.
This document is the transfer plan: what is delivered, what we need from you, and the
exact sequence to take it live.

---

## 1. What is delivered

The rewards program is no longer a page that lists what a driver *could* earn. It now
runs on its own, every day:

| Step | Behaviour |
| --- | --- |
| Evaluate | Every active driver is checked against the full reward matrix. |
| Record | Newly earned awards are written to a `driver_awards` ledger. |
| Digital | The driver is emailed their branded, print-ready certificate(s). |
| Physical | The ops team gets a Telegram alert naming the driver, truck, phone and the exact items, and the award enters a gift queue in the portal. |
| Track | `/portal/rewards` shows the gift queue with a *Mark shipped* button, plus the full award history and the email status of each one. |

**It works today without Samsara.** Tenure and onboarding awards (day 1, 30/60 days, 3/6
months, 1/2/3/5/10 years) run off the driver CRM you already have. Connecting Samsara
switches on the fuel, safety and mileage awards — no rule changes, no rebuild.

**It cannot double-award anyone.** The ledger is unique on
`(driver, rule, period)`, so a restart loop, an overlapping manual run, or a cron firing
twice all collapse into one award and one email. This is verified by an automated test
(`npm run rewards:smoke`) that runs the whole engine twice and asserts the second pass
grants zero awards.

## 2. How the code reaches you

The work is a set of additive changes on the existing repository —
`github.com/Rank-Me-Higher-Websites/goxxii`. Nothing was removed or renamed; the
retention-survey flow was refactored only to share the email/Telegram helpers.

New files:

```
server/awards.ts               the award cycle
server/fleetProvider.ts        the only file that talks to Samsara
server/notify.ts               Resend + Telegram helpers
server/brandAssets.ts          the XXII logo, inlined
src/pages/portal/Rewards.tsx   ops UI: gift queue + history + run button
scripts/award-cycle-smoke.ts   offline end-to-end test
scripts/preview-certificates.ts  renders every certificate design for review
docs/INTEGRATION-SPEC.md       API contract for your developers
docs/REWARDS-AUTOMATION.md     operational reference
docs/REWARDS-HANDOVER.md       this document
.env.example                   every variable the server reads
```

Modified: `shared/schema.ts` (new ledger table + two driver columns), `server/storage.ts`,
`server/routes.ts`, `server/index.ts` (daily timer), `src/App.tsx` and
`src/components/portal/PortalLayout.tsx` (the new portal route), `src/data/rewardsProgram.ts`
(an optional `cadence` field), `.gitignore`, `README.md`, `package.json`.

Delivered as a branch with a pull request so your team can review before it touches
`main`. Ask for repository access if you do not have it yet.

## 2a. Deployment requirement — Chromium

Award emails attach a PDF certificate, rendered with headless Chromium via `puppeteer`.
`npm install` downloads its own Chromium (~300 MB), so no system Chrome is required; on a
slim container add `libnss3`, `libatk-1.0-0`, `libgbm1`, `libasound2`. If Chromium cannot
start, awards and emails still go out — just with links instead of attachments.

## 3. What we need from you

| # | Item | Why | Owner |
| --- | --- | --- | --- |
| 1 | **Samsara read-only API token** | Turns on the MPG, safety and mileage awards. Needs read scope on drivers, the fuel/energy report and driver safety scores. | XXII Century |
| 2 | **Confirmation of the Samsara field names** | Samsara's JSON keys vary by account. The adapter logs the real keys on its first run — see §4.1 of the technical reference. A 10-minute check. | Your devs |
| 3 | **`goxxii.com` sender verified in Resend** | Certificates currently send from the shared `ava.rankmehigher.com` sender. Verifying the domain lets them come from XXII Century directly. | XXII Century |
| 4 | **Confirm the Telegram group** for gift alerts | Defaults to the existing ops group. Change `TELEGRAM_CHAT_ID` if the gift alerts should go somewhere else. | Ops |
| 5 | **Backfill `drivers.samsara_driver_id`** | The only unambiguous way to match a CRM driver to their Samsara record. Truck number and name are fallbacks for the transition. | Your devs |
| 6 | **Set `drivers.driver_type`** for owner-operators | They buy their own fuel, so the MPG rules must skip them. Defaults to `company` — leave it wrong and owner-operators compete on the fuel leaderboard. | Ops |
| 7 | **A source for the dormant rules** | Lifetime odometer miles, violations, DOT inspections, accident-free days, referrals. Listed rule by rule in §7 of the technical reference. | Your devs |
| 8 | **Who packs and ships the gifts** | The system tells a person what to send; a person still sends it. | Ops |

Items 1–4 are enough to go live. 5–8 unlock the remaining rules and can follow.

## 4. Go-live runbook

Do these in order. Steps 3 and 4 are the ones that matter — skipping step 4 is the only
way to make this system embarrass you.

```bash
# 1. Merge the branch, then on the server:
npm install
npm run db:push          # creates driver_awards + the two new driver columns

# 2. Set the environment variables from .env.example, then deploy/restart.

# 3. Preview — writes nothing, sends nothing. Read the output carefully.
curl -X POST "https://goxxii.com/api/rewards/run?dryRun=1" \
  -H "x-cron-secret: $REWARDS_CRON_SECRET"

# 4. SEED — writes the ledger, sends NO emails and queues NO gifts.
curl -X POST "https://goxxii.com/api/rewards/run?notify=0" \
  -H "x-cron-secret: $REWARDS_CRON_SECRET"
```

**Why step 4 exists.** The engine grants everything a driver is *currently* eligible for.
On a fleet that has been running for years, a first live run would email a five-year
driver a burst of back-dated certificates and open a gift ticket for a welcome kit
handed out in 2021. The seed run records that history as already-awarded, silently. From
then on the daily run only ever fires for genuinely new milestones.

Steps 3 and 4 are also available as buttons in `/portal/rewards` (*Preview run* /
*Run awards now*) for anyone with a portal login.

## 5. Acceptance test — proving it works on your infrastructure

1. **Offline:** `npm run rewards:smoke` → prints every email and gift alert that would
   go out, then asserts a second pass grants zero new awards. Exit code 0.
2. **Live, safe:** hit `?dryRun=1` and confirm the summary reports
   `fleetSource: "samsara"` and a sensible driver count. If it says `"none"`, the
   Samsara token is not set.
3. **Live, real:** create a test driver with a hire date of today and a real email, run
   the cycle, and confirm: the driver receives one email, the ops group receives one
   "PHYSICAL GIFT REQUIRED" alert for the welcome kit, and the award appears in
   `/portal/rewards`. Run it again — nothing should send twice.
4. Mark the gift shipped in the portal and confirm it leaves the queue.

## 6. Operating it afterwards

- **Cadence:** built-in daily timer, enabled with `REWARDS_AUTORUN=on` (off by default —
  turn it on only after the seed run). To use your own scheduler, leave it unset
  and POST to `/api/rewards/run` with the `x-cron-secret` header.
- **Kill switch:** remove `REWARDS_AUTORUN=on` and restart — stops all automatic awarding
  immediately. Nothing else in the app depends on it.
- **Changing the rewards:** edit `src/data/rewardsProgram.ts` only. The public `/loyalty`
  page and the automation both read from it, so they can never drift apart. Adding a rule
  means adding an entry with a new `id`; the ledger keys on that id, so existing awards
  are untouched.
- **Where to look when something looks wrong:** the failure-mode table in §9 of the
  technical reference maps each symptom to the column or log line that explains it.

## 7. Open decisions for the business

Not blockers — but each one changes behaviour, so decide before the first live run:

1. **Backfill policy.** Seeding silently (recommended) means long-tenure drivers get
   nothing for milestones they already passed. The alternative is to run live once and
   send everyone their history at once. It is a one-time choice.
2. **Certificates as links or PDFs.** Today the email links to a print-ready certificate
   page. Attaching a PDF instead is a small addition (render the same URL with headless
   Chrome) if drivers would rather receive a file.
3. **Badge-only rewards.** Rewards like *leaderboard eligible* and portal badges are
   recorded and shown in the driver portal but deliberately do not trigger an email —
   only actual certificates do. Say so if you want an email for those too.
4. **Gift queue ownership.** One named person should own `/portal/rewards`, or the
   Telegram alerts become everyone's job and therefore no one's.
