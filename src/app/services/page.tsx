import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services — Websites, E-commerce, Apps & Automation",
  description:
    "Custom website design, online shops, web apps and business automation. Based in India, Delhi-NCR. Serving the US, UK and worldwide. Individual work, fixed price from ₹5,900.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <SiteShell>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Services", path: "/services" }]))} />
      <ServicesIndex />
    </SiteShell>
  );
}
