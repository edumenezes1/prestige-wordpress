import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionLabel } from "./SectionLabel";
import { motionTokens } from "@/lib/prestige/config";

const services = [
  {
    id: "01",
    title: "Interior Remodeling",
    description: "Complete interior improvements planned as one coherent project.",
    items: [
      "Interior remodeling",
      "Complete renovations",
      "Bathroom remodeling",
      "Kitchen remodeling",
      "Flooring installation",
      "Interior painting",
    ],
  },
  {
    id: "02",
    title: "Exterior Improvements",
    description: "Exterior upgrades designed to improve appearance, durability, and everyday use.",
    items: ["Exterior remodeling", "Exterior painting", "Hardscape", "Patio and deck remodeling"],
  },
  {
    id: "03",
    title: "Construction & Installation",
    description: "Coordinated construction and installation work for residential spaces.",
    items: [
      "New construction",
      "Window and door installation",
      "Framing",
      "Stucco",
      "Drywall installation",
      "General installations",
    ],
  },
  {
    id: "04",
    title: "Repairs & Maintenance",
    description: "Reliable support for repairs, upkeep, and practical improvements.",
    items: ["Property maintenance", "Repairs", "General maintenance", "Handyman services"],
  },
];

export function ServicesAccordion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollIndex = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0, 1, 2, 3]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    return scrollIndex.on("change", (latest) => {
      const idx = Math.min(Math.floor(latest + 0.1), 3);
      if (idx !== activeIdx) {
        setActiveIdx(idx);
      }
    });
  }, [scrollIndex, activeIdx, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "bg-prestige-black text-white relative",
        prefersReducedMotion ? "section-spacing" : "h-[500svh]",
      )}
    >
      <div
        className={cn(
          "w-full z-10",
          !prefersReducedMotion &&
            "sticky top-0 h-screen lg:h-[100svh] flex flex-col justify-center overflow-hidden lg:overflow-visible z-10",
        )}
      >
        <div className="container-wide py-16 md:py-24">
          <div className="grid grid-cols-12 gap-8 md:gap-20 items-start">
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-5 relative">
              <div className="mb-20">
                <SectionLabel label="02 / SERVICES" className="text-white/40" />
                <h2 className="display-section mb-8">One team. Every stage.</h2>
                <p className="text-white/60 text-body-large max-w-md">
                  We manage the entire lifecycle of your project, from initial planning through
                  final finishing touches.
                </p>
              </div>

              {/* Service Progress Line - Hairline style */}
              {!prefersReducedMotion && (
                <div className="hidden lg:block absolute left-[-40px] top-[140px] bottom-0 w-[1px] bg-white/5">
                  <motion.div
                    style={{ scaleY: scrollYProgress, originY: 0 }}
                    className="w-full h-full bg-prestige-gold"
                  />
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="col-span-12 lg:col-span-7 space-y-4">
              {services.map((service, idx) => (
                <button
                  key={service.id}
                  className={cn(
                    "group relative p-8 md:p-12 rounded-2xl transition-all duration-500 cursor-pointer overflow-hidden block w-full text-left outline-none focus-visible:ring-1 focus-visible:ring-prestige-gold",
                    activeIdx === idx
                      ? "bg-prestige-graphite opacity-100"
                      : "bg-transparent opacity-[0.58] grayscale hover:opacity-75",
                  )}
                  onClick={() => setActiveIdx(idx)}
                  aria-expanded={activeIdx === idx}
                  aria-controls={`service-content-${service.id}`}
                >
                  {/* Active Indicator Line */}
                  <motion.div
                    className={cn(
                      "absolute top-0 left-8 md:left-12 h-[2px] bg-prestige-gold origin-left transition-all duration-500",
                      activeIdx === idx ? "w-20 opacity-100" : "w-0 opacity-0",
                    )}
                  />

                  <div className="flex flex-col md:flex-row gap-8 md:items-start text-left w-full">
                    <span
                      className={cn(
                        "text-xl tracking-widest uppercase transition-colors duration-300",
                        activeIdx === idx ? "text-prestige-gold" : "text-white/40",
                      )}
                    >
                      {service.id}
                    </span>
                    <div className="flex-1">
                      <h3 className="display-section mb-6 text-2xl md:text-4xl">{service.title}</h3>

                      <AnimatePresence initial={false}>
                        {activeIdx === idx && (
                          <motion.div
                            id={`service-content-${service.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: motionTokens.ease }}
                            className="overflow-hidden"
                          >
                            <p className="text-white/60 text-body mb-8 max-w-lg">
                              {service.description}
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                              {service.items.map((item, i) => (
                                <li
                                  key={item}
                                  className="flex items-center gap-3 text-sm text-white/50"
                                >
                                  <span className="w-1 h-1 bg-prestige-gold/40 rounded-full" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
