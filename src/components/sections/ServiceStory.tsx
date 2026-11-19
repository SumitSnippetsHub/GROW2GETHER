"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useBooking } from "@/components/booking/BookingProvider";
import type { DetailPage } from "@/data/detailPages";
import { site } from "@/data/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const jost = "var(--font-jost), ui-sans-serif, system-ui, sans-serif";
const serif = "var(--font-instrument), Georgia, 'Times New Roman', serif";
const mono = "var(--font-jetbrains), ui-monospace, monospace";
const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";

const tones = [
  {
    border: "linear-gradient(135deg,#e4e1f3 0%,#ecebf1 45%,#d9d0fb 80%,#cfc4fb 100%)",
    wash: "linear-gradient(160deg,#fbfaff 0%,#ffffff 45%,#fbf9ff 100%)",
    glow: "radial-gradient(closest-side,rgba(196,182,255,0.55),rgba(214,204,255,0.25) 55%,transparent)",
  },
  {
    border: "linear-gradient(135deg,#eeeaf0 0%,#f2e9e4 45%,#f7d9c6 85%,#e9dcef 100%)",
    wash: "linear-gradient(160deg,#ffffff 0%,#fffdfb 50%,#fbf9ff 100%)",
    glow: "radial-gradient(closest-side,rgba(255,206,170,0.6),rgba(255,224,200,0.25) 55%,transparent)",
  },
  {
    border: "linear-gradient(135deg,#cfe9ea 0%,#e6eef1 40%,#eae7f5 75%,#d8d2f7 100%)",
    wash: "linear-gradient(160deg,#f8fdfd 0%,#ffffff 45%,#fbfaff 100%)",
    glow: "radial-gradient(closest-side,rgba(176,226,226,0.6),rgba(200,226,246,0.28) 55%,transparent)",
  },
  {
    border: "linear-gradient(135deg,#ecebf2 0%,#f0e8f1 45%,#ecd3ec 80%,#f6dccb 100%)",
    wash: "linear-gradient(160deg,#ffffff 0%,#fffcfe 50%,#fdf9fb 100%)",
    glow: "radial-gradient(closest-side,rgba(236,190,236,0.55),rgba(214,200,255,0.25) 55%,transparent)",
  },
];

export type StoryLink = { title: string; href: string };

const grid = {
  backgroundImage:
    "linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px)",
  backgroundSize: "72px 72px",
};

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative mt-[0.15em] grid size-8 shrink-0 place-items-center text-[#111]">
      <span className="absolute h-px w-[18px] bg-current" />
      <span className={cn("absolute h-[18px] w-px origin-center bg-current transition-transform duration-500", ease, open && "rotate-90")} />
    </span>
  );
}

