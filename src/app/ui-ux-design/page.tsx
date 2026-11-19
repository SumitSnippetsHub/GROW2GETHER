import type { Metadata } from "next";
import { ServiceScreen, serviceMetadata } from "@/lib/renderServicePage";

export const metadata: Metadata = serviceMetadata("ui-ux-design");

export default function Page() {
  return <ServiceScreen slug="ui-ux-design" />;
}
