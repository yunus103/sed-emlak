import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: any; // Sanity image object
  breadcrumbs?: Breadcrumb[];
  size?: "default" | "compact";
}

export function PageHero({ title, subtitle, backgroundImage, breadcrumbs, size = "default" }: PageHeroProps) {
  // backgroundImage Sanity image objesi veya string URL olabilir
  const bg = backgroundImage
    ? (typeof backgroundImage === "string"
        ? backgroundImage
        : urlForImage(backgroundImage)?.width(1920).auto("format").url() || "")
    : "";

  const isCompact = size === "compact";

  return (
    <section className={cn(
      "relative flex flex-col justify-center overflow-hidden",
      isCompact ? "pt-24 pb-10 md:pt-28 md:pb-14 min-h-[28vh]" : "pt-28 pb-14 md:pt-36 md:pb-20 min-h-[34vh]"
    )}>
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      />
      
      {/* Güçlendirilmiş overlay — başlık okunabilirliği */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/75 via-black/65 to-black/80" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-left">
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4 drop-shadow-lg leading-tight">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-white/80 text-base md:text-lg max-w-2xl drop-shadow mb-5">
            {subtitle}
          </p>
        )}

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex flex-wrap items-center gap-1.5 text-sm font-medium">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="size-3.5 text-white/40" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-white/80 hover:text-white transition-colors px-2 py-0.5 rounded-full hover:bg-white/10"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-0.5 rounded-full font-semibold">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
