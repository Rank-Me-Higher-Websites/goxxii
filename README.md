# XXII Century Trucking

Full-stack platform for **XXII Century Trucking** — a Chicago-based trucking carrier.

- **Public site** — marketing & driver recruitment (goxxii.com)
- **Operations portal** — internal driver retention tracking, AI risk scoring, weekly survey automation

## Stack

- **Frontend**: React 18 + Vite 5 + TypeScript
- **Backend**: Express 5 (Node.js)
- **Database**: PostgreSQL via Drizzle ORM
- **Auth**: Passport.js + express-session
- **Styling**: Tailwind CSS + shadcn/ui
- **Email**: Resend
- **Notifications**: Telegram Bot API

## Scripts

```bash
npm run dev      # Start dev server (Express + Vite, port 5000)
npm run build    # Build frontend for production
npm run db:push  # Push Drizzle schema changes to database
```

## Project Structure

- `server/` — Express backend
- `shared/` — Shared types and DB schema
- `src/` — React frontend (pages, components, hooks)
- `public/` — Static assets (favicon, sitemap.xml, robots.txt)

For full architecture details, see [`replit.md`](./replit.md).

## Deployment

Deployed via Replit Autoscale. Production domain: **https://goxxii.com**
