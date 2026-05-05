import React from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const DEFAULT_BG = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop";

export function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  const bg = backgroundImage || DEFAULT_BG;

  return (
    <section className="relative flex flex-col justify-center overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 min-h-[40vh]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      />
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 z-0 bg-black/60" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-left">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/80 text-lg md:text-xl max-w-2xl drop-shadow">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
