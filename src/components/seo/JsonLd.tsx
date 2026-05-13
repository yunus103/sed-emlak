import { getSiteUrl } from "@/lib/utils";

export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Organization / LocalBusiness ────────────────────────────────────────────
export function organizationJsonLd(settings: any) {
  const siteUrl = getSiteUrl();
  const logoUrl = settings?.logo?.asset?.url;

  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    name: settings?.siteName || "SED Emlak",
    url: siteUrl,
    foundingDate: "2003",
    description:
      "SED Emlak, İstanbul'da Güngören ve Merter başta olmak üzere tüm ilçelerde gayrimenkul alım, satım ve kiralama hizmetleri sunan 20 yılı aşkın deneyimli emlak ofisi.",
    areaServed: [
      { "@type": "City", name: "Güngören", containedIn: { "@type": "City", name: "İstanbul" } },
      { "@type": "City", name: "Merter", containedIn: { "@type": "City", name: "İstanbul" } },
      { "@type": "City", name: "İstanbul", containedIn: { "@type": "Country", name: "Türkiye" } },
    ],
    openingHours: "Mo-Su 09:00-20:00",
    ...(settings?.contactInfo?.phone && { telephone: settings.contactInfo.phone }),
    ...(settings?.contactInfo?.email && { email: settings.contactInfo.email }),
    ...(settings?.contactInfo?.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: settings.contactInfo.address,
        addressLocality: "İstanbul",
        addressCountry: "TR",
      },
    }),
    ...(logoUrl && {
      logo: { "@type": "ImageObject", url: logoUrl },
      image: logoUrl,
    }),
    sameAs: settings?.socialLinks?.map((s: any) => s.url).filter(Boolean) || [],
  };
}

// ─── Article (Blog Yazısı) ────────────────────────────────────────────────────
export function articleJsonLd(post: any, siteSettings?: any) {
  const siteUrl = getSiteUrl();
  const logoUrl = siteSettings?.logo?.asset?.url;

  const publisher = {
    "@type": "Organization",
    name: siteSettings?.siteName || "SED Emlak",
    url: siteUrl,
    ...(logoUrl && {
      logo: { "@type": "ImageObject", url: logoUrl },
    }),
  };

  const author = {
    "@type": "Person",
    name: "Ahmet Aytaç",
    url: siteUrl,
  };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post?.title,
    description: post?.excerpt || "",
    inLanguage: "tr-TR",
    datePublished: post?.publishedAt,
    dateModified: post?._updatedAt || post?.publishedAt,
    url: `${siteUrl}/${post?.slug?.current}`,
    ...(post?.mainImage?.asset?.url && {
      image: {
        "@type": "ImageObject",
        url: post.mainImage.asset.url,
        ...(post.mainImage.asset.metadata?.dimensions && {
          width: post.mainImage.asset.metadata.dimensions.width,
          height: post.mainImage.asset.metadata.dimensions.height,
        }),
      },
    }),
    author,
    publisher,
  };
}

// ─── BreadcrumbList ──────────────────────────────────────────────────────────
export function breadcrumbListJsonLd(breadcrumbs: Array<{ label: string; href?: string }>) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href && { item: `${siteUrl}${crumb.href}` }),
    })),
  };
}

