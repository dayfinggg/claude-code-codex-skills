---
name: ui-ux-design
description: Complete professional UI/UX design standards for building or changing any user interface. Use whenever creating or styling web pages, landing pages, dashboards, admin panels, apps, emails, components, or artifacts with visual UI in HTML/CSS/Tailwind/React or any framework; whenever choosing colors, typography, spacing, layout, icons, imagery, or interaction states; when reviewing, fixing, or modernizing a design; and always when implementing a design from a screenshot, mockup, or Figma image — the pixel-faithful reproduction workflow lives here. Trigger even when the request is vague ("make it look good", "polish the interface", "professional landing page") or when UI quality is implied but the word "design" never appears.
---

# UI/UX Design

Un-steered generation converges on a recognizable template look — "AI slop" — and users spot it instantly. This skill exists to produce the opposite: interfaces that look deliberately designed for their subject and behave predictably. It has two jobs, and the first decision is always which one applies.

## Step 0 — pick the mode

1. A reference image exists (screenshot, mockup, Figma export, photo of a design): Reproduction mode. Read [references/image-reproduction.md](references/image-reproduction.md) and follow it strictly. The image is the spec; it overrides every stylistic default in this skill, including the anti-gradient and font rules. Fidelity is the only quality metric.
2. No reference image: Creation mode — the rest of this file.
3. An existing codebase with an established design system: match it. Reuse its established navigation, density, tokens, components, terminology, interaction patterns, empty/loading/error handling, and responsive behavior; this skill fills gaps consistently with what exists and never fights an incumbent system. A locally consistent solution beats a fashionable isolated screen.

Source-of-truth order when modes overlap: explicit user requirements and the chosen reference win first, then the existing product's design system and conventions, then accessibility and functional correctness, then this skill's creation-mode defaults.

## Creation mode — process

Design decisions come from the subject, not from a template. A legal-tech dashboard, a bakery site, and a developer tool must not share a look.

1. Read the context: product category, audience, what the user will do here (read? monitor? buy?), and the emotional register in ~5 words (e.g. "precise, calm, technical, trustworthy, dense"). If the brief names brand colors, fonts, or an existing product, those win.
2. Write a design brief before any code, in your working plan:
   - Palette: 4–6 hex values (1 background, 1 surface, 1–2 text tiers, 1 accent, semantics as needed) with the accent chosen from the subject's world.
   - Typography: a display face and a body face (or one family in two roles), with the classification stated (grotesque / humanist / serif / mono) and why it fits.
   - Spacing unit and density (airy marketing vs dense tool), radius personality (sharp / moderate / soft), separator strategy (borders or shadows — one primary).
   - One signature element: the single memorable move (a distinctive hero treatment, an unusual accent placement, a characteristic pattern) that keeps the page from being anonymous.
3. Critique the brief before building: would this palette+type combo be mistaken for a template? Is it appropriate for the category (editorial serif on a fintech dashboard is a miss)? Does every choice trace back to the subject? Fix the brief, then build.
4. Build in order: design tokens (CSS variables) → layout skeleton → components → interaction and view states → content pass with realistic copy → polish pass.
5. Verify against the checklist at the end of this file; fix; re-verify.

When the user should choose the direction (ambiguous brief, brand-defining work), propose 3–4 distinct directions first — each as background hex / accent hex / typefaces + one-line rationale — and implement only the chosen one.

## Read the references

- [references/design-rules.md](references/design-rules.md) — the full numeric standards for tokens, typography, spacing, color, elevation, radius, components, icons, imagery. Read before choosing visual values in creation mode; consult while building.
- [references/ux-standards.md](references/ux-standards.md) — heuristics, interaction states, view states, forms, motion, responsive rules, the accessibility floor, microcopy. Read when building anything interactive or data-bearing.
- [references/image-reproduction.md](references/image-reproduction.md) — mandatory whenever a design image is provided.

## Hard floor (never ship below this)

These hold in both modes and are not style opinions:

