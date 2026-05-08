"use client";

import { RiArrowRightUpLine } from "react-icons/ri";

interface SahibindenBannerProps {
  url?: string;
}

// Sahibinden SVG İkonu
const SahibindenIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="currentColor"
  >
    <path d="M0 0v32h32v-32zM15.354 6.297c0.75-0.010 1.51-0.005 2.255 0.083 3.214 0.073 6.469 2.906 6.505 6.010h-4.427c0.016-0.922-0.802-2.073-1.703-2.307-1.474-0.359-3.281-0.474-4.573 0.391-0.984 0.594-1.422 2.229-0.125 2.74 3.047 1.448 6.875 1.13 9.63 3.167 2.266 1.609 2.13 4.885 0.365 6.781-2.292 2.453-6.182 2.844-9.464 2.375-3.266-0.156-6.344-2.995-6.427-6.083h4.417c-0.078 1.109 0.849 2.078 1.943 2.427 1.698 0.37 3.635 0.479 5.24-0.25 1.281-0.432 1.37-2.057 0.38-2.807-2.125-1.193-4.75-1.229-7.063-2.021-2.682-0.521-4.854-3.036-4.344-5.599 0.563-3.12 4.167-4.969 7.391-4.906z" />
  </svg>
);

export function SahibindenBanner({ url }: SahibindenBannerProps) {
  if (!url) return null;

  return (
    <section className="w-full bg-muted/30 border-y border-border/50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left flex-1">
            {/* İkon Kutusu */}
            <div className="w-20 h-20 rounded-3xl bg-[#f3da00] text-black flex items-center justify-center shrink-0 shadow-lg shadow-yellow-500/10">
              <SahibindenIcon className="w-10 h-10" />
            </div>

            {/* Metinler */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  Resmi Sahibinden Mağazamız
                </h2>
                <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border border-primary/20">
                  Premium Emlak Ofisi
                </span>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                Tüm güncel ilanlarımıza ve portföyümüze ayrıca Sahibinden
                mağazamız üzerinden de ulaşabilirsiniz.
              </p>
            </div>
          </div>

          {/* Aksiyon Butonu */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white hover:bg-foreground hover:text-white border border-border px-8 py-4 rounded-2xl font-bold transition-all shadow-sm hover:shadow-xl active:scale-95 whitespace-nowrap"
          >
            Mağazayı İncele
            <RiArrowRightUpLine className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
