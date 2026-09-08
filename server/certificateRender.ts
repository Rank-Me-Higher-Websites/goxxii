// Turns the certificate HTML into files a driver can keep: a print-ready PDF and
// a PNG for sharing.
//
// Rendered with headless Chromium (Puppeteer bundles its own, so this does not
// depend on Chrome being installed on the host). Chromium is heavy to start, so
// one browser is reused for the whole award cycle and closed at the end.
//
// NOTHING here may break an award run. Every entry point resolves to null on
// failure and the caller falls back to emailing the certificate link.

import type { Browser } from "puppeteer";

/** The certificate sheet is authored at a fixed size. */
const SHEET_W = 1600;
const SHEET_H = 1000;
const LAUNCH_TIMEOUT_MS = 30_000;
const RENDER_TIMEOUT_MS = 20_000;

let browserPromise: Promise<Browser> | null = null;
let unavailable = false;

async function getBrowser(): Promise<Browser | null> {
  if (unavailable) return null;
  if (!browserPromise) {
    browserPromise = (async () => {
      const { default: puppeteer } = await import("puppeteer");
      return puppeteer.launch({
        headless: true,
        timeout: LAUNCH_TIMEOUT_MS,
        // --no-sandbox is required to run as root inside most container/VPS setups.
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
      });
    })();
  }
  try {
    return await browserPromise;
  } catch (err) {
    unavailable = true;
    browserPromise = null;
    console.warn(
      "[certificate] headless Chromium unavailable, falling back to link-only emails:",
      (err as Error)?.message,
    );
    return null;
  }
}

/** The sheet normally scales itself to the viewport; pin it to 1:1 for output. */
function pinScale(html: string): string {
  return html.replace("</head>", "<style>:root{--fit:1 !important}</style></head>");
}

export interface CertificateFiles {
  pdf: Buffer;
  png: Buffer;
}

/** Render one certificate to PDF + PNG. Returns null if rendering is unavailable. */
export async function renderCertificateFiles(html: string): Promise<CertificateFiles | null> {
  const browser = await getBrowser();
  if (!browser) return null;

  let page;
  try {
    page = await browser.newPage();
    // scale 1 keeps the PNG email-sized (~0.7MB); the PDF stays vector-sharp regardless.
    await page.setViewport({ width: SHEET_W, height: SHEET_H, deviceScaleFactor: 1 });
    await page.setContent(pinScale(html), {
      waitUntil: "load",
      timeout: RENDER_TIMEOUT_MS,
    });
    const png = (await page.screenshot({ type: "png" })) as Buffer;
    const pdf = (await page.pdf({
      width: `${SHEET_W}px`,
      height: `${SHEET_H}px`,
      printBackground: true,
      pageRanges: "1",
    })) as Buffer;
    return { pdf: Buffer.from(pdf), png: Buffer.from(png) };
  } catch (err) {
    console.warn("[certificate] render failed, falling back to link:", (err as Error)?.message);
    return null;
  } finally {
    await page?.close().catch(() => {});
  }
}

/** Close the shared browser. Safe to call even if one was never opened. */
export async function closeCertificateRenderer(): Promise<void> {
  if (!browserPromise) return;
  const p = browserPromise;
  browserPromise = null;
  try {
    const b = await p;
    await b.close();
  } catch {
    /* already gone */
  }
}

/** Filesystem-safe name, e.g. "Michael-Torres-1-Year-Certificate". */
export function certificateFileName(driverName: string, title: string): string {
  return `${driverName}-${title}`
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}
