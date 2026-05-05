import { defineField, defineType } from "sanity";

export const regionType = defineType({
  name: "region",
  title: "Bölge",
  type: "document",
  fields: [
    defineField({ name: "title", title: "İlçe Adı", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({
      name: "heroImage",
      title: "Hero Görseli",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    defineField({
      name: "description",
      title: "Bölge Tanıtım Metni",
      type: "array",
      of: [{ type: "block" }],
      description: "SEO odaklı (ulaşım, kentsel dönüşüm, mahalleler) açıklama metni",
    }),
    defineField({
      name: "metrics",
      title: "Bölge Metrikleri",
      type: "object",
      fields: [
        defineField({ name: "activeListings", title: "Aktif İlan Sayısı", type: "number" }),
        defineField({ name: "avgSalePrice", title: "Ortalama Satış Fiyatı", type: "string" }),
        defineField({ name: "avgRentPrice", title: "Ortalama Kira", type: "string" }),
      ],
    }),
    defineField({ name: "mapEmbed", title: "Harita Embed Kodu (Google Maps)", type: "text", rows: 3 }),
    defineField({
      name: "neighborhoods",
      title: "Mahalleler",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
