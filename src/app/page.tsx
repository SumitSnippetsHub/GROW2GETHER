import type { Metadata } from "next";

import { HomePage } from "@/components/home/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/data/faqs";
import { site } from "@/data/site";
import { faqSchema, graph, ORG_ID, WEBSITE_ID } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: site.title,
  description: site.metaDescription,
  path: "/",
  absoluteTitle: true,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "WebPage",
            "@id": `${absoluteUrl("/")}#webpage`,
            url: absoluteUrl("/"),
            name: site.title,
            description: site.metaDescription,
            isPartOf: { "@id": WEBSITE_ID },
            about: { "@id": ORG_ID },
            inLanguage: "en-IN",
          },
          faqSchema(faqs),
        )}
      />
      <HomePage />
    </>
  );
}
