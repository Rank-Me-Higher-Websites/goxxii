import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
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
  retentionScore: integer("retention_score"),
  riskLevel: varchar("risk_level", { length: 20 }).default("unknown"),
  notes: text("notes"),
  surveyToken: varchar("survey_token", { length: 64 }).unique(),
  nextSurveyEmailAt: timestamp("next_survey_email_at"),
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

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertDriverSchema = createInsertSchema(drivers).omit({ id: true, retentionScore: true, riskLevel: true });
export const insertCheckInSchema = createInsertSchema(retentionCheckIns).omit({ id: true, createdAt: true, aiRiskScore: true, aiSummary: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDriver = z.infer<typeof insertDriverSchema>;
export type Driver = typeof drivers.$inferSelect;
export type InsertCheckIn = z.infer<typeof insertCheckInSchema>;
export type RetentionCheckIn = typeof retentionCheckIns.$inferSelect;
