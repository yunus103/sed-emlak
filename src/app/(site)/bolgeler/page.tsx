import { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { regionsPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/utils";
import { JsonLd, breadcrumbListJsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SanityImage } from "@/components/ui/SanityImage";
import Image from "next/image";
import { RiMapPin2Line } from "react-icons/ri";

export async function generateMetadata(): Promise<Metadata> {
  const data = await client
    .fetch(regionsPageQuery, {}, { next: { tags: ["regionsPage"] } })
    .catch(() => null);
  return buildMetadata({
    title: data?.page?.title || "Bölgeler",
    description: data?.page?.description,
    canonicalPath: "/bolgeler",
    pageSeo: data?.page?.seo,
  });
}

export default async function RegionsPage() {
  const data = await client
    .fetch(regionsPageQuery, {}, { next: { tags: ["regionsPage", "region"] } })
    .catch(() => null);

  const page = data?.page;
  // Sanity'de featuredRegions seçildiyse onu, yoksa tüm bölgeleri alfabe sırasıyla göster
  const regions: any[] =
    page?.featuredRegions?.length > 0
      ? page.featuredRegions
      : data?.allRegions || [];

  // JSON-LD
  const siteUrl = getSiteUrl();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page?.title || "Çalıştığımız Bölgeler",
    itemListElement: regions.map((r: any, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.title,
      url: `${siteUrl}/bolgeler/${r.slug?.current || r.slug}`,
    })),
  };
  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Bölgeler" },
  ];

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={breadcrumbListJsonLd(breadcrumbs)} />

      <div className="min-h-screen">
        {/* Hero */}
        <PageHero
          title={page?.title || "Çalıştığımız Bölgeler"}
          subtitle={
            page?.description ||
            "İstanbul'un en değerli ilçelerinde kapsamlı portföy ve uzman danışman kadrosu."
          }
          backgroundImage={page?.mainImage}
          size="compact"
          breadcrumbs={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Bölgeler" },
          ]}
        />

        {/* İlçe Grid */}
        <section className="relative z-10 pb-20">
          <div className="container mx-auto px-4 md:px-8">
            {/* Floating card: yukarı taşma efekti — blog sayfasındaki gibi */}
            <div className="-mt-4 md:-mt-6 bg-background rounded-t-[2rem] md:rounded-t-[3rem] pt-10 md:pt-14 px-4 md:px-10 shadow-xl border border-border/10 pb-14">
              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                    İstanbul
                  </p>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold">
                    SED Emlak Danışmanlık Lokasyonları
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Her bölgede aktif ilan portföyü ve yerel piyasa uzmanlığı.
                </p>
              </div>

              {regions.length === 0 ? (
                <div className="py-20 text-center text-muted-foreground">
                  <RiMapPin2Line
                    size={40}
                    className="mx-auto mb-4 opacity-30"
                  />
                  <p>Henüz bölge eklenmemiş.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {regions.map((region: any, i: number) => {
                    const title = region.title;
                    const slug =
                      typeof region.slug === "object"
                        ? region.slug?.current
                        : region.slug;
                    const href = `/bolgeler/${slug}`;
                    const activeCount = region.metrics?.activeListings;

                    return (
                      <Link
                        key={region._id || i}
                        href={href}
                        className="group relative block overflow-hidden rounded-2xl shadow-sm"
                        style={{ aspectRatio: "16/7" }}
                      >
                        {/* Görsel */}
                        {region.heroImage?.asset ? (
                          <SanityImage
                            image={region.heroImage}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-muted flex items-center justify-center">
                            <RiMapPin2Line
                              size={32}
                              className="text-muted-foreground/30"
                            />
                          </div>
                        )}

                        {/* Zero-overlay design — 100% vivid image */}
                        
                        {/* İlçe adı */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4">
                          <h3 
                            className="relative z-10 text-white font-extrabold text-2xl md:text-3xl tracking-wide text-center"
                            style={{ 
                              textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.7), 0 0 25px rgba(0,0,0,0.5)' 
                            }}
                          >
                            {title}
                          </h3>
                          {activeCount != null && activeCount > 0 && (
                            <span className="text-[11px] font-medium text-white/80 bg-white/15 backdrop-blur-sm border border-white/20 px-2.5 py-0.5 rounded-full">
                              {activeCount} aktif ilan
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
