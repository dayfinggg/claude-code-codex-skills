# Scenario examples

Use these examples to choose an appropriate process and structure. They are not templates to copy. Adapt them to the product, content, platform, available window, and existing system. Use only a comparable scenario rather than reading this file as a required checklist.

## Contents

1. Simple surfaces
2. Medium-complexity surfaces
3. Complex surfaces
4. Design-system work
5. Pattern corrections

## Simple surfaces

### Account setting

- Primary task: change one preference and understand when it takes effect.
- Prefer: a direct title, one short explanation if needed, the native control, current value, save or autosave feedback, and a recoverable error.
- Avoid: a hero, summary cards, decorative metrics, a sidebar for one destination, or a confirmation modal for a harmless reversible change.
- Verify: keyboard and label association, pending and saved status, network failure, long localized labels, and text scaling.

### Small marketing page

- Primary task: understand the offer and take one next step.
- Prefer: one product-specific promise, real proof, a dominant visual with narrative value, a clear action, and a short supporting sequence.
- Avoid: three generic feature cards, a logo cloud without context, fake testimonials, gradient text without a role, several equal calls to action, or a hero that consumes the viewport without saying what the product does.
- Verify: the most important public viewport, image crop, readable overlay contrast, meaningful document title, visible text, crawlable links, and LCP behavior.

### Empty state

- Primary task: understand why nothing is shown and what to do next.
- Prefer: name the state, explain the cause only when useful, offer the most likely next action, and preserve filters or context.
- Avoid: a celebratory illustration that overwhelms the message, vague `Get started`, or blaming the user.
- Verify: true-empty, filtered-empty, permission-empty, error, and offline variants are not confused.

### Destructive single-item action

- Primary task: remove, revoke, or reset one item without an accidental or irrecoverable loss.
- Prefer: action language that names the object and effect, a review of the consequence, and undo or recovery when the system can support it.
- Avoid: a generic “Are you sure?” dialog for every harmless action, destructive styling on unrelated actions, or a promise of undo that cannot reverse a downstream effect.
- Verify: keyboard focus after dismissal, screen-reader announcement, cancellation, timeout, permission denial, audit or history behavior, and recovery from an unintended action.

### Compact utility panel

- Primary task: inspect or change a small amount of information in a constrained desktop, browser-extension, or side-panel window.
- Prefer: a compact hierarchy, one clear action, visible status, and layout rules that survive resizing and text scaling.
- Avoid: a phone layout copied into a wide but short panel, a desktop dashboard squeezed into the panel, or icon-only controls without names.
- Verify: minimum and maximum supported window sizes, clipping, keyboard order, focus visibility, and native or platform-specific interaction expectations.

## Medium-complexity surfaces

### Checkout or application form

- Map the stages, required information, validation timing, saved progress, review, payment or submission, confirmation, and recovery.
- Ask only what is needed for the next outcome. Group by user meaning rather than database entities.
- Put help before a difficult field and errors next to the problem. Keep entered data after failure.
- Use a stepper only when stages are stable and knowing progress helps. Do not split a short form merely to appear simple.
- Verify keyboard flow, autofill, input modes, address and name variation, back navigation, duplicate submission, timeout, declined payment, accessible authentication, screen-reader error announcements, and confirmation or correction before a consequential submission.

### Search and filter results

- Make the query, applied filters, result count or scope, sort order, and reset path visible.
- Use a list for scanning varied records, a table for stable column comparison, or cards when each result is a self-contained visual object.
- Keep filter state in the URL when sharing, history, or restoration matters.
- Avoid a card grid for dense operational records, hidden filter chips without labels, and infinite scroll when users need position, totals, or reliable return navigation.
- Verify zero results, partial loading, slow search, stale data, long facets, keyboard operation, return from a result, and whether an ARIA composite widget is actually necessary.

### Editorial article or documentation page

- Put the topic and useful answer early. Use a single clear page title and descriptive section headings.
- Keep reading measure comfortable and allow figures, code, tables, or callouts to break the measure only when their content needs width.
- Use a table of contents when the document is long enough to benefit, not by default.
- Avoid headings for every paragraph, decorative pull quotes that repeat nearby text, and sidebars that compete with the article.
- Verify heading navigation, anchor links, code overflow, image alternatives, print or reader modes when required, and search appearance.

