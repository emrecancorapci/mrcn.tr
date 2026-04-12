---
title: "Redis Clone"
description: "A Redis-compatible server implementing RESP protocol over TCP. Focused on in-memory data structures and protocol parsing."
projectType: "oss"
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

Another project of mine that I had started through [Codecrafters](https://www.codecrafters.io/) as a structured challenge. I've started this project in 2024 when I took a break from learning Rust for a month.

Only thing I know about redis was that it's a key-value database. I've always wanted to learn how to use it but never had the opportunity to do so. So I decided to make a clone of redis in Typescript.

Firstly guide introduced me to some basic commands for redis and basic use of RESP protocol. Then it got more complicated and implementation of a complete RESPv2 protocol became necessary.

To implement the protocol one has to read the [Redis documentation](https://redis.io/docs/latest/develop/reference/protocol-spec/) again and again. But even one thinks that one read the docs and applied the rules really well, problems will arise. To solve those problems one has to write a lot of tests. And then one has to debug them.

Because learning how protocols works is different than how redis uses them. And not knowing anything about redis is doesn't help. After long document reading sessions and a lot of debugging sessions and rewrites, I completed parsing and serialization of RESPv2 protocol.

And then number of commands started to increase. So if else statements started to look ugly as hell. So I decided to separate the commands into different files and create a command router.

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
      ? this.commandRunner(data, this.commands.get(command.toLowerCase()) as ServerAction<RESPv2Data>)
      : this.sendError('Unknown command');
  };
}
```
