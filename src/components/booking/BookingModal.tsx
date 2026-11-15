"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CalendarPlus,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Loader2,
  MessageCircle,
  Phone,
  Video,
  X,
} from "lucide-react";
import { bookingCopy as copy } from "@/data/booking";
import { contact, countryCodes } from "@/data/contact";
import { site } from "@/data/site";
import {
  BOOKING_DURATION_MIN,
  BOOKING_WINDOW_DAYS,
  addDays,
  bookingRange,
  formatIstTime,
  istToday,
  slotsFor,
  weekdayOf,
} from "@/lib/booking";
import { cn } from "@/lib/utils";

type View = "choose" | "pick" | "meet" | "call" | "done";
type Kind = "meet" | "call";
type FieldError = Partial<Record<"name" | "email" | "phone", string>>;

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MEET_STEPS = ["Pick a time", "Your details", "Confirmed"];
const serif = "var(--font-instrument), Georgia, serif";
const EXIT_MS = 260;
const PANEL_WIDTH: Record<View, number> = { choose: 460, pick: 740, meet: 480, call: 460, done: 440 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s-]{6,16}$/;

const inputClass =
  "h-12 w-full rounded-xl border border-black/10 bg-[#fafafa] px-4 text-[0.95rem] text-[#111] outline-none transition placeholder:text-black/35 focus:border-[#3b4cf0] focus:bg-white focus:ring-4 focus:ring-[#3b4cf0]/10 aria-[invalid=true]:border-[#e5484d]";

function monthMeta(month: string) {
  const [y, m] = month.split("-").map(Number) as [number, number];
  return {
    days: new Date(Date.UTC(y, m, 0)).getUTCDate(),
    offset: (weekdayOf(`${month}-01`) + 6) % 7,
    label: new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }),
  };
}

function shiftMonth(month: string, delta: number) {
  const [y, m] = month.split("-").map(Number) as [number, number];
  return new Date(Date.UTC(y, m - 1 + delta, 1)).toISOString().slice(0, 7);
}

