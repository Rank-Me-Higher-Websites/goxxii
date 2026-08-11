// Self-contained, print-ready HTML certificate for the XXII Century rewards program.
// n8n renders this to PDF/PNG (HTML-to-PDF node or headless Chrome); drivers can also
// open the URL to view/print it. No external assets — everything is inline.

interface CertOptions {
  name: string;
  title: string; // e.g. "1-Year Certificate"
  subtitle?: string; // e.g. "For reaching 1 year of dedicated service"
  date: string; // human-readable, e.g. "03 Aug 2026"
  certId: string; // e.g. "TEN-05-000142"
}

function esc(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string),
  );
}

export function renderCertificateHTML(o: CertOptions): string {
  const name = esc(o.name);
  const title = esc(o.title);
  const subtitle = esc(o.subtitle || "");
  const date = esc(o.date);
  const certId = esc(o.certId);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title} — ${name} — XXII Century Trucking</title>
<style>
  @page { size: 1600px 1100px; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    background: #0b1626;
    font-family: "Segoe UI", -apple-system, Roboto, Helvetica, Arial, sans-serif;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .sheet {
    width: 1600px; height: 1100px; position: relative; overflow: hidden;
    margin: 0 auto;
    background:
      radial-gradient(900px 500px at 50% -8%, rgba(37,110,255,.28), transparent 60%),
      linear-gradient(160deg, #0d1c33 0%, #0a1424 55%, #0b1626 100%);
    color: #eaf1fb;
  }
  .frame {
    position: absolute; inset: 46px;
    border: 1px solid rgba(120,170,255,.28);
    border-radius: 22px;
  }
  .frame::after {
    content: ""; position: absolute; inset: 12px;
    border: 1px solid rgba(46,196,120,.30); border-radius: 14px;
  }
  .corner { position: absolute; width: 58px; height: 58px; }
  .corner::before, .corner::after { content:""; position:absolute; background:#2ec478; }
  .corner::before { width: 58px; height: 3px; } .corner::after { width: 3px; height: 58px; }
  .c-tl { top: 64px; left: 64px; } .c-tr { top: 64px; right: 64px; }
  .c-tr::before { right: 0; } .c-tr::after { right: 0; }
  .c-bl { bottom: 64px; left: 64px; } .c-bl::before { bottom: 0; } .c-bl::after { bottom: 0; }
  .c-br { bottom: 64px; right: 64px; }
  .c-br::before { right: 0; bottom: 0; } .c-br::after { right: 0; bottom: 0; }
  .inner {
    position: absolute; inset: 46px; display: flex; flex-direction: column;
    align-items: center; justify-content: center; text-align: center; padding: 0 130px;
  }
  .brand {
    font-size: 20px; letter-spacing: .42em; font-weight: 800; text-transform: uppercase;
    color: #8fbaff;
  }
  .brand .x { color: #2ec478; }
  .badge {
    margin-top: 44px; width: 128px; height: 128px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: radial-gradient(circle at 50% 35%, rgba(46,196,120,.28), rgba(37,110,255,.12));
    border: 2px solid rgba(46,196,120,.55);
  }
  .badge svg { width: 62px; height: 62px; }
  .eyebrow {
    margin-top: 40px; font-size: 15px; letter-spacing: .34em; text-transform: uppercase;
    color: rgba(220,232,250,.55);
  }
  .name {
    margin-top: 18px; font-size: 74px; line-height: 1.04; font-weight: 800;
    letter-spacing: -.5px; color: #ffffff;
  }
  .rule { margin: 26px auto 0; width: 200px; height: 2px;
    background: linear-gradient(90deg, transparent, #2ec478, transparent); }
  .title {
    margin-top: 30px; font-size: 30px; font-weight: 700; color: #7fe3ad;
  }
  .subtitle {
    margin-top: 14px; font-size: 22px; max-width: 900px; color: rgba(224,234,250,.72);
    line-height: 1.5;
  }
  .foot {
    position: absolute; left: 120px; right: 120px; bottom: 120px;
    display: flex; align-items: flex-end; justify-content: space-between;
  }
  .foot .col { text-align: left; }
  .foot .col.r { text-align: right; }
  .foot .lbl { font-size: 12px; letter-spacing: .28em; text-transform: uppercase;
    color: rgba(190,206,232,.5); }
  .foot .val { margin-top: 8px; font-size: 20px; font-weight: 600; color: #eaf1fb; }
  .foot .line { width: 240px; height: 1px; background: rgba(150,180,230,.4); margin-bottom: 10px; }
  .certid { font-family: "SFMono-Regular", Consolas, monospace; font-size: 15px; color: #8fbaff; }
</style>
</head>
<body>
  <div class="sheet">
    <div class="frame"></div>
    <span class="corner c-tl"></span><span class="corner c-tr"></span>
    <span class="corner c-bl"></span><span class="corner c-br"></span>
    <div class="inner">
      <div class="brand"><span class="x">XX</span>II Century Trucking</div>
      <div class="badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="#2ec478" stroke-width="1.6"
             stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="6"></circle>
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
        </svg>
      </div>
      <div class="eyebrow">Certificate of Achievement</div>
      <div class="name">${name}</div>
      <div class="rule"></div>
      <div class="title">${title}</div>
      ${subtitle ? `<div class="subtitle">${subtitle}</div>` : ""}
    </div>
    <div class="foot">
      <div class="col">
        <div class="line"></div>
        <div class="lbl">Awarded on</div>
        <div class="val">${date}</div>
      </div>
      <div class="col r">
        <div class="lbl">Certificate ID</div>
        <div class="val certid">${certId}</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}
