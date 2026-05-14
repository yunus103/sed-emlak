"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import { SanityImage } from "@/components/ui/SanityImage";
import { LightboxModal } from "@/components/ui/Lightbox";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

interface ListingGalleryProps {
  images: any[];
}

export function ListingGallery({ images }: ListingGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, images.length]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setSelectedImage((prev) => {
      if (prev === null) return 0;
      if (newDirection === 1) return prev < images.length - 1 ? prev + 1 : 0;
      return prev > 0 ? prev - 1 : images.length - 1;
    });
  };

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Big Swiper */}
      <div className="w-full aspect-[16/10] md:aspect-[21/9] lg:aspect-[16/9] relative rounded-2xl overflow-hidden bg-muted group">
        <Swiper
          style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff" } as any}
          loop={images.length > 1}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="w-full h-full cursor-pointer"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} onClick={() => setSelectedImage(i)}>
              <SanityImage
                image={img}
                fill
                sizes="(max-width: 1024px) 100vw, 75vw"
                className="object-cover"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnails Swiper */}
      {images.length > 1 && (
        <div className="w-full h-16 md:h-24">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={images.length > 4}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full h-full rounded-xl overflow-hidden listing-thumbs"
            breakpoints={{
              640: { slidesPerView: 5 },
              1024: { slidesPerView: 6 },
            }}
          >
            {images.map((img, i) => (
              <SwiperSlide key={i} className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity [&.swiper-slide-thumb-active]:opacity-100">
                <SanityImage
                  image={img}
                  fill
                  sizes="(max-width: 640px) 25vw, (max-width: 1024px) 20vw, 15vw"
                  className="object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Lightbox Modal */}
      <LightboxModal
        images={images}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        direction={direction}
        paginate={paginate}
        variants={variants}
      />
    </div>
  );
}
