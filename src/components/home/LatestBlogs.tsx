import Link from "next/link";
import Image from "next/image";
import { RiCalendar2Line, RiArrowRightLine } from "react-icons/ri";

const FALLBACK = [
  {
    title: "2026 Emlak Piyasası: Beklentiler ve Trendler",
    excerpt: "İstanbul'da konut fiyatları ve kira endeksindeki son değişimleri analiz ettik. Uzmanlarımızın öngörüleriyle yeni dönemi okuyun.",
    date: "12 Mayıs 2026",
    img: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=800&auto=format&fit=crop",
    slug: "2026-emlak-piyasasi",
  },
  {
    title: "Ev Kiralarken Dikkat Edilecekler",
    excerpt: "Sözleşmeden depozitoya, kira artışından tahliyeye kadar bilmeniz gereken tüm hukuki haklar.",
    date: "5 Mayıs 2026",
    img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop",
    slug: "ev-kiralarken-dikkat",
  },
  {
    title: "Kentsel Dönüşümde Haklarınız",
    excerpt: "Riskli yapı tespiti, kira yardımı ve yeniden yapım süreçlerinde mülk sahibi ve kiracı hakları.",
    date: "28 Nisan 2026",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    slug: "kentsel-donusum-haklari",
  },
];

export function LatestBlogs({ posts }: { posts: any[] }) {
  const items = posts?.length > 0 ? posts : FALLBACK;

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Blog</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Rehber & Haberler</h2>
          </div>
          <Link href="/blog" className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline group">
            Tüm Yazılar
            <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((post, i) => (
            <Link
              key={i}
              href={`/${post.slug?.current || post.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Full-bleed image, no whitespace */}
              <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: "16/10" }}>
                <Image
                  src={post.mainImage?.asset?.url || post.img || ""}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-3">
                  <RiCalendar2Line size={13} />
                  {post.date || post.publishedAt || "Güncel"}
                </div>
                <h3 className="font-bold text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
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
