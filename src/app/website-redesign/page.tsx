import type { Metadata } from "next";
import { ServiceScreen, serviceMetadata } from "@/lib/renderServicePage";

export const metadata: Metadata = serviceMetadata("website-redesign");

export default function Page() {
  return <ServiceScreen slug="website-redesign" />;
}
