import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { DetailPageView } from "@/components/sections/details/DetailPageView";
import { JsonLd } from "@/components/seo/JsonLd";
import { services, getService } from "@/data/services";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getService(slug);
  if (!item) return { title: "Service not found", robots: { index: false } };

  return pageMetadata({
    title: item.seo.title,
    description: item.seo.description,
    path: `/services/${item.slug}`,
  });
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getService(slug);

  if (!item) {
    notFound();
  }

  return (
    <SiteShell>
      <JsonLd
        data={graph(
          serviceSchema(item),
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: item.title, path: `/services/${item.slug}` },
          ]),
          ...(item.faqs.length ? [faqSchema(item.faqs)] : []),
        )}
      />
      <DetailPageView item={item} type="service" allItems={services} />
    </SiteShell>
  );
}
