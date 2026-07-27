# Accessibility and Rendered Verification

Treat accessibility as a design constraint from the first decision, not as a final checklist. Target WCAG 2.2 AA for web interfaces unless the product requires a stricter standard.

## Semantic and Keyboard Baseline

1. Use native elements and platform controls before recreating their behavior.
2. Preserve meaningful heading order, landmarks, lists, tables, labels, and relationships.
3. Give every interactive control an accessible name.
4. Keep the complete flow operable by keyboard.
5. Keep focus order aligned with reading and interaction order.
6. Show a visible focus indicator and prevent sticky content or overlays from obscuring it.
7. Return focus logically after dialogs, deletion, navigation, and asynchronous changes.
8. Announce consequential dynamic status without duplicating routine content.

Do not add ARIA where native semantics already express the behavior. Do not use a visual element as a control without implementing the full keyboard and accessibility contract.

## Numeric Requirements and Conventions

Apply the correct category:

| Rule | Category |
|---|---|
| Text contrast at least 4.5:1 for normal text | WCAG 2.2 AA requirement |
| Text contrast at least 3:1 for large text | WCAG 2.2 AA requirement |
| Relevant non-text UI contrast at least 3:1 | WCAG 2.2 AA requirement |
| Text can resize to 200% without loss | WCAG 2.2 AA requirement |
| Reflow without two-dimensional scrolling at the equivalent of 320 CSS px, except essential two-dimensional content | WCAG 2.2 AA requirement |
| Pointer target at least 24 by 24 CSS px or meeting the spacing exception | WCAG 2.2 AA requirement |
| Touch target around 44 by 44pt | Apple platform convention |
| Touch target at least 48 by 48dp | Android platform convention |

Prefer approximately 44 CSS px for important touch-oriented web controls when the layout permits, while recognizing that WCAG’s normative AA minimum is 24 CSS px with defined exceptions.

## Forms and Errors

1. Keep labels visible.
2. Associate labels, hints, constraints, and errors programmatically.
3. Do not encode required, invalid, selected, or successful states by color alone.
4. Identify the field, problem, and correction in the error message.
5. Place errors where they can be found and provide a summary for long forms when useful.
6. Preserve input after submission errors.
7. Use autocomplete for recognized personal-data purposes.
8. Do not disable paste, browser zoom, or assistive input.

## Content and Perception

1. Write concrete headings, labels, and action names.
2. Provide text alternatives for meaningful non-text content.
3. Treat decorative images as decorative.
4. Caption or otherwise support time-based media as required.
5. Avoid instructions based only on position, shape, sound, or color.
6. Keep content understandable at zoom and with larger text.
7. Test long translations, bidirectional text when relevant, and user-generated content.

## Motion and Timing

1. Respect reduced-motion preferences.
2. Avoid flashes and unnecessary parallax.
3. Do not make essential comprehension depend on animation.
4. Allow users to pause or control moving information where required.
5. Warn about time limits and provide extension where the product permits.

## Rendered Verification Loop

Use the actual product runtime:

1. Establish the expected route, data, viewport, theme, and user state.
2. Render narrow, medium, and wide layouts.
3. Inspect default and all material non-default states.
4. Traverse the primary flow using only the keyboard.
5. Inspect visible focus, focus order, labels, announcements, errors, and recovery.
6. Check contrast using computed foreground and background colors.
7. Zoom and enlarge text; inspect clipping, overlap, truncation, and loss of function.
8. Check narrow reflow and necessary overflow.
9. Check target size and spacing for pointer and touch use.
10. Enable reduced motion and inspect transitions.
11. Run available automated accessibility tooling.
12. Fix defects and repeat affected checks.

Automation cannot prove understandable language, correct focus placement, useful alternatives, appropriate hierarchy, or complete state behavior. Pair automated checks with manual inspection.

## Visual Product-Fit Review

Compare the rendered work with the design contract and adjacent surfaces:

1. Is the primary task apparent within a quick scan?
2. Does emphasis match importance?
3. Are alignment, spacing, typography, and density coherent?
4. Do controls look and behave like the same product?
5. Does content wrap naturally with real data?
6. Are icons, imagery, and motion purposeful?
7. Does every state preserve orientation and offer a next step?
8. Does the interface remain usable without color, animation, or pointer input?

Do not claim that visual quality, responsiveness, or accessibility was verified if the product was not rendered or the relevant check was not performed.

## Evidence

Capture only evidence useful to the task:

1. Representative screenshots for material viewports or before-and-after comparisons.
2. The exact states exercised.
3. Automated accessibility results and their scope.
4. Relevant test, lint, type, and build output.
5. Remaining limitations, such as unavailable production data or assistive technology.

## Sources

1. WCAG 2.2 normative standard.
   https://www.w3.org/TR/WCAG22/
2. WCAG understanding documents for target size and focus appearance.
   https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
   https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html
   https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html
3. Apple accessibility guidance.
   https://developer.apple.com/design/human-interface-guidelines/accessibility
4. Android touch-target guidance.
   https://support.google.com/accessibility/android/answer/7101858
