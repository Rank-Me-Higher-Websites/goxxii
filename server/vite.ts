import type { Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, type ViteDevServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function setupVite(app: Express) {
  const vite: ViteDevServer = await createViteServer({
    server: { middlewareMode: true, hmr: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use((req, res, next) => {
    const url = req.originalUrl;
    if (url.startsWith("/api")) return next();

    try {
      const templatePath = path.resolve(__dirname, "..", "index.html");
      let template = fs.readFileSync(templatePath, "utf-8");
      vite.transformIndexHtml(url, template).then((html) => {
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      }).catch((e) => {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      });
    } catch (e) {
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "..", "dist");

  if (!fs.existsSync(distPath)) {
    throw new Error("Production build not found. Run `npm run build` first.");
  }

  app.use((req, res, next) => {
    const filePath = path.join(distPath, req.path);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return res.sendFile(filePath);
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}
