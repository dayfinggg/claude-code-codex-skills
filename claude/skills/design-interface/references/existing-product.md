# Extending an Existing Product

Use this workflow before adding or redesigning a page, flow, or component in an established interface.

## Build an Evidence Set

Inspect the narrowest evidence that explains the product:

1. Theme and token files.
2. Global styles and font loading.
3. Shared layout and component primitives.
4. Component documentation, examples, and tests.
5. Two or three pages closest to the requested work.
6. One representative narrow-screen implementation.
7. Existing loading, empty, validation, error, and permission states.

Prefer implementation and rendered behavior over names alone. A token called `primary` does not prove how the product actually uses it.

## Recover the Visual Grammar

Record a compact internal profile:

| Area | Inspect |
|---|---|
| Typography | Families, roles, sizes, weights, line heights, text measure, numeric treatment |
| Layout | Shell, navigation, grid, containers, columns, breakpoints, sticky regions |
| Spacing | Recurring gaps, padding, section rhythm, control density |
| Color | Surfaces, text levels, borders, actions, focus, status roles, dark mode |
| Material | Borders, radii, shadows, overlays, opacity, elevation |
| Components | Variants, sizes, composition patterns, supported states |
| Icons and media | Icon family, stroke or fill style, sizes, cropping, illustration language |
| Interaction | Feedback, confirmation, undo, keyboard behavior, motion |
| Content | Terminology, capitalization, action labels, help and error tone |
| Responsiveness | Collapse, wrap, reorder, overflow, substitution, disclosure |

Distinguish repeated rules from accidents. Treat a choice as established when it appears in tokens, shared components, documentation, or several representative surfaces. Do not propagate an isolated defect merely for consistency.

## Classify the Requested Work

Choose the least invasive class that meets the task:

1. **Reuse:** an existing component or pattern already satisfies the need.
2. **Compose:** existing primitives satisfy it when combined.
3. **Extend:** a shared primitive needs a compatible variant or state.
4. **Create:** the product lacks the concept and a new primitive is justified.

Prefer reuse and composition. Extend a shared primitive only when the behavior is genuinely reusable. Keep a one-off composition local rather than expanding the system prematurely.

## Preserve Family Resemblance

Match the surrounding product in:

1. Information density and whitespace.
2. Page title, toolbar, navigation, and action placement.
3. Typography roles rather than only approximate sizes.
4. Container widths and alignment anchors.
5. Control height, radius, border, and focus treatment.
6. Status language and semantic colors.
7. Empty, error, loading, and permission behavior.
8. Mobile disclosure and overflow strategy.

Do not make a new page look more like a generic template than its own product. Avoid introducing a marketing composition into a work surface, or an operational table into an editorial flow, unless the task requires that shift.

## Control Deviations

Allow a deviation only when at least one condition holds:

1. The existing system cannot express a required behavior or accessibility state.
2. The current pattern causes a demonstrated usability problem.
3. A platform convention materially improves comprehension or operation.
4. The user explicitly requests a new visual direction.

When deviating:

1. Preserve compatible tokens and primitives.
2. Change the smallest coherent layer.
3. Make the new rule reusable only if another real use is visible.
4. Verify the change beside adjacent surfaces.
5. Do not silently redesign unrelated areas to make the deviation appear consistent.

## Handle Inconsistency

If the product contains conflicting patterns:

1. Prefer documented tokens and shared components.
2. Prefer the newer pattern only when repository evidence shows it is the intended direction.
3. Prefer the pattern used by the closest task and audience.
4. Preserve behavior contracts even when visual details differ.
5. Report a material ambiguity if choosing one pattern would create a lasting system decision.

Do not create a third pattern to avoid choosing between two.

## Compare Before Finishing

Render the new work beside its nearest relatives and compare:

1. Does it look like the same product before reading the logo?
2. Does it preserve the product’s density and alignment rhythm?
3. Are shared controls visually and behaviorally identical?
4. Does the new page introduce unexplained tokens or variants?
5. Are responsive and non-default states equally integrated?
6. Is any difference tied to a user need rather than taste?

Finish only when the new work belongs to the product and the product still feels coherent.

## Principle Sources

1. GOV.UK Government Design Principles: be consistent, not uniform.
   https://www.gov.uk/guidance/government-design-principles
2. Nielsen Norman Group: consistency and standards reduce unnecessary learning.
   https://www.nngroup.com/articles/ten-usability-heuristics/
