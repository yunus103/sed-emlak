import Link from "next/link";
import { RiCalendar2Line, RiArrowRightLine } from "react-icons/ri";
import { SanityImage } from "@/components/ui/SanityImage";
import { formatDate } from "@/lib/utils";

export function LatestBlogs({ posts, title, subtitle }: { posts: any[]; title?: string; subtitle?: string }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            {subtitle && (
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">{subtitle}</p>
            )}
            <h2 className="text-3xl md:text-4xl font-heading font-bold">{title || "Rehber & Haberler"}</h2>
          </div>
          <Link href="/blog" className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline group">
            Tüm Yazılar
            <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post._id || post.slug?.current}
              href={`/${post.slug?.current}`}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: "16/10" }}>
                <SanityImage
                  image={post.mainImage}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-3 flex-wrap">
                  {post.category && (
                    <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10 uppercase tracking-tight">
                      {post.category.title}
                    </span>
                  )}
                  {post.publishedAt && (
                    <span className="flex items-center gap-1">
                      <RiCalendar2Line size={12} />
                      {formatDate(post.publishedAt)}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1 text-sm font-bold text-primary mt-auto">
                  Devamını Oku
                  <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
