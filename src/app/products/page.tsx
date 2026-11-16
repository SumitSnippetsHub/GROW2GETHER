import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { Products } from "@/components/sections/Products";
import { RouteHero } from "@/components/sections/RouteHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing — What Every Project Includes, from ₹5,900",
  description:
    "Every grow2gether project includes a custom concept and design, all-device support, data protection, quality checks and a personal handover. From ₹5,900.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <SiteShell>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Pricing", path: "/products" }]))} />
      <RouteHero route="products" />
      <Products />
    </SiteShell>
  );
}
