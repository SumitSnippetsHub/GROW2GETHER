export const BOOKING_TIME_ZONE = "Asia/Kolkata";
export const BOOKING_DURATION_MIN = 30;
export const BOOKING_WINDOW_DAYS = 45;

const IST_OFFSET_MIN = 330;
const LEAD_TIME_MIN = 180;
const DAY_START_MIN = 10 * 60;
const DAY_END_MIN = 19 * 60;
const SLOT_STEP_MIN = 30;
const BREAK = { from: 13 * 60, to: 14 * 60 };
const CLOSED_WEEKDAYS = new Set([0]);

export type BookingSlot = { minutes: number; start: Date };

function parseYmd(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  return { y: y!, m: m!, d: d! };
}

export function toYmd(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function istToday(now = new Date()) {
  return toYmd(new Date(now.getTime() + IST_OFFSET_MIN * 60_000));
}

export function addDays(ymd: string, days: number) {
  const { y, m, d } = parseYmd(ymd);
  return toYmd(new Date(Date.UTC(y, m - 1, d + days)));
}

export function weekdayOf(ymd: string) {
  const { y, m, d } = parseYmd(ymd);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function slotStart(ymd: string, minutes: number) {
  const { y, m, d } = parseYmd(ymd);
  return new Date(Date.UTC(y, m - 1, d, 0, minutes) - IST_OFFSET_MIN * 60_000);
}

export function slotsFor(ymd: string, now = new Date()): BookingSlot[] {
  const today = istToday(now);
  if (ymd < today || ymd > addDays(today, BOOKING_WINDOW_DAYS)) return [];
  if (CLOSED_WEEKDAYS.has(weekdayOf(ymd))) return [];

  const earliest = now.getTime() + LEAD_TIME_MIN * 60_000;
  const slots: BookingSlot[] = [];
  for (let minutes = DAY_START_MIN; minutes < DAY_END_MIN; minutes += SLOT_STEP_MIN) {
    if (minutes >= BREAK.from && minutes < BREAK.to) continue;
    const start = slotStart(ymd, minutes);
    if (start.getTime() >= earliest) slots.push({ minutes, start });
  }
  return slots;
}

export function isBookable(ymd: string, minutes: number, now = new Date()) {
  return slotsFor(ymd, now).some((slot) => slot.minutes === minutes);
}

export function formatIstTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h >= 12 ? "PM" : "AM";
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatIstDate(ymd: string) {
  const { y, m, d } = parseYmd(ymd);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function icsStamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function bookingRange(ymd: string, minutes: number) {
  const start = slotStart(ymd, minutes);
  const end = new Date(start.getTime() + BOOKING_DURATION_MIN * 60_000);
  return { start, end, startStamp: icsStamp(start), endStamp: icsStamp(end) };
}
