# Pixel-Faithful Reproduction of a Design from an Image

## Contents
- Mindset: the image is the spec
- Step 1: Inventory pass
- Step 2: Measurement pass
- Step 3: Structure pass
- Step 4: Build pass
- Step 5: Comparison pass
- Hard rules
- Deriving what the image does not show
- Partial designs and multi-screen sets

## Mindset: the image is the spec

When the user provides a screenshot, mockup, Figma export, or photo of a design, every design decision has already been made. The job is transcription, not interpretation. Fidelity is the only quality metric: a reproduction that is "nicer" than the source is a failed reproduction. All creative-mode defaults in this skill (gradient restraint, font choices, spacing scales) are suspended — the image overrides them. If the source design uses a purple gradient, reproduce the purple gradient exactly.

The two most common failure modes are omission (elements silently dropped) and normalization (the design's actual values silently replaced with framework defaults). The workflow below exists to prevent both.

## Step 1: Inventory pass

Before writing any code, enumerate everything visible in the image, top to bottom, left to right:

1. Sections and containers (header, hero, sidebar, cards, footer, dividers).
2. Every text element with its exact wording.
3. Every interactive element (buttons, links, inputs, toggles, tabs) and its variant.
4. Every icon, logo, image, avatar, illustration, badge, dot, and decorative mark.
5. Repeating patterns and their counts (4 cards, 6 rows, 3 nav items — counts matter).

Write this inventory out explicitly (a short list in your working notes or a comment-free plan). Elements missed at this stage are rarely recovered later. If the image is dense or small, view it carefully region by region; when a crop or zoom capability is available, use it on ambiguous regions.

## Step 2: Measurement pass

Extract concrete values instead of estimating by feel:

- Colors: identify every distinct color — backgrounds, surfaces, text tiers, borders, accents, shadows, overlays. Read exact values from the image. Never snap a color to a known palette (Tailwind `gray-500`, Material tones); if the background is `#F7F5F2`, write `#F7F5F2`, not `bg-gray-50`. In Tailwind use arbitrary values (`bg-[#F7F5F2]`); in CSS use variables holding the extracted values.
- Typography: classify each text style (family class: serif/sans/mono; construction: geometric, grotesque, humanist), then weight, size, line-height, letter-spacing, and case. Estimate absolute sizes by anchoring on body text (typically 14–16px) and measuring other sizes as ratios to it. Note details that identify the face: single-story vs double-story a/g, terminal shapes, x-height, width.
- Spacing: measure paddings and gaps relative to a repeating unit. Verify whether the design actually sits on a 4/8px grid — many do, some do not. Record section padding, card padding, gaps between repeated items, icon-to-text gaps.
- Geometry: border radii per component, border widths, shadow offset/blur/spread/opacity, component heights (buttons, inputs, rows), aspect ratios of images, column width proportions, and alignment lines shared across sections.

## Step 3: Structure pass

Determine how the layout is built before coding it: grid vs flex regions, column counts and their ratio (e.g. sidebar 280px fixed + fluid main), what is centered vs full-bleed, the content max-width, which elements share alignment edges, and what plausibly reflows at other viewport sizes. Reproduce the pictured viewport exactly first; responsiveness is an extension, not an excuse to change the pictured layout.

## Step 4: Build pass

1. Define tokens first from measured values: colors, font stacks, sizes, spacing, radii, shadows as CSS variables (or the framework's token mechanism).
2. Build the layout skeleton with real proportions.
3. Fill in components using the measured geometry.
4. Transcribe all text verbatim — exact wording, casing, and punctuation. Do not paraphrase, translate, or "fix" copy. If the source contains an obvious typo, reproduce it and mention it to the user afterward.
5. Icons: match each icon's shape to the closest icon from one consistent set; do not swap in a different metaphor (a gear must stay a gear).
6. Images: match aspect ratio and treatment. When source assets are unavailable, use neutral placeholders of identical dimensions and tone (solid color sampled from the image or a subject-appropriate substitute), never a clashing stock photo.
7. Load the actual fonts when identifiable and freely available; otherwise choose the closest metric match in the same classification and tell the user about the substitution.

## Step 5: Comparison pass

After building, systematically compare the result against the source, section by section. Render the result and view it side by side with the image whenever a screenshot capability exists; otherwise audit the code against the measurement notes. Check in this order, because earlier items shift everything after them:

1. Element completeness against the Step 1 inventory (nothing missing, nothing added).
2. Layout proportions and alignment edges.
3. Spacing values.
4. Typography: size, weight, line-height, letter-spacing, case.
5. Colors, including text tiers and borders.
6. Radii, borders, shadows.
7. Icon shapes and sizes.
8. Text content verbatim.

Fix deviations and re-compare. One full fix-and-recheck cycle is the minimum; stop only when a section-by-section pass finds no differences you can act on.

## Hard rules

- Never "improve" the design: no added shadows, no swapped fonts, no rebalanced palette, no extra hover flourishes, no upgraded copy. Improvements are deviations.
- Never omit and never invent elements. No extra nav items, footers, or labels that are not in the image.
- Exact colors over named palette stops; exact pixel values over framework spacing steps. If the design's padding is 18px, write 18px, not `p-4` (16px) or `p-5` (20px).
- Keep the pictured style even where it conflicts with this skill's creation-mode taste: gradients, dense layouts, unusual fonts, heavy shadows — reproduce them.
- Preserve proportions by measurement, not by eye: column ratios, image aspect ratios, relative font sizes.
- One icon set, closest shapes; no emoji stand-ins.
- If the user asks for changes on top of the reproduction ("like this, but dark"), reproduce faithfully first in structure and apply the requested delta explicitly — do not let the delta license unrelated changes.

## Deriving what the image does not show

Static images omit interactive states. Derive them from the design's own language instead of inventing a new one:

- Hover: shift the element's existing color by a small step (darken a light button ~6–10%, lighten a dark one), or raise its existing shadow one level. Do not introduce new hues.
- Focus: a visible ring in the design's accent color, 2px with 2px offset, unless the design shows its own focus treatment.
- Active/pressed: one step beyond hover in the same direction.
- Disabled: reduce opacity to ~50% or use the design's muted neutral, and remove elevation.
- If cursor, scrollbar, or selection styling is visible in the image, reproduce it; otherwise leave platform defaults.

State every such derived decision briefly when reporting the result, so the user knows what was measured and what was inferred.

## Partial designs and multi-screen sets

- If the image shows a cropped fragment, build only the fragment; extend repeating structure (more list rows, more cards) only when the user asks, and then strictly by continuing the visible pattern.
- For several screens of one product, extract one shared token set first, then verify every screen against both its own image and the shared tokens; inconsistencies between screens in the source should be surfaced to the user, not silently unified.
- If part of the image is unreadable (compression, occlusion), pick the most conservative value consistent with the rest of the design and flag the assumption.
