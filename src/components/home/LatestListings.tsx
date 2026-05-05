"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { RiHotelBedLine, RiShowersLine, RiRulerLine, RiMapPin2Line, RiArrowRightLine } from "react-icons/ri";

const FALLBACK_LISTINGS = [
  {
    title: "Boğaz Manzaralı Lüks Daire",
    price: "₺25.000.000",
    status: "satilik",
    location: "Sarıyer",
    beds: 4, baths: 2, sqm: 230,
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
    slug: "ornek-ilan-1"
  },
  {
    title: "Merkezi Konumda Eşyalı 2+1",
    price: "₺45.000 / ay",
    status: "kiralik",
    location: "Şişli",
    beds: 2, baths: 1, sqm: 95,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    slug: "ornek-ilan-2"
  },
  {
    title: "Yeni Projede Geniş 3+1",
    price: "₺8.500.000",
    status: "satilik",
    location: "Kadıköy",
    beds: 3, baths: 2, sqm: 145,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    slug: "ornek-ilan-3"
  },
];

export function LatestListings({ listings }: { listings: any[] }) {
  const items = listings?.length > 0 ? listings : FALLBACK_LISTINGS;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Portföyümüzden</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Güncel İlanlar</h2>
          </div>
          <Link href="/ilanlar" className={buttonVariants({ variant: "outline", className: "rounded-full px-6 gap-2 group" })}>
            Tüm İlanlar
            <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((listing, i) => (
            <Link
              href={`/ilanlar/${listing.slug?.current || listing.slug || "ilan"}`}
              key={i}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-border/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image — full bleed, no whitespace */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={listing.coverImage?.asset?.url || listing.img || ""}
                  alt={listing.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Status badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide shadow ${
                      listing.status === "satilik"
                        ? "bg-primary text-primary-foreground"
                        : "bg-amber-500 text-white"
                    }`}
                  >
                    {listing.status === "satilik" ? "SATILIK" : "KİRALIK"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <p className="text-2xl font-bold text-primary mb-1">{listing.price}</p>
                <h3 className="font-semibold text-base leading-snug mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {listing.title}
                </h3>

                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                  <RiMapPin2Line size={15} className="shrink-0 text-primary" />
                  <span>{listing.location || listing.region?.name || "İstanbul"}</span>
                </div>

                <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><RiHotelBedLine size={16} />{listing.beds || 3} Oda</span>
                  <span className="flex items-center gap-1.5"><RiShowersLine size={16} />{listing.baths || 1} Banyo</span>
                  <span className="flex items-center gap-1.5"><RiRulerLine size={16} />{listing.sqm || 120} m²</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
