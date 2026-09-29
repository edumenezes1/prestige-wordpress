import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/prestige/About";
import { WhyPrestige } from "@/components/prestige/WhyPrestige";
import { SectionLabel } from "@/components/prestige/SectionLabel";
import { MediaSlot } from "@/components/prestige/MediaSlot";
import { MaskReveal } from "@/components/prestige/ScrollAnimations";
import { Link } from "@tanstack/react-router";
import { Header } from "@/components/prestige/Header";
import { Footer } from "@/components/prestige/Footer";

export const Route = createFileRoute("/about/")({
  component: AboutPage,
  head: () => ({
    title: "About | PRESTIGE Miami",
    meta: [
      {
        name: "description",
        content:
          "Learn about PRESTIGE's philosophy and technical precision in high-end Miami residential remodeling.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="bg-prestige-white selection:bg-prestige-gold selection:text-prestige-charcoal min-h-screen">
      <Header />
      <main className="pt-[80px] md:pt-[90px]">
        {/* Compact Hero */}
        <section className="bg-prestige-charcoal text-white py-24 md:py-32 relative overflow-hidden">
          <div className="container-wide relative z-10">
            <SectionLabel label="ABOUT PRESTIGE" className="text-prestige-gold" />
            <h1 className="display-hero text-white mb-8">
              Clarity. Precision.
              <br />
              Sophistication.
            </h1>
            <p className="text-white/60 text-body-large max-w-xl">
              We believe remodeling is more than architecture; it is the art of curating your daily
              life.
            </p>
          </div>
          <div className="absolute inset-0 z-0 opacity-20">
            <MediaSlot
              mediaKey="hero"
              aspectRatio="aspect-auto"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <About />

        <section className="bg-prestige-white section-spacing border-t border-prestige-charcoal/5">
          <div className="container-wide">
            <div className="max-w-4xl">
              <SectionLabel label="OUR PRINCIPLES" className="text-prestige-black/40" />
              <h2 className="display-section text-prestige-black mb-16">
                The foundation of our work.
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <div>
                  <h3 className="text-xl font-bold tracking-widest text-prestige-gold uppercase mb-4">
                    Clarity
                  </h3>
                  <p className="text-prestige-charcoal/70 leading-relaxed">
                    Every project begins with a clear scope and a defined path forward, ensuring
                    expectations are met at every milestone.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-widest text-prestige-gold uppercase mb-4">
                    Precision
                  </h3>
                  <p className="text-prestige-charcoal/70 leading-relaxed">
                    Technical excellence at every stage. We focus on structural integrity and
                    refined aesthetics with unwavering quality.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-widest text-prestige-gold uppercase mb-4">
                    Communication
                  </h3>
                  <p className="text-prestige-charcoal/70 leading-relaxed">
                    Open, honest dialogue is our standard. We keep you informed throughout the
                    transformation of your home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WhyPrestige />

        <section className="bg-prestige-black py-32 text-center">
          <div className="container-wide">
            <h2 className="display-section text-white mb-12">Ready to transform your space?</h2>
            <Link
              to="/contact"
              className="inline-block bg-prestige-gold text-prestige-charcoal px-10 py-5 rounded-xl font-bold text-sm tracking-widest uppercase hover:brightness-105 transition-all shadow-xl"
            >
              Start Your Project
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
