import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { instrumentSerif, jetbrainsMono, jost, monaSans } from "@/app/fonts";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { OG_IMAGE } from "@/lib/seo";

import "@/styles.css";

const googleVerification = process.env["NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"];
const bingVerification = process.env["NEXT_PUBLIC_BING_SITE_VERIFICATION"];

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.metaDescription,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.metaDescription,
    locale: site.locale,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.metaDescription,
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "64x64" }],
    apple: [{ url: "/brand/grow2gether-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${monaSans.variable} ${jost.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        {children}
      </body>
    </html>
  );
}
