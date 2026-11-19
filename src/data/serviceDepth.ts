import type { CautionBlock, Faq, ProblemBlock, Step } from "@/data/detailPages";

type Depth = { problems: ProblemBlock; caution: CautionBlock; faqs?: Faq[]; steps?: Step[] };

const redesignSteps: Step[] = [
  { title: "What has changed", description: "Customers, the current site, and what the business needs people to do next. That is the brief, not a new color." },
  { title: "Redesign the journey", description: "Messaging, pages, design and the action — call, quote, booking or purchase — are shaped together." },
  { title: "Launch with a named measurement", description: "You agree what will be counted, such as form enquiries or bookings, before launch. We do not publish a result we did not record." },
];

const automationSteps: Step[] = [
  { title: "How the work happens today", description: "Users, inputs, manual steps, approvals, failures, systems and exceptions are written down." },
  { title: "Choose the simplest reliable method", description: "A business rule, an API, a schedule, or an AI step. AI is used when the step has to read, classify, extract or draft." },
  { title: "Prototype one workflow", description: "The smallest useful version is tested on real examples before the scope grows." },
  { title: "Connect the systems you already use", description: "The workflow talks to the tools in the scope. Those tools stay the source of truth when they should." },
  { title: "Add the guardrails", description: "Who can run it, what must be approved, what gets logged, and what happens when a step fails." },
  { title: "Launch and watch the exceptions", description: "We see where a person still has to step in, and whether another step is worth adding." },
];

