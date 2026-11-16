import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { DetailPageView } from "@/components/sections/details/DetailPageView";
import { products, getProduct } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

// Short inclusion pages: kept out of the index so they don't compete with /products.
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
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getProduct(slug);

  if (!item) {
    notFound();
  }

  return (
    <SiteShell>
      <DetailPageView item={item} type="product" allItems={products} />
    </SiteShell>
  );
}