function dayLabel(ymd: string, long = true) {
  return new Date(`${ymd}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: long ? "long" : "short",
    month: long ? "long" : "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      return;
    }
    setClosing(true);
    const timer = window.setTimeout(() => setMounted(false), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!mounted) return null;
  return <BookingDialog closing={closing} onClose={onClose} />;
}

function BookingDialog({ closing, onClose }: { closing: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const now = useMemo(() => new Date(), []);
  const today = istToday(now);
  const lastDay = addDays(today, BOOKING_WINDOW_DAYS);

  const timeZone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata", []);
  const isIst = timeZone === "Asia/Kolkata" || timeZone === "Asia/Calcutta";
  const zoneName = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "long" })
        .formatToParts(now)
        .find((part) => part.type === "timeZoneName")?.value ?? timeZone,
    [now, timeZone],
  );

  const firstOpenDay = useMemo(() => {
    for (let i = 0; i <= BOOKING_WINDOW_DAYS; i++) {
      const day = addDays(today, i);
      if (slotsFor(day, now).length) return day;
    }
    return today;
  }, [now, today]);

  const [view, setView] = useState<View>("choose");
  const [kind, setKind] = useState<Kind>("meet");
  const [month, setMonth] = useState(firstOpenDay.slice(0, 7));
  const [date, setDate] = useState<string | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    mode: "meet" as "meet" | "phone",
    when: copy.callWhen[0]!,
    website: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");

  const slots = useMemo(() => (date ? slotsFor(date, now) : []), [date, now]);
  const range = date !== null && minutes !== null ? bookingRange(date, minutes) : null;
  const meetPath = view === "pick" || view === "meet" || (view === "done" && kind === "meet");
  const meetStep = view === "pick" ? 0 : view === "meet" ? 1 : 2;

  const localTime = (value: Date) =>
    value.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone });

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([tabindex="-1"]), select, textarea',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  const go = (next: View) => {
    setServerError("");
    setErrors({});
    setView(next);
  };

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (key in errors) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = (target: Kind) => {
    const next: FieldError = {};
    if (form.name.trim().length < 2) next.name = copy.errors.name;
    if (target === "meet" && !EMAIL_RE.test(form.email.trim())) next.email = copy.errors.email;
    const needsPhone = target === "call" || form.mode === "phone";
    if ((needsPhone || form.phone.trim()) && !PHONE_RE.test(form.phone.trim())) next.phone = copy.errors.phone;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (target: Kind) => async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending || !validate(target)) return;
    if (target === "meet" && (date === null || minutes === null)) return;

    const payload =
      target === "meet"
        ? {
            type: "meeting",
            date,
            minutes,
            mode: form.mode,
            name: form.name,
            email: form.email,
            countryCode: form.countryCode,
            phone: form.phone.trim(),
            timeZone,
            website: form.website,
          }
        : {
            type: "callback",
            name: form.name,
            countryCode: form.countryCode,
            phone: form.phone.trim(),
            when: form.when,
            website: form.website,
          };

    setSending(true);
    setServerError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setServerError(data.error || copy.errors.network);
        if (res.status === 409) {
          setMinutes(null);
          setView("pick");
        }
        return;
      }
      setKind(target);
      setView("done");
    } catch {
      setServerError(copy.errors.network);
    } finally {
      setSending(false);
    }
  };

  const calendarLink = range
    ? `https://calendar.google.com/calendar/render?${new URLSearchParams({
        action: "TEMPLATE",
        text: `${form.mode === "meet" ? "Google Meet" : "Call"} with ${site.name}`,
        dates: `${range.startStamp}/${range.endStamp}`,
        details: `${BOOKING_DURATION_MIN}-minute project call. Questions: ${contact.email}`,
      }).toString()}`
    : "#";

  const { days, offset, label } = monthMeta(month);
  const canPrev = month > today.slice(0, 7);
  const canNext = month < lastDay.slice(0, 7);

  const nameField = (
    <Field label={copy.fields.name.label} error={errors.name}>
      <input
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        placeholder={copy.fields.name.placeholder}
        autoComplete="name"
        aria-invalid={Boolean(errors.name)}
        className={inputClass}
      />
    </Field>
  );

  const phoneField = (optional: boolean) => (
    <Field label={copy.fields.phone.label} error={errors.phone} optional={optional}>
      <div className="flex gap-2">
        <select
          value={form.countryCode}
          onChange={(e) => update("countryCode", e.target.value)}
          aria-label="Country code"
          className={cn(inputClass, "w-[92px] shrink-0 cursor-pointer px-3")}
        >
          {countryCodes.map((item) => (
            <option key={item.code} value={item.code}>
              {item.code} {item.label}
            </option>
          ))}
        </select>
        <input
          type="tel"
          inputMode="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder={copy.fields.phone.placeholder}
          autoComplete="tel-national"
          aria-invalid={Boolean(errors.phone)}
          className={inputClass}
        />
      </div>
    </Field>
  );

  const honeypot = (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      value={form.website}
      onChange={(e) => update("website", e.target.value)}
      className="absolute -left-[9999px] h-0 w-0 opacity-0"
    />
  );

  const submitRow = (labelText: string) => (
    <div className="flex flex-col-reverse gap-4 border-t border-black/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[0.8rem] leading-[1.45] text-[#777] sm:max-w-[16rem]">{copy.privacy}</p>
      <button
        type="submit"
        disabled={sending}
        className="inline-flex h-12 shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-[11px] bg-[#111] px-6 text-[0.95rem] font-medium text-white transition-colors hover:bg-black disabled:opacity-70"
      >
        {sending ? <Loader2 className="size-4 animate-spin" /> : null}
        {sending ? copy.sending : labelText}
        {sending ? null : <ArrowRight className="size-4" />}
      </button>
    </div>
  );

  const backButton = (to: View) => (
    <button
      type="button"
      onClick={() => go(to)}
      className="inline-flex items-center gap-1.5 rounded-full px-1 text-[0.9rem] text-[#555] transition-colors hover:text-[#111]"
    >
      <ArrowLeft className="size-4" />
      {copy.back}
    </button>
  );

  return (
    <div
      className={cn(
        "booking-overlay fixed inset-0 z-[95] flex items-end justify-center bg-black/50 backdrop-blur-[6px] sm:items-center sm:p-6",
        closing && "is-closing",
      )}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="booking-panel relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-[24px] bg-white text-[#111] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)] sm:max-h-[min(760px,92dvh)] sm:rounded-[24px]"
        style={{ maxWidth: PANEL_WIDTH[view], transition: "max-width 0.45s cubic-bezier(0.16,1,0.3,1)" }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-black/[0.05] text-black/70 transition-colors hover:bg-black hover:text-white"
        >
          <X className="size-[18px]" strokeWidth={2} />
        </button>


        <div className="shrink-0 border-b border-black/[0.06] px-5 pb-4 pt-5 pr-16 sm:px-7 sm:pt-6">
          <img src={site.logo.src} alt={site.name} width={site.logo.width} height={site.logo.height} className="h-5 w-auto" />
          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.14em] text-[#3b4cf0]">{copy.eyebrow}</p>
          <p id="booking-title" className="mt-1 text-[1.4rem] font-medium leading-tight tracking-[-0.03em]">
            {copy.title}{" "}
            <span className="font-normal italic" style={{ fontFamily: serif }}>
              {copy.titleAccent}
            </span>
          </p>
          {meetPath ? (
            <div className="mt-3 flex gap-1.5">
              {MEET_STEPS.map((name, index) => (
                <span
                  key={name}
                  className={cn("h-1 flex-1 rounded-full transition-colors", index <= meetStep ? "bg-[#3b4cf0]" : "bg-black/[0.08]")}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div data-lenis-prevent className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
          {serverError ? (
            <p role="alert" className="mb-5 rounded-xl bg-[#fff1f1] px-4 py-3 text-[0.9rem] text-[#c62a2f]">
              {serverError}
            </p>
          ) : null}

          {view === "choose" ? (
            <div key="choose" className="booking-step">
              <h3 className="text-[1.05rem] font-medium tracking-[-0.02em]">{copy.choose.title}</h3>
              <p className="mt-0.5 text-[0.88rem] text-[#666]">{copy.choose.hint}</p>
              <div className="mt-5 grid gap-2.5">
                <Option
                  icon={<Phone className="size-5" />}
                  tone="text-white"
                  toneColor="#111111"
                  title={copy.choose.options.call.title}
                  body={copy.choose.options.call.body}
                  onClick={() => go("call")}
                />
                <Option
                  icon={<Video className="size-5" />}
                  tone="text-white"
                  toneColor="#3b4cf0"
                  title={copy.choose.options.meet.title}
                  body={copy.choose.options.meet.body}
                  badge={copy.choose.options.meet.badge}
                  onClick={() => go("pick")}
                />
                <Option
                  icon={<MessageCircle className="size-5" />}
                  tone="text-white"
                  toneColor="#25d366"
                  title={copy.choose.options.whatsapp.title}
                  body={copy.choose.options.whatsapp.body}
                  href="/api/whatsapp"
                />
              </div>
            </div>
          ) : null}

          {view === "pick" ? (
            <div key="pick" className="booking-step">
              {backButton("choose")}
              <h3 className="mt-4 text-[1.4rem] font-medium tracking-[-0.025em]">{copy.pickTitle}</h3>
              <p className="mt-1 text-[0.92rem] text-[#666]">{copy.pickHint}</p>

              <div className="mt-5 grid gap-6 sm:grid-cols-[minmax(0,1fr)_190px]">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-[1rem] font-medium">{label}</p>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        aria-label="Previous month"
                        disabled={!canPrev}
                        onClick={() => setMonth(shiftMonth(month, -1))}
                        className="grid size-9 place-items-center rounded-full text-[#111] transition-colors hover:bg-black/[0.05] disabled:opacity-25 disabled:hover:bg-transparent"
                      >
                        <ChevronLeft className="size-[18px]" />
                      </button>
                      <button
                        type="button"
                        aria-label="Next month"
                        disabled={!canNext}
                        onClick={() => setMonth(shiftMonth(month, 1))}
                        className="grid size-9 place-items-center rounded-full text-[#111] transition-colors hover:bg-black/[0.05] disabled:opacity-25 disabled:hover:bg-transparent"
                      >
                        <ChevronRight className="size-[18px]" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-7 text-center text-[11px] font-medium uppercase tracking-[0.06em] text-black/40">
                    {WEEKDAYS.map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>
                  <div data-booking-days className="mt-3 grid grid-cols-7 gap-y-1.5">
                    {Array.from({ length: offset }, (_, i) => (
                      <span key={`pad-${i}`} />
                    ))}
                    {Array.from({ length: days }, (_, i) => {
                      const day = `${month}-${String(i + 1).padStart(2, "0")}`;
                      const available = slotsFor(day, now).length > 0;
                      const selected = day === date;
                      return (
                        <button
                          key={day}
                          type="button"
                          disabled={!available}
                          onClick={() => {
                            setDate(day);
                            setMinutes(null);
                            setServerError("");
                          }}
                          aria-pressed={selected}
                          aria-label={`${dayLabel(day)}${available ? "" : ", unavailable"}`}
                          className={cn(
                            "relative mx-auto grid size-10 place-items-center rounded-full text-[0.92rem] transition-all duration-200",
                            selected && "bg-[#3b4cf0] font-medium text-white shadow-[0_10px_22px_-10px_rgba(59,76,240,0.9)]",
                            !selected && available && "bg-[#eef0ff] font-medium text-[#2a35c9] hover:bg-[#dfe3ff]",
                            !available && "cursor-default text-black/25",
                          )}
                        >
                          {i + 1}
                          {day === today ? (
                            <span className={cn("absolute bottom-1.5 size-1 rounded-full", selected ? "bg-white" : "bg-current")} />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-6 flex items-center gap-2 text-[0.85rem] text-[#666]">
                    <Globe className="size-4" />
                    {zoneName}
                  </p>
                </div>

                <div className="min-w-0">
                  {date ? (
                    <div key={date} className="booking-step">
                      <p className="text-[0.95rem] font-medium">{dayLabel(date)}</p>
                      {slots.length ? (
                        <div data-lenis-prevent data-booking-slots className="mt-4 grid max-h-[340px] gap-2 overflow-y-auto pr-1">
                          {slots.map((slot) =>
                            slot.minutes === minutes ? (
                              <div key={slot.minutes} className="grid grid-cols-2 gap-2">
                                <span className="grid h-12 place-items-center rounded-xl bg-[#111] text-[0.92rem] font-medium text-white">
                                  {localTime(slot.start)}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => go("meet")}
                                  className="booking-next inline-flex h-12 items-center justify-center gap-1.5 rounded-xl bg-[#3b4cf0] text-[0.92rem] font-medium text-white transition-colors hover:bg-[#2a35c9]"
                                >
                                  {copy.next}
                                  <ArrowRight className="size-4" />
                                </button>
                              </div>
                            ) : (
                              <button
                                key={slot.minutes}
                                type="button"
                                onClick={() => setMinutes(slot.minutes)}
                                className="flex h-12 w-full flex-col items-center justify-center rounded-xl border border-[#3b4cf0]/30 text-[0.92rem] font-medium leading-tight text-[#2a35c9] transition-colors hover:border-[#3b4cf0] hover:bg-[#f5f6ff]"
                              >
                                {localTime(slot.start)}
                                {!isIst ? (
                                  <span className="text-[10px] font-normal text-black/40">{formatIstTime(slot.minutes)} IST</span>
                                ) : null}
                              </button>
                            ),
                          )}
                        </div>
                      ) : (
                        <p className="mt-4 text-[0.9rem] text-[#666]">{copy.noSlots}</p>
                      )}
                    </div>
                  ) : (
                    <div className="grid h-full min-h-[160px] place-items-center rounded-2xl border border-dashed border-black/10 p-6 text-center text-[0.9rem] text-black/45">
                      <span>
                        <CalendarDays className="mx-auto mb-2 size-5" />
                        {copy.pickEmpty}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {view === "meet" && date && range ? (
            <form key="meet" onSubmit={submit("meet")} noValidate className="booking-step">
              <div className="flex flex-wrap items-center gap-3">
                {backButton("pick")}
                <span className="inline-flex items-center gap-2 rounded-full bg-[#eef0ff] px-3 py-1.5 text-[0.82rem] font-medium text-[#2a35c9]">
                  <CalendarDays className="size-3.5" />
                  {dayLabel(date, false)} · {localTime(range.start)}
                </span>
              </div>
              <h3 className="mt-5 text-[1.4rem] font-medium tracking-[-0.025em]">{copy.meetTitle}</h3>

              <div className="mt-6 grid gap-5">
                <Field label={copy.fields.mode} as="div">
                  <div className="grid grid-cols-2 gap-2">
                    {(["meet", "phone"] as const).map((mode) => {
                      const active = form.mode === mode;
                      return (
                        <button
                          key={mode}
                          type="button"
                          aria-pressed={active}
                          onClick={() => update("mode", mode)}
                          className={cn(
                            "flex h-12 items-center justify-center gap-2 rounded-xl border text-[0.92rem] font-medium transition-all",
                            active ? "border-[#111] bg-[#111] text-white" : "border-black/10 text-[#333] hover:border-black/30",
                          )}
                        >
                          {mode === "meet" ? <Video className="size-4" /> : <Phone className="size-4" />}
                          {copy.modes[mode]}
                        </button>
                      );
                    })}
                  </div>
                </Field>
                <div className="grid gap-5">
                  {nameField}
                  <Field label={copy.fields.email.label} error={errors.email}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder={copy.fields.email.placeholder}
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      className={inputClass}
                    />
                  </Field>
                </div>
                {form.mode === "phone" ? phoneField(false) : null}
                {honeypot}
                {submitRow(copy.submitMeet)}
              </div>
            </form>
          ) : null}

          {view === "call" ? (
            <form key="call" onSubmit={submit("call")} noValidate className="booking-step">
              {backButton("choose")}
              <h3 className="mt-4 text-[1.4rem] font-medium tracking-[-0.025em]">{copy.callTitle}</h3>
              <p className="mt-1 text-[0.92rem] text-[#666]">{copy.callHint}</p>
              <div className="mt-6 grid gap-5">
                {nameField}
                {phoneField(false)}
                <Field label={copy.fields.when} as="div">
                  <div className="flex flex-wrap gap-2">
                    {copy.callWhen.map((option) => {
                      const active = form.when === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={active}
                          onClick={() => update("when", option)}
                          className={cn(
                            "rounded-full border px-4 py-2 text-[0.88rem] transition-all duration-200",
                            active ? "border-[#111] bg-[#111] text-white" : "border-black/10 text-[#333] hover:border-black/30",
                          )}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </Field>
                {honeypot}
                {submitRow(copy.submitCall)}
              </div>
            </form>
          ) : null}

          {view === "done" ? (
            <div key="done" className="booking-step mx-auto flex min-h-full max-w-[440px] flex-col items-center justify-center py-6 text-center">
              <span className="booking-check grid size-16 place-items-center rounded-full bg-[#3b4cf0] text-white shadow-[0_18px_40px_-16px_rgba(59,76,240,0.9)]">
                <Check className="size-7" strokeWidth={2.5} />
              </span>
              <h3 className="mt-6 text-[2.6rem] font-normal italic leading-none tracking-[-0.02em]" style={{ fontFamily: serif }}>
                {kind === "meet" ? copy.done.meetTitle : copy.done.callTitle}
              </h3>
              {kind === "meet" && date && range ? (
                <div className="mt-6 w-full rounded-2xl bg-[#f7f7f9] p-5 text-left">
                  <p className="flex items-center gap-2.5 text-[0.95rem] font-medium">
                    <CalendarDays className="size-4 text-[#3b4cf0]" />
                    {dayLabel(date)}
                  </p>
                  <p className="mt-2 flex items-center gap-2.5 text-[0.92rem] text-[#444]">
                    <Clock className="size-4 text-[#3b4cf0]" />
                    {localTime(range.start)} – {localTime(range.end)} · {copy.modes[form.mode]}
                  </p>
                </div>
              ) : null}
              <p className="mt-5 text-[0.95rem] leading-[1.5] text-[#555]">
                {kind === "meet" ? copy.done.meetBody : copy.done.callBody}
              </p>
              <div className="mt-7 flex w-full flex-col gap-2.5 sm:flex-row">
                {kind === "meet" ? (
                  <a
                    href={calendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-[11px] border border-black/10 text-[0.92rem] font-medium transition-colors hover:border-black/30"
                  >
                    <CalendarPlus className="size-4" />
                    {copy.done.calendar}
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-[11px] bg-[#111] text-[0.92rem] font-medium text-white transition-colors hover:bg-black"
                >
                  {copy.done.close}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Option({
  icon,
  tone,
  toneColor,
  title,
  body,
  badge,
  href,
  onClick,
}: {
  icon: ReactNode;
  tone: string;
  title: string;
  body: string;
  toneColor?: string;
  badge?: string;
  href?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <span
        className={cn("grid size-11 shrink-0 place-items-center rounded-[14px]", tone)}
        style={toneColor ? { backgroundColor: toneColor } : undefined}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="flex items-center gap-2 text-[0.98rem] font-medium tracking-[-0.015em]">
          {title}
          {badge ? (
            <span className="rounded-full bg-[#eef0ff] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#3b4cf0]">
              {badge}
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 block text-[0.84rem] leading-snug text-[#666]">{body}</span>
      </span>
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-black/[0.04] text-[#111] transition-all duration-300 group-hover:bg-[#111] group-hover:text-white">
        {href ? <ArrowUpRight className="size-4" /> : <ArrowRight className="size-4" />}
      </span>
    </>
  );
  const className =
    "group flex w-full items-center gap-3.5 rounded-2xl border border-black/[0.08] bg-white p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]";
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {inner}
    </button>
  );
}


function Field({
  label,
  error,
  optional,
  as = "label",
  children,
}: {
  label: string;
  error?: string | undefined;
  optional?: boolean;
  as?: "label" | "div";
  children: ReactNode;
}) {
  const Tag = as;
  return (
    <Tag className="grid gap-2">
      <span className="flex items-baseline justify-between text-[0.85rem] font-medium text-[#333]">
        {label}
        {optional ? <span className="text-[0.75rem] font-normal text-black/35">Optional</span> : null}
      </span>
      {children}
      {error ? <span className="text-[0.8rem] text-[#e5484d]">{error}</span> : null}
    </Tag>
  );
}
