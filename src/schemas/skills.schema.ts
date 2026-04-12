import { z } from "astro/zod";

export const skillsSchema = z.object({
    title: z.string(),
    items: z.array(
      z.object({
        title: z.string(),
        proficiency: z.number(),
        icon: z.string().optional(),
        color: z.string().optional(),
      })
    ),
  });