import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms",
  description: "How grow2gether scopes, prices, hands over and limits liability on a project.",
  path: "/terms",
});

const sections = [
  {
    heading: "Scope",
    body: "Work starts from a written scope. The scope names the pages, functions and content included. Anything not listed is not included. A change to the scope is priced before that extra work starts.",
  },
  {
    heading: "Price and payment",
    body: "Individual solutions start from ₹5,900. The price for a project is fixed after the scope is agreed. The schedule of payments is part of that agreement. Hosting, domains and third-party subscriptions are billed by those providers unless the scope says otherwise.",
  },
  {
    heading: "What you provide",
    body: "You provide the facts about the business, access to accounts we need, and the text or images you want used. Missing material is listed. Delays in providing it move the timeline.",
  },
  {
    heading: "Ownership",
    body: "After the agreed payments, you own the design and code produced for your project, except third-party fonts, libraries, themes and services, which stay under their own licences. grow2gether may show the finished public work in its portfolio.",
  },
  {
    heading: "Liability",
    body: "The site or software is built to the agreed scope. grow2gether is not liable for lost profit, downtime of a third-party host, or results such as rankings, revenue or lead volume. Those are not promised. Liability for a project is limited to the fees paid for that project.",
  },
  {
    heading: "Contact",
    body: "Questions about these terms go to grow2gether@gmail.com. These terms describe the working relationship. A project agreement can add detail for that job.",
  },
];

export default function TermsPage() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
        <p className="eyebrow text-primary">Terms</p>
        <h1 className="display mt-4 text-[clamp(3rem,7vw,6rem)] leading-[0.95]">Terms</h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/70">
          How a grow2gether project is scoped, paid for and handed over. This page is for review by the studio owner before it is treated as final legal text.
        </p>
        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-foreground/75">{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </SiteShell>
  );
}
