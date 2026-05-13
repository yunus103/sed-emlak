import { Metadata } from "next";
import { getClient } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, aboutPageJsonLd, breadcrumbListJsonLd } from "@/components/seo/JsonLd";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { RichText } from "@/components/ui/RichText";
import { RiFocus3Line, RiEyeLine } from "react-icons/ri";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(aboutPageQuery);
  return buildMetadata({
    canonicalPath: "/hakkimizda",
    pageSeo: data?.seo,
  });
}

export default async function AboutPage() {
  const data = await getClient().fetch(aboutPageQuery);

  const bgImage = data?.mainImage?.asset
    ? urlForImage(data.mainImage as any)?.url()
    : undefined;

  const advisorImg = (data?.advisorImage?.asset
    ? urlForImage(data.advisorImage as any)?.width(800).height(1000).url()
    : undefined) || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop";

  return (
    <main className="flex min-h-screen flex-col w-full bg-background">
      <JsonLd data={aboutPageJsonLd(data)} />
      <JsonLd data={breadcrumbListJsonLd([
        { label: "Ana Sayfa", href: "/" },
        { label: "Hakkımızda" },
      ])} />
      <PageHero
        title={data?.pageTitle || "Hakkımızda"}
        subtitle={data?.pageSubtitle || "Kurumsal yaklaşımımız ve değerlerimiz."}
        backgroundImage={bgImage}
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Hakkımızda" },
        ]}
      />

      {/* 1. Bölüm: Danışman Profili & Karşılama (Integrated Design) */}
      <section className="py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Fotoğraf Alanı */}
            <div className="w-full lg:w-5/12 relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] -rotate-2 z-0" />
              <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl">
                <Image
                  src={advisorImg}
                  alt={data?.advisorName || "Ulaş Koyuncu"}
                  fill
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            
            {/* İçerik Alanı */}
            <div className="w-full lg:w-7/12">
              <div className="inline-block text-primary bg-primary/10 px-4 py-1.5 rounded-full font-bold tracking-widest uppercase text-[10px] mb-6">
                {data?.advisorTitle || "Kurucu & Gayrimenkul Uzmanı"}
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-8">
                {data?.advisorName || "Ulaş Koyuncu"}
              </h2>
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed font-light mb-10">
                <p>
                  {data?.advisorBio || "Sektördeki çeyrek asrı aşan tecrübemle, gayrimenkul yatırımlarınızda maksimum faydayı sağlamanız için buradayım. Her bir mülke kendi yatırımım gibi yaklaşıyor, dürüstlüğü ve şeffaflığı her zaman ön planda tutuyorum."}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/iletisim" className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                  İletişime Geçin
                </Link>
                <Link href="/ilanlar" className="bg-muted text-foreground font-bold px-8 py-4 rounded-xl hover:bg-muted/80 transition-all">
                  Portföyü İnceleyin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bölüm: İstatistikler (Success Indicators) */}
      <section className="py-20 bg-primary text-primary-foreground border-y border-primary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-primary-foreground/10">
            {data?.stats?.length > 0 ? (
              data.stats.map((stat: any, i: number) => (
                <div key={i} className="text-center px-4">
                  <div className="text-4xl md:text-5xl font-heading font-bold mb-3 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base opacity-80 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="text-center px-4">
                  <div className="text-4xl md:text-5xl font-heading font-bold mb-3 tabular-nums">2003</div>
                  <div className="text-sm md:text-base opacity-80 font-medium uppercase tracking-wider">Kuruluş Yılı</div>
                </div>
                <div className="text-center px-4 border-l border-primary-foreground/10">
                  <div className="text-4xl md:text-5xl font-heading font-bold mb-3 tabular-nums">20+</div>
                  <div className="text-sm md:text-base opacity-80 font-medium uppercase tracking-wider">Yıllık Tecrübe</div>
                </div>
                <div className="text-center px-4 border-l border-primary-foreground/10">
                  <div className="text-4xl md:text-5xl font-heading font-bold mb-3 tabular-nums">Tam</div>
                  <div className="text-sm md:text-base opacity-80 font-medium uppercase tracking-wider">Kapsamlı Hizmet</div>
                </div>
                <div className="text-center px-4 border-l border-primary-foreground/10">
                  <div className="text-4xl md:text-5xl font-heading font-bold mb-3 tabular-nums">100%</div>
                  <div className="text-sm md:text-base opacity-80 font-medium uppercase tracking-wider">Güven Odaklı</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 3. Bölüm: Hikayemiz & Detaylı İçerik */}
      <section className="py-20 md:py-32 bg-muted/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
              {data?.storyTitle || "Kurumsal Profilimiz"}
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-6 rounded-full" />
          </div>

          <div className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {data?.body ? (
              <RichText value={data.body} />
            ) : (
              <div className="space-y-6">
                <p>
                  SED Emlak, İç Mimari ve Proje Danışmanlığı, inşaat ve yapı sektöründeki faaliyetlerine 15 Eylül 2003 tarihinde başlamıştır. Kuruluşundan itibaren kalite ve güven odaklı bir hizmet anlayışı ile hareket etmektedir. Bugün SED Emlak, İç Mimari ve Proje Danışmanlığı, uzun yıllar boyunca elde edilen bilgi birikimi ve tecrübesiyle müşterilerine tam kapsamlı hizmet sunmaktadır.
                </p>
                <p>
                  SED Emlak; emlak ve konut alım satımı başta olmak üzere, ev, işyeri, ofis, mağaza ve showroom projeleri ile dış cephe tasarım ve uygulama alanlarında profesyonel çözümler üretmektedir. Her projede estetik, işlevsellik ve kaliteyi bir arada sunmayı hedefleyen firma, sektörde güvenilir bir marka olma vizyonuyla hareket etmektedir.
                </p>
                <p>
                  İç mimari ve uygulama hizmetlerinde, boyadan alçıpana, zemin uygulamalarından cam işlerine, ahşap imalatlardan mutfak ve banyo tasarımlarına kadar geniş bir hizmet yelpazesi sunulmaktadır. Mağaza ve showroom projelerinde ise konsept geliştirmeden anahtar teslim uygulamaya kadar tüm süreçler profesyonel bir anlayışla yönetilmektedir.
                </p>
                <p>
                  İnşaat ve yapı sektöründe çağın gerekliliklerini yakından takip eden SED Emlak, kalite, titizlik ve dürüstlük ilkeleri doğrultusunda faaliyetlerini sürdürmektedir. Çeyrek asrı aşan sektörel deneyimiyle SED Emlak, İç Mimari ve Proje Danışmanlığı, bulunduğu alanda öncü olma hedefiyle çalışmalarına kararlılıkla devam etmektedir.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Bölüm: Misyon & Vizyon */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Misyon */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-muted hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <RiFocus3Line size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">
                {data?.missionTitle || "Misyonumuz"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {data?.missionText || "Misyonumuz; müşterilerimizin ihtiyaç ve beklentilerini doğru analiz ederek, emlak, iç mimari ve proje danışmanlığı alanlarında güvenilir ve profesyonel hizmet sunmaktır. Her projede şeffaflık, kalite ve zamanında teslim ilkeleriyle hareket ederiz. Tecrübemizi, teknik bilgi birikimimizle birleştirerek, kalıcı ve değer katan çözümler üretmeyi hedefleriz. Müşterilerimizle uzun vadeli ve güvene dayalı ilişkiler kurmak, misyonumuzun temelini oluşturur."}
              </p>
            </div>

            {/* Vizyon */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-muted hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <RiEyeLine size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">
                {data?.visionTitle || "Vizyonumuz"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {data?.visionText || "Vizyonumuz; emlak, iç mimari ve inşaat sektöründe yenilikçi ve sürdürülebilir çözümler sunan öncü bir marka olmaktır. Kalite standartlarını yükseltirken, estetik ve işlevselliği müşteri memnuniyetiyle harmanlayan projeler üretmeyi amaçlarız. Sektörel gelişmeleri yakından takip ederek, çağın gerekliliklerine uygun hizmet anlayışımızı sürekli geliştirmeyi temel hedefimiz olarak görürüz."}
              </p>
            </div>

          </div>
        </div>
      </section>
      {/* 5. Bölüm: CTA (Eylem Çağrısı) */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-primary rounded-[2.5rem] p-10 md:p-16 text-center text-primary-foreground relative overflow-hidden shadow-2xl">
            {/* Dekoratif Arka Plan Detayı */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-32 -mb-32 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
                {data?.ctaTitle || "Geleceğinizi Birlikte İnşa Edelim"}
              </h2>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                {data?.ctaSubtitle || "Gayrimenkul yatırımlarınızda ve iç mimari projelerinizde profesyonel destek almak için bize ulaşın."}
              </p>
              <Link 
                href="/iletisim" 
                className="inline-flex items-center justify-center bg-white text-primary font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition-all hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
              >
                {data?.ctaButtonText || "Hemen İletişime Geçin"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