### Mobile content-and-action screen

- Keep the primary content and action reachable without hiding essential navigation.
- Use platform controls, safe areas, system text styles, and layouts that stack at large accessibility sizes.
- Avoid desktop panels squeezed into a narrow viewport, tiny icon-only actions, and fixed bottom actions that obscure focused fields or content.
- Verify keyboard appearance, rotation where supported, interrupted gestures, Dynamic Type or platform equivalent, touch targets, drag alternatives, and recovery after backgrounding.

### Responsive analytics overview

- Identify the decisions users make, data freshness, comparison needs, alert thresholds, and the windows in which the work happens before choosing charts or cards.
- Prefer a table, trend, or summary only when it changes a next action. Preserve decision-critical values and labels as the layout adapts.
- Start from the primary operator window, whether that is a dense desktop workspace or a narrow on-call view, then define deliberate adaptations for the rest.
- Avoid decorative KPI mosaics, fabricated trends, hiding essential filters to create whitespace, and charts with no decision or accessible alternative.
- Verify no-data, stale-data, delayed-data, long values, export, keyboard access to data, high contrast, and responsive behavior with actual data density.

### AI-assisted writing or analysis panel

- Distinguish author-entered content, retrieved sources, and generated draft content.
- Prefer visible scope, inputs, output state, source links or provenance where material, editing, acceptance, discard, retry, and failure recovery.
- Avoid presenting generated assertions as verified facts, hiding automated changes, or making the user restart after a model or network failure.
- Verify long output, unsafe or unavailable output, loading, interruption, keyboard and screen-reader behavior, undo, source handling, and the path for a human to correct the result.

## Complex surfaces

### Data operations workspace

- Define the main object, operator decisions, freshness, selection model, bulk actions, filters, table behavior, detail view, permissions, and audit needs.
- Prefer a stable workspace with compact hierarchy. Use a table when column comparison matters and a side inspector only when it preserves task context.
- Keep status, scope, and destructive impact visible. Separate navigation, filtering, selection, and mutation.
- Avoid a dashboard mosaic, chart decoration, one card per metric, ambiguous icon actions, and hiding essential fields to create whitespace.
- Verify large and sparse datasets, sorting, filtering, selection across pages, optimistic and failed mutations, stale data, concurrent edits, export, permissions, keyboard table navigation, and recovery.

### Collaborative editor

- Define document ownership, presence, selection, unsaved state, autosave, comments, versions, conflicts, permissions, and offline behavior before visual polish.
- Keep the canvas primary and place tools near the object or action they affect. Use progressive disclosure for advanced tools, not core commands.
- Show who changed what when that information affects trust or recovery.
- Avoid permanent panels for rare tools, motion that moves the editing target, and silent conflict resolution.
- Verify simultaneous edits, reconnection, history restore, focus across popovers, large documents, assistive-technology announcements for collaboration events, and destructive recovery.

### Role-based administration

- Model roles, permissions, scope, inheritance, approval, audit, and destructive consequences explicitly.
- Explain effective access, not only configured access. Preview the affected users or resources before a broad change.
- Use tables or trees when they support comparison or hierarchy. Do not flatten complex permission relationships into unrelated cards.
- Verify least-privilege defaults, inaccessible routes, mixed states, partial failure, revocation, audit records, review and confirmation, and recovery from a mistaken change.

### Public catalog or marketplace

- Balance discovery, comparison, trust, and conversion. Define category URLs, facets, item identity, price or availability rules, and indexable content boundaries.
- Use consistent repeated-item anatomy so users can compare. Keep critical attributes in the same order and treatment.
- Provide stable crawlable URLs and links for public categories and items. Prevent filter combinations from creating uncontrolled duplicate indexable pages.
- Avoid fake urgency, hidden fees, unverified ratings, keyword-loaded category copy, and badge overload.
- Verify out-of-stock, variants, localization, pagination or continuation, canonical behavior, structured-data accuracy, and performance with real media density.

### Cross-platform field workflow

