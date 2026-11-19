export const contact = {
  email: "grow2gether@gmail.com",
  location: "India, Delhi-NCR · US, UK and worldwide",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Delhi+NCR+India",
  isPlaceholder: false,
  projectTypes: [
    "Website",
    "Online shop",
    "App",
    "Automation",
    "Website and shop",
    "Not sure yet",
  ],
  budgetRanges: [
    "Not sure yet",
    "From ₹5,900",
    "₹5,900–₹15,000",
    "₹15,000–₹40,000",
    "Over ₹40,000",
  ],
};

export const countryCodes = [
  { label: "India", code: "+91" },
  { label: "United Arab Emirates", code: "+971" },
  { label: "United States", code: "+1" },
  { label: "United Kingdom", code: "+44" },
  { label: "Germany", code: "+49" },
  { label: "Netherlands", code: "+31" },
] as const;

export const contactIntro = {
  eyebrow: "Let's Build 2gether",
  title: "Let us implement your idea.",
  description:
    "Tell us about it. We look forward to making something really good out of it together. 30 minutes, free. The fixed price comes afterwards.",
  response: "Direct contact with the founder · Fixed price before we start",
};

export const contactChannels = {
  email: "Email",
  phone: "Phone",
  location: "Studio",
  follow: "Follow us",
};

export const contactSteps = [
  {
    title: "Discuss",
    description: "30 minutes, free of charge.",
    icon: "MessageCircle",
  },
  {
    title: "Fixed price",
    description: "A clear offer before we start.",
    icon: "Network",
  },
  {
    title: "Build",
    description: "Design, development and handover.",
    icon: "Rocket",
  },
] as const;

export const contactFormCopy = {
  title: "Let's Build 2gether",
  intro: "30 minutes · Free initial consultation. Share a few details and we will reply with the next step.",
  name: { label: "Name", placeholder: "Your name" },
  email: { label: "Email", placeholder: "you@company.com" },
  phone: { label: "Mobile number", placeholder: "98765 43210" },
  projectType: { label: "Project type", placeholder: "Select project type" },
  budget: { label: "Budget range", placeholder: "Select budget range" },
  message: {
    label: "Message",
    placeholder: "Tell us about the website, shop, app or automation you have in mind...",
    max: 1000,
  },
  consent: "I agree to be contacted about my project and receive relevant updates.",
  submit: "Let's Build 2gether",
  formLabel: "Project inquiry",
};

export const contactCall = {
  title: "Prefer a call?",
  intro: "Pick a suitable date and time for a short call. Optional.",
  weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  previousMonth: "Previous month",
  nextMonth: "Next month",
  timeLabel: "Select time",
  slots: [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
  ],
  noteTitle: "Can't find a suitable time?",
  noteBody: "Send the form and we will coordinate directly over email.",
};

export const contactErrors = {
  name: "Enter your name.",
  email: "Enter a valid email.",
  projectType: "Choose a project type.",
  budget: "Choose a budget range.",
  message: "Tell us a little about the project.",
  messageLength: "Keep the message under 1000 characters.",
  consent: "Agree to be contacted so we can reply about your project.",
};

export const contactSuccess = {
  eyebrow: "Draft ready",
  title: "Your Gmail draft is ready.",
  body: "Gmail opened with your message prepared. Review it, then click Send to reach us.",
  again: "Write another",
};
