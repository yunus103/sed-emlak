import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getClient, client } from "@/sanity/lib/client";
import { listingDetailQuery, relatedListingsQuery, defaultSeoQuery, listingsQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, realEstateListingJsonLd, breadcrumbListJsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { ListingGallery } from "@/components/listings/ListingGallery";
import { ListingCard } from "@/components/ui/ListingCard";
import { RichText } from "@/components/ui/RichText";
import { urlForImage } from "@/sanity/lib/image";
import {
  RiHotelBedLine, RiShowersLine, RiRulerLine, RiMapPin2Line,
  RiCheckDoubleLine, RiBuilding4Line, RiFireLine, RiMoneyCnyCircleLine
} from "react-icons/ri";

export const revalidate = 60;

export async function generateStaticParams() {
  const data = await client.fetch(
    allSlugsForSitemapQuery,
    {},
    { next: { tags: ["listing"] } }
  );
  return (data?.listings || []).map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }): Promise<Metadata> {
  const p = await params;
  const { listing, settings } = await getClient().fetch(listingDetailQuery, { slug: p.slug });
  if (!listing) return { title: "İlan Bulunamadı | SED Emlak" };

  return buildMetadata({
    title: listing.seo?.metaTitle || listing.title,
    description: listing.seo?.metaDescription || listing.description?.[0]?.children?.[0]?.text?.slice(0, 155) || "",
    canonicalPath: `/ilanlar/${p.slug}`,
    ogImage: listing.seo?.ogImage || listing.mainImage,
    pageSeo: listing.seo,
  });
}

