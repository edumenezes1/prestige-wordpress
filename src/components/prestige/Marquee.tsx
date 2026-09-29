import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useReducedMotion, useTransform } from "framer-motion";

export function Marquee({ direction = "left" }: { direction?: "left" | "right" }) {
  const prefersReducedMotion = useReducedMotion();
  const items = ["INTERIORS", "KITCHENS", "BATHROOMS", "EXTERIORS", "CONSTRUCTION", "MAINTENANCE"];
  const { scrollY } = useScroll();

  return (
    <MarqueeContent
      items={items}
      scrollY={scrollY}
      prefersReducedMotion={prefersReducedMotion}
      direction={direction}
    />
  );
}

function MarqueeContent({
  items,
  scrollY,
  prefersReducedMotion,
  direction,
}: {
  items: string[];
  scrollY: any;
  prefersReducedMotion: boolean | null;
  direction: "left" | "right";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [groupWidth, setGroupWidth] = useState(0);

  useEffect(() => {
    if (!trackRef.current) return;
    const updateWidth = () => {
      const firstGroup = trackRef.current?.children[0] as HTMLElement;
      if (firstGroup) setGroupWidth(firstGroup.offsetWidth);
    };
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(trackRef.current);
    updateWidth();
    return () => resizeObserver.disconnect();
  }, []);

  const x = useTransform(scrollY, (latest: number) => {
    if (prefersReducedMotion || !groupWidth) return 0;
    const factor = direction === "left" ? -0.3 : 0.3;
    const movement = latest * factor;
    const wrapped = ((movement % groupWidth) - groupWidth) % groupWidth;
    return wrapped;
  });

  const springX = useSpring(x, {
    damping: 60,
    stiffness: 400,
    mass: 1,
  });

  return (
    <div className="bg-prestige-charcoal py-8 overflow-hidden relative border-y border-white/5 w-full max-w-full marquee-container pointer-events-none">
      <motion.div
        ref={trackRef}
        style={{ x: prefersReducedMotion ? 0 : springX }}
        className="flex items-center whitespace-nowrap will-change-transform w-max marquee-track"
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center flex-shrink-0">
            {items.map((item, index) => (
              <span
                key={`${i}-${index}`}
                className="text-label text-white flex items-center gap-10 px-5"
              >
                {item}
                <span className="w-1.5 h-1.5 rounded-full bg-prestige-gold" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
