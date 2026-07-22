# Reference Fidelity

## Contents

1. Fidelity contract
2. Reference inspection
3. Repository inspection
4. Visual inventory
5. Implementation order
6. Comparison loop
7. Responsive inference
8. Acceptable deviations

## Fidelity contract

Treat the selected screenshot, Figma node, mockup, image, video frame, or existing screen as the visual source of truth. Reproduce what is visible rather than converting it into a preferred style.

- Do not add, remove, rename, reorder, simplify, beautify, or modernize visible content unless requested.
- Reproduce intentional irregularity, asymmetry, density, gradients, cards, radii, shadows, illustrations, and platform styling.
- Use the exact variant and state requested. Do not combine features from several references into an invented hybrid.
- Do not use the reference image as a page background, canvas shortcut, or image map. Build semantic, responsive components.
- Do not replace a missing asset or font silently. Locate it, use an authorized exact source, or report the limitation.
- Correct accessibility defects minimally and preserve composition. Do not use accessibility as a reason for an unrelated redesign.

## Reference inspection

Use the highest-fidelity image input available. For GPT-5.6 image analysis, prefer `original` or `auto` detail for dense or spatially sensitive references.

Record:

- source dimensions, crop, orientation, device class, viewport width and height, and likely pixel ratio;
- visible route, theme, locale, state, and scroll position;
- page regions and their order;
- container edges, columns, grids, alignment anchors, baselines, and overlap;
- exact copy, wrapping, truncation, line counts, and alignment;
- font family, fallback evidence, weight, size, line height, tracking, and optical character;
- padding, gaps, margins, radii, borders, dividers, shadows, elevation, and blur;
- color and surface hierarchy;
- every icon, image, illustration, logo, crop, aspect ratio, and focal point;
- visible interaction states and content states;
- evidence of responsive behavior and any uncertainty.

Separate measured or observed properties from inferred behavior. Do not present an assumption as an exact measurement.

## Repository inspection

Before implementation, inspect:

- existing layout primitives, responsive utilities, tokens, and component variants;
- font files, font loading, icon libraries, images, logos, illustrations, and asset aliases;
- neighboring screens and routes that establish local product conventions;
- data contracts, loading behavior, empty states, errors, permissions, and partial states;
- localization, theme, accessibility, animation, and test infrastructure;
- documented browser, device, and viewport support.

Reuse existing assets and components when they can reproduce the target. Add a scoped variant when necessary. Do not install another icon set, typeface, component library, or token framework merely because it resembles the screenshot.

## Visual inventory

Create an internal checklist of every visible element. Missing small items often create large fidelity loss.

For each item capture:

- semantic role and content;
- parent region and alignment anchor;
- width, height, position, padding, and gap relationships;
- typography and wrapping behavior;
- surface, border, radius, elevation, and color;
- icon or image source, dimensions, crop, and alternative text;
- interactive and content states;
- responsive behavior or uncertainty.

## Implementation order

Implement in visual-dependency order:

1. Page canvas, global geometry, containers, columns, and responsive regions.
2. Typography, fonts, line height, text wrapping, and content density.
3. Exact images, icons, logos, illustrations, and crops.
4. Components, controls, borders, surfaces, radii, and elevation.
5. Interactions, keyboard behavior, feedback, and content states.
6. Motion and transitions when present or functionally justified.
7. Micro-spacing, optical alignment, and final polish.

Do not tune small shadows or one-pixel details while global geometry, font metrics, wrapping, or asset crop is wrong.

## Comparison loop

1. Stabilize the environment: exact viewport, browser, operating system, fonts, locale, theme, data, animation state, and device scale.
2. Render the actual implementation in a real browser or target simulator.
3. Capture only after fonts, images, layout, data, and transitions settle.
4. Compare reference and implementation side by side, through transparency overlay, and with a pixel diff when available.
5. Classify differences as missing or extra content, structure, typography, asset, crop, color, spacing, state, or polish.
6. Fix the highest-salience class and repeat.
7. Verify the target viewport again before testing other widths.

Do not mask a region merely because it differs. Mask only genuinely nondeterministic content and document the reason.

Useful diagnostics for a controlled environment, not acceptance tolerances:

- zero missing or extra high-salience elements;
- exact copy and correct assets;
- matching headline wrapping at the reference viewport;
- no font fallback;
- major anchors and container edges within roughly `2 CSS px`;
- small low-salience geometry within roughly `4 CSS px`;
- no visible clipping, overlap, unexpected scrollbar, layout shift, or broken crop;
- pixel-diff budgets calibrated from repeat captures in the same environment.

Rendering varies by operating system, browser, font engine, hardware, and device scale. Do not copy a universal pixel-diff percentage across environments.

For an explicitly exact reproduction, every supplied viewport must pass the project-calibrated visual budget, the fidelity rubric must receive full credit, and every high-salience deviation in content, wrapping, geometry, typography, asset, crop, color, or state must be resolved or explicitly approved. Aggregate rubric scores prioritize fixes; they never waive exact fidelity.

## Responsive inference

When several references exist, map each to a viewport and reproduce the transitions between them. When only one exists, infer the simplest responsive behavior that preserves hierarchy, function, and visual character.

- Preserve content priority and reading order.
- Reflow or reprioritize instead of scaling the whole screen.
- Keep exact fixed values only where the reference proves them or the component requires them.
- Use fluid constraints for containers, text, media, and gaps between known endpoints.
- Keep touch targets and text legible at narrow widths.
- Test long copy, localization expansion, text resize, empty data, maximal data, and short viewports.
- Treat hidden mobile content as a product decision, not a convenience for making the layout fit.

## Acceptable deviations

A visible deviation needs one of these reasons:

- the target platform renders text differently despite correct font and metrics;
- responsive adaptation is required outside the captured viewport;
- an accessibility or functional correction is necessary;
- the user explicitly approved the change.

`It looks better` is not a fidelity reason.

An unavailable required asset or font leaves exact reproduction blocked or incomplete until it is obtained from an authorized source or the user explicitly approves a substitution. Disclosure is required but does not satisfy the fidelity gate.
