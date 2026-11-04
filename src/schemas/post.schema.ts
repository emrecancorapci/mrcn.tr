import { z } from "astro/zod";

export const postSchema = z.object({
  /** Publish date; the blog page renders posts in descending order (newest first). */
  pubDate: z.coerce.date(),
  title: z.string(),
  /** Short summary shown on the blog list card and the post page header. */
  description: z.string(),
  tags: z.array(z.string()).optional(),
});

export type Post = z.infer<typeof postSchema>;
