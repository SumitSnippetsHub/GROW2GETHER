import type { DetailPage, Faq, Highlight, Plan, Step } from "@/data/detailPages";
import { serviceDepth } from "@/data/serviceDepth";

export type ServicePage = DetailPage & {
  path: string;
  related: string[];
  projectIds: string[];
};

const cta = {
  heading: "Let's Build 2gether",
  text: "30 minutes, free of charge. You receive the fixed price afterwards.",
  button: "Let's Build 2gether",
};

const where = "Based in India, Delhi-NCR. Serving the US, UK and worldwide.";

const locationFaq: Faq = {
  question: "Where are you based, and do you work with the US and UK?",
  answer:
    "grow2gether is based in India, Delhi-NCR. We serve businesses in India and clients in the US, UK and worldwide. The first meeting is a free 30-minute call on Google Meet, phone or WhatsApp. There is no public office to visit.",
};

const on = (label: string) => ({ label, included: true });
const off = (label: string) => ({ label, included: false });

const designPlans: Plan[] = [
  {
    name: "Starter",
    priceUsd: "$299",
    priceInr: "₹15,000",
    items: [
      on("Up to 8 pages"),
      on("Static pages"),
      on("Responsive for mobile and tablets"),
      on("Social like and share"),
      on("Photo gallery"),
      off("Domain and hosting"),
      off("Logo"),
      off("Email IDs"),
      on("Email contact form"),
      on("Map and directions"),
      on("Fully custom design"),
      on("SEO-friendly structure"),
      off("SSL certificate"),
      off("Payment gateway"),
      off("Edit rounds"),
      off("Maintenance"),
    ],
  },
  {
    name: "Plus",
    priceUsd: "$499",
    priceInr: "₹33,000",
    featured: true,
    items: [
      on("Up to 15 pages"),
      on("CMS-based pages the team can update"),
      on("Responsive for mobile and tablets"),
      on("Social like and share"),
      on("Photo gallery"),
      on("1 year domain and hosting"),
      on("1 logo"),
      on("5 email IDs"),
      on("Email contact form with anti-spam"),
      on("Map and directions"),
      on("Fully custom design"),
      on("SEO-friendly structure"),
      off("SSL certificate"),
      off("Payment gateway"),
      on("2 rounds of edits"),
      on("1 month of maintenance"),
    ],
  },
  {
    name: "Ultimate",
    priceUsd: "$1,999",
    priceInr: "₹1,30,000",
    items: [
      on("Up to 25 pages"),
      on("CMS-based pages the team can update"),
      on("Responsive for mobile and tablets"),
      on("Social like and share"),
      on("Photo gallery"),
      on("1 year domain and dedicated hosting"),
      on("2 logo samples"),
      on("Email IDs for the team"),
      on("Email contact form with anti-spam"),
      on("Map and directions"),
      on("Fully custom design"),
      on("SEO-friendly structure"),
      on("1 year SSL certificate"),
      on("Payment gateway"),
      on("3 rounds of edits"),
      on("3 months of maintenance"),
    ],
  },
];

const designPlansNote =
  "These are tentative starting prices for a website. Extra functionality is an extra charge. Domain, hosting, email, SSL and a payment gateway are included only where the plan says so. The written scope still comes before the work starts.";

const process: Step[] = [
  { title: "Understand", description: "Goals, audience, what has to work, budget and timing." },
  { title: "Direction and fixed price", description: "A first direction, a written scope, then the fixed price before we start." },
  { title: "Design and build", description: "You see the work as it progresses and can comment directly." },
  { title: "Launch", description: "Review, publish and hand over. Maintenance is available if you want it." },
];

function page(
  slug: string,
  title: string,
  tagline: string,
  summary: string,
  overview: string[],
  highlights: Highlight[],
  technologies: string[],
  idealFor: string[],
  outcomes: string[],
  faqs: Faq[],
  seo: { title: string; description: string; keywords?: string[] },
  related: string[],
  projectIds: string[],
  icon?: string,
  extras?: Pick<ServicePage, "offerings" | "included" | "plans" | "plansNote" | "problems" | "caution">,
): ServicePage {
  const depth = serviceDepth[slug];
  return {
    slug,
    path: `/${slug}`,
    title,
    eyebrow: `Services / ${title}`,
    tagline,
    summary,
    overview,
    highlights,
    process: depth?.steps ?? process,
    technologies,
    idealFor,
    outcomes,
    faqs: [...faqs, ...(depth?.faqs ?? []), locationFaq],
    ...(depth?.problems ? { problems: depth.problems } : {}),
    ...(depth?.caution ? { caution: depth.caution } : {}),
    cta,
    seo,
    related,
    projectIds,
    ...(icon ? { icon } : {}),
    ...extras,
  };
}

