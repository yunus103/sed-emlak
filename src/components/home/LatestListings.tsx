"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { RiArrowRightLine } from "react-icons/ri";
import { ListingCard } from "@/components/ui/ListingCard";

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
  {
    title: "Modern Minimalist Stüdyo",
    price: "₺5.250.000",
    status: "satilik",
    location: "Beşiktaş",
    beds: 1, baths: 1, sqm: 65,
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
    slug: "ornek-ilan-4"
  },
];

export function LatestListings({ listings, title, subtitle }: { listings: any[]; title?: string; subtitle?: string }) {
  const items = listings?.length > 0 ? listings : FALLBACK_LISTINGS;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
              {subtitle || "Portföyümüzden"}
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">{title || "Güncel İlanlar"}</h2>
          </div>
          <Link href="/ilanlar" className={buttonVariants({ variant: "outline", className: "rounded-full px-6 gap-2 group" })}>
            Tüm İlanlar
            <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((listing, i) => (
            <ListingCard key={i} listing={listing} priority={i < 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
