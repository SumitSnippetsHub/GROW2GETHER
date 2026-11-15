import { Resend } from "resend";
import { BOOKING_DURATION_MIN, bookingRange, formatIstDate, formatIstTime } from "@/lib/booking";

export type BookingMail =
  | {
      type: "callback";
      name: string;
      countryCode: string;
      phone: string;
      when: string;
    }
  | {
      type: "meeting";
      name: string;
      email: string;
      countryCode: string;
      phone: string;
      date: string;
      minutes: number;
      mode: "meet" | "phone";
      timeZone: string;
    };

const esc = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function digits(countryCode: string, phone: string) {
  return `${countryCode}${phone}`.replace(/\D/g, "");
}

function icsFile(b: Extract<BookingMail, { type: "meeting" }>) {
  const { startStamp, endStamp } = bookingRange(b.date, b.minutes);
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const fold = (text: string) => text.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\r?\n/g, "\\n");
  const how = b.mode === "meet" ? "Google Meet" : "Phone call";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//grow2gether//booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${startStamp}-${Math.random().toString(36).slice(2)}@grow2gether`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${startStamp}`,
    `DTEND:${endStamp}`,
    `SUMMARY:${fold(`${how} · ${b.name}`)}`,
    `DESCRIPTION:${fold(`${b.email}${b.phone ? ` · ${b.countryCode} ${b.phone}` : ""}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function receivedLabel() {
  return new Date().toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

function row(label: string, value: string, href?: string) {
  const inner = href
    ? `<a href="${esc(href)}" style="color:#111111;text-decoration:none;font-weight:500">${esc(value)}</a>`
    : esc(value);
  return `<tr>
    <td style="padding:12px 0;width:132px;color:#888888;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;border-bottom:1px solid #efefef;vertical-align:top">${esc(label)}</td>
    <td style="padding:12px 0;color:#111111;font-size:16px;font-weight:500;border-bottom:1px solid #efefef">${inner}</td>
  </tr>`;
}

function pill(href: string, label: string, bg: string, color: string) {
  return `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 18px;border-radius:11px;background:${bg};color:${color};font-size:14px;font-weight:600;text-decoration:none">${esc(label)}</a>`;
}

export function bookingMail(b: BookingMail) {
  const phone = `${b.countryCode} ${b.phone}`.trim();
  const tel = b.phone ? `tel:${digits(b.countryCode, b.phone)}` : "";
  const wa = b.phone ? `https://wa.me/${digits(b.countryCode, b.phone)}` : "";
  const kind = b.type === "callback" ? "Call back" : b.mode === "meet" ? "Google Meet" : "Phone call";
  const kindColor = b.type === "callback" ? "#111111" : "#3b4cf0";
  const subject =
    b.type === "callback"
      ? `Call back · ${b.name} · ${b.when}`
      : `${kind} booked · ${b.name} · ${formatIstDate(b.date)}, ${formatIstTime(b.minutes)}`;
  const heading = b.type === "callback" ? `${b.name} wants a call.` : `${b.name} booked a ${kind.toLowerCase()}.`;
  const when =
    b.type === "callback"
      ? b.when
      : `${formatIstDate(b.date)} · ${formatIstTime(b.minutes)} IST · ${BOOKING_DURATION_MIN} min`;

  const rows = [
    row("When", when),
    row("Name", b.name),
    ...(b.type === "meeting" ? [row("Email", b.email, `mailto:${b.email}`)] : []),
    ...(b.phone ? [row("Phone", phone, tel)] : [row("Phone", "Not given")]),
    ...(b.type === "meeting" ? [row("Meet via", kind), row("Their time zone", b.timeZone || "Unknown")] : []),
  ].join("");

  const actions = [
    tel ? pill(tel, "Call now", "#111111", "#ffffff") : "",
    wa ? pill(wa, "WhatsApp", "#25d366", "#ffffff") : "",
    b.type === "meeting" ? pill(`mailto:${b.email}`, "Reply", "#3b4cf0", "#ffffff") : "",
  ].join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f3f6;font-family:Jost,Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f3f6;padding:32px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 24px 60px rgba(17,17,17,0.08)">
          <tr>
            <td style="padding:28px 32px 0;border-bottom:1px solid #f0f0f3">
              <p style="margin:0;font-size:13px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#3b4cf0">grow2gether</p>
              <p style="margin:10px 0 22px;display:inline-block;padding:6px 10px;border-radius:999px;background:${kindColor};color:#ffffff;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase">${esc(kind)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px">
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:1.1;font-weight:normal;font-style:italic;color:#111111">${esc(heading)}</h1>
              <p style="margin:14px 0 0;color:#666666;font-size:15px;line-height:1.5">Received ${esc(receivedLabel())} IST. Reply from this mail to reach them directly.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 32px 8px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 32px">${actions}</td>
          </tr>
          <tr>
            <td style="padding:18px 32px;background:#111111;color:#ffffff">
              <p style="margin:0;font-size:13px;opacity:0.7">A new project conversation from the website.</p>
              <p style="margin:6px 0 0;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:16px">Let’s build it together.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `grow2gether · ${kind}`,
    heading,
    "",
    `When: ${when}`,
    `Name: ${b.name}`,
    b.type === "meeting" ? `Email: ${b.email}` : "",
    `Phone: ${b.phone ? phone : "Not given"}`,
    b.type === "meeting" ? `Meet via: ${kind}` : "",
    b.type === "meeting" ? `Their time zone: ${b.timeZone || "Unknown"}` : "",
  ]
    .filter((line) => line !== "")
    .join("\n");

  return {
    subject,
    html,
    text,
    replyTo: b.type === "meeting" ? b.email : undefined,
    ics: b.type === "meeting" ? icsFile(b) : undefined,
  };
}

export async function sendBookingEmail(b: BookingMail) {
  const apiKey = process.env["RESEND_API_KEY"];
  const to = process.env["BOOKING_EMAIL_TO"];
  if (!apiKey || !to) return false;

  const from = process.env["RESEND_FROM"] || "grow2gether <onboarding@resend.dev>";
  const mail = bookingMail(b);
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    ...(mail.replyTo ? { replyTo: mail.replyTo } : {}),
    ...(mail.ics
      ? { attachments: [{ filename: "grow2gether-call.ics", content: Buffer.from(mail.ics), contentType: "text/calendar" }] }
      : {}),
  });
  if (error) throw new Error(error.message);
  return true;
}
