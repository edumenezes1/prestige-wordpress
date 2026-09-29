import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useReducedMotion,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { MediaSlot } from "./MediaSlot";
import { MaskReveal } from "./ScrollAnimations";
import { ScrollHairline } from "./ScrollHairline";
import { PROCESS_VIDEO_SRC, PROCESS_VIDEO_POSTER, PROCESS_FALLBACK_IMAGE } from "@/config/media";

interface Step {
  id: string;
  title: string;
  label: string;
  description: string;
}

const steps: Step[] = [
  {
    id: "01",
    title: "Consultation",
    label: "ALIGNMENT",
    description:
      "We begin by understanding the space, the priorities, and what a successful result should feel like for you.",
  },
  {
    id: "02",
    title: "Scope & Planning",
    label: "PRECISION",
    description:
      "The project is organized into a clear scope, practical sequence, and aligned expectations with full transparency.",
  },
  {
    id: "03",
    title: "Construction",
    label: "EXECUTION",
    description:
      "Work is coordinated with meticulous attention to detail, maintaining a clean home and open communication.",
  },
  {
    id: "04",
    title: "Completion",
    label: "MASTERY",
    description:
      "A thorough walkthrough ensures every finish meets our standard before we consider the project finished.",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    const stepIdx = Math.min(Math.floor(latest * steps.length), steps.length - 1);
    if (stepIdx !== activeStep) {
      setActiveStep(stepIdx);
    }
  });

  if (prefersReducedMotion) {
    return (
      <section className="bg-prestige-white section-spacing">
        <div className="container-wide">
          <SectionLabel label="05 / PROCESS" className="text-prestige-black/40" />
          <h2 className="display-section text-prestige-black mb-20">From vision to completion.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step) => (
              <div key={step.id} className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] tracking-[0.3em] text-prestige-gold">{step.id}</span>
                  <span className="text-[10px] tracking-[0.4em] uppercase text-prestige-charcoal/40 font-bold">
                    {step.label}
                  </span>
                </div>
                <h3 className="text-2xl font-light tracking-tight text-prestige-black">
                  {step.title}
                </h3>
                <p className="text-prestige-charcoal/70 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="bg-prestige-white relative">
      <div className="h-[460svh] relative">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div className="container-wide w-full">
            <div className="grid grid-cols-12 gap-8 md:gap-20 items-center">
              {/* Left Side: Text Content */}
              <div className="col-span-12 lg:col-span-5 z-10 relative">
                <div className="mb-16">
                  <SectionLabel label="05 / PROCESS" className="text-prestige-black/40" />
                  <MaskReveal>
                    <h2 className="display-section text-prestige-black">
                      From vision to
                      <br />
                      final walkthrough.
                    </h2>
                  </MaskReveal>
                </div>

                <div className="relative h-[240px]">
                  <AnimatePresence mode="wait">
                    {steps[activeStep] && (
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0.7, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0.7, y: -8 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex flex-col justify-start"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-[10px] tracking-[0.3em] text-prestige-gold">
                            {steps[activeStep].id}
                          </span>
                          <div className="h-[1px] w-8 bg-prestige-gold/30" />
                          <span className="text-[10px] tracking-[0.4em] uppercase text-prestige-charcoal/40 font-bold">
                            {steps[activeStep].label}
                          </span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-light tracking-tight text-prestige-black mb-8">
                          {steps[activeStep].title}
                        </h3>
                        <p className="text-prestige-charcoal/70 text-lg leading-relaxed max-w-md">
                          {steps[activeStep].description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-12 w-full max-w-xs relative h-[1px] bg-prestige-charcoal/10 overflow-hidden">
                  <ScrollHairline
                    progress={scrollYProgress}
                    range={[0, 1]}
                    thickness={1}
                    color="bg-prestige-gold"
                  />
                </div>
              </div>

              {/* Right Side: ProcessScrollVideo (with Fallback) */}
              <div className="col-span-12 lg:col-span-7 relative h-[60vh] lg:h-[75vh]">
                <ProcessScrollVideo progress={scrollYProgress} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessScrollVideo({ progress }: { progress: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(!PROCESS_VIDEO_SRC);

  useMotionValueEvent(progress, "change", (latest: number) => {
    if (hasError || !videoRef.current || videoRef.current.readyState < 2) return;
    const video = videoRef.current;
    const targetTime = latest * (video.duration || 1);
    video.currentTime = Math.max(0.001, targetTime);
  });

  return (
    <div className="w-full h-full rounded-[12px] overflow-hidden border border-prestige-charcoal/5 bg-prestige-charcoal shadow-2xl relative">
      {!hasError ? (
        <video
          ref={videoRef}
          src={PROCESS_VIDEO_SRC}
          poster={PROCESS_VIDEO_POSTER}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <MediaSlot
          mediaKey={PROCESS_FALLBACK_IMAGE as any}
          aspectRatio="aspect-auto"
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-tr from-prestige-black/60 to-transparent mix-blend-multiply opacity-40 pointer-events-none" />
    </div>
  );
}
