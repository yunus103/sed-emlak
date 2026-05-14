import { defineField, defineType } from "sanity";
import { turkishSlugify } from "../../lib/slugify";

export const listingType = defineType({
  name: "listing",
  title: "İlan",
  type: "document",
  fields: [
    defineField({ name: "title", title: "İlan Başlığı", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ 
      name: "slug", 
      title: "Slug", 
      type: "slug", 
      options: { 
        source: "title",
        slugify: turkishSlugify
      }, 
      validation: (Rule) => Rule.required() 
    }),
    defineField({
      name: "status",
      title: "İlan Durumu",
      type: "string",
      options: {
        list: [
          { title: "Kiralık", value: "kiralik" },
          { title: "Satılık", value: "satilik" },
          { title: "Kiralandı", value: "kiralandi" },
          { title: "Satıldı", value: "satildi" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "propertyType",
      title: "Mülk Türü",
      type: "string",
      options: {
        list: ["Daire", "Villa", "Müstakil Ev", "Ofis", "Dükkan / Mağaza", "Arsa", "Bina"],
      },
    }),
    defineField({ name: "price", title: "Fiyat", type: "number", description: "TL cinsinden" }),
    defineField({
      name: "region",
      title: "Bölge / İlçe",
      type: "reference",
      to: [{ type: "region" }],
    }),
    defineField({ name: "neighborhood", title: "Mahalle", type: "string" }),
    defineField({
      name: "features",
      title: "Özellikler",
      type: "object",
      fields: [
        defineField({ name: "grossArea", title: "Brüt m²", type: "number" }),
        defineField({ name: "netArea", title: "Net m²", type: "number" }),
        defineField({ name: "rooms", title: "Oda Sayısı", type: "string", description: "Örn: 3+1" }),
        defineField({ name: "floor", title: "Bulunduğu Kat", type: "string" }),
        defineField({ name: "buildingAge", title: "Bina Yaşı", type: "string" }),
        defineField({ name: "heating", title: "Isıtma", type: "string" }),
        defineField({ name: "furnished", title: "Eşyalı mı?", type: "boolean" }),
        defineField({ name: "creditEligible", title: "Krediye Uygun mu?", type: "boolean" }),
        defineField({ name: "deedStatus", title: "Tapu Durumu", type: "string" }),
        defineField({ name: "dues", title: "Aidat (TL)", type: "number" }),
      ],
    }),
    defineField({
      name: "mainImage",
      title: "Kapak Görseli",
      type: "image",
      description: "İlan kartlarında ve detay sayfasında kapak olarak kullanılır. İdeal boyut: 1200x900 (4:3 oran).",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Fotoğraf Galerisi",
      type: "array",
      description: "İlan detay sayfası ve kartlardaki kaydırmalı (Swiper) galeri için fotoğraflar. İdeal boyut: 1200x900 (4:3 oran). En fazla 5 görsel kartta görünür, tamamı detayda görünür.",
      of: [{ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })] }],
    }),
    defineField({
      name: "description",
      title: "İlan Açıklaması",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "locationMap", title: "Harita Embed Kodu (Google Maps)", type: "text", rows: 3 }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  orderings: [{ title: "Tarih (Yeni→Eski)", name: "dateDesc", by: [{ field: "_createdAt", direction: "desc" }] }],
});
