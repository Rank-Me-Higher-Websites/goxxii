import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("dispatcher"),
});

export const drivers = pgTable("drivers", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 255 }),
  hireDate: timestamp("hire_date").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("active"),
  truckNumber: varchar("truck_number", { length: 50 }),
  recruiter: varchar("recruiter", { length: 255 }),
  // "company" | "owner_operator" — owner-operators buy their own fuel, so the
  // MPG rewards do not apply to them.
  driverType: varchar("driver_type", { length: 20 }).notNull().default("company"),
  retentionScore: integer("retention_score"),
  riskLevel: varchar("risk_level", { length: 20 }).default("unknown"),
  notes: text("notes"),
  surveyToken: varchar("survey_token", { length: 64 }).unique(),
  nextSurveyEmailAt: timestamp("next_survey_email_at"),
  // Set by the fleet integration so award runs can match a CRM driver to their
  // Samsara record. When empty the engine falls back to truck number, then name.
  samsaraDriverId: varchar("samsara_driver_id", { length: 64 }),
});

export const retentionCheckIns = pgTable("retention_check_ins", {
  id: serial("id").primaryKey(),
  driverId: integer("driver_id").notNull(),
  checkInType: varchar("check_in_type", { length: 20 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  submittedBy: integer("submitted_by"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  aiRiskScore: integer("ai_risk_score"),
  aiSummary: text("ai_summary"),
  responses: jsonb("responses"),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }),
  vehicle: varchar("vehicle", { length: 255 }),
  message: text("message"),
  source: varchar("source", { length: 100 }).notNull(),
  recruiter: varchar("recruiter", { length: 100 }),
  payload: jsonb("payload"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});


// Ledger of every reward the automation has already granted. This is what makes
// the nightly run idempotent: a row here means "already awarded, never again".
//   periodKey = "once"    -> one-time milestone (tenure, mileage, accident-free)
//   periodKey = "2026-08" -> monthly rule (MPG leaderboard, zero-violation month)
export const driverAwards = pgTable("driver_awards", {
  id: serial("id").primaryKey(),
  driverId: integer("driver_id").notNull(),
  ruleId: varchar("rule_id", { length: 32 }).notNull(),
  periodKey: varchar("period_key", { length: 16 }).notNull(),
  event: varchar("event", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  rewards: jsonb("rewards").notNull(), // Reward[] from src/data/rewardsProgram
  certId: varchar("cert_id", { length: 64 }),
  certUrl: text("cert_url"),
  // "none" when the award has no physical item, otherwise "pending" -> "shipped".
  fulfillment: varchar("fulfillment", { length: 20 }).notNull().default("none"),
  fulfillmentNote: text("fulfillment_note"),
  fulfilledAt: timestamp("fulfilled_at"),
  // "pending" | "sent" | "skipped" | "failed"
  emailStatus: varchar("email_status", { length: 20 }).notNull().default("pending"),
  emailError: text("email_error"),
  teamNotified: boolean("team_notified").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  uniqueAward: uniqueIndex("driver_awards_unique").on(t.driverId, t.ruleId, t.periodKey),
}));

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertDriverSchema = createInsertSchema(drivers).omit({ id: true, retentionScore: true, riskLevel: true });
export const insertCheckInSchema = createInsertSchema(retentionCheckIns).omit({ id: true, createdAt: true, aiRiskScore: true, aiSummary: true });
export const insertLeadSchema = createInsertSchema(leads).omit({ id: true, createdAt: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDriver = z.infer<typeof insertDriverSchema>;
export type Driver = typeof drivers.$inferSelect;
export type InsertCheckIn = z.infer<typeof insertCheckInSchema>;
export type RetentionCheckIn = typeof retentionCheckIns.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
// Straight from drizzle rather than drizzle-zod: awards are only ever written by the
// server-side engine, never parsed from request bodies, and the zod-derived insert
// types in this file currently collapse to `never` under the installed zod version.
export type InsertDriverAward = typeof driverAwards.$inferInsert;
export type DriverAward = typeof driverAwards.$inferSelect;
