import Link from "next/link";
import { SanityImage } from "@/components/ui/SanityImage";
import { RiRulerLine, RiHotelBedLine, RiBuilding4Line } from "react-icons/ri";

interface RegionListingCardProps {
  listing: {
    _id: string;
    title: string;
    slug: { current: string } | string;
    status: "satilik" | "kiralik" | "satildi" | "kiralandi";
    propertyType?: string;
    price?: number;
    neighborhood?: string;
    features?: {
      grossArea?: number;
      rooms?: string;
      floor?: string;
    };
    mainImage?: any;
  };
}

const STATUS_CONFIG: Record<string, { label: string; classes: string }> = {
  satilik:   { label: "Satılık",   classes: "bg-primary/10 text-primary" },
  kiralik:   { label: "Kiralık",   classes: "bg-amber-500/10 text-amber-700 dark:text-amber-400" },
  satildi:   { label: "Satıldı",   classes: "bg-muted text-muted-foreground" },
  kiralandi: { label: "Kiralandı", classes: "bg-muted text-muted-foreground" },
};

export function RegionListingCard({ listing }: RegionListingCardProps) {
  const slugStr =
    typeof listing.slug === "object" ? listing.slug?.current : listing.slug;
  const href = `/ilanlar/${slugStr || "ilan"}`;

  const isInactive =
    listing.status === "satildi" || listing.status === "kiralandi";

  const statusCfg = STATUS_CONFIG[listing.status] ?? {
    label: listing.status,
    classes: "bg-muted text-muted-foreground",
  };

  const priceStr = listing.price
    ? new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        maximumFractionDigits: 0,
      }).format(listing.price)
    : "Fiyat belirtilmemiş";

  return (
    <Link
      href={href}
      className={`group flex flex-col rounded-xl overflow-hidden border border-border/60 bg-card transition-shadow duration-300 hover:shadow-md ${
        isInactive ? "opacity-70" : ""
      }`}
    >
      {/* Görsel */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
        {listing.mainImage ? (
          <SanityImage
            image={listing.mainImage}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-muted-foreground/30">
            <RiBuilding4Line size={40} />
          </div>
        )}

        {/* Status badge */}
        <span
          className={`absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusCfg.classes}`}
        >
          {statusCfg.label}
        </span>

        {/* Inactive overlay */}
        {isInactive && (
          <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
            <span className="text-[10px] font-bold tracking-widest uppercase text-foreground/80 bg-background/80 px-3 py-1 rounded">
              {listing.status === "satildi" ? "SATILDI" : "KİRALANDI"}
            </span>
          </div>
        )}
      </div>

      {/* İçerik */}
      <div className="p-3 flex flex-col gap-1">
        <p
          className={`text-sm font-semibold leading-tight ${
            isInactive
              ? "line-through text-muted-foreground"
              : "text-foreground"
          }`}
        >
          {priceStr}
        </p>

        <h3 className="text-xs text-muted-foreground leading-snug line-clamp-2 group-hover:text-foreground transition-colors">
          {listing.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1 pt-2 border-t border-border/40">
          {listing.features?.grossArea && (
            <span className="flex items-center gap-1">
              <RiRulerLine size={12} />
              {listing.features.grossArea} m²
            </span>
          )}
          {listing.features?.rooms && (
            <span className="flex items-center gap-1">
              <RiHotelBedLine size={12} />
              {listing.features.rooms}
            </span>
          )}
          {listing.features?.floor && (
            <span className="text-muted-foreground/70">
              {listing.features.floor}. kat
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
