"use client";

import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { RiCheckboxCircleFill } from "react-icons/ri";

const FALLBACK_POINTS = [
  "20 yılı aşkın sektör deneyimi",
  "5.000'den fazla mutlu müşteri",
  "Hukuki güvence ve tapu danışmanlığı",
  "Şeffaf ve dürüst iletişim ilkesi",
];

export function AboutSummary({ data }: { data?: any }) {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* --- Image side --- */}
          <div className="w-full lg:w-[45%] flex-shrink-0 relative">
            {/* Main photo */}
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={
                  data?.aboutImage?.asset?.url ||
                  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop"
                }
                alt="Danışman"
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>
            {/* Floating credential card */}
            <div className="absolute bottom-6 -right-4 lg:right-0 bg-white rounded-xl shadow-xl px-5 py-4 flex items-center gap-3 border border-border/30">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold font-heading text-lg">
                20
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Yıllık
                </p>
                <p className="text-sm font-bold text-foreground">Tecrübe</p>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -left-4 w-2/3 aspect-[4/5] rounded-2xl border-2 border-primary/20 -z-10 hidden sm:block" />
          </div>

          {/* --- Text side --- */}
          <div className="w-full lg:w-[55%] space-y-6">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">
              {data?.aboutSubtitle || "Hakkımızda"}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight">
              {data?.aboutTitle || (
                <>
                  İstanbul'da Güvenilir
                  <br className="hidden sm:block" /> Gayrimenkul Ortağınız
                </>
              )}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {data?.aboutText ||
                "1995'ten bu yana İstanbul'un en değerli lokasyonlarında hizmet veriyoruz. Alıcı, satıcı ve kiracı arasında köprü kurarak her adımda yanınızda olan bir danışman kadrosuyla mülklerinizi güvenle yönetiyoruz."}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {(data?.aboutPoints?.length > 0 ? data.aboutPoints : FALLBACK_POINTS).map((point: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm font-medium text-foreground/80"
                >
                  <RiCheckboxCircleFill
                    size={20}
                    className="text-primary shrink-0 mt-0.5"
                  />
                  {point}
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href="/hakkimizda"
                className={buttonVariants({
                  size: "lg",
                  className: "rounded-full px-8",
                })}
              >
                Hikayemizi Okuyun
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
