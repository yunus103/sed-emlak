import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allSlugsForSitemapQuery } from "@/sanity/lib/queries";
import { getSiteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const data = await client.fetch(allSlugsForSitemapQuery);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/hizmetler`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/bolgeler`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ilanlar`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...(data?.blogPosts?.map((p: any) => ({
      url: `${base}/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })) || []),

    ...(data?.services?.map((p: any) => ({
      url: `${base}/hizmetler/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })) || []),

    ...(data?.listings?.map((p: any) => ({
      url: `${base}/ilanlar/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })) || []),

    ...(data?.regions?.map((p: any) => ({
      url: `${base}/bolgeler/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })) || []),

    ...(data?.legalPages?.map((p: any) => ({
      url: `${base}/yasal/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })) || []),

    // Projeler sitemap'te tutulabilir ama priority düşük
    ...(data?.projects?.map((p: any) => ({
      url: `${base}/projeler/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })) || []),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
