import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { RelightingImages } from "@/components/sections/RelightingImages";
import { WorksIndex } from "@/components/sections/WorksIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, worksSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Work — Websites & Online Shops Built in India",
  description:
    "Live websites and online shops by grow2gether: law firms, fashion and groomswear brands, a makeup artist, B2B ticketing platforms and a software studio.",
  path: "/works",
});

export default function WorksPage() {
  return (
    <SiteShell>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Work", path: "/works" }]), worksSchema())} />
      <WorksIndex />
      <RelightingImages />
    </SiteShell>
  );
}
