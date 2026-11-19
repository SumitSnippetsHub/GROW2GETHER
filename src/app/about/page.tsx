import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { About } from "@/components/sections/About";
import { TeamGallery } from "@/components/sections/TeamGallery";
import { RouteHero } from "@/components/sections/RouteHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, ORG_ID } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About — Founder-Led Web Studio in India, Delhi-NCR",
  description:
    "grow2gether is a founder-led studio based in India, Delhi-NCR, serving the US, UK and worldwide. Direct contact with the founder and a fixed price before we start.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteShell>
      <JsonLd
        data={graph(
          { "@type": "AboutPage", url: absoluteUrl("/about"), name: "About grow2gether", mainEntity: { "@id": ORG_ID } },
          breadcrumbSchema([{ name: "About", path: "/about" }]),
        )}
      />
      <RouteHero route="about" />
      <About />
      <TeamGallery />
    </SiteShell>
  );
}
