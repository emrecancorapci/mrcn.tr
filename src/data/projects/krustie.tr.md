---
featured: true
title: "krustie"
description: "TCP katmanından itibaren Rust ile yazılmış deneysel bir backend HTTP framework'ü. Özel parser, middleware pipeline'ı ve immutable request yaşam döngüsü üzerine kurulu."
projectType: published
year: 2024
status: "ongoing"
version: "0.3.1"
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
          "Middleware pipeline'ı çalıştırma",
          "Immutable request yaşam döngüsü",
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

Proje, TCP seviyesinde çalışan minimal bir HTTP sunucu uygulaması olarak başladı. Routing, middleware tasarımı ve request yaşam döngüsü yönetimini keşfettikçe immutable request yaşam döngüsüne sahip yapılandırılmış bir backend framework'üne dönüştü.

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

İlk planım, birkaç temel rotası olan basit bir HTTP sunucusuydu. Üzerinde çalışırken bunun bir HTTP framework'üne dönüşebileceği konusunda aklımda fikirler belirmeye başladı.

Önce projenin temellerini attım, ardından _query_ (`/user?sort=DESC`) ve _dinamik parametre_ (`/user/:id`) destekli routing gibi özellikler eklemeye başladım. Tüm routing mantığını yeniden yazmam gerekti, çünkü ilk iterasyonda büyüyecek yer yoktu: istemciden gelen metni rotalarla düz metin olarak karşılaştırıyordu.

Sıradaki adım _middleware desteğiydi_. Routing mantığını bu kez de yeniden yazdım. Amacım router ile endpoint hattının arasını netleştirmekti. Mimari olarak router, middleware ve endpoint'in hepsi birer handler'dır. Router isteği hattın doğru bölümüne yönlendirir, middleware endpoint'ten önce ya da sonra çalışır, endpoint ise isteğin kendisini ele alır.

Bu sırada request nesnesini immutable yapmaya karar verdim. Bu karara bağlı kalmak zaman zaman zorladı ama amacım, hatalara daha az alan bırakan güvenli ve kullanımı kolay bir framework oluşturmaktı.

```
TCP Bağlantısı → HTTP Parser → Router → Middleware Hattı → Handler → Response
```

Sonrasında middleware sisteminin nasıl çalıştığını görmek için _statik dosya sunumu, rate limiting, gzip sıkıştırma ve json parser/serializer_ gibi temel middleware'ler yazdım. Bunları yaparken bu middleware'leri kurmak için hâlâ eksik özellikler olduğunu fark ettim. Eksikleri ekledim ama framework'ün hâlâ iyileştirmeye ihtiyacı olduğunu düşünüyorum.

Projede çalışırken http parser ile zaman zaman sorunlar yaşadığım için bazı testler yazdım. Testler bu sorunları çok daha hızlı düzeltmemi sağladı. Son bir test olarak, üstüne basit bir web sunucusu yazmaya karar verdim. Geliştirip çalıştırdıktan sonra beklendiği gibi çalışmayan kısımlar buldum, bu yüzden uygulamayı da test etmek için temel _test araçları_ ekledim. Gayet iyi sonuç verdi ve sorunları çok daha rahat analiz etmemi sağladı.

Bunları inşa etmek bir şeyi açıkça gösterdi: **tüm web altyapısı, bir araya paketlenmiş parser yığınından ibaret.**

Önce temelleri anlamak için mevcut mimariyi senkron tuttum. Gelecekte multithreading ve asenkron metod desteği eklemeyi planlıyorum.
