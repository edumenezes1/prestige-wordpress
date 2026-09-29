import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { motionTokens } from "@/lib/prestige/config";

export function ScrollReveal({
  children,
  direction = "up",
  distance = 18,
  duration = 0.65,
  once = true,
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{ once, margin: "-10%" }}
      transition={{ duration, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function MaskReveal({
  children,
  duration = 0.65,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{
          duration,
          ease: motionTokens.ease,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function CurtainReveal({ children }: { children: React.ReactNode; delay?: number }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className="relative overflow-hidden">{children}</div>;
  }

  return (
    <div className="relative overflow-hidden w-full h-full bg-prestige-charcoal/5">
      {children}
      <motion.div
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: 1.2,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="absolute inset-0 bg-prestige-charcoal/60 z-20 pointer-events-none backdrop-blur-[2px]"
      />
    </div>
  );
}

export function ParallaxLayer({
  children,
  strength = 0.04,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${strength * 100}%`, `-${strength * 100}%`]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
