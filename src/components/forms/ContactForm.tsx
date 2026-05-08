"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Genel Bilgi",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Ad soyad gereklidir.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon gereklidir.";
    } else if (!/^[0-9\s+()-]+$/.test(formData.phone)) {
      newErrors.phone = "Geçerli bir telefon numarası giriniz.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "E-posta gereklidir.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz.";
    }
    if (!formData.message.trim()) newErrors.message = "Mesaj alanı boş bırakılamaz.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", phone: "", email: "", subject: "Genel Bilgi", message: "" });
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSuccess && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 text-sm">
          Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70 ml-1">Ad Soyad</label>
          <input
            type="text"
            className={`w-full bg-muted/30 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all ${
              errors.name ? "border-red-500 focus:ring-red-500" : "border-transparent"
            }`}
            placeholder="Adınız Soyadınız"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70 ml-1">Telefon</label>
          <input
            type="tel"
            className={`w-full bg-muted/30 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all ${
              errors.phone ? "border-red-500 focus:ring-red-500" : "border-transparent"
            }`}
            placeholder="0555 000 00 00"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.phone}</p>}
        </div>
      </div>
      
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70 ml-1">E-Posta</label>
        <input
          type="email"
          className={`w-full bg-muted/30 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all ${
            errors.email ? "border-red-500 focus:ring-red-500" : "border-transparent"
          }`}
          placeholder="ornek@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.email}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70 ml-1">Konu</label>
        <select
          className="w-full bg-muted/30 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-foreground text-sm cursor-pointer"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        >
          <option>Satılık İlanlar Hakkında</option>
          <option>Kiralık İlanlar Hakkında</option>
          <option>Mülkümü Satmak İstiyorum</option>
          <option>Mülkümü Kiraya Vermek İstiyorum</option>
          <option>Genel Bilgi</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70 ml-1">Mesajınız</label>
        <textarea
          rows={4}
          className={`w-full bg-muted/30 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all resize-none ${
            errors.message ? "border-red-500 focus:ring-red-500" : "border-transparent"
          }`}
          placeholder="Nasıl yardımcı olabiliriz?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        {errors.message && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground font-bold text-base rounded-xl py-4 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-70 flex justify-center items-center cursor-pointer shadow-lg shadow-primary/20"
      >
        {isSubmitting ? (
          <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          "Mesajı Gönder"
        )}
      </button>
    </form>
  );
}
