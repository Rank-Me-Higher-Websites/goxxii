import express from "express";
import { Router } from "express";
import { setupAuth } from "./auth";
import { registerRoutes, processPendingSurveyEmails } from "./routes";
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
  });
})();
