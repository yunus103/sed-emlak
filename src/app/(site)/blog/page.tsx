import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { blogListQuery, blogCategoriesQuery, blogPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { BlogFilter } from "@/components/blog/BlogFilter";

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
    client.fetch(blogListQuery, {}, { next: { tags: ["blog"] } }),
    client.fetch(blogCategoriesQuery, {}, { next: { tags: ["blog"] } }),
    client.fetch(blogPageQuery, {}, { next: { tags: ["blogPage"] } })
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 py-20 border-b">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-bankgothic uppercase tracking-tight">
              {pageData?.pageTitle || "Blog"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {pageData?.pageSubtitle || "Gayrimenkul dünyasından en güncel haberler, bölge rehberleri ve emlak ipuçları."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <BlogFilter posts={posts} categories={categories} />
        </div>
      </section>
    </div>
  );
}
