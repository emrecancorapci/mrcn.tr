---
featured: true
title: "krustie"
description: "TCP katmanından yukarıya, Rust ile yazılmış deneysel bir backend HTTP framework'ü; özel parser'ı, middleware hattı ve değişmez (immutable) request yaşam döngüsü var."
projectType: published
year: 2024
status: "ongoing"
version: "0.3.0"
mainTags: ["rust", "web", "tcp"]
links:
  [
    { title: "GitHub'da Gör", url: "https://github.com/emrecancorapci/krustie", primary: true },
    { title: "Dokümantasyona Bak", url: "https://docs.rs/krustie" },
    { title: "crates.io'da Gör", url: "https://crates.io/crates/krustie" },
  ]
blocks:
  [
    {
      title: "Temel Yetenekler",
      type: "list",
      onTop: true,
      content:
        [
          "Özel HTTP parser",
          "Parametreli dinamik yönlendirme",
          "Query ayrıştırma",
          "Middleware hattı çalıştırma",
          "Değişmez request yaşam döngüsü",
          "Dahili rate limiting ve gzip sıkıştırma",
          "Statik dosya sunumu",
          "Entegrasyon testi araçları",
        ],
    },
    {
      title: "Özellikler",
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
      title: "Etiketler",
      type: "tags",
      onTop: false,
      content: ["rust", "http", "tcp", "web", "backend", "system-programming"],
    },
  ]
---

TCP seviyesinde çalışan minimal bir HTTP sunucu uygulaması olarak başladı; routing, middleware tasarımı ve request yaşam döngüsü yönetimini keşfettikçe yavaş yavaş immutable request yaşam döngüsüne sahip bir backend framework'üne dönüştü.

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

Başlangıçta planım birkaç temel route'u olan basit bir HTTP sunucusuydu. Üzerinde çalışırken bunun nasıl bir http framework'üne dönüştürülebileceğine dair fikirler edinmeye başladım.

Önce projenin temellerini oluşturdum, sonra _query_'li routing `/user?sort=DESC` ve _dinamik parametre_'li `/user/:id` gibi özellikler eklemeye başladım. Routing mantığının tamamını yeniden yazmak zorunda kaldım çünkü ilk iterasyonun büyüme alanı yoktu — sadece istemciden gelen string'leri rotalarla karşılaştırıyordu.

Sonraki adım _middleware desteğini_ eklemekti. Routing mantığını bu kez router ile endpoint hattı arasında net bir ayrım oluşturmak için tekrar yeniden yazdım. Mimari açıdan router, middleware ve endpoint'in hepsi handler'dır. Router, isteği hattın doğru bölümüne yönlendiren bir handler'dır. Middleware, endpoint'ten önce veya sonra çalışan bir handler'dır. Endpoint ise ne olacağını gerçekten ele alan handler'dır.

Bunu yaparken request nesnesini immutable yapmaya karar verdim. Bu karara bağlı kalmak zordu ama amacım, hata olasılığını azaltan güvenli ve kullanımı kolay bir framework oluşturmaktı.

```
TCP Bağlantısı → HTTP Parser → Router → Middleware Hattı → Handler → Response
```

Sonrasında middleware sisteminin nasıl çalıştığını görmek için _statik dosya sunumu, rate limiting, gzip sıkıştırma ve json parser/serializer_ gibi bazı temel middleware'ler yazdım. Bunu yaparken bu middleware'leri oluşturmak için hâlâ eksik olan özellikler olduğunu fark ettim. Eksik özellikleri ekledim fakat yine de hala bazı iyileştirmelere ihtiyacı olduğuna inanıyorum.

Projede çalışırken http parser ile zaman zaman sorunlar yaşadığım için bazı testler yazdım. Testler, bu sorunları çok daha hızlı düzeltmemi sağladı. Son olarak test için da basit bir web sunucusu oluşturmaya karar verdim. Geliştirip çalıştırdıktan sonra bazı kısımların beklendiği gibi çalışmadığını gördüm. Bu yüzden uygulamayı test etmek için yeni temel _test araçları_ da ekledim. Sorunları çok daha kolay analiz etmemi sağladı.

Tüm bunları inşa etmek bir şeyi açıkça gösterdi: **tüm web altyapısı sadece bir araya getirilmiş bir yığın parser'dan ibaret.**

Temelleri önce anlamak için mevcut mimariyi senkron tuttum. Gelecekte multithreading ve asenkron fonksiyon desteği eklemeyi de planlıyorum.
