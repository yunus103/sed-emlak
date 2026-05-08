import Link from "next/link";
import Image from "next/image";
import { SanityImage } from "@/components/ui/SanityImage";

const FALLBACK_REGIONS = [
  { name: "Beşiktaş",  slug: "besiktas",  img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop" },
  { name: "Şişli",     slug: "sisli",     img: "https://images.unsplash.com/photo-1622536517523-6a2a11cc8b5c?q=80&w=800&auto=format&fit=crop" },
  { name: "Kadıköy",   slug: "kadikoy",   img: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=800&auto=format&fit=crop" },
  { name: "Sarıyer",   slug: "sariyer",   img: "https://images.unsplash.com/photo-1545063914-a1a6ec821c88?q=80&w=800&auto=format&fit=crop" },
  { name: "Bakırköy",  slug: "bakirkoy",  img: "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?q=80&w=800&auto=format&fit=crop" },
  { name: "Üsküdar",   slug: "uskudar",   img: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?q=80&w=800&auto=format&fit=crop" },
];

export function FeaturedRegions({ regions }: { regions: any[] }) {
  const items = regions?.length > 0 ? regions : FALLBACK_REGIONS;

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-left md:text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">İstanbul'da</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Uzmanlık Bölgelerimiz</h2>
          <p className="text-muted-foreground max-w-xl md:mx-auto text-base">
            İstanbul'un en değerli ilçelerinde kapsamlı portföy ve uzman danışman kadrosu.
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
                    src={region.img || "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?q=80&w=800&auto=format&fit=crop"}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {/* Gradient overlay — reference style: dark band across entire card */}
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors duration-300" />

                {/* Region name centered, exactly like the reference */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-semibold text-xl md:text-2xl tracking-wide drop-shadow-md text-center px-3">
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
