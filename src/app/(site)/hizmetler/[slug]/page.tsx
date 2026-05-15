import { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Link from "next/link";
import { RiArrowRightLine, RiPhoneLine, RiWhatsappLine, RiArrowLeftLine } from "react-icons/ri";
import { getClient, client } from "@/sanity/lib/client";
import { serviceBySlugQuery, serviceListQuery, servicesPageQuery, defaultSeoQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, serviceJsonLd, breadcrumbListJsonLd } from "@/components/seo/JsonLd";
import { getIcon } from "@/lib/iconMap";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/ui/PageHero";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await client.fetch(serviceListQuery, {}, { next: { tags: ["services"] } });
  return (services || []).map((s: any) => ({ slug: s.slug?.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getClient().fetch(serviceBySlugQuery, { slug }, { next: { tags: ["services"] } });
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.shortDescription,
    canonicalPath: `/hizmetler/${slug}`,
    pageSeo: service.seo,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;

  const [service, pageData, siteSettings] = await Promise.all([
    getClient(isDraft).fetch(serviceBySlugQuery, { slug }, { next: { tags: ["services"] } }),
    getClient().fetch(servicesPageQuery, {}, { next: { tags: ["services"] } }),
    client.fetch(defaultSeoQuery, {}, { next: { tags: ["layout"] } }),
  ]);

  if (!service) notFound();

  const Icon = getIcon(service.icon);
  const heroBg = pageData?.mainImage;
  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hizmetler", href: "/hizmetler" },
    { label: service.title },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <JsonLd data={serviceJsonLd(service, siteSettings)} />
      <JsonLd data={breadcrumbListJsonLd(breadcrumbs)} />
      {/* ── Hero ───────────────────────────────────── */}
      <PageHero
        title={service.title}
        subtitle={service.shortDescription}
        backgroundImage={heroBg}
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Hizmetler", href: "/hizmetler" },
          { label: service.title },
        ]}
        size="compact"
      />

      {/* ── Ana İçerik ──────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Geri dön */}
          <FadeIn direction="up">
            <Link
              href="/hizmetler"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group"
            >
              <RiArrowLeftLine
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              Tüm Hizmetler
            </Link>
          </FadeIn>

          {/* İkon + Başlık kartı */}
          <FadeIn direction="up" delay={0.05}>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Icon size={28} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Hizmetimiz</p>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
                  {service.title}
                </h1>
              </div>
            </div>
          </FadeIn>

          {/* Ana Görsel */}
          {service.mainImage?.asset && (
            <FadeIn delay={0.1}>
              <div className="relative h-64 md:h-[420px] rounded-2xl overflow-hidden mb-12 shadow-lg">
                <SanityImage
                  image={service.mainImage}
                  fill
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover"
                  priority
                />
              </div>
            </FadeIn>
          )}

          {/* İçerik */}
          <FadeIn delay={0.15}>
            <div className="prose-headings:font-heading">
              <RichText value={service.body} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
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
                    Bir Adım Uzağınızdayız
                  </p>
                  <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
                    {service.title} için Destek Alın
                  </h2>
                  <p className="text-primary-foreground/80 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                    Uzman danışmanlarımız, ihtiyaçlarınıza özel çözümler sunmak için hazır. Hemen iletişime geçin veya güncel ilanlarımıza göz atın.
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
                      İlanları İncele
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
