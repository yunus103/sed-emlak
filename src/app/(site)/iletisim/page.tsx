import { Metadata } from "next";
import { getClient } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { urlForImage } from "@/sanity/lib/image";
import { PageHero } from "@/components/ui/PageHero";
import {
  RiMapPin2Fill,
  RiPhoneFill,
  RiMailFill,
  RiWhatsappFill,
} from "react-icons/ri";
import { 
  FaInstagram, FaFacebook, FaLinkedin, FaYoutube, 
  FaTiktok, FaPinterest, FaWhatsapp 
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ContactForm } from "@/components/forms/ContactForm";
import { groq } from "next-sanity";

const socialIconMap: Record<string, React.ElementType> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  twitter: FaXTwitter,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
};

// Sahibinden SVG İkonu
const SahibindenIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 32 32" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="currentColor"
  >
    <path d="M0 0v32h32v-32zM15.354 6.297c0.75-0.010 1.51-0.005 2.255 0.083 3.214 0.073 6.469 2.906 6.505 6.010h-4.427c0.016-0.922-0.802-2.073-1.703-2.307-1.474-0.359-3.281-0.474-4.573 0.391-0.984 0.594-1.422 2.229-0.125 2.74 3.047 1.448 6.875 1.13 9.63 3.167 2.266 1.609 2.13 4.885 0.365 6.781-2.292 2.453-6.182 2.844-9.464 2.375-3.266-0.156-6.344-2.995-6.427-6.083h4.417c-0.078 1.109 0.849 2.078 1.943 2.427 1.698 0.37 3.635 0.479 5.24-0.25 1.281-0.432 1.37-2.057 0.38-2.807-2.125-1.193-4.75-1.229-7.063-2.021-2.682-0.521-4.854-3.036-4.344-5.599 0.563-3.12 4.167-4.969 7.391-4.906z"/>
  </svg>
);

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
      contactInfo { phone, phone2, email, address, branchAddress, whatsappNumber, sahibindenUrl, mapIframe },
      socialLinks[] { platform, url }
    }
  }`;

  const data = await getClient().fetch(query);
  const page = data?.page;
  const settings = data?.settings;

  const contact = settings?.contactInfo;
  const socialLinks = settings?.socialLinks || [];

  const bgImage = page?.mainImage?.asset
    ? urlForImage(page.mainImage as any)?.url()
    : undefined;

  const phone = contact?.phone || "+90 532 000 00 00";
  const phone2 = contact?.phone2;
  const email = contact?.email || "info@sedemlak.com";
  const whatsappDisplay = contact?.whatsappNumber || phone;
  const address = contact?.address || "İstanbul, Türkiye";
  const branchAddress = contact?.branchAddress;
  const mapIframe = contact?.mapIframe;

  const phoneClean = phone?.replace(/[^0-9+]/g, "") || "";
  const phone2Clean = phone2?.replace(/[^0-9+]/g, "") || "";
  const waLink = whatsappDisplay?.replace(/[^0-9]/g, "") || "";

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
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Ofis Bilgilerimiz
              </h2>
              <p className="text-muted-foreground text-lg mb-12">
                Kahvenizi içerken gayrimenkul hedeflerinizi konuşalım. Haftanın
                6 günü hizmetinizdeyiz.
              </p>

              <div className="space-y-10">
                {/* Adresler */}
                <div className="space-y-8">
                  {/* Merkez Adres */}
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-muted/50 text-muted-foreground flex items-center justify-center shrink-0">
                      <RiMapPin2Fill size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Merkez Ofis</h3>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {address}
                      </p>
                    </div>
                  </div>

                  {/* Şube Adres */}
                  {branchAddress && (
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-muted/50 text-muted-foreground flex items-center justify-center shrink-0">
                        <RiMapPin2Fill size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Şube Ofis</h3>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {branchAddress}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Telefonlar */}
                <div className="space-y-6">
                  {/* Telefon 1 */}
                  <a 
                    href={`tel:${phoneClean}`} 
                    className="flex items-start gap-5 group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <RiPhoneFill size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Telefon</h3>
                      <p className="text-muted-foreground text-lg group-hover:text-primary/80 transition-colors">
                        {phone}
                      </p>
                    </div>
                  </a>

                  {/* Telefon 2 */}
                  {phone2 && (
                    <a 
                      href={`tel:${phone2Clean}`} 
                      className="flex items-start gap-5 group cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <RiPhoneFill size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Telefon 2</h3>
                        <p className="text-muted-foreground text-lg group-hover:text-primary/80 transition-colors">
                          {phone2}
                        </p>
                      </div>
                    </a>
                  )}
                </div>

                {/* WhatsApp */}
                <a 
                  href={`https://wa.me/${waLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-5 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300">
                    <RiWhatsappFill size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-[#25D366] transition-colors">WhatsApp</h3>
                    <p className="text-muted-foreground text-lg group-hover:text-[#25D366]/80 transition-colors">
                      {whatsappDisplay}
                    </p>
                  </div>
                </a>

                {/* Sahibinden */}
                {contact?.sahibindenUrl && (
                  <a 
                    href={contact.sahibindenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-5 group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#f3da00]/10 text-[#f3da00] flex items-center justify-center shrink-0 group-hover:bg-[#f3da00] group-hover:text-black transition-all duration-300">
                      <SahibindenIcon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-[#f3da00] transition-colors">Sahibinden</h3>
                      <p className="text-muted-foreground text-lg group-hover:text-primary/80 transition-colors">
                        Mağazamızı İnceleyin
                      </p>
                    </div>
                  </a>
                )}

                {/* Email */}
                <a 
                  href={`mailto:${email}`}
                  className="flex items-start gap-5 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <RiMailFill size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">E-posta</h3>
                    <p className="text-muted-foreground text-lg group-hover:text-primary/80 transition-colors">
                      {email}
                    </p>
                  </div>
                </a>

                {/* Sosyal Medya */}
                {socialLinks.length > 0 && (
                  <div className="pt-8 border-t border-border flex flex-wrap gap-4 items-center">
                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground mr-2">Sosyal Medya:</span>
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((social: any, i: number) => {
                        const Icon = socialIconMap[social.platform];
                        if (!Icon) return null;
                        return (
                          <a
                            key={i}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all active:scale-90 cursor-pointer"
                            aria-label={social.platform}
                          >
                            <Icon size={20} />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sağ Kolon: Form */}
            <div className="w-full lg:w-1/2 flex lg:justify-end items-start">
              <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-muted">
                <h2 className="text-3xl font-heading font-bold mb-8 text-center lg:text-left">
                  {page?.formTitle || "Bize Ulaşın"}
                </h2>

                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tam Ekran Harita */}
      {mapIframe ? (
        <div
          className="w-full h-[500px] transition-all duration-700 [&>iframe]:w-full [&>iframe]:h-full border-t border-border/50"
          dangerouslySetInnerHTML={{ __html: mapIframe }}
        />
      ) : (
        <div className="w-full h-[500px] bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">
            Harita kodu (iframe) ayarlanmadı.
          </p>
        </div>
      )}
    </main>
  );
}
