import { z } from "astro/zod";

const blockTags = z.object({
  title: z.string(),
  type: z.literal("tags"),
  content: z.array(z.string()),
});

const blockPlain = z.object({
  title: z.string(),
  type: z.literal("plain"),
  content: z.string(),
});

const blockRecords = z.object({
  title: z.string(),
  type: z.literal("records"),
  content: z.array(z.tuple([z.string(), z.string()])),
});

const link = z.object({
  title: z.string(),
  url: z.string(),
  primary: z.boolean().optional(),
});

const projectType = z.literal(["published", "oss", "freelance"]);

export const projectTypeSchema = z.object({
  title: z.string(),
  order: z.number(),
});

export const projectSchema = z.object({
  title: z.string(),
  projectType: projectType,
  description: z.string(),
  mainTags: z.array(z.string()),
  tags: z.array(z.string()).optional(),
  links: z.array(link).optional(),
  blocks: z.array(z.union([blockTags, blockPlain, blockRecords])).optional(),
});
