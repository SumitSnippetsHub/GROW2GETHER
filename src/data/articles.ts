import { projectStills } from "@/data/images";
import type { ImageAsset } from "@/lib/types";

export type ArticleSection = { heading: string; paragraphs: string[] };

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: ImageAsset;
  /** Drafts stay out of the sitemap and are noindex until the owner publishes them. */
  published: boolean;
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "website-cost-india",
    title: "How much does a website cost in India",
    description:
      "What changes the price of a business website in India, and how grow2gether prices a fixed scope from ₹5,900.",
    date: "2026-11-18",
    category: "Websites",
    image: projectStills.zenmen,
    published: true,
    sections: [
      {
        heading: "A number only means something with a scope",
        paragraphs: [
          "A website price without a scope is a guess. A one-page site for a local service and a shop with accounts, payments and a catalogue are not the same job, so they should not share one number.",
          "grow2gether publishes one floor: individual solutions start from ₹5,900. The price for a specific project is fixed after a 30-minute call, once the pages, functions and content are written down.",
        ],
      },
      {
        heading: "What usually moves the price",
        paragraphs: [
          "The number of pages, whether there is a shop or sign-in, and whether the site has to talk to a tool you already use. Design from scratch takes more than adjusting an existing layout. Copy and photos you already have take less than writing and shooting them.",
          "Hosting, a domain and a Shopify subscription, if you use Shopify, are separate from the build. They are named in the scope so they are not a surprise later.",
        ],
      },
      {
        heading: "What this studio does not do",
        paragraphs: [
          "We do not publish a menu of packages with invented market averages. We do not quote a price before the scope. After the call you get a fixed price for the work that was described. Extra work is quoted separately.",
        ],
      },
      {
        heading: "A practical next step",
        paragraphs: [
          "If you already know the pages and the enquiry you want, book the free call. Bring examples of sites you like and a list of what the current site fails to do. The fixed price comes after that conversation, not during the first email.",
        ],
      },
    ],
  },
  {
    slug: "website-vs-web-application",
    title: "Website vs web application",
    description: "When a business needs a website, and when it needs software people log into.",
    date: "2026-11-16",
    category: "Software",
    image: projectStills.seatsBrokers,
    published: true,
    sections: [
      {
        heading: "A website explains. An application does the work.",
        paragraphs: [
          "A website is the public explanation of a business: the offer, proof, and a way to enquire, book or buy. A visitor should understand the company and take one next step.",
          "A web application is software in the browser. People sign in. They repeat a task: a broker desk, an order queue, a client area. The screens follow that task.",
        ],
      },
      {
        heading: "Choosing the wrong one wastes the budget",
        paragraphs: [
          "A marketing site with a fake dashboard does not become an application. An application with no public explanation does not replace a website if new clients still need to understand the offer.",
          "Some projects need both: a public site and a signed-in tool. Those are two scopes. Mixing them into one vague brief is how the price and the timeline drift.",
        ],
      },
      {
        heading: "How grow2gether splits the work",
        paragraphs: [
          "Website development covers the public site. Web application development covers accounts, roles and the workflow. Custom software is for a process that off-the-shelf tools do not cover. The first call decides which of those is actually needed.",
          "The stack is usually Next.js and React. A simple content site may use Astro. The choice is in the scope, not assumed.",
        ],
      },
    ],
  },
  {
    slug: "when-a-website-needs-a-redesign",
    title: "When a website needs a redesign",
    description: "The signs a current site is in the way, and what a redesign keeps versus what it replaces.",
    date: "2026-11-14",
    category: "Websites",
    image: projectStills.tyagiAssociates,
    published: true,
    sections: [
      {
        heading: "A new coat of paint is not a redesign",
        paragraphs: [
          "Changing colours while the same pages still fail to explain the offer is a reskin. A redesign is a new structure: what a visitor sees first, which proof is on the page, and where the enquiry happens.",
          "grow2gether writes down what stays. Pages, copy and addresses that already work are named in the scope. What changes is the structure, the design and the path to a call, form or WhatsApp.",
        ],
      },
      {
        heading: "Signs the current site is the problem",
        paragraphs: [
          "People ask questions the homepage should already answer. The site looks like a theme, so it could belong to any company in the trade. On a phone, the first screen is a banner and the real offer is a scroll away.",
          "None of that requires a traffic number. If the people who already find you cannot tell what to do next, the page is the bottleneck.",
        ],
      },
      {
        heading: "How the launch is handled",
        paragraphs: [
          "The new site replaces the old one when you sign off the review. The scope says which addresses move, so a page that already ranks or is printed on a card is not dropped by accident.",
          "The price is fixed after that scope, the same way a new website is priced. Individual work starts from ₹5,900. A redesign of a large site is not that floor.",
        ],
      },
    ],
  },
  {
    slug: "shopify-or-a-custom-shop",
    title: "Shopify or a custom online shop",
    description: "How to choose between a Shopify store and a shop built into your own site.",
    date: "2026-11-12",
    category: "Shops",
    image: projectStills.blessingMens,
    published: true,
    sections: [
      {
        heading: "Shopify is a shop. It is not every shop.",
        paragraphs: [
          "Shopify is the right base when you need a catalogue, checkout, payments and a theme that can be adjusted to the brand. The subscription and the payment fees are yours. They are not part of the build price, and they are named before the work starts.",
          "A custom shop belongs in the site when the catalogue, the order path or the tools behind it do not fit a theme. That is a larger scope. It is not a better badge.",
        ],
      },
      {
        heading: "What the build actually includes",
        paragraphs: [
          "On Shopify, the work is the storefront, the collections, the product fields and the apps that do a real job. A long list of unused apps is not a plan.",
          "On a custom shop, the scope names the catalogue, the checkout path and any connection to a tool you already use. Orders and enquiries only go somewhere else when that connection is written into the scope.",
        ],
      },
      {
        heading: "How the first call decides it",
        paragraphs: [
          "Bring the number of products you actually sell, how people pay, and whether staff have to update stock by hand. If Shopify covers that, we say so. If it does not, the custom scope is the alternative, with its own fixed price.",
        ],
      },
    ],
  },
  {
    slug: "what-the-first-call-covers",
    title: "What the first call actually covers",
    description: "The free 30-minute call, what to bring, and when the fixed price is sent.",
    date: "2026-11-10",
    category: "Studio",
    image: projectStills.tyagRaj,
    published: true,
    sections: [
      {
        heading: "Thirty minutes, then a written price",
        paragraphs: [
          "The call is free. It is not a presentation of packages. The point is to name the pages, the functions and the content so the price can be fixed afterwards.",
          "You talk to the founder. There is no project manager in between, and there is no public office address. The call can be on the phone, Google Meet, or WhatsApp.",
        ],
      },
      {
        heading: "What is useful to bring",
        paragraphs: [
          "Examples of sites you like, the enquiry you want (a call, a form, a booking, an order), and a short list of what the current site or process fails to do. If you already have copy and photos, say so. That changes the scope.",
          "If you do not have those yet, the call can still happen. The scope will say that copy or photos are still to come, instead of pretending they are included.",
        ],
      },
      {
        heading: "What you receive after",
        paragraphs: [
          "A written scope and a fixed price for that scope. Extra work is quoted separately. Hosting, a domain and any Shopify subscription stay outside the build price and are named as such.",
          "Individual solutions start from ₹5,900. That floor is not a quote for your project.",
        ],
      },
    ],
  },
  {
    slug: "website-maintenance-after-launch",
    title: "What website maintenance includes",
    description: "Edits, fixes and the written monthly scope after a site goes live.",
    date: "2026-11-08",
    category: "Studio",
    image: projectStills.silverStitch,
    published: true,
    sections: [
      {
        heading: "Launch is not the last edit",
        paragraphs: [
          "A site needs copy changes, new photos and the occasional broken path. Maintenance is that work, written down, not an open promise to change anything.",
          "There is no published package grid and no invented monthly price. The monthly or one-off work is described and priced before it starts, the same way a build is.",
        ],
      },
      {
        heading: "What is in, and what is a new project",
        paragraphs: [
          "Edits are copy, images and small layout changes you ask for. Fixes are bugs and broken paths reported after launch. A new shop, a sign-in area or a redesign of the structure is a new scope, not a maintenance ticket.",
          "If you want to run the site yourself, the handover includes a briefing. Maintenance is optional after that.",
        ],
      },
      {
        heading: "How it is agreed",
        paragraphs: [
          "The scope names what is included in the period. Work outside that list is quoted before it is done. You can stop. There is no lock-in written into the site.",
        ],
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
