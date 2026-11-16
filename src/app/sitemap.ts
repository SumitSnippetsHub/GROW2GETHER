import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/services", 0.9),
    ...services.map((service) => page(`/services/${service.slug}`, 0.8)),
    page("/works", 0.9, "weekly"),
    page("/products", 0.7),
    page("/about", 0.7),
    page("/contact", 0.8),
    page("/privacy-policy", 0.2, "yearly"),
  ];
}
