---
featured: true
title: "Mezuniyet Projesi"
description: "Arduino düğümleri arasında sensör verilerini iletmek için Görünür Işık İletişimi kullanan, gerçek zamanlı izleme için React tabanlı web paneli olan bir sera izleme ve kontrol sistemi."
projectType: freelance
year: 2022
status: "completed"
mainTags: ["cpp", "typescript", "arduino", "web"]
blocks:
  [
    {
      title: "Hakkında",
      type: "records",
      content:
        [
          ["Yıl", "2022-2023"],
          ["Proje Türü", "Okul Projesi"],
          ["Durum", "Tamamlandı"],
          ["Rolüm", "Yazılım Geliştirici"],
        ],
    },
    {
      title: "Teknolojiler",
      type: "tags",
      content:
        [
          "cpp",
          "typescript",
          "arduino",
          "web",
          "react",
          "tailwindcss",
          "rechart-js",
          "drizzle-orm",
          "postgresql",
          "serialport-js",
        ],
    },
    {
      title: "Özellikler",
      type: "tags",
      content:
        [
          "backend",
          "frontend",
          "visible-light-communication",
          "serial-communication",
          "data-visualization",
          "data-analysis",
          "ui",
          "database",
        ],
    },
  ]
---

## Genel Bakış

Bu sistem, Arduino tabanlı sensör düğümleriyle bir seradan ortam verilerini toplar ve ışık sinyalleriyle (VLC) bir alıcı düğüme gönderir. Veriler buradan yerel bir sunucu üzerinden backend API'ye gider. API, veriyi saklayıp gerçek zamanlı web paneline sunar. Operatörler sera koşullarını izleyebilir ve aktüatörleri (fanlar, ışıklar, su pompası) web arayüzünden kontrol edebilir.

## Mimari

```
[Verici (Arduino)]
        │
        │  Görünür Işık İletişimi
        ▼
[Alıcı (Arduino)]
        │
        │  Seri İletişim
        ▼
[Yerel Sunucu (Node.js)]
        │
        │  HTTP / WebSocket
        ▼
[Backend Sunucu (Node.js + PostgreSQL)]
        │
        │  REST API
        ▼
[Ön Yüz Paneli (React + TypeScript)]
```

## Modüller

| Modül            | Açıklama                                                    | Teknoloji                         |
| ---------------- | ----------------------------------------------------------- | --------------------------------- |
| `transmitter`    | Sensör verilerini okur ve ışık sinyallerine kodlar          | Arduino / C++                     |
| `receiver`       | Gelen ışık sinyallerini çözer ve veriyi seri porttan iletir | Arduino / C++                     |
| `local-server`   | Seri port verisini backend sunucusuna köprüler              | Node.js / TypeScript              |
| `backend-server` | Sensör verilerini saklayan ve sunan REST API                | Node.js / TypeScript / PostgreSQL |
| `frontend`       | Gerçek zamanlı izleme ve kontrol için web paneli            | React / TypeScript / Tailwind CSS |

## Özellikler

- **Işık tabanlı iletişim**: sensör verileri Arduino düğümleri arasında modüle edilmiş ışık sinyalleriyle taşınır, donanım birimleri arasında RF veya Wi-Fi gerekmez
- **Gerçek zamanlı izleme**: canlı panel, güncel sera koşullarını gösterir
- **Çoklu sensör desteği**: sıcaklık, nem, ışık şiddeti ve toprak nemi takip edilir
- **Aktüatör kontrolü**: fanlar, büyütme lambaları ve su pompası web arayüzünden açılıp kapatılır
- **Kalıcı depolama**: geçmiş sensör verileri PostgreSQL'de tutulur

## Teknoloji Yığını

- **Donanım:** Arduino (C / C++)
- **İletişim:** Görünür Işık İletişimi (VLC), Seri port
- **Yerel Sunucu:** Node.js, TypeScript, SerialPort
- **Backend:** Node.js, Express, TypeScript, DrizzleORM, PostgreSQL
- **Frontend:** React, TypeScript, Vite, TailwindCSS, RechartJS
