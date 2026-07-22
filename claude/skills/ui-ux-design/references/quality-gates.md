# UI/UX Quality Gates

## Contents

1. Ambiguity defaults
2. AI-slop rejection list
3. Design review rubric
4. Critical failures
5. Final verification matrix

## Ambiguity defaults

When requirements are incomplete, do not compensate with decoration. Infer a simple task-first experience:

- clear page or screen title;
- concise context needed for the top task;
- one clear primary task, question, or decision, plus a discoverable primary action only when the real workflow has one;
- necessary secondary actions with lower emphasis;
- predictable navigation and orientation;
- real product content and assets where available;
- coherent type, spacing, color, radius, and icon tokens;
- complete loading, empty, error, success, disabled, permission, and partial-data states;
- responsive behavior and accessible semantics from the start;
- minimal chrome that supports the task.

Choose one visual thesis based on product type, audience, brand evidence, and content. Do not blend several trends.

## AI-slop rejection list

Reject these as automatic defaults. Reproduce them when an explicit reference, brand, platform component, data meaning, or deliberate concept requires them.

- Purple, blue, or cyan gradients used as a generic technology identity.
- Gradients used instead of composition, hierarchy, authentic imagery, or content.
- Random blurred blobs, glow fields, mesh backgrounds, fake 3D objects, glass panels, noise, and decorative particles.
- A generic centered SaaS hero with a badge, enormous headline, two buttons, and a floating dashboard.
- Display text so large that useful first-viewport content disappears.
- Card grids for every section, nested cards, cards inside cards, and borders around already clear groups.
- Every label, button, input, filter, and navigation item rendered as a pill.
- Uniformly oversized radii and shadows on every surface.
- Low-density dashboard mosaics with one small value per giant card.
- Several unrelated accent colors or semantic colors used decoratively.
- Emoji, random Unicode glyphs, mixed icon families, inconsistent stroke weights, or ambiguous icon-only actions.
- Generic feature icons that do not improve scanning or understanding.
- Invented logos, customers, testimonials, statistics, prices, integrations, charts, avatars, notifications, product screenshots, or photos.
- Generated images containing fake product UI, fake text, or fabricated evidence.
- Unrelated stock imagery, collage layouts, or abstract illustration used only to occupy space.
- Lorem ipsum, `Unlock your potential`, `Reimagine the future`, and other generic filler copy.
- Marketing language on an operational application surface.
- The same claim repeated across several regions.
- Center-aligned paragraphs or dense application content.
- Tiny low-contrast secondary text used to make the page look refined.
- Arbitrary font sizes, spacing values, radii, colors, breakpoints, and shadows outside the product scale.
- Desktop layouts merely shrunk on mobile.
- Fixed or floating layers that cover content, focus, or controls.
- Scroll hijacking, ornamental autoplay, parallax, bounce, glow pulses, or animation without reduced-motion behavior.
- Missing loading, empty, error, permission, partial, offline, success, disabled, hover, focus, and pressed states.
- Hidden primary actions or important controls available only through overflow menus.
- Color as the only status indicator.
- Destructive actions without consequence copy, confirmation, undo, or recovery.
- Custom controls that ignore native semantics or keyboard conventions.

Gradient decision rule: use a gradient only when the reference contains it, the brand defines it, it encodes data or state, or it provides a deliberate atmospheric treatment that cannot be expressed more clearly with a solid surface or authentic image. Never add one solely to make a generic layout look designed.

Card decision rule: remove the border, shadow, background, and radius mentally. If grouping, interaction, or understanding does not weaken, use typography, alignment, and whitespace instead of a card.

## Design review rubric

Score only from observed rendered and functional evidence.

| Dimension | Weight | Pass evidence |
|---|---:|---|
| Reference fidelity or design-contract fit | 30 | Reference work: correct elements, copy, geometry, typography, colors, assets, crop, states, density, and hierarchy. Greenfield work: the chosen product-specific contract is coherent, purposeful, and fully realized |
| Visual system and craft | 20 | Coherent tokens, spacing, alignment, typography, surfaces, restraint, polish, and brand character |
| UX and state completeness | 20 | Clear top task, discoverable actions, feedback, prevention, recovery, and all applicable states |
| Accessibility | 15 | Semantics, keyboard, focus, contrast, targets, text resizing, reflow, text spacing, and reduced motion |
| Responsive resilience | 10 | Narrow, intermediate, reference, and wide layouts; content extremes; no nonessential overflow |
| Implementation integrity | 5 | Existing components and assets reused; no parallel system, fabricated data, or shortcut image UI |

Target at least `90/100` for reference reproduction and `85/100` for greenfield work, with no critical failure. In exact mode, require full fidelity credit and the project-calibrated visual budget; the aggregate score cannot waive a visible mismatch. If a dimension is genuinely inapplicable, redistribute its weight proportionally across the applicable dimensions rather than scoring it as zero. Treat scores as an internal review aid, not a substitute for user acceptance or project-specific visual budgets.

## Critical failures

Any critical failure blocks completion regardless of score:

- missing, invented, or substituted high-salience reference element or asset;
- additional unrequested UI, section, feature, or redesign;
- major layout, hierarchy, typography, or crop mismatch at the target viewport;
- fabricated product data, claim, customer evidence, image, logo, or screenshot;
- inaccessible primary flow, keyboard trap, invisible focus, or incorrect control semantics;
- contrast failure on required content or primary controls;
- clipped content, overlap, accidental horizontal page scrolling, unintended nested scrolling, scroll traps, or broken responsive behavior;
- unavailable primary action or missing recovery from a likely error;
- missing loading, empty, error, or success state for a flow that can enter it;
- visual validation skipped when rendering tools were available;
- build success reported as design completion without rendered evidence.

## Final verification matrix

| Area | Required evidence |
|---|---|
| Visual fidelity | Capture at the reference viewport; compare alignment, geometry, copy, wrapping, type, color, borders, shadows, icons, assets, and crop |
| Responsive behavior | Verify `320 CSS px`, a meaningful intermediate width, every reference width, a wide screen, and supported orientations |
| Text resilience | Verify `200%` text resizing, reflow, text-spacing overrides, long labels, wrapping, localization expansion, and no loss of action |
| Keyboard and focus | Reach every action, confirm logical order, visible and unobscured focus, dialog containment, and focus restoration |
| Touch and pointer | Verify target size, separation, cancellation, hover alternatives, and alternatives for swipe or drag |
| Semantics | Inspect native elements, headings, landmarks, labels, accessible names, roles, values, states, and live status |
| Contrast and themes | Check text, icons, controls, focus, semantic states, light and dark themes, and forced-colors when supported |
| States | Verify default, hover, focus, pressed, selected, disabled, loading, empty, partial, error, success, permission, offline, and destructive flows as applicable |
| Motion | Verify reduced motion, interruptibility, no unnecessary autoplay, and no prohibited flashing |
| Images | Verify source, licensing context, resolution, aspect ratio, crop, focal point, responsive behavior, and alternative text |
| Content | Verify exact reference copy or approved product copy; no invented claims, metrics, customers, or filler |
| Performance | Check avoidable layout shift, oversized media, blocking font behavior, and animation cost where material |

Automated accessibility and visual checks cover only part of the design. Manual rendered inspection, keyboard use, focus review, zoom, reflow, and task-flow verification remain required.
