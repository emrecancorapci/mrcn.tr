---
featured: true
title: "krustie"
description: "An experimental backend HTTP framework built in Rust from the TCP layer up, with a custom parser, middleware pipeline, and an immutable request lifecycle."
projectType: published
year: 2024
status: "ongoing"
version: "0.3.1"
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

It started as a minimal HTTP server implementation that works at the TCP level, and gradually evolved into a structured backend framework with an immutable request lifecycle as I explored routing, middleware design, and request lifecycle management.

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

At first my plan was a simple HTTP server with a few basic routes. While I was working on it, I started having ideas about how it could grow into an HTTP framework.

First I laid the foundation of the project, then I added features such as routing with _queries_ (`/user?sort=DESC`) and _dynamic parameters_ (`/user/:id`). I had to rewrite the whole routing logic because the first iteration had no room to grow: it compared strings from the client against the routes.

The next step was _middleware support_. I rewrote the routing logic again, this time to separate the router from the endpoint pipeline. Architecture-wise, router, middleware, and endpoint are all handlers. The router routes the request to the correct part of the pipeline, middleware runs before or after the endpoint, and the endpoint handles the request itself.

While I was at it, I decided to make the request object immutable. Sticking to that decision was hard at times, but I was aiming for a safe, easy-to-use framework that leaves less room for bugs.

```
TCP Connection → HTTP Parser → Router → Middleware Pipeline → Handler → Response
```

After that I implemented some basic middlewares _such as static file serving, rate limiting, gzip compression and json parser/serializer_ to see how the middleware system works. While doing it I realized some features were still missing to build these middlewares. I added them, but I still believe the framework needs some improvements.

I wrote some tests because I kept running into issues with the http parser while working on the project. Tests helped me fix them much faster. As a final test, I decided to build a basic web server on top of it. After developing and running it, I found parts that did not work as expected, so I added basic _testing tools_ for testing the app as well. They turned out great and made analyzing the issues much easier.

Building this made one thing obvious: **all web infrastructure is just a bunch of parsers packed together.**

I kept the current architecture synchronous to understand the fundamentals first. I'm planning to add multithreading and asynchronous method support in the future.
