# SED Emlak — Tam Site Yapısı

---

## Route Haritası

```
/                           Ana Sayfa
/ilanlar                    Tüm İlanlar
/ilanlar/kiralik            Kiralık İlanlar
/ilanlar/satilik            Satılık İlanlar
/ilanlar/[slug]             İlan Detay
/bolgeler                   Bölgeler Hub
/bolgeler/[ilce]            İlçe Detay
/hakkimizda                 Hakkımızda
/hizmetler                  Hizmetler
/hizmetler/[slug]           Hizmet Detay
/blog                       Blog Listesi
/blog/[slug]                Blog Yazısı
/iletisim                   İletişim
```

---

## Sayfa Sayfa İçerik & Bağlantılar

---

### `/` — Ana Sayfa

**Schema:** `LocalBusiness`, `RealEstateAgent`

**Sectionlar:**

1. **Hero** — Tam ekran görsel/video. Ortada başlık + arama barı. Bar'da: ilan tipi (Kiralık/Satılık), mülk türü, ilçe, oda sayısı, Ara butonu. → `/ilanlar?tip=...&tur=...&ilce=...`
2. **Son İlanlar** — 6 ilan kartı, "Tüm İlanlar" → `/ilanlar`
3. **Bölgelerimiz** — İlçe grid'i, her kart ilan sayısı gösterir → `/bolgeler/[ilce]`
4. **Sayılarla Biz** — 20+ yıl, X ilan, Y tamamlanan işlem (animasyonlu sayaçlar)
5. **Hakkımızda özeti** — 2 paragraf + Ulaş Koyuncu fotoğrafı → `/hakkimizda`
6. **Hizmetler** — 6 ikonlu kart → `/hizmetler`
7. **Son Blog Yazıları** — 3 kart → `/blog`
8. **İletişim Barı** — Telefon, WhatsApp, adres, çalışma saatleri

---

### `/ilanlar` — Tüm İlanlar

**Schema:** `ItemList`

**Sectionlar:**

1. **Filtre Paneli** (üstte veya solda) — İlan tipi, mülk türü, ilçe, mahalle, fiyat aralığı (slider), m² aralığı, oda sayısı, "Satıldı/Kiracı bulundu" gizle toggle. URL parametreli çalışır, linkler paylaşılabilir.
2. **Sonuç Sayısı + Sıralama** — "24 ilan bulundu", sırala: fiyat, tarih, m²
3. **İlan Grid** — Liste veya grid view seçeneği, sayfalama
4. **İlan Kartı içeriği:** kapak fotoğrafı, fiyat, başlık, ilçe/mahalle, m², oda, ilan tarihi, "Satıldı" bandı varsa göster

`/ilanlar/kiralik` ve `/ilanlar/satilik` aynı sayfa, filtre önceden seçili gelir.

---

### `/ilanlar/[slug]` — İlan Detay

**Schema:** `RealEstateListing`, `BreadcrumbList`

**Sectionlar:**

1. **Breadcrumb** — Ana Sayfa › İlanlar › Güngören › [Başlık]
2. **Fotoğraf Galerisi** — Lightbox'lı, tam ekran açılır
3. **Sol kolon — İlan bilgileri:**
   - Başlık, fiyat, etiketler (Kiralık/Satılık, mülk türü, ilçe)
   - Özellikler tablosu: m², oda, kat, bina yaşı, ısıtma, eşyalı mı, krediye uygun mu, tapu durumu, aidat
   - Açıklama metni
   - Konum haritası (Google Maps embed)
4. **Sağ kolon (sticky) — Danışman kartı:** Ulaş Koyuncu fotoğrafı, telefon, WhatsApp ("Bu ilan hakkında soru sor" → otomatik mesaj metniyle açılır), iletişim formu
5. **Benzer İlanlar** — Aynı ilçeden 3 ilan → `/ilanlar/[slug]`
6. **İlçe Linki** — "Güngören'deki tüm ilanlar" → `/bolgeler/gungoren`

Satıldı/kiracı bulundu ilanlar silinmez, arşive alınır, "SATILDI" bandıyla gösterilir. SEO değeri korunur, referans işlevi görür.

---

### `/bolgeler` — Bölgeler Hub

**Schema:** `ItemList`

**Sectionlar:**

1. **Başlık + kısa açıklama** — "Çalıştığımız bölgeler"
2. **İlçe Grid** — Her kart: ilçe görseli, ilçe adı, aktif ilan sayısı → `/bolgeler/[ilce]`

İlçeler: Güngören, Merter, Fatih, Zeytinburnu, Şişli, Beşiktaş, Bahçelievler, Beylikdüzü, Silivri, Büyükçekmece, Arnavutköy

---

### `/bolgeler/[ilce]` — İlçe Detay

**Schema:** `City`, `BreadcrumbList`, `RealEstateAgent`

**Sectionlar:**

1. **Breadcrumb** — Ana Sayfa › Bölgeler › Güngören
2. **Hero — İki kolon:**
   - Sol: İlçe başlığı, bölge tanıtım metni (400-600 kelime, SEO odaklı: ulaşım, fiyat aralıkları, kentsel dönüşüm durumu, öne çıkan mahalleler), 3 metrik kart (aktif ilan sayısı, ort. satış fiyatı, ort. kira)
   - Sağ: Harita embed + mahalle etiketleri
