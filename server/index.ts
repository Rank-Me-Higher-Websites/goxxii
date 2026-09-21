import express from "express";
import { Router } from "express";
import { setupAuth } from "./auth";
import { registerRoutes, processPendingSurveyEmails } from "./routes";
import { runAwardCycle } from "./awards";
import { setupVite } from "./vite";
import { ensureSchema } from "./schemaGuard";
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

    // The deploy does not run migrations, so reconcile the tables the portal
    // reads and writes before serving traffic. No-op when already in sync.
    await ensureSchema();

    // Seed the first portal admin from the environment. Never from a literal in the
    // source: a hardcoded default password is a published credential the moment
    // anyone reads the repository.
    const existingAdmin = await storage.getUserByUsername("admin");
    if (!existingAdmin) {
      const seedPassword = process.env.ADMIN_SEED_PASSWORD;
      if (seedPassword && seedPassword.length >= 12) {
        const bcrypt = await import("bcryptjs");
        const hashed = await bcrypt.hash(seedPassword, 10);
        await storage.createUser({ username: "admin", password: hashed, name: "Admin", role: "admin" });
        console.log("Admin user seeded from ADMIN_SEED_PASSWORD");
      } else {
        console.warn(
          "No portal admin exists and ADMIN_SEED_PASSWORD is unset (or under 12 chars) - " +
          "skipping the seed. Set it once, restart, then unset it.",
        );
      }
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

  // Last middleware: without it Express's default handler answers every thrown
  // error with an HTML page, which the client cannot read — over HTTP/2 the
  // status text is empty too, so the UI could only ever say "Request failed"
  // and the real cause never reached anyone.
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (res.headersSent) return;

    // Zod rejections are the caller's fault, and naming the bad field is safe.
    if (err?.name === "ZodError" && Array.isArray(err.issues)) {
      const detail = err.issues
        .map((i: any) => `${i.path?.join(".") || "body"}: ${i.message}`)
        .join("; ");
      console.warn("Validation error:", detail);
      return res.status(400).json({ message: `Invalid data — ${detail}` });
    }

    const status = Number(err?.status || err?.statusCode) || 500;
    // Full detail to the log, generic text to the client: database messages
    // name tables and columns and are not for the browser.
    console.error("Unhandled API error:", err);
    res.status(status).json({
      message: status >= 500 ? "Server error — the team has been notified" : err?.message || "Request failed",
    });
  });

  const port = 5000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);

    setInterval(async () => {
      await processPendingSurveyEmails();
    }, 60 * 60 * 1000);

    setTimeout(() => processPendingSurveyEmails(), 30 * 1000);

    // Rewards automation: one award cycle per day. The ledger makes repeat runs
    // harmless, so an extra run after a restart can never double-award anyone.
    // OFF unless REWARDS_AUTORUN=on. Deliberately opt-in: a fresh deploy must not
    // start emailing drivers before the ledger has been seeded (see docs). Or drive
    // it from an external cron
    // (POST /api/rewards/run with the x-cron-secret header) instead.
    if (process.env.REWARDS_AUTORUN === "on") {
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
