import type { Metadata } from "next";
import { ServiceScreen, serviceMetadata } from "@/lib/renderServicePage";

export const metadata: Metadata = serviceMetadata("business-automation");

export default function Page() {
  return <ServiceScreen slug="business-automation" />;
}
