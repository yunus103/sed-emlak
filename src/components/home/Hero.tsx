"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiSearchLine, RiHome4Line, RiMapPin2Line } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROPERTY_TYPES = ["Daire", "Villa", "Müstakil Ev", "Ofis", "Dükkan / Mağaza", "Arsa", "Bina"];

const FALLBACK_QUICK_FILTERS = [
  { label: "Daire — Kadıköy", tip: "satilik", tur: "Daire", ilce: "kadikoy" },
  { label: "Villa — Sarıyer", tip: "satilik", tur: "Villa", ilce: "sariyer" },
  { label: "Arsa — Silivri", tip: "satilik", tur: "Arsa", ilce: "silivri" },
];

export function Hero({ data, regions = [] }: { data: any; regions?: any[] }) {
  const router = useRouter();
  const [tip, setTip] = useState<"satilik" | "kiralik">("satilik");
  const [tur, setTur] = useState("");
  const [ilce, setIlce] = useState("");

  const bgImage = data?.heroImage?.asset?.url || "";

  const quickFilters = data?.quickFilters?.length > 0 ? data.quickFilters : FALLBACK_QUICK_FILTERS;

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("tip", tip);
    if (tur && tur !== "all") params.set("tur", tur);
    if (ilce && ilce !== "all") params.set("ilce", ilce);
    router.push(`/ilanlar?${params.toString()}`);
  };

  const handleQuickFilter = (filter: any) => {
    const params = new URLSearchParams();
    if (filter.tip) params.set("tip", filter.tip);
    if (filter.tur) params.set("tur", filter.tur);
    if (filter.ilce) params.set("ilce", filter.ilce);
    router.push(`/ilanlar?${params.toString()}`);
  };

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden py-20"
      style={{
        marginTop: "calc(-1 * var(--header-height))",
        height: "calc(100svh + var(--header-height))",
        minHeight: 700,
      }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        {/* Soft Contrast Pocket - Provides surgical contrast without darkening the whole image */}
        <div className="absolute inset-x-0 top-0 bottom-40 bg-black/20 blur-[120px] -z-10 rounded-full scale-110 sm:scale-100" />

        <p 
          className="text-white/90 uppercase tracking-[0.3em] text-[10px] sm:text-xs font-semibold mb-4"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
        >
          İstanbul&apos;un Güvenilir Emlak Danışmanı
        </p>
        <h1 
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-5 max-w-4xl leading-tight whitespace-pre-line"
          style={{ 
            textShadow: '0 4px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)' 
          }}
        >
          {data?.heroTitle || "Hayalinizdeki Evi Keşfedin"}
        </h1>
        <p 
          className="text-white/95 text-base md:text-lg mb-10 max-w-lg leading-relaxed font-medium"
          style={{ textShadow: '0 2px 15px rgba(0,0,0,0.9)' }}
        >
          {data?.heroSubtitle ||
            "Kiralık ve satılık seçeneklerle ihtiyacınıza en uygun mülkü uzman danışmanlarımızla bulun."}
        </p>

        {/* ── Search Card ───────────────────────────────────────────── */}
        <div className="w-full max-w-3xl">
          {/* Kiralık / Satılık toggle tabs - Floating above the main bar */}
          <div className="flex justify-center mb-3">
            <div className="flex bg-black/40 backdrop-blur-md rounded-full overflow-hidden p-1 shadow-lg border border-white/10">
              {(["satilik", "kiralik"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTip(t)}
                  className={`px-8 py-2.5 text-sm font-semibold rounded-full transition-all cursor-pointer ${
                    tip === t
                      ? "bg-white text-black shadow-md"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  {t === "satilik" ? "Satılık" : "Kiralık"}
                </button>
              ))}
            </div>
          </div>

          {/* Main bar - 4 corners rounded */}
          <div className="bg-white rounded-2xl shadow-2xl p-1.5 w-full">
            <div className="flex flex-col sm:flex-row gap-1">

              {/* Mülk Türü */}
              <div className="flex-1 flex flex-col px-4 py-1.5 hover:bg-muted/50 rounded-xl transition-colors cursor-pointer relative group">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1 mb-0.5">
                  <RiHome4Line size={12} /> Mülk Türü
                </span>
                <Select value={tur} onValueChange={(val) => setTur(val || "")}>
                  <SelectTrigger className="w-full border-0 p-0 h-auto font-medium text-sm shadow-none focus:ring-0 bg-transparent gap-1 cursor-pointer">
                    <SelectValue placeholder="Tüm Türler" />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false} className="rounded-xl border-border/50 shadow-xl">
                    <SelectItem value="all" className="py-2.5 px-3">Tüm Türler</SelectItem>
                    {PROPERTY_TYPES.map((p) => (
                      <SelectItem key={p} value={p} className="py-2.5 px-3">{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="hidden sm:block w-px bg-border/60 my-2" />

              {/* İlçe / Bölge */}
              <div className="flex-1 flex flex-col px-4 py-1.5 hover:bg-muted/50 rounded-xl transition-colors cursor-pointer relative group">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1 mb-0.5">
                  <RiMapPin2Line size={12} /> İlçe / Bölge
                </span>
                <Select value={ilce} onValueChange={(val) => setIlce(val || "")}>
                  <SelectTrigger className="w-full border-0 p-0 h-auto font-medium text-sm shadow-none focus:ring-0 bg-transparent gap-1 cursor-pointer">
                    <span className={ilce && ilce !== "all" ? "text-foreground" : "text-muted-foreground"}>
                      {ilce && ilce !== "all" 
                        ? regions.find(r => r.slug === ilce)?.title || ilce 
                        : "Tüm İstanbul"}
                    </span>
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false} className="rounded-xl border-border/50 shadow-xl">
                    <SelectItem value="all" className="py-2.5 px-3">Tüm İstanbul</SelectItem>
                    {regions.map((r: any) => (
                      <SelectItem key={r._id} value={r.slug} className="py-2.5 px-3">
                        {r.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ara button */}
              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-base px-8 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all shrink-0 mt-2 sm:mt-0 cursor-pointer"
              >
                <RiSearchLine size={20} />
                <span>Ara</span>
              </button>
            </div>
          </div>

          {/* Quick suggestion chips */}
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            {quickFilters.map((filter: any, idx: number) => (
              <button
                key={idx}
                onClick={() => handleQuickFilter(filter)}
                className="text-xs text-white/80 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-4 py-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
