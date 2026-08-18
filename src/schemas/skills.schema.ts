import { z } from "astro/zod";

import { localizedStringSchema } from "./localized.schema";

export const skillsSchema = z.object({
  title: localizedStringSchema,
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
