# goxxii — XXII Century Trucking

Marketing site + internal recruiting portal + driver rewards automation.

## Stack
Vite + React + TypeScript + Tailwind (client) · Express (server) · Drizzle + Postgres.
Client in `src/`, server in `server/`, shared DB schema in `shared/schema.ts`.

## Running locally
- `npm run dev` — serves client AND API on **port 5000** (hardcoded).
- `DATABASE_URL` must be passed **inline** — there is no dotenv loader.
- The frontend renders even if the DB is down; only portal/API routes fail.
- **The dev server has no watch mode.** Server-side edits need a full restart or
  the API silently keeps serving the old code. Client edits hot-reload fine.

## Deploying
`git push origin main` → the VPS pulls and rebuilds automatically (~40-80s).
There is no PR flow. Verify by fetching the live page and grepping the new
`/assets/index-*.js` bundle — note the minifier rewrites `24000` as `24e3`.

## Driver rewards
Program lives at `/loyalty` (public, unlisted) and `/portal/rewards` (ops).
Rules + the pure evaluation engine: `src/data/rewardsProgram.ts`.
Everything else — the daily cycle, Samsara adapter, certificates, ledger:
- `docs/INTEGRATION-SPEC.md` — API contract for the client's developers
- `docs/REWARDS-AUTOMATION.md` — setup + day-to-day operation
- `docs/REWARDS-HANDOVER.md` — transfer plan and go-live runbook

Offline test with `npm run rewards:smoke` (no DB/Samsara/Resend/Telegram needed).

## Gotchas
- **Owner-operators get no MPG rewards** — they buy their own fuel. Enforced in
  `evaluateRewards` via `who: "company"`, not just hidden in the UI.
- **First rewards run must be `?notify=0`** or every long-tenure driver gets a
  backlog of certificates and gift tickets.
- **Map basemap:** CARTO now stamps "API KEY REQUIRED" into its keyless tiles
  while still returning 200, so the freight-services map uses Esri instead. Never
  assume a keyless third-party tile/CDN source is fine just because it responds.
- **drizzle-zod:** `createInsertSchema`-derived insert types can collapse to
  `never` in this repo. Type new inserts as `typeof table.$inferInsert`.
- `src/data/loyaltyDemo.ts` holds invented drivers used by the public `/loyalty`
  leaderboard. Replace with real data before treating those standings as real.
- **Phone numbers are department-specific.** Main Office 630-948-0501 is the
  company number and belongs on every general/company touchpoint; recruiting and
  hiring CTAs (anything paired with "Apply To Drive") keep 630-914-6037. Safety
  630-914-6951 and Maintenance 630-529-5658 appear in the footer, the Contact
  page phone card and the Organization schema. Canonical list lives in
  `Footer.tsx` (`footerPhones`) and `schemaData.ts` (`COMPANY`).
