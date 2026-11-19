import type { NavLink } from "@/lib/types";

const envUrl = typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_SITE_URL : undefined;

export const site = {
  name: "grow2gether",
  url: (envUrl || "https://www.grow2gether.in").replace(/\/$/, ""),
  title: "grow2gether | Web Design & Development in India, Delhi-NCR",
  metaDescription:
    "grow2gether builds custom websites, online shops, web apps and automations. Based in India, Delhi-NCR. Serving the US, UK and worldwide. Fixed price, free 30-minute call.",
  tagline: "Websites, shops and apps.",
  description:
    "Custom-designed websites, shops and apps that generate more qualified inquiries.",
  locale: "en_IN",
  location: {
    city: "New Delhi",
    region: "Delhi-NCR",
    country: "IN",
    countryName: "India",
    line: "Based in India, Delhi-NCR. Serving the US, UK and worldwide.",
  },
  keywords: [
    "web design agency Delhi-NCR",
    "website development company India",
    "web design for US businesses",
    "web design for UK businesses",
    "custom website design India",
    "ecommerce website development",
    "web application development",
    "Next.js developer India",
    "business automation",
    "grow2gether",
  ],
  logo: { src: "/brand/grow2gether-logo.png", alt: "grow2gether", width: 857, height: 212 },
  primaryCta: { label: "Let's Build 2gether", href: "/#contact" as const },
  secondaryCta: { label: "From ₹5,900", href: "/#products" as const },
  trustLine: ["Websites", "Shops", "Apps", "Automations"],

  hero: {
    eyebrow: "grow2gether",
    status: "5 out of 5 stars",
    lines: ["Websites,", "Shops & Apps,", "worth it."],
    lead: "Custom-designed to generate more qualified inquiries.",
    support: "More sales and less manual labor in your company.",
    pillars: [
      {
        index: "01",
        title: "Websites",
        text: "Professional presence, trust, and qualified inquiries.",
      },
      {
        index: "02",
        title: "Shops",
        text: "Easy purchasing and processes that save time.",
      },
      {
        index: "03",
        title: "Apps",
        text: "Products that simply work and people enjoy using.",
      },
    ],
    tracks: [
      { label: "From ₹5,900", text: "Individual solutions, transparent fixed price" },
      { label: "30 minutes", text: "Free conversation. The fixed price comes after." },
    ],
    featured: {
      label: "Selected work",
      title: "Live projects",
      text: "From companies we built for.",
      href: "/works",
    },
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/works" },
    { label: "Blog", href: "/blog" },
    { label: "Why us", href: "/#why" },
    { label: "Pricing", href: "/#products" },
    { label: "Process", href: "/#process" },
    { label: "Reviews", href: "/#testimonials" },
    { label: "FAQ", href: "/#faq" },
  ] satisfies NavLink[],
};
