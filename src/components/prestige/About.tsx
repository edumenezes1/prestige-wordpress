import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { MediaSlot } from "./MediaSlot";
import { MaskReveal, CurtainReveal, ParallaxLayer } from "./ScrollAnimations";
import { motionTokens } from "@/lib/prestige/config";
import { ScrollHairline } from "./ScrollHairline";
import { cn } from "@/lib/utils";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="bg-prestige-white section-spacing overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-8 md:gap-20 items-start">
          {/* Label Reveal */}
          <div className="col-span-12 md:col-span-1">
            <div className="flex flex-col items-start gap-4">
              <span className="text-[10px] tracking-widest uppercase text-prestige-charcoal/40">
                01 /
              </span>
              <div className="hidden md:block origin-left rotate-90 translate-y-24 translate-x-4">
                <div className="text-label text-prestige-black whitespace-nowrap opacity-100 flex items-center gap-4 font-medium">
                  <ScrollHairline
                    progress={scrollYProgress}
                    range={[0.1, 0.4]}
                    thickness={1}
                    className="w-8"
                  />
                  ABOUT
                </div>
              </div>
              <div className="md:hidden">
                <SectionLabel label="ABOUT" className="mb-0 text-prestige-black" />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            <MaskReveal>
              <h2 className="display-section text-prestige-black mb-12 max-w-4xl">
                We believe remodeling is more than architecture; it is the art of curating your
                daily life.
              </h2>
            </MaskReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.p
                initial={false}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  ease: motionTokens.ease,
                }}
                className="body text-prestige-charcoal/80"
              >
                Based in Miami, PRESTIGE specializes in high-end residential remodeling that
                balances technical precision with sophisticated aesthetics. Our approach is defined
                by clarity, transparency, and an unwavering commitment to quality.
              </motion.p>

              <div className="space-y-6">
                {["PLAN", "BUILD", "FINISH"].map((item, i) => (
                  <ProcessStep
                    key={item}
                    item={item}
                    index={i}
                    scrollYProgress={scrollYProgress}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 mt-12 md:-mt-20 relative z-10">
            <div className="relative">
              <motion.div
                initial={false}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: motionTokens.ease }}
              >
                <ParallaxLayer strength={prefersReducedMotion ? 0 : 0.025}>
                  <MediaSlot
                    mediaKey="aboutDetail"
                    aspectRatio="aspect-[4/5]"
                    className="rounded-[12px] border border-prestige-charcoal/5 shadow-2xl transition-transform duration-500 hover:scale-[1.015]"
                  />
                </ParallaxLayer>
              </motion.div>

              {/* L-Frame lines */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 pointer-events-none hidden md:block">
                <ScrollHairline
                  progress={scrollYProgress}
                  range={[0.2, 0.45]}
                  direction="vertical"
                  origin="bottom"
                  className="absolute left-0 bottom-0 opacity-30"
                />
                <ScrollHairline
                  progress={scrollYProgress}
                  range={[0.2, 0.45]}
                  direction="horizontal"
                  origin="left"
                  className="absolute left-0 bottom-0 opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  item,
  index,
  scrollYProgress,
  prefersReducedMotion,
}: {
  item: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  prefersReducedMotion: boolean | null;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const start = 0.2 + index * 0.1;
  const end = start + 0.1;

  return (
    <div
      className="flex items-center gap-4 group cursor-default outline-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
    >
      <div className="relative w-24">
        {/* State Base: scaleX(0.18), opacity 0.55-0.7 */}
        <ScrollHairline
          progress={scrollYProgress}
          range={[start, end]}
          thickness={1}
          className={cn(
            "bg-prestige-gold transition-all duration-[420ms] ease-[0.22,1,0.36,1] origin-left",
            isHovered ? "opacity-100" : "opacity-[0.6]",
          )}
          style={{
            scaleX: isHovered ? 1 : 0.18,
          }}
        />
      </div>
      <motion.span
        animate={isHovered && !prefersReducedMotion ? { scale: 1.12, x: 4 } : { scale: 1, x: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0, display: "inline-block" }}
        className={cn(
          "text-label tracking-widest uppercase transition-all duration-[420ms] ease-[0.22,1,0.36,1]",
          isHovered ? "text-prestige-charcoal font-medium" : "text-prestige-charcoal/60",
        )}
      >
        {item}
      </motion.span>
    </div>
  );
}
