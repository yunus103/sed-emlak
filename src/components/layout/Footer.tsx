import Link from "next/link";
import {
  FaInstagram, FaFacebook, FaLinkedin, FaYoutube,
  FaTiktok, FaPinterest, FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiMailLine, RiPhoneLine, RiMapPinLine, RiTimeLine } from "react-icons/ri";

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
