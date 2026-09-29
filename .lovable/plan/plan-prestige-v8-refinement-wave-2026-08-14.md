# Plan: Prestige V8 Refinement Wave

Complete layout correction, visibility audit, and motion refinement for PRESTIGE.

## Identity & Technical Constraints

- **Typography:** 100% Montserrat.
- **Colors:** strictly #E09D39 (Gold), #1B1B1B (Charcoal), #FFFFFF (White).
- **Architecture:** 1440px max-width, editorial spacing, architectural alignment.
- **Motion:** Framer Motion, scroll-driven (no autoplay/spring drift), progressive enhancement.

## 1. Structural DOM Cleanup

- Fix duplicate IDs (`#about`, `#services`, etc.) in `src/routes/index.tsx` and components.
- Ensure unique IDs for anchors and consistent `scroll-margin-top`.

## 2. Hero Refinement

- Simplify to H1 and single Gold CTA ("Start Your Project").
- Remove microtext, descriptive paragraph, and "Explore Our Work" link.
- Preserve scroll-scrubbed video and bottom signature.
- Add progressive scroll-driven blur (5px to 0px) and scale (1.02 to 1) between 0-12% scroll.

## 3. Media Reveal System

- Replace solid black curtains with a translucent reveal.
- Image visible from frame 1: opacity 0.72-0.85, scale 1.035, translateY 20px.
- Final state: opacity 1, scale 1, translateY 0.
- Update `ScrollAnimations.tsx` and `MediaSlot.tsx`.

## 4. About & Services

- **About:** Fix title reveal (ensure Y: 0 end state). Add hover scaling to PLAN/BUILD/FINISH (1.08x) with gold line growth.
- **Services:** Polish the existing sticky narrative. Ensure single-active state and smooth transitions. Verify card 4 visibility before release.

## 5. Projects & Cases

- **Selected Projects:** Fix title visibility (Y: 0). Refine grid alignment. Apply new image reveal system.
- **Before & After:** Implement functional case switching for 3 cases. Update `activeCase` state, images, and `aria-pressed`.

## 6. Process & Service Area

- **Process:** Fix broken image Slot 3 (fallback to local asset). Ensure Consultation step visibility.
- **Service Area:** Make "MIAMI" background text visible on md/lg viewports (z-index: 0, opacity: 0.04). Add horizontal scroll-parallax (6%) and coordinate entrance mask.

## 7. Contact & Polish

- **Contact:** Fix focus rings to a single gold border. Group reveals for text and form.
- **Motion Polish:** Uniform durations (480-650ms), easings ([0.22, 1, 0.36, 1]), and stagger (60-80ms).
- **Accessibility:** Ensure focus states, aria attributes, and reduced-motion support.

## 8. Final Audit

- Test viewports (360px to 1920px).
- Verify 25 acceptance criteria (Hero content, button colors, sticky behavior, image loading, overflow).
