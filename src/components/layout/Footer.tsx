import Link from "next/link";
import {
  FaInstagram, FaFacebook, FaLinkedin, FaYoutube,
  FaTiktok, FaPinterest, FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiMailLine, RiPhoneLine, RiMapPinLine, RiTimeLine, RiBuilding4Line } from "react-icons/ri";

type NavItem = { label: string; href: string; openInNewTab?: boolean };
type SocialLink = { platform: string; url: string };

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

function resolveHref(item: NavItem) {
  return item.href || "#";
}

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

export function Footer({ settings, navigation }: { settings: any; navigation: any }) {
  const footerLinks: NavItem[] = navigation?.footerLinks || [];
  const socialLinks: SocialLink[] = (settings?.socialLinks || []).filter((s: SocialLink) => s.url);
  const contact = settings?.contactInfo;
  const year = new Date().getFullYear();

  const quickLinks: NavItem[] = footerLinks.length > 0 ? footerLinks : [
    { label: "Satılık İlanlar", href: "/ilanlar/satilik" },
    { label: "Kiralık İlanlar", href: "/ilanlar/kiralik" },
    { label: "Bölgeler", href: "/bolgeler" },
    { label: "Hizmetlerimiz", href: "/hizmetler" },
    { label: "Blog", href: "/blog" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "İletişim", href: "/iletisim" },
  ];

  return (
    <footer className="bg-foreground text-white/75">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xl font-heading font-bold text-white">
              {settings?.siteName || "SED Emlak"}
            </p>
            <p className="text-sm leading-relaxed max-w-sm">
              {settings?.siteTagline || "İstanbul'da 20 yılı aşkın tecrübesiyle kiralık ve satılık gayrimenkul danışmanlığı."}
            </p>
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {socialLinks.map((social, i) => {
                  const Icon = socialIconMap[social.platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors"
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white mb-5">Hızlı Bağlantılar</p>
            <nav className="space-y-2.5">
              {quickLinks.map((item, i) => (
                <Link
                  key={i}
                  href={resolveHref(item)}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className="block text-sm hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white mb-5">İletişim</p>
            <ul className="space-y-3.5 text-sm">
              {contact?.phone && (
                <li className="flex items-start gap-2.5">
                  <RiPhoneLine size={15} className="shrink-0 mt-0.5 text-primary" />
                  <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">{contact.phone}</a>
                </li>
              )}
              {contact?.email && (
                <li className="flex items-start gap-2.5">
                  <RiMailLine size={15} className="shrink-0 mt-0.5 text-primary" />
                  <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
                </li>
              )}
              {contact?.address && (
                <li className="flex items-start gap-2.5">
                  <RiMapPinLine size={15} className="shrink-0 mt-0.5 text-primary" />
                  <span>{contact.address}</span>
                </li>
              )}
              {contact?.workingHours && (
                <li className="flex items-start gap-2.5">
                  <RiTimeLine size={15} className="shrink-0 mt-0.5 text-primary" />
                  <span>{contact.workingHours}</span>
                </li>
              )}
              {contact?.sahibindenUrl && (
                <li className="flex items-start gap-2.5">
                  <SahibindenIcon className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                  <a href={contact.sahibindenUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Sahibinden Mağazamız
                  </a>
                </li>
              )}
              {!contact && (
                <>
                  <li className="flex items-start gap-2.5"><RiPhoneLine size={15} className="shrink-0 mt-0.5 text-primary" /><span>+90 532 000 00 00</span></li>
                  <li className="flex items-start gap-2.5"><RiMailLine size={15} className="shrink-0 mt-0.5 text-primary" /><span>info@sedemlak.com</span></li>
                  <li className="flex items-start gap-2.5"><RiMapPinLine size={15} className="shrink-0 mt-0.5 text-primary" /><span>Beşiktaş, İstanbul</span></li>
                  <li className="flex items-start gap-2.5"><RiTimeLine size={15} className="shrink-0 mt-0.5 text-primary" /><span>Pzt–Cmt: 09:00–19:00</span></li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© {year} {settings?.siteName || "SED Emlak"}. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <Link href="/yasal/gizlilik-politikasi" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link href="/yasal/kullanim-kosullari" className="hover:text-white transition-colors">Kullanım Koşulları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
