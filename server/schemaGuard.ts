import { sql } from "drizzle-orm";
import { db } from "./db";

/**
 * Brings the live database in line with `shared/schema.ts` for the columns and
 * tables that were added after the first deploy.
 *
 * Why this exists: the VPS deploy only pulls and rebuilds — it does not run
 * `drizzle-kit push`, and there are no migration files. So a column added in
 * code can be missing in the live database, and because Drizzle expands
 * `db.select().from(drivers)` into an explicit column list, EVERY read and
 * write of that table then fails with
 * `column drivers.driver_type does not exist`. That is what took the portal's
 * "Add New Driver" (and the whole drivers list) down in September 2026.
 *
 * Every statement is idempotent, so this is a no-op against an up-to-date
 * database. It is a safety net, not a substitute for `npm run db:push`.
 */
export async function ensureSchema(): Promise<void> {
  const statements = [
    // Added with the retention surveys.
    sql`ALTER TABLE drivers ADD COLUMN IF NOT EXISTS survey_token varchar(64)`,
    sql`ALTER TABLE drivers ADD COLUMN IF NOT EXISTS next_survey_email_at timestamp`,
    sql`CREATE UNIQUE INDEX IF NOT EXISTS drivers_survey_token_unique ON drivers (survey_token)`,
    // Added with the rewards automation (2026-09-08).
    sql`ALTER TABLE drivers ADD COLUMN IF NOT EXISTS driver_type varchar(20) NOT NULL DEFAULT 'company'`,
    sql`ALTER TABLE drivers ADD COLUMN IF NOT EXISTS samsara_driver_id varchar(64)`,
    sql`CREATE TABLE IF NOT EXISTS driver_awards (
      id serial PRIMARY KEY,
      driver_id integer NOT NULL,
      rule_id varchar(32) NOT NULL,
      period_key varchar(16) NOT NULL,
      event varchar(255) NOT NULL,
      category varchar(255) NOT NULL,
      rewards jsonb NOT NULL,
      cert_id varchar(64),
      cert_url text,
      fulfillment varchar(20) NOT NULL DEFAULT 'none',
      fulfillment_note text,
      fulfilled_at timestamp,
      email_status varchar(20) NOT NULL DEFAULT 'pending',
      email_error text,
      team_notified boolean NOT NULL DEFAULT false,
      created_at timestamp NOT NULL DEFAULT now()
    )`,
    sql`CREATE UNIQUE INDEX IF NOT EXISTS driver_awards_unique ON driver_awards (driver_id, rule_id, period_key)`,
  ];

  for (const statement of statements) {
    try {
      await db.execute(statement);
    } catch (err) {
      // One failed statement must not stop the others, and must never stop the
      // server from booting — the site itself does not need the portal tables.
      console.error("Schema guard statement failed:", (err as Error).message);
    }
  }
}
