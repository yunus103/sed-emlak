import { defineField, defineType } from "sanity";

export const listingsPageType = defineType({
  name: "listingsPage",
  title: "İlanlar Sayfası",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Sayfa Başlığı", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "description",
      title: "Kısa Açıklama",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
