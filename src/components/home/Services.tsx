import Link from "next/link";
import {
  RiHomeHeartLine, RiKey2Line, RiBarChartBoxLine,
  RiShieldStarLine, RiScales3Line, RiBuilding4Line,
  RiArrowRightLine
} from "react-icons/ri";

const FALLBACK = [
  { title: "Satış Danışmanlığı",      description: "Mülkünüzü gerçek piyasa değerinden, güvenilir süreç yönetimiyle en hızlı şekilde satıyoruz.", icon: RiHomeHeartLine, slug: "satis-danismanligi", accent: "#1a5fb4" },
  { title: "Kiralama Danışmanlığı",   description: "Bütçenize ve yaşam tarzınıza en uygun kiralık daire ve işyerlerini hızla buluyoruz.", icon: RiKey2Line, slug: "kiralama-danismanligi", accent: "#2d6a4f" },
  { title: "Yatırım Danışmanlığı",    description: "Kira getirisi ve değer artışı analizleriyle doğru lokasyonda, doğru yatırımı yapmanıza rehberlik ediyoruz.", icon: RiBarChartBoxLine, slug: "yatirim-danismanligi", accent: "#7b2d8b" },
  { title: "Ekspertiz & Değerleme",   description: "Bağımsız uzman değerleme raporuyla mülkünüzün gerçek piyasa değerini tespit ediyoruz.", icon: RiShieldStarLine, slug: "ekspertiz-degerleme", accent: "#b5451b" },
  { title: "Mülk Yönetimi",          description: "Kiracı bulma, kira takibi ve bakım koordinasyonunu sizin yerinize üstleniyoruz.", icon: RiBuilding4Line, slug: "mulk-yonetimi", accent: "#1a7fa1" },
  { title: "Hukuki & Tapu Desteği",  description: "Tapu devri, ipotek ve sözleşme süreçlerinde hukuki güvence sağlıyoruz.", icon: RiScales3Line, slug: "hukuki-destek", accent: "#8a6800" },
];

export function Services({ services }: { services: any[] }) {
  const items = services?.length > 0 ? services : FALLBACK;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Ne Yapıyoruz?</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Uçtan Uca Gayrimenkul Hizmetleri</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Alım, satım, kiralama veya yatırım — hangi ihtiyaçla gelirseniz gelin, uzman kadromuz yanınızda.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((service, i) => {
            const Icon = service.icon || RiBuilding4Line;
            return (
              <Link
                key={i}
                href={`/hizmetler/${service.slug?.current || service.slug}`}
                className="group relative flex flex-col p-7 rounded-2xl border bg-background hover:bg-primary hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                {/* Corner accent square (decorative) */}
                <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl bg-muted/50 group-hover:bg-white/10 transition-colors duration-300" />

                <div className="relative w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-white/15 flex items-center justify-center mb-5 transition-colors duration-300 text-primary group-hover:text-white">
                  <Icon size={26} />
                </div>

                <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-white/80 leading-relaxed flex-1 transition-colors duration-300">
                  {service.description || service.shortDescription}
                </p>

                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-white transition-colors duration-300">
                  Detaylı Bilgi
                  <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
