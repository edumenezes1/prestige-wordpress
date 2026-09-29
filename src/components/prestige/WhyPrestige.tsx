import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { MediaSlot } from "./MediaSlot";
import { MaskReveal, CurtainReveal, ParallaxLayer } from "./ScrollAnimations";
import { motionTokens } from "@/lib/prestige/config";

export function WhyPrestige() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const reasons = [
    {
      title: "Clarity",
      text: "Every project begins with a clear scope and a defined path forward.",
    },
    {
      title: "Precision",
      text: "Technical excellence at every stage, from structural to finishing.",
    },
    {
      title: "Communication",
      text: "You are never left in the dark. Open, honest dialogue is our standard.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="bg-prestige-black section-spacing overflow-hidden border-t border-white/5"
    >
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-8 md:gap-20 items-center">
          <div className="col-span-12 lg:col-span-5">
            <div className="mb-16">
              <SectionLabel label="06 / WHY PRESTIGE" className="text-prestige-gold" />
              <MaskReveal>
                <h2 className="display-section text-white mb-8">
                  Commitment is
                  <br />
                  our foundation.
                </h2>
              </MaskReveal>
            </div>

            <div className="space-y-10 md:space-y-12">
              {reasons.map((reason, idx) => (
                <motion.div
                  key={reason.title}
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="group relative pl-8"
                >
                  <div className="absolute left-0 top-0 w-[1px] h-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="w-full h-full bg-prestige-gold origin-top"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.15 + 0.3 }}
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl text-white mb-3 group-hover:text-prestige-gold transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-white/60 text-body max-w-sm leading-relaxed">{reason.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 mt-20 lg:mt-0 relative aspect-[4/5] md:aspect-[16/9] lg:aspect-auto lg:h-[80vh]">
            <CurtainReveal>
              <ParallaxLayer strength={prefersReducedMotion ? 0 : 0.08}>
                <div className="w-full h-full relative overflow-hidden rounded-[12px] border border-prestige-charcoal/5 bg-prestige-charcoal shadow-2xl min-h-[400px]">
                  <MediaSlot
                    mediaKey="aboutDetail"
                    aspectRatio="aspect-auto"
                    className="w-full h-full object-cover border-0 rounded-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-prestige-black/80 via-transparent to-transparent opacity-60" />

                  {/* Floating Metric */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="absolute bottom-12 left-12 z-10"
                  >
                    <span className="text-6xl md:text-8xl font-light text-prestige-gold leading-none">
                      100%
                    </span>
                    <p className="text-[10px] tracking-[0.4em] uppercase text-white/60 mt-4">
                      PROJECT TRANSPARENCY
                    </p>
                  </motion.div>
                </div>
              </ParallaxLayer>
            </CurtainReveal>

            {/* Decorative Grid Line */}
            <div className="absolute -right-8 top-1/2 w-32 h-[1px] bg-prestige-gold/20 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
