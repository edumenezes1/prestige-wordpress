export type MediaSlot = {
  key: string;
  fileName: string;
  alt: string;
  type: "hero" | "about" | "project" | "before-after" | "process";
};

export const mediaManifest: Record<string, MediaSlot> = {
  hero: {
    key: "hero",
    fileName: "demo-hero.webp",
    alt: "Luxury Miami residence remodeling - cinematic architectural photography (concept visual)",
    type: "hero",
  },
  aboutDetail: {
    key: "aboutDetail",
    fileName: "demo-about-detail.webp",
    alt: "Premium remodeling craftsmanship detail (concept visual)",
    type: "about",
  },
  project01: {
    key: "project01",
    fileName: "demo-project-01.webp",
    alt: "High-end remodeled Miami kitchen (concept visual)",
    type: "project",
  },
  project02: {
    key: "project02",
    fileName: "demo-project-02.webp",
    alt: "Luxury remodeled bathroom in Miami (concept visual)",
    type: "project",
  },
  project03: {
    key: "project03",
    fileName: "demo-project-03.webp",
    alt: "Contemporary remodeled Miami living room (concept visual)",
    type: "project",
  },
  project04: {
    key: "project04",
    fileName: "demo-project-04.webp",
    alt: "High-end residential patio and exterior remodeling in Miami (concept visual)",
    type: "project",
  },
  "ba01-before": {
    key: "ba01-before",
    fileName: "demo-before-01.webp",
    alt: "Residential kitchen before renovation (concept visual)",
    type: "before-after",
  },
  "ba01-after": {
    key: "ba01-after",
    fileName: "demo-after-01.webp",
    alt: "Residential kitchen after premium remodel (concept visual)",
    type: "before-after",
  },
  processDetail: {
    key: "processDetail",
    fileName: "demo-process-detail.webp",
    alt: "Architectural planning and premium materials (concept visual)",
    type: "process",
  },
};