3. **Güncel İlanlar** — Sekmeli (Tümü / Satılık / Kiralık), 6 ilan kartı, "Tüm [ilçe] ilanlarını gör" → `/ilanlar?ilce=[ilce]`
4. **Blog Yazıları** — O ilçeye etiketlenmiş yazılar, 3 kart → `/blog/[slug]`
5. **Yakın Bölgeler** — Komşu ilçe linkleri → `/bolgeler/[ilce]` (cross-linking)
6. **Danışman Kartı** — Ulaş Koyuncu, telefon, WhatsApp

**Blog bağlantısı nasıl kurulur:** CMS'de her blog postuna `bolgeler` adında multi-select alan açılır. Post eklenirken ilçe seçilir (Güngören, Merter vb.). `/bolgeler/gungoren` sayfası o tag'e sahip postları otomatik çeker. Elle bağlantı kurmaya gerek yok.

---

### `/hakkimizda` — Hakkımızda

**Schema:** `Organization`, `Person` (Ulaş Koyuncu)

**Sectionlar:**

1. **Hikaye** — 2003'ten bugüne, timeline formatında
2. **Danışman Profili** — Ulaş Koyuncu: fotoğraf, unvan, kısa bio, telefon, WhatsApp
3. **Misyon / Vizyon / Politika** — Accordion veya tab ile kompakt
4. **İstatistikler** — 20+ yıl, 500+ tamamlanan işlem vb. (animasyonlu sayaçlar)
5. **CTA** — "İlanları Gör" → `/ilanlar`, "İletişim" → `/iletisim`

---

### `/hizmetler` — Hizmetler

**Schema:** `Service`

**Sectionlar:**

1. **Başlık + açıklama**
2. **Hizmet Grid** — Her hizmet: görsel, başlık, kısa açıklama, "Detaylı Bilgi" → `/hizmetler/[slug]`

Hizmetler: Satılık Daire Danışmanlığı, Kiralık Daire Danışmanlığı, Satılık Ofis/Dükkan, Kiralık Ofis/Dükkan, İç Mimari Danışmanlığı, Proje Danışmanlığı, Dış Cephe Tasarımı

---

### `/hizmetler/[slug]` — Hizmet Detay

**Schema:** `Service`

**Sectionlar:**

1. Hizmet açıklaması (gerçek içerik, blog yazısı değil)
2. Neden SED Emlak — 3-4 madde
3. İlgili ilanlar — O hizmetle eşleşen 3-4 ilan kartı
4. CTA — WhatsApp veya iletişim formu

---

### `/blog` — Blog Listesi

**Schema:** `Blog`

**Sectionlar:**

1. **Kategori Filtreleri** — Piyasa & Fiyatlar / Bölge Rehberleri / Hukuki Bilgiler / Yatırım Tavsiyeleri / Proje Haberleri
2. **Blog Grid** — Her kart: görsel, kategori etiketi, başlık, özet, tarih, okuma süresi

---

### `/blog/[slug]` — Blog Yazısı

**Schema:** `BlogPosting`, `BreadcrumbList`

**Sectionlar:**

1. Breadcrumb + kategori etiketi
2. Başlık, yazar, tarih, okuma süresi
3. Kapak görseli
4. Yazı içeriği
5. **İçi CTA'lar** (yazı içinde doğal yerleşim):
   - "Bu bölgedeki ilanları gör" → `/bolgeler/[ilce]`
   - "Güngören ilanlarını filtrele" → `/ilanlar?ilce=gungoren`
6. **Yazar kartı** — Ulaş Koyuncu
7. **İlgili yazılar** — Aynı kategoriden 3 kart → `/blog/[slug]`

---

### `/iletisim` — İletişim

**Schema:** `LocalBusiness` (iki konum), `ContactPage`

**Sectionlar:**

1. **İki ofis** — Merkez (Mete Sk.) + Şube (Platform Suites), harita embed
2. **İletişim Formu** — Ad, telefon, e-posta, konu, mesaj
3. **Direkt kanallar** — Telefon, WhatsApp butonu, e-posta
4. **Çalışma saatleri**

---

## Navigasyon

```
[Logo]   İlanlar ▾   Bölgeler ▾   Hizmetler   Blog   Hakkımızda   📞 İletişim
```

- **İlanlar dropdown:** Kiralık / Satılık / Tüm İlanlar
- **Bölgeler dropdown:** Tüm ilçeler listesi → `/bolgeler/[ilce]`
- Mobilde hamburger menü

---

## Sayfa Bağlantı Özeti

```
Ana Sayfa
 ├─ Bölgeler grid          → /bolgeler/[ilce]
 ├─ Son ilanlar            → /ilanlar/[slug]
 └─ Son bloglar            → /blog/[slug]

/bolgeler/[ilce]
 ├─ İlan kartları          → /ilanlar/[slug]
 ├─ "Tüm ilanlar" CTA      → /ilanlar?ilce=[ilce]
 ├─ Blog kartları          → /blog/[slug]
 └─ Yakın bölgeler         → /bolgeler/[ilce]

/ilanlar/[slug]
 ├─ Benzer ilanlar         → /ilanlar/[slug]
 └─ İlçe linki             → /bolgeler/[ilce]

/blog/[slug]
 ├─ İçi CTA                → /bolgeler/[ilce]
 ├─ İçi CTA                → /ilanlar?ilce=[ilce]
 └─ İlgili yazılar         → /blog/[slug]
```
