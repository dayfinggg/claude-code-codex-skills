# Design standards

Use these as decision criteria, not a universal preset. Product context and user evidence outrank fashion. Read only the sections that apply to the work.

## Contents

1. Decision inputs and complexity
2. Responsive adaptation and platform fit
3. Direction and anti-slop
4. Information architecture and flows
5. Typography and headings
6. Layout, cards, and repeated items
7. Systems, tokens, and components
8. Design-system governance
9. Content, forms, and states
10. Public-web search visibility
11. Performance and motion
12. Accessibility and consequential actions
13. AI-assisted generation
14. AI product features
15. Visual verification

## Decision inputs and complexity

- Establish purpose, audience, task, content, constraints, platform, supported window or device range, and success evidence before selecting a pattern or visual direction.
- Resolve conflicts in this order: observed product context and user evidence; applicable platform guidance (Apple HIG, Material 3, Fluent, or web standards); then the local design system. Use the local system to implement the decision when it can do so. Record and route any necessary divergence to its owner rather than creating an untracked exception.
- Record consequential assumptions. For each, name the decision it changes and the smallest useful validation: inspect current behavior, review analytics, test representative content, ask a domain owner, or run a focused usability check.
- Match effort to risk and scope. Do not force a full system exercise onto a local change, and do not treat a multi-role workflow as independent polished screens.
- For simple work, require one primary task, representative content, the main action, and material feedback or error states.
- For medium work, add a screen or flow map, navigation rules, state and event coverage, responsive priorities, and shared patterns.
- For complex work, add roles and permissions, data ownership, critical end-to-end journeys, concurrency or real-time states, recovery, audit or history needs, and regression coverage.
- Treat safety-critical, financial, medical, destructive, or irreversible actions as complex even when the screen count is small.

## Responsive adaptation and platform fit

- Start from the viewport, window, device, input mode, content density, and task that are most important and constraining for the product. Begin narrow only when narrow use is primary or truly constrains the supported design; do not use “mobile-first” as a universal rule.
- Define what preserves hierarchy, interaction reachability, data visibility, navigation, and recovery at each supported range. Let information stack, condense, reflow, or reveal progressively only when the task remains understandable.
- Test resizable desktop windows, split views, browser zoom, platform text scaling, rotations, safe areas, and external displays when the platform supports them. Do not squeeze a desktop workspace into a phone or inflate a phone layout into an empty desktop canvas.
- Reuse native navigation, input, selection, text, safe-area, and accessibility behavior on the target platform. Make brand expression feel native rather than replacing familiar behavior with a web imitation.
- Use Apple HIG, Material 3, Fluent, and browser guidance as relevant to the actual platform; do not blend their visual languages because they are recognizable.

## Direction and anti-slop

- Define hierarchy, density, type character, palette roles, spatial rhythm, imagery, geometry, and motion instead of a vague mood such as “modern” or “premium.”
- Give one or two details responsibility for identity and keep the rest disciplined. Distinctive does not mean loud.
- Use cards, gradients, glass, pills, large type, grids, and motion when they clarify content, interaction, brand, or platform fit. Do not ban a treatment solely because it is popular.
- Treat stereotyped AI output as a warning signal: purple gradients, cyan glow, glass panels, huge soft radii, floating dashboards, bento grids, gradient text, feature-card triplets, excessive pills, sparkle icons, meaningless charts, and generic aspirational copy require a concrete reason or removal.
- Do not use an aesthetic blacklist as a substitute for product reasoning. A gradient, card, large type, or expressive motion can be correct when it has a specific role in the brief and works with representative content.
- Use real content early. Real labels, lengths, states, data shapes, and errors expose problems hidden by placeholders.
- Check specificity by removing the logo and product name. If the result could belong to any competitor, improve content structure, imagery, typography, or a product-specific interaction before adding decoration.

## Information architecture and flows

- Organize around the user's mental model and decisions, not the database schema or team structure.
- Make the current location, available actions, system status, and next step easy to recognize.
- Keep the primary journey direct. Put optional or advanced decisions after the core path unless they materially change its outcome.
- Use familiar navigation for repeated movement. Do not hide primary destinations behind hover, gestures, or unlabeled icons.
- Preserve user work across validation errors, network failures, authentication changes, and recoverable interruptions.
- For data-dense work, decide deliberately whether the task needs comparison, scanning, editing, spatial manipulation, or chronology. Keep a table, list, canvas, or timeline when that model fits.
- Allow two-dimensional scrolling only when content is genuinely two-dimensional, such as a wide data table, schedule, map, or canvas. Provide orientation and keyboard access.
- Classify high-consequence decisions before choosing a confirmation. Use review, preview, correction, audit, approval, reversible action, or undo according to the actual harm and recoverability.

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
- Prefer plain sections for a single narrative, rows for scanning, tables for column comparison, timelines for chronology, canvases for spatial work, and full-bleed media for editorial emphasis.
- Reserve grid complexity for content that benefits from it. Do not use a bento layout when a linear story or working surface is clearer.

