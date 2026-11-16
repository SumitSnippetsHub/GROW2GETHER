import type { Industry } from "@/lib/types";
import { projects } from "@/data/projects";

export const industriesIntro = {
  eyebrow: "Clients",
  title: "Built for real businesses.",
  description: "Law firms, fashion labels, B2B platforms and personal brands. Every one of them live today.",
};

export const industries: Industry[] = projects.map((project) => ({
  title: project.title,
  focus: project.category,
  ...(project.preview ? { image: project.preview } : {}),
}));
