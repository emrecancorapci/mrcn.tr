---
layout: "@/layouts/project-layout.astro"
name: "krustie"
description: "An easy to use back-end framework for Rust."
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
  }
]
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
    ]
  },
  {
    title: "Tags",
    type: "tags",
    content: ["rust", "http", "tcp", "web", "backend", "system-programming"]
  },
]
---

Started this project in 2024 when I was learning Rust. I've been following http server project guide on [Codecrafters](https://www.codecrafters.io/).

At first it was a simple http server with a few routes. But when I finished the guide, I had decided to turn the project into a basic framework because I already have plans about it while I was coding. After all these work I realized that **all web infrastructure is just a bunch of parsers bundled together**.

It as a _single threaded http server_ with routing with queries (_`/user?sort=DESC`_) and dynamic parameters (_`/user/:id`_), middleware support with built-in middlewares _such as static file serving, rate limiting, gzip compression_, and some basic testing tools.

I'm planning to add multithreading and asynchronous methods support in the future. But right now I'm focusing on learning concurrency and multithreading.