export const servicePages: ServicePage[] = [
  page(
    "website-development",
    "Website development",
    "A site that explains the business and gives people a clear next step.",
    `Custom business websites, planned from a written scope and a fixed price. ${where}`,
    [
      "Website development here means the whole site: structure, design, build, the form or booking path, and a handover you can run. It is not a theme with the logo swapped.",
      `The page is planned around the enquiry you want. A law firm, a shop and a B2B platform do not need the same pages, so the scope is written down before the price. ${where}`,
    ],
    [
      { title: "Built for the enquiry", description: "The path from visit to call, form or WhatsApp is part of the plan." },
      { title: "Fixed price", description: "Individual work starts from ₹5,900. The price for your scope is agreed before we start." },
      { title: "Handover", description: "You get the live site and a briefing so the team can update it." },
    ],
    ["Next.js", "React", "Astro", "Vercel"],
    ["Companies replacing an outdated site", "Teams that need a clear enquiry path"],
    ["A live website", "A scope and price agreed first", "A handover"],
    [
      {
        question: "Do you start from a template?",
        answer: "No. The structure starts from the company, the audience and the enquiry you want.",
      },
      {
        question: "What do I need to provide?",
        answer: "What you sell, who it is for, the pages you need, and any text or photos you already have. Missing pieces are listed in the scope.",
      },
      {
        question: "Are the package prices final?",
        answer: "They are a starting point for that page count and that list. Extra functionality is an extra charge. You still receive a written scope before the work starts.",
      },
    ],
    {
      title: "Website Development in India, Delhi-NCR",
      description: "Custom business websites by grow2gether. Based in India, Delhi-NCR. Serving the US, UK and worldwide. Website packages from ₹15,000. Scope agreed before we start.",
      keywords: ["website development India", "website development Delhi-NCR", "website development for US companies", "website development for UK companies", "custom business website"],
    },
    ["web-design", "nextjs-development", "website-redesign"],
    ["04", "05", "10"],
    "Globe2",
    {
      offerings: [
        { title: "Custom website design and development", description: "The site is designed and built for this company. Layout, pages and the enquiry path are in one scope, not a theme with the logo swapped." },
        { title: "Corporate websites", description: "A company site that explains the offer, the proof and the next step. Practices, studios and product companies do not share one page structure." },
        { title: "Landing pages", description: "One page for one offer: what it is, why it is credible, and a single way to enquire, book or buy." },
        { title: "Responsive build", description: "Phone, tablet and desktop are part of the same design. The small screen is checked while the page is made, not after launch." },
        { title: "Enquiry path", description: "Call, form, booking or WhatsApp is placed where the visitor is ready. The path is named in the scope." },
        { title: "Handover", description: "You get the live site and a briefing so the team can update it. Maintenance is available afterwards if you want it." },
      ],
      included: [
        { title: "A written scope", description: "Pages, functions and content are listed before the price. Extra work is quoted separately." },
        { title: "Clean code", description: "The site is built to stay readable and to load without a pile of unused plugins. The stack is Next.js, React or Astro, chosen for the project." },
        { title: "Search-ready structure", description: "Each page has a title, a description, a canonical address and structured data where it applies. That is part of the build, not a later add-on." },
        { title: "Mobile-first layout", description: "The first screen on a phone carries the offer and the next step. Google reads the mobile page, so that layout is not optional." },
      ],
      plans: designPlans,
      plansNote: designPlansNote,
    },
  ),
  page(
    "web-design",
    "Web design",
    "Design that looks like the company, and makes the next step obvious.",
    `Website design for the audience you want to reach: layout, type, color and a clear next step. ${where}`,
    [
      "Web design here starts from who the page is for and what they should do next. The structure, the type and the color follow that, then the site is built to match.",
      `The design is made for this company and reviewed with you before it is treated as finished. Website packages are on the website development page. ${where}`,
    ],
    [
      { title: "One company, one design", description: "Layout and type follow the offer, not a theme gallery." },
      { title: "Phone first", description: "The same decisions are checked on a small screen, not added later." },
      { title: "Clear next step", description: "Calls, forms and bookings are placed where the visitor is ready." },
    ],
    ["Figma-ready handoff", "Next.js", "Responsive layout"],
    ["Brands that look like everyone else", "Teams preparing a redesign"],
    ["A design direction you can react to", "Pages that match the agreed scope"],
    [
      {
        question: "Is design included in a website build?",
        answer: "Yes, when we design and build the site together. The website packages are listed on the website development page. A design-only scope is quoted separately.",
      },
      {
        question: "Do you design for phone, tablet and desktop?",
        answer: "Yes. The phone screen is designed with the desktop, not added at the end.",
      },
    ],
    {
      title: "Web Design Services in India, Delhi-NCR",
      description: "UI/UX, custom website design, responsive layouts, redesigns, shops and landing pages. Based in India, Delhi-NCR. Serving the US, UK and worldwide.",
      keywords: ["web design services India", "web design Delhi-NCR", "UI UX design", "responsive web design", "website redesign", "web design for US companies", "web design for UK companies"],
    },
    ["website-development", "ui-ux-design", "website-redesign"],
    ["06", "08"],
    "PenTool",
    {
      offerings: [
        { title: "UI/UX design", description: "We look at who the site is for and what they should do next, then design the interface and the path that fits that audience. Flows and screens for apps also have their own page." },
        { title: "Custom website design", description: "A site designed for this company, not picked from a theme gallery. Type, layout and the enquiry path are decided for the offer." },
        { title: "Responsive web design", description: "The same site is usable on a phone, a tablet and a desktop. The small screen is part of the design, not a later shrink." },
        { title: "Website redesign", description: "An existing site can be redesigned to the brief you bring. What stays, including pages and addresses that still work, is written in the scope. The replacement goes live when you sign off." },
        { title: "E-commerce website design", description: "A shop of your own: catalogue, product pages and a path to order. Shopify or a custom shop is chosen in the first call, and built as its own scope." },
        { title: "Web application design", description: "Screens for software people log into, not only marketing pages. The steps follow the task: accounts, a queue, a client area." },
        { title: "Corporate website design", description: "A company site with a clear offer, proof and a way to enquire. The pages follow the business, not a generic agency layout." },
        { title: "Landing page design", description: "One page, one offer, one next step. Useful when a campaign or a single service should not compete with a full site." },
      ],
      included: [
        { title: "Typography", description: "Type is chosen for this project: headings, body text and the words that need to be read first. The page should give someone a reason to stay, not look like every other site in the trade." },
        { title: "Clean code", description: "The build is part of the design service when a package includes it. The code is written to stay readable and to work across current browsers, without a stack of unused plugins." },
        { title: "Color", description: "Color follows the brand and the job of the page: what should be noticed, and what should stay quiet. We do not apply a universal palette and call it a conversion trick." },
        { title: "SEO-friendly structure", description: "Titles, descriptions, headings and canonical addresses are set so a search engine can read the page. That does not replace a separate SEO campaign, and we do not promise a ranking." },
        { title: "Mobile-first layout", description: "The phone layout is designed first. A site that only works on a laptop is not a finished design." },
      ],
    },
  ),
  page(
    "ecommerce-development",
    "E-commerce development",
    "A shop people can browse, and an order path that does not depend on retyping.",
    "Online shops with a catalogue, product pages and a checkout path, scoped and priced before the build.",
    [
      "An online shop here covers the catalogue, product pages, and how an order reaches you. Payments, delivery rules and inventory are included only when they are in the written scope.",
      "Some shops fit Shopify. Others need a custom catalogue. That choice is made in the first conversation, not halfway through the invoice.",
    ],
    [
      { title: "Catalogue", description: "Products grouped the way customers look for them." },
      { title: "Checkout path", description: "The steps from product to order are designed, not left to a default theme." },
      { title: "Connected follow-up", description: "Orders and enquiries go to the tools you already use, when that is in scope." },
    ],
    ["Shopify", "Next.js", "Payment setup"],
    ["Brands moving from WhatsApp orders to a shop", "Stores replacing a theme that cannot be extended"],
    ["A live shop", "A catalogue the team can update", "A fixed price for the agreed scope"],
    [
      {
        question: "Do you build on Shopify or custom code?",
        answer: "Either, depending on the catalogue and the checkout. Shopify is its own service. A custom shop is scoped separately.",
      },
    ],
    {
      title: "E-commerce Website Development in India",
      description: "Online shops by grow2gether: catalogue, product pages and checkout. Shopify or custom. Based in India, Delhi-NCR. Serving the US, UK and worldwide.",
      keywords: ["ecommerce website development India", "online shop development Delhi-NCR", "ecommerce development for US brands", "custom online store"],
    },
    ["shopify-development", "website-development", "business-automation"],
    ["03", "07"],
    "Blocks",
    {
      offerings: [
        { title: "Catalogue and product pages", description: "Products are grouped the way customers look for them. Each product page says what it is, what it costs, and how to order." },
        { title: "Checkout path", description: "The steps from product to order are designed. Payments, delivery rules and inventory are included only when they are in the written scope." },
        { title: "Shopify or a custom shop", description: "Shopify fits a catalogue and checkout that Shopify can hold. A custom shop is a separate scope when the order path does not fit a theme." },
        { title: "Order handoff", description: "An order can reach the inbox, sheet or tool you already use, when that connection is named before the price." },
        { title: "A shop the team can update", description: "Collections and products are structured so the team can add items after handover, without calling us for every photo." },
      ],
      included: [
        { title: "A written shop scope", description: "The catalogue size, the checkout and any payment setup are listed before the price. Extra apps are quoted separately." },
        { title: "Responsive storefront", description: "The shop is checked on a phone. Product, price and the next step stay visible on a small screen." },
        { title: "Search-ready product pages", description: "Titles and descriptions are set per page so a search engine can read the shop. We do not promise a ranking." },
        { title: "Handover", description: "You get the live shop and a briefing of what was installed and how to update it." },
      ],
    },
  ),
  page(
    "shopify-development",
    "Shopify development",
    "A Shopify store set up around your products, not a demo theme.",
    "Shopify stores: theme setup, collections, product structure, payments and the apps the shop actually needs.",
    [
      "Shopify development is for brands whose catalogue, checkout and apps fit Shopify. We set up the store, the collections and the theme so it does not look like the demo.",
      "If the shop needs custom account logic or a workflow Shopify cannot hold, that belongs on the e-commerce page instead. We say so before the build.",
    ],
    [
      { title: "Theme setup", description: "The storefront is adjusted to the brand, not left on the default theme." },
      { title: "Catalogue structure", description: "Collections and product fields match how people shop." },
      { title: "Apps only when needed", description: "Payments and apps are added for a real job, not a long unused list." },
    ],
    ["Shopify", "Shopify payments", "Theme customisation"],
    ["Brands that have chosen Shopify", "Stores that have outgrown a default theme"],
    ["A Shopify store you can run", "Collections and products structured", "A handover of what was installed"],
    [
      {
        question: "Are you a Shopify partner?",
        answer: "No. We build and set up Shopify stores. We do not claim a partner badge.",
      },
    ],
    {
      title: "Shopify Store Development in India",
      description: "Shopify setup by grow2gether: theme, collections, products and payments. Based in India, Delhi-NCR. Serving the US, UK and worldwide. Scoped before we start.",
      keywords: ["Shopify development India", "Shopify store Delhi-NCR", "Shopify expert for UK brands", "Shopify theme setup"],
    },
    ["ecommerce-development", "website-maintenance"],
    ["03", "07"],
    "Blocks",
    {
      offerings: [
        { title: "Theme setup", description: "The storefront is adjusted to the brand. It does not stay on the demo theme." },
        { title: "Collections and product fields", description: "Collections and fields match how people shop: by type, by occasion, or by the way your catalogue is already organised." },
        { title: "Payments", description: "A payment method is connected when it is in the scope. Shopify subscription fees and payment fees stay with Shopify. They are named, not hidden in the build price." },
        { title: "Apps only when needed", description: "An app is added for a real job. A long list of unused apps is not a plan." },
        { title: "When Shopify is the wrong base", description: "If the shop needs account logic or a workflow Shopify cannot hold, we say so before the build and scope a custom shop instead." },
      ],
      included: [
        { title: "A store you can run", description: "After handover you can add products and edit collections. We show you that once." },
        { title: "Brand-specific layout", description: "Type, color and the homepage follow the brand, within what a Shopify theme can do." },
        { title: "Mobile storefront", description: "The shop is checked on a phone: product, price and add-to-cart." },
        { title: "A list of what was installed", description: "Theme, apps and payment setup are written down so the next change is not a guess." },
      ],
    },
  ),
  page(
    "web-application-development",
    "Web application development",
    "Software in the browser: accounts, workflows and screens people use every day.",
    "Custom web apps with sign-in, roles and the screens the work actually needs.",
    [
      "A web application is for work that a marketing site cannot do: accounts, dashboards, bookings, or an internal tool. The first step is the workflow, not a feature list.",
      "We build what is in the scope. Extra modules are quoted separately so the first release can go live.",
    ],
    [
      { title: "Accounts and roles", description: "Sign-in and permissions when the product needs them." },
      { title: "The real workflow", description: "Screens follow the job, not a generic admin template." },
      { title: "A first release", description: "The scope names what is in version one and what is later." },
    ],
    ["Next.js", "React", "Node.js"],
    ["Teams replacing spreadsheets", "Products that need accounts"],
    ["A working web app", "A written scope", "A handover"],
    [
      {
        question: "Is a web app the same as a website?",
        answer: "No. A website explains and collects enquiries. A web app is software people log into and use.",
      },
    ],
    {
      title: "Web Application Development in India",
      description: "Custom web apps by grow2gether: accounts, workflows and dashboards. Based in India, Delhi-NCR. Serving the US, UK and worldwide. Scope and fixed price before we start.",
      keywords: ["web application development India", "web app development Delhi-NCR", "custom web app for US teams", "browser software development"],
    },
    ["custom-software-development", "nextjs-development", "website-development"],
    ["01", "02"],
    "Smartphone",
    {
      offerings: [
        { title: "Accounts and roles", description: "Sign-in and permissions when the product needs them. Who can see what is named in the scope." },
        { title: "Workflow screens", description: "Screens follow the job: a broker desk, an order queue, a booking calendar, a client area. They do not follow a generic admin template." },
        { title: "A first release", description: "Version one is the workflow you need live. Later modules are listed as later, so the price does not drift." },
        { title: "A public site plus an app", description: "Some projects need both a website and a signed-in tool. Those are two scopes. Mixing them into one vague brief is how the timeline slips." },
        { title: "Handover", description: "The team gets the app and a briefing of how to use what was built." },
      ],
      included: [
        { title: "The workflow, written down", description: "The repeated task is described before the screens are built." },
        { title: "Clean application code", description: "Built with Next.js and React unless the scope says otherwise. The code is meant to be continued, not thrown away after launch." },
        { title: "Phone layout where the task happens on a phone", description: "If people use the app on a phone, that screen is designed. A desktop-only tool is only desktop when the scope says so." },
        { title: "A fixed price for version one", description: "Individual work starts from ₹5,900. An application is priced from its scope, not from that floor." },
      ],
    },
  ),
  page(
    "custom-software-development",
    "Custom software",
    "Software for a workflow the off-the-shelf tools do not cover.",
    "Custom software for a specific business process, scoped around the steps people repeat.",
    [
      "Custom software is for a process you cannot buy: a broker desk, an internal approval step, or a tool that has to talk to systems you already run.",
      "We do not rebuild a whole company platform when a smaller tool will do. The scope says what is included.",
    ],
    [
      { title: "One process", description: "The software follows a named workflow, not a generic feature menu." },
      { title: "Integrations in scope", description: "Connections to existing tools are listed before the price." },
      { title: "Your team runs it", description: "Handover includes how to use what was built." },
    ],
    ["Next.js", "React", "APIs"],
    ["Operations that are still retyped", "Teams that have outgrown a spreadsheet"],
    ["Software for the agreed workflow", "A fixed price", "A handover"],
    [
      {
        question: "Will you connect it to our current tools?",
        answer: "Yes, when that connection is in the scope. We do not promise every integration by default.",
      },
    ],
    {
      title: "Custom Software Development in India",
      description: "Custom software by grow2gether for a specific business workflow. Based in India, Delhi-NCR. Serving the US, UK and worldwide. Scoped and priced before development starts.",
      keywords: ["custom software development India", "custom software Delhi-NCR", "business software for UK companies", "workflow software"],
    },
    ["web-application-development", "business-automation", "nextjs-development"],
    ["01", "02", "09"],
    "Braces",
    {
      offerings: [
        { title: "One named process", description: "The software follows a workflow you can point at: approvals, a desk, a handoff. It is not a menu of generic features." },
        { title: "Tools you already run", description: "Connections to current systems are listed before the price, and only when an API or export exists." },
        { title: "A smaller tool when that is enough", description: "We do not rebuild a whole company platform when one step is the problem. The scope says which step." },
        { title: "Internal use", description: "Software for the team, not a public marketing site. The public site is a separate service when you also need one." },
        { title: "Handover your team can run", description: "Someone on your side learns how to use it. Exceptions stay with a person. The software does not replace the team." },
      ],
      included: [
        { title: "A written workflow", description: "Steps, roles and the tools involved are agreed before development." },
        { title: "Integrations that were scoped", description: "We connect what was listed. We do not promise every future integration." },
        { title: "A first version you can use", description: "The release matches the scope. Extra processes are quoted separately." },
        { title: "Search and answer clarity", description: "If the software has a public page, that page has a title and a description. Private tools are not indexed." },
      ],
    },
  ),
  page(
    "nextjs-development",
    "Next.js development",
    "Sites and apps on Next.js, with the rendering choice made for the page.",
    "Next.js and React development for marketing sites and web apps, hosted so the team can ship updates.",
    [
      "Most grow2gether marketing sites and web apps are built with Next.js and React. A simple content site may use Astro instead, when that is the better fit.",
      "The stack is chosen in the scope. We do not add Next.js to a project that does not need it.",
    ],
    [
      { title: "App Router", description: "Pages, metadata and routes are part of the same Next.js project." },
      { title: "SEO in the build", description: "Titles, canonicals and structured data are set per page." },
      { title: "Handover", description: "You can keep shipping, or we can stay for maintenance." },
    ],
    ["Next.js", "React", "TypeScript", "Vercel"],
    ["Teams that want a Next.js site or app", "Projects that have outgrown a page builder"],
    ["A Next.js project", "Documented scope", "A way to deploy it"],
    [
      {
        question: "Do you only use Next.js?",
        answer: "No. Next.js is the usual choice for sites and apps. Astro is used when a content site should stay simpler.",
      },
    ],
    {
      title: "Next.js Development in India",
      description: "Next.js and React development by grow2gether for websites and web apps. Based in India, Delhi-NCR. Serving the US, UK and worldwide. Fixed price after the scope.",
      keywords: ["Next.js developer India", "Next.js development Delhi-NCR", "React developer for US companies", "Next.js website UK"],
    },
    ["website-development", "web-application-development"],
    ["10", "01"],
    "Globe2",
    {
      offerings: [
        { title: "Marketing sites on Next.js", description: "A public site with pages, metadata and a clear enquiry path, in one Next.js project." },
        { title: "Web apps on Next.js", description: "Accounts and workflows when the product is software, not a brochure. The App Router holds the routes." },
        { title: "Astro when a content site should stay simpler", description: "Next.js is the usual choice. Astro is used when a content site does not need it. The choice is in the scope." },
        { title: "SEO in the build", description: "Titles, canonical addresses and structured data are set per page. That is how the site is built, not a plugin added later." },
        { title: "A way to deploy", description: "The project is hosted so the team can ship an update. Vercel is the usual host. You can keep shipping, or we stay for maintenance." },
      ],
      included: [
        { title: "TypeScript", description: "The project is typed so the next change is less of a guess." },
        { title: "Per-page metadata", description: "Each public page can carry its own title and description." },
        { title: "Responsive pages", description: "Layouts are checked on a phone as well as a desktop." },
        { title: "Handover of the repository", description: "You receive the project and how it is deployed." },
      ],
    },
  ),
  page(
    "website-redesign",
    "Website redesign",
    "Make the site reflect the business you have become.",
    "A redesign when the services, the reputation and the next step have moved past the current website.",
    [
      "The pages can load, the logo can be right, and the form can exist, while customers still work too hard to understand the company or take the next step.",
      "We redesign the messaging, the journey and the phone experience around how people choose, contact or buy today. Useful pages and addresses stay. The platform stays too, including WordPress, when it still fits. If it does not, a rebuild is the scope, said before the price.",
    ],
    [
      { title: "What is kept", description: "Pages, copy and URLs that still work are named in the scope." },
      { title: "What changes", description: "Structure, design and the enquiry path are redesigned together." },
      { title: "Launch plan", description: "The new site replaces the old one when you sign off the review." },
    ],
    ["Next.js", "WordPress, when it still fits", "Content migration"],
    ["Sites that look dated", "Sites the team is afraid to edit"],
    ["A redesigned site", "A list of what moved", "A handover"],
    [
      {
        question: "Can you keep our current pages?",
        answer: "Yes, when they still match the offer. The scope says which URLs stay and which are replaced.",
      },
    ],
    {
      title: "Website Redesign and Modernization",
      description: "Redesign a business website that no longer matches the company: messaging, journey, phone layout and the next step. WordPress when it still fits. Based in India, Delhi-NCR. Serving the US, UK and worldwide.",
      keywords: ["website redesign India", "website modernization", "WordPress website redesign", "website redesign Delhi-NCR", "website redesign for US companies", "website redesign for UK companies"],
    },
    ["web-design", "website-development", "ui-ux-design"],
    ["08", "06"],
    "PenTool",
    {
      offerings: [
        { title: "A new structure, not a reskin", description: "Changing colors on a page that still fails to explain the offer is not a redesign. The structure, the proof and the next step are redesigned together." },
        { title: "What is kept", description: "Pages, copy and addresses that still work are named in the scope, so a URL that is printed or already indexed is not dropped by accident." },
        { title: "Phone layout", description: "If the current site fails on a phone, that is part of the brief. The new layout is checked on a small screen before launch." },
        { title: "A site the team can edit", description: "If the old site is scary to update, the handover includes how the new one is edited." },
        { title: "Launch when you sign off", description: "The new site replaces the old one after review. The scope says which addresses move." },
      ],
      included: [
        { title: "A list of what moves", description: "Kept pages and replaced pages are written down before the price." },
        { title: "Design for this company", description: "The redesign does not start from a theme gallery." },
        { title: "Search-safe addresses", description: "Canonicals and redirects for moved pages are part of the launch plan when those pages exist." },
        { title: "A fixed price after the scope", description: "Individual work starts from ₹5,900. A large redesign is priced from the scope, not from that floor." },
      ],
    },
  ),
  page(
    "website-maintenance",
    "Website maintenance",
    "Updates, fixes and small changes after the site is live.",
    "Ongoing help after launch: content edits, bug fixes and small improvements, agreed as a scope.",
    [
      "Maintenance is optional. After launch you can run the site yourself, or we stay for updates, fixes and small changes.",
      "There is no published package grid. The monthly or one-off work is written down and priced before it starts, the same way a build is.",
    ],
    [
      { title: "Edits", description: "Copy, images and small layout changes you ask for." },
      { title: "Fixes", description: "Bugs and broken paths reported after launch." },
      { title: "A named scope", description: "What is included each month is written down, not assumed." },
    ],
    ["Next.js", "Shopify", "Hosting"],
    ["Teams that do not want to edit the site themselves", "Sites that need a known contact after launch"],
    ["An agreed maintenance scope", "A single contact for changes"],
    [
      {
        question: "Do you sell a fixed maintenance plan?",
        answer: "We agree the work and the price before it starts. We do not publish a menu of unnamed plans.",
      },
    ],
    {
      title: "Website Maintenance in India",
      description: "Website maintenance by grow2gether: updates, fixes and small changes after launch. Based in India, Delhi-NCR. Serving the US, UK and worldwide. Scoped and priced first.",
      keywords: ["website maintenance India", "website maintenance Delhi-NCR", "website updates for US companies", "site support after launch"],
    },
    ["website-development", "shopify-development"],
    ["04", "10"],
    "Wrench",
    {
      offerings: [
        { title: "Edits", description: "Copy, images and small layout changes you ask for, inside the scope that was agreed." },
        { title: "Fixes", description: "Bugs and broken paths reported after launch." },
        { title: "A named monthly or one-off scope", description: "What is included is written down and priced before it starts. There is no public menu of unnamed maintenance plans." },
        { title: "What is a new project", description: "A new shop, a sign-in area or a redesign of the structure is a new scope, not a maintenance ticket." },
        { title: "Optional after handover", description: "You can run the site yourself. Maintenance is there if you want a known contact afterwards." },
      ],
      included: [
        { title: "A written list", description: "The period and the kinds of change are agreed first." },
        { title: "One contact", description: "You write to the studio, not to a rotating helpdesk." },
        { title: "No lock-in in the site", description: "You can stop. The site is not built so that only we can touch it." },
        { title: "Work outside the list is quoted", description: "Extra changes are priced before they are done." },
      ],
    },
  ),
  page(
    "business-automation",
    "AI and business automation",
    "Start with the workflow. Use AI only where it removes work.",
    "Workflows, internal assistants and connections to the tools you already use. A person still approves the actions that should not run alone.",
    [
      "We map how the work happens today, then mark each step as a rule, an integration, an AI step, a human step, or a step that waits for approval.",
      "The tools you already use stay the source of truth when they should. The scope names the systems, the permissions and what the automation is not allowed to change.",
    ],
    [
      { title: "Named steps", description: "The repeated task is written down before anything is connected." },
      { title: "Tools you have", description: "We connect what you already use, when an API or export exists." },
      { title: "A limit", description: "If a tool cannot connect, that is said in the scope, not after the build." },
    ],
    ["APIs", "Webhooks", "Next.js"],
    ["Teams retyping orders or enquiries", "Shops with a manual follow-up"],
    ["The agreed steps connected", "A note of what still needs a person"],
    [
      {
        question: "Will this replace our staff?",
        answer: "No. It removes a repeated step. Someone still owns the exceptions.",
      },
    ],
    {
      title: "AI Automation and Business Workflows",
      description: "AI workflows, internal assistants and business automation that connect the tools you already use. Human approval before sensitive writes. Based in India, Delhi-NCR. Serving the US, UK and worldwide.",
      keywords: ["AI automation India", "AI workflow automation", "internal AI assistant", "business process automation Delhi-NCR", "AI agents for business", "document processing automation"],
    },
    ["custom-software-development", "ecommerce-development"],
    ["01", "02", "09"],
    "Workflow",
    {
      offerings: [
        { title: "Workflow automation", description: "Several steps of one process become one workflow: a request comes in, the right context is fetched, an action is prepared, and another system is updated only if that write is allowed." },
        { title: "Internal assistants", description: "A conversational way for staff to find a record, summarize it, draft a reply, or start an approved workflow. Access follows the person’s role. It is not an open door to every system." },
        { title: "Multi-step agents", description: "A request can be read, matched to a task, checked against business data, and completed only after a person approves the write. Rules still decide what is allowed." },
        { title: "Document and data processing", description: "PDFs, emails, invoices, forms and applications can be classified, summarized, or turned into structured fields, then routed. Missing fields are flagged instead of guessed into a record." },
        { title: "Customer request routing", description: "Incoming requests can be classified, matched to the account context you allow, and sent to the right person. A suggested reply can be drafted. Sending it can wait for approval." },
        { title: "Operations", description: "Status updates, task creation, notifications, onboarding steps and recurring reports, across the tools already in use." },
        { title: "Internal knowledge", description: "Staff can ask across the documents and records that are in scope: procedures, project notes, product docs. Other folders stay out." },
        { title: "APIs and the tools you have", description: "CRM, email, a database, payments, a calendar, a shop, or a custom API, when that system is named and can connect. AI is one part of that. The connection is the other." },
      ],
      included: [
        { title: "Read, prepare, or write", description: "Read-only steps can search and summarize. Prepare steps draft a change. A write to customer records, payments, or an external message waits for approval when the risk calls for it. Low-risk steps can run inside a rule you agreed." },
        { title: "Your systems stay the source of truth", description: "Customers, projects, tasks, documents and payments stay where they already live. The workflow connects them. It does not ask the team to maintain a second copy." },
        { title: "Guardrails in the scope", description: "Roles, input checks, a log of what ran, and what happens on failure are named before the build, for the workflow that needs them." },
        { title: "One workflow first", description: "The first build is one defined path: document extraction, request routing, a report, or a task. A larger agent is a later scope, not the opening assumption." },
      ],
    },
  ),
  page(
    "ui-ux-design",
    "UI/UX design",
    "Flows and screens for a site or app, checked against the task.",
    "User flows, page structure and interface design for websites and web apps.",
    [
      "UI/UX work is the flows and screens: what the person is trying to do, the steps, and the interface. Visual design for a marketing site also lives on the web design page.",
      "Research here means the conversations and examples we have, not a claimed lab study. We do not invent user-research statistics.",
    ],
    [
      { title: "Flows", description: "The steps from arrival to the completed task are drawn first." },
      { title: "Screens", description: "Key screens are designed for the task, including the empty and error states that matter." },
      { title: "Usable on a phone", description: "The same flow is checked on a small screen." },
    ],
    ["Interface design", "Next.js"],
    ["Apps with confusing steps", "Sites where people drop off before the enquiry"],
    ["Flows and screens", "A design the build can follow"],
    [
      {
        question: "Do you run formal user research?",
        answer: "We work from your audience, your current site and the task. We do not sell a research study we did not do.",
      },
    ],
    {
      title: "UI/UX Design in India, Delhi-NCR",
      description: "UI and UX design by grow2gether: flows and screens for websites and web apps. Based in India, Delhi-NCR. Serving the US, UK and worldwide.",
      keywords: ["UI UX design India", "UI UX designer Delhi-NCR", "interface design for US products", "UX design for web apps"],
    },
    ["web-design", "web-application-development", "website-redesign"],
    ["06", "08", "01"],
    "PenTool",
    {
      offerings: [
        { title: "Audience and the next step", description: "The work starts from who uses it and what they are trying to finish. We use your audience, the current product and the task. We do not invent research statistics." },
        { title: "Flows", description: "The steps from arrival to the completed task are drawn before the visual design." },
        { title: "Screens", description: "Key screens are designed for that task, including the empty and error states that matter." },
        { title: "Websites and web apps", description: "A marketing site and a signed-in product are different jobs. Visual design for a marketing site also lives on the web design page." },
        { title: "A design the build can follow", description: "The screens are specific enough to build. They are not a mood board with no steps." },
      ],
      included: [
        { title: "Type and hierarchy", description: "What is read first is a design decision, not a default heading style." },
        { title: "Color for the task", description: "Color marks the action and the brand. It is not a universal conversion formula." },
        { title: "Phone flows", description: "The same task is checked on a small screen." },
        { title: "No claimed lab study", description: "If a formal research study was not done, we do not say it was." },
      ],
    },
  ),
  page(
    "website-development-delhi",
    "Website development in India",
    "Based in India, Delhi-NCR. Serving the US, UK and worldwide.",
    "Website development from a studio in India, Delhi-NCR, for businesses in India and clients in the US, UK and worldwide.",
    [
      "grow2gether is based in India, Delhi-NCR. Published projects include law-firm sites, a New Delhi tailoring house and a Delhi groomswear boutique. Work is discussed on a call. There is no walk-in studio to visit.",
      "The service is the same website development as the main service page: a written scope, a fixed price, and a site built for the enquiry. Clients in the US, the UK and elsewhere book the same call.",
    ],
    [
      { title: "Based in India, Delhi-NCR", description: "The studio is in Delhi-NCR and works with clients in India, the US, the UK and worldwide." },
      { title: "Remote calls", description: "The first conversation is a free 30-minute call. There is no public office address." },
      { title: "Same scope, wherever you are", description: "A written scope and a fixed price. Time zones are handled on the call." },
    ],
    ["Next.js", "React"],
    ["Businesses in India and Delhi-NCR", "Teams in the US or UK who want a direct founder contact"],
    ["A site scoped for your business", "A fixed price", "A call that works across time zones"],
    [
      {
        question: "Do you have an office I can visit?",
        answer: "No public office. The first meeting is a call or Google Meet. The studio is based in India, Delhi-NCR.",
      },
      {
        question: "Do you only work in Delhi?",
        answer: "No. Delhi-NCR is home. We serve businesses in India and clients in the US, UK and worldwide on the same kind of call.",
      },
    ],
    {
      title: "Website Development in India, Delhi-NCR",
      description: "grow2gether builds business websites from India, Delhi-NCR, for clients in India, the US, UK and worldwide. Fixed price, free 30-minute call.",
      keywords: ["website development company India", "website developer Delhi-NCR", "website development for US businesses", "website development for UK businesses"],
    },
    ["website-development", "web-design"],
    ["04", "05", "06", "07"],
    "Globe2",
    {
      offerings: [
        { title: "The same website service", description: "Structure, design, build, the enquiry path and a handover. This page is the same work, for people searching from India, Delhi-NCR, the US or the UK." },
        { title: "Clients in India", description: "Delhi-NCR is home. Businesses elsewhere in India book the same call." },
        { title: "Clients in the US and UK", description: "The scope and the price are written the same way. The call is on Google Meet, phone or WhatsApp." },
        { title: "No walk-in studio", description: "There is no public office to visit. The first meeting is the call." },
      ],
      included: [
        { title: "A written scope", description: "Pages and functions are listed before the price, wherever the client is." },
        { title: "A fixed price", description: "Individual solutions start from ₹5,900. The price for your scope is agreed before we start." },
        { title: "Search-ready pages", description: "Titles, descriptions and canonical addresses are set per page." },
        { title: "A handover", description: "You get the live site and a briefing. Time zone is handled on the call." },
      ],
    },
  ),
];

export const getServicePage = (slug: string) => servicePages.find((page) => page.slug === slug);
