import type { Project } from "@/types/project.types";

export default {
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
} satisfies Project;
