import prestigeIconAsset from "@/assets/prestige/prestige_icone.webp.asset.json";
import { motion, useReducedMotion } from "framer-motion";
import { motionTokens } from "@/lib/prestige/config";
import { contactData } from "@/lib/prestige/contact";
import { Link } from "@tanstack/react-router";

export function Footer() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer className="bg-prestige-charcoal text-white pt-32 pb-16 border-t border-white/5 overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={false}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: motionTokens.ease }}
          className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-32"
        >
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-10 group">
              <img
                src={prestigeIconAsset.url}
                alt="Prestige brand mark"
                className="w-10 h-10 transition-transform group-hover:scale-110"
              />
              <span className="text-2xl font-medium tracking-[0.2em] text-white">PRESTIGE</span>
            </div>
            <p className="text-white/40 max-w-sm text-body leading-relaxed">
              High-end residential remodeling in Miami. We believe in clarity of process and care in
              execution.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] tracking-widest uppercase text-prestige-gold mb-10">
              NAVIGATION
            </h4>
            <ul className="space-y-6 text-2xl">
              {[
                { label: "Home", to: "/" },
                { label: "About", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Projects", to: "/projects" },
                { label: "Contact", to: "/contact" },
              ].map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={false}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.1 + i * 0.05 }}
                >
                  <Link to={link.to} className="text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[10px] tracking-widest uppercase text-prestige-gold mb-10">
              CONTACT
            </h4>
            <ul className="space-y-6 text-body text-white/60">
              <li>
                <span className="text-[9px] tracking-widest uppercase block text-white/30 mb-1">
                  LOCATION
                </span>
                <span className="text-white transition-colors">{contactData.location}</span>
              </li>
              <li>
                <span className="text-[9px] tracking-widest uppercase block text-white/30 mb-1">
                  CALL / WHATSAPP
                </span>
                <a href={contactData.phoneHref} className="hover:text-white transition-colors">
                  {contactData.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="text-[9px] tracking-widest uppercase block text-white/30 mb-1">
                  EMAIL
                </span>
                <a
                  href={`mailto:${contactData.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {contactData.email}
                </a>
              </li>
              <li>
                <span className="text-[9px] tracking-widest uppercase block text-white/30 mb-1">
                  SOCIAL
                </span>
                <a
                  href={contactData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 gap-8">
          <div className="flex items-center gap-8">
            <p className="text-[10px] tracking-widest uppercase text-white/30">© 2026 PRESTIGE</p>
            <span className="text-[10px] tracking-widest uppercase text-white/10 hidden md:block">
              /
            </span>
            <p className="text-[10px] tracking-widest uppercase text-white/30">
              RESIDENTIAL REMODELING
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-4 text-[10px] tracking-widest uppercase text-white/40 hover:text-white transition-colors outline-none focus-visible:ring-1 p-2"
            aria-label="Back to Top"
          >
            BACK TO TOP
            <motion.span
              animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-8 h-[1px] bg-white/10 group-hover:bg-white"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
