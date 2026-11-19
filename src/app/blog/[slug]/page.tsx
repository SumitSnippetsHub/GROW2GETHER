import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { articles, getArticle } from "@/data/articles";
import { articleSchema, breadcrumbSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found", robots: { index: false } };
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${slug}`,
    type: "article",
    noindex: !article.published,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const words = article.sections.reduce(
    (count, section) => count + section.heading.split(/\s+/).length + section.paragraphs.join(" ").split(/\s+/).length,
    0,
  );
  const minutes = Math.max(1, Math.round(words / 200));
  const others = articles.filter((item) => item.slug !== article.slug);

  return (
    <SiteShell>
      <JsonLd
        data={graph(
          articleSchema(article),
          breadcrumbSchema([
            { name: "Blog", path: "/blog" },
            { name: article.title, path: `/blog/${slug}` },
          ]),
        )}
      />
      <article className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
        <p className="text-sm text-foreground/45">
          {article.date} · {minutes} min read{article.published ? "" : " · Draft for owner review"}
        </p>
        <h1 className="display mt-3 text-[clamp(2.6rem,6vw,4.8rem)] leading-[1]">{article.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/70">{article.description}</p>
        <nav aria-label="On this page" className="mt-8 border-l border-foreground/15 pl-4">
          <p className="text-sm font-medium text-foreground/45">On this page</p>
          <ul className="mt-2 space-y-1">
            {article.sections.map((section) => (
              <li key={section.heading}>
                <a href={`#${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="text-sm hover:text-primary">
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-12 space-y-10">
          {article.sections.map((section) => (
            <section key={section.heading} id={section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
              <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 leading-relaxed text-foreground/75">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
        {others.length ? (
          <section className="mt-12">
            <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-foreground/45">Related notes</h2>
            <ul className="mt-3 space-y-2">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link href={`/blog/${item.slug}`} className="font-semibold hover:text-primary">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <p className="mt-12 text-sm text-foreground/55">
          Related: <Link href="/website-development" className="underline">website development</Link>
          {" · "}
          <Link href="/web-application-development" className="underline">web applications</Link>
          {" · "}
          <Link href="/contact" className="underline">book a call</Link>
        </p>
      </article>
    </SiteShell>
  );
}
