import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionLabel } from "./SectionLabel";
import { MediaSlot } from "./MediaSlot";
import { CurtainReveal, MaskReveal, ParallaxLayer } from "./ScrollAnimations";
import { motionTokens } from "@/lib/prestige/config";
import { Link } from "@tanstack/react-router";

export function ProjectsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const projects = [
    {
      id: "01",
      title: "Monolithic Stone Kitchen",
      type: "KITCHEN REMODEL",
      location: "Coconut Grove, FL",
      coords: "25.7126° N, 80.2576° W",
      mediaKey: "project01",
      colSpan: "md:col-span-7",
      aspect: "aspect-[4/3]",
    },
    {
      id: "02",
      title: "Travertine Master Bath",
      type: "BATHROOM REMODEL",
      location: "Coral Gables, FL",
      coords: "25.7476° N, 80.2595° W",
      mediaKey: "project02",
      colSpan: "md:col-span-5 md:mt-32",
      aspect: "aspect-[3/4]",
    },
    {
      id: "03",
      title: "Minimalist Living Space",
      type: "FULL RENOVATION",
      location: "Key Biscayne, FL",
      coords: "25.6937° N, 80.1631° W",
      mediaKey: "project03",
      colSpan: "md:col-span-5",
      aspect: "aspect-[3/4]",
    },
    {
      id: "04",
      title: "Exterior Pool Lounge",
      type: "EXTERIOR REMODEL",
      location: "Miami Beach, FL",
      coords: "25.7907° N, 80.1300° W",
      mediaKey: "project04",
      colSpan: "md:col-span-7 md:-mt-20",
      aspect: "aspect-[16/10]",
    },
  ];

  return (
    <section ref={containerRef} className="bg-prestige-black section-spacing overflow-hidden">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div>
            <SectionLabel label="03 / SELECTED PROJECTS" className="text-prestige-gold" />
            <MaskReveal>
              <h2 className="display-section text-white">Spaces, reconsidered.</h2>
            </MaskReveal>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-16 lg:gap-24">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0.82, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={cn("col-span-12 group relative", project.colSpan)}
            >
              <Link to="/projects" className="block outline-none">
                <div className="relative overflow-hidden rounded-[12px] border border-prestige-charcoal/5 bg-prestige-charcoal aspect-video md:aspect-auto">
                  <CurtainReveal>
                    <ParallaxLayer strength={prefersReducedMotion ? 0 : 0.05}>
                      <MediaSlot
                        mediaKey={project.mediaKey}
                        aspectRatio={project.aspect}
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[0.22,1,0.36,1] group-hover:scale-[1.02] border-0 rounded-0"
                      />
                    </ParallaxLayer>
                  </CurtainReveal>

                  {/* Subtle Darkening Overlay */}
                  <div className="absolute inset-0 bg-[#1B1B1B]/18 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-end border-t border-white/5 pt-6">
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-prestige-gold font-bold">
                        {project.type}
                      </span>
                      <h3 className="text-xl md:text-2xl text-white font-light tracking-tight group-hover:text-prestige-gold transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-[11px] tracking-widest text-white/60 uppercase">
                        {project.location}
                      </p>
                      <div className="relative overflow-hidden w-fit">
                        <span className="text-[9px] tracking-widest text-prestige-gold block font-montserrat">
                          {project.coords}
                        </span>
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.12 + 0.4 }}
                          style={{ originX: 0 }}
                          className="absolute bottom-0 left-0 w-full h-[1px] bg-prestige-gold/30"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="text-4xl font-light text-white/5 group-hover:text-prestige-gold/20 transition-colors duration-500 leading-none">
                      {project.id}
                    </span>
                    <h4 className="text-[9px] tracking-[0.3em] uppercase text-white/40">
                      CASE {project.id}
                    </h4>
                    <div className="w-12 h-[1px] bg-white/10 group-hover:w-20 group-hover:bg-prestige-gold transition-all duration-500" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
