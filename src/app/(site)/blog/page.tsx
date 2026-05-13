import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { blogListQuery, blogCategoriesQuery, blogPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, blogCollectionJsonLd, breadcrumbListJsonLd } from "@/components/seo/JsonLd";
import { BlogFilter } from "@/components/blog/BlogFilter";
import { PageHero } from "@/components/ui/PageHero";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await client.fetch(blogPageQuery, {}, { next: { tags: ["blogPage"] } });
  return buildMetadata({
    title: pageData?.pageTitle || "Blog",
    canonicalPath: "/blog",
    pageSeo: pageData?.seo,
  });
}

export default async function BlogListPage() {
  const [posts, categories, pageData] = await Promise.all([
    client.fetch(blogListQuery, {}, { next: { tags: ["blog"] } }).catch(() => []),
    client.fetch(blogCategoriesQuery, {}, { next: { tags: ["blog"] } }).catch(() => []),
    client.fetch(blogPageQuery, {}, { next: { tags: ["blogPage"] } }).catch(() => null),
  ]);

  return (
    <>
      <JsonLd data={blogCollectionJsonLd(posts, pageData?.pageTitle)} />
      <JsonLd data={breadcrumbListJsonLd([
        { label: "Ana Sayfa", href: "/" },
        { label: "Blog" },
      ])} />

      <div className="min-h-screen">
        <PageHero
          title={pageData?.pageTitle || "Blog"}
          subtitle={pageData?.pageSubtitle || "Gayrimenkul dünyasından en güncel haberler ve emlak ipuçları."}
          backgroundImage={pageData?.mainImage}
          size="compact"
          breadcrumbs={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Blog" },
          ]}
        />

        <section className="relative z-10 pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="-mt-8 md:-mt-12 bg-background rounded-t-[2rem] md:rounded-t-[3rem] pt-10 md:pt-14 px-4 md:px-10 shadow-xl border border-border/10">
              <BlogFilter posts={posts} categories={categories} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