## Systems, tokens, and components

- Reuse existing tokens, components, interaction patterns, and accessibility semantics before introducing variants.
- In a new product, define semantic tokens only after the main flow and content hierarchy are clear.
- Separate primitive, semantic, and component tokens when the product needs all three. Avoid a token layer that merely renames another layer without adding meaning.
- Keep radii, border weights, icon strokes, shadows, and elevation logic coherent. Use elevation to express stacking or interaction, not to decorate every surface.
- Map design assets to production code and preserve the same names, states, intent, and status where feasible. Do not let a Figma library and code library silently diverge.
- Treat a component as a reusable, implementation-backed UI building block with a defined API, states, behavior, accessibility contract, and support boundary. Treat a pattern as reusable guidance for a recurring task or composition; it can combine components and content without becoming a single coded primitive.
- Use token formats for interoperable exchange when that is a real need. The DTCG 2025.10 format supports exchange; it does not create ownership, governance, or product semantics by itself.

## Design-system governance

- Name an accountable owner or owning group and a decision forum. Publish where consumers request changes, who triages them, what evidence is required, and how decisions are recorded.
- Declare one canonical source of truth for each class of decision: tokens, design assets, code, guidance, and release status. Link mappings between them. Do not call multiple independent copies authoritative.
- Require every proposal to state the problem, affected users and products, evidence of repeat need, existing-asset analysis, alternatives, intended platforms, accessibility and state requirements, expected API or composition, documentation, support cost, and migration impact.
- Review proposals with the disciplines that bear the risk: product, design, engineering, content, accessibility, and representative consumers. Use real usage or prototypes with representative people and content when feasibility or usability is uncertain.
- Make lifecycle status visible, for example discovery, preview, and stable. Do not present experimental assets as safe production defaults. Associate each status with clear entry and exit criteria.
- Publish usage, non-usage, variants, states, behavior, accessibility, content guidance, design-to-code mappings, owner, lifecycle status, version, known limits, and change history. Keep docs versioned with the asset and release notes.
- Version consumer-facing assets predictably. State breaking changes, compatibility implications, adoption timing, and the verification consumers must perform. Use a release process that fits the technology instead of adding version labels without a release contract.
- Deprecate with a named replacement, reason, support window, migration mapping, examples, automated support where practical, and removal date. Keep compatibility shims only as long as they reduce real migration risk.
- Measure adoption, exceptions, defects, accessibility regressions, and consumer friction. Revisit ownership and scope when the system no longer serves the products using it.

## Content, forms, and states

- Write specific labels in the user's language. Keep terminology stable and name the outcome of an action.
- Treat a form as a conversation toward a user goal, not a rendering of the data model. Ask only for information needed for the next outcome.
- Explain why unexpected or sensitive data is required before the user enters it. Mark optional fields clearly.
- Put validation near the problem, preserve input, state what happened, and give a recovery action.
- Design default, hover, active, focus, selected, disabled, loading, empty, success, validation, error, offline, permission, and destructive-confirmation states when applicable.
- Avoid hidden hover-only actions unless the action is discoverable and reachable another way.
- Do not invent testimonials, metrics, business claims, capabilities, or realistic-looking user data. Label representative or synthetic data when confusion is possible.
- Keep help consistent across a sequence or repeated pages. Do not make people re-enter information already available in the same process unless security, legal requirements, or another WCAG exception requires it.

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
- Use current Core Web Vitals as measurable targets when public-web performance is in scope. Verify current field thresholds before treating a number as a release target. Use laboratory checks to prevent regressions and field data to understand real users.
- Animate only causality, continuity, hierarchy, or status. Keep motion interruptible and avoid scroll hijacking, chained entrances, decorative loops, blocked input, and layout instability.

## Accessibility and consequential actions

