import { getCollection } from "astro:content";

import type { Locale } from "@/i18n";
import { localizedText } from "@/schemas/localized.schema";

/** Anchor id for an experience card, derived from the company name (Turkish locale). */
export const companyAnchor = (company: string) =>
  company.toLocaleLowerCase("tr").replaceAll(" ", "-");

/** Map of project type id -> its data (title resolved for `locale`), from the `projectType` collection. */
export async function getProjectTypesMap(locale: Locale) {
  const types = await getCollection("projectType");
  return new Map(
    types.map((t) => [t.id, { title: localizedText(t.data.title, locale), order: t.data.order }]),
  );
}

/** Display title for a project type id, with a fallback. */
export const projectTypeTitle = (map: Map<string, { title: string; order: number }>, id: string) =>
  map.get(id)?.title ?? "Unknown";
