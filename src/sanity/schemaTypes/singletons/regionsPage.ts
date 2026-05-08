import { defineField, defineType } from "sanity";

export const regionsPageType = defineType({
  name: "regionsPage",
  title: "Bölgeler Sayfası",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Sayfa Başlığı", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "description",
      title: "Kısa Açıklama",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      title: "Hero Arka Plan Görseli",
      type: "image",
      description: "PageHero arka plan görseli. Önerilen boyut: 1920x600px (geniş format).",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    defineField({
      name: "featuredRegions",
      title: "Öne Çıkan Bölgeler (Sıralama)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "region" }] }],
      description: "Bölge hub sayfasında gösterilecek ilçeleri ve sırasını belirleyin. Boş bırakılırsa tüm bölgeler alfabetik sırayla gösterilir.",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