// ─── RealEstateListing (İlan Detay) ──────────────────────────────────────────
export function realEstateListingJsonLd(listing: any, siteSettings?: any) {
  const siteUrl = getSiteUrl();
  const imageUrl = listing?.mainImage?.asset?.url;

  const statusMap: Record<string, string> = {
    satilik: "https://schema.org/ForSale",
    kiralik: "https://schema.org/ForLease",
    satildi: "https://schema.org/Sold",
    kiralandi: "https://schema.org/Leased",
  };

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing?.title,
    description: listing?.description?.[0]?.children?.[0]?.text || "",
    url: `${siteUrl}/ilanlar/${listing?.slug?.current}`,
    datePosted: listing?._createdAt,
    ...(imageUrl && { image: imageUrl }),
    ...(listing?.price && {
      offers: {
        "@type": "Offer",
        price: listing.price,
        priceCurrency: "TRY",
        availability: statusMap[listing.status] || "https://schema.org/InStock",
      },
    }),
    ...(listing?.region?.title && {
      locationCreated: {
        "@type": "Place",
        name: listing.region.title,
        address: {
          "@type": "PostalAddress",
          addressLocality: listing.region.title,
          addressRegion: "İstanbul",
          addressCountry: "TR",
        },
      },
    }),
    ...(listing?.features && {
      floorSize: listing.features.netArea
        ? { "@type": "QuantitativeValue", value: listing.features.netArea, unitCode: "MTK" }
        : undefined,
      numberOfRooms: listing.features.rooms || undefined,
    }),
    seller: {
      "@type": ["RealEstateAgent", "LocalBusiness"],
      name: siteSettings?.siteName || "SED Emlak",
      url: siteUrl,
      ...(siteSettings?.contactInfo?.phone && { telephone: siteSettings.contactInfo.phone }),
    },
  };
}

// ─── Service (Hizmet Detay) ───────────────────────────────────────────────────
export function serviceJsonLd(service: any, siteSettings?: any) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service?.title,
    description: service?.shortDescription || "",
    url: `${siteUrl}/hizmetler/${service?.slug?.current}`,
    provider: {
      "@type": ["RealEstateAgent", "LocalBusiness"],
      name: siteSettings?.siteName || "SED Emlak",
      url: siteUrl,
      areaServed: [
        { "@type": "City", name: "Güngören" },
        { "@type": "City", name: "Merter" },
        { "@type": "City", name: "İstanbul" },
      ],
    },
    areaServed: [
      { "@type": "City", name: "Güngören" },
      { "@type": "City", name: "Merter" },
      { "@type": "City", name: "İstanbul" },
    ],
    serviceType: "Gayrimenkul",
    inLanguage: "tr-TR",
  };
}

// ─── ContactPage (İletişim Sayfası) ──────────────────────────────────────────
export function contactPageJsonLd(settings: any) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "İletişim — SED Emlak",
    url: `${siteUrl}/iletisim`,
    mainEntity: {
      "@type": ["RealEstateAgent", "LocalBusiness"],
      name: settings?.siteName || "SED Emlak",
      url: siteUrl,
      telephone: settings?.contactInfo?.phone || "",
      email: settings?.contactInfo?.email || "",
      openingHours: "Mo-Sa 09:00-20:00",
      ...(settings?.contactInfo?.address && {
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.contactInfo.address,
          addressLocality: "İstanbul",
          addressCountry: "TR",
        },
      }),
      areaServed: [
        { "@type": "City", name: "Güngören" },
        { "@type": "City", name: "Merter" },
        { "@type": "City", name: "İstanbul" },
      ],
    },
  };
}

// ─── CollectionPage (Blog Listesi) ───────────────────────────────────────────
export function blogCollectionJsonLd(posts: any[], pageTitle: string) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle || "Blog — SED Emlak",
    url: `${siteUrl}/blog`,
    inLanguage: "tr-TR",
    hasPart: (posts || []).slice(0, 20).map((p: any) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${siteUrl}/${p.slug?.current}`,
      datePublished: p.publishedAt,
    })),
  };
}

// ─── AboutPage ────────────────────────────────────────────────────────────────
export function aboutPageJsonLd(data: any) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: data?.pageTitle || "Hakkımızda — SED Emlak",
    url: `${siteUrl}/hakkimizda`,
    inLanguage: "tr-TR",
    mainEntity: {
      "@type": "Person",
      name: data?.advisorName || "Ulaş Koyuncu",
      jobTitle: data?.advisorTitle || "Gayrimenkul Uzmanı",
      description: data?.advisorBio || "",
      worksFor: {
        "@type": ["RealEstateAgent", "LocalBusiness"],
        name: "SED Emlak",
        url: siteUrl,
        foundingDate: "2003",
      },
    },
  };
}
