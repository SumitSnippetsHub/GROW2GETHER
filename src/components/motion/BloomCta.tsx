"use client";

import type { MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { useBooking } from "@/components/booking/BookingProvider";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type BloomCtaProps = {
  href?: string;
  label?: string;
  variant?: "dark" | "light";
  className?: string;
};

const CLUSTERS = [1, 2, 3, 4, 5, 6];

export function BloomCta({
  href = site.primaryCta.href,
  label = site.primaryCta.label,
  variant = "dark",
  className,
}: BloomCtaProps) {
  const booking = useBooking();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!booking) return;
    event.preventDefault();
    booking.openBooking();
  };

  return (
    <a
      href={href}
      onClick={onClick}
      aria-haspopup="dialog"
      className={cn("bloom-cta", variant === "light" && "bloom-cta--light", className)}
    >
      <span aria-hidden className="bloom-cta__bubbles">
        {CLUSTERS.map((n) => (
          <span key={n} className={`bloom-cta__cluster bloom-cta__cluster--${n}`}>
            <span className="bloom-cta__clover">
              <span className="bloom-cta__petal" />
              <span className="bloom-cta__petal" />
              <span className="bloom-cta__petal" />
              <span className="bloom-cta__petal" />
            </span>
          </span>
        ))}
      </span>
      <span className="bloom-cta__pill">
        <span>{label}</span>
        <span aria-hidden className="bloom-cta__typing">
          <i />
          <i />
          <i />
        </span>
        <ArrowUpRight className="bloom-cta__arrow" strokeWidth={2} />
      </span>
    </a>
  );
}
