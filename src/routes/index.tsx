import { Header } from "@/components/prestige/Header";
import { Hero } from "@/components/prestige/Hero";
import { Marquee } from "@/components/prestige/Marquee";
import { About } from "@/components/prestige/About";
import { ServicesAccordion } from "@/components/prestige/ServicesAccordion";
import { ProjectsGrid } from "@/components/prestige/ProjectsGrid";
import { BeforeAfter } from "@/components/prestige/BeforeAfter";
import { Process } from "@/components/prestige/Process";
import { WhyPrestige } from "@/components/prestige/WhyPrestige";
import { ServiceArea } from "@/components/prestige/ServiceArea";
import { ContactForm } from "@/components/prestige/ContactForm";
import { Footer } from "@/components/prestige/Footer";

import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: PrestigeHome,
  head: () => ({
    meta: [
      { title: "Prestige | Remodeling in Miami" },
      {
        name: "description",
        content:
          "Thoughtful residential remodeling, renovations, repairs, and property improvements in Miami, Florida.",
      },
      { property: "og:title", content: "Prestige | Remodeling in Miami" },
      {
        property: "og:description",
        content:
          "Thoughtful residential remodeling, renovations, repairs, and property improvements in Miami, Florida.",
      },
      { name: "theme-color", content: "#0E0E0E" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function PrestigeHome() {
  return (
    <div className="bg-prestige-white selection:bg-prestige-gold selection:text-prestige-charcoal">
      <Header />
      <main id="main-content">
        <Hero />
        <Marquee direction="left" />
        <section id="about">
          <About />
          <div className="container-wide pb-24 flex justify-center">
            <Link
              to="/about"
              className="group flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase text-prestige-charcoal/40 hover:text-prestige-gold transition-colors font-bold"
            >
              Learn More
              <span className="w-8 h-[1px] bg-prestige-gold/20 group-hover:w-12 group-hover:bg-prestige-gold transition-all" />
            </Link>
          </div>
        </section>

        <section id="services">
          <ServicesAccordion />
          <div className="bg-prestige-black pb-24 flex justify-center">
            <Link
              to="/services"
              className="group flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase text-white/40 hover:text-prestige-gold transition-colors font-bold"
            >
              View All Services
              <span className="w-8 h-[1px] bg-prestige-gold/20 group-hover:w-12 group-hover:bg-prestige-gold transition-all" />
            </Link>
          </div>
        </section>

        <section id="projects">
          <ProjectsGrid />
          <div className="bg-prestige-black pb-32 flex justify-center">
            <Link
              to="/projects"
              className="group flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase text-white/40 hover:text-prestige-gold transition-colors font-bold"
            >
              View All Projects
              <span className="w-8 h-[1px] bg-prestige-gold/20 group-hover:w-12 group-hover:bg-prestige-gold transition-all" />
            </Link>
          </div>
        </section>

        <BeforeAfter />
        <Process />
        <WhyPrestige />
        <ServiceArea />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
