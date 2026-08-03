# Scenario examples

Use these examples to choose an appropriate process and structure. They are not templates to copy. Adapt them to the product, content, platform, and existing system.

## Contents

1. Simple surfaces
2. Medium-complexity surfaces
3. Complex surfaces
4. Pattern corrections

## Simple surfaces

### Account setting

- Primary task: change one preference and understand when it takes effect.
- Prefer: a direct title, one short explanation if needed, the native control, current value, save or autosave feedback, and a recoverable error.
- Avoid: a hero, summary cards, decorative metrics, a sidebar for one destination, or a confirmation modal for a harmless reversible change.
- Verify: keyboard and label association, pending and saved status, network failure, long localized labels, and text scaling.

### Small marketing page

- Primary task: understand the offer and take one next step.
- Prefer: one product-specific promise, real proof, a dominant visual with narrative value, a clear action, and a short supporting sequence.
- Avoid: three generic feature cards, a logo cloud without context, fake testimonials, gradient text, several equal calls to action, or a hero that consumes the viewport without saying what the product does.
- Verify: mobile first viewport, image crop, readable overlay contrast, meaningful document title, visible text, crawlable links, and LCP behavior.

### Empty state

- Primary task: understand why nothing is shown and what to do next.
- Prefer: name the state, explain the cause only when useful, offer the most likely next action, and preserve filters or context.
- Avoid: celebratory illustration that overwhelms the message, vague `Get started`, or blaming the user.
- Verify: true-empty, filtered-empty, permission-empty, error, and offline variants are not confused.

## Medium-complexity surfaces

### Checkout or application form

- Map the stages, required information, validation timing, saved progress, review, payment or submission, confirmation, and recovery.
- Ask only what is needed for the next outcome. Group by user meaning rather than database entities.
- Put help before a difficult field and errors next to the problem. Keep entered data after failure.
- Use a stepper only when stages are stable and knowing progress helps. Do not split a short form merely to appear simple.
- Verify keyboard flow, autofill, input modes, address and name variation, back navigation, duplicate submission, timeout, declined payment, and screen-reader error announcements.

### Search and filter results

- Make the query, applied filters, result count or scope, sort order, and reset path visible.
- Use a list for scanning varied records, a table for stable column comparison, or cards when each result is a self-contained visual object.
- Keep filter state in the URL when sharing, history, or restoration matters.
- Avoid a card grid for dense operational records, hidden filter chips without labels, and infinite scroll when users need position, totals, or reliable return navigation.
- Verify zero results, partial loading, slow search, stale data, long facets, keyboard operation, and return from a result.

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
- Verify keyboard appearance, rotation where supported, interrupted gestures, Dynamic Type or platform equivalent, and touch targets.

## Complex surfaces

### Data operations workspace

- Define the main object, operator decisions, freshness, selection model, bulk actions, filters, table behavior, detail view, permissions, and audit needs.
- Prefer a stable workspace with compact hierarchy. Use a table when column comparison matters and a side inspector only when it preserves task context.
- Keep status, scope, and destructive impact visible. Separate navigation, filtering, selection, and mutation.
- Avoid a dashboard mosaic, chart decoration, one card per metric, ambiguous icon actions, and hiding essential fields to create whitespace.
- Verify large and sparse datasets, sorting, filtering, selection across pages, optimistic and failed mutations, stale data, concurrent edits, export, permissions, and keyboard table navigation.

### Collaborative editor

- Define document ownership, presence, selection, unsaved state, autosave, comments, versions, conflicts, permissions, and offline behavior before visual polish.
- Keep the canvas primary and place tools near the object or action they affect. Use progressive disclosure for advanced tools, not core commands.
- Show who changed what when that information affects trust or recovery.
- Avoid permanent panels for rare tools, motion that moves the editing target, and silent conflict resolution.
- Verify simultaneous edits, reconnection, history restore, focus across popovers, large documents, and assistive-technology announcements for collaboration events.

### Role-based administration

- Model roles, permissions, scope, inheritance, approval, audit, and destructive consequences explicitly.
- Explain effective access, not only configured access. Preview the affected users or resources before a broad change.
- Use tables or trees when they support comparison or hierarchy. Do not flatten complex permission relationships into unrelated cards.
- Verify least-privilege defaults, inaccessible routes, mixed states, partial failure, revocation, audit records, and recovery from a mistaken change.

### Public catalog or marketplace

- Balance discovery, comparison, trust, and conversion. Define category URLs, facets, item identity, price or availability rules, and indexable content boundaries.
- Use consistent repeated-item anatomy so users can compare. Keep critical attributes in the same order and treatment.
- Provide stable crawlable URLs and links for public categories and items. Prevent filter combinations from creating uncontrolled duplicate indexable pages.
- Avoid fake urgency, hidden fees, unverified ratings, keyword-loaded category copy, and badge overload.
- Verify out-of-stock, variants, localization, pagination or continuation, canonical behavior, structured data accuracy, and performance with real media density.

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
- Better: state a specific value in product language, show a real product moment or meaningful image, choose one action, and make the composition specific to the brand and audience.

### SEO applied to private UI

- Weak: keyword headings, meta copy, and marketing paragraphs are added to an authenticated operations screen.
- Better: optimize the screen for orientation and action. Apply search rules only to public pages whose discovery is a product goal.
