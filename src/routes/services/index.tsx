import { createFileRoute, Link } from "@tanstack/react-router";
import { ServicesAccordion } from "@/components/prestige/ServicesAccordion";
import { SectionLabel } from "@/components/prestige/SectionLabel";
import { Header } from "@/components/prestige/Header";
import { Footer } from "@/components/prestige/Footer";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => ({
    title: "Services | PRESTIGE Miami",
    meta: [
      {
        name: "description",
        content:
          "Professional residential remodeling, renovations, and property maintenance services in Miami.",
      },
    ],
  }),
});

function ServicesPage() {
  return (
    <div className="bg-prestige-black selection:bg-prestige-gold selection:text-prestige-charcoal min-h-screen">
      <Header />
      <main className="pt-[80px] md:pt-[90px]">
        {/* Compact Hero */}
        <section className="bg-prestige-charcoal text-white py-24 md:py-32 border-b border-white/5">
          <div className="container-wide">
            <SectionLabel label="PRESTIGE SERVICES" className="text-prestige-gold" />
            <h1 className="display-hero text-white mb-8">
              One team.
              <br />
              Every stage.
            </h1>
            <p className="text-white/60 text-body-large max-w-xl">
              From interior remodeling to exterior improvements, we manage the entire lifecycle of
              your residential transformation.
            </p>
          </div>
        </section>

        <ServicesAccordion />

        <section className="bg-white py-32 text-prestige-charcoal">
          <div className="container-wide">
            <div className="max-w-4xl">
              <SectionLabel label="THE PRESTIGE PROCESS" className="text-prestige-black/40" />
              <h2 className="display-section text-prestige-black mb-16">
                Clear. Organized. Efficient.
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
                <div>
                  <h3 className="text-lg font-bold tracking-widest text-prestige-gold uppercase mb-4">
                    01 Consultation
                  </h3>
                  <p className="text-prestige-charcoal/70 leading-relaxed">
                    Aligning priorities and vision to define what a successful result feels like for
                    your space.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-widest text-prestige-gold uppercase mb-4">
                    02 Planning
                  </h3>
                  <p className="text-prestige-charcoal/70 leading-relaxed">
                    Meticulous scope definition and scheduling to ensure full transparency and
                    aligned expectations.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-widest text-prestige-gold uppercase mb-4">
                    03 Execution
                  </h3>
                  <p className="text-prestige-charcoal/70 leading-relaxed">
                    Coordinated construction with attention to detail, maintaining a clean home
                    environment.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-widest text-prestige-gold uppercase mb-4">
                    04 Mastery
                  </h3>
                  <p className="text-prestige-charcoal/70 leading-relaxed">
                    A final walkthrough confirming every detail meets our high-end standards before
                    completion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-prestige-black py-32 text-center border-t border-white/5">
          <div className="container-wide">
            <h2 className="display-section text-white mb-12">
              Ready to start your transformation?
            </h2>
            <Link
              to="/contact"
              className="inline-block bg-prestige-gold text-prestige-charcoal px-10 py-5 rounded-xl font-bold text-sm tracking-widest uppercase hover:brightness-105 transition-all shadow-xl"
            >
              Contact Prestige
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
