# UX Standards: Behavior, States, Accessibility, Motion, Responsiveness

## Contents
- Usability heuristics that shape layout decisions
- Interactive states — every component, every time
- View states — every data surface, every time
- Forms
- Motion
- Responsive behavior
- Accessibility floor (non-negotiable)
- Microcopy and content

## Usability heuristics that shape layout decisions

These are the consensus rules (Nielsen Norman Group heuristics, Laws of UX) that most often decide whether generated UI feels usable. Apply them as defaults, not as decoration:

- Visibility of system status: every action gets feedback within ~100ms (pressed state immediately, then spinner/skeleton if work continues). Users should never wonder whether a click registered.
- Jakob's law: users expect your interface to work like the interfaces they already know. Navigation top or left, logo links home, cart top-right, search with a magnifier, destructive actions guarded. Novelty belongs in visual style, not in interaction conventions.
- Fitts's law: frequent and primary targets are large and close; put primary mobile actions in thumb reach (bottom half), make whole cards/rows clickable rather than tiny inner links.
- Hick's law: fewer visible choices, faster decisions. One primary action per view; secondary actions visually recede; overflow the rest into menus.
- Miller's law / chunking: group content into digestible chunks (5–7 nav items, grouped form sections, grouped settings) instead of long undifferentiated lists.
- Proximity and common region: spacing and containers communicate relationships. Related items sit closer together and share a container; padding within a group is smaller than the gap between groups.
- Aesthetic–usability effect: polish buys tolerance, but never trade clarity for style; a beautiful interface that hides the primary action is a failed interface.
- Doherty threshold: keep perceived response under ~400ms; use optimistic UI and skeletons to hide unavoidable latency.
- Von Restorff: the one thing that must be noticed (primary CTA, current step, error) is the one thing that visually differs. If everything is highlighted, nothing is.
- Tesler's law: complexity that cannot be removed must be absorbed by the interface (smart defaults, autodetection, auto-formatting), not pushed onto the user.
- Match the real world: labels and copy use the user's domain vocabulary, not internal or technical jargon.
- User control and freedom: destructive and multi-step flows always have a marked exit — undo, cancel, back — so mistakes are cheap.
- Error prevention beats error messaging: constrain inputs (masks, pickers, disabled invalid options) and confirm destructive acts instead of relying on validation text.
- Recognition over recall: show options, recent values, and current context in place; never require remembering a value from another screen.
- Peak-end rule: polish the error moments and the final success/confirmation screens disproportionately — they define how the product is remembered.
- Serial position: put the most important navigation items and actions first or last in a sequence, not buried mid-list.
- Postel's law for forms: accept flexible input formats (spaces in card numbers, either date order the locale allows) while keeping the UI's own output strict and consistent.

## Interactive states — every component, every time

Every interactive element ships with all of these states. Delivering only the default state is an incomplete component:

| State | Requirement |
| --- | --- |
| Default | The measured/base style. |
| Hover | A perceivable but small shift: background/border one step darker or lighter, or shadow one level up. Only on hover-capable devices (`@media (hover: hover)`). Never introduce a new hue on hover. |
| Focus-visible | A visible ring: 2px outline, 2px offset (or equivalent box-shadow ring), contrast ≥3:1 against the background. Style `:focus-visible`, never remove outlines without a replacement. |
| Active/pressed | One step beyond hover (darker/inset/scale 0.98). Instant, no transition delay. |
| Disabled | Muted (reduced opacity ~50% or muted tokens), `cursor: not-allowed`, elevation removed, excluded from tab order only when genuinely inert. Prefer explaining why a control is disabled (tooltip/helper) over leaving it mute. |
| Loading | In-place spinner or progress; the control keeps its dimensions (no layout jump), gets disabled against double submits, and keeps its label or swaps to a progress label ("Saving…"). |

Selected/current states (tabs, nav, list selection) must be encoded by more than color alone — add weight, an indicator bar, an icon, or a filled background.

## View states — every data surface, every time

Any view that renders data has five states. Design all of them:

- Empty: never a blank region. Explain what belongs here and give the next step (short heading, one sentence, primary action). First-run empty states are onboarding, not dead ends.
- Loading: skeleton screens for whole-page/content loads (blocks mirroring the final layout: bars for text, rectangles for media), spinners for individual modules and short actions, a determinate progress bar for waits over ~10s. Show no indicator at all for sub-second waits (delay its appearance so fast responses never flash); once shown, keep it visible long enough not to flicker. Skeletons must match the real layout dimensions to prevent layout shift.
- Error: say what happened in plain language, preserve the user's data/input, and give a recovery action (Retry, Go back). Never dead-end with a code alone.
- Partial: lists with few items, missing optional fields, degraded data — the layout must not break at n=1 or n=1000. Use `—` or "No data" for missing values, never `null`, `undefined`, or `NaN`.
- Ideal: the state everyone designs; verify it still holds with realistically long strings (names, emails, titles) — plan for truncation with ellipsis + full value on hover/title.

## Forms

- Labels above fields, always visible. Placeholder text is an example of input ("name@company.com"), never the label — it disappears on focus and fails recall and accessibility.
- Single-column layouts complete faster and misorder less than multi-column; put only tightly-coupled short fields side by side (city/zip).
- Field heights 40–48px; input font-size ≥16px on mobile (prevents iOS auto-zoom).
- Group related fields with headings/fieldsets; order from expected to unexpected, easy to hard.
- Validation timing: validate on blur or on submit — never on every keystroke while the user is still typing into a field (premature errors punish users mid-word). After a field has been corrected, re-validate eagerly so the error clears as soon as it is fixed.
- Error display: below the field, in the error color plus an icon and text (never color alone), specific and actionable ("Password needs at least 8 characters", not "Invalid input"). Keep the user's input intact.
- Mark optional fields with "(optional)" rather than marking required ones with asterisks when most fields are required.
- Use correct input types and autocomplete attributes (`type="email"`, `inputmode="numeric"`, `autocomplete="given-name"`) — they drive mobile keyboards and autofill.
- Keep the submit button enabled and validate on submit (a disabled submit with no explanation strands users); disable only while a submission is in flight.
- Destructive submissions (delete, irreversible sends) get a confirmation step that names the object ("Delete project Alpha?") with the destructive action styled as destructive and not placed where the safe default would be.

