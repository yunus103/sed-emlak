import { getSiteUrl } from "@/lib/utils";

export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd(settings: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings?.siteName,
    url: getSiteUrl(),
    ...(settings?.contactInfo?.phone && { telephone: settings.contactInfo.phone }),
    ...(settings?.contactInfo?.email && { email: settings.contactInfo.email }),
    ...(settings?.contactInfo?.address && {
      address: { "@type": "PostalAddress", streetAddress: settings.contactInfo.address },
    }),
    sameAs: settings?.socialLinks?.map((s: any) => s.url).filter(Boolean) || [],
  };
}

export function articleJsonLd(post: any, siteSettings?: any) {
  const siteUrl = getSiteUrl();
  const logoUrl = siteSettings?.logo?.asset?.url;

  const publisher = {
    "@type": "RealEstateAgent",
    name: "SED Emlak",
    url: siteUrl,
    ...(logoUrl && {
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    }),
  };

  const author = {
    "@type": "Organization",
    name: "SED Emlak",
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
