# Plan: PRESTIGE V7 - Layout, Visibility & Scroll Refinement

Complete corrective wave to ensure absolute visibility, unified spacing, fixed assets, and the scroll-narrative Services sequence.

## Steps

1. **Visibility & Motion Primitives**
   - Update `ScrollAnimations.tsx` to ensure `opacity: 1` as default and clean termination states (`translateY(0)`).
   - Ensure `prefers-reduced-motion` and JS-disabled states show content immediately.

2. **Structural Spacing & Responsiveness**
   - Update `src/styles.css` with a global `section-spacing` utility using `clamp(64px, 8vw, 120px)`.
   - Apply `container-wide` and `section-spacing` consistently across all components.
   - Set `scroll-margin-top` on all sections to account for the sticky header.

3. **Asset & Styling Fixes**
   - Fix broken Process image by identifying a local asset or using a reliable fallback.
   - Update Header and Hero buttons to `#E09D39` (Yellow) with `#1B1B1B` text.

4. **Scroll-Narrative Services Section**
   - Refactor `ServicesAccordion.tsx` into a sticky scroll-driven experience.
   - Use `useScroll` to map 4 stages of service reveal over a 500svh container.
   - Maintain manual accordion functionality as a fallback.

5. **Unified Scroll Animations**
   - Apply the unified reveal system to About, Projects, Process, Why Prestige, and Service Area.
   - Implement subtle parallax and mask reveals as specified.

6. **Final Audit & Polish**
   - Automated check for overflow at 360px.
   - Verification of 15 acceptance criteria.

## Technical Details

- **Typography:** Enforce Montserrat for all elements via `src/styles.css`.
- **Colors:** Strict use of `#E09D39`, `#1B1B1B`, and `#FFFFFF`.
- **Animations:** Framer Motion `useScroll` and `useTransform` for scroll-delta-driven effects.
- **Accessibility:** Ensure ARIA attributes are updated during scroll-driven state changes.
- **Performance:** Use `requestAnimationFrame` (via Framer Motion) for smooth scrubbing.
