import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Ana Sayfa",
  type: "document",
  groups: [
    { name: "hero", title: "1. Hero (Arama & Banner)" },
    { name: "featured", title: "2. Öne Çıkanlar (İlanlar, Bölgeler, Hizmetler)" },
    { name: "about", title: "3. Kurumsal (Hakkımızda & İstatistikler)" },
    { name: "blog", title: "4. Blog Bölümü" },
    { name: "cta", title: "5. İletişim (Sayfa Sonu)" },
    { name: "seo", title: "6. SEO Ayarları" },
  ],
  fields: [
    // --- HERO ---
    defineField({ name: "heroTitle", title: "Hero Başlık", type: "text", rows: 2, group: "hero", validation: (Rule) => Rule.required(), description: "Ana sayfaya girildiğinde ziyaretçiyi karşılayan dev başlık." }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık", type: "text", rows: 3, group: "hero", description: "Ana başlığın altında yer alan, arama motorlarını ve kullanıcıyı bilgilendiren kısa açıklama metni." }),
    defineField({
      name: "heroImage",
      title: "Hero Görseli (Arka Plan)",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description: "Ana sayfa en üst bölümünün (arama barının arkası) tam ekran arka plan görseli.",
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    defineField({
      name: "quickFilters",
      title: "Hızlı Filtreler (Öneriler)",
      type: "array",
      group: "hero",
      description: "Arama barının hemen altında çıkan küçük, hızlı arama/yönlendirme butonları (Örn: 'Satılık Daire — Kadıköy').",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Butonda Görünecek Metin", type: "string", description: "Örn: Daire — Kadıköy" }),
            defineField({ name: "tip", title: "İlan Tipi", type: "string", options: { list: ["satilik", "kiralik"] } }),
            defineField({ name: "tur", title: "Mülk Türü", type: "string", description: "Daire, Villa, İş Yeri vb. gibi seçilmek istenen değer." }),
            defineField({ name: "ilce", title: "İlçe", type: "string", description: "Filtrelenecek ilçe adı." }),
          ]
        }
      ]
    }),

    // --- FEATURED LISTINGS ---
    defineField({ name: "featuredListingsTitle", title: "Öne Çıkan İlanlar - Başlık", type: "string", group: "featured", description: "Örn: Güncel Fırsatlar veya En Çok İncelenenler" }),
    defineField({ name: "featuredListingsSubtitle", title: "Öne Çıkan İlanlar - Alt Başlık", type: "string", group: "featured", description: "Örn: Portföyümüz" }),
    defineField({
      name: "featuredListings",
      title: "Seçili İlanlar",
      type: "array",
      group: "featured",
      of: [{ type: "reference", to: [{ type: "listing" }] }],
      description: "Ana sayfada vitrine çıkacak olan ilanları seçin. Sırasını sürükleyerek değiştirebilirsiniz (En fazla 6 önerilir).",
      validation: (Rule) => Rule.max(6),
    }),

    // --- FEATURED REGIONS ---
    defineField({ name: "featuredRegionsTitle", title: "Popüler Bölgeler - Başlık", type: "string", group: "featured", description: "Örn: Popüler Bölgeler veya Çalışma Alanlarımız" }),
    defineField({ name: "featuredRegionsSubtitle", title: "Popüler Bölgeler - Alt Başlık", type: "string", group: "featured", description: "Örn: İstanbul'da" }),
    defineField({
      name: "featuredRegions",
      title: "Seçili Bölgeler",
      type: "array",
      group: "featured",
      of: [{ type: "reference", to: [{ type: "region" }] }],
      description: "Ana sayfada kutu halinde (resimleriyle) gösterilecek ilçeleri/bölgeleri seçin.",
    }),

    // --- FEATURED SERVICES ---
    defineField({ name: "featuredServicesTitle", title: "Hizmetler - Başlık", type: "string", group: "featured", description: "Örn: Size Neler Sunuyoruz?" }),
    defineField({ name: "featuredServicesSubtitle", title: "Hizmetler - Alt Başlık", type: "string", group: "featured", description: "Örn: Hizmetlerimiz" }),
    defineField({
      name: "featuredServices",
      title: "Seçili Hizmetler",
      type: "array",
      group: "featured",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      description: "Ana sayfada kartlar halinde listelenecek hizmet sayfalarını seçin.",
    }),

    // --- STATS ---
    defineField({ name: "statsTitle", title: "İstatistikler - Başlık", type: "string", group: "about", description: "Örn: Sayılarla SED Emlak" }),
    defineField({ name: "statsSubtitle", title: "İstatistikler - Alt Başlık", type: "string", group: "about", description: "Örn: Güven ve Tecrübe" }),
    defineField({
      name: "stats",
      title: "İstatistik Kartları",
      type: "array",
      group: "about",
      description: "Ana sayfadaki hareketli sayaçlar. (Örn: 500+ Mutlu Müşteri)",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Değer (Rakam)", type: "string", description: "Sadece rakam veya sembol. Örn: 20+, 500+, 15K" }),
            defineField({ name: "label", title: "Açıklama (Metin)", type: "string", description: "Örn: Yıllık Tecrübe, İşlem, Ofis Sayısı" }),
          ]
        }
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // --- ABOUT ---
    defineField({ name: "aboutTitle", title: "Hakkımızda - Başlık", type: "string", group: "about", description: "Örn: Güvenilir Emlak Danışmanınız" }),
    defineField({ name: "aboutSubtitle", title: "Hakkımızda - Alt Başlık", type: "string", group: "about", description: "Örn: Biz Kimiz?" }),
    defineField({
      name: "aboutText",
      title: "Hakkımızda Kısa Metni",
      type: "text",
      group: "about",
      rows: 4,
      description: "Ana sayfadaki Hakkımızda bölümünde görünecek kısa paragraf.",
    }),
    defineField({
      name: "aboutPoints",
      title: "Hakkımızda Madde İmleri (Özellikler)",
      type: "array",
      group: "about",
      of: [{ type: "string" }],
      description: "Metnin altında veya yanında tik işaretiyle alt alta dizilecek kısa özellik maddeleri (Örn: 20 yılı aşkın deneyim, Şeffaf süreç).",
    }),
    defineField({
      name: "aboutImage",
      title: "Hakkımızda Görseli",
      type: "image",
      group: "about",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),

    // --- BLOG ---
    defineField({ name: "blogTitle", title: "Blog - Başlık", type: "string", group: "blog", description: "Örn: Sektörden Güncel Haberler" }),
    defineField({ name: "blogSubtitle", title: "Blog - Alt Başlık", type: "string", group: "blog", description: "Örn: Blog & Haberler" }),
    defineField({
      name: "featuredPosts",
      title: "Seçili Blog Yazıları",
      type: "array",
      group: "blog",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
      description: "Ana sayfada listelenecek öne çıkan blog yazılarını seçin (Önerilen: Son 3 yazı).",
      validation: (Rule) => Rule.max(3),
    }),

    // --- CTA (CONTACT BAR) ---
    defineField({ name: "ctaTitle", title: "İletişim Bölümü (Sayfa Sonu) - Başlık", type: "string", group: "cta", description: "Ana sayfanın en altındaki büyük form/iletişim kutusunun başlığı. Örn: Bizimle İletişime Geçin" }),
    defineField({ name: "ctaText", title: "İletişim Bölümü - Açıklama Metni", type: "text", rows: 2, group: "cta", description: "Örn: Gayrimenkul süreçlerinizde uzman desteği için formu doldurun..." }),

    // --- SEO ---
    defineField({ name: "seo", title: "Ana Sayfa SEO Ayarları", type: "seo", group: "seo" }),
  ],
});
