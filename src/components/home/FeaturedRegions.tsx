import Link from "next/link";
import Image from "next/image";
import { SanityImage } from "@/components/ui/SanityImage";

const FALLBACK_REGIONS = [
  { name: "Beşiktaş",  slug: "besiktas" },
  { name: "Şişli",     slug: "sisli" },
  { name: "Kadıköy",   slug: "kadikoy" },
  { name: "Sarıyer",   slug: "sariyer" },
  { name: "Bakırköy",  slug: "bakirkoy" },
  { name: "Üsküdar",   slug: "uskudar" },
];

export function FeaturedRegions({ regions, title, subtitle }: { regions: any[]; title?: string; subtitle?: string }) {
  const items = regions?.length > 0 ? regions : FALLBACK_REGIONS;

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-left md:text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {title || "Uzmanlık Bölgelerimiz"}
          </h2>
          <p className="text-muted-foreground max-w-xl md:mx-auto text-base">
            {subtitle || "İstanbul'un en değerli ilçelerinde kapsamlı portföy ve uzman danışman kadrosu."}
          </p>
        </div>

        {/* 3-column grid matching the reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((region, i) => {
            const title = region.title || region.name;
            const href = `/bolgeler/${region.slug?.current || region.slug || title?.toLowerCase()}`;
            const imgSrc = region.heroImage?.asset?.url || region.img || "";
            return (
              <Link
                key={i}
                href={href}
                className="group relative block overflow-hidden rounded-2xl shadow-sm"
                style={{ aspectRatio: "16/7" }}
              >
                {/* Photo */}
                {region.heroImage?.asset ? (
                  <SanityImage
                    image={region.heroImage}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={region.img || ""}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {/* Zero-overlay design — No background filters, keeping the image 100% vivid */}
                
                {/* Region name centered */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3 
                    className="relative z-10 text-white font-extrabold text-2xl md:text-3xl tracking-wide text-center px-6"
                    style={{ 
                      textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.7), 0 0 25px rgba(0,0,0,0.5)' 
                    }}
                  >
                    {title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
