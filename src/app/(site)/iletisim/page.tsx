import { Metadata } from "next";
import { getClient } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { urlForImage } from "@/sanity/lib/image";
import { PageHero } from "@/components/ui/PageHero";
import { RiMapPin2Fill, RiPhoneFill, RiMailFill, RiWhatsappFill, RiTimeFill } from "react-icons/ri";
import { ContactForm } from "@/components/forms/ContactForm";
import { groq } from "next-sanity";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(contactPageQuery);
  return buildMetadata({
    canonicalPath: "/iletisim",
    pageSeo: data?.seo,
  });
}

export default async function ContactPage() {
  const query = groq`{
    "page": *[_type == "contactPage"][0] {
      pageTitle, pageSubtitle, formTitle, successMessage,
      mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
      seo
    },
    "settings": *[_type == "siteSettings"][0] {
      contactInfo { phone, email, address, whatsappNumber, mapIframe }
    }
  }`;

  const data = await getClient().fetch(query);
  const page = data?.page;
  const settings = data?.settings;
  const contact = settings?.contactInfo;

  const bgImage = page?.mainImage?.asset
    ? urlForImage(page.mainImage).url()
    : undefined;

  const phone = contact?.phone || "+90 532 000 00 00";
  const email = contact?.email || "info@sedemlak.com";
  const whatsappDisplay = contact?.whatsappNumber || phone;
  const address = contact?.address || "İstanbul, Türkiye";
  const mapIframe = contact?.mapIframe;

  const phoneClean = phone.replace(/[^0-9+]/g, "");
  const waLink = whatsappDisplay.replace(/[^0-9]/g, "");

  return (
    <main className="flex min-h-screen flex-col w-full bg-background">
      <PageHero 
        title={page?.pageTitle || "İletişim"} 
        subtitle={page?.pageSubtitle || "Size yardımcı olmak için buradayız."} 
        backgroundImage={bgImage}
      />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Sol Kolon: Bilgiler */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ofisimizi Ziyaret Edin</h2>
              <p className="text-muted-foreground text-lg mb-12">
                Kahvenizi içerken gayrimenkul hedeflerinizi konuşalım. Haftanın 6 günü hizmetinizdeyiz.
              </p>

              <div className="space-y-8">
                {/* Adres */}
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <RiMapPin2Fill size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Adres</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{address}</p>
                  </div>
                </div>

                {/* Telefon */}
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <RiPhoneFill size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Telefon</h3>
                    <a href={`tel:${phoneClean}`} className="text-muted-foreground hover:text-primary transition-colors text-lg">
                      {phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                    <RiWhatsappFill size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                    <a href={`https://wa.me/${waLink}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#25D366] transition-colors text-lg">
                      {whatsappDisplay}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <RiMailFill size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">E-posta</h3>
                    <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary transition-colors text-lg">
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Kolon: Form */}
            <div className="w-full lg:w-1/2 flex lg:justify-end">
              <div className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-muted">
                <h2 className="text-3xl font-heading font-bold mb-8">{page?.formTitle || "Bize Ulaşın"}</h2>
                
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tam Ekran Harita */}
      {mapIframe ? (
        <div 
          className="w-full h-[500px] grayscale hover:grayscale-0 transition-all duration-500"
          dangerouslySetInnerHTML={{ __html: mapIframe }}
        />
      ) : (
        <div className="w-full h-[500px] bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">Harita kodu (iframe) ayarlanmadı.</p>
        </div>
      )}
    </main>
  );
}
