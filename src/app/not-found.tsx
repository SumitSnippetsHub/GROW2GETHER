import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { servicePages } from "@/data/servicePages";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That address is not on the grow2gether site.",
  robots: { index: false, follow: true },
};

const links = servicePages.filter((page) =>
  ["website-development", "web-design", "ecommerce-development", "web-application-development"].includes(page.slug),
);

export default function NotFound() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
        <p className="eyebrow text-primary">404</p>
        <h1 className="display mt-4 text-[clamp(3rem,7vw,6rem)] leading-[0.95]">Page not found</h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/70">
          That address is not on this site. The page may have moved with the service URLs.
        </p>
        <ul className="mt-10 space-y-3">
          {links.map((page) => (
            <li key={page.slug}>
              <Link href={page.path} className="text-lg font-semibold hover:text-primary">
                {page.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="text-lg font-semibold hover:text-primary">
              Contact
            </Link>
          </li>
        </ul>
      </section>
    </SiteShell>
  );
}
