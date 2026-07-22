---
name: ui-ux-design
description: Design, implement, reproduce, or review visual web, desktop, and mobile interfaces, including responsive states, interaction, accessibility, and visual QA. Use when visual or interaction quality is an outcome; not for backend or content-only work.
---

# UI/UX Design

Create interfaces that are purposeful, coherent, accessible, responsive, and visually finished. Preserve supplied references; otherwise make restrained decisions grounded in the product rather than generic visual trends.

Read [foundations.md](references/foundations.md) for shared layout, component, responsive, asset, and accessibility rules. Read [quality-gates.md](references/quality-gates.md) for the acceptance rubric and anti-slop checks. For a screenshot, mockup, Figma node, video, image, or existing screen target, also read [reference-fidelity.md](references/reference-fidelity.md). For dashboards, charts, analytics, reporting, metrics, or other data-rich surfaces, also read [data-visualization.md](references/data-visualization.md). Read [sources.md](references/sources.md) when exact standards, thresholds, current platform rules, or citations matter.

## Establish the design contract

Inspect the running product, applicable instructions, nearby routes and screens, existing components and tokens, fonts, icons, authentic assets, content, data states, target platforms, and viewports. Record the primary user and task, information hierarchy, required content, interactions and states, responsive behavior, accessibility target, and visual source of truth. Separate observations from assumptions.

Apply this precedence:

1. explicit requirements and the selected visual reference;
2. the product's design system, brand, content, components, and platform conventions;
3. accessibility, usability, and functional correctness;
4. greenfield defaults from this skill.

Reuse the product system rather than creating a parallel one. If a primitive cannot reproduce a required visible behavior, add the smallest scoped variant. When a reference conflicts with accessibility or function, preserve its composition and character while making the smallest necessary correction and disclose any material visible difference.

## Choose the mode

For reference reproduction, treat the source as a measurable target. Preserve copy, assets, geometry, hierarchy, type, color, borders, radii, shadows, crop, density, motion, and visible states. Do not redesign or add sections without a request.

For an existing product extension, match nearby navigation, density, terminology, interactions, tokens, responsive behavior, and loading, empty, error, success, disabled, and permission states. Local consistency outranks fashion.

For greenfield work, infer the user, top task, surface type, content priority, and platform from evidence. Ask only when a missing answer materially changes brand, data contract, safety, or user outcome. Choose one visual thesis and apply it consistently.

When uncertainty requires an exploratory prototype, label it disposable in the artifact and handoff. Isolate it from production entry points, real credentials, durable data, and release paths. Define what question it answers and its discard condition. A prototype must never be silently promoted to production; require an explicit decision, production-quality reimplementation or hardening, and the normal review gates.

## Build and refine

Inventory every region, component, asset, interaction, content dependency, and reachable state. Reuse semantic tokens for typography, spacing, color, radius, borders, elevation, motion, and breakpoints. Implement page geometry and responsive regions first, then typography and wrapping, authentic assets, components, interactions, states, and micro-spacing.

Do not fabricate customer names, logos, testimonials, metrics, prices, integrations, screenshots, charts, alerts, avatars, or business claims. Do not replace supplied assets with emoji, approximate glyphs, unrelated stock media, or generated substitutes. Use neutral structural placeholders only when necessary and never present them as facts.

Avoid gradients, glass, blurred blobs, glows, giant radii, floating cards, excessive shadows, decorative dashboards, oversized hero text, and ornamental motion unless the reference, brand, data encoding, or deliberate product concept calls for them. Use composition, type, scale, whitespace, crop, alignment, and contrast before effects.

## Verify visually and functionally

Render the real interface at narrow, intermediate, reference, and wide viewports. Wait for fonts, images, stable data, and animations. Compare against the reference or design contract and fix structural differences before decoration.

Exercise keyboard order, focus visibility, semantics, labels, contrast, targets, text resize and reflow, text-spacing overrides, reduced motion, and content extremes. Test every reachable interaction state and recovery path; buttons act, links navigate, errors retain recoverable input, and no control is dead.

Finish only when rendered evidence supports visual fidelity, responsive behavior, and the applicable accessibility target. Report unavailable browsers, assets, viewports, assistive technology, or test states as explicit gaps; build success alone is not UI acceptance.
