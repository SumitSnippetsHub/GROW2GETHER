import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { Services } from "@/components/sections/Services";
import { Technologies } from "@/components/sections/Technologies";
import { Industries } from "@/components/sections/Industries";
import { RouteHero } from "@/components/sections/RouteHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services — Websites, E-commerce, Apps & Automation",
  description:
    "Custom website design, online shop development, web apps and business automation from grow2gether in New Delhi. Individual work, fixed price from ₹5,900.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <SiteShell>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Services", path: "/services" }]))} />
      <RouteHero route="services" />
      <Services />
      <Technologies />
      <Industries />
    </SiteShell>
  );
}
