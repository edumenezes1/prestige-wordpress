import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import prestigeIconAsset from "@/assets/prestige/prestige_icone.webp.asset.json";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 900ms as requested
    const timer = setTimeout(() => setIsVisible(false), 900);
    return () => clearTimeout(timer);
  }, []);

  // Check for prefers-reduced-motion
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[999] bg-prestige-black flex flex-col items-center justify-center"
        >
          <div className="relative flex flex-col items-center">
            <motion.img
              src={prestigeIconAsset.url}
              alt=""
              aria-hidden="true"
              className="w-12 h-12 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />

            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden mb-4">
              <motion.div
                className="absolute inset-0 bg-prestige-gold"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.9, ease: "linear" }}
              />
            </div>

            <motion.span
              className="text-sm tracking-[0.3em] font-medium text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              PRESTIGE
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
