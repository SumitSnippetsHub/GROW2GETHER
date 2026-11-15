import { NextResponse } from "next/server";
import { z } from "zod";
import { contact } from "@/data/contact";
import { isBookable } from "@/lib/booking";
import { sendBookingEmail, type BookingMail } from "@/lib/booking-email";

export const runtime = "nodejs";

const env = (key: string) => process.env[key];

const name = z.string().trim().min(2).max(80);
const countryCode = z.string().trim().regex(/^\+\d{1,4}$/);
const phone = z.string().trim().regex(/^[\d\s-]{6,16}$/);
const honeypot = z.string().max(0).optional().default("");

const schema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("meeting"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    minutes: z.number().int().min(0).max(1439),
    mode: z.enum(["meet", "phone"]),
    name,
    email: z.string().trim().email().max(120),
    countryCode,
    phone: z.union([phone, z.literal("")]).optional().default(""),
    timeZone: z.string().trim().max(60).optional().default(""),
    website: honeypot,
  }),
  z.object({
    type: z.literal("callback"),
    name,
    countryCode,
    phone,
    when: z.string().trim().max(40),
    website: honeypot,
  }),
]);

type Request = z.infer<typeof schema>;

const hits = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

function alertText(r: Request) {
  if (r.type === "callback") {
    return `grow2gether · ${r.name} wants a call back\nPhone: ${r.countryCode} ${r.phone}\nWhen: ${r.when}`;
  }
  return `grow2gether · ${r.name} booked a ${r.mode === "meet" ? "Google Meet" : "phone call"}\nEmail: ${r.email}\nPhone: ${r.phone ? `${r.countryCode} ${r.phone}` : "Not given"}`;
}

function toMail(r: Request): BookingMail {
  if (r.type === "callback") {
    return { type: "callback", name: r.name, countryCode: r.countryCode, phone: r.phone, when: r.when };
  }
  return {
    type: "meeting",
    name: r.name,
    email: r.email,
    countryCode: r.countryCode,
    phone: r.phone,
    date: r.date,
    minutes: r.minutes,
    mode: r.mode,
    timeZone: r.timeZone || "",
  };
}

async function sendWhatsApp(r: Request) {
  const to = env("BOOKING_PHONE_TO");
  const apikey = env("CALLMEBOT_APIKEY");
  if (!to || !apikey) return false;
  const url = new URL("https://api.callmebot.com/whatsapp.php");
  url.searchParams.set("phone", to);
  url.searchParams.set("text", alertText(r));
  url.searchParams.set("apikey", apikey);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`WhatsApp alert failed: ${res.status}`);
  return true;
}

async function sendSms(r: Request) {
  const to = env("BOOKING_PHONE_TO");
  const key = env("FAST2SMS_API_KEY");
  if (!to || !key) return false;
  const res = await fetch("https://www.fast2sms.com/dev/bulkV2", {
    method: "POST",
    headers: { authorization: key, "Content-Type": "application/json" },
    body: JSON.stringify({ route: "q", message: alertText(r), numbers: to.slice(-10) }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`SMS alert failed: ${res.status}`);
  return true;
}

export async function POST(request: globalThis.Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
  }
  const data = parsed.data;
  if (data.website) return NextResponse.json({ ok: true });
  if (data.type === "meeting" && data.mode === "phone" && !data.phone) {
    return NextResponse.json({ error: "Please add your mobile number for a phone call." }, { status: 400 });
  }
  if (data.type === "meeting" && !isBookable(data.date, data.minutes)) {
    return NextResponse.json({ error: "That time is no longer available. Please pick another slot." }, { status: 409 });
  }

  const extras = await Promise.allSettled([sendBookingEmail(toMail(data)), sendWhatsApp(data), sendSms(data)]);
  extras.forEach((r) => r.status === "rejected" && console.error("[booking]", r.reason));
  const delivered = extras.some((r) => r.status === "fulfilled" && r.value);
  if (!delivered) {
    return NextResponse.json(
      { error: `Could not send just now. Try WhatsApp, or write to ${contact.email}.` },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true });
}
