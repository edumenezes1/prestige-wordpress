# Redesign Plan - PRESTIGE

Complete reconstruction of the PRESTIGE homepage into a premium architectural studio aesthetic.

## User Review Required

> [!IMPORTANT]
>
> - All previous styles will be refactored to align with the new design tokens.
> - Photography is currently using sophisticated CSS-based placeholders as specified.
> - Brand name is strictly "PRESTIGE" across all touchpoints.

## Proposed Changes

### 1. Global Styles & Theme

- Implement the premium color palette: `--prestige-gold` (#E09D39), ink, black, white, and ivory.
- Integrate **Montserrat** typography with precise weights (300, 400, 500, 600).
- Apply a high-end grid system (12 columns, 1360px max-width) with controlled asymmetry.

### 2. Components Reconstruction

- **Header**: Sticky, transparent-to-solid transition, architectural typography.
- **Hero**: Minimalist grid layout with the Phoenix mark and refined headlines.
- **About/Manifesto**: Ivory background, editorial typography, "PLAN-BUILD-FINISH" layout.
- **Services**: Editorial accordion list instead of cards, focusing on Interior, Exterior, Construction, and Maintenance.
- **Projects Grid**: Asymmetric editorial layout with CSS-based placeholders (ready for future images).
- **Before & After**: Interactive comparison module with custom styling.
- **Process**: Numbered vertical sequence with clear descriptions.
- **Contact**: Minimalist form conclusions with direct WhatsApp integration.

### 3. Media & Assets

- Centralized `mediaManifest.ts` for strictly mapped filenames.
- Updated favicon to the official Phoenix brand mark.
- `MEDIA-GUIDE.md` for future asset management instructions.

### 4. Technical Quality

- Performance-optimized animations (Framer Motion).
- Full accessibility compliance (ARIA, semantic HTML).
- Responsive testing across all standard viewports.

## Technical Details

- **Fonts**: `@fontsource/montserrat` for stable loading.
- **Animations**: `framer-motion` for fluid, sub-800ms transitions.
- **Icons**: Official Phoenix SVG + `lucide-react` for UI elements.
- **Forms**: Client-side validation with direct WhatsApp messaging fallback.
