---
title: "ETL Web Uygulaması"
description: "Uzak sunucudan düzenli aralıklarla veri alan, istenen formata dönüştüren ve başka bir sunucuya yükleyen uygulama."
projectType: freelance
year: 2024
status: "completed"
version: "1.2.1"
mainTags: ["typescript", "express", "react"]
blocks:
  [
    {
      title: "Teknolojiler",
      type: "tags",
      content:
        [
          "typescript",
          "express",
          "react",
          "shadcn-ui",
          "tailwindcss",
          "vite",
          "vitest",
          "supertest",
          "nock",
          "esbuild",
          "pm2",
          "nginx",
          "ubuntu",
          "linux",
        ],
    },
    {
      title: "Özellikler",
      type: "tags",
      content:
        [
          "backend",
          "frontend",
          "auth",
          "testing",
          "cron-jobs",
          "extract-transform-load",
          "data-transformation",
          "ui",
          "deployment",
        ],
    },
  ]
---

Uygulama kısaca iki farklı sunucu arasında farklı periyotlarda gerçekleşen veri akışını sağlıyor. Sunucu, veri akışında oluşabilecek aksaklıkları yönetebilecek çeşitli önlem ve yeteneklere sahip. Uygulama farklı cihazların takip için eklenebilmesi ve mevcut cihazların gözlemlenebilmesi için bir arayüz de sunuyor.

Uygulama, birbirinden bağımsız kendi kimlik doğrulama (authentication) mekanizmaları olan kaynak ve hedef sunuculara bağlı. İki sunucuya da farklı periyotlarla giriş yapılarak authentication sürekliliği sağlanıyor. Verilerin yüklenme ve alınma periyotları farklı olduğu için veriler 5 dakikada bir kaynak sunucudan alınarak bir saat boyunca tutuluyor.

![App Schema](/images/etl-app-schema.png)

Bir saatin sonunda toplanan veriler, ortalamaları alınarak hedef sunucuya gönderiliyor. Gönderimde herhangi bir sorun çıkması durumunda ise işlem tekrar deneniyor. Gün sonunda hedef sunucudan eksik verilerin zaman aralığı talep ediliyor. Bu zaman aralıkları arasındaki veriler kaynak sunucudan alınarak hedef sunucuya gönderiliyor. Bu sayede tüm veriler gün içerisinde eksiksiz şekilde iletilmiş oluyor.

Geçmiş verilerin senkronize edilmesi işlemi aynı zamanda arayüz üzerinden de tetiklenebiliyor. Tüm bu işlemler her cihaz için ayrı olarak yapılmakta. Bu yüzden senkronizasyon işlemi özellikle günlerce süren sorunlarda gönderilmesi gereken veriler biriktiği için uzun sürebiliyor.

Hedef sunucu dokümantasyonundaki eksiklikler ve süreç içindeki kısıtlamalara rağmen, esnek bir mimari kurarak tüm senaryoları başarıyla yönetebilen stabil bir yapı ortaya çıkarıldı.

