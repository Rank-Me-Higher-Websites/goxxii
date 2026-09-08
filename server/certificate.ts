// Branded, print-ready HTML certificate for the XXII Century rewards program.
//
// One design per reward category: each carries its own emblem, accent, body copy
// and sign-off line, so a driver can tell a safety award from a fuel award at a
// glance. Everything is inline (system font stack, logo as a data URI) because this
// file has to survive being emailed, printed, and rendered to PDF by headless
// Chrome with no network access.
//
// Rendered by GET /api/rewards/certificate - see docs/REWARDS-AUTOMATION.md.

import { XXII_LOGO_PNG } from "./brandAssets";

export interface CertOptions {
  name: string;
  /** The specific milestone, e.g. "1-Year Certificate". Printed under the name. */
  title: string;
  /** Plain-English condition, e.g. "After 1 year". */
  subtitle?: string;
  /** Reward category label - selects the design. Falls back to a neutral theme. */
  category?: string;
  /** Human-readable, e.g. "August 2026". */
  date: string;
  /** e.g. "TEN-05-ONCE-00042" - printed small, for verification. */
  certId: string;
}

function esc(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string),
  );
}

interface Theme {
  /** Headline under "CERTIFICATE OF". Already HTML-escaped. */
  heading: string;
  accent: string;
  accentSoft: string;
  copy: string[];
  taglineAccent: string;
  taglineBold: string;
  /** Emblem glyph, drawn inside a 48x48 box in currentColor. */
  icon: string;
}

// --- emblem glyphs --------------------------------------------------------
const ICONS = {
  // Tenure = time served. A handshake (as in the design reference) turns to mush
  // at emblem size, so this reads the milestone instead: a dated, verified span.
  // Swap in a proper handshake asset here if one is supplied.
  calendarCheck: `<rect x="7" y="11" width="34" height="31" rx="4" fill="none" stroke="currentColor" stroke-width="2.6"/>
    <path d="M7 20 L41 20" stroke="currentColor" stroke-width="2.6"/>
    <path d="M16 6 L16 14 M32 6 L32 14" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M16 30 L22 36 L33 25" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`,
  road: `<path d="M15 42 L20 6 L28 6 L33 42 Z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M24 10 L24 15 M24 21 L24 27 M24 33 L24 39" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>`,
  fuel: `<path d="M11 42 L11 11 a4 4 0 0 1 4-4 l9 0 a4 4 0 0 1 4 4 l0 31 Z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M11 20 L28 20" stroke="currentColor" stroke-width="2.4"/>
    <path d="M28 17 L34 17 a3 3 0 0 1 3 3 l0 12 a3 3 0 0 0 6 0 L43 18 L39 13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M17 34 c0-6 4-10 10-10 0 6-4 10-10 10 Z" fill="currentColor" opacity=".9"/>`,
  shieldCheck: `<path d="M24 5 L40 11 L40 24 c0 10-7 16-16 19 -9-3-16-9-16-19 L8 11 Z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M16 23 L22 29 L33 18" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`,
  people: `<circle cx="24" cy="14" r="6" fill="none" stroke="currentColor" stroke-width="2.4"/>
    <path d="M13 36 c0-6.5 5-10 11-10 s11 3.5 11 10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="10" cy="20" r="4.6" fill="none" stroke="currentColor" stroke-width="2.2"/>
    <circle cx="38" cy="20" r="4.6" fill="none" stroke="currentColor" stroke-width="2.2"/>
    <path d="M3 37 c0-5.5 3.5-9 7.5-9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M45 37 c0-5.5-3.5-9-7.5-9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`,
  star: `<path d="M24 6 L29.5 18.5 L43 20.2 L33 29.3 L35.6 43 L24 36.3 L12.4 43 L15 29.3 L5 20.2 L18.5 18.5 Z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>`,
};

const NEUTRAL: Theme = {
  heading: "Achievement",
  accent: "#2ec478",
  accentSoft: "#7de3b0",
  copy: [
    "Thank you for the miles you run",
    "and the standard you hold",
    "on every one of them.",
  ],
  taglineAccent: "EARNED ON THE ROAD.",
  taglineBold: "RECOGNIZED HERE.",
  icon: ICONS.star,
};