| Constraint | Value |
| --- | --- |
| Text contrast | ≥4.5:1 (≥3:1 for text ≥24px or ≥18.66px bold) |
| UI/icon/focus contrast | ≥3:1 against adjacent colors |
| Touch/click targets | ≥24×24px absolute minimum; 44–48px for primary touch actions |
| Focus | Visible `:focus-visible` ring on every interactive element; outlines never removed without replacement |
| States | Every control: default, hover, focus-visible, active, disabled, loading. Every data view: empty, loading, error, partial, ideal |
| Color as channel | Never the only carrier of meaning — pair with icon, text, weight, or underline |
| Semantics | `button` for actions, `a` for navigation, labeled inputs, one `h1`, heading order, landmarks, meaningful `alt` |
| Motion | `prefers-reduced-motion` respected; nothing flashes >3×/s |
| Reflow | Works at 320px width and 200% zoom without horizontal page scroll |
| Text sizes | Body 16px (14px in dense tools); 12px floor for any text; inputs ≥16px on mobile |
| Content | Realistic, subject-appropriate copy and data — no lorem ipsum, no "Feature 1/2/3", and no fabricated real-world claims (fake testimonials, invented metrics presented as real) |

## Anti-slop constraints

Each of these patterns is a recognized, documented tell of ungoverned AI output. They fail for one root reason: they are decisions nobody made — the statistical median of training data instead of a choice. The single strongest "looks AI-generated" predictor is incoherence: per-element style invention instead of one token per axis (one radius, one shadow scale, one spacing scale, one accent) inherited everywhere.

- Gradients: none unless the brief, brand, or reference demands one. Especially never the purple/indigo-to-blue gradient, gradient text, or gradients as a substitute for choosing a color. Legitimate gradients are subtle, same-temperature, and purposeful (hero atmosphere, image scrims). Flat color with strong typography is the default.
- One accent color. Neutrals do ~90% of the surface (60-30-10). Red/green/amber stay reserved for semantics.
- No emoji as interface icons, ever, and no ✨ sparkles motif. One consistent icon set (e.g. Lucide, Heroicons, Phosphor, Tabler, Material Symbols), one stroke style, sized 16/20/24.
- No default-font branding: Inter, Roboto, Arial, Open Sans, Lato, and raw system-ui as the visible brand face read as unchosen (fine as fallback stacks; dense app UI may still justify a deliberately chosen workhorse sans). Equally, do not converge on the same "distinctive" pick every time — Space Grotesk is the new Inter. Choose type from the subject.
- No uniform `rounded-2xl` + heavy shadow on every element: elevation is information; most content sits flat or at a subtle level, and radius follows one personality consistently.
- No hero + three-feature-cards + centered-everything template as the automatic landing layout; no walls of centered body text; text content is left-aligned by default.
- No glassmorphism-everywhere, no neon-glow-on-dark by default — and no escaping one cliché into another: warm-cream + serif + terracotta and Linear-style dark-with-glow are themselves now templates. Any of these looks is legitimate only when the subject genuinely calls for it.
- No spacing improvisation: every gap comes from the declared scale; inconsistent paddings between sibling cards or sections are defects.
- Density mismatch is slop too: consumer-marketing airiness applied to a data tool (rows of identical giant KPI cards with UPPERCASE overlines and one big number each) or cramped tool density on a story-telling page.

## Core numbers (quick reference)

