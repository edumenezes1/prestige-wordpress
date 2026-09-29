import { useState, useEffect, useRef } from "react";
import prestigeIconAsset from "@/assets/prestige/prestige_icone.webp.asset.json";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const focusableElements = mobileMenuRef.current?.querySelectorAll("a, button");
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    } else {
      document.body.style.overflow = "";
      mobileToggleRef.current?.focus();
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Projects", to: "/projects" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-200",
          isScrolled
            ? "bg-[#1b1b1b]/90 h-[68px] md:h-[76px] border-b border-white/8 backdrop-blur-[20px] saturate-[115%]"
            : "bg-[#1b1b1b]/78 h-[80px] md:h-[90px] border-b border-white/6 backdrop-blur-[18px] saturate-[110%]",
        )}
        style={{
          WebkitBackdropFilter: isScrolled
            ? "blur(20px) saturate(115%)"
            : "blur(18px) saturate(110%)",
        }}
      >
        <div className="container-wide h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={prestigeIconAsset.url}
              alt="Prestige Logo"
              className="w-7 h-7 transition-transform group-hover:scale-105"
            />
            <span className="text-lg md:text-xl font-medium tracking-[0.15em] text-white">
              PRESTIGE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-[13px] font-medium tracking-wide text-white/80 hover:text-white transition-colors"
                activeProps={{ className: "text-prestige-gold" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-4 px-8 py-3 rounded-xl bg-prestige-gold text-prestige-charcoal text-[13px] font-bold tracking-wider hover:brightness-105 transition-all active:scale-[0.98] shadow-lg"
            >
              Start Your Project
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            ref={mobileToggleRef}
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-3 -mr-2 min-w-[44px] min-h-[44px] items-end justify-center"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="w-6 h-[1px] bg-white" />
            <span className="w-4 h-[1px] bg-white" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-prestige-charcoal/95 backdrop-blur-xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="container-wide flex justify-between items-center h-[80px] md:h-[90px]">
              <div className="flex items-center gap-3">
                <img src={prestigeIconAsset.url} alt="" className="w-7 h-7" />
                <span className="text-lg font-medium tracking-[0.15em] text-white">PRESTIGE</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 -mr-2 min-w-[44px] min-h-[44px] text-white/60 hover:text-white flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase outline-none focus-visible:ring-1 focus-visible:ring-prestige-gold"
                aria-label="Close Menu"
              >
                CLOSE
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="container-wide flex flex-col justify-center flex-1 gap-6 pb-20">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-light tracking-tight text-white hover:text-prestige-gold transition-colors py-2 focus-visible:text-prestige-gold focus-visible:outline-none block"
                    activeProps={{ className: "text-prestige-gold" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-8 py-5 text-center bg-prestige-gold text-prestige-charcoal rounded-xl font-bold tracking-[0.2em] text-sm uppercase shadow-xl active:scale-[0.98] transition-transform block"
                >
                  START YOUR PROJECT
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
