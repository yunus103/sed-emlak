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
      <LatestListings listings={data?.featuredListings || []} />
      <FeaturedRegions regions={data?.featuredRegions || []} />
      <Stats stats={data?.stats || []} />
      <AboutSummary data={data} />
      <Services services={data?.featuredServices || []} />
      <LatestBlogs posts={data?.featuredPosts || []} />
      <ContactBar settings={data?.siteSettings} />
    </main>
  );
}
