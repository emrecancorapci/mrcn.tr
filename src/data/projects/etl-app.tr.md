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

Uygulama, iki farklı sunucu arasında farklı periyotlarda gerçekleşen veri akışını sağlıyor. Bu tür bir veri akışında baş gösteren aksaklıklara dayanacak şekilde tasarlandı. Cihaz takibi için yeni cihaz eklemeye ve mevcut cihazları izlemeye yarayan bir arayüzü de var.

Uygulama, birbirinden bağımsız kendi kimlik doğrulama (authentication) mekanizması olan kaynak ve hedef sunuculara bağlanıyor. İkisine de farklı aralıklarla giriş yapılarak oturumlar canlı tutuluyor. Verilerin alınma ve yüklenme periyotları farklı: kaynak sunucudan veriler 5 dakikada bir alınıyor ve bir saat boyunca tutuluyor.

![App Schema](/images/etl-app-schema.png)

Saatin sonunda toplanan veriler ortalanarak hedef sunucuya gönderiliyor. Gönderim başarısız olursa işlem kendiliğinden yeniden deneniyor. Gün sonunda hedef sunucu, verisi eksik olan aralıkları bildiriyor. Uygulama bu aralıkları kaynaktan yeniden alıp hedefe gönderiyor. Böylece tüm veriler gün içinde eksiksiz iletilmiş oluyor.

Geçmiş verilerin senkronizasyonu arayüzden elle de tetiklenebiliyor. Tüm bu işlemler her cihaz için ayrı yürüyor. Günlerce süren kesintilerin ardından, birikmiş veri nedeniyle senkronizasyon uzun sürebiliyor.

Hedef sunucunun kısıtları ve eksik dokümantasyonu vardı. Tasarımı esnek tuttum ve uygulama tüm uç senaryoları sorunsuz karşıladı.
