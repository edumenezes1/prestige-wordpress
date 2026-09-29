import { useState } from "react";
import { Send, MapPin, Phone, Mail, Paperclip, X } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { cn } from "@/lib/utils";
import { contactData } from "@/lib/prestige/contact";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const whatsappMessage = `Olá! Meu nome é ${formData.name}.
Email: ${formData.email}
Telefone: ${formData.phone}
Mensagem: ${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${contactData.whatsappNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setAttachment(null);
    }, 800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  return (
    <section className="bg-white section-spacing overflow-hidden border-t border-prestige-charcoal/5">
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-12 lg:gap-24">
          {/* Info Side */}
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-1">
            <div className="bg-prestige-charcoal text-white p-10 md:p-16 rounded-2xl shadow-2xl relative overflow-hidden group">
              {/* Decorative Element */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-prestige-gold/5 rounded-full blur-3xl group-hover:bg-prestige-gold/10 transition-colors duration-700" />

              <SectionLabel label="08 / CONTACT" className="text-prestige-gold mb-12" />

              <h3 className="text-3xl md:text-4xl font-light mb-12 tracking-tight">
                Let's discuss your
                <br />
                next transformation.
              </h3>

              <div className="space-y-10 relative z-10">
                <ContactInfoItem
                  icon={<MapPin className="w-5 h-5 text-prestige-gold" />}
                  label="Location"
                  value={contactData.location}
                />
                <ContactInfoItem
                  icon={<Phone className="w-5 h-5 text-prestige-gold" />}
                  label="Phone / WhatsApp"
                  value={contactData.phoneDisplay}
                  link={contactData.phoneHref}
                />
                <ContactInfoItem
                  icon={<Mail className="w-5 h-5 text-prestige-gold" />}
                  label="Email"
                  value={contactData.email}
                  link={`mailto:${contactData.email}`}
                  className="break-all"
                />
              </div>

              <div className="mt-20 pt-10 border-t border-white/10 flex gap-6">
                <a
                  href={contactData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-prestige-gold transition-colors outline-none focus-visible:text-prestige-gold"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="col-span-12 lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
            <div className="max-w-xl">
              <h2 className="display-section text-prestige-black mb-12">Start the conversation.</h2>

              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <FloatingInput
                    label="Full Name"
                    value={formData.name}
                    onChange={(v: string) => setFormData({ ...formData, name: v })}
                    required
                  />
                  <FloatingInput
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(v: string) => setFormData({ ...formData, email: v })}
                    required
                  />
                </div>

                <FloatingInput
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(v: string) => setFormData({ ...formData, phone: v })}
                  required
                />

                <FloatingInput
                  label="Tell us about your project"
                  value={formData.message}
                  onChange={(v: string) => setFormData({ ...formData, message: v })}
                  textarea
                  required
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative bg-prestige-gold text-prestige-charcoal px-10 py-5 rounded-xl font-bold text-sm tracking-widest uppercase overflow-hidden transition-all hover:brightness-105 active:scale-[0.98] disabled:opacity-50 w-full sm:w-auto text-center shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-prestige-gold focus-visible:ring-offset-2"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? "Sending..." : "Send via WhatsApp"}
                      {!isSubmitting && <Send className="w-4 h-4" />}
                    </span>
                  </button>

                  <div className="relative w-full sm:w-auto">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center gap-3 text-[11px] tracking-widest uppercase text-prestige-charcoal/50 hover:text-prestige-gold cursor-pointer transition-colors px-4 py-2 border border-dashed border-prestige-charcoal/20 rounded-lg hover:border-prestige-gold/50 outline-none focus-within:border-prestige-gold"
                    >
                      {attachment ? (
                        <>
                          <span className="truncate max-w-[120px]">{attachment.name}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setAttachment(null);
                            }}
                            className="hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <>
                          <Paperclip className="w-3 h-3" />
                          Attach Project Files
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <p className="text-[10px] text-prestige-charcoal/40 tracking-[0.2em] uppercase leading-relaxed max-w-xs">
                  * BY SUBMITTING, YOU AGREE TO OUR PRIVACY POLICY AND TERMS OF SERVICE.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfoItem({ icon, label, value, subValue, link, className }: any) {
  const content = (
    <div className={cn("group flex items-start gap-6", className)}>
      <div className="mt-1 p-3 bg-white/5 rounded-xl group-hover:bg-prestige-gold/10 transition-colors duration-300">
        {icon}
      </div>
      <div>
        <span className="text-[10px] tracking-widest uppercase text-white/40 block mb-1">
          {label}
        </span>
        <span className="text-lg font-light group-hover:text-prestige-gold transition-colors duration-300">
          {value}
        </span>
        {subValue && <span className="block text-sm text-white/30 mt-1">{subValue}</span>}
      </div>
    </div>
  );

  return link ? (
    <a
      href={link}
      className="block outline-none focus-visible:ring-1 focus-visible:ring-prestige-gold rounded-lg p-1 -m-1"
    >
      {content}
    </a>
  ) : (
    content
  );
}

function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
  required = false,
}: any) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full group">
      <label
        className={cn(
          "absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-widest text-[10px]",
          isFocused || value
            ? "-top-6 text-prestige-black opacity-100"
            : "top-4 text-prestige-charcoal/80 opacity-[0.72]",
        )}
      >
        {label} {required && "*"}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent border-b border-prestige-charcoal/20 py-4 outline-none focus:border-prestige-gold transition-all text-prestige-black resize-none min-h-[120px] placeholder:opacity-0 caret-prestige-gold"
          required={required}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent border-b border-prestige-charcoal/20 py-4 outline-none focus:border-prestige-gold transition-all text-prestige-black placeholder:opacity-0 caret-prestige-gold"
          required={required}
        />
      )}
    </div>
  );
}
