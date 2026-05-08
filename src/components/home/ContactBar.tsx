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
            <div className="flex-1 text-center lg:text-left text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Bizimle İletişime Geçin
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-md mx-auto lg:mx-0">
                Gayrimenkul süreçlerinizde profesyonel destek almak için bize ulaşın.
              </p>
            </div>
            
            <div className="shrink-0 flex justify-center">
              <Link 
                href="/iletisim"
                className="inline-flex items-center justify-center bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-white/90 active:scale-95 transition-all shadow-xl"
              >
                İletişim Formunu Doldur
              </Link>
            </div>
          </div>
          
          <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row flex-wrap items-center justify-center lg:justify-start gap-8 md:gap-12">
            
            {/* Telefon */}
            <a href={`tel:${phoneClean}`} className="flex items-center gap-3.5 text-white/90 hover:text-white transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors shrink-0">
                <RiPhoneFill size={20} />
              </div>
              <div className="text-left">
                <div className="text-[11px] text-white/50 uppercase tracking-widest font-semibold mb-0.5 whitespace-nowrap">Telefon</div>
                <div className="font-semibold text-base whitespace-nowrap">{phone}</div>
              </div>
            </a>
            
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

            {/* Sahibinden */}
            {contact?.sahibindenUrl && (
              <a 
                href={contact.sahibindenUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3.5 text-white/90 hover:text-white transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-[#f3da00]/20 text-[#f3da00] flex items-center justify-center group-hover:bg-[#f3da00]/30 transition-colors shrink-0">
                  <SahibindenIcon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] text-white/50 uppercase tracking-widest font-semibold mb-0.5 whitespace-nowrap">Sahibinden</div>
                  <div className="font-semibold text-base whitespace-nowrap">Mağazamızı İnceleyin</div>
                </div>
              </a>
            )}
          </div>

          {/* Sosyal Medya Linkleri */}
          {socialLinks.length > 0 && (
            <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
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
