import Link from "next/link";
import { RiPhoneFill, RiWhatsappFill, RiMailLine, RiBuilding4Line } from "react-icons/ri";

export function ContactBar({ settings }: { settings: any }) {
  const contact = settings?.contactInfo;
  
  // Fallbacks in case Sanity data is missing
  const phone = contact?.phone || "+90 532 000 00 00";
  const email = contact?.email || "info@sedemlak.com";
  const whatsappDisplay = contact?.whatsappNumber || phone;
  
  // Clean strings for href links
  const phoneClean = phone.replace(/[^0-9+]/g, "");
  const waLink = whatsappDisplay.replace(/[^0-9]/g, "");

  return (
    /* bg-background: Arka planı beyaz/açık bırakarak footer'ın koyuluğundan tamamen koparıyoruz. Nefes alır. */
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        
        {/* Floating Card: Lüks, yuvarlak köşeli, gölgeli kutu */}
        <div className="max-w-5xl mx-auto bg-primary rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Dekoratif Arka Plan İkonu (Hafif Şeffaf) */}
          <div className="absolute -right-10 -bottom-10 opacity-[0.07] pointer-events-none">
            <RiBuilding4Line size={350} className="text-white" />
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            
            {/* Sade ve Net Yazı İçeriği */}
            <div className="flex-1 text-center lg:text-left text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Bizimle İletişime Geçin
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-md mx-auto lg:mx-0">
                Gayrimenkul alım, satım ve kiralama süreçlerinizde profesyonel destek almak için bize ulaşın.
              </p>
            </div>
            
            {/* Ana Yönlendirme (İletişim Sayfası) Butonu */}
            <div className="shrink-0 flex justify-center">
              <Link 
                href="/iletisim"
                className="inline-flex items-center justify-center bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-white/90 active:scale-95 transition-all shadow-xl"
              >
                İletişim Formunu Doldur
              </Link>
            </div>
          </div>
          
          {/* Doğrudan İletişim Bağlantıları (Telefon, WA, Email) */}
          <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-12">
            
            {/* Telefon */}
            <a href={`tel:${phoneClean}`} className="flex items-center gap-3.5 text-white/90 hover:text-white transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <RiPhoneFill size={20} />
              </div>
              <div className="text-left">
                <div className="text-[11px] text-white/50 uppercase tracking-widest font-semibold mb-0.5">Telefon</div>
                <div className="font-semibold text-base">{phone}</div>
              </div>
            </a>
            
            {/* WhatsApp */}
            <a href={`https://wa.me/${waLink}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 text-white/90 hover:text-white transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366]/30 transition-colors">
                <RiWhatsappFill size={22} />
              </div>
              <div className="text-left">
                <div className="text-[11px] text-white/50 uppercase tracking-widest font-semibold mb-0.5">WhatsApp</div>
                <div className="font-semibold text-base">{whatsappDisplay}</div>
              </div>
            </a>

            {/* Email */}
            <a href={`mailto:${email}`} className="flex items-center gap-3.5 text-white/90 hover:text-white transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <RiMailLine size={20} />
              </div>
              <div className="text-left">
                <div className="text-[11px] text-white/50 uppercase tracking-widest font-semibold mb-0.5">E-posta</div>
                <div className="font-semibold text-base">{email}</div>
              </div>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
