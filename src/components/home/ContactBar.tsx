import Link from "next/link";
import { RiPhoneFill, RiMailLine, RiBuilding4Line } from "react-icons/ri";
import { 
  FaInstagram, FaFacebook, FaLinkedin, FaYoutube, 
  FaTiktok, FaPinterest, FaWhatsapp 
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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

export function ContactBar({ settings }: { settings: any }) {
  const contact = settings?.contactInfo;
  const socialLinks = settings?.socialLinks || [];
  
  // Fallbacks
  const phone = contact?.phone || "+90 532 000 00 00";
  const email = contact?.email || "info@sedemlak.com";
  
  const phoneClean = phone.replace(/[^0-9+]/g, "");

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        
        <div className="max-w-5xl mx-auto bg-primary rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Dekoratif Arka Plan İkonu */}
          <div className="absolute -right-10 -bottom-10 opacity-[0.07] pointer-events-none">
            <RiBuilding4Line size={350} className="text-white" />
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="flex-1 text-left text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Bizimle İletişime Geçin
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-md">
                Gayrimenkul süreçlerinizde profesyonel destek almak için bize ulaşın.
              </p>
            </div>
            
            <div className="shrink-0 flex justify-start">
              <Link 
                href="/iletisim"
                className="inline-flex items-center justify-center bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-white/90 active:scale-95 transition-all shadow-xl"
              >
                İletişim Formunu Doldur
              </Link>
            </div>
          </div>
          
          <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row flex-wrap items-start justify-start gap-8 md:gap-12">
            
            {/* Telefon */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <a href={`tel:${phoneClean}`} className="flex items-center gap-3.5 text-white/90 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
                  <RiPhoneFill size={20} />
                </div>
                <div className="text-left">
                  <div className="text-[11px] text-white/50 uppercase tracking-widest font-semibold mb-0.5 whitespace-nowrap">Telefon</div>
                  <div className="font-semibold text-base whitespace-nowrap">{phone}</div>
                </div>
              </a>

              {contact?.phone2 && (
                <a href={`tel:${contact.phone2.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-3.5 text-white/90 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
                    <RiPhoneFill size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] text-white/50 uppercase tracking-widest font-semibold mb-0.5 whitespace-nowrap">Telefon 2</div>
                    <div className="font-semibold text-base whitespace-nowrap">{contact.phone2}</div>
                  </div>
                </a>
              )}
            </div>
            
            {/* Email */}
            <a href={`mailto:${email}`} className="flex items-center gap-3.5 text-white/90 hover:text-white transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
                <RiMailLine size={20} />
              </div>
              <div className="text-left">
                <div className="text-[11px] text-white/50 uppercase tracking-widest font-semibold mb-0.5 whitespace-nowrap">E-posta</div>
                <div className="font-semibold text-base whitespace-nowrap">{email}</div>
              </div>
            </a>
          </div>

          {/* Sosyal Medya Linkleri */}
          {socialLinks.length > 0 && (
            <div className="relative z-10 mt-8 flex flex-wrap items-center justify-start gap-4">
              <span className="text-[11px] text-white/40 uppercase tracking-widest font-semibold mr-2 hidden sm:block">Sosyal Medya:</span>
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
                      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                      aria-label={social.platform}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
