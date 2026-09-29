import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import { useMedia } from "@/hooks/use-media";
import { jumpToContact } from "@/lib/prestige/utils";
import { Link } from "@tanstack/react-router";
import prestigeIconAsset from "@/assets/prestige/prestige_icone.webp.asset.json";

export function Hero() {
  const media = useMedia("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Wave 3/Audit: Controlled scroll video scrubbing
  // Section Height: 400svh as requested for a cinematic feel over 5s video
  const showScrub = !prefersReducedMotion;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Content movement
  const contentOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.18], [0, -16]);

  // Video Effects: Blur and Scale
  const videoBlur = useTransform(scrollYProgress, [0, 0.12], [6, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 0.12], [1.025, 1]);

  // Overlay strength: reduce gradually so video becomes clearer
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.18], [0.4, 0.1]);

  // Hoisted motion values (hooks must never run conditionally)
  const videoFilter = useTransform(videoBlur, (b) => `blur(${b}px)`);
  const legibilityOpacity = useTransform(videoBlur, [0, 20], [0.35, 0.6]);

  // Transition duration in seconds for scrub
  const SCRUB_DURATION = 5;

  useEffect(() => {
    if (!showScrub || !videoRef.current) return;

    const video = videoRef.current;

    const handleMetadata = () => {
      // Set to first frame (0.001) to ensure rendering after metadata loads
      video.currentTime = 0.001;
      setIsVideoReady(true);
    };

    if (video.readyState >= 1) {
      handleMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleMetadata);
    }

    return () => video.removeEventListener("loadedmetadata", handleMetadata);
  }, [showScrub]);

  // Use useMotionValueEvent to update video currentTime without React state cycles
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!showScrub || !videoRef.current) return;

    const video = videoRef.current;
    if (video.readyState < 2) return;

    const targetDuration = video.duration || SCRUB_DURATION;
    const targetTime = latest * (targetDuration - 0.05);

    // Smooth scrub with requestAnimationFrame handled by Framer Motion event
    video.currentTime = Math.max(0.001, targetTime);
  });

  // Mobile optimization: Prime video on first touch
  useEffect(() => {
    const primeVideo = () => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current
          .play()
          .then(() => {
            videoRef.current?.pause();
          })
          .catch(() => {});
      }
      window.removeEventListener("touchstart", primeVideo);
    };
    window.addEventListener("touchstart", primeVideo);
    return () => window.removeEventListener("touchstart", primeVideo);
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative bg-prestige-charcoal overflow-clip ${showScrub ? "h-[400svh]" : "h-[100svh] min-h-[760px]"}`}
    >
      <div
        className={`${showScrub ? "sticky top-0 h-[100svh]" : "relative h-full"} w-full overflow-hidden`}
        style={{ overflow: "clip" }} // Fallback handled by tailwind overflow-hidden
      >
        {/* Media Layer */}
        <div className="absolute inset-0 z-0">
          {!prefersReducedMotion ? (
            <motion.video
              ref={videoRef}
              muted
              playsInline
              preload="metadata"
              controls={false}
              loop={false}
              disablePictureInPicture
              aria-hidden="true"
              style={
                showScrub
                  ? {
                      filter: isMobile ? "none" : videoFilter,
                      scale: videoScale,
                      willChange: "transform",
                    }
                  : {}
              }
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${isVideoReady ? "opacity-100" : "opacity-0"}`}
              poster={media?.url}
            >
              <source
                src={
                  isMobile
                    ? "/videos/prestige-hero-scroll-mobile.mp4"
                    : "/videos/prestige-hero-scroll.mp4"
                }
                type="video/mp4"
              />
              <source src="/videos/prestige-hero-scroll.mp4" type="video/mp4" />
            </motion.video>
          ) : (
            media && (
              <img
                src={media.url}
                alt={media.alt}
                className="w-full h-full object-cover"
                loading="eager"
              />
            )
          )}

          {/* Overlay necessary for legibility */}
          <motion.div
            style={{
              opacity: legibilityOpacity,
              backgroundColor: "#1b1b1b",
            }}
            className="absolute inset-0 z-10"
          />
        </div>

        {/* Content Layer */}
        <motion.div
          style={showScrub ? { opacity: contentOpacity, y: contentY } : {}}
          className="container-wide relative z-10 w-full h-full flex items-center"
        >
          <div className="max-w-2xl">
            <h1 className="display-hero text-white mb-10 leading-[0.9] flex flex-col font-light">
              <span className="opacity-90">Remodeling,</span>
              <span className="text-prestige-gold">built around</span>
              <span className="opacity-90">the way you live.</span>
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <Link
                to="/contact"
                className="bg-prestige-gold text-prestige-charcoal px-10 py-5 rounded-xl font-bold text-sm tracking-wide hover:brightness-105 hover:-translate-y-0.5 transition-all active:translate-y-0 shadow-xl"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Decorative Brand Element */}
        <motion.div
          style={showScrub ? { opacity: contentOpacity } : {}}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 md:left-auto md:right-20 md:translate-x-0 z-10 hidden md:flex flex-col items-center md:items-end gap-12"
        >
          <div className="flex items-center gap-3 opacity-60">
            <img src={prestigeIconAsset.url} alt="" className="w-5 h-5" />
            <span className="text-xs tracking-widest text-white">PRESTIGE</span>
          </div>

          <div className="w-[1px] h-20 bg-gradient-to-b from-prestige-gold to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-white"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
