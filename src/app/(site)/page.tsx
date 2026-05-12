import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getClient } from "@/sanity/lib/client";
import { homePageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";

import { Hero } from "@/components/home/Hero";
import { LatestListings } from "@/components/home/LatestListings";
import { FeaturedRegions } from "@/components/home/FeaturedRegions";
import { Stats } from "@/components/home/Stats";
import { AboutSummary } from "@/components/home/AboutSummary";
import { Services } from "@/components/home/Services";
import { LatestBlogs } from "@/components/home/LatestBlogs";
import { SahibindenBanner } from "@/components/home/SahibindenBanner";
import { ContactBar } from "@/components/home/ContactBar";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(homePageQuery, {}, { next: { tags: ["home"] } });
  return buildMetadata({
    canonicalPath: "/",
    pageSeo: data?.seo,
  });
}

export default async function HomePage() {
  const isDraft = (await draftMode()).isEnabled;
  const data = await getClient(isDraft).fetch(
    homePageQuery,
    {},
    { next: { tags: ["home"] } }
  );

  return (
    <main className="flex min-h-screen flex-col w-full">
      <Hero data={data} />
      <LatestListings
        listings={data?.featuredListings || []}
        title={data?.featuredListingsTitle}
        subtitle={data?.featuredListingsSubtitle}
      />
      <FeaturedRegions
        regions={data?.featuredRegions || []}
        title={data?.featuredRegionsTitle}
        subtitle={data?.featuredRegionsSubtitle}
      />
      <Stats
        stats={data?.stats || []}
        title={data?.statsTitle}
        subtitle={data?.statsSubtitle}
      />
      <AboutSummary data={data} />
      <Services
        services={data?.featuredServices || []}
        title={data?.featuredServicesTitle}
        subtitle={data?.featuredServicesSubtitle}
      />
      <LatestBlogs posts={data?.featuredPosts || []} title={data?.blogTitle} subtitle={data?.blogSubtitle} />
      <SahibindenBanner url={data?.siteSettings?.contactInfo?.sahibindenUrl} />
      <ContactBar settings={data?.siteSettings} ctaTitle={data?.ctaTitle} ctaText={data?.ctaText} />
    </main>
  );
}