- Define the shared task anatomy, core data, ownership, interrupted-work recovery, and platform-specific input or window constraints before sharing visual treatment.
- Keep the same task, labels, and essential state understandable across phone, tablet, desktop, and resizable windows while adapting navigation, density, selection, and tool placement to each context.
- Avoid forcing identical screens across platforms, custom replacements for native text and input behavior, and a mobile-first sequence that hides desktop-critical comparison or bulk actions.
- Verify handoff between devices, offline or weak network, platform text scaling, safe areas, keyboard and pointer behavior, changing window size, and conflict or recovery paths.

### High-consequence transaction or clinical decision

- Define what the person must understand, what the system knows, what must be verified, which role can approve, and what can be reversed or audited.
- Prefer a calm, explicit review path with source data, changed values, status, warnings tied to a specific risk, correction, confirmation, and recorded outcome.
- Avoid urgency theater, generic red warnings, opaque automation, destructive defaults, and modal chains that hide the actual consequence.
- Verify validation and calculation failures, stale inputs, duplicate submission, authorization changes, logout or timeout, assistive-technology announcement, review before commitment, and the actual reversal or escalation path.

## Design-system work

### Component enhancement

- Start with the observed gap, the existing component contract, adoption evidence, supported platforms, and alternatives. Confirm that a new variant is safer than composition or a pattern.
- Define behavior, states, keyboard and touch interaction, semantic structure, content rules, token use, visual variants, API or properties, and code/design mappings.
- Avoid adding a prop, token, or visual variant merely to reproduce a single product screen. Avoid treating a Figma-only asset as shipped system support.
- Verify existing consumers, dark or high-contrast modes, localization, accessibility, visual regression, docs, and release notes before changing the stable contract.

### New pattern proposal

- Establish a repeated user task that existing components do not solve when composed with current guidance. Gather real examples across products or services and show why a local one-off is insufficient.
- Define the decisions, content model, optionality, accessibility, platform differences, examples, non-examples, and relationship to existing components.
- Avoid promoting a one-screen composition to a canonical pattern before evidence shows it transfers. Do not turn a pattern into a component simply to make it easier to browse.
- Verify the pattern with representative users and content, review it with consuming teams, document its scope and limits, and publish its lifecycle status and owner.

### Design-system migration

- Inventory consumers, source-of-truth locations, token and component mappings, breaking differences, visual risk, accessibility risk, release sequence, owners, and success measures.
- Prefer an incremental migration path with explicit old-to-new mappings, compatibility support only where it reduces real risk, release notes, examples, linting or codemods where practical, and a removal date.
- Avoid duplicating an old and new library indefinitely, hiding breaking behavior behind a version label, or declaring a migration complete from a design file alone.
- Verify representative products at runtime, accessible behavior, critical flows, version alignment between code and design assets, documentation, adoption metrics, and the deprecation communication.

## Pattern corrections

### Too many cards

- Weak: every section has a rounded background, shadow, title, and icon even when the content forms one narrative.
- Better: remove containers, keep one page grid, use spacing and headings for sections, and reserve cards for independent repeated objects.

### Too many headings

- Weak: a heading introduces every sentence or small fact.
- Better: combine related facts into one short paragraph, keep headings for genuine sections, and use labels inside components only where they identify a field or state.

### Wrong text scale

- Weak: oversized display text pushes the task below the fold while essential metadata uses tiny low-contrast type.
- Better: size by role and viewing context, keep the task visible, raise essential metadata to a readable role, and test the full hierarchy with user text scaling.

### Decorative dashboard

- Weak: fabricated KPIs, colorful charts, and cards create the appearance of depth without helping a decision.
- Better: start with the operator's current scope, status, next decision, and working data. Add a metric or visualization only when it changes an action.

### Generic AI hero

- Weak: vague aspirational headline, purple gradient, floating UI mockup, three pills, and several competing actions.
- Better: state a specific value in product language, show a real product moment or meaningful image, choose one action, and make the composition specific to the brand and audience. A gradient or card can remain when it has a concrete visual or interaction role.

### SEO applied to private UI

- Weak: keyword headings, meta copy, and marketing paragraphs are added to an authenticated operations screen.
- Better: optimize the screen for orientation and action. Apply search rules only to public pages whose discovery is a product goal.

### Uncontrolled AI action

- Weak: an assistant changes settings or submits data with an unclear scope, no review, and no recovery.
- Better: show what will change and why, let the person inspect and edit the proposed action, require proportionate confirmation, preserve an audit trail, and offer a meaningful recovery path.
