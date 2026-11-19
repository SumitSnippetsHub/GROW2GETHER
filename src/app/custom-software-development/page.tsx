import type { Metadata } from "next";
import { ServiceScreen, serviceMetadata } from "@/lib/renderServicePage";

export const metadata: Metadata = serviceMetadata("custom-software-development");

export default function Page() {
  return <ServiceScreen slug="custom-software-development" />;
}
