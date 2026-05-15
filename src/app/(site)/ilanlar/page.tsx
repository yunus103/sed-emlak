import { Metadata } from "next";
import { getClient } from "@/sanity/lib/client";
import { defaultSeoQuery, listingsQuery, listingsPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ListingsFilter } from "@/components/listings/ListingsFilter";
import { ListingCard } from "@/components/ui/ListingCard";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getClient().fetch(
    listingsPageQuery,
    {},
    { next: { tags: ["listingsPage"] } }
  );
  return buildMetadata({
    title: pageData?.pageTitle || "İlanlar",
    description: pageData?.pageSubtitle,
    canonicalPath: "/ilanlar",
    pageSeo: pageData?.seo,
  });
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}) {
  const isDraft = false; // Add draft mode logic later if needed
  
  let params: any = {};
  if (searchParams instanceof Promise) {
    params = await searchParams;
  } else {
    params = searchParams;
  }

  const filters = {
    tip: (params.tip as string) || "",
    tur: (params.tur as string) || "",
    ilce: (params.ilce as string) || "",
    oda: (params.oda as string) || "",
    fiyat: params.fiyat ? Number(params.fiyat) : 100000000,
    esyali: params.esyali === "true" ? true : params.esyali === "false" ? false : null,
  };

  const listings = await getClient(isDraft).fetch(listingsQuery, filters, {
    next: { tags: ["listings"] },
  });

  const titlePrefix = filters.tip === "kiralik" ? "Kiralık İlanlar" : filters.tip === "satilik" ? "Satılık İlanlar" : "Tüm İlanlar";
  const pageData = await getClient(isDraft).fetch(
    listingsPageQuery,
    {},
    { next: { tags: ["listingsPage"] } }
  );
  const bgImage = pageData?.mainImage || undefined;

  const regions = await getClient(isDraft).fetch(`*[_type == "region"] | order(title asc) { _id, title, slug }`);

  return (
    <main className="flex min-h-screen flex-col w-full bg-background">
      <PageHero
        title={pageData?.pageTitle || titlePrefix}
        subtitle={pageData?.pageSubtitle || "Hayalinizdeki gayrimenkulü bulmak için filtreleri kullanın."}
        backgroundImage={bgImage}
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "İlanlar" },
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Sidebar / Filters */}
            <aside className="w-full lg:w-1/4 lg:sticky lg:top-32 z-10">
              <ListingsFilter regions={regions} />
            </aside>

            {/* Results */}
            <div className="w-full lg:w-3/4">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">
                  {listings?.length > 0 ? `${listings.length} ilan bulundu` : "İlan bulunamadı"}
                </h2>
              </div>

              {listings?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                  {listings.map((listing: any, i: number) => (
                    <ListingCard key={listing._id || i} listing={listing} priority={i < 4} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-border/50 p-12 text-center shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Aramanıza uygun ilan bulunamadı.</h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Farklı filtre seçenekleri deneyebilir veya arama kriterlerinizi genişletebilirsiniz.
                  </p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}
