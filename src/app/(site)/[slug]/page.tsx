import { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getClient, client } from "@/sanity/lib/client";
import { 
  blogPostBySlugQuery, 
  blogListQuery, 
  blogRelatedPostsQuery, 
  sidebarListingsQuery,
  aboutPageQuery 
} from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { JsonLd, articleJsonLd, breadcrumbListJsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Calendar, Tag, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { AdvisorCard } from "@/components/blog/AdvisorCard";
import { SidebarListings } from "@/components/blog/SidebarListings";

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
    ogType: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post._updatedAt || post.publishedAt,
    authors: ["Ahmet Aytaç"],
  });

  if (post.seoTags?.length) {
    baseSeo.keywords = post.seoTags;
  }

  return baseSeo;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;
  
  const [post, sidebarListings, aboutData, siteSettings] = await Promise.all([
    getClient(isDraft).fetch(blogPostBySlugQuery, { slug }, { next: { tags: ["blog"] } }),
    client.fetch(sidebarListingsQuery, {}, { next: { tags: ["listing"] } }),
    client.fetch(aboutPageQuery, {}, { next: { tags: ["layout"] } }),
    client.fetch(
      `*[_type == "siteSettings"][0] { siteName, logo { asset->{ _id, url } } }`,
      {},
      { next: { tags: ["layout"] } }
    )
  ]);

  if (!post) notFound();

  let relatedPosts = [];
  if (post.category?._id) {
    relatedPosts = await getClient(isDraft).fetch(
      blogRelatedPostsQuery,
      { categoryId: post.category._id, currentPostId: post._id },
      { next: { tags: ["blog"] } }
    );
  }

  const breadcrumbs = [
    { label: "Anasayfa", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title }
  ];

  return (
    <>
      <JsonLd data={articleJsonLd(post, siteSettings)} />
      <JsonLd data={breadcrumbListJsonLd(breadcrumbs)} />

      <PageHero 
        title={post.title}
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-background pb-24">
        <div className="container mx-auto px-8 md:px-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-12 md:mt-16">
            
            {/* Sol Kolon: İçerik */}
            <main className="w-full lg:w-2/3">
              <FadeIn direction="up">
                {/* Kapak Görseli */}
                {post.mainImage && (
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-10 bg-muted">
                    <SanityImage
                      image={{ ...post.mainImage, alt: post.mainImage?.alt || post.title }}
                      fill
                      sizes="(max-width: 1280px) 100vw, 800px"
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-6 mb-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {post.category && (
                    <Link 
                      href={`/blog?category=${post.category.slug?.current}`}
                      className="flex items-center gap-2 text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Tag className="size-3" />
                      <span>{post.category.title}</span>
                    </Link>
                  )}
                  {post.publishedAt && (
                    <div className="flex items-center gap-2 py-1.5">
                      <Calendar className="size-3 text-primary" />
                      <time>{formatDate(post.publishedAt)}</time>
                    </div>
                  )}
                </div>

                <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert prose-headings:font-bankgothic prose-headings:tracking-tight prose-p:my-3 prose-headings:mt-8 prose-headings:mb-4 leading-normal prose-a:text-primary prose-img:rounded-2xl shadow-sm bg-white pt-3 px-6 pb-6 md:pt-4 md:px-10 md:pb-10 rounded-[2rem] border border-border/40">
                  <RichText value={post.body} />
                </div>

                {/* Related Regions */}
                {post.regions?.length > 0 && (
                  <div className="mt-12 p-8 md:p-10 bg-muted/30 rounded-3xl border border-border/50">
                    <div className="flex items-center gap-3 mb-6">
                      <MapPin className="size-5 text-primary" />
                      <h3 className="text-sm font-bold uppercase tracking-widest font-bankgothic">İlgili Bölgeler</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.regions.map((region: any) => (
                        <Link
                          key={region.slug}
                          href={`/ilanlar?ilce=${region.slug}`}
                          className="text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 bg-white border border-border/60 rounded-xl hover:border-primary hover:text-primary transition-all shadow-sm"
                        >
                          {region.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {post.seoTags?.length > 0 && (
                  <div className="mt-10 flex flex-wrap gap-2">
                    {post.seoTags.map((tag: string) => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted/50 border border-border/30 px-3 py-1.5 rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </FadeIn>
            </main>

            {/* Sağ Kolon: Sidebar */}
            <aside className="w-full lg:w-1/3">
              <div className="sticky top-32 space-y-12">
                <FadeIn direction="up" delay={0.2}>
                  <AdvisorCard advisor={{
                    advisorName: aboutData?.advisorName,
                    advisorTitle: aboutData?.advisorTitle,
                    advisorBio: aboutData?.advisorBio,
                    advisorImage: aboutData?.advisorImage
                  }} />
                </FadeIn>

                <FadeIn direction="up" delay={0.3}>
                  <SidebarListings listings={sidebarListings} />
                </FadeIn>
              </div>
            </aside>

          </div>

          {/* İlgili Yazılar */}
          {relatedPosts?.length > 0 && (
            <div className="mt-32 pt-20 border-t border-border/60">
              <FadeIn direction="up">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold font-bankgothic uppercase tracking-tight">İlginizi Çekebilir</h2>
                  <Link href="/blog" className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary hover:underline underline-offset-8">Tüm Yazılar</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                  {relatedPosts.map((rPost: any) => (
                    <Link key={rPost.slug.current} href={`/${rPost.slug.current}`} className="group block">
                      <article className="h-full flex flex-col">
                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-muted border border-border/40 shadow-sm transition-all group-hover:shadow-xl">
                          <SanityImage
                            image={rPost.mainImage}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-3">
                            {rPost.category && (
                              <span className="text-[9px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10 uppercase tracking-tighter">
                                {rPost.category.title}
                              </span>
                            )}
                            <time className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                              {formatDate(rPost.publishedAt)}
                            </time>
                          </div>
                          <h3 className="text-base font-bold mb-4 font-bankgothic leading-tight group-hover:text-primary transition-colors line-clamp-2 uppercase">
                            {rPost.title}
                          </h3>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </FadeIn>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
