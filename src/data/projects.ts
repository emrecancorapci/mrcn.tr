export const krustie: Project = {
  title: "krustie",
  slug: "krustie",
  description: "Easy to use back-end framework for Rust",
  mainTags: ["rust", "web", "tcp"],
  tags: [
    "software-architecture",
    "parsing",
    "routing",
    "testing",
    "logging",
    "serialization-deserialization",
    "error-handling",
    "fluent-api",
    "rust",
    "http",
    "tcp",
    "web",
    "backend",
    "system-programming",
  ],
  links: [
    {
      title: "View on GitHub",
      url: "https://github.com/emrecancorapci/krustie",
      primary: true,
    },
    {
      title: "See Documentation",
      url: "https://docs.rs/krustie",
    },
    {
      title: "View on crates.io",
      url: "https://crates.io/crates/krustie",
    },
  ],
  blocks: [
    {
      title: "Features",
      type: "tags",
      content: [
        "software-architecture",
        "parsing",
        "routing",
        "testing",
        "logging",
        "serialization-deserialization",
        "error-handling",
        "fluent-api",
      ],
    },
    {
      title: "Tags",
      type: "tags",
      content: ["rust", "http", "tcp", "web", "backend", "system-programming"],
    },
  ],
};
export const mrcnTr: Project = {
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
};
export const projects: Map<string, Project> = new Map(
  [krustie, mrcnTr].map((project) => [project.slug, project]),
);

type Project = {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  mainTags: string[];
  links: {
    title: string;
    url: string;
    primary?: boolean;
  }[];
  blocks: {
    title: string;
    type: "tags" | "plain";
    content: string[];
  }[];
};
