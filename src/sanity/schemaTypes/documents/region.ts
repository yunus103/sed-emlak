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
      description: "Önerilen boyut: Ana sayfa kartları için 1200x525px (16:7), detay sayfası hero bölümü için 1920x800px (geniş format) tercih edilmelidir.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    defineField({
      name: "description",
      title: "Bölge Tanıtım Metni",
      type: "array",
      of: [{ type: "block" }],
      description: "SEO ve tasarım dengesi için 150-250 kelime arası (2-3 kısa paragraf) idealdir. İlçe adı, ulaşım imkanları ve emlak piyasası gibi anahtar kelimeleri içermesi önerilir.",
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
    defineField({
      name: "nearbyRegions",
      title: "Yakın Bölgeler",
      type: "array",
      of: [{ type: "reference", to: [{ type: "region" }] }],
      description: "Bölge detay sayfasında cross-link için komşu/ilgili ilçeler (maks. 6 adet önerilir)",
      validation: (Rule) => Rule.max(6),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
