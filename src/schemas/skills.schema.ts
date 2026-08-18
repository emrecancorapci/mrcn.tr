import { z } from "astro/zod";

export const skillsSchema = z.object({
  title: z.string(),
  items: z.array(
    z.object({
      title: z.string(),
      /** Skill level on a 1-5 scale. */
      proficiency: z.number().int().min(1).max(5),
      icon: z.string().optional(),
      color: z.string().optional(),
    }),
  ),
});
