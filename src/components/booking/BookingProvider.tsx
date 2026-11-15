"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { BookingModal } from "@/components/booking/BookingModal";

const BookingContext = createContext<{ openBooking: () => void } | null>(null);

export const useBooking = () => useContext(BookingContext);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { setScrollLocked } = useSmoothScroll();
  const openBooking = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    setScrollLocked(true);
    return () => setScrollLocked(false);
  }, [open, setScrollLocked]);

  useEffect(() => {
    if (window.location.hash === "#book") setOpen(true);
  }, []);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <BookingModal open={open} onClose={close} />
    </BookingContext.Provider>
  );
}
