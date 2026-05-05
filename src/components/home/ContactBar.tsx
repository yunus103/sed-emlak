import Link from "next/link";
import { RiPhoneFill, RiWhatsappFill, RiMailLine, RiArrowRightLine } from "react-icons/ri";

export function ContactBar({ settings }: { settings: any }) {
  const contact = settings?.contactInfo;
  const phone = contact?.phone || "+90 532 000 00 00";
  const email = contact?.email || "info@sedemlak.com";
  const waPhone = phone.replace(/[^0-9]/g, "");

  return (
    /* bg-foreground matches Stats + Footer — no seam between them */
    <section className="bg-foreground py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Left: copy */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              Ücretsiz Danışmanlık
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4 leading-tight">
              Hayalinizdeki Mülkü<br className="hidden sm:block" /> Birlikte Bulalım
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
              Satmak, kiralamak ya da yatırım yapmak — hangi aşamada olursanız olun, uzman danışmanlarımız sizi doğru adıma yönlendirir.
            </p>
          </div>

          {/* Right: action buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 shrink-0">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary text-primary-foreground font-semibold px-7 py-3.5 text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
            >
              <RiPhoneFill size={18} />
              {phone}
            </a>
            <a
              href={`https://wa.me/${waPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] text-white font-semibold px-7 py-3.5 text-sm hover:opacity-90 transition-opacity"
            >
              <RiWhatsappFill size={18} />
              WhatsApp
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 text-white/80 font-semibold px-7 py-3.5 text-sm hover:bg-white/10 hover:text-white transition-colors"
            >
              <RiMailLine size={18} />
              E-posta
            </a>
          </div>

        </div>

        {/* Divider + iletişim sayfası yönlendirmesi */}
        <div className="max-w-4xl mx-auto mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>Ofisimizi ziyaret etmek veya forma doldurmak ister misiniz?</p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white font-medium transition-colors group"
          >
            İletişim Sayfasına Git
            <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