| Topic | Default |
| --- | --- |
| Type scale | 16px base; ratio 1.125 (dense UI) / 1.2 (product) / 1.25+ (marketing, editorial) |
| Line height | ~1.5 body; 1.1–1.25 headings; unitless |
| Line length | 45–75ch, target ~65ch (`max-width: 65ch`) |
| Spacing scale | 4-based: 4, 8, 12, 16, 24, 32, 48, 64, 96 |
| Containers | Text 65–75ch; app 1100–1280px; dashboard up to 1400–1600px |
| Buttons | Heights 32/40/48; one primary per view |
| Inputs | Height 40–48; label above; validate on blur/submit |
| Radius | One personality: 0–2 / 6–10 / 12–16; concentric: inner = outer − padding |
| Shadows | Layered, y-offset, ≤~10% opacity; 2–3 tiers only |
| Icons | 16/20/24; stroke 1.5–2px; one family |
| Breakpoints | 640 / 768 / 1024 / 1280, mobile-first, content-driven |
| Motion | 100–200ms micro, 200–300ms components, 300–500ms surfaces; ease-out in, ease-in out; animate transform/opacity only |
| Dark mode | Base ≈ #121212–#1E1E1E, optionally hue-tinted (never #000); surfaces lighten with elevation; lighter desaturated accents; borders over shadows |

## Match the surface to its job

Infer the primary user, top task, and platform before choosing a layout family, and ask only when a missing answer would materially change the product, brand, data contract, or safety:

- Marketing and editorial surfaces: a distinctive first viewport with one clear promise, one primary action when the real journey has one, and an authentic visual anchor.
- Applications, dashboards, and admin tools: the working surface comes first, information density stays useful, and a marketing-style hero is out of place.
- Commerce and content products: prioritize discovery, comparison, trust, availability, and conversion over decoration.

## Verify against the real render

Render the real interface at the target viewport and wait for fonts, images, stable data, and animations to settle before capturing or comparing — a screenshot taken mid-load produces false diffs. When fixing gaps against a reference or design contract, fix the largest structural differences first (missing elements, container geometry, alignment, typography, wrapping, asset choice, crop, hierarchy, responsive behavior) and polish shadows and decoration last.

## Content and asset integrity

Do not fabricate logos, testimonials, metrics, prices, integrations, product screenshots, customer names, charts, notifications, avatars, or business claims. Use real project content and supplied assets; when content is unavailable, use neutral structural placeholders only when required and never present them as facts.

Do not substitute supplied logos, photos, illustrations, icons, or fonts with emoji, approximate glyphs, unrelated stock media, generated imagery, or a different library. If a required asset is missing, search the authorized project sources, use an approved asset workflow, or report the limitation instead of inventing a replacement.

## UX heuristics

Keep system status visible, use the user's domain language and consistent terminology, and prefer recognition over memory. Prevent errors where practical and provide clear recovery, cancel, back, undo, or confirmation for consequential actions.

Use native semantics and controls first: a button performs an action, a link navigates. Keep labels visible, specific, and outcome-oriented — placeholder text does not replace a label. Preserve user input after recoverable errors and associate error text with the affected field.

## Final checklist

Run before delivering; fix and re-run until clean:

```
Design review:
- [ ] Mode correct (image provided → reproduction followed exactly, compared section by section)
- [ ] Tokens defined and used everywhere (no stray hex/px mid-file)
- [ ] Palette: neutrals + 1 accent + semantics; contrast verified (4.5:1 / 3:1)
- [ ] Type: ≤2 families + mono, scale respected, line length capped, hierarchy visible in grayscale
- [ ] Spacing: all values on-scale; group gaps > in-group gaps; aligned edges
- [ ] Every interactive element has all 6 states; every data view has all 5 states
- [ ] Focus rings visible; targets ≥24px; keyboard path works; semantic elements used
- [ ] Icons: one set, consistent size/stroke; no emoji-as-icons
- [ ] No anti-slop tells (gradient check, template-layout check, density check)
- [ ] Realistic content; truncation handled; long-string test passes
- [ ] Responsive: 320px OK, thumb-zone actions on mobile, hover has non-hover path
- [ ] Reduced motion respected
- [ ] Top task or primary action is immediately understandable and discoverable
- [ ] No unrequested redesign or substituted asset remains
- [ ] Visual comparison and functional checks were performed when the required tools were available
```

A result that passes this checklist but ignores the brief is still wrong — the brief and the subject always outrank personal defaults.
