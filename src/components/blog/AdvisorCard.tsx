import Link from "next/link";
import { SanityImage } from "@/components/ui/SanityImage";
import { cn } from "@/lib/utils";

interface AdvisorCardProps {
  advisor: {
    advisorName?: string;
    advisorTitle?: string;
    advisorBio?: string;
    advisorImage?: any;
  };
}

export function AdvisorCard({ advisor }: AdvisorCardProps) {
  const hasImage = !!advisor?.advisorImage?.asset;

  return (
    <div className="bg-card rounded-2xl border border-border shadow-md overflow-hidden">
      {/* Fotoğraf */}
      {hasImage && (
        <div className="relative aspect-[3/2] w-full bg-muted overflow-hidden">
          <SanityImage
            image={advisor.advisorImage}
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2">
              {advisor.advisorTitle || "Gayrimenkul Uzmanı"}
            </span>
            <h3 className="text-white text-xl font-bold font-heading leading-tight">
              {advisor.advisorName || "SED Emlak"}
            </h3>
          </div>
        </div>
      )}

      {/* İçerik */}
      <div className={cn("p-5", !hasImage && "pt-5")}>
        {!hasImage && (
          <>
            <span className="inline-block bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 border border-primary/20">
              {advisor.advisorTitle || "Gayrimenkul Uzmanı"}
            </span>
            <h3 className="text-foreground text-base font-bold font-heading leading-tight mb-3">
              {advisor.advisorName || "SED Emlak"}
            </h3>
          </>
        )}

        {advisor.advisorBio && (
          <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-3 mb-4">
            {advisor.advisorBio}
          </p>
        )}

        <Link
          href="/iletisim"
          className="block w-full text-center bg-primary text-primary-foreground font-bold text-[11px] px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-all uppercase tracking-widest"
        >
          Bana Ulaşın
        </Link>
      </div>
    </div>
  );
}
