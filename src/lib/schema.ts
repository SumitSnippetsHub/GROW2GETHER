import { contact } from "@/data/contact";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

type Faq = { question: string; answer: string };

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

const MIN_PRICE_INR = 5900;

export function organizationSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: site.name,
    url: absoluteUrl("/"),
    logo: { "@type": "ImageObject", url: absoluteUrl(site.logo.src), width: site.logo.width, height: site.logo.height },
    image: absoluteUrl("/og.png"),
    description: site.metaDescription,
    slogan: site.tagline,
    email: contact.email,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    areaServed: [
      { "@type": "City", name: site.location.city },
      { "@type": "Country", name: site.location.countryName },
    ],
    founder: { "@type": "Person", name: "Sumit", jobTitle: "Founder" },
    knowsAbout: [
      "Web design",
      "Website development",
      "E-commerce development",
      "Web application development",
      "Business process automation",
      "Technical SEO",
      "Next.js",
      "React",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: contact.email,
      areaServed: site.location.country,
      availableLanguage: ["English"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        priceCurrency: "INR",
        priceSpecification: { "@type": "PriceSpecification", minPrice: MIN_PRICE_INR, priceCurrency: "INR" },
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: absoluteUrl(`/services/${service.slug}`),
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: absoluteUrl("/"),
    description: site.metaDescription,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(service: { slug: string; title: string; summary: string; overview: string[] }) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: `${service.title} by ${site.name}`,
    serviceType: service.title,
    description: service.overview.join(" ") || service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: site.location.countryName },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      priceSpecification: { "@type": "PriceSpecification", minPrice: MIN_PRICE_INR, priceCurrency: "INR" },
    },
  };
}

export function worksSchema() {
  return {
    "@type": "ItemList",
    name: `Selected work by ${site.name}`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        genre: project.category,
        description: project.description ?? project.tagline,
        ...(project.url ? { url: project.url } : {}),
        ...(project.preview ? { image: absoluteUrl(project.preview.src) } : {}),
        contributor: { "@id": ORG_ID },
      },
    })),
  };
}

export function graph(...nodes: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
