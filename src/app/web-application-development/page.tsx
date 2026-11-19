import type { Metadata } from "next";
import { ServiceScreen, serviceMetadata } from "@/lib/renderServicePage";

export const metadata: Metadata = serviceMetadata("web-application-development");

export default function Page() {
  return <ServiceScreen slug="web-application-development" />;
}
