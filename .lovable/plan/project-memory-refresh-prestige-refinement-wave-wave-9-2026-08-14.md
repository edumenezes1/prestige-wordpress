# Project Memory Refresh: PRESTIGE Refinement Wave (Wave 9)

## Core

- **Branding:** PRESTIGE only.
- **Palette:** #1B1B1B (Charcoal), #E09D39 (Gold), #FFFFFF (White) + transparencies.
- **Typography:** Montserrat only.
- **Layout:** 12-column grid, clamp spacing.
- **Animations:** Scroll-driven, requestAnimationFrame, Framer Motion.

## Objectives

1. **Navigation & IDs:** Unique IDs, instant jump-to-contact (<= 250ms).
2. **Header:** Persistent dark glass (blur 18-22px), specific alphas.
3. **About:** Hover scale (1.16) for Plan/Build/Finish, hairline scaleX.
4. **Services:** Polished sticky narrative, progress hairline.
5. **Selected Projects:** Rebuild with 7/5 and 5/7 editorial grid, hover metadata, coordinates.
6. **Before & After:** Clean labels (no boxes), mouse-follow divider (no click required on desktop).
7. **Process:** Sticky narrative (420-460svh), cumulative reveal, real image fallback.
8. **Why Prestige:** Real image, cumulative bottom-up reveal.
9. **Service Area:** Stronger "MIAMI" presence, fixed coordinates entrance.
10. **Contact:** White bg / Black panel contrast, single gold border focus.
11. **System:** Reusable ScrollHairline component.

## Technical Tasks

- Remove `scroll-behavior: smooth` global.
- Implement `jumpToContact` function.
- Create `ScrollHairline.tsx`.
- Rebuild `ProjectsGrid.tsx` and `Process.tsx` structures.
- Refactor `BeforeAfter.tsx` for mouse-tracking.
- Fix image placeholders in `Process` and `WhyPrestige`.
