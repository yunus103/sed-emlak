"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { RiArrowRightLine, RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { ListingCard } from "@/components/ui/ListingCard";

// Swiper bileşenleri ve stilleri
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export function LatestListings({
  listings,
  title,
  subtitle,
}: {
  listings: any[];
  title?: string;
  subtitle?: string;
}) {
  const items = listings || [];

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Başlık Bölümü */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
              {subtitle || "Portföyümüzden"}
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              {title || "Güncel İlanlar"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {/* Özel Navigasyon Butonları */}
            {items.length > 4 && (
              <div className="hidden md:flex items-center gap-2 mr-4">
                <button
                  id="prev-listings"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <RiArrowLeftSLine size={24} />
                </button>
                <button
                  id="next-listings"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <RiArrowRightSLine size={24} />
                </button>
              </div>
            )}
            <Link
              href="/ilanlar"
              className={buttonVariants({
                variant: "outline",
                className: "rounded-full px-6 gap-2 group",
              })}
            >
              Tüm İlanlar
              <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Swiper / Grid Alanı */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            rewind={items.length > 4}
            navigation={{
              prevEl: "#prev-listings",
              nextEl: "#next-listings",
            }}
            pagination={{
              clickable: true,
              el: ".listings-pagination",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            watchOverflow={true}
            className="!pb-14"
          >
            {items.map((listing, i) => (
              <SwiperSlide key={i} className="h-auto">
                <ListingCard listing={listing} priority={i < 4} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Sayfalama (Dots) */}
          {items.length > 4 && (
            <div className="listings-pagination flex justify-center gap-2 mt-4 [&>.swiper-pagination-bullet]:w-2 [&>.swiper-pagination-bullet]:h-2 [&>.swiper-pagination-bullet]:bg-border [&>.swiper-pagination-bullet-active]:bg-primary [&>.swiper-pagination-bullet-active]:w-6 [&>.swiper-pagination-bullet]:transition-all [&>.swiper-pagination-bullet]:rounded-full" />
          )}
        </div>
      </div>
    </section>
  );
}
