# Design standards

Use these as decision criteria, not a universal preset. Product context, user evidence, platform conventions, and an existing design system outrank fashion.

## Contents

1. Evidence and complexity
2. Direction and anti-slop
3. Information architecture and flows
4. Typography and headings
5. Layout, cards, and repeated items
6. Systems and platform fit
7. Content, forms, and states
8. Public-web search visibility
9. Performance and motion
10. Accessibility
11. Generative UI guardrails
12. Visual verification

## Evidence and complexity

- Begin with purpose, audience, task, content, constraints, and success. Aesthetic novelty without product meaning is decoration.
- Record consequential assumptions. For each one, identify the decision it changes and the smallest useful validation: inspect existing behavior, review analytics, test representative content, ask a domain owner, or run a focused usability check.
- Match effort to risk and scope. Do not force a full design-system exercise onto a small local change, and do not treat a multi-role workflow as a collection of independent screens.
- For simple work, require one primary task, representative content, the main action, and material feedback or error states.
- For medium work, add a screen or flow map, navigation rules, state and event coverage, responsive priorities, and shared patterns.
- For complex work, add roles and permissions, data ownership, critical end-to-end journeys, concurrency or real-time states, recovery, audit or history needs, and regression coverage.
- Treat safety-critical, financial, medical, destructive, or irreversible actions as complex even when the screen count is small.

## Direction and anti-slop

- Define hierarchy, density, type character, palette roles, spatial rhythm, imagery, geometry, and motion instead of a vague mood such as modern or premium.
- Give one or two details responsibility for identity and keep the rest disciplined. Distinctive does not mean loud.
- Prefer one strong composition over a collection of independently polished cards. Do not turn every region into a floating rounded container.
- Avoid default AI signatures unless justified by the brief: purple gradients, cyan glow, glass panels, huge soft radii, floating dashboards, bento grids, gradient text, feature-card triplets, excessive pills, sparkle icons, meaningless charts, and generic aspirational copy.
- Do not use an aesthetic blacklist as a substitute for product reasoning. A gradient, card, or large type can be correct when it has a clear role in the brief.
- Use real content early. Real labels, lengths, states, data shapes, and errors expose problems hidden by placeholders.
- Check specificity by removing the logo and product name. If the result could belong to any competitor, strengthen content structure, imagery, typography, or a product-specific interaction rather than adding decoration.

## Information architecture and flows

- Organize around the user's mental model and decisions, not the database schema or team structure.
- Make the current location, available actions, system status, and next step easy to recognize.
- Keep the primary journey direct. Put optional or advanced decisions after the core path unless they materially change its outcome.
- Use familiar navigation for repeated movement. Do not hide primary destinations behind hover, gestures, or unlabeled icons.
- Preserve user work across validation errors, network failures, authentication changes, and recoverable interruptions.
- For data-dense work, decide deliberately whether the task needs comparison, scanning, editing, spatial manipulation, or chronology. Keep a table, list, canvas, or timeline when that model fits.
- Allow two-dimensional scrolling only when the content is genuinely two-dimensional, such as a wide data table, schedule, map, or canvas. Provide orientation and keyboard access.

## Typography and headings

- Define semantic roles before numeric sizes: display, page title, section title, body, label, metadata, code, and status. Use the smallest role set that preserves hierarchy.
- Preserve relative hierarchy when users increase text size. Let layouts stack or reflow instead of truncating essential content.
- Avoid very light weights for small or essential text. Use platform-recommended text styles and minimums for native apps instead of copying web values.
- Minimize typefaces. Add another family only when it contributes a clear editorial, brand, or functional role.
- Use heading elements for document structure, not visual sizing. Give each page a clear main topic and make section headings describe what follows.
- Put information-bearing words early in content headings and links. Replace vague labels such as `Learn more` with the destination or action when context does not already make it clear.
- Keep long-form text at a readable measure and line height. Treat exact character counts as a heuristic, not a universal accessibility rule.
- Avoid all caps for prose, centered long text, full justification that creates uneven gaps, low-contrast body copy, and font weight as the only semantic cue.
- Mirror reading order, alignment, and priority for RTL. Do not merely flip icons while leaving the information hierarchy left-biased.

## Layout, cards, and repeated items

- Use proximity, alignment, whitespace, and typographic contrast before borders, shadows, or background panels.
- Use a limited spacing scale, then allow optical correction when strict arithmetic looks visibly wrong.
- Use a card for a self-contained, comparable object or a clear interaction boundary. Do not use one merely to make a section look finished.
- Define a mini-information architecture for every repeated item: primary identifier, decision-critical attributes, secondary metadata, status, and next action.
- Keep corresponding information in the same order, position, and treatment across comparable items. Random badge placement and inconsistent metadata slow comparison.
- Make the primary destination and secondary actions separate semantic controls. Avoid making a large clickable container compete with nested buttons or links.
- Prefer plain sections for a single narrative, rows for scanning, tables for column comparison, and full-bleed media for editorial emphasis.
- Reserve grid complexity for content that benefits from it. Do not use a bento layout when a linear story or working surface is clearer.

## Systems and platform fit

- Reuse existing tokens, components, interaction patterns, and accessibility semantics before introducing variants.
- In a new product, define semantic tokens only after the main flow and content hierarchy are clear.
- Separate primitive, semantic, and component tokens when the product needs all three. Avoid a token layer that merely renames another layer without adding meaning.
- Keep radii, border weights, icon strokes, shadows, and elevation logic coherent. Use elevation to express stacking or interaction, not to decorate every surface.
- For native apps, follow safe areas, system navigation, input conventions, Dynamic Type or equivalent text scaling, standard controls, and platform settings.
- Make brand expression feel native to the platform. Do not replace familiar platform behavior with web conventions or a custom imitation.

