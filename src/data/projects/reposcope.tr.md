---
featured: true
title: "Reposcope"
description: "Tüm yerel depoların git durumunu, bağımlılık tazeliğini ve sağlık bulgularını tek canlı ekranda toplayan, dosya sistemi olaylarıyla güncellenen masaüstü uygulaması ve CLI."
projectType: oss
year: 2026
status: "ongoing"
version: "0.1.0"
mainTags: ["rust", "tauri", "desktop"]
blocks:
  [
    {
      title: "Temel Yetenekler",
      type: "list",
      onTop: true,
      content:
        [
          "Tüm repolar için canlı git durumu, polling yerine dosya sistemi eventleriyle güncellenir",
          "Git işlemleri tek yerde: pull, push, sync, branch değiştirme",
          "Manifest dosyalarından doğrudan okunan bağımlılık güncelleme (npm, Cargo)",
          "Sağlık bulguları (hijyen, sızan secret'lar, güvenlik uyarıları) info, warning ve error seviyelerinde",
          "Renkli etiketler, katmanlı notlar ve proje klasörü yeniden yapılandırabilme",
          "Ortam kontrolleri: kurulu runtime'lar ile projelerin sabitlediği sürümlerin karşılaştırması",
          "Hem masaüstü uygulaması hem de CLI'ın paylaştığı Rust çekirdeği",
        ],
    },
    {
      title: "Teknoloji Yığını",
      type: "records",
      onTop: false,
      content:
        [
          ["Uygulama çekirdeği", "Tauri 2 (Rust backend + system webview)"],
          ["Frontend", "React + TypeScript + Tailwind CSS v4 + shadcn/ui"],
          ["Domain mantığı", "crates/core (Tauri bağımlılığı sıfır, CLI ile paylaşımlı)"],
          ["Yerel veritabani", "SQLite (rusqlite)"],
        ],
    },
    {
      title: "Etiketler",
      type: "tags",
      onTop: false,
      content:
        [
          "rust",
          "tauri",
          "desktop-app",
          "event-driven",
          "filesystem-watching",
          "git",
          "sqlite",
          "cli",
          "developer-tools",
        ],
    },
  ]
---

Bir sürü yerel proje ile uğraşıyorum ve rutin hep aynıydı: klasörü aç, `git status` çalıştır, lockfile'a göz at, o `.env` bir ara commit edilmiş mi diye düşün, sıradaki klasöre geç, başa dön. Döngünün zor bir yanı yok, ama günde on kez, yirmi klasörde tekrarlanıyor. Reposcope, tek bir soruyu tek bir ekranda yanıtlayan bir şey istememden doğdu: **hangi projem şu an ilgi bekliyor?**

Kabuk için Electron yerine Tauri 2'yi seçtim. Panel sürekli çalışan bir masaüstü uygulaması olduğu için binary boyutu ve bellek kullanımı önemli, sistem webview sayesinde de her kullanıcıya ayrı bir tarayıcı sevk etmek yerine arayüz yerel hissettiriyor. Daha ilginç karar ise `crates/core`'da: tüm alan mantığı (tarama, git, bağımlılıklar, sağlık, etiketler, notlar, izleme, depolama) sıfır Tauri bağımlılığıyla bu crate'te duruyor. Masaüstü uygulaması bu crate'in üstüne kurulmuş ön yüzlerden biri, CLI (`po`) ise ikincisi. İki arayüz tek bir paylaşılan uygulama üzerinde koşuyor, dolayısıyla hiçbir git veya bağımlılık mantığı kopyalanmıyor.

Uzlaşmayı reddettiğim tek ilke var: **uygulama git durumunu asla polling ile sorgulamaz.** Zamanlayıcıyla çalışan bir panel size her zaman geçmişi gösterir. Bunun yerine debouncing'li bir dosya sistemi izleyicisi (`notify` crate) diskte bir şey değişir değişmez yakalar. İlgili depolar yenilenir ve backend, UI'ın abone olduğu Tauri olaylarını gönderir:

```
dosya sistemi olayı → debounce → yenileme → Tauri olayı → UI
```

UI da backend'i polling ile sorgulamıyor, aynı kural uçtan uca geçerli. 100 depoluk benchmark'ta durum okumaları repo başına yaklaşık 0,37 ms'ye düşüyor, çünkü panel zamanlayıcıyla her şeyi yeniden okumak yerine yalnızca değişeni okuyor.

Bağımlılık kontrolü, manifest dosyalarını (`package.json`, `Cargo.toml`) her ekosistem için bir trait'in arkasında doğrudan okuyor. Bu ayrım bilinçli: parse işlemi çevrimdışı kalıyor, tazelik kontrolü ise opt-in oluyor:

```rust
pub trait ManifestAdapter {
    fn ecosystem(&self) -> &'static str;
    fn detect(&self, repo_root: &Path) -> bool;
    fn parse_manifest(&self, repo_root: &Path) -> Result<Option<ManifestInfo>>;
}
```

Bu trait, en gurur duyduğum bölüme dönüştü: proje sağlık modeli. Her kontrol info, warning ve error olmak üzere üç şiddet seviyesinde bulgular üretiyor ve bunlar depo başına rozetlere dönüşüyor. Hijyen tamamen çevrimdışı çalışıyor: `.gitignore` gerçekten `.env` varyantlarını kapsıyor mu? Bir env dosyası _şu anda takip ediliyor mu_? README ve LICENSE mevcut mu? Daha derin bir geçmiş taraması, `.env` tarzı bir dosyanın hiç commit edilip edilmediğine ve commit edilen içeriğin gerçek `KEY=value` atamaları içerip içermediğine bakıyor, çünkü sızan bir kimlik bilgisi yalnızca geçmiş temizleme ipucu değil, rotasyon önerisi gerektiriyor. Güvenlik uyarıları kurulu sürümleri OSV ile eşleştiriyor. Bu kontrol opt-in ve açıkça etiketli, çünkü ağa çıkan tek kontrol o.

Git tarafında hibrit bir çözüme vardım: yerel okumalar için `git2` (durum, branch'ler, ahead/behind), ağ işlemleri için sistem `git` (fetch, pull, push). Kullanıcının mevcut SSH yapılandırması ve credential helper'ları çalışmaya devam ediyor. En zor kısım zaten budur. Yerel okumalar da subprocess spam'i olmadan hızlı kalıyor.
