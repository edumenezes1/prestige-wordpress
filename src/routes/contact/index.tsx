import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/prestige/ContactForm";
import { ServiceArea } from "@/components/prestige/ServiceArea";
import { SectionLabel } from "@/components/prestige/SectionLabel";
import { Header } from "@/components/prestige/Header";
import { Footer } from "@/components/prestige/Footer";
import { contactData } from "@/lib/prestige/contact";
import { MapPin, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/contact/")({
  component: ContactPage,
  head: () => ({
    title: "Contact | PRESTIGE Miami",
    meta: [
      {
        name: "description",
        content:
          "Get in touch with PRESTIGE for your high-end residential remodeling project in Miami.",
      },
    ],
  }),
});

function ContactPage() {
  return (
    <div className="bg-white selection:bg-prestige-gold selection:text-prestige-charcoal min-h-screen">
      <Header />
      <main className="pt-[80px] md:pt-[90px]">
        {/* Contact Hero Panel */}
        <section className="bg-prestige-charcoal text-white py-24 md:py-32 overflow-hidden relative">
          <div className="container-wide relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <SectionLabel label="CONTACT PRESTIGE" className="text-prestige-gold" />
                <h1 className="display-hero text-white mb-12">
                  Start the
                  <br />
                  conversation.
                </h1>

                <div className="space-y-10">
                  <div className="flex items-start gap-6">
                    <div className="mt-1 p-3 bg-white/5 rounded-xl text-prestige-gold">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-widest uppercase text-white/40 block mb-1">
                        LOCATION
                      </span>
                      <span className="text-xl font-light">{contactData.location}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="mt-1 p-3 bg-white/5 rounded-xl text-prestige-gold">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-widest uppercase text-white/40 block mb-1">
                        PHONE / WHATSAPP
                      </span>
                      <a
                        href={contactData.phoneHref}
                        className="text-xl font-light hover:text-prestige-gold transition-colors"
                      >
                        {contactData.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="mt-1 p-3 bg-white/5 rounded-xl text-prestige-gold">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-widest uppercase text-white/40 block mb-1">
                        EMAIL
                      </span>
                      <a
                        href={`mailto:${contactData.email}`}
                        className="text-xl font-light hover:text-prestige-gold transition-colors break-all"
                      >
                        {contactData.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="mt-1 p-3 bg-white/5 rounded-xl text-prestige-gold">
                      <div className="w-6 h-6 flex items-center justify-center font-bold text-xs">
                        IG
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] tracking-widest uppercase text-white/40 block mb-1">
                        SOCIAL
                      </span>
                      <a
                        href={contactData.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-light hover:text-prestige-gold transition-colors"
                      >
                        {contactData.instagramHandle}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block relative aspect-square">
                <div className="absolute inset-0 border border-prestige-gold/20 rounded-full animate-pulse" />
                <div className="absolute inset-10 border border-prestige-gold/10 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-[120px] font-thin text-prestige-gold/10 leading-none">
                      MIA
                    </span>
                    <p className="text-[10px] tracking-[0.5em] text-prestige-gold/40 mt-4">
                      ESTABLISHED 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-prestige-gold/[0.02] pointer-events-none" />
        </section>

        <ContactForm />

        <ServiceArea />
      </main>
      <Footer />
    </div>
  );
}
