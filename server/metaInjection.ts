// ── Per-route meta injection for crawlers / link-preview bots ────────
//
// The site is a client-rendered SPA: in production the same index.html is
// served for every route, so social bots (iMessage, Slack, Facebook, LinkedIn,
// X) and first-wave Googlebot — none of which run JS — would otherwise see the
// homepage's meta on EVERY page. This middleware rewrites the served HTML's
// <title>/description/canonical/OpenGraph/Twitter tags per request path using
// the shared ROUTE_META source of truth. og:image is left untouched.

import { resolveRouteMeta } from "../src/data/routeMetaMap";

const SITE = "https://goxxii.com";

/** Escape a string for safe use inside an HTML attribute value or element text. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Replace the content="" of a single <meta name|property="key"> tag. */
function setMetaContent(
  html: string,
  attr: "name" | "property",
  key: string,
  value: string,
): string {
  const re = new RegExp(
    `(<meta\\s+${attr}="${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\s+content=")[^"]*(")`,
    "i",
  );
  return re.test(html) ? html.replace(re, `$1${esc(value)}$2`) : html;
}

/**
 * Inject route-specific meta into an index.html template string.
 * Safe to call on any HTML; tags that aren't present are simply skipped.
 */
export function injectMeta(html: string, reqPath: string): string {
  const meta = resolveRouteMeta(reqPath);
  const canonical = `${SITE}${meta.canonicalPath}`;
  const socialTitle = meta.ogTitle || meta.title;
  const socialDescription = meta.ogDescription || meta.description;
  const ogType = meta.ogType || "website";

  let out = html;

  // Primary
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(meta.title)}</title>`);
  out = setMetaContent(out, "name", "title", meta.title);
  out = setMetaContent(out, "name", "description", meta.description);
  if (meta.keywords) out = setMetaContent(out, "name", "keywords", meta.keywords);

  // Open Graph
  out = setMetaContent(out, "property", "og:title", socialTitle);
  out = setMetaContent(out, "property", "og:description", socialDescription);
  out = setMetaContent(out, "property", "og:url", canonical);
  out = setMetaContent(out, "property", "og:type", ogType);

  // Twitter
  out = setMetaContent(out, "name", "twitter:title", socialTitle);
  out = setMetaContent(out, "name", "twitter:description", socialDescription);
  out = setMetaContent(out, "name", "twitter:url", canonical);

  // Canonical link
  out = out.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/i,
    `$1${canonical}$2`,
  );

  return out;
}
