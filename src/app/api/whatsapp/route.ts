import { NextResponse } from "next/server";
import { bookingCopy } from "@/data/booking";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const phone = process.env["BOOKING_PHONE_TO"]?.replace(/\D/g, "");
  if (!phone) return NextResponse.redirect(new URL("/#contact", request.url));
  const text = encodeURIComponent(bookingCopy.whatsappText);
  return NextResponse.redirect(`https://wa.me/${phone}?text=${text}`);
}
