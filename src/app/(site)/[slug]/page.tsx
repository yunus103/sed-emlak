import { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getClient, client } from "@/sanity/lib/client";
import { blogPostBySlugQuery, blogListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { JsonLd, articleJsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { blogRelatedPostsQuery } from "@/sanity/lib/queries";
import { Calendar, Tag, MapPin, ChevronRight } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await client.fetch(blogListQuery, {}, { next: { tags: ["blog"] } });
  return (posts || []).map((post: any) => ({ slug: post.slug?.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getClient().fetch(blogPostBySlugQuery, { slug }, { next: { tags: ["blog"] } });
  if (!post) return {};
  
  const baseSeo = await buildMetadata({
    title: post.title,
    description: post.excerpt,
    canonicalPath: `/${slug}`,
    pageSeo: post.seo,
  });

  if (post.seoTags?.length) {
    baseSeo.keywords = post.seoTags;
  }

  return baseSeo;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;
  const post = await getClient(isDraft).fetch(
    blogPostBySlugQuery,
    { slug },
    { next: { tags: ["blog"] } }
  );

  if (!post) notFound();

  let relatedPosts = [];
  if (post.category?._id) {
    relatedPosts = await getClient(isDraft).fetch(
      blogRelatedPostsQuery,
      { categoryId: post.category._id, currentPostId: post._id },
      { next: { tags: ["blog"] } }
    );
  }

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />

      <article className="pb-24">
        {/* Header Section */}
        <header className="bg-muted/30 pt-16 pb-12 border-b border-border/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <FadeIn direction="up">
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-10">
                <Link href="/" className="hover:text-primary transition-colors">Anasayfa</Link>
                <ChevronRight className="size-3 opacity-50" />
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                {post.category && (
                  <>
                    <ChevronRight className="size-3 opacity-50" />
                    <Link 
                      href={`/blog?category=${post.category.slug?.current}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.category.title}
                    </Link>
                  </>
                )}
              </nav>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground font-medium">
                {post.category && (
                  <div className="flex items-center gap-2 text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
                    <Tag className="size-4" />
                    <span>{post.category.title}</span>
                  </div>
                )}
                {post.publishedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <time>{formatDate(post.publishedAt)}</time>
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-0 leading-[1.1] font-bankgothic uppercase tracking-tight">
                {post.title}
              </h1>
            </FadeIn>
          </div>
        </header>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="container mx-auto px-4 max-w-5xl -mt-8 md:-mt-12">
            <FadeIn delay={0.15}>
              <div className="relative aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl border-4 border-background bg-muted">
                <SanityImage
                  image={post.mainImage}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                  priority
                />
              </div>
            </FadeIn>
          </div>
        )}

        {/* Content Area */}
        <div className="container mx-auto px-4 mt-16 md:mt-24">
          <div className="max-w-3xl mx-auto">
            <FadeIn delay={0.25}>
              <div className="prose prose-lg dark:prose-invert prose-headings:font-bankgothic prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-2xl">
                <RichText value={post.body} />
              </div>
            </FadeIn>

            {/* Related Regions */}
            {post.regions?.length > 0 && (
              <FadeIn delay={0.3}>
                <div className="mt-16 p-8 bg-muted/30 rounded-3xl border border-border/50">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="size-5 text-primary" />
                    <h3 className="text-sm font-bold uppercase tracking-widest font-bankgothic">İlgili Bölgeler</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.regions.map((region: any) => (
                      <Link
                        key={region.slug}
                        href={`/ilanlar?ilce=${region.slug}`}
                        className="text-sm px-4 py-2 bg-background border border-border/60 rounded-xl hover:border-primary hover:text-primary transition-all font-medium"
                      >
                        {region.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Tags */}
            {post.seoTags?.length > 0 && (
              <FadeIn delay={0.35}>
                <div className="mt-12 flex flex-wrap gap-2">
                  {post.seoTags.map((tag: string) => (
                    <span key={tag} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts?.length > 0 && (
          <div className="container mx-auto px-4 mt-32 border-t pt-20">
            <FadeIn delay={0.4}>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold font-bankgothic uppercase tracking-tight">İlginizi Çekebilir</h2>
                <Link href="/blog" className="text-sm font-bold uppercase tracking-widest text-primary hover:underline underline-offset-8">Tüm Yazılar</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {relatedPosts.map((rPost: any) => (
                  <Link key={rPost.slug.current} href={`/${rPost.slug.current}`} className="group block">
                    <article className="h-full flex flex-col">
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-muted border border-border/40">
                        <SanityImage
                          image={rPost.mainImage}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-grow">
                        {rPost.publishedAt && (
                          <time className="text-[10px] font-bold text-muted-foreground mb-3 block uppercase tracking-[0.2em]">
                            {formatDate(rPost.publishedAt)}
                          </time>
                        )}
                        <h3 className="text-lg font-bold mb-4 font-bankgothic leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {rPost.title}
                        </h3>
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                           Oku <span className="text-lg">→</span>
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        )}
      </article>
    </>
  );
}
