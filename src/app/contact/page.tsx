import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { Contact } from "@/components/sections/Contact";
import { RouteHero } from "@/components/sections/RouteHero";
import { ContactExtras } from "@/components/sections/ContactExtras";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, ORG_ID } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Book a Free 30-Minute Project Call",
  description:
    "Talk to grow2gether about your website, online shop or app. Book a free 30-minute call, request a call back, or chat on WhatsApp. Based in India, Delhi-NCR. Serving the US, UK and worldwide.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteShell>
      <JsonLd
        data={graph(
          { "@type": "ContactPage", url: absoluteUrl("/contact"), name: "Contact grow2gether", mainEntity: { "@id": ORG_ID } },
          breadcrumbSchema([{ name: "Contact", path: "/contact" }]),
        )}
      />
      <RouteHero route="contact" />
      <Contact />
      <ContactExtras />
    </SiteShell>
  );
}
