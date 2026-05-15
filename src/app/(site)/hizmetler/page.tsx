import { Metadata } from "next";
import Link from "next/link";
import { RiArrowRightLine, RiPhoneLine } from "react-icons/ri";
import { getClient } from "@/sanity/lib/client";
import { servicesPageQuery, serviceListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbListJsonLd } from "@/components/seo/JsonLd";
import { getIcon } from "@/lib/iconMap";
import { PageHero } from "@/components/ui/PageHero";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(
    servicesPageQuery,
    {},
    { next: { tags: ["services"] } },
  );
  return buildMetadata({
    title: data?.pageTitle || "Hizmetlerimiz",
    description: data?.pageSubtitle || data?.sectionDescription,
    canonicalPath: "/hizmetler",
    pageSeo: data?.seo,
  });
}

export default async function ServicesPage() {
  const [pageData, services] = await Promise.all([
    getClient().fetch(servicesPageQuery, {}, { next: { tags: ["services"] } }),
    getClient().fetch(serviceListQuery, {}, { next: { tags: ["services"] } }),
  ]);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <JsonLd data={breadcrumbListJsonLd([
        { label: "Ana Sayfa", href: "/" },
        { label: "Hizmetler" },
      ])} />
      {/* ── Hero ───────────────────────────────────── */}
      <PageHero
        title={pageData?.pageTitle || "Hizmetlerimiz"}
        subtitle={
          pageData?.pageSubtitle ||
          "Gayrimenkul süreçlerinizde SED Emlak tarafından uçtan uca profesyonel destek!"
        }
        backgroundImage={pageData?.mainImage}
        size="compact"
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Hizmetler" },
        ]}
      />

      {/* ── Hizmet Grid ─────────────────────────────── */}
      <section className="relative z-10 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          {/* Floating card: yukarı taşma efekti — blog ve bölgeler sayfasındaki gibi */}
          <div className="-mt-8 md:-mt-12 bg-background rounded-t-[2rem] md:rounded-t-[3rem] pt-10 md:pt-14 px-4 md:px-10 shadow-xl border border-border/10 pb-14">
            {/* Başlık Bölümü */}
            <FadeIn direction="up">
              <div className="max-w-2xl mb-14">
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
                  {pageData?.sectionTitle || "Ne Yapıyoruz?"}
                </p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">
                  {pageData?.sectionHeading || "Uçtan Uca Gayrimenkul Hizmetleri"}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {pageData?.sectionDescription ||
                    "Alım, satım, kiralama veya yatırım — hangi ihtiyaçla gelirseniz gelin, uzman kadromuz yanınızda."}
                </p>
              </div>
            </FadeIn>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(services || []).map((service: any, i: number) => {
                const Icon = getIcon(service.icon);
                const slug = service.slug?.current || service.slug;

                return (
                  <FadeIn
                    key={slug || i}
                    delay={Math.min(i * 0.06, 0.4)}
                    direction="up"
                  >
                    <Link
                      href={`/hizmetler/${slug}`}
                      className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
                    >
                      {/* Görsel alanı */}
                      <div className="relative h-44 overflow-hidden bg-muted shrink-0">
                        {service.mainImage?.asset ? (
                          <SanityImage
                            image={service.mainImage}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                            <Icon size={52} className="text-primary/20" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* İkon badge */}
                        <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110">
                          <Icon size={20} />
                        </div>
                      </div>

                      {/* İçerik */}
                      <div className="flex flex-col flex-1 p-5">
                        <h3 className="text-base font-bold mb-2.5 text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
                          {service.title}
                        </h3>

                        {service.shortDescription && (
                          <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-3">
                            {service.shortDescription}
                          </p>
                        )}

                        <div className="flex items-center gap-1.5 text-sm font-semibold text-primary mt-auto pt-2 border-t border-border">
                          Detaylı Bilgi
                          <RiArrowRightLine
                            size={15}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Bölümü ──────────────────────────────── */}
      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn direction="up">
              <div className="bg-primary rounded-[2rem] p-10 md:p-14 text-primary-foreground relative overflow-hidden shadow-2xl">
                {/* Dekoratif arka plan */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -mr-36 -mt-36 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/5 rounded-full -ml-36 -mb-36 blur-3xl pointer-events-none" />

                <div className="relative z-10 text-center">
                  <p className="text-primary-foreground/60 text-xs font-bold uppercase tracking-widest mb-4">
                    Hemen Başlayalım
                  </p>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                    Hangi Hizmeti Arıyorsunuz?
                  </h2>
                  <p className="text-primary-foreground/80 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                    Gayrimenkul süreçlerinizde size özel çözümler için bugün
                    iletişime geçin. Uzman kadromuzla yanınızdayız.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/iletisim"
                      className="inline-flex items-center gap-2.5 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 min-w-[180px] justify-center"
                    >
                      <RiPhoneLine size={18} />
                      İletişime Geçin
                    </Link>
                    <Link
                      href="/ilanlar"
                      className="inline-flex items-center gap-2.5 bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground font-bold px-8 py-4 rounded-xl hover:bg-primary-foreground/20 transition-all min-w-[180px] justify-center"
                    >
                      İlanları İnceleyin
                      <RiArrowRightLine size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
