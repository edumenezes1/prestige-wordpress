# Plan - Visual Redesign Implementation (Wave 1)

## Phase 1: Foundation & Brand Correctives

- [ ] Fix SVG and favicon assets (src/assets/prestige/prestige-icon-web.svg and public/favicon.svg).
- [ ] Update `src/styles.css` with new color tokens, typography scales, and base layout rules.
- [ ] Implement `src/data/config.ts` with `DEMO_VISUALS = true`.
- [ ] Update `src/data/mediaManifest.ts` with required demo image slots.

## Phase 2: Core Components Rebuild

- [ ] Implement `Preloader` component (src/components/prestige/Preloader.tsx).
- [ ] Rebuild `Header` (floating glassmorphism bar).
- [ ] Rebuild `Hero` (full-bleed cinematic, responsive).
- [ ] Implement `Marquee` (horizontal technical scrolling).
- [ ] Rebuild `About` (editorial with asymmetric image).

## Phase 3: Interactive Experience Rebuild

- [ ] Rebuild `ServicesAccordion` (sticky desktop experience).
- [ ] Rebuild `ProjectsGrid` (asymmetric masonry with demo images).
- [ ] Rebuild `BeforeAfter` (premium comparison tool).
- [ ] Rebuild `Process` (scrollytelling sticky section).

## Phase 4: Refinement & Finalization

- [ ] Rebuild `WhyPrestige`, `ServiceArea`, `ContactForm`, and `Footer`.
- [ ] Global search and replace for brand names (strictly "PRESTIGE").
- [ ] Accessibility (ARIA labels, keyboard navigation) and Performance (WebP, lazy loading) audit.
- [ ] Final verification via browser testing.

## Technical Details

- Using `@fontsource/cormorant-garamond`, `@fontsource/manrope`, and `@fontsource/ibm-plex-mono`.
- Framer Motion for scroll-driven animations using provided tokens.
- Tailwind v4 for styling.
- TanStack Start v1 for routing and server functions.
