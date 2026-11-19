import type { Metadata } from "next";
import { ServiceScreen, serviceMetadata } from "@/lib/renderServicePage";

export const metadata: Metadata = serviceMetadata("web-design");

export default function Page() {
  return <ServiceScreen slug="web-design" />;
}
