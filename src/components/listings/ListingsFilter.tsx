"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ESYALI_LABELS: Record<string, string> = {
  true: "Eşyalı",
  false: "Boş",
};

export function ListingsFilter({ regions = [] }: { regions?: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTip = searchParams.get("tip") || "";
  const currentTur = searchParams.get("tur") || "";
  const currentIlce = searchParams.get("ilce") || "";
  const currentOda = searchParams.get("oda") || "";
  const currentEsyali = searchParams.get("esyali") || "";
  const currentFiyat = searchParams.get("fiyat") || "";

  // Local slider state — only push to URL on drag end (debounce via onMouseUp/onTouchEnd)
  const [sliderValue, setSliderValue] = useState<number>(
    currentFiyat ? Number(currentFiyat) : 100_000_000
  );

  const [isOpen, setIsOpen] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (key: string, value: string) => {
    router.push(pathname + "?" + createQueryString(key, value), { scroll: false });
  };

  const handleSliderCommit = () => {
    // Only fire navigation when user releases the slider
    handleFilterChange("fiyat", sliderValue >= 100_000_000 ? "" : String(sliderValue));
  };

  const clearFilters = () => {
    setSliderValue(100_000_000);
    router.push(pathname, { scroll: false });
    setIsOpen(false);
  };

  const hasActiveFilters = currentTip || currentTur || currentIlce || currentOda || currentEsyali || currentFiyat;

  const fiyatLabel = sliderValue >= 100_000_000
    ? "Limit Yok"
    : new Intl.NumberFormat("tr-TR").format(sliderValue) + " ₺";

  const esyaliDisplayValue = currentEsyali
    ? ESYALI_LABELS[currentEsyali] || currentEsyali
    : "";

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-6 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-border/50">
        <div className="font-semibold flex items-center gap-2 text-primary">
          <SlidersHorizontal size={18} />
          Filtreler
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium cursor-pointer"
        >
          {isOpen ? "Gizle" : "Göster"}
        </button>
      </div>

      <div className={`lg:block ${isOpen ? "block mb-8" : "hidden"} bg-white p-6 rounded-2xl shadow-sm border border-border/50 space-y-6`}>
        <div className="flex items-center justify-between pb-4 border-b border-border/50">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-primary" />
            Gelişmiş Arama
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              <X size={14} /> Temizle
            </button>
          )}
        </div>

        {/* İlan Durumu (Tip) */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">İlan Durumu</label>
          <div className="flex bg-muted p-1 rounded-xl">
            {[
              { label: "Tümü", value: "" },
              { label: "Satılık", value: "satilik" },
              { label: "Kiralık", value: "kiralik" },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => handleFilterChange("tip", value)}
                className={`flex-1 text-sm py-2 px-3 rounded-lg font-medium transition-all cursor-pointer ${
                  currentTip === value
                    ? "bg-white shadow-sm text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Mülk Türü */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Mülk Türü</label>
          <Select
            value={currentTur}
            onValueChange={(val) => handleFilterChange("tur", val === "all" || !val ? "" : val)}
          >
            <SelectTrigger className="w-full bg-muted/50 border-border/50 rounded-xl px-4 py-2.5 h-auto text-sm focus:ring-primary/20 transition-all cursor-pointer">
              <SelectValue placeholder="Tümü" />
            </SelectTrigger>
            {/* No max-h → all items visible without scroll */}
            <SelectContent alignItemWithTrigger={false} className="rounded-xl border-border/50 shadow-xl">
              <SelectItem value="all" className="py-2.5 px-3 cursor-pointer">Tümü</SelectItem>
              {["Daire", "Villa", "Müstakil Ev", "Ofis", "Dükkan / Mağaza", "Arsa", "Bina"].map((p) => (
                <SelectItem key={p} value={p} className="py-2.5 px-3 cursor-pointer">{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* İlçe / Bölge */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">İlçe / Bölge</label>
          <Select
            value={currentIlce}
            onValueChange={(val) => handleFilterChange("ilce", val === "all" || !val ? "" : val)}
          >
            <SelectTrigger className="w-full bg-muted/50 border-border/50 rounded-xl px-4 py-2.5 h-auto text-sm focus:ring-primary/20 transition-all cursor-pointer">
              <SelectValue placeholder="Tüm İstanbul" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} className="rounded-xl border-border/50 shadow-xl">
              <SelectItem value="all" className="py-2.5 px-3 cursor-pointer">Tüm İstanbul</SelectItem>
              {regions.map((r: any) => {
                const label = r.title ? r.title.charAt(0).toLocaleUpperCase('tr-TR') + r.title.slice(1).toLocaleLowerCase('tr-TR') : "";
                return (
                  <SelectItem key={r._id} value={r.slug.current} className="py-2.5 px-3 cursor-pointer">
                    {label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Oda Sayısı */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Oda Sayısı</label>
          <Select
            value={currentOda}
            onValueChange={(val) => handleFilterChange("oda", val === "all" || !val ? "" : val)}
          >
            <SelectTrigger className="w-full bg-muted/50 border-border/50 rounded-xl px-4 py-2.5 h-auto text-sm focus:ring-primary/20 transition-all cursor-pointer">
              <SelectValue placeholder="Farketmez" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} className="rounded-xl border-border/50 shadow-xl">
              <SelectItem value="all" className="py-2.5 px-3 cursor-pointer">Farketmez</SelectItem>
              {["1+0 (Stüdyo)", "1+1", "2+1", "3+1", "4+1", "4+2", "5+1 ve üzeri"].map((o) => (
                <SelectItem key={o} value={o.split(" ")[0]} className="py-2.5 px-3 cursor-pointer">{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Eşyalı Durumu — custom trigger label to avoid "true/false" display */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Eşyalı Durumu</label>
          <Select
            value={currentEsyali}
            onValueChange={(val) => handleFilterChange("esyali", val === "all" || !val ? "" : val)}
          >
            <SelectTrigger className="w-full bg-muted/50 border-border/50 rounded-xl px-4 py-2.5 h-auto text-sm focus:ring-primary/20 transition-all cursor-pointer">
              {/* Render human-readable label instead of raw value */}
              <span className={esyaliDisplayValue ? "text-foreground" : "text-muted-foreground"}>
                {esyaliDisplayValue || "Farketmez"}
              </span>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} className="rounded-xl border-border/50 shadow-xl">
              <SelectItem value="all" className="py-2.5 px-3 cursor-pointer">Farketmez</SelectItem>
              <SelectItem value="true" className="py-2.5 px-3 cursor-pointer">Eşyalı</SelectItem>
              <SelectItem value="false" className="py-2.5 px-3 cursor-pointer">Boş</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Maksimum Fiyat — debounced via onMouseUp / onTouchEnd */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">Maksimum Fiyat</label>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
              {fiyatLabel}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100000000"
            step="500000"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            onMouseUp={handleSliderCommit}
            onTouchEnd={handleSliderCommit}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
            <span>0 ₺</span>
            <span>100M+ ₺</span>
          </div>
        </div>
      </div>
    </>
  );
}
