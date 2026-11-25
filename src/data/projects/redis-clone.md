---
featured: true
title: "Redis Clone"
description: "A Redis-compatible server implementing RESP protocol over TCP. Focused on in-memory data structures and protocol parsing."
projectType: oss
year: 2024
status: "prototype-completed"
mainTags: ["typescript", "rust", "tcp"]
links:
  [
    {
      title: "View on GitHub (Typescript)",
      url: "https://github.com/emrecancorapci/codecrafters-redis-typescript",
      primary: true,
    },
    {
      title: "View on GitHub (Rust)",
      url: "https://github.com/emrecancorapci/codecrafters-redis-typescript",
    },
  ]
blocks:
  [
    {
      title: "Features",
      type: "tags",
      content: ["data-structures", "parsing", "serialization-deserialization", "command-routing"],
    },
    {
      title: "Tags",
      type: "tags",
      content:
        [
          "typescript",
          "rust",
          "tcp",
          "redis",
          "web",
          "backend",
          "system-programming",
          "protocol-parsing",
        ],
    },
  ]
---

Another project of mine, started through [Codecrafters](https://www.codecrafters.io/) as a structured challenge. I began it in 2024, when I took a month off from learning Rust.

The only thing I knew about redis was that it is a key-value database. I had always wanted to learn how to use it but never had the chance. So I decided to build a redis clone in TypeScript.

First, the guide introduced me to some basic redis commands and the basic use of the RESP protocol. Then it got more complicated, and implementing the complete RESPv2 protocol became necessary.

Implementing the protocol means reading the [Redis documentation](https://redis.io/docs/latest/develop/reference/protocol-spec/) again and again. Even when you think you have read the docs and applied the rules well, problems come up. Solving them takes writing a lot of tests. And then debugging them.

Knowing how a protocol works is one thing, and how redis actually uses it is another. And not knowing anything about redis doesn't help. After long document reading sessions, a lot of debugging, and a few rewrites, I completed the parsing and serialization of RESPv2.

And then the number of commands started to grow, and the if/else blocks started to look ugly as hell. So I moved the commands into separate files and built a command router.

```typescript
export default class ServerHandler {
  commands: Map<string, ServerAction<RESPv2Data>> = new Map([
    ["ping", ping],
    ["echo", echo],
    ["set", this.useDatabase(set)],
    ["get", this.useDatabase(get)],
    ["info", this.useRole(info)],
    ["pong", this.useRole(pong)],
  ]);

  public run: CommandRunner = (command: string, data: RESPv2Data[]) => {
    return this.commands.has(command.toLowerCase())
      ? this.commandRunner(
          data,
          this.commands.get(command.toLowerCase()) as ServerAction<RESPv2Data>,
        )
      : this.sendError("Unknown command");
  };
}
```
