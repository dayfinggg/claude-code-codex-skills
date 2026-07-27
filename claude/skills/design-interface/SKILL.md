---
name: design-interface
description: "Design, implement, redesign, or visually review production-quality websites, apps, dashboards, flows, pages, and UI components. Use when visual direction, usability, responsive behavior, accessibility, interaction states, information hierarchy, or design-system fit materially affect the result, especially when extending an existing product without breaking its visual language. Do not use for backend-only work, mechanical CSS edits with no design judgment, or non-interface artifacts."
---

# Design Interface

Create interfaces that are useful, coherent, recognizable, accessible, and finished. Treat product intent, content, visual design, interaction, implementation, and rendered verification as one workflow.

## Choose the Design Mode

Use **existing-product mode** whenever the repository already contains a product interface, brand, design system, theme, or reusable components. Preserve its visual grammar and extend it with the smallest justified addition.

Use **new-direction mode** only for a greenfield interface or an explicitly requested redesign. Establish a coherent system before styling individual screens.

Do not expose routine design deliberation unless the user asks for it.

## Establish the Design Contract

Determine from the request and available evidence:

1. Who uses the interface and what primary task they must complete.
2. The product type, content, environment, platform, supported devices, and constraints.
3. The required deliverable: concept, prototype, implementation, redesign, or review.
4. Existing brand rules, tokens, components, assets, copy, and interaction conventions.
5. The material quality risks, such as accessibility, dense data, trust, conversion, localization, or performance.

Use realistic product content when available. Do not fabricate proof, metrics, testimonials, or business claims in a finished result.

## Read the Applicable Guidance

Load only the references needed for the task:

1. Read `references/existing-product.md` before changing an established interface.
2. Read `references/foundations.md` when choosing or evaluating typography, spacing, color, layout, imagery, icons, or motion.
3. Read `references/interaction-patterns.md` when designing forms, navigation, search, filters, tables, dashboards, dialogs, or system states.
4. Read `references/accessibility-verification.md` for implementation, review, or any task where accessibility and rendered quality must be verified.

Treat referenced numeric values as one of:

1. **Requirement:** a standard or explicit product constraint.
2. **Platform convention:** a default for a specific environment.
3. **Starting heuristic:** a value to adapt when the product has no established rule.

Never overwrite a sound project convention with a generic heuristic.

## Recover the Existing Visual Grammar

In existing-product mode, inspect the implementation before proposing a direction:

1. Locate theme configuration, design tokens, CSS variables, global styles, fonts, icons, and assets.
2. Locate the component library, shared primitives, Storybook or equivalent documentation, and representative states.
3. Inspect two or three adjacent pages with similar purpose, density, or content.
4. Record the established typography roles, spacing rhythm, grid, container behavior, colors, radii, borders, shadows, icon family, control sizes, copy tone, and responsive patterns.
5. Identify which observed choices are deliberate system rules and which are isolated inconsistencies.

Choose in this order:

```text
reuse → compose → minimally extend → create new
```

Do not introduce a new font, palette, spacing scale, radius language, shadow style, icon family, or base component unless existing mechanisms cannot meet the task. Keep deviations explicit, local, and justified by user or product needs.

## Form One Coherent Direction

Define internally:

1. **Product thesis:** what the interface helps someone accomplish.
2. **Visual thesis:** its character, contrast, density, and rhythm in one sentence.
3. **Interaction thesis:** how feedback and state changes should feel.
4. **Signature:** at most one memorable move that belongs to this product.

Choose the direction for the audience and task, not for fashion. Distinctive does not mean loud. Keep one dominant idea per view or section. Remove anything that does not improve meaning, action, orientation, trust, or appropriate atmosphere.

## Design from Tasks and Content

1. Put the primary task, decision, or message first.
2. Order headings, labels, values, and actions for scanning.
3. Give each region one clear responsibility.
4. Use visible, specific labels that describe the action or result.
5. Keep supporting copy concise and consistent with product vocabulary.
6. Explain errors in plain language and provide recovery.
7. Preserve user input, context, and navigation state across recoverable failures.
8. Prioritize workspace, status, decisions, and actions in product UI.
9. Build landing pages from promise to evidence to action without invented claims.

