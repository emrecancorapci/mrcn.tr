---
title: "krustie"
description: "An experimental backend HTTP framework built in Rust from the TCP layer up, with a custom parser, middleware pipeline, and an immutable request lifecycle."
projectType: "published"
year: 2024
status: "ongoing"
version: "0.3.0"
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

At first my plan was a simple HTTP server with a few basic routes. While I was working on it I started to have some ideas about how it can be turned into an http framework.

First I created the foundation of the project, then I started to add more features such as routing with _queries_ `/user?sort=DESC` and _dynamic parameters_ `/user/:id`. I had to rewrite the whole routing logic because the first iteration had no room to grow — it was just comparing strings from the client against the routes.

Next step was to add the _middleware support_. I had to rewrite the routing logic again, this time to create a clear separation between the router and the endpoint pipeline. Architecture-wise router, middleware and endpoint are all handlers. Router is a handler that routes the request to the correct part of the pipeline. Middleware is a handler that runs before or after the endpoint. And endpoint is the handler that actually handles what is going to happen.

While I was doing it I decided to make request object immutable. It was hard to persevere with this decision but I was aiming to create a safe and easy to use framework to decrease the possibility of bugs.

```
TCP Connection → HTTP Parser → Router → Middleware Pipeline → Handler → Response
```

After that I implemented some basic middlewares _such as static file serving, rate limiting, gzip compression and json parser/serializer_ to see how the middleware system works. While doing it I realized there were still some features missing to create these middlewares. I added the missing features but I believe that it still needs some improvements.

I wrote some tests because while I was working on the project I had some issues with the http parser time to time. Tests helped me to fix them so much faster. And as a final test, I decided to create a basic web server. After I developed and ran it, I found out that some of the parts don't work as expected. So I added some basic _testing tools_ to test the app as well. It turned out great and helped me to analyze the issues better.

Building this made one thing obvious: **all web infrastructure is just a bunch of parsers packed together.**

The current architecture was kept synchronous to understand the fundamentals first. I'm planning to add multithreading and asynchronous methods support in the future.