export default async function ListingDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const p = await params;
  const { listing, advisor: advisorData, settings } = await getClient().fetch(listingDetailQuery, { slug: p.slug });

  if (!listing) {
    notFound();
  }

  // Related listings
  const relatedListings = listing.region?._id
    ? await getClient().fetch(relatedListingsQuery, { regionId: listing.region._id, currentId: listing._id })
    : [];

  const images = [];
  if (listing.mainImage) images.push(listing.mainImage);
  if (listing.gallery && Array.isArray(listing.gallery)) images.push(...listing.gallery);

  const priceFormatted = listing.price 
    ? new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(listing.price)
    : "Fiyat Belirtilmemiş";

  const locationStr = [listing.neighborhood, listing.region?.title].filter(Boolean).join(", ");
  
  // Dynamic Advisor Info from Sanity
  const advisor = {
    name: advisorData?.advisorName || "Ulaş Koyuncu",
    title: advisorData?.advisorTitle || "Gayrimenkul Danışmanı",
    phone: settings?.contactInfo?.phone || "+90 532 201 64 64",
    whatsapp: settings?.contactInfo?.whatsappNumber || "+905322016464",
    image: advisorData?.advisorImage ? urlForImage(advisorData.advisorImage)?.width(400).height(400).url() : "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    waMessage: `Merhaba, web sitenizdeki "${listing.title}" başlıklı ilanınızla ilgileniyorum. Bilgi alabilir miyim?`
  };

  const statusLabels: Record<string, string> = {
    satilik: "Satılık",
    kiralik: "Kiralık",
    satildi: "Satıldı",
    kiralandi: "Kiralandı",
  };

  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "İlanlar", href: "/ilanlar" },
    ...(listing.region ? [{ label: listing.region.title, href: `/bolgeler/${listing.region.slug?.current || listing.region.slug}` }] : []),
    { label: listing.title },
  ];

  const bgImage = listing.mainImage?.asset ? urlForImage(listing.mainImage as any)?.url() : undefined;

  return (
    <main className="flex min-h-screen flex-col w-full bg-background">
      <JsonLd data={realEstateListingJsonLd(listing, settings)} />
      <JsonLd data={breadcrumbListJsonLd(breadcrumbs)} />
      <PageHero
        title={listing.title}
        subtitle={`${locationStr} - ${priceFormatted}`}
        backgroundImage={bgImage}
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/ilanlar" className="hover:text-primary transition-colors">İlanlar</Link>
            <span>/</span>
            {listing.region && (
              <>
                <Link href={`/ilanlar?ilce=${listing.region.slug?.current || listing.region.title}`} className="hover:text-primary transition-colors">
                  {listing.region.title}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-foreground font-medium truncate">{listing.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Column - Details */}
            <div className="w-full lg:w-2/3 space-y-12">
              
              {/* Gallery */}
              <ListingGallery images={images} />

              {/* Quick Info Bar */}
              <div className="flex flex-wrap items-center gap-4 md:gap-8 p-6 bg-white rounded-2xl shadow-sm border border-border/50">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">Fiyat</span>
                  <span className="text-2xl font-bold text-primary">{priceFormatted}</span>
                </div>
                <div className="w-px h-12 bg-border hidden md:block"></div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">Durum</span>
                  <span className="font-medium">{statusLabels[listing.status] || listing.status}</span>
                </div>
                <div className="w-px h-12 bg-border hidden md:block"></div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">Mülk Türü</span>
                  <span className="font-medium">{listing.propertyType || "-"}</span>
                </div>
              </div>

              {/* Features Table */}
              {listing.features && (
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border/50">
                  <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Özellikler</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <FeatureItem icon={<RiRulerLine />} label="Brüt Alan" value={listing.features.grossArea ? `${listing.features.grossArea} m²` : null} />
                    <FeatureItem icon={<RiRulerLine />} label="Net Alan" value={listing.features.netArea ? `${listing.features.netArea} m²` : null} />
                    <FeatureItem icon={<RiHotelBedLine />} label="Oda Sayısı" value={listing.features.rooms} />
                    <FeatureItem icon={<RiBuilding4Line />} label="Bulunduğu Kat" value={listing.features.floor} />
                    <FeatureItem icon={<RiBuilding4Line />} label="Bina Yaşı" value={listing.features.buildingAge} />
                    <FeatureItem icon={<RiFireLine />} label="Isıtma" value={listing.features.heating} />
                    <FeatureItem icon={<RiCheckDoubleLine />} label="Eşyalı" value={listing.features.furnished === true ? "Evet" : listing.features.furnished === false ? "Hayır" : null} />
                    <FeatureItem icon={<RiMoneyCnyCircleLine />} label="Krediye Uygun" value={listing.features.creditEligible === true ? "Evet" : listing.features.creditEligible === false ? "Hayır" : null} />
                    <FeatureItem icon={<RiCheckDoubleLine />} label="Tapu Durumu" value={listing.features.deedStatus} />
                    <FeatureItem icon={<RiMoneyCnyCircleLine />} label="Aidat" value={listing.features.dues ? `${listing.features.dues} TL` : null} />
                  </div>
                </div>
              )}

              {/* Description */}
              {listing.description && listing.description.length > 0 && (
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border/50 prose prose-lg prose-headings:font-heading prose-a:text-primary max-w-none">
                  <h2 className="text-2xl font-bold text-foreground mb-6 font-heading not-prose">İlan Açıklaması</h2>
                  <RichText value={listing.description} />
                </div>
              )}

              {/* Location Map */}
              {listing.locationMap && (
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border/50">
                  <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Konum</h2>
                  <div className="w-full aspect-video rounded-xl overflow-hidden [&>iframe]:w-full [&>iframe]:h-full" dangerouslySetInnerHTML={{ __html: listing.locationMap }} />
                </div>
              )}

            </div>

            {/* Right Column - Sticky Sidebar */}
            <aside className="w-full lg:w-1/3 lg:sticky lg:top-32 space-y-6">
              <div className="bg-secondary text-secondary-foreground rounded-2xl p-6 md:p-8 shadow-sm text-center">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-white/20">
                  <img src={advisor.image} alt={advisor.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-1">{advisor.name}</h3>
                <p className="text-sm opacity-80 mb-6">{advisor.title}</p>
                
                <a 
                  href={`https://wa.me/${advisor.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(advisor.waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl font-medium transition-colors mb-3"
                >
                  WhatsApp ile Soru Sor
                </a>
                <a 
                  href={`tel:${advisor.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center justify-center gap-2 w-full bg-white text-secondary-foreground hover:bg-white/90 py-3 px-4 rounded-xl font-medium transition-colors"
                >
                  Telefon Et
                </a>
              </div>
            </aside>
            
          </div>
        </div>
      </section>

      {/* Related Listings */}
      {relatedListings && relatedListings.length > 0 && (
        <section className="py-12 md:py-20 bg-muted/30 border-t border-border/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-8 font-heading">Benzer İlanlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedListings.map((rel: any, i: number) => (
                <ListingCard key={rel._id || i} listing={rel} />
              ))}
            </div>
            {listing.region && (
              <div className="mt-10 text-center">
                <Link href={`/ilanlar?ilce=${listing.region.slug?.current || listing.region.title}`} className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                  {listing.region.title} Bölgesindeki Tüm İlanlar →
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

    </main>
  );
}

function FeatureItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | null | undefined }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-primary">{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      <span className="font-medium text-sm text-foreground text-right">{value}</span>
    </div>
  );
}
