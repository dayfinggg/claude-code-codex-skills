# Visual Design Rules: Tokens, Type, Space, Color, Depth, Components, Icons, Imagery

## Contents
- Design tokens first
- Typography
- Spacing and layout
- Color
- Elevation and depth
- Border radius
- Component specifications
- Icons
- Imagery

## Design tokens first

Define the system before styling any element. Every project — even a single page — starts with tokens, because consistency is what separates designed from assembled:

```css
:root {
  --bg: #FAFAF9;
  --surface: #FFFFFF;
  --text: #1C1917;
  --text-secondary: #57534E;
  --text-muted: #78716C;
  --border: #E7E5E4;
  --accent: #0D6E6E;
  --accent-hover: #0A5757;
  --accent-fg: #FFFFFF;
  --success: #15803D;
  --warning: #B45309;
  --error: #B91C1C;
  --radius: 8px;
  --space-unit: 4px;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05);
}
```

The values above are a shape, not a house style — derive actual values from the brief. Every color, size, radius, and shadow in the implementation then references tokens; a hardcoded hex mid-file is a defect.

## Typography

- Scale: pick one ratio and generate sizes from a 16px base — 1.125–1.2 (major second / minor third) for dense product and data UI, 1.25 (major third) for balanced product and marketing pages, 1.333+ (perfect fourth) for editorial drama. A practical UI set: 12, 13, 14, 16, 18, 20, 24, 30, 36, 48, 60. Never invent one-off sizes between steps. (Design systems may instead publish discrete role sizes — e.g. Material 3's display/headline/title/body/label roles — which is the same discipline: a fixed set, no improvisation.)
- Body text: 16px default for reading surfaces; 14px acceptable for dense app UI; 12px is the floor (labels, captions, table meta only). Marketing hero body can run 18–20px.
- Line height: ~1.5 for body (1.4–1.6), tightening as size grows — 1.2–1.3 for medium headings, 1.05–1.15 for display sizes. Set line-height unitless.
- Letter-spacing: slightly negative on large headings (−0.01em to −0.025em); default for body; positive (+0.04em to +0.1em) only for small all-caps labels/overlines. Never letterspace lowercase body text.
- Line length: 45–75 characters for prose (target ~65); enforce with `max-width: 65ch` on text blocks, independent of container width.
- Weights: usually 400 body, 500 UI labels/emphasis, 600–700 headings. Create hierarchy with a size+weight+color step, not weight alone at the same size. Avoid pairing adjacent weights (400 vs 500 alone is too subtle for hierarchy).
- Families: maximum 2 per product (display + body, or one family in two roles) plus a mono for code/data. The pairing must contrast in class (serif display + sans body) or be one family used at strongly different sizes/weights.
- Hierarchy through restraint: 3 text colors (primary, secondary, muted), 2 families, ~4 active sizes per view. If everything is bold, nothing is.
- Numbers in data UIs: `font-variant-numeric: tabular-nums` for tables, timers, and any column of figures so digits align.
- Font choice signals context — choose deliberately, never by default: geometric/neo-grotesque sans for product UI and dashboards; humanist sans for text-heavy tools; a serif for editorial, luxury, or cultural subjects; slab/display faces only at display sizes. Load real fonts (self-hosted or Google Fonts) with `font-display: swap` and correct fallback stacks.
- Do not reach for the same overused defaults every generation: Inter is now documented by practitioners as the visual signature of templated AI output, Roboto and Arial read as unchosen, and "distinctive" picks repeated every time (Space Grotesk) become defaults too. When a workhorse sans is genuinely right, prefer a deliberately chosen open-license face (e.g. Geist, IBM Plex Sans) over the automatic default; premium faces (Söhne class) need licenses — suggest, never embed. Body faces must remain faces designed for screen reading; distinctiveness belongs mostly to display type.

## Spacing and layout

- Base unit 4px; compose a scale and stick to it: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Every margin, padding, and gap comes from the scale. Arbitrary values (13px, 27px) are defects outside pixel-faithful reproduction.
- Proximity encodes structure: the gap inside a group is visibly smaller than the gap between groups (e.g. 8 within, 24 between; label sits 4–8 above its field, 16–24 below the previous one). When spacing is uniform everywhere, structure disappears.
- Section rhythm: within-section spacing 16–32; between sections 64–96 (marketing) or 32–48 (apps). Vertical page rhythm should step, not drift.
- Whitespace is a feature: when a layout feels off, the first fix is more space, not more decoration. Cramped kills more designs than plain does.
- Containers: readable text 65–75ch; app content 1140–1280px max-width (the cross-framework convention); wide dashboards 1400–1600px; center with side padding 16px (mobile), 24px (tablet), 32–48px (desktop).
- Grid: 12 columns for pages, gutters 16–24px; inside app shells prefer explicit CSS grid areas (sidebar 240–280px + fluid main). Align to shared edges — misaligned edges between sections read instantly as sloppy.
- Component padding: buttons — vertical 8–12, horizontal 2–2.5× the vertical (e.g. 10×20); inputs — 10–12 vertical, 12–16 horizontal; cards — 16–24 all around; modals — 24; table cells — 12–16 horizontal, height from row spec.
- Left-align text content by default. Center only short display moments (hero headline, empty state, dialog). Never center paragraphs of body text or forms.
- Density is a decision: consumer/marketing = airy; professional tools = denser with smaller steps (12/13px text, 32–36px controls, 8–12 paddings). Pick one density and apply it everywhere — mixed density in one view reads as broken.

## Color

- Build the palette as: 1 neutral ramp (10–12 steps, e.g. 50–950), 1 accent, 3–4 semantic colors (success green, warning amber, error red, info blue/neutral), and let neutrals do ~90% of the work (60-30-10: dominant neutral, secondary surfaces, accent ≤10%).
- Tint the neutrals: pure gray is lifeless; shift neutrals slightly toward the accent's hue or toward warm/cool per the brief (stone/slate/zinc directions). Backgrounds off-white (#FAFAF9, #F8FAFC-class), text near-black (#0A0A0A–#1C1C1C) — pure #000-on-#FFF is harsh; but keep contrast ≥ the floor.
- One accent. The accent means "interactive/important here". Two competing accents halve the meaning of both; additional hues enter only through semantic states and data viz.
- Saturation scales inversely with area: large surfaces desaturated, small elements (buttons, badges, indicators) can be vivid. A saturated full-screen background is almost always wrong outside deliberate brand moments.
- Semantic colors are reserved: red only for errors/destruction, green for success, amber for caution. Never decorate with them, and never let the accent be confusable with the error color.
- Text tiers: primary ~#111-class, secondary ~#555–#666-class, muted ~#777-class — all still ≥4.5:1 on their background. Placeholder text may sit at 3:1 territory only because it is not content.
- Contrast (WCAG 2.2 AA): ≥4.5:1 body text, ≥3:1 large text (≥24px / ≥18.66px bold), ≥3:1 icons, borders of inputs, and focus rings. Verify accent-on-white and white-on-accent both pass before committing to an accent value.
- Dark mode is its own palette, not an inversion: base surfaces in the #121212–#1E1E1E class (the established convention; may be tinted toward the brand hue, never pure #000 — OLED smearing and halation), surfaces get lighter as they elevate (bg → surface → raised surface), borders become the main separator (shadows barely read), text is off-white (#E5E7EB-class, not #FFF) with muted tiers, and accents shift to lighter, desaturated tones (a 200–300-class tone instead of the light theme's 500–600) to keep contrast and avoid vibration. Semantic colors need their own dark variants that keep contrast.
- Gradients are a scalpel, not a default. Justified: subtle same-hue/neighbor-hue shifts adding depth to a hero or brand surface, scrims under text on images, data-viz encodings. Not justified: purple-to-blue on anything, gradients as filler for undecided color, gradient text on UI, multiple competing gradients, gradients on small controls. When in doubt, flat color with good typography wins. If a gradient stays, keep both ends in the same temperature and low delta (ΔL small, hue shift ≤ ~30°).
- Borders: 1px, low-contrast neutral (roughly neutral-200 on light, neutral-800 on dark). Borders and shadows both separate surfaces — pick a primary separator per product; heavy use of both on one element is noise.

## Elevation and depth

- Elevation is information: higher shadow = closer to the user = more transient/important (dropdowns, popovers, modals). Static page content sits low (none or `--shadow-sm`); floating surfaces step up. A page where every card carries a large shadow says nothing and looks amateur.
- Use layered, low-opacity shadows (two layers: tight ambient + softer directional), y-offset only, opacity ≤ ~0.1 per layer on light UI:
  - sm: `0 1px 2px rgb(0 0 0 / 0.05)`
  - md: `0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)`
  - lg: `0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)`
  - Modal/popover tier: `0 20px 25px -5px rgb(0 0 0 / 0.12), 0 8px 10px -6px rgb(0 0 0 / 0.08)`
- On colored/dark backgrounds, tint the shadow with the background hue instead of pure black; on dark mode rely on surface lightness + borders, keeping shadows minimal.
- Cards on a tinted page background often need only `--surface` + 1px border + sm shadow; border-only cards are a legitimate, calmer choice — decide once per product.
- Never stack a strong border and a strong shadow on the same element, and never use inner shadows for depth on modern UI (inputs excepted in some systems' pressed states).

## Border radius

- Radius is a personality decision made once: sharp (0–2px, technical/editorial), moderate (6–10px, the contemporary product default), soft (12–16px, friendly consumer), pill/full (only chips, pills, avatars, toggles, FABs). Mixing personalities in one view (pill buttons + sharp cards) reads as unassembled.
- Scale radii with element size: controls (buttons/inputs) ~6–8px, cards/modals ~12–16px, tiny elements (checkboxes, badges) ~4px — one consistent scale, not per-element whims.
- Nested (concentric) radii: inner-radius = outer-radius − padding between them. A 16px card with 12px padding gives inner elements 4px; equal radii on nested elements look subtly wrong.
- `border-radius: 50%` only for genuinely circular elements; `9999px` for pills.

## Component specifications

Buttons
- Heights: 32px (compact/dense), 40px (default), 48px (prominent/mobile-primary); horizontal padding ≈ height × 0.5–0.6; label 14–16px, weight 500–600.
- Hierarchy per view: exactly one primary (filled accent); secondary = outline or tonal fill; tertiary = ghost/text. Destructive = filled/outline error color, only for destructive acts.
- Icon+label gap 8px; icon 16–20px matched to label size. Icon-only buttons: square, radius from scale, mandatory `aria-label`, ≥40px hit area (24px absolute floor).
- Full states per the UX reference; loading keeps width; no all-caps labels unless the brief's system uses them.

Inputs and selects
- Height 40–48px, radius from control scale, 1px border in neutral-300-class, background surface or subtle neutral; label above (13–14px, weight 500); helper/error text 12–13px below.
- Focus: border switches to accent + 2px ring (`box-shadow: 0 0 0 3px accent/20%` pattern or outline+offset); error state: error border + message + icon; disabled: muted bg, no border emphasis.
- Prefix/suffix icons 16–20px, muted color, 12px inset.

Cards
- Padding 16–24px; radius one step above controls; one separator strategy (border or sm shadow); internal hierarchy: title 16–18/600, meta 12–13 muted, body 14–16.
- Entire card clickable when it represents one object — then give the card the hover/focus treatment and avoid nested competing links; max one primary action visible per card.

Navigation
- Top bar: 56–64px tall, ≤7 primary items, active item marked by weight/indicator (not color alone). Sidebar: 240–280px, items 36–40px tall with 8–12px radius hover/active blocks, section labels 11–12px all-caps muted with letter-spacing.
- Breadcrumbs for hierarchies ≥3 deep; current page unlinked.
- Mobile: collapse into bottom tab bar (3–5 destinations, 56–64px tall, icon+label) or drawer; thumb-first placement for the primary action.

Tables
- Text left-aligned; numbers right-aligned with tabular figures; headers left/right-matched to their column, 12–13px, weight 500–600, muted, sentence case.
- Row heights: 36–40px dense, 44–52px comfortable; horizontal cell padding 12–16px; row separators: 1px hairlines or zebra — not both; row hover highlight for interactive tables; sticky header on long scrolls.
- Empty/loading/error states per the UX reference; align cell truncation with a tooltip for full values.

Modals and overlays
- Widths: 400px (confirm), 560px (form), 720px (rich content); max-height ~85vh with internal scroll; padding 24px; radius from card scale; backdrop `rgb(0 0 0 / 0.5)` (lighter on dark themes).
- Title 18–20/600, actions right-aligned (primary rightmost) or full-width stacked on mobile; Esc, backdrop click, and an explicit close all work; focus trapped and returned.
- Prefer inline/sheet/popover patterns over modals for non-blocking tasks; never stack modals.

Toasts, badges, tooltips
- Toasts: fixed corner (or bottom-center mobile), auto-dismiss 4–6s, pausable on hover, optional single action; never for errors requiring action — those belong inline.
- Badges/chips: height 20–24px, text 11–12px/500, padding 6–10px horizontal; status badges pair a dot/icon with the label (not color alone).
- Tooltips: 12–13px, dark-on-light inverse surface, delay ~300–500ms, only for supplementary info — never hide essential actions' only label in a tooltip on touch devices.

## Icons

- One family per product, one style within it (all outline or all filled; filled variant of the same family may mark active states). Never mix sets casually and never use emoji as interface icons — emoji render inconsistently across platforms and read as unfinished.
- Sizes on the grid: 16px (inline, dense UI), 20px (default UI), 24px (primary/nav); scale by these steps, not arbitrary values. Icons draw within a ~20×20 live area of the 24px frame (2px keyline padding). Keep stroke width consistent (typically 2px at 24px, 1–1.5px at 16px within one family) — mixed stroke weights are immediately visible.
- Respected, actively maintained open sets (licenses verified): Lucide (ISC, 24px grid — the maintained successor of Feather), Heroicons (MIT, outline+solid, Tailwind ecosystem), Phosphor (MIT, six weights), Tabler (MIT, 24px grid, 2px stroke), Material Symbols (Apache — the current Google set; classic Material Icons is deprecated, do not use it). Pick by stroke character matching the typeface's weight.
- Icons accompany, not replace, labels for primary actions; icon-only is acceptable for universally known metaphors (search, close, settings) with `aria-label` and a tooltip on hover-capable devices.
- Optical alignment: icons sit on the text's optical center (usually `vertical-align` or flex `align-items: center` with the icon 1px down at small sizes); gap to label 6–8px.
- Meaningful icons meet 3:1 contrast; decorative ones are `aria-hidden`.

## Imagery

- Fixed aspect ratios per role, enforced with `aspect-ratio` + `object-fit: cover`: 16:9 media/hero cards, 4:3 or 3:2 content cards, 1:1 avatars and product tiles. Never distort, never let differing image sizes break a grid.
- One treatment per product: consistent tone/saturation/crop style across all photos; mixing warm lifestyle shots with cold renders in one grid reads as unassembled.
- Avatars: circles for people, one consistent rounded-square for non-human entities (teams, bots, orgs) — the convention across major design systems; sizes 24/32/40/48 (small in lists, 40–48 on cards, 64+ on profiles); fallback = initials on a deterministic tinted background, never a broken-image glyph.
- Text over images requires a guaranteed-contrast layer: a scrim (bottom-up black gradient at 40–60%, a functional gradient that is always legitimate), a blurred/darkened region, or a solid panel — checked against the lightest possible image.
- SVG for logos, icons, and illustration; raster only for photography; supply `srcset`/2x for raster; lazy-load below the fold; reserve space via `aspect-ratio` to prevent layout shift.
- Placeholders while loading: dominant-color or blur-up or skeleton — matching final dimensions. In mockups/demos, use subject-appropriate imagery (real Unsplash-style themes, coherent product shots), not gray boxes with an X, and never images whose style fights the palette.
- Decorative background imagery must never sink text contrast below the floor; test at the image's lightest region.

For charts and dashboards, the dedicated dataviz skill (when installed) governs chart form, palettes, and axes — do not restyle charts ad hoc here.
