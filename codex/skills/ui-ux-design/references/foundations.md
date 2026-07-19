# UI/UX Foundations

## Contents

1. Product and information architecture
2. Visual hierarchy and composition
3. Typography
4. Layout, spacing, and responsiveness
5. Color, surfaces, elevation, and motion
6. Components and interaction
7. Forms, navigation, dialogs, and feedback
8. Icons and imagery
9. Content design
10. Accessibility baseline
11. Platform decisions

## Product and information architecture

- Identify the user's main job, first decision, primary action, and success state before styling.
- Order information by task importance, not by database shape or visual symmetry.
- Give each screen one dominant purpose. Secondary actions must not compete visually with the primary action.
- Keep navigation placement, labels, icon meaning, and control behavior consistent across the product.
- Use progressive disclosure for advanced or infrequent choices, but never hide a required primary action in an overflow menu.
- Minimize cognitive load by grouping related controls, preserving context, and making consequences visible before commitment.
- Prefer familiar platform patterns over novel interactions that users must learn.
- Provide escape, cancel, back, close, undo, or recovery where appropriate. Confirm irreversible or costly actions.
- Preserve useful density. Minimal design must not become empty dashboards, hidden actions, or oversized whitespace.

## Visual hierarchy and composition

- Establish hierarchy through position, scale, weight, spacing, contrast, and grouping before using containers or effects.
- Align major edges and baselines. Repeated elements must share geometry and rhythm.
- Use proximity to show relationship and larger separation to mark a new group.
- Keep one dominant visual idea per region. Do not give every element equal emphasis.
- Prefer asymmetric composition when it supports content or reference fidelity; do not force everything into a centered template.
- Use whitespace deliberately. Empty space must improve grouping, scanning, focus, or atmosphere.
- Avoid dividing every region with a border. If removing border, radius, background, and shadow does not reduce understanding or interaction, the region does not need to be a card.
- Reserve elevation for real layering, transient surfaces, or hierarchy that whitespace and borders cannot communicate.

## Typography

Project and platform tokens always win. If no type system exists, define semantic roles such as display, title, heading, body, label, caption, and data or monospace.

- Use one primary UI family and at most one additional display family when the concept requires it.
- Avoid thin or light weights for small text. Prefer regular, medium, semibold, or bold weights with clear differentiation.
- Build hierarchy with a compact scale. Do not introduce a new font size for every component.
- Use body text around `16px` for general web reading. Dense desktop product UI may use `14–16px`; `12–14px` is for short secondary labels or metadata, never essential long-form content.
- Follow platform defaults for native applications. On iOS, prefer Dynamic Type and the system body default rather than fixed web sizes.
- Use body line height around `1.45–1.65` when no token exists. Headings may use a tighter line height when legibility remains strong.
- Keep normal reading lines roughly `45–75` characters when possible. Dense data and code have different constraints.
- Left-align long LTR text. Center alignment is for short display copy, compact empty states, or an intentional reference, not paragraphs or dense application content.
- Avoid long all-caps, fully justified body text, excessive italics, and images of text.
- Control responsive display text. A heading must not consume the entire mobile viewport or create accidental one-word wraps.
- Never shrink essential labels merely to preserve a desktop composition. Reflow or reprioritize instead.
- Verify font loading and fallback. A visually similar fallback is not an exact reproduction.

## Layout, spacing, and responsiveness

Use the project's grid, containers, spacing tokens, and breakpoints. If none exist, use a `4px` micro-grid with an `8px` macro rhythm as a starting heuristic, not a rigid law.

- Use fluid sizing, intrinsic layout, flexible media, grid or flex, and relative units before adding breakpoints.
- Let content determine breakpoints. Do not target device brands.
- Start with the narrow layout and add structure only when available space permits it.
- Preserve reading and focus order when regions move.
- Reflow, stack, relocate, wrap, or change presentation rather than uniformly shrinking a desktop screen.
- Do not hide essential content or actions at smaller widths.
- Avoid page-level horizontal scrolling. Local scrolling is acceptable only for inherently two-dimensional content such as data grids, maps, timelines, and canvases.
- Account for safe areas, browser chrome, on-screen keyboards, short viewports, long localized strings, zoom, and dynamic text.
- Use container queries for reusable components whose behavior depends on container space rather than viewport width.
- Test at `320 CSS px`, a meaningful intermediate width, every supplied reference width, and a wide layout. Test portrait and landscape where the target platform supports both.
- Test empty, typical, maximal, and long-content cases. Do not tune only for ideal copy.

