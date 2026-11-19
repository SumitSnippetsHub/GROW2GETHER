import type { Metadata } from "next";
import { ServiceScreen, serviceMetadata } from "@/lib/renderServicePage";

export const metadata: Metadata = serviceMetadata("nextjs-development");

export default function Page() {
  return <ServiceScreen slug="nextjs-development" />;
}
