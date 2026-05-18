// Build-time sitemap augmentor for goxxii.com.
//
// Runs after `vite build`. Reads public/sitemap.xml (the human-maintained
// source of truth — main pages, career detail pages, state pages, manual
// blog posts with real publication dates) and injects entries for any
// auto-generated blog posts found in src/content/blog/*.md that aren't
// already present. Writes the augmented result to dist/sitemap.xml.
//
// Manual edits to public/sitemap.xml are preserved verbatim.

import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

const SITE_URL = "https://goxxii.com";
const TODAY = new Date().toISOString().slice(0, 10);

const SOURCE = join(ROOT, "public/sitemap.xml");
const DEST = join(ROOT, "dist/sitemap.xml");

if (!existsSync(SOURCE)) {
  console.error(`Source sitemap missing: ${SOURCE}`);
  process.exit(1);
}

const existing = readFileSync(SOURCE, "utf8");

function autoBlogSlugs(): string[] {
  const dir = join(ROOT, "src/content/blog");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith(".md") && !f.startsWith("_") && !f.startsWith("."))
    .map(f => f.replace(/\.md$/, ""));
}

const slugs = autoBlogSlugs();
const newEntries: string[] = [];

for (const slug of slugs) {
  const url = `${SITE_URL}/blog/${slug}`;
  if (existing.includes(`<loc>${url}</loc>`)) continue;
  newEntries.push(`
  <url>
    <loc>${url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
}

let result = existing;
if (newEntries.length > 0) {
  const block = `\n  <!-- Auto-generated posts -->${newEntries.join("")}\n\n</urlset>\n`;
  result = result.replace(/\n*<\/urlset>\s*$/, block);
}

writeFileSync(DEST, result, "utf8");
console.log(
  `Wrote dist/sitemap.xml — preserved existing entries + injected ${newEntries.length} new auto-post URL(s)`,
);
