---
featured: true
title: "Redis Clone"
description: "TCP üzerinden RESP protokolünü uygulayan Redis uyumlu sunucu projesi. In-memory veri yapıları ve protokol parsing'e sahip."
projectType: oss
year: 2024
status: "prototype-completed"
mainTags: ["typescript", "rust", "tcp"]
links:
  [
    {
      title: "GitHub'da Gör (Typescript)",
      url: "https://github.com/emrecancorapci/codecrafters-redis-typescript",
      primary: true,
    },
    {
      title: "GitHub'da Gör (Rust)",
      url: "https://github.com/emrecancorapci/codecrafters-redis-typescript",
    },
  ]
blocks:
  [
    {
      title: "Özellikler",
      type: "tags",
      content: ["data-structures", "parsing", "serialization-deserialization", "command-routing"],
    },
    {
      title: "Etiketler",
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

[Codecrafters](https://www.codecrafters.io/) üzerinden, yapılandırılmış bir challenge olarak başladığım bir başka projem. Rust öğrenmeye bir ay ara verdiğim 2024'te başladım.

Redis hakkında bildiğim tek şey, anahtar-değer tabanlı bir veritabanı olduğuydu. Nasıl kullanılacağını öğrenmeyi hep istedim ama hiç fırsatım olmadı. Bu yüzden Typescript ile bir redis klonu yapmaya karar verdim.

Önce rehber bana redis için bazı temel komutları ve RESP protokolünün temel kullanımını tanıttı. Sonra işler karmaşıklaştı ve eksiksiz bir RESPv2 protokolü uygulaması gerekli hale geldi.

Protokolü uygulamak için [Redis dokümantasyonunu](https://redis.io/docs/latest/develop/reference/protocol-spec/) tekrar tekrar okumak gerekir. Bir insan dokümanları okuduğunu ve kuralları gerçekten iyi uyguladığını düşünse bile sorunlar çıkacaktır. Bu sorunları çözmek için bol bol test yazmak gerekir. Sonra da onları debug etmek.

Çünkü protokollerin nasıl çalıştığını öğrenmek, redis'in onları nasıl kullandığından farklıdır. Ve redis hakkında hiçbir şey bilmemek de işe yaramaz. Uzun doküman okuma oturumları, bolca debug oturumu ve yeniden yazmaların ardından RESPv2 protokolünün ayrıştırma ve serileştirme işlemlerini tamamladım.

Sonra komut sayısı artmaya başladı. if else blokları içler acıtırcasına çirkin görünmeye başladı. Bu yüzden komutları farklı dosyalara ayırmaya ve bir komut yönlendirici oluşturmaya karar verdim.

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
