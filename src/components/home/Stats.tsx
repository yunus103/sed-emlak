"use client";

import { useEffect, useRef, useState } from "react";

const FALLBACK = [
  { value: "20", suffix: "+", label: "Yıllık Tecrübe" },
  { value: "15000", suffix: "+", label: "Mutlu Müşteri" },
  { value: "500", suffix: "+", label: "Aktif İlan" },
  { value: "50", suffix: "+", label: "Uzman Danışman" },
];

function parseStatValue(raw: string) {
  const num = parseInt(raw.replace(/\D/g, ""), 10) || 0;
  const suffix = raw.replace(/[0-9]/g, "").trim();
  return { num, suffix };
}

function AnimatedNumber({ target, suffix, duration = 1800 }: { target: number; suffix: string; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCurrent(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  const display = current >= 10000 ? (current / 1000).toFixed(0) + "K" : current.toLocaleString("tr-TR");

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

export function Stats({ stats }: { stats: any[] }) {
  const items = stats?.length > 0
    ? stats.map((s: any) => {
        const { num, suffix } = parseStatValue(s.value || "0");
        return { num, suffix, label: s.label };
      })
    : FALLBACK.map((s) => ({ num: parseInt(s.value), suffix: s.suffix, label: s.label }));

  return (
    <section className="relative py-20 overflow-hidden bg-foreground">
      {/* Subtle diagonal texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
        backgroundSize: "20px 20px"
      }} />

      <div className="container relative mx-auto px-4">
        <div className="text-left md:text-center mb-14">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-[0.25em] mb-3">Güven ve Tecrübe</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Sayılarla SED Emlak</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl md:mx-auto">
          {items.map((stat, i) => (
            <div key={i} className="text-left md:text-center">
              <p className="text-5xl md:text-6xl font-heading font-light text-white mb-2 tabular-nums">
                <AnimatedNumber target={stat.num} suffix={stat.suffix} />
              </p>
              <div className="w-8 h-0.5 bg-primary md:mx-auto mb-3 rounded-full" />
              <p className="text-sm font-semibold uppercase tracking-widest text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
