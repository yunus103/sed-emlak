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

const PROPERTY_TYPES = ["Daire", "Villa", "Arsa", "İş Yeri", "Bina", "Depo"];
const DISTRICTS = ["Tüm İstanbul", "Bakırköy", "Beşiktaş", "Beylikdüzü", "Eyüpsultan", "Kadıköy", "Sarıyer", "Şişli", "Üsküdar"];

const FALLBACK_QUICK_FILTERS = [
  { label: "Daire — Kadıköy", tip: "satilik", tur: "daire", ilce: "Kadıköy" },
  { label: "Villa — Sarıyer", tip: "satilik", tur: "villa", ilce: "Sarıyer" },
  { label: "Arsa — Silivri", tip: "satilik", tur: "arsa", ilce: "Silivri" },
];

export function Hero({ data }: { data: any }) {
  const router = useRouter();
  const [tip, setTip] = useState<"satilik" | "kiralik">("satilik");
  const [tur, setTur] = useState("");
  const [ilce, setIlce] = useState("");

  const bgImage =
    data?.heroImage?.asset?.url ||
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop";

  const quickFilters = data?.quickFilters?.length > 0 ? data.quickFilters : FALLBACK_QUICK_FILTERS;

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("tip", tip);
    if (tur && tur !== "Tüm Türler") params.set("tur", tur);
    if (ilce && ilce !== "Tüm İstanbul") params.set("ilce", ilce);
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
      className="relative flex items-start justify-center overflow-hidden pt-28 md:pt-36 lg:pt-44"
      style={{ height: "100svh", minHeight: 700 }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/55 via-black/30 to-black/65" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        <p className="text-white/60 uppercase tracking-[0.3em] text-[10px] sm:text-xs font-semibold mb-4 drop-shadow">
          İstanbul&apos;un Güvenilir Emlak Danışmanı
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-5 drop-shadow-lg max-w-4xl leading-tight">
          {data?.heroTitle || "Hayalinizdeki Evi Keşfedin"}
        </h1>
        <p className="text-white/75 text-base md:text-lg mb-10 max-w-lg drop-shadow leading-relaxed">
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
                  <SelectContent alignItemWithTrigger={false} className="rounded-xl border-border/50 shadow-xl p-1 max-h-[400px]">
                    <SelectItem value="Tüm Türler" className="py-2.5 px-3">Tüm Türler</SelectItem>
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
                    <SelectValue placeholder="Tüm İstanbul" />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false} className="rounded-xl border-border/50 shadow-xl p-1 max-h-[400px]">
                    {DISTRICTS.map((d) => (
                      <SelectItem key={d} value={d} className="py-2.5 px-3">{d}</SelectItem>
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
