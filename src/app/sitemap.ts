import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { projects } from "@/data/projects";
import { servicePages } from "@/data/servicePages";
import { projectSlug } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";

type Frequency = "weekly" | "monthly" | "yearly";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: Frequency = "monthly", lastModified: Date = now) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/services", 0.9, "weekly"),
    ...servicePages.map((service) => page(service.path, service.slug === "website-development" ? 0.9 : 0.8)),
    page("/works", 0.9, "weekly"),
    ...projects.map((project) => page(`/works/${projectSlug(project.title)}`, 0.7)),
    page("/blog", 0.7, "weekly"),
    ...articles
      .filter((article) => article.published)
      .map((article) => page(`/blog/${article.slug}`, 0.6, "monthly", new Date(article.date))),
    page("/products", 0.6),
    page("/about", 0.7),
    page("/contact", 0.8),
    page("/terms", 0.2, "yearly"),
    page("/privacy-policy", 0.2, "yearly"),
  ];
}
