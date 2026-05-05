import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "İletişim Sayfası",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "string", validation: (Rule) => Rule.required(), initialValue: "İletişim" }),
    defineField({ name: "pageSubtitle", title: "Giriş Metni", type: "text", rows: 3 }),
    defineField({
      name: "mainImage",
      title: "Arka Plan Görseli",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    defineField({ name: "formTitle", title: "Form Başlığı", type: "string", initialValue: "Bize Ulaşın" }),
    defineField({
      name: "successMessage",
      title: "Form Başarı Mesajı",
      type: "text",
      rows: 2,
      initialValue: "Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
