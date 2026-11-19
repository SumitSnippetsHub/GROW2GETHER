import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ServiceStory } from "@/components/sections/ServiceStory";
import { JsonLd } from "@/components/seo/JsonLd";
import { projects } from "@/data/projects";
import { getServicePage, servicePages } from "@/data/servicePages";
import { projectSlug } from "@/lib/projects";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export function serviceMetadata(slug: string): Metadata {
  const item = getServicePage(slug);
  if (!item) return { title: "Service not found", robots: { index: false } };
  return pageMetadata({
    title: item.seo.title,
    description: item.seo.description,
    path: item.path,
    ...(item.seo.keywords ? { keywords: item.seo.keywords } : {}),
  });
}

export function ServiceScreen({ slug }: { slug: string }) {
  const item = getServicePage(slug);
  if (!item) notFound();

  const siblings = servicePages.map((page) => ({ title: page.title, href: page.path }));
  const related = item.related
    .map((id) => getServicePage(id))
    .filter((page) => page !== undefined)
    .map((page) => ({ title: page.title, href: page.path }));
  const work = item.projectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project) => project !== undefined)
    .map((project) => ({ title: project.title, href: `/works/${projectSlug(project.title)}` }));

  return (
    <SiteShell>
      <JsonLd
        data={graph(
          serviceSchema(item),
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: item.title, path: item.path },
          ]),
          ...(item.faqs.length ? [faqSchema(item.faqs)] : []),
        )}
      />
      <ServiceStory item={item} siblings={siblings} related={related} projects={work} />
    </SiteShell>
  );
}
