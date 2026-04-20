import { z } from "astro/zod";

export const experienceSchema = z.object({
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
  skills: z.array(z.string()),
});
