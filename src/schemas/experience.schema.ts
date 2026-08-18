import { z } from "astro/zod";

export const experienceSchema = z.object({
  /** Sort key; the experiences page renders entries in ascending priority order (1 first). */
  priority: z.number().int().min(1),
  /** Marks the experience to highlight on the home page's featured experiences section. */
  featured: z.boolean().optional(),
  title: z.string(),
  contractType: z.enum([
    "Full-Time",
    "Part-Time",
    "Freelance (Part-Time)",
    "Freelance (Full-Time)",
    "Contract (Part-Time)",
    "Contract (Full-Time)",
    "Internship",
  ]),
  company: z.string(),
  description: z.string(),
  location: z.string(),
  start: z.string(),
  end: z.string(),
  techs: z.array(z.string()),
});
