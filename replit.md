# XXII Century Trucking — Replit Project

## Project Overview
A full-stack React + Express + TypeScript platform for XXII Century Trucking, a Chicago-based trucking carrier. Includes a public marketing/recruitment website and an internal operations portal with authentication, driver retention tracking, and AI risk scoring.

## Architecture
- **Frontend**: React 18 + Vite 5 (SPA)
- **Backend**: Express 5 + Node.js (serves Vite in dev mode)
- **Database**: PostgreSQL via Drizzle ORM (node-postgres driver)
- **Auth**: Passport.js local strategy + express-session (connect-pg-simple store)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router DOM v6
- **State/Data**: TanStack React Query v5
- **Animations**: Framer Motion

## Project Structure
- `server/` — Express backend (index.ts, auth.ts, routes.ts, storage.ts, db.ts, vite.ts)
- `shared/` — Shared types and database schema (schema.ts)
- `src/` — React frontend
  - `src/pages/` — Marketing site pages
  - `src/pages/portal/` — Operations portal pages (Login, Dashboard, Drivers, Retention)
  - `src/components/portal/` — Portal-specific components (PortalLayout)
  - `src/hooks/` — Custom hooks (use-auth.ts, use-toast.ts)
  - `src/lib/` — Utilities (queryClient.ts)
- `drizzle.config.ts` — Drizzle Kit configuration

## Database Schema
- `users` — Portal admin/dispatcher users (id, username, password, name, role)
- `drivers` — Tracked owner operators (id, firstName, lastName, phone, email, hireDate, status, truckNumber, recruiter, retentionScore, riskLevel, notes, surveyToken, nextSurveyEmailAt)
- `retention_check_ins` — Survey check-in records (id, driverId, checkInType, status, responses as JSONB, aiRiskScore, aiSummary)
- `session` — express-session store (auto-created by connect-pg-simple)

## Key Pages

### Marketing Site
- `/` — Home / Index (Owner Operators landing)
- `/owner-operators` — Owner Operators main page
- `/owner-operators/:state` — State-specific owner operator pages
- `/company-drivers` — Company Drivers page
- `/fleet-program` — Fleet Program page
- `/freight-shipping-services` — Freight Services page
- `/about` — About page
- `/contact` — Contact page
- `/careers` — Careers listing
- `/careers/:slug` — Career detail page
- `/blog` — Blog listing
- `/blog/:slug` — Blog post page
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service
- `/:recruiter` — Driver Funnel (recruiter-specific landing page, e.g. /ben, /milos)

### Operations Portal
- `/portal/login` — Portal authentication (login/register)
- `/portal` — Dashboard (Kanban board: Week 1 → Week 2 → Week 3 → Week 4 → Complete)
- `/portal/drivers` — Driver list with search/filter
- `/portal/drivers/:id` — Driver detail with retention history
- `/portal/retention` — All retention check-ins board (4 columns)
- `/portal/retention/new` — New check-in form (Week 1/2/3/4 surveys)
- `/portal/retention/:id` — Check-in detail with responses
- `/portal/survey-links` — Survey link management, copy/share links, send emails

### Public Survey Pages
- `/survey/register` — Driver self-registration (creates profile + starts Week 1 survey)
- `/survey/:token` — Unique survey link per driver (token-based, no login required)

## Retention Check-In System
Four survey phases based on driver onboarding timeline:
- **Week 1 — Seamless Start**: Tools access, truck condition, support, promise match, orientation
- **Week 2 — Operational Flow**: Tech issues, pay understanding, dispatcher responsiveness, respect, support
- **Week 3 — Settling In**: Routine, communication quality, miles consistency, maintenance response, team relationship, satisfaction
- **Week 4 — Partnership Fit**: Pay alignment, home time satisfaction, NPS score, profitability, exit risk

## Survey Token System
- Each driver gets a unique `surveyToken` (48-char hex string) stored in the `drivers` table
- Tokens are auto-generated on driver creation; can be regenerated from Survey Links page
- Public survey URL: `{APP_URL}/survey/{token}` — shows the next incomplete survey week
- Server enforces sequential completion (week1 → week2 → week3 → week4)

## Email Integration (Resend)
- `RESEND_API_KEY` env var required for email sending
- `RESEND_FROM_EMAIL` optional (defaults to `noreply@ava.rankmehigher.com`)
- `APP_URL` optional for survey links in emails
- Endpoint: `POST /api/portal/send-survey-emails` — sends reminder to all drivers with incomplete surveys
- **Timed Survey Flow**: When a driver completes a survey, `nextSurveyEmailAt` is set 7 days out. A background scheduler (`processPendingSurveyEmails`) runs hourly (with initial 30s startup check) to send due emails and clear the timestamp. Admin manually sends Week 1; Weeks 2-4 auto-send 7 days after each completion.

## AI Retention Scoring
Automated risk scoring based on survey responses:
- **Low risk** (75-100%): Strong satisfaction, low flight risk
- **Medium risk** (60-74%): Some concerns, monitor closely
- **High risk** (40-59%): Multiple risk factors, intervention needed
- **Critical risk** (0-39%): Likely considering leaving, urgent attention

Factors: promise match, NPS score, profitability assessment, exit risk indicators, support feelings, dispatcher responsiveness, pay alignment, home time satisfaction.

## Scripts
- `npm run dev` — Start Express server with Vite middleware (port 5000)
- `npm run build` — Build frontend for production
- `npm run db:push` — Push database schema changes

## Important Notes
- VSL video: Bunny CDN HLS at `https://vz-2fd304ff-2c7.b-cdn.net/abd64adf-5822-4788-9d14-2bc7bc6e7d46/playlist.m3u8`
- Partner logos stored locally in `src/assets/brands/`
- CSS color variables in `src/index.css`: dark navy theme (background 222 42% 12%)
- Portal uses its own dark theme (#0d1117/#161b22) separate from marketing site
- Vite config: `server.host = "0.0.0.0"`, `port = 5000`, `allowedHosts: true`