// Keyed by the category labels in src/data/rewardsProgram.ts. Rename a category
// there and it must be renamed here too, or it quietly falls back to NEUTRAL.
const THEMES: Record<string, Theme> = {
  "Onboarding & Tenure": {
    heading: "Onboarding &amp; Tenure",
    accent: "#2ec478",
    accentSoft: "#7de3b0",
    copy: [
      "Thank you for your commitment",
      "to the road and your dedication",
      "to the XXII Century team.",
    ],
    taglineAccent: "ON THE ROAD TOGETHER.",
    taglineBold: "FOR THE LONG HAUL.",
    icon: ICONS.calendarCheck,
  },
  "Mileage Milestones": {
    heading: "Mileage Milestones",
    accent: "#38d9a9",
    accentSoft: "#8ff0d2",
    copy: [
      "Congratulations on reaching",
      "an incredible milestone.",
      "Every mile drives our success forward.",
    ],
    taglineAccent: "MORE MILES.",
    taglineBold: "MORE IMPACT.",
    icon: ICONS.road,
  },
  "Fuel Efficiency (MPG)": {
    heading: "Fuel Efficiency (MPG)",
    accent: "#4aa3ff",
    accentSoft: "#9ecbff",
    copy: [
      "Thank you for maximizing efficiency",
      "and helping drive down costs",
      "and emissions.",
    ],
    taglineAccent: "SMART DRIVING.",
    taglineBold: "STRONG RESULTS.",
    icon: ICONS.fuel,
  },
  "Safety & Compliance": {
    heading: "Safety &amp; Compliance",
    accent: "#2ec478",
    accentSoft: "#7de3b0",
    copy: [
      "Thank you for putting safety first",
      "and upholding the highest standards",
      "on and off the road.",
    ],
    taglineAccent: "SAFE DRIVING.",
    taglineBold: "EVERY DAY. EVERY MILE.",
    icon: ICONS.shieldCheck,
  },
  "Referral & Recruiting": {
    heading: "Referral &amp; Recruiting",
    accent: "#4aa3ff",
    accentSoft: "#9ecbff",
    copy: [
      "Thank you for helping grow",
      "the XXII Century family.",
      "Great drivers know great drivers.",
    ],
    taglineAccent: "STRONGER TOGETHER.",
    taglineBold: "DRIVING THE FUTURE.",
    icon: ICONS.people,
  },
};

export function themeForCategory(category?: string): Theme {
  if (!category) return NEUTRAL;
  return THEMES[category] ?? NEUTRAL;
}

/** The chevron field and horizon line that give every certificate its XXII look. */
function backdrop(accent: string): string {
  return `
  <svg class="bg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="gL" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${accent}" stop-opacity=".55"/>
        <stop offset="1" stop-color="#1e5fd0" stop-opacity=".10"/>
      </linearGradient>
      <linearGradient id="gR" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3f8dff" stop-opacity=".45"/>
        <stop offset="1" stop-color="#0a2450" stop-opacity=".06"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="0%" r="70%">
        <stop offset="0" stop-color="#1d4ed8" stop-opacity=".34"/>
        <stop offset="1" stop-color="#04070d" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="horizon" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stop-color="${accent}" stop-opacity=".20"/>
        <stop offset="1" stop-color="#0b1a33" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1600" height="1000" fill="url(#glow)"/>
    <g fill="url(#gL)">
      <path d="M-40 250 L150 450 L-40 650 L-40 578 L80 450 L-40 322 Z"/>
      <path d="M92 250 L282 450 L92 650 L92 578 L212 450 L92 322 Z"/>
      <path d="M224 250 L414 450 L224 650 L224 578 L344 450 L224 322 Z"/>
    </g>
    <g fill="url(#gR)">
      <path d="M1640 250 L1450 450 L1640 650 L1640 578 L1520 450 L1640 322 Z"/>
      <path d="M1508 250 L1318 450 L1508 650 L1508 578 L1388 450 L1508 322 Z"/>
      <path d="M1376 250 L1186 450 L1376 650 L1376 578 L1256 450 L1376 322 Z"/>
    </g>
    <path d="M760 1000 L1600 660 L1600 1000 Z" fill="url(#horizon)"/>
    <path d="M0 772 L1600 712" stroke="${accent}" stroke-opacity=".14" stroke-width="2"/>
  </svg>`;
}

