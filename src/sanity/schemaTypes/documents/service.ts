import { defineField, defineType } from "sanity";
import { turkishSlugify } from "../../lib/slugify";

export const serviceType = defineType({
  name: "service",
  title: "Hizmet",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Başlık", type: "string", validation: (Rule) => Rule.required() }),
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
      name: "shortDescription",
      title: "Kısa Açıklama",
      type: "text",
      rows: 2,
      description: "Hizmet grid kartında ve ana sayfada görünecek kısa açıklama (1-2 cümle, max 200 karakter önerilir).",
    }),
    defineField({
      name: "icon",
      title: "İkon",
      type: "string",
      description: "Hizmet kartında ve ana sayfada gösterilecek ikon. Listeden seçin.",
      options: {
        list: [
          { title: "🏠 Ev / Konut", value: "RiHomeHeartLine" },
          { title: "🔑 Anahtar / Kiralama", value: "RiKey2Line" },
          { title: "📊 Grafik / Yatırım Analizi", value: "RiBarChartBoxLine" },
          { title: "🏢 Bina / Ofis", value: "RiBuilding4Line" },
          { title: "⚖️ Hukuki / Tapu", value: "RiScales3Line" },
          { title: "🛡️ Kalkan / Ekspertiz", value: "RiShieldStarLine" },
          { title: "💼 Çanta / Ticari", value: "RiBriefcase4Line" },
          { title: "📰 Gazete / Sektör Haberleri", value: "RiNewspaperLine" },
          { title: "💡 Ampul / İpuçları", value: "RiLightbulbLine" },
          { title: "📍 Konum / Bölge", value: "RiMapPinLine" },
          { title: "🗺️ Harita / Rehber", value: "RiMapLine" },
          { title: "🏗️ İnşaat / Kentsel Dönüşüm", value: "RiHammerLine" },
          { title: "📋 Liste / Portföy Yönetimi", value: "RiFileList3Line" },
          { title: "🤝 El / Danışmanlık", value: "RiHandHeartLine" },
          { title: "🏙️ Şehir / Kent", value: "RiCommunityLine" },
          { title: "💰 Para / Değerleme", value: "RiMoneyDollarCircleLine" },
          { title: "🔍 Arama / Analiz", value: "RiSearchLine" },
          { title: "⭐ Yıldız / Premium", value: "RiStarLine" },
          { title: "🏪 Dükkan / Ticari Alan", value: "RiStore3Line" },
          { title: "📐 Cetvel / Mimari Tasarım", value: "RiRulerLine" },
        ]
      }
    }),
    defineField({
      name: "mainImage",
      title: "Ana Görsel",
      type: "image",
      description: "Önerilen boyut: 1200x800px (3:2 oranında). Yüksek çözünürlüklü ve yatay bir görsel tercih edilmelidir.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "alignment",
              title: "Hizalama",
              type: "string",
              options: { list: [{ title: "Sol", value: "left" }, { title: "Orta", value: "center" }, { title: "Sağ", value: "right" }, { title: "Tam Genişlik", value: "full" }] },
              initialValue: "center",
            }),
            defineField({
              name: "size",
              title: "Boyut",
              type: "string",
              options: { 
                list: [
                  { title: "Çok Küçük (%25)", value: "25" },
                  { title: "Küçük (%33)", value: "33" },
                  { title: "Orta (%50)", value: "50" },
                  { title: "Geniş (%75)", value: "75" },
                  { title: "Tam Genişlik (%100)", value: "100" }
                ] 
              },
              initialValue: "100",
            }),
          ],
        },
        { type: "customHtml" },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
