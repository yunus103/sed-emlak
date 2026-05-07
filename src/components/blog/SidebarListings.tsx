import React from "react";
import Link from "next/link";
import { SanityImage } from "@/components/ui/SanityImage";
import { formatPrice } from "@/lib/utils";

interface SidebarListingsProps {
  listings: any[];
}

export function SidebarListings({ listings }: SidebarListingsProps) {
  if (!listings || listings.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="font-bankgothic font-bold text-sm uppercase tracking-wider">
          Öne Çıkan İlanlar
        </h3>
        <Link href="/ilanlar" className="text-[10px] font-bold text-primary hover:underline underline-offset-4 uppercase">
          Tümü
        </Link>
      </div>
      
      <div className="space-y-4">
        {listings.map((listing) => (
          <Link 
            key={listing._id} 
            href={`/ilanlar/${listing.slug?.current}`}
            className="group flex gap-4 items-center"
          >
            <div className="relative size-20 shrink-0 rounded-xl overflow-hidden bg-muted border border-border/40">
              <SanityImage
                image={{ ...listing.mainImage, alt: listing.mainImage?.alt || listing.title }}
                fill
                sizes="80px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex-grow min-w-0">
              <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">
                {listing.title}
              </h4>
              <p className="text-[11px] text-muted-foreground truncate mb-1">
                {listing.region?.title}, {listing.neighborhood}
              </p>
              <p className="text-xs font-bold text-primary">
                {formatPrice(listing.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
