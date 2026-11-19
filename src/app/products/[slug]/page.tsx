import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ServiceStory } from "@/components/sections/ServiceStory";
import { products, getProduct } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getProduct(slug);
  if (!item) return { title: "Not found", robots: { index: false } };
  return pageMetadata({
    title: item.seo.title,
    description: item.seo.description,
    path: `/products/${item.slug}`,
    noindex: true,
  });
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getProduct(slug);
  if (!item) notFound();

  const siblings = products.map((product) => ({ title: product.title, href: `/products/${product.slug}` }));

  return (
    <SiteShell>
      <ServiceStory item={{ ...item, path: `/products/${item.slug}` }} siblings={siblings} />
    </SiteShell>
  );
}