/** Hex shield + ribbon: the medal that anchors the left column. */
function emblem(t: Theme): string {
  return `
  <svg class="medal" viewBox="0 0 200 250" aria-hidden="true">
    <defs>
      <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#eef3fb"/>
        <stop offset=".45" stop-color="#8fa3bd"/>
        <stop offset=".56" stop-color="#d3dcea"/>
        <stop offset="1" stop-color="#66788f"/>
      </linearGradient>
      <linearGradient id="face" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#13273f"/>
        <stop offset="1" stop-color="#060d18"/>
      </linearGradient>
      <linearGradient id="ribBlue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3286e6"/>
        <stop offset="1" stop-color="#123f6d"/>
      </linearGradient>
      <linearGradient id="ribAccent" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${t.accent}"/>
        <stop offset="1" stop-color="#0d4b34"/>
      </linearGradient>
    </defs>
    <path d="M60 150 L60 236 L83 217 L106 236 L106 150 Z" fill="url(#ribAccent)"/>
    <path d="M94 150 L94 236 L117 217 L140 236 L140 150 Z" fill="url(#ribBlue)"/>
    <path d="M100 10 L174 52 L174 138 L100 180 L26 138 L26 52 Z" fill="url(#ring)"/>
    <path d="M100 25 L161 59 L161 131 L100 165 L39 131 L39 59 Z" fill="url(#face)"/>
    <path d="M100 25 L161 59 L161 131 L100 165 L39 131 L39 59 Z" fill="none" stroke="${t.accent}" stroke-opacity=".50" stroke-width="2"/>
    <g transform="translate(62 57) scale(1.58)" color="${t.accentSoft}">${t.icon}</g>
  </svg>`;
}