## Content, forms, and states

- Write specific labels in the user's language. Keep terminology stable and name the outcome of an action.
- Treat a form as a conversation toward a user goal, not a rendering of the data model. Ask only for information needed for the next outcome.
- Explain why unexpected or sensitive data is required before the user enters it. Mark optional fields clearly.
- Put validation near the problem, preserve input, state what happened, and give a recovery action.
- Design default, hover, active, focus, selected, disabled, loading, empty, success, validation, error, offline, permission, and destructive-confirmation states when applicable.
- Avoid hidden hover-only actions unless the action is discoverable and reachable another way.
- Do not invent testimonials, metrics, business claims, capabilities, or realistic-looking user data. Label representative or synthetic data when confusion is possible.

## Public-web search visibility

- Apply this section only to public pages intended for discovery. Do not force SEO copy or metadata onto authenticated product surfaces.
- Give each indexable page independent user value, a stable URL, a unique concise `<title>`, a clear visible main topic, and useful page text.
- Use semantic HTML and real `<a href>` links with meaningful link text. Keep essential content in the rendered DOM and make it available without interaction that crawlers cannot reproduce.
- Use descriptive URLs and internal links that reflect the content model. Add canonical URLs when duplicate or variant URLs represent the same primary content.
- Add meta descriptions for useful result summaries. Do not treat them as guaranteed snippets or ranking factors.
- Add structured data only when it matches visible content and a supported search feature. Validate it rather than generating schema speculatively.
- Use sitemaps, robots controls, `noindex`, `hreflang`, and pagination rules only when the site's information architecture calls for them.
- Never use keyword stuffing, invisible search-only text, `meta keywords`, doorway pages, or headings that misrepresent document structure.
- Verify the rendered page with the relevant inspection or rich-result tool when search visibility is an acceptance criterion.

## Performance and motion

- Design loading behavior with the composition. Reserve space for images, embeds, ads, and late data to prevent layout shifts.
- Keep likely largest-content elements discoverable early. Do not lazy-load the probable LCP image without a measured reason.
- Use responsive images, deliberate font loading, and the minimum media quality needed for the viewing context.
- Keep interactions responsive by avoiding long main-thread work and excessive client-side rendering.
- Use current Core Web Vitals as measurable targets when public-web performance is in scope. At the time of this reference, good field thresholds at the 75th percentile are LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1; recheck the source before treating these values as current.
- Use laboratory checks to prevent regressions and field data to understand real users. Do not present a Lighthouse score alone as proof of production performance.
- Animate only causality, continuity, hierarchy, or status. Keep motion interruptible and avoid scroll hijacking, chained entrances, and decorative loops.

## Accessibility

- Target WCAG 2.2 AA for web products. Use semantic HTML before ARIA and established WAI-ARIA patterns for composite widgets.
- Maintain at least 4.5:1 contrast for normal text and 3:1 for large text and meaningful non-text UI where WCAG requires it. Test every theme and state.
- Make every workflow keyboard-operable with visible, unobscured focus and logical order. Restore focus after dialogs, menus, drawers, and route changes.
- Provide accessible names and instructions. Hide decorative imagery from assistive technology and describe meaningful imagery according to its purpose.
- Meet the WCAG 2.2 AA minimum target-size rule and the larger applicable platform guidance. Do not present a platform recommendation as a universal web requirement.
- Support text resizing to 200% and page reflow at 400% zoom or an equivalent 320 CSS-pixel viewport without loss of information or functionality, except where two-dimensional layout is essential.
- Test user-overridden text spacing, reduced motion, increased contrast, forced colors, dark mode, platform text scaling, localization expansion, and RTL where relevant.
- Do not use color, position, shape, sound, or motion as the only carrier of meaning.

## Generative UI guardrails

- Treat AI output as a draft, not user research, a design decision, or proof that an interaction works.
- Provide a compact contract: task, user, platform, representative content or data, existing components and tokens, required states, and hard accessibility and responsive constraints.
- Prefer structured design files, component definitions, variables, code mappings, and annotations to screenshots alone.
- Classify the artifact as a visual mockup, interaction prototype, or production UI. A static screen cannot prove validation, permissions, data operations, accessibility, or recovery.
- Use targeted comments, annotations, and direct edits to fix local problems. Do not repeatedly regenerate an entire interface when the direction is already sound.
- Keep a human responsible for product facts, information architecture, visual direction, hierarchy, accessibility, behavior, and release readiness.
- Treat designer ratings or taste prompts as weak feedback. Prefer concrete, visually anchored critique tied to a task or acceptance criterion.

## Visual verification

- Render the real interface with representative content. Inspect full pages and close component details.
- Check narrow mobile, small laptop, and wide desktop widths, plus relevant platform orientations and resizable windows.
- Compare hierarchy, alignment, wrapping, density, color, typography, iconography, imagery, assets, and states against the brief.
- Exercise keyboard, pointer, and touch behavior where applicable. Verify focus restoration and every visible or claimed action.
- Test long and localized text, empty data, large datasets, loading, errors, permissions, offline behavior, overflow, and destructive recovery according to product risk.
- Use automated accessibility checks as a floor. Manually inspect reading order, labels, focus, comprehension, and task completion.
- Iterate on visible defects. Source-code plausibility and a polished screenshot are not evidence of product quality.
