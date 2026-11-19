import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { BlogIndex } from "@/components/sections/BlogIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Notes on websites, shops and software",
  description:
    "Notes from grow2gether on website cost, redesign, Shopify, web applications and what the first call covers. No invented statistics.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <SiteShell>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Blog", path: "/blog" }]))} />
      <BlogIndex />
    </SiteShell>
  );
}