## Color, surfaces, elevation, and motion

- Reuse brand and semantic color tokens. If none exist, use a restrained neutral foundation, one primary accent, and distinct semantic colors for success, warning, error, and information.
- Never use color as the only indicator of status, selection, validation, or category.
- Do not use a purple-blue gradient as a default technology aesthetic.
- Use a gradient only when it is present in the reference or brand, encodes meaningful data or state, or creates a deliberate atmosphere that a solid surface or authentic image cannot provide more clearly.
- Check text and control contrast across every point of a gradient or image-backed surface.
- Keep radius values on one small scale. Pills are for tags, chips, compact filters, segmented controls, toggles, or an explicit visual language—not every button, input, and card.
- Keep shadows consistent and sparse. Do not shadow every surface.
- Motion must communicate state, continuity, hierarchy, or feedback. Do not add motion only to make the interface feel premium.
- Prefer short, interruptible transitions. Honor reduced-motion preferences and provide non-motion equivalents.
- Avoid autoplay, scroll hijacking, parallax, repeated bounce, large zoom, blur transitions, and peripheral motion unless the product specifically requires them and provides control.

## Components and interaction

- Reuse the current component library before creating custom controls.
- Prefer semantic native elements. ARIA supplements semantics; it does not repair an inappropriate element or missing keyboard behavior.
- A button performs an action. A link changes location. Do not make a clickable `div` imitate either.
- Give each component a defined purpose, variants, responsive behavior, and applicable states.
- Cover default, hover, focus-visible, pressed or active, selected or toggled, disabled, loading, error, and success states where they can occur.
- Keep hover, focus, selection, and disabled states visually distinct.
- Provide immediate feedback after activation. Prevent double submission while an action is pending.
- Keep common actions visible. Use overflow menus for secondary or infrequent actions.
- Pair ambiguous icons with visible labels. Icon-only controls require an accessible name and usually a tooltip available on hover and focus.
- Do not use custom gestures as the only input. Provide a visible alternative to swipe, drag, multitouch, or path-based gestures.
- Keep destructive styling and copy distinct from safe primary actions.

## Forms, navigation, dialogs, and feedback

### Forms

- Give every control a persistent visible label. Placeholder text is an example or hint, not a label.
- Put format and constraint guidance before input when users need it.
- Use the correct input type, input mode, autocomplete token, and locale-aware format.
- Group related controls with appropriate semantic structure.
- Make required or optional status explicit and consistent.
- Validate after the user has had a fair chance to enter a valid value. Do not display premature errors while typing unless immediate validation genuinely helps.
- Identify errors in plain language next to the affected field and explain recovery. Do not rely on a red border alone.
- Preserve entered values after recoverable errors.
- Do not block paste, autofill, password managers, or complete one-time-code insertion.

### Navigation

- Keep orientation visible through page titles, selected states, breadcrumbs, or other appropriate location cues.
- Keep navigation order and naming stable.
- Ensure the keyboard focus order follows the visual and semantic reading order.
- Use `Tab` between components and the expected arrow-key model inside composite widgets.
- Provide a skip link and landmarks for substantial web applications.

### Dialogs and overlays

- Use a modal only when interruption and blocked background interaction are necessary.
- A modal must have an accessible name, receive focus, keep keyboard navigation inside, close through an explicit control and `Escape` when appropriate, make the background inert, and restore focus logically.
- Do not label a visually or functionally nonmodal surface as modal.
- Hover or focus content must be dismissible, hoverable, and persistent long enough to use.
- Prevent sticky headers, banners, footers, and overlays from obscuring the focused element.

### Feedback and system status

- Communicate loading, progress, empty results, partial results, completion, errors, unavailable data, permissions, and offline state.
- Use determinate progress when duration is measurable and indeterminate progress only when it is not.
- Never leave a blank surface while work is pending.
- Announce status updates to assistive technology without moving focus unnecessarily.
- Empty states explain why the surface is empty and offer the next relevant action; they are not decorative marketing panels.

## Icons and imagery

### Icons

