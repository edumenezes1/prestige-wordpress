import { useRef } from "react";
import { SectionLabel } from "./SectionLabel";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MaskReveal } from "./ScrollAnimations";
import { Link } from "@tanstack/react-router";

export function ServiceArea() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // MIAMI text horizontal shift (up to 6%)
  const miamiX = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      ref={containerRef}
      className="bg-prestige-white section-spacing overflow-clip relative isolation-auto"
      style={{ isolation: "isolate" }}
    >
      {/* Monumental Miami Text */}
      <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center z-0 overflow-hidden">
        <motion.div
          style={prefersReducedMotion ? { x: 0 } : { x: miamiX }}
          className="aria-hidden:true pointer-events-none select-none whitespace-nowrap"
        >
          <span className="text-[25vw] font-black text-prestige-black/[0.035] leading-none pointer-events-none select-none block uppercase">
            MIAMI FLORIDA
          </span>
        </motion.div>
      </div>

      <div className="container-wide relative z-[2]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8 lg:col-span-7">
            <div>
              <div>
                <SectionLabel label="07 / SERVICE AREA" className="text-prestige-black/40" />
                <MaskReveal>
                  <h2 className="display-section text-prestige-black mb-8">
                    Serving Miami and nearby communities.
                  </h2>
                </MaskReveal>
              </div>
              <motion.p
                initial={false}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-body-lg text-prestige-charcoal/60 max-w-xl mb-12"
              >
                Prestige provides residential remodeling and improvement services throughout Miami
                and surrounding areas.
              </motion.p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-start sm:items-center pb-12 sm:pb-0">
              <Link
                to="/contact"
                className="group flex items-center gap-6 text-2xl md:text-3xl text-prestige-black hover:text-prestige-gold transition-colors"
              >
                Check Your Location
                <span className="w-16 h-[1px] bg-prestige-gold transition-all group-hover:w-24" />
              </Link>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] tracking-widest uppercase text-prestige-black/40 leading-none">
                  COORDINATES
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-prestige-gold" />
                  <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-prestige-gold leading-none font-medium">
                    25.7617° N · 80.1918° W
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
