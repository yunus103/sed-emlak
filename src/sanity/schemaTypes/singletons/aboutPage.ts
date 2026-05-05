import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Hakkımızda",
  type: "document",
  groups: [
    { name: "hero", title: "1. Hero Bölümü" },
    { name: "story", title: "2. Hikayemiz" },
    { name: "team", title: "3. Danışman Profili" },
    { name: "mission", title: "4. Misyon & Vizyon" },
    { name: "stats", title: "5. İstatistikler" },
    { name: "seo", title: "6. SEO" },
  ],
  fields: [
    // --- HERO ---
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "string", group: "hero", validation: (Rule) => Rule.required(), initialValue: "Hakkımızda" }),
    defineField({ name: "pageSubtitle", title: "Alt Başlık", type: "text", rows: 2, group: "hero" }),
    defineField({
      name: "mainImage",
      title: "Arka Plan Görseli",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),

    // --- STORY ---
    defineField({ name: "storyTitle", title: "Hikayemiz Başlık", type: "string", group: "story", initialValue: "Hikayemiz" }),
    defineField({
      name: "body",
      title: "Uzun Metin (İçerik)",
      type: "array",
      group: "story",
      of: [{ type: "block" }, { type: "image" }],
    }),

    // --- TEAM (ADVISOR) ---
    defineField({ name: "advisorName", title: "Danışman Adı", type: "string", group: "team", initialValue: "Ulaş Koyuncu" }),
    defineField({ name: "advisorTitle", title: "Ünvan", type: "string", group: "team", initialValue: "Gayrimenkul Uzmanı" }),
    defineField({ name: "advisorBio", title: "Kısa Biyografi", type: "text", rows: 4, group: "team" }),
    defineField({
      name: "advisorImage",
      title: "Danışman Fotoğrafı",
      type: "image",
      group: "team",
      options: { hotspot: true },
    }),

    // --- MISSION & VISION ---
    defineField({ name: "missionTitle", title: "Misyon Başlık", type: "string", group: "mission", initialValue: "Misyonumuz" }),
    defineField({ name: "missionText", title: "Misyon Metni", type: "text", rows: 4, group: "mission" }),
    defineField({ name: "visionTitle", title: "Vizyon Başlık", type: "string", group: "mission", initialValue: "Vizyonumuz" }),
    defineField({ name: "visionText", title: "Vizyon Metni", type: "text", rows: 4, group: "mission" }),

    // --- STATS ---
    defineField({
      name: "stats",
      title: "Sayılarla Biz (İstatistikler)",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Değer", type: "string", description: "Örn: 20+, 500+" }),
            defineField({ name: "label", title: "Açıklama", type: "string", description: "Örn: Yıllık Tecrübe, İşlem" }),
          ]
        }
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // --- SEO ---
    defineField({ name: "seo", title: "SEO Ayarları", type: "seo", group: "seo" }),
  ],
});
