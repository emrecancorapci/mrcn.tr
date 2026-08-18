import { getCollection } from "astro:content";

import type { Project } from "@/schemas/project.schema";

/** Anchor id for an experience card, derived from the company name (Turkish locale). */
export const companyAnchor = (company: string) =>
  company.toLocaleLowerCase("tr").replaceAll(" ", "-");

/** Project status ids mapped to their display labels. */
export const PROJECT_STATUS_LABELS: Record<Project["status"], string> = {
  ongoing: "Ongoing",
  completed: "Completed",
  "prototype-completed": "Prototype Completed",
  archived: "Archived",
};

/** Map of project type id -> its data, from the `projectType` collection. */
export async function getProjectTypesMap() {
  const types = await getCollection("projectType");
  return new Map(types.map((t) => [t.id, t.data]));
}

/** Display title for a project type id, with a fallback. */
export const projectTypeTitle = (map: Map<string, { title: string; order: number }>, id: string) =>
  map.get(id)?.title ?? "Unknown";
