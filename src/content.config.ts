import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";

import { projectSchema, projectTypeSchema } from "./schemas/project.schema";
import { skillsSchema } from "./schemas/skills.schema";

const project = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/data/projects" }),
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

export const collections = { project, projectType, skills };
