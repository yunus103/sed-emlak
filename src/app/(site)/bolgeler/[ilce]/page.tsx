import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import {
  regionDetailQuery,
  listingsByRegionQuery,
  blogsByRegionQuery,
  aboutPageQuery,
  layoutQuery,
} from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/utils";
import { JsonLd, breadcrumbListJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SanityImage } from "@/components/ui/SanityImage";
import { RegionListingCard } from "@/components/listings/RegionListingCard";
import { RichText } from "@/components/ui/RichText";
import {
  RiMapPin2Line,
  RiPhoneFill,
  RiWhatsappLine,
  RiArrowRightLine,
  RiHome4Line,
  RiCalendar2Line,
  RiBuilding4Line,
} from "react-icons/ri";

// ── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const { groq } = await import("next-sanity");
  const slugs = await client.fetch<{ slug: string }[]>(
    groq`*[_type == "region" && defined(slug.current)] { "slug": slug.current }`,
  );
  return slugs.map((s) => ({ ilce: s.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ ilce: string }>;
}): Promise<Metadata> {
  const { ilce } = await params;
  const region = await client
    .fetch(
      regionDetailQuery,
      { slug: ilce },
      { next: { tags: ["region", `region:${ilce}`] } },
    )
    .catch(() => null);

  if (!region)
    return buildMetadata({
      title: "Bölge",
      canonicalPath: `/bolgeler/${ilce}`,
    });

  return buildMetadata({
    title:
      region.seo?.metaTitle || `${region.title}'de Kiralık & Satılık İlanlar`,
    description:
      region.seo?.metaDescription ||
      `${region.title} bölgesindeki tüm kiralık ve satılık gayrimenkul ilanları. SED Emlak uzman danışmanlığıyla ${region.title}'de ev, daire, ofis ve dükkan ilanları.`,
    canonicalPath: `/bolgeler/${ilce}`,
    pageSeo: region.seo,
  });
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function RegionDetailPage({
  params,
}: {
  params: Promise<{ ilce: string }>;
}) {
  const { ilce } = await params;

  const [region, listings, advisor, layout] = await Promise.all([
    client
      .fetch(
        regionDetailQuery,
        { slug: ilce },
        { next: { tags: ["region", `region:${ilce}`] } },
      )
      .catch(() => null),
    client
      .fetch(
        listingsByRegionQuery,
        { slug: ilce },
        { next: { tags: ["listing"] } },
      )
      .catch(() => []),
    client
      .fetch(aboutPageQuery, {}, { next: { tags: ["aboutPage"] } })
      .catch(() => null),
    client
      .fetch(layoutQuery, {}, { next: { tags: ["siteSettings"] } })
      .catch(() => null),
  ]);

  if (!region) notFound();

  // Blog yazıları regionId ile
  const blogs = await client
    .fetch(
      blogsByRegionQuery,
      { regionId: region._id },
      { next: { tags: ["blog"] } },
    )
    .catch(() => []);

  const contact = layout?.settings?.contactInfo;
  const phone = contact?.phone || "+90 532 000 00 00";
  const phoneClean = phone.replace(/[^0-9+]/g, "");
  const wa = contact?.whatsappNumber || phoneClean;
  const waMsg = encodeURIComponent(
    `Merhaba, ${region.title} bölgesi hakkında bilgi almak istiyorum.`,
  );

  // Danışman initials
  const advisorName = advisor?.advisorName || "Ulaş Koyuncu";
  const advisorTitle =
    advisor?.advisorTitle || `${region.title} uzmanı · SED Emlak`;
  const initials = advisorName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // JSON-LD
  const siteUrl = getSiteUrl();
  const regionJsonLd = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    name: `SED Emlak — ${region.title}`,
    description: `${region.title} bölgesinde gayrimenkul hizmetleri. Kiralık ve satılık ilanlar, yerel piyasa uzmanlığı.`,
    url: `${siteUrl}/bolgeler/${ilce}`,
    areaServed: {
      "@type": "City",
      name: region.title,
      containedIn: { "@type": "City", name: "İstanbul", containedIn: { "@type": "Country", name: "Türkiye" } },
    },
  };
  const breadcrumbsData = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Bölgeler", href: "/bolgeler" },
    { label: region.title },
  ];

  return (
    <>
      <JsonLd data={regionJsonLd} />
      <JsonLd data={breadcrumbListJsonLd(breadcrumbsData)} />

      <div className="min-h-screen bg-background">
        {/* ── Breadcrumb ───────────────────────────────────────────────── */}
        <div className="border-b border-border/40 bg-background">
          <div className="container mx-auto px-4 md:px-8 py-3">
            <Breadcrumbs
              items={[
                { label: "Ana Sayfa", href: "/" },
                { label: "Bölgeler", href: "/bolgeler" },
                { label: region.title },
              ]}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-6 md:py-10 max-w-6xl">
          {/* ── Hero — Asimetrik 2 Kolon (1.6fr / 1fr) ────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 md:gap-12 mb-8 pb-8 border-b border-border/40 items-center lg:min-h-[40vh] lg:max-h-[85vh]">
            {/* Sol - Metin Alanı */}
            <div className="flex flex-col justify-center lg:h-full lg:max-h-full lg:overflow-y-auto pr-2 custom-scrollbar mb-8 lg:mb-0">
              <div>
                {/* Konum etiketi */}
                <div className="inline-flex items-center gap-1 text-[10px] md:text-[11px] text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full border border-border/60 mb-3">
                  <RiMapPin2Line size={10} />
                  {region.title}, İstanbul
                </div>

                {/* Açıklama */}
                {region.description ? (
                  <div className="text-muted-foreground leading-relaxed prose max-w-none prose-p:mb-2.5 prose-p:text-[13px] lg:prose-p:text-[14px] prose-p:text-muted-foreground prose-strong:text-foreground prose-strong:font-medium">
                    <RichText value={region.description} />
                  </div>
                ) : (
                  <p className="text-[13px] lg:text-[14px] text-muted-foreground leading-relaxed">
                    {region.title} bölgesindeki tüm detaylı bilgiler ve emlak
                    portföyümüze göz atın.
                  </p>
                )}
              </div>

              {/* Metrikler */}
              {(region.metrics?.activeListings != null ||
                region.metrics?.avgSalePrice ||
                region.metrics?.avgRentPrice) && (
                <div className="flex flex-wrap gap-2 mt-5 shrink-0">
                  {region.metrics?.activeListings != null && (
                    <div className="flex-1 min-w-[100px] bg-muted rounded-lg px-3 py-2 border border-border/40">
                      <div className="text-sm md:text-base font-semibold text-foreground leading-tight">
                        {region.metrics.activeListings}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wide font-medium">
                        Aktif ilan
                      </div>
                    </div>
                  )}
                  {region.metrics?.avgSalePrice && (
                    <div className="flex-1 min-w-[100px] bg-muted rounded-lg px-3 py-2 border border-border/40">
                      <div className="text-sm md:text-base font-semibold text-foreground leading-tight">
                        {region.metrics.avgSalePrice}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wide font-medium">
                        Ort. satış fiyatı
                      </div>
                    </div>
                  )}
                  {region.metrics?.avgRentPrice && (
                    <div className="flex-1 min-w-[100px] bg-muted rounded-lg px-3 py-2 border border-border/40">
                      <div className="text-sm md:text-base font-semibold text-foreground leading-tight">
                        {region.metrics.avgRentPrice}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wide font-medium">
                        Ort. kira
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sağ — Görsel (16:10) + Mahalleler */}
            <div className="flex flex-col w-full h-auto self-center">
              {/* Resim */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-muted shadow-md border border-border/40">
                {region.heroImage?.asset ? (
                  <SanityImage
                    image={region.heroImage}
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <RiBuilding4Line
                      size={36}
                      className="text-muted-foreground/20"
                    />
                  </div>
                )}
              </div>

              {/* Mahalleler */}
              {region.neighborhoods?.length > 0 && (
                <div className="mt-5">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-primary/40"></span>
                    {region.title} Mahalleleri
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {region.neighborhoods.map((n: string) => (
                      <div
                        key={n}
                        className="group flex items-center gap-1.5 bg-card border border-border/60 rounded-lg px-3 py-1.5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                      >
                        <span className="text-[13px] filter grayscale group-hover:grayscale-0 transition-all">
                          📍
                        </span>
                        <span className="text-[12px] font-medium text-foreground/80 group-hover:text-primary transition-colors">
                          {n}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Güncel İlanlar ────────────────────────────────────────────── */}
          <div className="mb-10">
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="text-base font-semibold text-foreground">
                Güncel İlanlar
              </h2>
              <Link
                href={`/ilanlar?ilce=${ilce}`}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                Tümünü gör
                <RiArrowRightLine size={14} />
              </Link>
            </div>

            {listings.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground bg-muted/40 rounded-2xl">
                <RiHome4Line size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">
                  {region.title} bölgesinde henüz ilan bulunmuyor.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {listings.map((listing: any) => (
                    <RegionListingCard key={listing._id} listing={listing} />
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-5 p-4 bg-muted/50 rounded-xl border border-border/40 text-center">
                  <p className="text-xs text-muted-foreground mb-3">
                    {region.title}&apos;deki tüm ilanları görmek için tıklayın
                  </p>
                  <Link
                    href={`/ilanlar?ilce=${ilce}`}
                    className="inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Tüm {region.title} ilanlarını gör
                    <RiArrowRightLine size={14} />
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* ── Harita ───────────────────────────────────────────────────── */}
          {region.mapEmbed && (
            <div className="mb-10">
              <h2 className="text-base font-semibold text-foreground mb-5">
                Bölge Konumu
              </h2>
              <div className="relative w-full aspect-video md:aspect-[16/6] min-h-[250px] rounded-2xl overflow-hidden border border-border/60 bg-muted shadow-sm">
                <div
                  className="absolute inset-0 [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                  dangerouslySetInnerHTML={{ __html: region.mapEmbed }}
                />
              </div>
            </div>
          )}

          {/* ── Divider ───────────────────────────────────────────────────── */}
          <div className="h-px bg-border/40 mb-10" />

          {/* ── Blog Yazıları ─────────────────────────────────────────────── */}
          {blogs.length > 0 && (
            <>
              <div className="mb-10">
                <div className="flex items-baseline justify-between mb-5">
                  <h2 className="text-base font-semibold text-foreground">
                    {region.title} Hakkında Yazılarımız
                  </h2>
                  <Link
                    href="/blog"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    Blog
                    <RiArrowRightLine size={14} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {blogs.map((post: any) => {
                    const postSlug =
                      typeof post.slug === "object"
                        ? post.slug?.current
                        : post.slug;
                    const publishedDate = post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                          month: "long",
                          year: "numeric",
                        })
                      : null;

                    return (
                      <Link
                        key={post._id}
                        href={`/${postSlug}`}
                        className="group bg-card border border-border/60 rounded-xl p-4 hover:shadow-sm transition-shadow"
                      >
                        {post.category && (
                          <span className="inline-block text-[10px] font-semibold uppercase tracking-tight text-primary bg-primary/5 border border-primary/10 rounded-full px-2 py-0.5 mb-2">
                            {post.category.title}
                          </span>
                        )}
                        <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        {publishedDate && (
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <RiCalendar2Line size={11} />
                            {publishedDate}
                          </p>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-border/40 mb-10" />
            </>
          )}

          {/* ── Yakın Bölgeler ────────────────────────────────────────────── */}
          {region.nearbyRegions?.length > 0 && (
            <>
              <div className="mb-10">
                <h2 className="text-base font-semibold text-foreground mb-5">
                  Diğer Bölgelerimiz
                </h2>
                <div className="flex flex-wrap gap-3">
                  {region.nearbyRegions.map((nb: any) => (
                    <Link
                      key={nb._id}
                      href={`/bolgeler/${nb.slug}`}
                      className="flex items-center gap-2 pr-4 py-1.5 bg-muted/30 border border-border/40 rounded-xl hover:bg-muted hover:border-primary/20 transition-all group"
                    >
                      <div className="w-10 h-10 relative rounded-lg overflow-hidden shrink-0 ml-1.5">
                        {nb.heroImage?.asset ? (
                          <SanityImage
                            image={nb.heroImage}
                            fill
                            sizes="40px"
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted/60 flex items-center justify-center">
                            <RiMapPin2Line
                              size={14}
                              className="text-muted-foreground/40"
                            />
                          </div>
                        )}
                      </div>
                      <span className="text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {nb.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border/40 mb-10" />
            </>
          )}

          {/* ── Danışman Kartı ────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted/50 border border-border/60 rounded-2xl px-5 py-4">
            {/* Avatar + bilgi */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold shrink-0">
                {initials}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground leading-tight">
                  {advisorName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Gayrimenkul Uzmanı · SED Emlak
                </p>
              </div>
            </div>

            {/* Butonlar */}
            <div className="flex gap-2 shrink-0">
              <a
                href={`tel:${phoneClean}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <RiPhoneFill size={13} />
                Ara
              </a>
              <a
                href={`https://wa.me/${wa}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium bg-background text-foreground border border-border/60 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <RiWhatsappLine size={13} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
