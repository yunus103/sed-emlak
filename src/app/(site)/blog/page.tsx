import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { blogListQuery, blogCategoriesQuery, blogPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
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
    client.fetch(blogPageQuery, {}, { next: { tags: ["blogPage"] } }).catch(() => null)
  ]);

  return (
    <div className="min-h-screen">
      <PageHero
        title={pageData?.pageTitle || "Blog"}
        subtitle={pageData?.pageSubtitle || "Gayrimenkul dünyasından en güncel haberler ve emlak ipuçları."}
        backgroundImage={pageData?.mainImage}
        size="compact"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <BlogFilter posts={posts} categories={categories} />
        </div>
      </section>
    </div>
  );
}