export function renderCertificateHTML(o: CertOptions): string {
  const t = themeForCategory(o.category);
  const name = esc(o.name);
  const milestone = esc(o.title);
  const subtitle = o.subtitle ? esc(o.subtitle) : "";
  const date = esc(o.date);
  const certId = esc(o.certId);
  const headingPlain = t.heading.replace(/&amp;/g, "&");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${headingPlain} - ${name} - XXII Century Trucking</title>
<style>
  @page { size: 1600px 1000px; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    background: #04070d;
    font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  body { display: flex; align-items: center; justify-content: center; min-height: 100vh; }

  /* The sheet is a fixed 1600x1000 canvas so the print/PDF output is exact. On
     screen it is scaled down to fit - and the stage carries the SCALED size, so
     the page reflows instead of scrolling (a transform alone does not). */
  .stage {
    position: relative; flex: none;
    width: calc(1600px * var(--fit, 1));
    height: calc(1000px * var(--fit, 1));
  }
  .sheet {
    position: absolute; top: 0; left: 0;
    width: 1600px; height: 1000px; overflow: hidden;
    background: linear-gradient(155deg, #081426 0%, #050b16 55%, #04070d 100%);
    color: #eaf1fb;
    transform: scale(var(--fit, 1)); transform-origin: top left;
  }
  .bg { position: absolute; inset: 0; width: 100%; height: 100%; }

  .frame {
    position: absolute; inset: 26px;
    border: 1px solid rgba(120,170,255,.30);
    border-radius: 10px;
    box-shadow: inset 0 0 90px rgba(10,30,70,.55);
  }
  .frame::after {
    content: ""; position: absolute; inset: 9px;
    border: 1px solid rgba(255,255,255,.07); border-radius: 5px;
  }

  .inner {
    position: absolute; inset: 26px;
    padding: 52px 86px 56px;
    display: flex; flex-direction: column;
  }

  .brand { text-align: center; }
  /* The logo asset already carries the CENTURY wordmark - do not add a second one. */
  .brand img { width: 188px; height: auto; display: block; margin: 0 auto; }

  .kicker {
    margin-top: 38px; text-align: center;
    font-size: 21px; font-weight: 600; letter-spacing: .42em; text-indent: .42em;
    color: #b9cbe6; text-transform: uppercase;
  }
  h1 {
    margin-top: 12px; text-align: center;
    font-size: 64px; font-weight: 800; letter-spacing: .01em;
    text-transform: uppercase; color: #ffffff; line-height: 1.04;
  }

  .body {
    flex: 1; display: flex; align-items: center; gap: 64px; padding: 0 26px; margin-top: 4px;
  }
  .medal { width: 238px; height: 298px; flex: none; }

  .presented {
    font-size: 18px; font-weight: 700; letter-spacing: .24em; text-indent: .24em;
    text-transform: uppercase; color: ${t.accent};
  }
  .name { margin-top: 8px; font-size: 58px; font-weight: 600; letter-spacing: -.008em; color: #ffffff; }
  .rule {
    margin-top: 14px; height: 2px; width: 430px; border-radius: 2px;
    background: linear-gradient(90deg, ${t.accent} 0%, rgba(70,140,255,.55) 55%, rgba(70,140,255,0) 100%);
  }
  .milestone { margin-top: 18px; font-size: 22px; font-weight: 700; color: #ffffff; }
  .milestone span { font-weight: 400; color: #93a8c5; }
  .copy { margin-top: 14px; font-size: 22px; line-height: 1.55; color: #b6c6dd; max-width: 640px; }

  .signoff { display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; }
  .tagline .a { font-size: 17px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; color: ${t.accent}; }
  .tagline .b { margin-top: 3px; font-size: 20px; font-weight: 800; letter-spacing: .09em; text-transform: uppercase; color: #ffffff; }
  .meta { margin-top: 22px; font-size: 17px; color: #93a8c5; }
  .meta .id {
    display: block; margin-top: 5px; font-size: 12px; letter-spacing: .1em; color: #55688a;
    font-family: Consolas, "SF Mono", Menlo, monospace;
  }

  .sign { text-align: right; }
  .sign .mark {
    font-family: "Segoe Script", "Brush Script MT", "Snell Roundhand", cursive;
    font-size: 44px; color: #ffffff; line-height: 1; padding-right: 8px;
  }
  .sign .line { margin-top: 6px; height: 1px; width: 258px; background: rgba(190,210,240,.45); margin-left: auto; }
  .sign .who { margin-top: 10px; font-size: 16px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #dce7f7; }
  .sign .org { margin-top: 3px; font-size: 15px; color: #93a8c5; }

  @media print {
    body { display: block; }
    .stage { width: 1600px; height: 1000px; }
    .sheet { transform: none; }
  }
</style>
</head>
<body>
  <div class="stage">
  <div class="sheet">
    ${backdrop(t.accent)}
    <div class="frame"></div>
    <div class="inner">
      <div class="brand">
        <img src="${XXII_LOGO_PNG}" alt="XXII Century" />
      </div>

      <div class="kicker">Certificate of</div>
      <h1>${t.heading}</h1>

      <div class="body">
        ${emblem(t)}
        <div class="cite">
          <div class="presented">Proudly presented to</div>
          <div class="name">${name}</div>
          <div class="rule"></div>
          <div class="milestone">${milestone}${subtitle ? ` <span>&mdash; ${subtitle}</span>` : ""}</div>
          <div class="copy">${t.copy.join("<br />")}</div>
        </div>
      </div>

      <div class="signoff">
        <div class="tagline">
          <div class="a">${t.taglineAccent}</div>
          <div class="b">${t.taglineBold}</div>
          <div class="meta">${date}<span class="id">${certId}</span></div>
        </div>
        <div class="sign">
          <div class="mark">XXII</div>
          <div class="line"></div>
          <div class="who">Fleet Operations</div>
          <div class="org">XXII Century</div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <script>
    // Fit the fixed-size sheet to the viewer's screen. Print output is untouched.
    (function () {
      function fit() {
        var s = Math.min(window.innerWidth / 1600, window.innerHeight / 1000, 1);
        document.documentElement.style.setProperty("--fit", String(s));
      }
      fit();
      window.addEventListener("resize", fit);
    })();
  </script>
</body>
</html>`;
}
