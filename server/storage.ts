import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import {
  users, drivers, retentionCheckIns, leads,
  InsertUser, User, InsertDriver, Driver, InsertCheckIn, RetentionCheckIn,
  InsertLead, Lead
} from "../shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getDrivers(): Promise<Driver[]>;
  getDriver(id: number): Promise<Driver | undefined>;
  getDriverByToken(token: string): Promise<Driver | undefined>;
  createDriver(driver: InsertDriver): Promise<Driver>;
  updateDriver(id: number, data: Partial<Driver>): Promise<Driver | undefined>;
  deleteDriver(id: number): Promise<void>;

  getCheckIns(driverId?: number): Promise<RetentionCheckIn[]>;
  getCheckIn(id: number): Promise<RetentionCheckIn | undefined>;
  createCheckIn(checkIn: InsertCheckIn): Promise<RetentionCheckIn>;
  updateCheckIn(id: number, data: Partial<RetentionCheckIn>): Promise<RetentionCheckIn | undefined>;

  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  deleteLead(id: number): Promise<void>;

  getDashboardStats(): Promise<{
    totalDrivers: number;
    activeDrivers: number;
    atRiskDrivers: number;
    pendingCheckIns: number;
    avgRetentionScore: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [created] = await db.insert(users).values(user).returning();
    return created;
  }

  async getDrivers(): Promise<Driver[]> {
    return db.select().from(drivers).orderBy(desc(drivers.id));
  }

  async getDriver(id: number): Promise<Driver | undefined> {
    const [driver] = await db.select().from(drivers).where(eq(drivers.id, id));
    return driver;
  }

  async getDriverByToken(token: string): Promise<Driver | undefined> {
    const [driver] = await db.select().from(drivers).where(eq(drivers.surveyToken, token));
    return driver;
  }

  async createDriver(driver: InsertDriver): Promise<Driver> {
    const [created] = await db.insert(drivers).values(driver).returning();
    return created;
  }

  async updateDriver(id: number, data: Partial<Driver>): Promise<Driver | undefined> {
    const [updated] = await db.update(drivers).set(data).where(eq(drivers.id, id)).returning();
    return updated;
  }

  async deleteDriver(id: number): Promise<void> {
    await db.delete(drivers).where(eq(drivers.id, id));
  }

  async getCheckIns(driverId?: number): Promise<RetentionCheckIn[]> {
    if (driverId) {
      return db.select().from(retentionCheckIns)
        .where(eq(retentionCheckIns.driverId, driverId))
        .orderBy(desc(retentionCheckIns.createdAt));
    }
    return db.select().from(retentionCheckIns).orderBy(desc(retentionCheckIns.createdAt));
  }

  async getCheckIn(id: number): Promise<RetentionCheckIn | undefined> {
    const [checkIn] = await db.select().from(retentionCheckIns).where(eq(retentionCheckIns.id, id));
    return checkIn;
  }

  async createCheckIn(checkIn: InsertCheckIn): Promise<RetentionCheckIn> {
    const [created] = await db.insert(retentionCheckIns).values(checkIn).returning();
    return created;
  }

  async updateCheckIn(id: number, data: Partial<RetentionCheckIn>): Promise<RetentionCheckIn | undefined> {
    const [updated] = await db.update(retentionCheckIns).set(data).where(eq(retentionCheckIns.id, id)).returning();
    return updated;
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [created] = await db.insert(leads).values(lead).returning();
    return created;
  }

  async getLeads(): Promise<Lead[]> {
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async deleteLead(id: number): Promise<void> {
    await db.delete(leads).where(eq(leads.id, id));
  }

  async getDashboardStats() {
    const allDrivers = await db.select().from(drivers);
    const allCheckIns = await db.select().from(retentionCheckIns);

    const activeDrivers = allDrivers.filter(d => d.status === "active");
    const atRiskDrivers = allDrivers.filter(d => d.riskLevel === "high" || d.riskLevel === "critical");
    const pendingCheckIns = allCheckIns.filter(c => c.status === "pending");

    const scores = allDrivers.filter(d => d.retentionScore !== null).map(d => d.retentionScore!);
    const avgRetentionScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

    return {
      totalDrivers: allDrivers.length,
      activeDrivers: activeDrivers.length,
      atRiskDrivers: atRiskDrivers.length,
      pendingCheckIns: pendingCheckIns.length,
      avgRetentionScore,
    };
  }
}

export const storage = new DatabaseStorage();
