// Shared outbound-notification helpers: Telegram (team) + Resend (drivers).
// Used by the retention survey flow and the rewards automation engine.

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "-1003752172558";

/** Public base URL of the app — used for certificate/portal links inside emails. */
export function appBaseUrl(): string {
  if (process.env.REPLIT_DEV_DOMAIN) return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  return process.env.APP_URL || "https://goxxii.com";
}

/** Fire-and-forget team notification. Never throws — a Telegram outage must not
 *  break the award run. */
export async function sendTelegramNotification(message: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.warn("TELEGRAM_BOT_TOKEN not configured, skipping notification");
    return;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram API error:", err);
    }
  } catch (err) {
    console.error("Failed to send Telegram notification:", err);
  }
}

/** Send one email through Resend. Throws on failure so the caller can record it. */
export async function sendEmail(opts: { to: string; subject: string; html: string }): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "XXII Century <noreply@ava.rankmehigher.com>",
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Resend API error: ${err}`);
  }
}
