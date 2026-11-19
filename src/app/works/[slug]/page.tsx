import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { projects } from "@/data/projects";
import { getServicePage } from "@/data/servicePages";
import { getProject, projectSlug } from "@/lib/projects";
import { breadcrumbSchema, creativeWorkSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const relatedServices: Record<string, string[]> = {
  "01": ["web-application-development", "custom-software-development"],
  "02": ["web-application-development", "business-automation"],
  "03": ["ecommerce-development", "shopify-development"],
  "04": ["website-development", "website-development-delhi"],
  "05": ["website-development", "web-design"],
  "06": ["web-design", "website-redesign"],
  "07": ["ecommerce-development", "shopify-development"],
  "08": ["website-redesign", "ui-ux-design"],
  "09": ["custom-software-development", "business-automation"],
  "10": ["nextjs-development", "website-development"],
};

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: projectSlug(project.title) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false } };
  return pageMetadata({
    title: project.title,
    description: project.summary ?? project.tagline ?? project.description ?? project.title,
    path: `/works/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const services = (relatedServices[project.id] ?? [])
    .map((id) => getServicePage(id))
    .filter((item) => item !== undefined);
  const credit = project.role?.[0];

  return (
    <SiteShell>
      <JsonLd
        data={graph(
          creativeWorkSchema(project),
          breadcrumbSchema([
            { name: "Work", path: "/works" },
            { name: project.title, path: `/works/${slug}` },
          ]),
        )}
      />
      <article className="bg-white text-foreground">
        <header className="mx-auto max-w-4xl px-5 pb-10 pt-32 sm:px-8 md:pt-40">
          <p className="eyebrow text-primary">{project.category}</p>
          <h1 className="display mt-4 text-[clamp(3rem,7vw,6.5rem)] leading-[0.95]">{project.title}</h1>
          {project.tagline ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70">{project.tagline}</p> : null}
          {credit ? <p className="mt-4 text-sm text-foreground/55">{credit}</p> : null}
        </header>

        {project.preview ? (
          <figure className="mx-auto max-w-6xl px-5 sm:px-8">
            <img
              src={project.preview.src}
              alt={project.preview.alt}
              width={project.preview.width}
              height={project.preview.height}
              fetchPriority="high"
              className="w-full rounded-[1.5rem] border border-foreground/10 object-cover object-top"
            />
          </figure>
        ) : null}

        <div className="mx-auto grid max-w-4xl gap-12 px-5 py-16 sm:px-8">
          {project.summary ? <p className="text-lg leading-relaxed text-foreground/80">{project.summary}</p> : null}

          {project.does?.length ? (
            <section>
              <h2 className="display text-[clamp(2rem,4vw,3rem)]">What it does</h2>
              <ul className="mt-5 space-y-2 text-foreground/75">
                {project.does.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.role && project.role.length > 1 ? (
            <section>
              <h2 className="display text-[clamp(2rem,4vw,3rem)]">Role</h2>
              <ul className="mt-5 space-y-2 text-foreground/75">
                {project.role.slice(1).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.capabilities?.length ? (
            <section>
              <h2 className="display text-[clamp(2rem,4vw,3rem)]">What went into it</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.capabilities.map((item) => (
                  <li key={item} className="rounded-full border border-foreground/15 px-3 py-1 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="flex flex-wrap gap-4">
            {project.url ? (
              <a href={project.url} target="_blank" rel="noreferrer" className="rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background">
                Visit the live site
              </a>
            ) : null}
            <Link href="/works" className="rounded-full border border-foreground/20 px-5 py-3 text-sm font-semibold">
              All work
            </Link>
          </div>

          {services.length ? (
            <section>
              <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-foreground/45">Related services</h2>
              <ul className="mt-4 space-y-2">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={service.path} className="font-semibold hover:text-primary">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </article>
    </SiteShell>
  );
}
