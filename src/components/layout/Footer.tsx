import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiTimeLine,
  RiArrowRightUpLine,
} from "react-icons/ri";
import { SanityImage } from "@/components/ui/SanityImage";

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

const SahibindenIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="currentColor"
  >
    <path d="M0 0v32h32v-32zM15.354 6.297c0.75-0.010 1.51-0.005 2.255 0.083 3.214 0.073 6.469 2.906 6.505 6.010h-4.427c0.016-0.922-0.802-2.073-1.703-2.307-1.474-0.359-3.281-0.474-4.573 0.391-0.984 0.594-1.422 2.229-0.125 2.74 3.047 1.448 6.875 1.13 9.63 3.167 2.266 1.609 2.13 4.885 0.365 6.781-2.292 2.453-6.182 2.844-9.464 2.375-3.266-0.156-6.344-2.995-6.427-6.083h4.417c-0.078 1.109 0.849 2.078 1.943 2.427 1.698 0.37 3.635 0.479 5.24-0.25 1.281-0.432 1.37-2.057 0.38-2.807-2.125-1.193-4.75-1.229-7.063-2.021-2.682-0.521-4.854-3.036-4.344-5.599 0.563-3.12 4.167-4.969 7.391-4.906z" />
  </svg>
);

function resolveHref(item: NavItem) {
  return item.href || "#";
}

export function Footer({
  settings,
  navigation,
}: {
  settings: any;
  navigation: any;
}) {
  const footerLinks: NavItem[] = navigation?.footerLinks || [];
  const socialLinks: SocialLink[] = (settings?.socialLinks || []).filter(
    (s: SocialLink) => s.url,
  );
  const contact = settings?.contactInfo;
  const year = new Date().getFullYear();

  const quickLinks: NavItem[] =
    footerLinks.length > 0
      ? footerLinks
      : [
          { label: "Satılık İlanlar", href: "/ilanlar/satilik" },
          { label: "Kiralık İlanlar", href: "/ilanlar/kiralik" },
          { label: "Bölgeler", href: "/bolgeler" },
          { label: "Hizmetlerimiz", href: "/hizmetler" },
          { label: "Blog", href: "/blog" },
          { label: "Hakkımızda", href: "/hakkimizda" },
          { label: "İletişim", href: "/iletisim" },
        ];

  return (
    <footer style={{ background: "#0e1117" }} className="text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1.4fr] gap-12">
          {/* ── Brand ── */}
          <div className="space-y-6">
            {/* Logo — Çerçeve yatayda daraltıldı, dikey korundu */}
            {settings?.logo ? (
              <div className="inline-flex items-center justify-center bg-white rounded-xl px-1.5 py-3 shadow-2xl border border-white/5">
                <div
                  className="relative"
                  style={{ height: "8rem", width: "240px" }}
                >
                  <SanityImage
                    image={settings.logo}
                    fill
                    objectFit="contain"
                    fit="max"
                    sizes="240px"
                    noBlur
                  />
                </div>
              </div>
            ) : (
              <p className="text-2xl font-heading font-bold text-white">
                {settings?.siteName || "SED Emlak"}
              </p>
            )}

            <p className="text-sm leading-relaxed text-white/55 max-w-xs">
              {settings?.siteTagline ||
                "İstanbul'da 20 yılı aşkın tecrübesiyle kiralık ve satılık gayrimenkul danışmanlığı."}
            </p>

            {/* Sosyal medya */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
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
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Hızlı Bağlantılar ── */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45 mb-6">
              Hızlı Bağlantılar
            </p>
            <nav className="flex flex-col gap-2.5">
              {quickLinks.map((item, i) => (
                <Link
                  key={i}
                  href={resolveHref(item)}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── İletişim ── */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45 mb-6">
              İletişim
            </p>
            <ul className="flex flex-col gap-4">
              {contact?.phone && (
                <li className="flex items-start gap-3">
                  <RiPhoneLine
                    size={17}
                    className="shrink-0 mt-0.5 text-white"
                  />
                  <div className="flex flex-col gap-1">
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {contact.phone}
                    </a>
                    {contact.phone2 && (
                      <a
                        href={`tel:${contact.phone2.replace(/[^0-9+]/g, "")}`}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {contact.phone2}
                      </a>
                    )}
                  </div>
                </li>
              )}
              {contact?.email && (
                <li className="flex items-start gap-3">
                  <RiMailLine
                    size={17}
                    className="shrink-0 mt-0.5 text-white"
                  />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {contact?.address && (
                <li className="flex items-start gap-3">
                  <RiMapPinLine
                    size={17}
                    className="shrink-0 mt-0.5 text-white"
                  />
                  <div>
                    <span className="block text-[10px] text-white/35 uppercase font-bold tracking-wide mb-0.5">
                      Merkez Ofis
                    </span>
                    <span className="text-sm text-white/70">
                      {contact.address}
                    </span>
                  </div>
                </li>
              )}
              {contact?.branchAddress && (
                <li className="flex items-start gap-3">
                  <RiMapPinLine
                    size={17}
                    className="shrink-0 mt-0.5 text-white"
                  />
                  <div>
                    <span className="block text-[10px] text-white/35 uppercase font-bold tracking-wide mb-0.5">
                      Şube Ofis
                    </span>
                    <span className="text-sm text-white/70">
                      {contact.branchAddress}
                    </span>
                  </div>
                </li>
              )}
              {contact?.workingHours && (
                <li className="flex items-start gap-3">
                  <RiTimeLine
                    size={17}
                    className="shrink-0 mt-0.5 text-white"
                  />
                  <span className="text-sm text-white/70">
                    {contact.workingHours}
                  </span>
                </li>
              )}
              {contact?.sahibindenUrl && (
                <li className="flex items-start gap-3">
                  <SahibindenIcon className="w-[17px] h-[17px] shrink-0 mt-0.5 text-white" />
                  <a
                    href={contact.sahibindenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Sahibinden Mağazamız
                    <RiArrowRightUpLine size={13} className="opacity-60" />
                  </a>
                </li>
              )}
              {/* Fallback */}
              {!contact && (
                <>
                  <li className="flex items-start gap-3">
                    <RiPhoneLine
                      size={17}
                      className="shrink-0 mt-0.5 text-white"
                    />
                    <span className="text-sm text-white/70">
                      +90 532 000 00 00
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <RiMailLine
                      size={17}
                      className="shrink-0 mt-0.5 text-white"
                    />
                    <span className="text-sm text-white/70">
                      info@sedemlak.com
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <RiMapPinLine
                      size={17}
                      className="shrink-0 mt-0.5 text-white"
                    />
                    <span className="text-sm text-white/70">
                      Beşiktaş, İstanbul
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <RiTimeLine
                      size={17}
                      className="shrink-0 mt-0.5 text-white"
                    />
                    <span className="text-sm text-white/70">
                      Pzt–Cmt: 09:00–19:00
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/35">
          <p>© {year} {settings?.siteName || "SED Emlak"}. Tüm hakları saklıdır.</p>
          <p>
            Tasarım ve Geliştirme:{" "}
            <a
              href="https://sedminadijital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/50 hover:text-white transition-colors"
            >
              Sedmina Dijital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
