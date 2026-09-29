import { useState, useRef, useCallback } from "react";
import { SectionLabel } from "./SectionLabel";
import { cn } from "@/lib/utils";
import { useMedia } from "@/hooks/use-media";
import { DEMO_VISUALS } from "@/lib/prestige/config";

export function BeforeAfter() {
  const [activeCase, setActiveCase] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const cases = [
    {
      id: "01",
      before: useMedia("ba01-before"),
      after: useMedia("ba01-after"),
    },
    {
      id: "02",
      before: useMedia("project01"),
      after: useMedia("project02"),
    },
    {
      id: "03",
      before: useMedia("project03"),
      after: useMedia("project04"),
    },
  ];

  const currentCase = cases[activeCase] || cases[0];

  const handleCaseChange = (index: number) => {
    setActiveCase(index);
    setSliderPosition(50);
  };

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        setSliderPosition((prev) => Math.max(0, prev - 2));
        break;
      case "ArrowRight":
      case "ArrowUp":
        setSliderPosition((prev) => Math.min(100, prev + 2));
        break;
      case "PageUp":
        setSliderPosition((prev) => Math.min(100, prev + 10));
        break;
      case "PageDown":
        setSliderPosition((prev) => Math.max(0, prev - 10));
        break;
      case "Home":
        setSliderPosition(0);
        break;
      case "End":
        setSliderPosition(100);
        break;
    }
  };

  return (
    <section className="bg-prestige-black text-white section-spacing overflow-hidden">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24">
          <div className="max-w-2xl">
            <SectionLabel label="04 / BEFORE & AFTER" className="text-white/40" />
            <h2 className="display-section mb-6">Dramatic transformation.</h2>
            <p className="text-white/60 text-body-large">
              Precision in planning leads to clarity in execution. Compare the original space with
              our high-end remodeling result.
            </p>
          </div>

          <div className="flex gap-8">
            {cases.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleCaseChange(i)}
                className={cn(
                  "flex flex-col gap-2 text-left outline-none focus-visible:ring-1 rounded transition-all duration-300",
                  activeCase === i ? "opacity-100" : "opacity-20 hover:opacity-40",
                )}
                aria-label={`View Case ${c.id}`}
                aria-pressed={activeCase === i}
              >
                <span
                  className={cn(
                    "text-[10px] tracking-widest uppercase",
                    activeCase === i ? "text-prestige-gold" : "text-white",
                  )}
                >
                  CASE
                </span>
                <span className="text-5xl font-light">{c.id}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative aspect-[16/10] md:aspect-[21/9] w-full bg-prestige-charcoal rounded-2xl overflow-hidden cursor-none select-none border border-white/10 touch-none focus-visible:ring-2 focus-visible:ring-prestige-gold"
          tabIndex={0}
          aria-label="Before and after comparison slider container. Move mouse or use arrow keys to adjust."
          onKeyDown={handleKeyDown}
          onPointerMove={(e) => handleMove(e.clientX)}
        >
          {/* After Image */}
          <div className="absolute inset-0">
            {currentCase?.after && (
              <img
                src={currentCase.after.url}
                alt={currentCase.after.alt}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Before Image (Revealed by width) */}
          <div
            className="absolute inset-0 z-10 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="w-[100vw] h-full absolute top-0 left-0">
              {currentCase?.before && (
                <img
                  src={currentCase.before.url}
                  alt={currentCase.before.alt}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Slider Handle (Hairline style) */}
          <div
            className="absolute top-0 bottom-0 z-20 w-[1px] bg-prestige-gold pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Custom Mouse Follower Circle */}
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-prestige-gold/50 bg-prestige-black/20 backdrop-blur-sm flex items-center justify-center shadow-2xl transition-transform">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[8px] tracking-[0.2em] text-white/40 uppercase">SCAN</span>
                <div className="flex gap-1.5 items-center">
                  <div className="w-1 h-1 bg-prestige-gold rounded-full" />
                  <div className="w-1 h-1 bg-prestige-gold rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Text Labels */}
          <div className="absolute top-8 left-8 z-30 pointer-events-none">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 bg-prestige-black/40 backdrop-blur-md px-4 py-2 border border-white/5">
              BEFORE
            </span>
          </div>
          <div className="absolute top-8 right-8 z-30 pointer-events-none">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 bg-prestige-black/40 backdrop-blur-md px-4 py-2 border border-white/5">
              AFTER
            </span>
          </div>

          {DEMO_VISUALS && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-[10px] tracking-widest uppercase text-white/20">
              CONCEPT VISUAL · TEMPORARY
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
