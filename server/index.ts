import express from "express";
import { Router } from "express";
import { setupAuth } from "./auth";
import { registerRoutes, processPendingSurveyEmails } from "./routes";
import { runAwardCycle } from "./awards";
import { setupVite } from "./vite";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { storage } from "./storage";

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupAuth(app);

const router = Router();
registerRoutes(router);
app.use(router);

(async () => {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("Database connected");

    const existingAdmin = await storage.getUserByUsername("admin");
    if (!existingAdmin) {
      const bcrypt = await import("bcryptjs");
      const hashed = await bcrypt.hash("xxii2024", 10);
      await storage.createUser({ username: "admin", password: hashed, name: "Admin", role: "admin" });
      console.log("Admin user seeded");
    }
  } catch (err) {
    console.error("Database connection failed:", err);
  }

  if (process.env.NODE_ENV === "production") {
    const { serveStatic } = await import("./vite");
    serveStatic(app);
  } else {
    await setupVite(app);
  }

  const port = 5000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);

    setInterval(async () => {
      await processPendingSurveyEmails();
    }, 60 * 60 * 1000);

    setTimeout(() => processPendingSurveyEmails(), 30 * 1000);

    // Rewards automation: one award cycle per day. The ledger makes repeat runs
    // harmless, so an extra run after a restart can never double-award anyone.
    // Set REWARDS_AUTORUN=off to disable and drive it from an external cron
    // (POST /api/rewards/run with the x-cron-secret header) instead.
    if (process.env.REWARDS_AUTORUN !== "off") {
      const runAwards = async () => {
        try {
          await runAwardCycle();
        } catch (err) {
          console.error("Award cycle failed:", err);
        }
      };
      setInterval(runAwards, 24 * 60 * 60 * 1000);
      setTimeout(runAwards, 2 * 60 * 1000);
    }
  });
})();
