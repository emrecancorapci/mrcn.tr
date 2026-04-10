---
title: "krustie"
projectType: "published"
description: "An experimental HTTP framework built from scratch in Rust to explore routing, middleware pipelines, and request object immutability."
mainTags: ["rust", "web", "tcp"]
links:
  [
    { title: "View on GitHub", url: "https://github.com/emrecancorapci/krustie", primary: true },
    { title: "See Documentation", url: "https://docs.rs/krustie" },
    { title: "View on crates.io", url: "https://crates.io/crates/krustie" },
  ]
blocks:
  [
    {
      title: "About",
      type: "records",
      onTop: true,
      content:
        [
          ["Year", "2024 - Current"],
          ["Project Type", "Open Source"],
          ["Status", "Ongoing"],
          ["Latest Version", "0.2.1"],
        ],
    },
    {
      title: "Key Capabilities",
      type: "list",
      onTop: true,
      content:
        [
          "Custom HTTP parser",
          "Dynamic routing with parameters",
          "Query parsing",
          "Middleware pipeline execution",
          "Immutable request lifecycle",
          "Built-in rate limiting & gzip compression",
          "Static file serving",
          "Integration testing utilities",
        ],
    },
    {
      title: "Features",
      type: "tags",
      onTop: false,
      content:
        [
          "software-architecture",
          "parsing",
          "routing",
          "testing",
          "logging",
          "serialization-deserialization",
          "error-handling",
          "fluent-api",
          "testing",
          "middleware",
        ],
    },
    {
      title: "Tags",
      type: "tags",
      onTop: false,
      content: ["rust", "http", "tcp", "web", "backend", "system-programming"],
    },
  ]
---

Krustie is an experimental HTTP framework built from scratch in Rust. It started as a minimal HTTP server implementation and gradually evolved into a structured backend framework as I explored routing, middleware design, and request lifecycle management.

```rust
use krustie::{ Router, Server, StatusCode };

fn main() {
    let mut server = Server::create();
    let mut router = Router::new();

    router.get("/", |_, res| {
        res.status(StatusCode::Ok).body_text("Hello World!");
    });

    server.use_handler(router);

    server.listen(8080);
}
```


Started this project in 2024 when I was learning Rust. I've been following http server project guide on [Codecrafters](https://www.codecrafters.io/).

At first I followed the guide and it was a simple http server with a few basic routes. While I was working on it I started to have ideas about how it can be turned into a basic backend framework. When I finished the guide, I decided to give it a go.

When it turned into a basic framework I started to add more features. I added routing with _queries_ `/user?sort=DESC` and _dynamic parameters_ `/user/:id`. I had to rewrite the whole routing logic because first iteration was dirty and had no space for improvements.

And then I decided to add _middleware support_. It was kind of a nightmare because again I had to rewrite the whole routing logic with it. And when I started to write the framework I decided that request object must be immutable. It cost my mental health to be persevere with this decision. Because turning it into a mutable object would make so much things easier.

After that I added some basic middlewares _such as static file serving, rate limiting, gzip compression and json parser/serializer_ to see how it works. While doing it I realize there were still some features missing to create these middlewares. I added the missing features but I believe that it still needs some improvements.

I wrote some tests because while I was working on the project I had some issues with the http parser time to time. Tests helped me to fix them so much faster. And And for the final test, I decided to create a basic web server. And after I developed and run it, I found out that some of the parts don't work as expected. And then I added some basic _testing tools_ to test the app as well. It turned out great and helped me to analyze the issues better.

The project helped me to learn how to use Rust and how a http server works under the hood. It also helped me to learn what is the optimal way for me to learn anything. I realized it is better for me to learn things while I'm doing something with them.

And after all these work I realized that **all web infrastructure is just a bunch of parsers packed together**.

I'm planning to add multithreading and asynchronous methods support in the future. But right now I'm focusing on learning concurrency and multithreading. There are still a lot of things I have to learn about low level stuff.
