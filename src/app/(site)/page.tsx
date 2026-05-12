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

export default async function IndexPage() {
  const isDraft = false; // logic for draft mode if needed

  const { data, allRegions } = await getClient(isDraft).fetch(homePageQuery, {}, {
    next: { tags: ["homePage", "listing", "region", "service", "blogPost"] },
  });

  return (
    <main className="flex min-h-screen flex-col w-full bg-background overflow-hidden">
      <Hero data={data} regions={allRegions || []} />
      <LatestListings 
        listings={data?.featuredListings || []} 
        title={data?.featuredListingsTitle}
        subtitle={data?.featuredListingsSubtitle}
      />
      <FeaturedRegions 
        regions={data?.featuredRegions || []} 
        title={data?.featuredRegionsTitle}
        subtitle={data?.featuredRegionsDescription}
      />
      <Stats 
        stats={data?.stats || []} 
        title={data?.statsTitle}
        subtitle={data?.statsSubtitle}
      />
      <Services 
        services={data?.featuredServices || []} 
        title={data?.featuredServicesTitle}
        subtitle={data?.featuredServicesSubtitle}
      />
      <AboutSummary 
        data={data} 
      />
      <SahibindenBanner />
      <ContactBar 
        data={data}
        siteSettings={data?.siteSettings}
      />
    </main>
  );
}
