# Design standards

Use these as decision criteria, not a universal visual preset. Product context, user evidence, platform conventions, and an existing design system outrank fashion.

## Direction and anti-slop

- Start from purpose, audience, task, content, and brand. Aesthetic novelty without product meaning is decoration.
- Pick a coherent direction before implementation. Specify hierarchy, density, type character, palette roles, spatial rhythm, imagery, geometry, and motion rather than naming a vague mood such as modern or premium.
- Make one or two details own the identity. Keep the rest disciplined. Novel controls, unfamiliar navigation, and surprise interactions usually reduce usability.
- Prefer one strong composition over a collection of independently polished cards. Do not turn every region into a floating rounded container.
- Avoid default AI signatures unless justified by the brief: purple gradients, cyan glow, glass panels, huge soft radii, floating dashboard mockups, bento grids, gradient text, feature-card triplets, excessive pills, sparkle icons, meaningless charts, and generic aspirational copy.
- Vary structure by content. A table should remain a table, a feed a feed, an editor a canvas, and an operational product a working surface rather than a marketing page.
- Use specific real content early. Real labels, lengths, states, data shapes, and errors reveal layout and interaction problems that placeholder text conceals.
- Distinctive does not mean loud. Calm density, precise alignment, restrained color, strong typography, purposeful imagery, and carefully reduced chrome can be the signature.

## Existing and new products

- In an existing product, inventory tokens, components, conventions, accessibility semantics, and high-traffic flows. Extend the system with the smallest coherent change. Treat inconsistency as debt, not an invitation to redesign unrelated surfaces.
- In a new product, define a small semantic token set and a minimum component family only after the primary flow and content hierarchy are clear.
- For native apps, follow platform behavior, safe areas, input conventions, system settings, dynamic text, and standard controls. Brand expression must not make the product feel foreign to its platform.
- For product tools, prioritize orientation, status, action, scanability, and compact information hierarchy. Do not add a hero section, promotional copy, or decorative metrics unless the product requires them.
- For marketing or editorial work, allow stronger composition, imagery, typography, and controlled motion, but retain clear navigation, readable content, obvious actions, and fast loading.

## System and hierarchy

- Use semantic tokens for background, surface, text, muted text, border, accent, focus, success, warning, danger, spacing, type, radius, elevation, and motion. Support themes through roles rather than duplicated literal values.
- Keep a limited spacing scale. Use proximity to show relationships and larger breaks to show section boundaries. Optical correction is allowed when strict arithmetic looks wrong.
- Define typography by role and hierarchy. Use a readable body face and deliberate display character when the brand benefits. Prefer system typography for platform-native or utility-dense interfaces where familiarity and performance matter.
- Limit line length and preserve comfortable line height. Avoid all caps for prose, centered long text, weak low-contrast body copy, and font weight as the only semantic cue.
- Use color sparingly and semantically. A dominant neutral field with intentional accents is usually clearer than evenly distributed color. Never rely on color alone.
- Match radii, border weights, icon strokes, shadows, and elevation logic. Nested corners should look concentric. Shadows must express hierarchy rather than decorate every surface.
- Keep primary actions visually dominant and destructive actions unambiguous. Do not create several equally loud calls to action.

## Interaction, content, and states

- Use familiar controls and native semantics. Every interactive surface needs a predictable label, visible affordance, and appropriate pointer, touch, and keyboard behavior.
- Design default, hover, active, focus, selected, disabled, loading, empty, success, validation, error, and destructive-confirmation states where applicable.
- Preserve user input on errors. Put validation near the problem, describe it plainly, and provide the next action.
- Avoid hidden hover-only actions unless the same action is discoverable and reachable another way.
- Keep motion purposeful, interruptible, and brief. Animate transform and opacity where possible; avoid layout thrashing and chained entrance effects that delay use.
- Maintain focus when dialogs, menus, drawers, and routes open or close. Do not trap focus outside a modal or lose it after dismissal.
- Write concise, concrete labels in the user's language. Keep terminology stable. Avoid vague buttons such as Continue when the actual result can be named.

## Accessibility baseline

- Target WCAG 2.2 AA for web products. Use semantic HTML before ARIA and WAI-ARIA patterns for composite widgets.
- Maintain at least 4.5:1 contrast for normal text and 3:1 for large text and meaningful non-text UI where WCAG requires it. Test every theme and state.
- Make all workflows keyboard-operable with visible focus and logical order. Ensure focused elements are not obscured.
- Provide accessible names and instructions. Hide decorative imagery from assistive technology; give meaningful imagery functional alternative text.
- Use targets of at least 24 by 24 CSS pixels for WCAG minimum cases and follow larger platform guidance for touch, commonly 44 points or pixels. Increase the invisible hit area without misrepresenting the visual target.
- Support text resizing to 200% and page reflow at 400% zoom or an equivalent 320 CSS-pixel viewport without loss of information or functionality. Avoid clipping, overlapping, and unnecessary horizontal scrolling.
- Respect reduced motion, increased contrast, forced colors, dark mode, dynamic type, and other relevant platform preferences.
- Do not use color, position, shape, sound, or motion as the only carrier of meaning. Support RTL reading order, localization expansion, and input-method differences.

## Visual verification

- Render the real interface with representative content. Inspect full pages and close component details.
- Check at least narrow mobile, small laptop, and wide desktop widths, plus platform-specific orientations when relevant.
- Compare hierarchy, alignment, wrapping, density, color, iconography, assets, and state behavior against the brief or supplied references.
- Test keyboard-only navigation, focus restoration, touch targets, 200% text size, 400% page zoom or equivalent narrow reflow, reduced motion, dark mode, long text, empty data, errors, loading, and overflow.
- Use automated accessibility checks as a floor. Manually inspect reading order, labels, focus, comprehension, and task completion.
- Iterate on visible defects. Source-code plausibility is not evidence of visual quality.
