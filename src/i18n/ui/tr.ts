import type { UIKeys } from "./en";

// Turkish translations. Keys must match en.ts exactly; a missing key is a build-time type error.
// The site's brand voice uses lowercase headings — kept here too.
export const tr: Record<UIKeys, string> = {
  // Navigation
  "nav.projects": "projeler",
  "nav.experiences": "deneyimler",
  "nav.skills": "yetenekler",
  "nav.home": "Ana Sayfa",

  // Accessibility labels
  "a11y.toggleTheme": "Temayı değiştir",
  "a11y.toggleLanguage": "Switch to English",

  // Base meta
  "base.defaultDescription": "Emre Can Çorapçı'nın kişisel web sitesi",

  // Home
  "home.pageTitle": "Ana Sayfa - Emre Can Çorapçı",
  "hero.badge": "full stack yazılım geliştirici",
  "hero.title": "kaynak kodunu ben okurum, sen zahmet etme",
  "hero.seeWork": "işlerime bak",
  "hero.getInTouch": "bana ulaş",

  // About me
  "about.heading": "hakkımda",
  "about.introductionHeading": "tanıtım",
  "about.p1":
    "Merhaba! Ben Emre, esas olarak web odaklı ama masaüstü uygulamaları ve sistem programlama alanında da deneyimi olan meraklı bir yazılım geliştiriciyim.",
  "about.p2":
    "Sadece endpoint yazmıyorum. Projeleri sıfırdan üretime kadar taşıdım; bu yolculukta UI/UX, veritabanı tasarımı, mimari, güvenlik ve performansla da ilgilendim. Yeterince zaman verildiğinde her şeyi yapabilecek kadar kendimden emin olduğuma inanıyorum.",
  "about.p3":
    'Hoşuma giden şeyleri kurcalamayı ve merakım dinlene kadar "neden" diye sormayı severim. Kuralları esnetmek, varsayımları sorgulamak, daha iyisi var diye eski yöntemleri reddetmek.',
  "about.illustrationCredit": "Kız kardeşim Nisa yaptı",
  "about.interestsHeading": "ilgi alanları ve hobiler",
  "about.interests.s1": "Gojira, Parcels ve Angine de Poitrine *dinlerim*, ",
  "about.interests.s2": "Asimov, Rollo May ve Slavoj Žižek *okurum*, ",
  "about.interests.s3": "Hades, Disco Elysium ve Baldur's Gate 3 *oynarım*, ",
  "about.interests.s4": "gizlilik, açık kaynak ve teknoloji hakkında *düşünürüm*, ",
  "about.interests.s5":
    "Bisikletimi *sürmeyi*, kedi fotoğrafları *çekmeyi*, elektro gitarımı *çalmayı* ve her şeyi Linux'ta *çalıştırmayı* severim.",
  "about.alt.cat":
    "Kitap yığınının üstünde oturan, kameraya bakan ve bir patisini öne uzatan siyah bir kedi",
  "about.alt.bicycle":
    "Nehir kenarına park edilmiş koyu mavi bir bisiklet, yanından geçen alçak bir beton duvar ve arka planda yoğun bir orman",
  "about.alt.concert":
    "Mor ışık altında, sis dolu bir konserde karşılıklı durmuş gitar çalan YinYin grubunun iki üyesi",
  "about.alt.cat2": "Dili dışarıda bir kedi",
  "about.alt.me": "Bu sitenin sahibi Emre Can'ın bir fotoğrafı",
  "about.alt.illustration": "Emre Can'ın Ghibli tarzında bir illüstrasyonu",

  // Featured sections
  "featured.projectsHeading": "öne çıkan projeler",
  "featured.experiencesHeading": "öne çıkan deneyimler",
  "featured.viewMore": "Daha Fazlası",
  "featured.viewProject": "Projeye bak",

  // Projects
  "projects.pageTitle": "Projeler - Emre Can Çorapçı",
  "projects.heading": "Projeler",
  "projects.description":
    "Zorlu ama aynı zamanda eğlenceli projelerde çalışmayı severim. Yeteneklerimi geliştirmenin ve yeni şeyler öğrenmenin yollarını hep ararım. Kimisi deneme, kimisi freelance iş, biri crates.io'ya kadar gitti. Şeyleri daha iyi anlamak ve onlardan öğrenmek için yapıyorum.",
  "single.pageTitle": "Proje: {title} - Emre Can Çorapçı",
  "single.summary": "Özet",
  "single.labelProject": "[PROJE]",
  "single.labelYear": "[YIL]",
  "single.labelType": "[TÜR]",
  "single.labelStatus": "[DURUM]",
  "single.featuredHeading": "Öne Çıkan Projeler",
  "single.viewProject": "Projeyi Gör",
  "project.status.ongoing": "Devam Ediyor",
  "project.status.completed": "Tamamlandı",
  "project.status.prototype-completed": "Prototip Tamamlandı",
  "project.status.archived": "Arşivlendi",

  // Experiences
  "experiences.pageTitle": "Deneyimler - Emre Can Çorapçı",
  "experiences.heading": "Deneyimler",
  "experiences.description":
    "Freelance ve tam zamanlı rollerde çalıştım; projeleri ilk tasarımından üretim dağıtımına kadar taşıdım. İşlerim genelde sıfırdan backend sistemleri ve altyapı kurmak, mevcut olanların performansını ve güvenilirliğini iyileştirmek ve gerektiğinde frontend'e uzanmak etrafında döner. Bir projeyi uçtan uca sahiplenme — mimari, implementasyon, test ve dağıtım — konusunda rahatım.",
  "experience.contract.Full-Time": "Tam Zamanlı",
  "experience.contract.Part-Time": "Yarı Zamanlı",
  "experience.contract.Freelance (Part-Time)": "Serbest (Yarı Zamanlı)",
  "experience.contract.Freelance (Full-Time)": "Serbest (Tam Zamanlı)",
  "experience.contract.Contract (Part-Time)": "Sözleşmeli (Yarı Zamanlı)",
  "experience.contract.Contract (Full-Time)": "Sözleşmeli (Tam Zamanlı)",
  "experience.contract.Internship": "Staj",

  // Skills
  "skills.pageTitle": "Yetenekler - Emre Can Çorapçı",
  "skills.heading": "Yetenekler",
  "skills.description":
    "Performans odaklı web sistemlerine odaklanmış, esas olarak TypeScript ve Rust kullanan bir backend geliştiriciyim. Backend'de .NET, Express ve Fastify; frontend'de React ve Astro dahil çeşitli framework ve kütüphane kullandım. C#, C++ ve Python'a da aşinayım.",
  "skill.proficiency.1": "Aşina",
  "skill.proficiency.2": "Rahat",
  "skill.proficiency.3": "Yetkin",
  "skill.proficiency.4": "İleri",
  "skill.proficiency.5": "Uzman",

  // Footer
  "footer.tagline":
    "full-stack yazılım geliştirici | açık kaynak katkıcısı | bu arada arch kullanıyorum",
  "footer.portfolioTitle": "Portföy",
  "footer.featuredTitle": "Öne Çıkan Projeler",
  "footer.projects": "Projeler",
  "footer.experiences": "Deneyimler",
  "footer.skills": "Yetenekler",
  "footer.copyright": "© Telif Hakkı {year}. Tüm Hakları Saklıdır.",
  "footer.linkedInLabel": "Emre Can Çorapçı'nın LinkedIn Profili",
  "footer.githubLabel": "Emre Can Çorapçı'nın GitHub Profili",
  "footer.emailLabel": "Emre Can Çorapçı'nın E-postası",
  "footer.cvLabel": "Emre Can Çorapçı'nın CV'si",

  // 404 — "haatalarımı" typo is intentional, TR counterpart of EN's "msitakes"
  "notFound.pageTitle": "404 - Emre Can Çorapçı",
  "notFound.heading": "Kaybolmuş Olabilir misin???",
  "notFound.line1": "Böyle bir sayfa bulamadım ama sorun değil.",
  "notFound.line2": "Merak etme, *en iyiler bile hata yapar.*",
  "notFound.line3Prefix": "Bunun benim hatalarımdan biri olduğunu düşünüyorsan ",
  "notFound.line3Link": "github repomda",
  "notFound.line3Suffix": " rahatça şikayet edebilirsin.",
  "notFound.line4Prefix": "Lütfen yap! İnsanların ",
  "notFound.line4Strong": "haatalarımı yüzüme söylemelerini",
  "notFound.line4Suffix": " çok severim.",
  "notFound.line5": "Benim değilse, tamam affettik.",
  "notFound.line6":
    "Yukarıdaki menüyü kullanarak bu tamamen el yapımı sitede muhteşem sörf deneyimine kaldığın yerden devam edebilirsin.",
};
