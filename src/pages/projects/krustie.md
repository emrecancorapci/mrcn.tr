---
layout: "@/layouts/project-layout.astro"
---

Started this project in 2024 when I was learning Rust. I've been following http server project guide on [Codecrafters](https://www.codecrafters.io/).

At first it was a simple http server with a few routes. But when I finished the guide, I had decided to turn the project into a basic framework because I already have plans about it while I was coding. After all these work I realized that **all web infrastructure is just a bunch of parsers bundled together**.

It as a _single threaded http server_ with routing with queries (_`/user?sort=DESC`_) and dynamic parameters (_`/user/:id`_), middleware support with built-in middlewares _such as static file serving, rate limiting, gzip compression_, and some basic testing tools.

I'm planning to add multithreading and asynchronous methods support in the future. But right now I'm focusing on learning concurrency and multithreading.