## Motion

- Durations: micro-interactions (hover shifts, toggles, button feedback) 100–200ms; small component transitions (dropdowns, tooltips, accordions) 200–300ms; large surfaces (modals, drawers, page transitions) 300–500ms. Anything over ~500ms feels slow in a productivity UI.
- Easing: decelerate into the screen (`ease-out`) for entrances, accelerate out (`ease-in`) for exits, `ease-in-out` for in-place morphs. Linear only for continuous progress (spinners, marquees). Material's verified standard curves are a solid concrete default: standard `cubic-bezier(0.2, 0, 0, 1)`, enter/decelerate `cubic-bezier(0, 0, 0, 1)`, exit/accelerate `cubic-bezier(0.3, 0, 1, 1)`.
- Animate only `transform` and `opacity` (compositor-friendly); never animate layout properties (width/height/top/margin) except deliberately on small elements (accordion height).
- Motion must carry meaning: direct attention, explain a spatial relationship (where the drawer came from), or confirm an action. Decorative ambient animation is reserved for expressive marketing moments — and even then, one orchestrated moment (a staggered page-load reveal) beats scattered micro-effects.
- Respect `prefers-reduced-motion: reduce` in every stylesheet with animation: replace movement with opacity fades or disable the animation.
- Nothing flashes more than 3 times per second (WCAG 2.3.1); no autoplaying carousels or marquees without pause controls.

## Responsive behavior

- Mobile-first CSS; enhance upward. Standard breakpoint ladder unless content dictates otherwise: 640, 768, 1024, 1280 (add 1536 for wide app shells). Let content decide where it breaks — a breakpoint exists because the layout stops working, not because a device exists.
- The layout must survive 320px width without horizontal scrolling (WCAG reflow) and 200% zoom.
- Fluid type for display sizes with `clamp()` (e.g. `clamp(2rem, 1.2rem + 3vw, 3.5rem)`): always mix a rem term with the vw term (a pure-vw size breaks browser zoom and WCAG resize), and keep max ≤ ~2.5× min. Body text stays ~16px, never below 14px for reading text.
- Touch: targets ≥44×44px (Apple HIG) / 48dp (Material); WCAG 2.2 hard minimum 24×24 CSS px with spacing. Primary mobile actions live in the thumb zone (bottom of the viewport); avoid top-corner-only critical actions on phones.
- Hover has no mobile equivalent: any information or action revealed on hover needs a tap/focus path.
- Tables on small screens: collapse to cards or key-value stacks, or allow deliberate horizontal scroll within the table container — never let the page itself scroll sideways.
- Respect safe-area insets (`env(safe-area-inset-*)`) for fixed bars on notched devices.

## Accessibility floor (non-negotiable)

These are WCAG 2.2 AA requirements; treat them as build-breaking constraints, not suggestions:

| Requirement | Value |
| --- | --- |
| Text contrast | ≥4.5:1 against its background; ≥3:1 for large text (≥24px regular or ≥18.66px bold) |
| Non-text contrast | ≥3:1 for UI component boundaries, icons carrying meaning, focus indicators, chart elements |
| Target size | ≥24×24 CSS px minimum (WCAG 2.5.8); 44–48px for comfort on touch |
| Focus visible | Every keyboard-focusable element shows a visible focus indicator |
| Use of color | Color is never the only channel for meaning — pair with icon, text, weight, underline, or pattern (links inside text are underlined) |
| Reflow | Usable at 320px width and 200% zoom without 2D scrolling |
| Motion | `prefers-reduced-motion` honored; no >3Hz flashing |
| Semantics | Real elements: `button` for actions, `a` for navigation, one `h1`, heading levels without skips, `nav/main/header/footer` landmarks, `label` bound to every input, meaningful `alt` (or `alt=""` for decorative images) |
| Keyboard | Everything operable by keyboard alone; modals trap and restore focus, close on Esc; logical tab order |

Muted/secondary text still must meet 4.5:1 — "muted" means less prominent, not illegible; on white, neutrals lighter than ~#767676 fail.

## Microcopy and content

- Buttons say what they do, verb-first ("Save changes", "Create project"), never "OK"/"Yes"/"Submit" where a specific verb fits. Confirmation dialogs never offer bare Yes/No — the buttons restate the action ("Delete", "Keep editing").
- Use realistic, subject-appropriate content in every deliverable: real-sounding names, plausible numbers, coherent copy. Lorem ipsum and "Feature 1/2/3" hide layout bugs and read as unfinished. Plausible does not mean deceptive: invent nothing presented as a real metric, testimonial, logo, or press quote of an actual entity.
- Error messages: what happened, why (if known), what to do next — no blame, no jargon, no codes without explanation.
- Numbers in UI: tabular figures in tables/timers, thousands separators, consistent decimal precision, units stated; dates in one consistent format per product.
- Sentence case for UI labels and headings is the modern default; reserve all-caps for small labels/overlines with letter-spacing. Title Case only if the product's existing voice uses it.
- Truncate with purpose: middle-truncate identifiers (file names, hashes), end-truncate prose, and always preserve a way to see the full value.
