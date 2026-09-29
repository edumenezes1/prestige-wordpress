import { useMemo } from "react";
import { mediaManifest } from "../data/mediaManifest";

// Static fallbacks for demo images to ensure they show up even if the dynamic logic is finicky
const DEMO_BASE_URL = "https://images.unsplash.com";
const DEMO_FALLBACKS: Record<string, string> = {
  "demo-hero.webp": `${DEMO_BASE_URL}/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80`,
  "demo-about-detail.webp": `${DEMO_BASE_URL}/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80`,
  "demo-project-01.webp": `${DEMO_BASE_URL}/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80`,
  "demo-project-02.webp": `${DEMO_BASE_URL}/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80`,
  "demo-project-03.webp": `${DEMO_BASE_URL}/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80`,
  "demo-project-04.webp": `${DEMO_BASE_URL}/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80`,
  "demo-before-01.webp": `${DEMO_BASE_URL}/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80`,
  "demo-after-01.webp": `${DEMO_BASE_URL}/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80`,
  "demo-process-detail.webp": `${DEMO_BASE_URL}/photo-1503387762-592dea58ef2e?auto=format&fit=crop&w=800&q=80`,
};

const prestigeAssets = import.meta.glob("../assets/prestige/*.{webp,jpg,jpeg,png,avif,svg}", {
  eager: true,
});

export function useMedia(key: string) {
  return useMemo(() => {
    const slot = mediaManifest[key];
    if (!slot) return null;

    const fileName = slot.fileName;

    // For demo visuals, use Unsplash fallbacks since AI generation is not directly available via Tool Dispatch in this environment
    if (fileName.startsWith("demo-")) {
      return {
        url: DEMO_FALLBACKS[fileName] || `/images/prestige-demo/${fileName}`,
        alt: slot.alt,
      };
    }

    // Match exact filename in the globbed map for src/assets
    const match = Object.entries(prestigeAssets).find(([path]) => path.endsWith(fileName));

    if (match) {
      const mod = match[1] as { default?: string };
      return {
        url: mod.default || (match[1] as string),
        alt: slot.alt,
      };
    }

    return null;
  }, [key]);
}
