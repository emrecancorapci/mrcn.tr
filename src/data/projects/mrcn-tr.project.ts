import type { Project } from "@/types/project.types";

export default {
  title: "mrcn.tr",
  slug: "mrcn.tr",
  description: "Personal website built with Astro",
  mainTags: ["astro", "typescript", "web"],
  tags: [
    "astro",
    "typescript",
    "markdown",
    "tailwindcss",
    "html",
    "css",
    "web",
    "frontend",
    "web-components",
    "file-based-routing",
    "static-site-generation",
    "markdown-pages",
  ],
  links: [
    {
      title: "View on GitHub",
      url: "https://github.com/emrecancorapci/mrcn.tr",
      primary: true,
    },
  ],
  blocks: [
    {
      title: "Features",
      type: "tags",
      content: ["web-components", "file-based-routing", "static-site-generation", "markdown-pages"],
    },
    {
      title: "Tags",
      type: "tags",
      content: ["astro", "typescript", "markdown", "tailwindcss", "html", "css", "web", "frontend"],
    },
  ],
} satisfies Project;