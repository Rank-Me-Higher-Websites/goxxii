import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { storage } from "./storage";
import type { Express } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db";

export function setupAuth(app: Express) {
  const PgStore = connectPgSimple(session);
  const isProduction = process.env.NODE_ENV === "production";

  if (!process.env.SESSION_SECRET && isProduction) {
    throw new Error("SESSION_SECRET environment variable is required in production");
  }

  app.use(
    session({
      store: new PgStore({ pool, createTableIfMissing: true }),
      secret: process.env.SESSION_SECRET || "xxii-dev-only-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: isProduction,
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) return done(null, false, { message: "Invalid credentials" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return done(null, false, { message: "Invalid credentials" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user || false);
    } catch (err) {
      done(err);
    }
  });

  app.post("/api/auth/register", requireAuth, async (req, res, next) => {
    try {
      const currentUser = req.user as any;
      if (currentUser.role !== "admin") {
        return res.status(403).json({ message: "Only admins can create new accounts" });
      }

      const { username, password, name, role } = req.body;
      if (!username || !password || !name) {
        return res.status(400).json({ message: "All fields required" });
      }

      const validRoles = ["admin", "dispatcher", "safety", "manager"];
      const userRole = validRoles.includes(role) ? role : "dispatcher";

      const existing = await storage.getUserByUsername(username);
      if (existing) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const hashed = await bcrypt.hash(password, 10);
      const user = await storage.createUser({ username, password: hashed, name, role: userRole });
      const { password: _, ...safe } = user;
      res.json(safe);
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/auth/bootstrap", async (req, res, next) => {
    try {
      const existingUsers = await storage.getDrivers();
      const adminCheck = await storage.getUserByUsername("admin");
      if (adminCheck) {
        return res.status(403).json({ message: "Admin account already exists" });
      }

      const { username, password, name } = req.body;
      if (!username || !password || !name) {
        return res.status(400).json({ message: "All fields required" });
      }

      const hashed = await bcrypt.hash(password, 10);
      const user = await storage.createUser({ username, password: hashed, name, role: "admin" });

      req.login(user, (err) => {
        if (err) return next(err);
        const { password: _, ...safe } = user;
        res.json(safe);
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info?.message || "Invalid credentials" });

      req.login(user, (err) => {
        if (err) return next(err);
        const { password: _, ...safe } = user;
        res.json(safe);
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout(() => res.json({ ok: true }));
  });

  app.get("/api/auth/me", (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    const { password: _, ...safe } = req.user as any;
    res.json(safe);
  });

  app.get("/api/auth/has-admin", async (_req, res) => {
    const admin = await storage.getUserByUsername("admin");
    res.json({ hasAdmin: !!admin });
  });
}

export function requireAuth(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
  next();
}
