import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Ana Sayfa",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Bölümü" },
    { name: "featured", title: "Öne Çıkanlar" },
    { name: "about", title: "Hakkımızda & İstatistikler" },
    { name: "seo", title: "SEO Ayarları" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Hero Başlık", type: "string", group: "hero", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık", type: "text", rows: 3, group: "hero" }),
    defineField({
      name: "heroImage",
      title: "Hero Görseli",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
    }),
    defineField({ name: "heroCtaLabel", title: "Hero Buton Metni", type: "string", group: "hero" }),
    defineField({
      name: "heroCtaLink",
      title: "Hero Buton Linki",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "linkType",
          title: "Link Tipi",
          type: "string",
          options: {
            list: [
              { title: "İç Sayfa (Önerilen)", value: "internal" },
              { title: "Manuel Link", value: "manual" },
            ],
            layout: "radio",
          },
          initialValue: "internal",
        }),
        defineField({
          name: "internal",
          title: "İç Sayfa Seç",
          type: "reference",
          to: [
            { type: "service" },
            { type: "listing" },
            { type: "region" },
            { type: "blogPost" },
            { type: "aboutPage" },
            { type: "contactPage" },
            { type: "legalPage" },
            { type: "listingsPage" },
            { type: "regionsPage" },
          ],
          hidden: ({ parent }) => parent?.linkType !== "internal",
        }),
        defineField({
          name: "manual",
          title: "Manuel Link",
          type: "string",
          description: "Örn: /blog, /iletisim veya https://google.com (Link başındaki / işaretini unutmayın)",
          hidden: ({ parent }) => parent?.linkType !== "manual",
        }),
      ],
    }),
    defineField({
      name: "quickFilters",
      title: "Hızlı Filtreler (Öneriler)",
      type: "array",
      group: "hero",
      description: "Arama barının altında çıkacak hızlı arama butonları.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Görünecek Metin", type: "string", description: "Örn: Daire — Kadıköy" }),
            defineField({ name: "tip", title: "İlan Tipi", type: "string", options: { list: ["satilik", "kiralik"] } }),
            defineField({ name: "tur", title: "Mülk Türü", type: "string", description: "Örn: daire, villa, is-yeri" }),
            defineField({ name: "ilce", title: "İlçe", type: "string", description: "Örn: Kadıköy, Beşiktaş" }),
          ]
        }
      ]
    }),
    defineField({
      name: "featuredListings",
      title: "Öne Çıkan İlanlar",
      type: "array",
      group: "featured",
      of: [{ type: "reference", to: [{ type: "listing" }] }],
      description: "Ana sayfada gösterilecek güncel/öne çıkan ilanları seçin. Sırasını sürükleyerek değiştirebilirsiniz.",
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "featuredRegions",
      title: "Öne Çıkan Bölgeler",
      type: "array",
      group: "featured",
      of: [{ type: "reference", to: [{ type: "region" }] }],
      description: "Ana sayfada gösterilecek bölgeleri (ilçeleri) seçin.",
    }),
    defineField({
      name: "featuredServices",
      title: "Öne Çıkan Hizmetler",
      type: "array",
      group: "featured",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      description: "Ana sayfada kartlar halinde listelenecek hizmetleri seçin.",
    }),
    defineField({
      name: "featuredPosts",
      title: "Öne Çıkan Blog Yazıları",
      type: "array",
      group: "featured",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
      description: "Ana sayfada gösterilecek blog yazıları (en fazla 3).",
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "stats",
      title: "Sayılarla Biz (İstatistikler)",
      type: "array",
      group: "about",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Değer", type: "string", description: "Örn: 20+, 500+, 15K" }),
            defineField({ name: "label", title: "Açıklama", type: "string", description: "Örn: Yıllık Tecrübe, İşlem" }),
          ]
        }
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "aboutText",
      title: "Hakkımızda Kısa Tanıtım",
      type: "text",
      group: "about",
      rows: 4,
      description: "Ana sayfadaki Hakkımızda bölümünde görünecek kısa paragraf.",
    }),
    defineField({
      name: "aboutImage",
      title: "Hakkımızda Görseli",
      type: "image",
      group: "about",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
