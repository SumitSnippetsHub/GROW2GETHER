import type { Metadata } from "next";
import { site } from "@/data/site";

export const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "grow2gether — websites, shops and apps" };

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

type PageSeo = {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of appending "| grow2gether". */
  absoluteTitle?: boolean;
  noindex?: boolean;
  type?: "website" | "article";
};

export function pageMetadata({ title, description, path, absoluteTitle, noindex, type = "website" }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
