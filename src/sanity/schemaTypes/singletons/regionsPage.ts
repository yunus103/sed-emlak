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
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