- Use one canonical project or platform icon family. Match stroke or fill style, artboard, optical size, corner character, baseline, and color behavior.
- Reuse the same icon for the same meaning. Do not mix families or use approximate Unicode glyphs.
- Do not use emoji for navigation, actions, status, or feature illustrations unless emoji is an intentional product language.
- Prefer SVG or platform vector symbols for interface icons.
- Do not draw a custom icon when the established library already contains the intended meaning.
- Keep visible icon size and interactive target size separate; a `20px` icon may sit inside a `44px` target.

### Images and assets

- Use the exact supplied or project asset when available. Preserve aspect ratio, crop, focal point, resolution, and responsive behavior.
- Never stretch an image or silently substitute a logo, product screenshot, illustration, or photo.
- Informative images need purpose-specific alternative text. Decorative images use an empty alternative. Functional-image alternatives describe the action.
- Do not embed essential interface text in raster images or generated artwork.
- Use a stable scrim or surface behind text over imagery and verify contrast across crops and breakpoints.
- Use vector media for icons and simple graphics; use appropriately sized raster media for photographs and complex textures.
- Imagery must support product understanding, trust, narrative, or atmosphere. Do not add it merely to fill space.
- Use image search or generation only when the task authorizes or requires a new asset and licensing or provenance is acceptable. Never generate a fake brand asset or fake product evidence.

## Content design

- Preserve supplied copy exactly in reference work unless the user authorizes editing.
- Use plain, specific language and consistent terminology.
- Prefer sentence case unless the brand or platform specifies otherwise.
- Button labels describe the outcome and usually begin with a clear verb.
- Avoid vague labels such as `Learn more`, `Submit`, or `Click here` when a more specific outcome is available.
- Do not add generic claims, filler, repeated value propositions, or aspirational startup copy.
- Operational product surfaces use utility copy, not marketing slogans.
- Never invent customer evidence, business metrics, pricing, legal claims, availability, or integrations.

## Accessibility baseline

Use WCAG 2.2 AA as the default target for web interfaces unless the project requires more. Apply the target platform's accessibility guidance for native products.

- Normal text contrast: at least `4.5:1`.
- Large text contrast: at least `3:1`; WCAG large text is approximately `24 CSS px` regular or `18.5 CSS px` bold.
- Meaningful component boundaries, state indicators, icons, focus indicators, and graphics: at least `3:1` where WCAG non-text contrast applies.
- Pointer targets: at least `24 × 24 CSS px` or satisfy the WCAG spacing exception. Aim for `44 × 44 CSS px` for important or frequent web controls, `44 × 44 pt` on Apple touch platforms, and `48 × 48 dp` on Android.
- Focus: always visible, unobscured, and not time-limited. Use a robust internal baseline of a `2 CSS px` indicator with at least `3:1` change when the design system has no stronger rule.
- Keyboard: every action is operable in a logical order with no keyboard trap.
- Semantics: use appropriate headings, landmarks, labels, accessible names, roles, values, and states.
- Color: never the only carrier of information.
- Text resize: preserve content and function at `200%` text resizing.
- Reflow: preserve non-exempt content at `320 CSS px` without two-dimensional page scrolling.
- Text-spacing robustness: no loss at `1.5` line height, `2em` paragraph spacing, `0.12em` letter spacing, and `0.16em` word spacing. These are test overrides, not mandatory authored defaults.
- Motion: honor reduced-motion settings. Provide pause, stop, or hide for qualifying automatic movement and never exceed flash thresholds.
- Orientation: do not lock orientation unless essential.
- Status: announce important dynamic status without unnecessary focus movement.
- Automated accessibility scanning is necessary when available but insufficient; manually verify keyboard, focus, zoom, reflow, content, and interaction.

## Platform decisions

- Treat WCAG as the web conformance baseline and platform systems as contextual guidance, not a pool of numbers to mix.
- Use Apple HIG for Apple-native controls, Dynamic Type, targets, navigation, and platform behavior.
- Use Android guidance for Material or Android-native controls, `dp` targets, `sp` typography, adaptive layouts, and system behavior.
- Use the project's established web design system before applying Fluent, Carbon, Polaris, USWDS, GOV.UK, or Material conventions.
- If no system exists, choose one coherent token scale and interaction language. Do not combine Carbon typography, Fluent spacing, Material surfaces, and Apple navigation into a hybrid without a product reason.
- When a screenshot is the target, reproduce it. When building a native product without a reference, platform conventions outrank generic web defaults.
