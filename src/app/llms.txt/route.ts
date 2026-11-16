import { contact } from "@/data/contact";
import { faqs } from "@/data/faqs";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.metaDescription}`,
    "",
    `${site.name} is a founder-led web design and development studio in ${site.location.city}, ${site.location.countryName}. Every project is designed individually (no templates), the fixed price is agreed before work starts, and individual solutions start from ₹5,900. The first conversation is a free 30-minute call.`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.seo.description}`),
    "",
    "## Pages",
    `- [Home](${absoluteUrl("/")}): overview, process, pricing and FAQ`,
    `- [Work](${absoluteUrl("/works")}): live client projects`,
    `- [Pricing](${absoluteUrl("/products")}): what every project includes`,
    `- [About](${absoluteUrl("/about")}): the studio and the founder`,
    `- [Contact](${absoluteUrl("/contact")}): book a free call, request a call back or chat on WhatsApp`,
    "",
    "## Selected work",
    ...projects.map((p) => `- ${p.title} (${p.category}): ${p.tagline}${p.url ? ` ${p.url}` : ""}`),
    "",
    "## FAQ",
    ...faqs.flatMap((f) => [`### ${f.question}`, f.answer, ""]),
    "## Contact",
    `- Email: ${contact.email}`,
    `- Website: ${site.url}`,
    `- Location: ${site.location.city}, ${site.location.region}, ${site.location.countryName}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
