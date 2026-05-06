"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { SanityImage } from "@/components/ui/SanityImage";
import { RiHotelBedLine, RiShowersLine, RiRulerLine, RiMapPin2Line } from "react-icons/ri";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ListingCardProps {
  listing: any;
  priority?: boolean;
}

export function ListingCard({ listing, priority = false }: ListingCardProps) {
  // En fazla 5 görsel (1 kapak + 4 galeri)
  const images = useMemo(() => {
    const allImages = [];
    if (listing.mainImage) allImages.push(listing.mainImage);
    else if (listing.coverImage) allImages.push(listing.coverImage);

    if (listing.gallery && Array.isArray(listing.gallery)) {
      allImages.push(...listing.gallery);
    }
    // Eğer hiç görsel yoksa fallback url dönmemek için null kontrolü, 
    // ama SanityImage zaten asset kontrolü yapıyor.
    return allImages.slice(0, 5);
  }, [listing.mainImage, listing.coverImage, listing.gallery]);

  const fallbackImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop";

  const statusMap: Record<string, { label: string; color: string }> = {
    satilik: { label: "SATILIK", color: "bg-primary text-primary-foreground" },
    kiralik: { label: "KİRALIK", color: "bg-amber-500 text-white" },
    satildi: { label: "SATILDI", color: "bg-destructive text-destructive-foreground" },
    kiralandi: { label: "KİRALANDI", color: "bg-slate-600 text-white" },
  };

  const statusConfig = statusMap[listing.status] || { label: listing.status?.toUpperCase() || "İLAN", color: "bg-primary text-white" };
  const isInactive = listing.status === "satildi" || listing.status === "kiralandi";

  // Slug resolving
  const slugStr = typeof listing.slug === "object" ? listing.slug?.current : listing.slug;
  const href = `/ilanlar/${slugStr || "ilan"}`;

  return (
    <div className={`group flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-border/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative ${isInactive ? 'opacity-90 grayscale-[0.2]' : ''}`}>
      {/* Slider Area */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
        {images.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            className="w-full h-full listing-swiper"
            loop={images.length > 1}
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <Link href={href} className="block w-full h-full">
                    <SanityImage
                      image={img}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={priority && i === 0}
                    />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Link href={href} className="block w-full h-full">
            <img src={listing.img || fallbackImage} alt={listing.title} className="object-cover w-full h-full" />
          </Link>
        )}

        {/* Status badge */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide shadow ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <Link href={href} className="flex flex-col flex-1 p-5">
        <p className={`text-2xl font-bold mb-1 ${isInactive ? 'text-muted-foreground line-through' : 'text-primary'}`}>
          {listing.price ? new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(listing.price) : (listing.priceText || "Fiyat Belirtilmemiş")}
        </p>
        <h3 className="font-semibold text-base leading-snug mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {listing.title}
        </h3>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <RiMapPin2Line size={15} className="shrink-0 text-primary" />
          <span className="truncate">
            {[listing.neighborhood, listing.region?.name || listing.location].filter(Boolean).join(", ")}
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5" title="Oda Sayısı">
            <RiHotelBedLine size={16} />
            {listing.features?.rooms || listing.beds || "-"}
          </span>
          <span className="flex items-center gap-1.5" title="Mülk Türü">
            <RiShowersLine size={16} className="opacity-0 w-0 h-0 hidden" /> {/* Banyo geçici kalktı, mülk türü gelsin */}
            <span className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs">{listing.propertyType || "Bilinmiyor"}</span>
          </span>
          <span className="flex items-center gap-1.5" title="Brüt m²">
            <RiRulerLine size={16} />
            {listing.features?.grossArea || listing.sqm || "-"} m²
          </span>
        </div>
      </Link>
    </div>
  );
}