## Build or Extend the System

Centralize recurring decisions in the product’s existing tokens or theme mechanism.

1. Establish hierarchy with placement, alignment, spacing, scale, weight, and contrast before decoration.
2. Let content determine layout transitions and breakpoints.
3. Prefer grids, regions, lists, dividers, and intrinsic layout primitives over interchangeable card mosaics.
4. Use containers only when grouping, interaction, or elevation requires them.
5. Preserve established density; do not inflate operational interfaces for appearance.
6. Use typography roles rather than styling each text element independently.
7. Use semantic color roles for surfaces, text, borders, actions, focus, and status.
8. Keep borders, radii, shadows, gradients, and texture consistent with one material logic.
9. Use approved assets and a coherent icon family; do not use emoji as interface icons unless the product does.
10. Use motion only for feedback, continuity, orientation, or emphasis, and support reduced motion.

## Design Complete Behavior

Cover every state material to the flow:

1. Default, hover, focus, active, selected, and disabled.
2. Loading, empty, partial, error, success, stale, and offline.
3. Validation, assistance, destructive confirmation, undo, and recovery.
4. Authentication, permissions, and unavailable actions.
5. Long content, narrow viewports, zoom, localization, overflow, and slow networks.

Keep system status visible. Prefer prevention and reversible actions over warnings alone. Keep common actions efficient without hiding the understandable path for new users.

## Implement with Product Fidelity

When implementation is requested:

1. Follow the repository architecture, component system, tokens, supported versions, and naming.
2. Produce complete working behavior, not a static approximation.
3. Preserve semantics and accessibility through component abstraction.
4. Align component boundaries with behavior and genuine reuse.
5. Use responsive primitives and platform capabilities before brittle coordinates.
6. Reuse the existing stack before adding dependencies or fonts.
7. Size media appropriately, prevent avoidable layout shifts, and avoid expensive routine effects.
8. Do not leave placeholders, dead controls, unsupported claims, or decorative functionality.

Do not replace a coherent product system with a personal aesthetic.

## Verify the Rendered Interface

Do not judge interface quality from source alone.

1. Run the product through its normal development path.
2. Inspect representative narrow, medium, and wide viewports.
3. Exercise the primary flow and every material state.
4. Check hierarchy, alignment, wrapping, density, cropping, overflow, focus, contrast, targets, and motion.
5. Compare new work with adjacent product surfaces and the design contract.
6. Test keyboard operation and available accessibility tooling.
7. Run the narrowest relevant type, lint, test, build, and performance checks.
8. Fix visible defects and repeat the inspection.

Use screenshots or browser tools when available. For redesigns, preserve before-and-after evidence when useful. Never claim visual or responsive quality was verified without rendering the result.

If delegation is explicitly authorized, apply `delegate-work` and use an interface reviewer only after a runnable surface exists. Give it exact routes, viewports, states, comparison surfaces, and required screenshot or accessibility evidence; keep implementation and final acceptance in the main session.

## Reject Common Failure Modes

Reject:

1. Generic AI-SaaS layouts made from repeated rounded cards.
2. Unmotivated purple gradients, glass, glows, floating blobs, or oversized radii.
3. Marketing-style hero sections inside operational workspaces.
4. Every section centered, equally emphasized, or decorated.
5. Weak hierarchy hidden behind excessive chrome.
6. Trend-driven styling that conflicts with the product or platform.
7. Novel controls where familiar conventions reduce cognitive load.
8. Attractive default screens with missing error, empty, loading, focus, or mobile states.
9. Motion that delays work or ignores reduced-motion preferences.
10. Prompt language, design commentary, or invented claims appearing in the interface.

## Completion Standard

Finish only when the interface:

1. Serves the primary task and communicates its state.
2. Has one coherent visual and interaction direction.
3. Fits the existing product or establishes a complete new system.
4. Remains understandable, responsive, accessible, and appropriately performant.
5. Includes material states and recovery paths.
6. Has been rendered, inspected, and refined from evidence.
