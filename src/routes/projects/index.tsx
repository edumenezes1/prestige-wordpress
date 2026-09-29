import { createFileRoute, Link } from "@tanstack/react-router";
import { ProjectsGrid } from "@/components/prestige/ProjectsGrid";
import { BeforeAfter } from "@/components/prestige/BeforeAfter";
import { SectionLabel } from "@/components/prestige/SectionLabel";
import { Header } from "@/components/prestige/Header";
import { Footer } from "@/components/prestige/Footer";

export const Route = createFileRoute("/projects/")({
  component: ProjectsPage,
  head: () => ({
    title: "Projects | PRESTIGE Miami",
    meta: [
      {
        name: "description",
        content:
          "View our portfolio of high-end residential remodeling projects across Miami, including Coconut Grove, Coral Gables, and Miami Beach.",
      },
    ],
  }),
});

function ProjectsPage() {
  return (
    <div className="bg-prestige-black selection:bg-prestige-gold selection:text-prestige-charcoal min-h-screen">
      <Header />
      <main className="pt-[80px] md:pt-[90px]">
        {/* Compact Hero */}
        <section className="bg-prestige-charcoal text-white py-24 md:py-32 border-b border-white/5">
          <div className="container-wide">
            <SectionLabel label="SELECTED PROJECTS" className="text-prestige-gold" />
            <h1 className="display-hero text-white mb-8">
              Spaces,
              <br />
              reconsidered.
            </h1>
            <p className="text-white/60 text-body-large max-w-xl">
              A curated selection of residential transformations that balance structural precision
              with sophisticated design.
            </p>
          </div>
        </section>

        <ProjectsGrid />

        <section className="bg-prestige-black pb-32">
          <BeforeAfter />
        </section>

        <section className="bg-prestige-black py-32 text-center border-t border-white/5">
          <div className="container-wide">
            <h2 className="display-section text-white mb-12">Inspired by these results?</h2>
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
