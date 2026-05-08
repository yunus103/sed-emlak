import { defineField, defineType } from "sanity";

export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Hizmetler Sayfası",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "string" }),
    defineField({ name: "pageSubtitle", title: "Alt Başlık / Kısa Yazı", type: "text", rows: 3 }),
    defineField({
      name: "mainImage",
      title: "Hero Arka Plan Görseli",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    defineField({ name: "ctaLabel", title: "CTA Buton Metni", type: "string", description: "Boş bırakılırsa CTA butonu gizlenir" }),
    defineField({ name: "ctaLink", title: "CTA Buton Linki", type: "string" }),
    defineField({ name: "sectionTitle", title: "Bölüm Üst Başlık", type: "string", initialValue: "Ne Yapıyoruz?" }),
    defineField({ name: "sectionHeading", title: "Bölüm Ana Başlık", type: "string", initialValue: "Uçtan Uca Gayrimenkul Hizmetleri" }),
    defineField({ name: "sectionDescription", title: "Bölüm Açıklama", type: "text", rows: 3, initialValue: "Alım, satım, kiralama veya yatırım — hangi ihtiyaçla gelirseniz gelin, uzman kadromuz yanınızda." }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
