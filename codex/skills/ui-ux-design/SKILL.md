---
name: ui-ux-design
description: Design, reproduce, implement, or review web, desktop, or mobile UI/UX, including references, dashboards, forms, components, responsive layout, visual QA, and accessibility. Not for non-visual or content-only work.
---

# UI/UX Design

Create interfaces that are purposeful, coherent, accessible, responsive, and visually finished. Preserve exact references when supplied; otherwise make restrained, product-specific decisions instead of falling back to generic AI patterns.

## Load the design contract

Before substantive design or implementation work:

1. Read [foundations.md](references/foundations.md) for the shared UI, UX, responsive, component, asset, and accessibility rules.
2. Read [quality-gates.md](references/quality-gates.md) for anti-slop rules and the acceptance rubric.
3. When a screenshot, mockup, Figma node, image, video, or existing screen is a visual target, also read [reference-fidelity.md](references/reference-fidelity.md).
4. For dashboards, analytics, charts, reporting, metrics, or data-rich interfaces, also read [data-visualization.md](references/data-visualization.md).
5. Read [sources.md](references/sources.md) only when exact standards, platform thresholds, current source verification, or citations are needed.

Activate the most specific frontend, native-platform, accessibility, browser-testing, image, and implementation skills required by the actual project. This skill owns design judgment; language and framework skills own production implementation details.

## Apply source-of-truth precedence

Use this order:

1. Explicit user requirements and the selected reference or variant.
2. The existing product design system, components, tokens, brand, content, and platform conventions.
3. Accessibility, usability, and functional correctness.
4. The greenfield defaults in this skill.

For reference implementation, visible fidelity takes precedence over taste defaults. Reproduce intentional gradients, cards, radii, density, typography, imagery, asymmetry, and motion when the source contains them. Anti-slop defaults govern only decisions the source and product system leave unspecified.

Do not replace the product's design system with a parallel one. Reuse existing primitives and tokens when compatible. If a primitive cannot reproduce an intentional visible requirement, add the smallest scoped variant instead of creating a new system.

When a reference conflicts with accessibility or functional correctness, preserve its composition and character while making the smallest necessary correction. Record only corrections that materially change visible fidelity.

## Choose the task mode

### Reference reproduction

Treat the reference as a measurable target, not inspiration. Preserve exact copy, assets, geometry, hierarchy, typography, colors, borders, radii, shadows, crop, density, and visible states. Do not redesign, beautify, simplify, or add sections unless requested.

### Existing product extension

Inspect nearby screens and components before designing. Match established navigation, density, tokens, terminology, interaction patterns, empty/loading/error handling, and responsive behavior. A locally consistent solution is better than a fashionable isolated screen.

### Greenfield or ambiguous requirements

Infer the primary user, top task, surface type, content priority, and likely platform from available context. Ask only when a missing answer would materially change the product, brand, data contract, or safety. Choose one coherent visual thesis and implement it consistently.

For marketing or editorial surfaces, create a distinctive first viewport with one clear promise, one primary action when the real journey has one, and an authentic visual anchor. For applications, dashboards, and admin tools, put the working surface first, maintain useful information density, and avoid a marketing hero. For commerce and content products, prioritize discovery, comparison, trust, availability, and conversion.

## Follow the workflow

1. Inspect applicable instructions, the running product, relevant routes, neighboring screens, components, tokens, fonts, icons, assets, content, data states, and target viewports.
2. State the design contract internally: target users, primary task, question or decision, primary action only when the real workflow has one, information hierarchy, required content, states, platform, responsive behavior, accessibility target, and visual source of truth.
3. Inventory every required region, component, asset, interaction, state, and content dependency. Separate observations from assumptions.
4. Establish or reuse semantic tokens for typography, spacing, color, radius, borders, elevation, motion, and breakpoints. Do not scatter arbitrary values.
5. Implement in dependency order: page geometry, responsive regions, typography and wrapping, authentic assets, components, interactions and states, then micro-spacing and polish.
6. Render the real interface at the target viewport. Wait for fonts, images, stable data, and animations before capture. Compare against the reference or design contract.
7. Fix the largest structural differences first: missing elements, container geometry, alignment, typography, wrapping, asset choice, crop, hierarchy, and responsive behavior. Polish shadows and decoration last.
8. Verify narrow, intermediate, reference, and wide layouts; keyboard and focus behavior; contrast; text resize and reflow; reduced motion; content extremes; loading, empty, error, success, disabled, and permission states.
9. Run the quality gate. Finish only from rendered and functional evidence, not from build success alone.

## Enforce visual integrity

Do not fabricate logos, testimonials, metrics, prices, integrations, product screenshots, customer names, charts, notifications, avatars, or business claims. Use real project content and supplied assets. If content is unavailable, use neutral structural placeholders only when required and never present them as facts.

Do not substitute supplied logos, photos, illustrations, icons, or fonts with emoji, approximate glyphs, unrelated stock media, generated imagery, or a different library. If a required asset is missing, search the authorized project sources, use an approved asset workflow, or report the limitation.

Do not add gradients, glassmorphism, blurred blobs, mesh backgrounds, glow, noise, floating cards, excessive shadows, giant radii, pills, decorative dashboards, oversized hero text, arbitrary illustration, or ornamental motion merely to make a generic layout look designed. Use any of them only when the reference, brand, platform, data encoding, or a deliberate product-specific concept justifies the choice.

Use composition, alignment, scale, typography, whitespace, authentic imagery, crop, and contrast before borders, elevation, cards, and effects. Each region needs one job and one dominant idea. Remove decoration that does not improve orientation, comprehension, action, trust, or atmosphere.

## Enforce UX completeness

Keep the primary task, question, or decision clear; keep a real primary action discoverable when one exists. Keep system status visible. Use the user's domain language and consistent terminology. Prefer recognition over memory. Prevent errors where practical and provide clear recovery, cancel, back, undo, or confirmation for consequential actions.

Every interactive component must cover the states that can occur: default, hover where applicable, focus-visible, pressed or active, selected or toggled, disabled, loading, empty, partial, success, error, permission-limited, and offline where relevant. Do not create dead controls or controls whose visible affordance differs from behavior.

Use native semantics and controls first. A button performs an action; a link navigates. Keep labels visible, specific, and outcome-oriented. Placeholder text does not replace a label. Preserve user input after recoverable errors and associate error text with the affected field.

## Completion gate

Do not declare the interface complete unless all applicable gates pass:

- The top task, question, or decision is immediately understandable, and a real primary action is discoverable when the workflow has one.
- The rendered result matches the supplied reference or the chosen design contract.
- No unrequested redesign, fabricated content, substituted asset, or generic AI decoration remains.
- Typography, spacing, color, components, icons, imagery, states, and density form one coherent system.
- Required narrow, intermediate, reference, and wide layouts work without clipping, overlap, accidental horizontal scrolling, or lost functionality.
- Keyboard, focus, semantics, contrast, targets, resize, reflow, text-spacing overrides, and reduced motion meet the applicable accessibility target.
- Visual comparison and functional checks were performed when the required tools were available.

If a gate cannot be verified, state the exact gap instead of treating build success as design completion.