- Target WCAG 2.2 AA for web work and include applicable Level A success criteria across complete processes. Use semantic HTML before ARIA and established WAI-ARIA Authoring Practices for composite widgets.
- Maintain at least 4.5:1 contrast for normal text and 3:1 for large text and meaningful non-text UI where WCAG requires it. Test every theme and state.
- Make every workflow keyboard-operable with visible focus that is not obscured by sticky headers, fixed actions, dialogs, popovers, or other author-created content. Maintain logical focus order and restore focus after dialogs, menus, drawers, route changes, and destructive actions.
- Provide accessible names and instructions. Hide decorative imagery from assistive technology and describe meaningful imagery according to its purpose.
- Provide a non-dragging alternative for functionality that requires a dragging movement, such as move controls beside a sortable list. Meet WCAG 2.2 target size minimum (24 by 24 CSS pixels) or a documented exception, and apply larger relevant platform guidance.
- Avoid authentication that depends solely on recalling, transcribing, or solving a cognitive test. Support paste, password managers, passkeys, or an equivalent accessible route as relevant.
- Avoid redundant entry during a process when the system already has the information, subject to the criterion's permitted exceptions. Keep repeated help mechanisms in a consistent relative location and make relevant help discoverable.
- Support text resizing to 200% and page reflow at 400% zoom or an equivalent 320 CSS-pixel viewport without loss of information or functionality, except where two-dimensional layout is essential.
- Test user-overridden text spacing, reduced motion, increased contrast, forced colors, dark mode, platform text scaling, localization expansion, and RTL where relevant.
- Do not use color, position, shape, sound, or motion as the only carrier of meaning.
- For legal commitments, financial transactions, deletion, or material data changes, design a proportionate review, correction, confirmation, reversal, undo, or audit mechanism. Do not use a confirmation dialog merely as decoration, and do not promise undo if a downstream effect cannot be recovered.

## AI-assisted generation

- Treat AI-produced code, visuals, copy, layouts, tokens, and recommendations as drafts, not as user research, product facts, design decisions, or proof that an interaction works.
- Provide a compact contract: task, user, platform, representative content or data, existing components and tokens, required states, and hard accessibility and responsive constraints.
- Prefer structured design files, component definitions, variables, code mappings, and annotations to screenshots alone. Use targeted comments, annotations, and direct edits to fix local problems rather than repeatedly regenerating a complete interface.
- Verify generated output with real or representative data, semantic structure, every material state, keyboard and assistive-technology behavior, responsive and platform behavior, runtime behavior, and human review before it enters a release candidate.
- Keep a human responsible for product facts, information architecture, visual direction, hierarchy, accessibility, behavior, and release readiness. Treat taste prompts and aggregate ratings as weak evidence until anchored to an observable task or criterion.

## AI product features

- Treat a feature as an AI product feature when users receive, rely on, or delegate action to model output. Design its trust, control, and recovery path as part of the core flow.
- Disclose AI involvement before or at the point it matters. Explain material limits, autonomy, data use, and output provenance or sources when users need them to judge the result. Do not create false certainty or invented citations.
- Let users control activation, scope, inputs, and consequential actions. Provide review, editing, confirmation, stop or cancel, correction, retry, handoff, and recovery appropriate to the feature's impact.
- Preserve user work and provide an intelligible failure state when generation, retrieval, action execution, safety checks, or connectivity fails. Make automated effects reversible or auditable whenever the domain permits.
- Make the feature accessible in its loading, generated, error, correction, and handoff states. Do not require visual inspection, drag-only interaction, or inaccessible authentication to verify or control model output.

## Visual verification

- Render the real interface with representative content. Inspect full pages and close component details.
- Check the actual supported windows, including narrow, standard, wide, and resizable contexts as relevant, plus supported themes and orientations.
- Compare hierarchy, alignment, wrapping, density, color, typography, iconography, imagery, assets, states, and interactions against the brief and established system.
- Exercise keyboard, pointer, touch, assistive technology, and platform behavior where applicable. Verify focus restoration and every visible or claimed action.
- Test long and localized text, empty data, large datasets, loading, errors, permissions, offline behavior, overflow, destructive recovery, and concurrency according to product risk.
- Use automated accessibility checks as a floor. Manually inspect reading order, labels, focus, comprehension, and task completion.
- Keep review mode read-only. Report material defects, evidence, affected users, severity, untested states, and the smallest credible remediation without making the change.
- Iterate on visible defects. Source-code plausibility, a polished screenshot, or AI output is not evidence of product quality.
