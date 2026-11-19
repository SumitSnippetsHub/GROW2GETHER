import { projects } from "@/data/projects";

export function projectSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProject(slug: string) {
  return projects.find((project) => projectSlug(project.title) === slug);
}