export const serviceDepth: Record<string, Depth> = {
  "website-development": {
    problems: {
      heading: "A site can exist",
      italic: "without doing the job.",
      intro: "The logo is right and a form is on the page. Visitors still cannot tell what you do, or what to do next.",
      items: [
        { title: "The offer is hard to find", description: "The service that makes the money is a click or a scroll away from the first screen." },
        { title: "The next step is unclear", description: "Call, form, booking and WhatsApp compete, so none of them gets used." },
        { title: "The phone layout was an afterthought", description: "The desktop page was squeezed. The first screen on a phone is a banner." },
        { title: "The team cannot update it", description: "A small copy change waits on whoever built the theme." },
      ],
    },
    caution: {
      heading: "A new template",
      italic: "is not a website.",
      intro: "Swapping a logo on a theme keeps the same structure. If the structure was the problem, the new site has the same problem.",
      points: ["Unclear offer", "Buried services", "No single next step", "A phone layout that was never designed", "No handover the team can run"],
    },
  },
  "web-design": {
    problems: {
      heading: "Design that looks finished",
      italic: "can still be unclear.",
      intro: "A polished page can fail the person who has to choose, trust, or enquire.",
      items: [
        { title: "It looks like the theme", description: "Type, spacing and sections could belong to any company in the trade." },
        { title: "The next step is not designed", description: "The button is wherever the theme put a button." },
        { title: "Color does not mark the action", description: "Everything is loud, or nothing is, so the eye has nowhere to go." },
        { title: "The phone is a shrink of the desktop", description: "Responsive is not the same as a layout made for a small screen." },
      ],
    },
    caution: {
      heading: "A mood board",
      italic: "is not the page.",
      intro: "Colors and fonts do not fix a page that still fails to explain the offer or ask for the next step.",
      points: ["Hierarchy", "The words on the first screen", "Where the enquiry sits", "What the phone shows first", "Empty states, if the page is a tool"],
    },
  },
  "ecommerce-development": {
    problems: {
      heading: "A shop can be live",
      italic: "and still be hard to buy from.",
      intro: "Products are online. Finding the right one, trusting the price, and finishing the order are separate jobs.",
      items: [
        { title: "The catalogue does not match how people shop", description: "Collections follow the admin, not the way a customer looks." },
        { title: "Checkout is the theme default", description: "Steps, fields and delivery notes were never decided." },
        { title: "Orders are retyped", description: "The shop and the sheet or inbox do not share the order, so someone copies it." },
        { title: "The phone shop is cramped", description: "Price and the way to order fall below a large image." },
      ],
    },
    caution: {
      heading: "More apps",
      italic: "are not a shop.",
      intro: "An app list does not fix a catalogue or a checkout that was never designed.",
      points: ["How products are grouped", "What the product page must say", "Which payment is actually used", "Where the order goes", "What the team will update themselves"],
    },
  },
  "shopify-development": {
    problems: {
      heading: "Shopify is installed",
      italic: "and still looks like the demo.",
      intro: "A store can take payments and still feel like a theme with your logo on it.",
      items: [
        { title: "The theme was never finished", description: "Homepage, collection and product still read as the demo." },
        { title: "Collections do not match the catalogue", description: "People cannot browse the way they ask for the products." },
        { title: "Apps were added without a job", description: "Each one is another fee and another thing that can break." },
        { title: "Fees were not named", description: "The Shopify subscription and payment fees are separate from the build. They should be said before the work." },
      ],
    },
    caution: {
      heading: "Shopify is not",
      italic: "every shop.",
      intro: "If the order path or the accounts do not fit Shopify, forcing them in costs more than saying so.",
      points: ["Catalogue shape", "Checkout rules", "Account logic Shopify cannot hold", "Apps that earn their place", "A custom shop when Shopify is the wrong base"],
    },
  },
  "web-application-development": {
    problems: {
      heading: "The work is still",
      italic: "outside the browser.",
      intro: "People log into something, or they do not. The repeated job is still a spreadsheet, a chat, or a shared password.",
      items: [
        { title: "One login for everyone", description: "There are no roles, so everyone sees everything or someone emails the file." },
        { title: "Screens follow an admin template", description: "The job has steps. The software has menus." },
        { title: "Version one tries to be the whole company", description: "The first release never ships because every later idea is in it." },
        { title: "A public site was asked to be the tool", description: "A marketing page with a picture of a dashboard is not an application." },
      ],
    },
    caution: {
      heading: "Features",
      italic: "are not a workflow.",
      intro: "A list of modules does not say who does the task, what they need on screen, and what version one excludes.",
      points: ["The task people repeat", "Who is allowed to see it", "What is in the first release", "What is later", "How the team is shown the result"],
    },
  },
  "custom-software-development": {
    problems: {
      heading: "The process does not",
      italic: "fit a product you can buy.",
      intro: "Staff move the same facts between tools because none of those tools know the step your business actually runs.",
      items: [
        { title: "The step is still retyped", description: "Email, sheet and the system of record each hold a different copy." },
        { title: "The scope is the whole platform", description: "One painful step gets a rebuild of everything around it." },
        { title: "Integrations are assumed", description: "A tool with no API is promised a connection." },
        { title: "Nobody owns the exceptions", description: "The happy path is drawn. The case that does not fit is not." },
      ],
    },
    caution: {
      heading: "Rebuilding everything",
      italic: "is the expensive fix.",
      intro: "Custom software should follow one named workflow. A smaller tool is the right scope when a smaller tool will do.",
      points: ["The step, named", "The systems that already hold the data", "What cannot connect", "Who handles the exception", "What the team must be able to run without us"],
    },
  },
  "nextjs-development": {
    problems: {
      heading: "The stack is in the way",
      italic: "or it was never chosen.",
      intro: "A page builder, a pile of plugins, or a project nobody can deploy is a different problem from a missing page.",
      items: [
        { title: "The builder cannot do the page", description: "The layout or the data does not fit the tool, so people work around it." },
        { title: "Each page has no real metadata", description: "Titles and descriptions are shared, so search engines see one page copied." },
        { title: "The team cannot ship", description: "An update waits on a person who is not there." },
        { title: "Next.js was added because it is familiar", description: "A simple content site does not need it. Astro is the quieter choice when that is the fit." },
      ],
    },
    caution: {
      heading: "The framework",
      italic: "is not the project.",
      intro: "Choosing Next.js before the pages and the job are known is how a simple site becomes a large one.",
      points: ["What the page has to do", "Whether accounts are involved", "Metadata per page", "How it is deployed", "Who edits it after launch"],
    },
  },
  "website-redesign": {
    steps: redesignSteps,
    problems: {
      heading: "A website can still function",
      italic: "without doing its job.",
      intro:
        "The pages load. The logo is right. The contact form exists. Customers still work too hard to understand the business, or to call, book, or buy.",
      items: [
        { title: "The site shows an earlier company", description: "Services, proof and ambitions have moved. The website still introduces the older version." },
        { title: "Visitors cannot find what matters", description: "The service you want them to see is behind weak navigation or a flat list of pages." },
        { title: "People arrive and do not act", description: "They do not consistently call, ask for a quote, book, or buy. The cause may be the words, the structure, the button, or all three." },
        { title: "Mobile is only technically responsive", description: "The layout shrinks. Important information, the menu, the form and the next step were not designed for a small screen." },
        { title: "Simple changes are hard", description: "Years of plugins, page builders and inconsistent layouts make a text change a project." },
        { title: "You cannot tell what the site contributes", description: "If enquiry tracking was never agreed, ads and search spend have nothing reliable to point at. We set up the measurement that is in the scope. We do not invent a percentage." },
      ],
    },
    caution: {
      heading: "A new look",
      italic: "does not name the problem.",
      intro: "Changing color, layout and type does not fix the friction if you have not said what the friction is. You can rebuild the site and keep it.",
      points: [
        "Unclear messaging",
        "Confusing navigation",
        "Buried services",
        "Weak proof",
        "A poor path to the enquiry or the sale",
        "Form friction",
        "A weak phone layout",
        "No agreed measurement",
        "Technical problems that make edits slow",
      ],
      close:
        "The scope can include positioning, navigation, proof, phone layout, forms, booking or buying, performance and the measurement you agree. Useful content, addresses and connections are listed before major changes. The aim is to keep what works.",
    },
    faqs: [
      {
        question: "How do I know if I need a redesign or a new website?",
        answer: "If the offer and the addresses are still right, a redesign of the structure and the journey is enough. If the platform itself makes publishing or the phone layout impossible, a rebuild is the scope. We say which one before the price.",
      },
      {
        question: "Can you redesign only part of my website?",
        answer: "Yes. Priority pages can be the whole scope. A wider redesign is chosen when the navigation and the hierarchy are the problem, not one page.",
      },
      {
        question: "Can you redesign my existing WordPress website?",
        answer: "Yes, when WordPress still fits how you publish. If plugins and the theme are why simple changes are hard, the scope can be a rebuild, usually on Next.js. That choice is written down before we start.",
      },
      {
        question: "Will a website redesign hurt my SEO?",
        answer: "It can, if addresses disappear. Pages and URLs that should stay are listed first. Moved pages get redirects when that is in the scope. We do not promise that rankings will rise.",
      },
      {
        question: "Can you keep my existing website content?",
        answer: "Yes, when it still matches the business. The scope says what is kept, what is rewritten, and what is removed.",
      },
      {
        question: "Do you help with website copy?",
        answer: "We reshape headings and the path of the page inside the scope. If you already have copy and photos, we use them. We do not sell a separate copy or photography department.",
      },
      {
        question: "Do you handle analytics and conversion tracking?",
        answer: "When it is in the scope, we set up the events that match the action you care about, such as a form or a booking. We agree what will be counted. We do not invent a before-and-after result.",
      },
      {
        question: "Can you connect the redesigned website to our existing systems?",
        answer: "Yes, when that connection is named in the scope and the other system has an API or an export.",
      },
      {
        question: "Can you redesign a website someone else built?",
        answer: "Yes. We need access to the current site. We do not need to have built the first version.",
      },
      {
        question: "How long does a website redesign take?",
        answer: "It follows the scope. A few priority pages and a full rebuild are not the same timeline. The timing is part of the written scope, not a number we quote before the pages are listed.",
      },
      {
        question: "Do I need to know exactly what is wrong?",
        answer: "No. Bring what feels stuck: the enquiries, the page people cannot find, or the edits you are afraid to make. The call is where that gets specific.",
      },
      {
        question: "Do I need to pay for a diagnosis before a redesign?",
        answer: "No. The first 30-minute call is free. The written scope and the fixed price come after it.",
      },
      {
        question: "Will we need a different CMS?",
        answer: "Not always. If the current system can publish what you need, we can stay on it, including WordPress. If it cannot, changing platform is part of the scope, not a surprise after launch.",
      },
      {
        question: "How do you measure whether the redesign worked?",
        answer: "By the action agreed in the scope: calls, form enquiries, bookings, or orders. If that measurement was not set up, we do not claim a result.",
      },
    ],
  },
  "website-maintenance": {
    problems: {
      heading: "After launch",
      italic: "the site still changes.",
      intro: "Copy, photos and the occasional broken path do not stop because the project was handed over.",
      items: [
        { title: "Edits wait", description: "A sentence change has no owner, so it sits." },
        { title: "Something broke", description: "A form, a link, or a page that used to work does not." },
        { title: "The list was never written", description: "“Maintenance” means whatever someone asks for this month." },
        { title: "A redesign is hiding in a ticket", description: "A new shop or a new structure is not a small edit." },
      ],
    },
    caution: {
      heading: "An open promise",
      italic: "is not a scope.",
      intro: "A monthly fee with no list becomes either unused or unlimited. Both are a bad agreement.",
      points: ["Which edits are in", "Which fixes are in", "What counts as a new project", "How you stop", "Who you write to"],
    },
  },
  "business-automation": {
    steps: automationSteps,
    problems: {
      heading: "Where the time",
      italic: "actually goes.",
      intro: "The same facts move by hand between email, documents and the tools the team already has. Each pass is short. Every week, it is the work.",
      items: [
        { title: "Copying from email into another tool", description: "A request arrives in one place and is typed into another." },
        { title: "Reading a document for a few fields", description: "Invoices, forms and PDFs are opened so someone can retype what is already written." },
        { title: "Status updates across tools", description: "The same customer or project is updated in more than one system." },
        { title: "Routing by memory", description: "A person has to notice the request and decide who should see it." },
        { title: "Searching for an answer", description: "Staff look through folders, chats and records before they can reply." },
        { title: "The same admin every week", description: "Reports, follow-ups and handoffs are rebuilt from scratch." },
      ],
    },
    caution: {
      heading: "Start with the workflow",
      italic: "not the AI.",
      intro: "Not every step needs a model. A rule, an API call, or a scheduled job is often the reliable choice. AI belongs where the step has to understand, summarize, classify, extract, or draft.",
      points: [
        "Automated with a rule",
        "Integrated with a tool you already use",
        "AI-assisted, when language is the input",
        "Kept human",
        "Reviewed before anything is written",
      ],
      close:
        "Some actions can run on their own: reading, summarizing, preparing a draft. Writing to customer records, payments, or an external message waits for a person when the risk says it should. The boundary is in the scope.",
    },
    faqs: [
      {
        question: "What is the difference between automation and an AI agent?",
        answer: "Automation is a step that runs when the input matches a rule: a form becomes a row, an order reaches an inbox. An agent is for a request that has to be read, then followed across more than one step, often with a person approving the write.",
      },
      {
        question: "Does every automation need AI?",
        answer: "No. If the step is already structured, a rule or an API is simpler. AI is for unstructured language: an email, a PDF, a question asked in a sentence.",
      },
      {
        question: "Can the AI update our business systems?",
        answer: "Only the actions named in the scope, and only through the API those systems allow. Open access to every record is not the design.",
      },
      {
        question: "Can employees approve an action before anything changes?",
        answer: "Yes. A workflow can stop at a draft: the task, the message, or the update is shown, and nothing is written until a person approves it.",
      },
      {
        question: "Can you connect this to our database or internal app?",
        answer: "Yes, when that system is in the scope and it has an API or a documented export. If it cannot connect, that limit is said before the build.",
      },
      {
        question: "Can the system use our internal documentation?",
        answer: "Yes, as a source the assistant is allowed to read. Who can ask, and which documents are in, is part of the scope. It does not receive every folder by default.",
      },
      {
        question: "What AI models do you use?",
        answer: "The model is chosen for the task and named in the scope. The product is the workflow and the permissions, not a single vendor logo.",
      },
      {
        question: "How do you prevent the AI from doing something incorrect?",
        answer: "Permissions, checks on the input, approval before a write, and a log of what ran. Payments, customer records, external messages and anything destructive stay behind the boundary you agree.",
      },
    ],
  },
  "ui-ux-design": {
    problems: {
      heading: "People get lost",
      italic: "before the task is done.",
      intro: "The screen can look considered and still hide the step the person came to finish.",
      items: [
        { title: "The steps were never drawn", description: "Screens exist. The path from arrival to done does not." },
        { title: "The phone flow was not checked", description: "The desktop journey does not fit a thumb." },
        { title: "Empty and error states are missing", description: "The design shows the happy screen and nothing else." },
        { title: "The look was separated from the task", description: "A visual direction with no steps cannot be built." },
      ],
    },
    caution: {
      heading: "A statistic",
      italic: "is not research.",
      intro: "We work from your audience, the current product and the task. We do not invent a study or a conversion rate.",
      points: ["Who is using it", "What they are trying to finish", "Where they stop", "What the small screen must show", "Which states are in the scope"],
    },
  },
  "website-development-delhi": {
    problems: {
      heading: "A local search",
      italic: "should still reach a real studio.",
      intro: "People look for a website developer in India or Delhi-NCR, or for a team that can work with a company in the US or the UK. The work is the same call either way.",
      items: [
        { title: "Based in India, Delhi-NCR", description: "That is home. There is no public office to visit and no invented second city." },
        { title: "The US, the UK, and elsewhere", description: "The scope and the price are written the same way. The call is Google Meet, phone, or WhatsApp." },
        { title: "Direct contact", description: "You talk to the founder. There is no account manager in between." },
        { title: "The same website service", description: "Structure, design, build, the enquiry path and a handover. This page is that service, for the place you searched from." },
      ],
    },
    caution: {
      heading: "A city name",
      italic: "is not an office.",
      intro: "We do not publish a Delhi address you can walk into, and we do not claim a US or UK office.",
      points: ["India, Delhi-NCR is home", "Clients in India", "Clients in the US and the UK", "A free 30-minute call", "A written scope before the price"],
    },
  },
};
