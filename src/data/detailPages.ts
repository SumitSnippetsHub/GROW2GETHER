/**
 * grow2gether — inclusion pages for /products/[slug].
 */

export type Highlight = { title: string; description: string };
export type Step = { title: string; description: string };
export type Faq = { question: string; answer: string };
export type ProblemBlock = {
  heading: string;
  italic: string;
  intro: string;
  items: Highlight[];
};

export type CautionBlock = {
  heading: string;
  italic: string;
  intro: string;
  points: string[];
  close?: string;
};

export type PlanItem = { label: string; included: boolean };
export type Plan = {
  name: string;
  priceUsd: string;
  priceInr: string;
  featured?: boolean;
  items: PlanItem[];
};

export type DetailPage = {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  overview: string[];
  highlights: Highlight[];
  /** Longer service types, such as UI/UX, redesign, or a shop. */
  offerings?: Highlight[];
  /** Longer “what’s included” notes. Falls back to highlights in the layout. */
  included?: Highlight[];
  /** Package prices. Only the website development page sets these. */
  plans?: Plan[];
  plansNote?: string;
  problems?: ProblemBlock;
  caution?: CautionBlock;
  process: Step[];
  technologies: string[];
  idealFor: string[];
  outcomes: string[];
  faqs: Faq[];
  cta: { heading: string; text: string; button: string };
  seo: { title: string; description: string; keywords?: string[] };
  icon?: string;
  /** Public path when it is not /services/[slug] or /products/[slug]. */
  path?: string;
  related?: string[];
  projectIds?: string[];
};

const sharedProcess: Step[] = [
  { title: "Understand", description: "Goals, audience, functions, budget and timing." },
  { title: "Direction & fixed price", description: "A first visual direction, a clear scope, then the fixed price." },
  { title: "Design & development", description: "You see the current state and can give feedback directly." },
  { title: "Launch", description: "Review, publish, hand over. Maintenance if you want it." },
];

const sharedCta = {
  heading: "Let's Build 2gether",
  text: "30 minutes, free of charge. You receive the fixed price afterwards.",
  button: "Let's Build 2gether",
};

const inclusion = (
  slug: string,
  title: string,
  summary: string,
  index: string,
): DetailPage => ({
  slug,
  title,
  eyebrow: `Investment / ${index}`,
  tagline: summary,
  summary,
  overview: [
    summary,
    "It is part of the project, not an add-on you discover on the invoice. Individual work starts from ₹5,900, and the fixed price is agreed before we start.",
  ],
  highlights: [{ title, description: summary }],
  process: sharedProcess,
  technologies: [],
  idealFor: ["Projects that need this as part of the build, not as a later extra"],
  outcomes: [summary],
  faqs: [
    {
      question: "Is this included?",
      answer: "Yes. It is part of how a grow2gether project is delivered.",
    },
  ],
  cta: sharedCta,
  seo: {
    title: `${title} — Included in Every Project`,
    description: summary,
  },
});

export const products: DetailPage[] = [
  inclusion(
    "individual-concept",
    "Individual concept",
    "Together we turn the idea into a concrete plan: what the software should do, who uses it, and which processes it should simplify.",
    "01",
  ),
  inclusion(
    "design",
    "High-quality design",
    "Designed for this company. It will not look like a template used a hundred times.",
    "02",
  ),
  inclusion(
    "devices",
    "Works on all devices",
    "Phone, tablet and desktop are part of the same design, not an afterthought.",
    "03",
  ),
  inclusion(
    "privacy",
    "Data protection to current standards",
    "Privacy is handled to current standards, planned with the product rather than patched on at the end.",
    "04",
  ),
  inclusion(
    "quality",
    "Quality assurance before launch",
    "We check the work before it goes live. Launch is a decision, not a surprise.",
    "05",
  ),
  inclusion(
    "handover",
    "Personal handover & briefing",
    "You get the work in person, with a briefing so the team can actually run it.",
    "06",
  ),
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);


