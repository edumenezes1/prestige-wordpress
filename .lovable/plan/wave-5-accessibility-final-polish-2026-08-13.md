# Wave 5: Accessibility & Final Polish

Objective: Correct navigation, mobile menu, Services, slider, forms, links, semantics, and accessibility without altering the visual structure or adding new animations.

## Technical Details

### 1. Global & Semantic Reset

- **Root Route (`src/routes/__root.tsx`)**: Update `<html lang="en">` and add Skip Link as the first focusable element.
- **Global Styles (`src/styles.css`)**: Add `scroll-margin-top` for all sections, accessibility styles for Skip Link, and `focus-visible` ring styles. Implement `prefers-reduced-motion` global overrides.

### 2. Header & Mobile Menu (`src/components/prestige/Header.tsx`)

- **Semantic Buttons**: Ensure toggle and close buttons have `type="button"`, `aria-label`, and `aria-expanded`/`aria-controls`.
- **Focus Management**: Implement a focus trap (or simple lock) when the menu is open. Restore focus to the toggle when closed.
- **Touch Targets**: Ensure minimum 44x44px targets.
- **Body Lock**: Prevent scroll when open, ensuring no lock remains after closing.
- **Navigation**: Links close the menu and navigate to IDs with proper offset.

### 3. Services Accordion (`src/components/prestige/ServicesAccordion.tsx`)

- **Interactive Toggles**: Use `<button type="button">` for section headers.
- **ARIA**: Add `aria-expanded` and `aria-controls` for each accordion item.
- **Reduced Motion**: Implement instant expansion when `prefers-reduced-motion` is active.
- **Keyboard**: Support Enter/Space for toggling.

### 4. Projects Grid (`src/components/prestige/ProjectsGrid.tsx`)

- **Semantics**: Wrap project items in semantic interactive elements if actionable (or at least provide focusable anchors).
- **Alt Text**: Ensure high-quality, descriptive `alt` attributes for images.
- **Visibility**: Ensure critical info (title, location) is not hover-dependent for screen readers.

### 5. Before & After Slider (`src/components/prestige/BeforeAfter.tsx`)

- **Pointer Events**: Use `setPointerCapture` for stable dragging.
- **Keyboard Control**: Implement `role="slider"`, `tabindex="0"`, `aria-valuenow`, and Arrow/Page/Home/End key support.
- **Touch Targets**: 44x44px handle.
- **A11y Labels**: Ensure "BEFORE" and "AFTER" labels are programmatically associated or clearly announced.
- **Cases**: If Case 01/02 are interactive, convert to semantic buttons.

### 6. Contact Form (`src/components/prestige/ContactForm.tsx`)

- **Inputs**: Associate all `<label>` elements via `htmlFor`. Add `autocomplete`, `required`, and clear `id`/`name`.
- **Validation**: Use `aria-invalid` and `aria-describedby` for error states.
- **Photo Upload**: Implement a real `input[type="file"]` with `id="project-photos"`, `name="projectPhotos"`, and multiple selection.
- **Photo Logic**: Show selected file names. Add an English warning before WhatsApp redirect: "After WhatsApp opens, attach the selected photos manually."
- **Consent**: Fix `name="consent"` and asociaciones.
- **WhatsApp**: Encode the full message once. Include photo attachment instructions in the text.

### 7. Footer & Links (`src/components/prestige/Footer.tsx`)

- **Security**: Add `rel="noopener noreferrer"` to all `target="_blank"` links (Instagram, etc.).
- **Back to Top**: Convert to a real `<button type="button">`.
- **Branding**: Ensure copyright is © 2026 PRESTIGE and brand is strictly "PRESTIGE".

### 8. Final Audit

- **Build & Lint**: Run production build and linting checks.
- **Keyboard Test**: Full site traversal using only Tab/Shift+Tab and Space/Enter.
- **Reduced Motion**: Verify CSS and JS respect `prefers-reduced-motion`.