export function ServiceStory({
  item,
  related = [],
  projects = [],
  siblings = [],
}: {
  item: DetailPage;
  related?: StoryLink[];
  projects?: StoryLink[];
  siblings?: StoryLink[];
}) {
  const booking = useBooking();
  const [open, setOpen] = useState(0);
  const index = siblings.findIndex((link) => link.href === item.path);
  const prev = siblings.length ? siblings[(index - 1 + siblings.length) % siblings.length] : undefined;
  const next = siblings.length ? siblings[(index + 1) % siblings.length] : undefined;

  const book = () => {
    track("cta_click", { location: "service" });
    booking?.openBooking();
  };

  return (
    <article className="bg-white text-[#111]" style={{ fontFamily: jost }}>
      <header className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={grid} />
        <div className="relative mx-auto w-full px-5 pb-16 pt-32 sm:px-[3.4vw] md:pb-24 md:pt-40 lg:w-[84.5vw] lg:max-w-[1240px] lg:px-0">
          <p className="text-[0.95rem] font-medium tracking-[-0.02em] text-[#111]">Services</p>
          <h1
            className="mt-4 max-w-[16ch] font-medium tracking-[-0.045em]"
            style={{ fontSize: "clamp(3.2rem, 7vw, 6.6rem)", lineHeight: 0.95 }}
          >
            {item.title}
          </h1>
          <p
            className="mt-4 max-w-[22ch] pr-[0.06em] font-normal italic tracking-[-0.03em] text-[#111]"
            style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 3.4vw, 3rem)", lineHeight: 1.05 }}
          >
            {item.tagline}
          </p>
          <p className="mt-6 max-w-[40rem] text-[1.02rem] font-medium tracking-[-0.02em] text-[#111]">{site.location.line}</p>
          <p className="mt-6 max-w-[38rem] text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.55] text-[#222]">{item.summary}</p>
          <div className="mt-6 max-w-[40rem] space-y-4 text-[clamp(1rem,1.15vw,1.12rem)] leading-[1.65] text-[#333]">
            {item.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <button
            type="button"
            onClick={book}
            className="mt-10 inline-flex items-center gap-[clamp(1.5rem,2.6vw,2.75rem)] rounded-[11px] bg-[#111] py-[clamp(0.8rem,1.05vw,1rem)] pl-[clamp(1.05rem,1.35vw,1.35rem)] pr-[clamp(0.95rem,1.2vw,1.15rem)] text-[clamp(0.95rem,1.1vw,1.1rem)] font-medium text-white transition-colors duration-300 hover:bg-black"
          >
            {item.cta.button}
            <ArrowUpRight className="size-[1.05rem]" strokeWidth={2} />
          </button>
          <p className="mt-3 text-[0.95rem] text-[#555]">{item.cta.text}</p>
        </div>
      </header>

      {item.problems ? (
        <section className="mx-auto w-full px-5 py-16 sm:px-[3.4vw] lg:w-[84.5vw] lg:max-w-[1240px] lg:px-0">
          <h2 className="max-w-[18ch] font-medium tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", lineHeight: 0.98 }}>
            {item.problems.heading}
            <span className="mt-1 block pr-[0.05em] font-normal italic tracking-[-0.03em]" style={{ fontFamily: serif }}>
              {item.problems.italic}
            </span>
          </h2>
          <p className="mt-6 max-w-[42rem] text-[1.08rem] leading-[1.65] text-[#222]">{item.problems.intro}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {item.problems.items.map((problem, i) => {
              const tone = tones[i % tones.length]!;
              return (
                <article key={problem.title} className="rounded-[20px] p-px shadow-[0_18px_40px_-30px_rgba(60,50,120,0.35)]" style={{ backgroundImage: tone.border }}>
                  <div className="relative overflow-hidden rounded-[19px] px-6 py-7" style={{ backgroundImage: tone.wash }}>
                    <span aria-hidden className="pointer-events-none absolute -right-[12%] -top-[40%] aspect-square w-[46%] blur-2xl" style={{ backgroundImage: tone.glow }} />
                    <h3 className="relative text-[clamp(1.35rem,1.8vw,1.7rem)] font-medium leading-[1.15] tracking-[-0.03em]">{problem.title}</h3>
                    <p className="relative mt-3 text-[1.05rem] leading-[1.6] text-[#222]">{problem.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {item.offerings?.length ? (
        <section className="mx-auto w-full px-5 py-16 sm:px-[3.4vw] lg:w-[84.5vw] lg:max-w-[1240px] lg:px-0">
          <h2 className="font-medium tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", lineHeight: 0.98 }}>
            {item.title}
            <span className="mt-1 block pr-[0.05em] font-normal italic tracking-[-0.03em]" style={{ fontFamily: serif }}>
              what it covers.
            </span>
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {item.offerings.map((offer, i) => {
              const tone = tones[i % tones.length]!;
              return (
                <article key={offer.title} className="rounded-[20px] p-px shadow-[0_18px_40px_-30px_rgba(60,50,120,0.35)]" style={{ backgroundImage: tone.border }}>
                  <div className="relative overflow-hidden rounded-[19px] px-6 py-7" style={{ backgroundImage: tone.wash }}>
                    <span aria-hidden className="pointer-events-none absolute -right-[12%] -top-[40%] aspect-square w-[46%] blur-2xl" style={{ backgroundImage: tone.glow }} />
                    <p className="relative text-[#8a8a8a]" style={{ fontFamily: mono }}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="relative mt-3 text-[clamp(1.45rem,2vw,1.9rem)] font-medium leading-[1.1] tracking-[-0.035em]">{offer.title}</h3>
                    <p className="relative mt-3 max-w-[34rem] text-[1.05rem] leading-[1.6] text-[#222]">{offer.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mx-auto w-full px-5 py-16 sm:px-[3.4vw] lg:w-[84.5vw] lg:max-w-[1240px] lg:px-0">
        <h2 className="font-medium tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", lineHeight: 0.98 }}>
          What’s included
          <span className="mt-1 block pr-[0.05em] font-normal italic tracking-[-0.03em]" style={{ fontFamily: serif }}>
            in this work.
          </span>
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {(item.included ?? item.highlights).map((highlight, i) => {
            const tone = tones[i % tones.length]!;
            return (
              <article key={highlight.title} className="rounded-[20px] p-px shadow-[0_18px_40px_-30px_rgba(60,50,120,0.35)]" style={{ backgroundImage: tone.border }}>
                <div className="relative overflow-hidden rounded-[19px] px-6 py-7" style={{ backgroundImage: tone.wash }}>
                  <span aria-hidden className="pointer-events-none absolute -right-[12%] -top-[40%] aspect-square w-[46%] blur-2xl" style={{ backgroundImage: tone.glow }} />
                  <h3 className="relative text-[clamp(1.5rem,2vw,2rem)] font-medium leading-[1.1] tracking-[-0.035em]">{highlight.title}</h3>
                  <p className="relative mt-3 max-w-[28rem] text-[1.05rem] leading-[1.5] text-[#222]">{highlight.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {item.caution ? (
        <section className="border-t border-black/10">
          <div className="mx-auto grid w-full gap-10 px-5 py-16 sm:px-[3.4vw] lg:w-[84.5vw] lg:max-w-[1240px] lg:grid-cols-[0.9fr_1.1fr] lg:px-0">
            <div>
              <h2 className="font-medium tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", lineHeight: 0.98 }}>
                {item.caution.heading}
                <span className="mt-1 block font-normal italic tracking-[-0.03em]" style={{ fontFamily: serif }}>
                  {item.caution.italic}
                </span>
              </h2>
              <p className="mt-6 text-[1.05rem] leading-[1.65] text-[#222]">{item.caution.intro}</p>
              {item.caution.close ? <p className="mt-4 text-[1.05rem] leading-[1.65] text-[#333]">{item.caution.close}</p> : null}
            </div>
            <ul className="border-t border-black/10">
              {item.caution.points.map((point) => (
                <li key={point} className="border-b border-black/10 py-4 text-[1.05rem] leading-[1.5]">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {item.plans?.length ? (
        <section className="border-t border-black/10">
          <div className="mx-auto w-full px-5 py-16 sm:px-[3.4vw] lg:w-[84.5vw] lg:max-w-[1240px] lg:px-0">
            <h2 className="font-medium tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", lineHeight: 0.98 }}>
              Packages
              <span className="mt-1 block font-normal italic tracking-[-0.03em]" style={{ fontFamily: serif }}>
                for a website.
              </span>
            </h2>
            <p className="mt-6 max-w-[40rem] text-[1.05rem] leading-[1.6] text-[#333]">{item.plansNote}</p>
            <ul className="mt-10 grid gap-5 lg:grid-cols-3">
              {item.plans.map((plan) => (
                <li
                  key={plan.name}
                  className={cn(
                    "flex flex-col rounded-[20px] border px-6 py-7",
                    plan.featured ? "border-[#111] bg-[#111] text-white" : "border-black/10 bg-white text-[#111]",
                  )}
                >
                  <p className={cn("text-[0.85rem] font-medium uppercase tracking-[0.14em]", plan.featured ? "text-white/70" : "text-[#777]")} style={{ fontFamily: mono }}>
                    {plan.featured ? "Best offer" : "Package"}
                  </p>
                  <h3 className="mt-3 text-[1.8rem] font-medium tracking-[-0.04em]">{plan.name}</h3>
                  <p className="mt-4 text-[2rem] font-medium leading-none tracking-[-0.04em]">{plan.priceInr}</p>
                  <p className={cn("mt-1 text-[0.95rem]", plan.featured ? "text-white/70" : "text-[#666]")}>{plan.priceUsd}</p>
                  <ul className="mt-6 space-y-2 text-[0.98rem] leading-[1.45]">
                    {plan.items.map((entry) => (
                      <li key={entry.label} className={entry.included ? "" : plan.featured ? "text-white/45" : "text-black/40"}>
                        {entry.included ? entry.label : `Not included: ${entry.label}`}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="border-t border-black/10">
        <div className="mx-auto grid w-full gap-12 px-5 py-16 sm:px-[3.4vw] lg:w-[84.5vw] lg:max-w-[1240px] lg:grid-cols-[0.8fr_1.2fr] lg:px-0">
          <h2 className="font-medium tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", lineHeight: 0.98 }}>
            How it
            <span className="block font-normal italic" style={{ fontFamily: serif }}>
              starts.
            </span>
          </h2>
          <ol>
            {item.process.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-black/10 py-5">
                <span className="pt-1 text-[#8a8a8a]" style={{ fontFamily: mono }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.25rem] font-medium tracking-[-0.03em]">{step.title}</h3>
                  <p className="mt-1 leading-[1.55] text-[#333]">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid w-full gap-10 px-5 py-16 sm:px-[3.4vw] md:grid-cols-2 lg:w-[84.5vw] lg:max-w-[1240px] lg:px-0">
        <div>
          <h2 className="text-[1.6rem] font-medium tracking-[-0.03em]">Who it’s for</h2>
          <ul className="mt-4 space-y-2 text-[1.05rem] leading-[1.5] text-[#222]">
            {item.idealFor.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[1.6rem] font-medium tracking-[-0.03em]">What you leave with</h2>
          <ul className="mt-4 space-y-2 text-[1.05rem] leading-[1.5] text-[#222]">
            {item.outcomes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      {item.technologies.length ? (
        <section className="border-t border-black/10">
          <div className="mx-auto flex w-full flex-wrap items-center gap-x-6 gap-y-3 px-5 py-8 sm:px-[3.4vw] lg:w-[84.5vw] lg:max-w-[1240px] lg:px-0">
            <p className="text-[0.85rem] uppercase tracking-[0.14em] text-[#777]" style={{ fontFamily: mono }}>
              Stack
            </p>
            {item.technologies.map((name) => (
              <span key={name} className="text-[1rem] text-[#222]">
                {name}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {projects.length || related.length ? (
        <section className="border-t border-black/10">
          <div className="mx-auto grid w-full gap-12 px-5 py-16 sm:px-[3.4vw] md:grid-cols-2 lg:w-[84.5vw] lg:max-w-[1240px] lg:px-0">
            {projects.length ? (
              <div>
                <h2 className="text-[1.6rem] font-medium tracking-[-0.03em]">Related work</h2>
                <ul className="mt-4 space-y-3">
                  {projects.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex items-center gap-2 text-[1.15rem] font-medium tracking-[-0.02em] hover:text-[#555]">
                        {link.title}
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {related.length ? (
              <div>
                <h2 className="text-[1.6rem] font-medium tracking-[-0.03em]">Related services</h2>
                <ul className="mt-4 space-y-3">
                  {related.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex items-center gap-2 text-[1.15rem] font-medium tracking-[-0.02em] hover:text-[#555]">
                        {link.title}
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {item.faqs.length ? (
        <section className="border-t border-black/10 py-16">
          <div className="mx-auto w-full px-5 sm:px-[3.4vw] lg:w-[84.5vw] lg:max-w-[1240px] lg:px-0">
            <h2 className="font-medium tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", lineHeight: 0.95 }}>
              Questions,
              <span className="block font-normal italic" style={{ fontFamily: serif }}>
                answered.
              </span>
            </h2>
            <ul className="mt-8">
              {item.faqs.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <li key={faq.question} className={isOpen ? "my-3 rounded-[22px] border border-[#e4dff5] bg-[linear-gradient(165deg,#f6f3ff_0%,#ffffff_46%,#fbf9ff_100%)] px-5 py-5" : "border-b border-black/10"}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className={cn("grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-4 text-left", !isOpen && "py-5")}
                      >
                        <span className="pt-1 text-[#8a8a8a]" style={{ fontFamily: mono }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-medium tracking-[-0.03em]" style={{ fontSize: isOpen ? "clamp(1.25rem, 2vw, 1.7rem)" : "1.15rem" }}>
                          {faq.question}
                        </span>
                        <PlusMinus open={isOpen} />
                      </button>
                    </h3>
                    {isOpen ? <p className="max-w-[46rem] pb-2 pl-10 leading-[1.65] text-[#222]">{faq.answer}</p> : null}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {prev && next && prev.href !== item.path ? (
        <nav className="border-t border-black/10" aria-label="Other services">
          <div className="mx-auto flex w-full flex-col gap-6 px-5 py-10 sm:flex-row sm:justify-between sm:px-[3.4vw] lg:w-[84.5vw] lg:max-w-[1240px] lg:px-0">
            <Link href={prev.href} className="text-[1.15rem] font-medium tracking-[-0.02em] hover:text-[#555]">
              {prev.title}
            </Link>
            <Link href={next.href} className="text-[1.15rem] font-medium tracking-[-0.02em] hover:text-[#555] sm:text-right">
              {next.title}
            </Link>
          </div>
        </nav>
      ) : null}
    </article>
  );
}
