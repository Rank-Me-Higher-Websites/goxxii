// Renders one certificate per reward category into ./exports for visual review.
//   npx tsx scripts/preview-certificates.ts
import { mkdirSync, writeFileSync } from "node:fs";
import { renderCertificateHTML } from "../server/certificate";
import { REWARD_PROGRAM } from "../src/data/rewardsProgram";

const SAMPLES: Record<string, { title: string; subtitle: string }> = {
  "Onboarding & Tenure": { title: "1-Year Certificate", subtitle: "After 1 year" },
  "Mileage Milestones": { title: "100k Certificate", subtitle: "At 100,000 lifetime miles" },
  "Fuel Efficiency (MPG)": { title: "Best-MPG Certificate", subtitle: "Finish top 3 in the fleet for the month" },
  "Safety & Compliance": { title: "Clean-Record Certificate", subtitle: "Finish a month with zero violations" },
  "Referral & Recruiting": { title: "Referral Certificate", subtitle: "Refer a driver who stays 90 days" },
};

mkdirSync("exports/certificates", { recursive: true });
mkdirSync("exports/certificates/scaled", { recursive: true });

// The sheet is a fixed 1600x1000 and normally scales to fit via a small script.
// These extra copies pin the scale in CSS so they render whole in any static
// viewer (and in the review screenshots) without touching the shipped renderer.
const PREVIEW_SCALE = 0.44;
function scaled(html: string): string {
  return html.replace("</head>", `<style>:root { --fit: ${PREVIEW_SCALE} !important; }</style></head>`);
}

const links: string[] = [];
for (const cat of REWARD_PROGRAM) {
  const sample = SAMPLES[cat.label] ?? { title: "Certificate of Achievement", subtitle: "" };
  const slug = cat.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const html = renderCertificateHTML({
    name: "Michael Torres",
    title: sample.title,
    subtitle: sample.subtitle,
    category: cat.label,
    date: "August 2026",
    certId: `${cat.rules[0].id}-ONCE-01042`,
  });
  const file = `exports/certificates/${slug}.html`;
  writeFileSync(file, html, "utf-8");
  writeFileSync(`exports/certificates/scaled/${slug}.html`, scaled(html), "utf-8");
  links.push(`<li><a href="${slug}.html">${cat.label}</a></li>`);
  console.log("wrote", file);
}

writeFileSync(
  "exports/certificates/index.html",
  `<!doctype html><meta charset="utf-8"><title>Certificate previews</title>
<body style="font-family:Segoe UI,Arial,sans-serif;background:#0b1220;color:#e8eef8;padding:40px">
<h1 style="font-size:20px">XXII Century - certificate previews</h1><ul>${links.join("")}</ul></body>`,
  "utf-8",
);
console.log("wrote exports/certificates/index.html");
