import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";

import { experienceSchema } from "./schemas/experience.schema";
import { projectSchema, projectTypeSchema } from "./schemas/project.schema";
import { skillsSchema } from "./schemas/skills.schema";

/**
 * Generates ids for localized markdown entries: `krustie.md` -> "krustie",
 * `krustie.tr.md` -> "krustie.tr". The Turkish suffix survives so entries can be
 * matched to a locale (see src/lib/i18n-content.ts); the base slug matches the
 * default loader behavior for ASCII filenames.
 */
const generateLocalizedId = ({ entry }: { entry: string }) => {
  const withoutExt = entry.replace(/\.[^./]+$/, "");
  const isTr = withoutExt.endsWith(".tr");
  const base = (isTr ? withoutExt.slice(0, -3) : withoutExt)
    .toLowerCase()
    .replaceAll(".", "")
    .replaceAll(" ", "-");
  return isTr ? `${base}.tr` : base;
};

const project = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/data/projects", generateId: generateLocalizedId }),
  schema: projectSchema,
});

const projectType = defineCollection({
  loader: file("./src/data/projects/types.json"),
  schema: projectTypeSchema,
});

const skills = defineCollection({
  loader: file("./src/data/skills.json"),
  schema: skillsSchema,
});

const experiences = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./src/data/experiences",
    generateId: generateLocalizedId,
  }),
  schema: experienceSchema,
});

export const collections = { project, projectType, skills, experiences };
