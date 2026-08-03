---
name: design-ui-ux
description: Design, implement, or review UI/UX when a user-facing surface needs product, interaction, visual, accessibility, design-system, responsive, or public-web presentation judgment. Skip backend, mechanical frontend work with a settled design, and generic code review.
---

# Design UI/UX

## Select the mode

Choose one mode before acting.

- **Design**: establish or revise the experience, information architecture, interaction model, visual direction, and acceptance criteria. Produce only the artifact the user requested.
- **Implement**: inspect the established product and design direction, then make the smallest production-quality UI change that satisfies the request. Do not invent a visual system when the task has no material design decision.
- **Review**: inspect an existing interface, artifact, or diff and report evidence-backed findings, risks, and recommendations. Remain read-only: do not edit files, design assets, configuration, generated output, or external state.
- **Review and fix**: select implement mode, complete a read-only review phase first, then make the requested changes in the same task. Preserve the standalone review mode's read-only boundary.

Ask one focused question only when the mode would materially change whether files or external state may be edited. Otherwise choose the least invasive mode that still completes the request and state any consequential assumption in the result.

## Establish the decision context

1. Inspect the actual product context before proposing a solution: purpose, users, core task, content and data shapes, brand, platform, supported windows or devices, constraints, success measures, existing screens, states, components, tokens, assets, and accessibility behavior. Use representative content rather than invented metrics, testimonials, capabilities, or realistic-looking user data.
2. Separate observed facts from assumptions. For each assumption that could alter information architecture, navigation, a form, permissions, or a high-consequence action, identify the smallest useful way to validate it.
3. Resolve conflicts in this order: product context and user evidence; then applicable platform guidance (Apple HIG, Material 3, Fluent, or web standards); then the local design system. Use the local system as the implementation vehicle whenever it satisfies the higher-priority need. If it does not, document the divergence and bring it to the system owner instead of silently forking it.
4. Read references selectively. Read [design standards](references/design-standards.md) only for the relevant decision areas. Open [scenario examples](references/scenario-examples.md) only when a comparable task or complexity level needs a concrete model. Consult [source notes](references/sources.md) for current, disputed, platform-specific, accessibility, governance, search, performance, AI, or provenance questions; do not load every source by default.

## Match the process to the task and available window

- For a simple surface, define the primary task, representative content, main action, material feedback or error state, and the relevant viewport or device window.
- For medium work, add the journey or screen map, navigation rules, state and event coverage, responsive adaptation, and shared patterns.
- For complex, multi-role, data-dense, collaborative, safety-critical, financial, medical, destructive, or irreversible work, add roles and permissions, data responsibilities, critical end-to-end journeys, recovery, history or audit needs, and proportionate regression coverage.
- Adapt layouts to the windows, devices, input modes, content density, and task users actually need. Start with a narrow layout only when narrow use is primary or it is the most constraining supported context. Otherwise begin with the most important constrained window and specify how the experience adapts across the supported range. Never treat “mobile-first” as a substitute for responsive reasoning.

## Design and implement the experience

1. Resolve the flow before decorating it. Define information architecture, navigation, reading and focus order, hierarchy, decisions, state transitions, validation, error recovery, responsive priorities, and content responsibilities. Do not substitute polished static screens for a working journey.
2. State a context-specific visual direction through type character, palette roles, density, spatial rhythm, imagery, geometry, and only the signature details the product needs. Prefer familiar controls and navigation; use originality where it improves brand expression, composition, or comprehension without changing a learned interaction gratuitously.
3. Treat gradients, glass, cards, large type, rounded geometry, grids, and motion as tools rather than bans. Use each only when it has a clear product, hierarchy, content, or platform role. Reject generic AI slop and unverified visual decisions: repetitive bento stacks, floating-card mosaics, decorative dashboards, fake data, generic hero copy, random iconography, and style copied from a prompt without evidence are warning signs, not a replacement for product judgment.
4. Build hierarchy with semantic structure, typography roles, proximity, alignment, and meaningful containers. Use headings for document structure, not decoration or spacing. Use cards for self-contained comparable objects or clear interaction boundaries; choose lists, tables, timelines, canvases, plain sections, or full-bleed composition when they fit the task better.
5. Treat copy and states as interface material. Use stable domain language, labels that predict outcomes, and errors that explain recovery. Cover default, selected, hover, focus, disabled, loading, empty, success, validation, error, offline, permission, and destructive states when applicable.
6. In implementation mode, use the established stack, semantic controls, real components, code-native text, representative data, and existing tokens and components first. Do not ship screenshots as interfaces or use a generated visual as proof of behavior. Follow the repository's engineering and architectural conventions when retained source code or frontend boundaries are in scope.

## Evolve design systems deliberately

When design-system work is in scope, establish an accountable owner, the canonical source of truth for tokens, design assets, code, and documentation, and the decision process before adding an asset. Define a **component** as a reusable, implementation-backed UI building block with a stable interface. Define a **pattern** as guidance for composing components and content to solve a recurring user task; it may have examples but is not automatically a coded primitive.

Require a proposal to name the user and product problem, evidence of repeat use, existing-asset analysis, intended scope and platforms, alternatives, states, accessibility, content, code, documentation, and migration impact. Review design, engineering, accessibility, content, and consuming-team evidence before release. Publish lifecycle status, version, owner, usage guidance, variants, behavior, mappings, and release notes. Deprecate only with a documented replacement, compatibility period where needed, migration path, and removal date. Keep design files, token exports, code, and docs aligned; do not call parallel copies “the source of truth.”

## Meet accessibility and safety obligations

Target WCAG 2.2 AA for web work, including applicable Level A criteria across complete user processes, and follow the relevant platform guidance elsewhere. Prefer semantic HTML and native controls, then use established WAI-ARIA Authoring Practices for composite widgets.

- Make every workflow keyboard-operable with a visible focus indicator that is not obscured by sticky UI, dialogs, or overlays. Maintain logical reading and focus order, and restore focus after context changes.
- Provide an equivalent non-dragging action for any essential dragging movement. Meet the WCAG 2.2 target-size minimum or a documented exception, and follow larger applicable platform target guidance.
- Avoid cognitive-function tests as the only authentication route. Support password managers, paste, or an equivalent accessible authentication method where relevant. Do not require users to re-enter information already supplied in the same process unless an allowed exception applies, and keep repeated help mechanisms consistent and findable.
- Provide accessible names, instructions, contrast, non-color status cues, zoom and text resizing, reflow, reduced-motion support, announcements, localization, RTL, touch, pointer, keyboard, and platform text-size behavior as applicable.
- Make high-consequence actions reversible or reviewable when the domain permits. For legal commitments, financial transactions, deletion, or material data changes, provide review, confirmation, correction, undo, audit, or another proportionate recovery path instead of relying on a cosmetic warning.

## Distinguish AI-assisted work from AI product features

- **AI-assisted generation** is a team tool for producing drafts, code, visuals, or design artifacts. Give it a compact contract, prefer structured tokens, components, mappings, and annotations over screenshots, and make targeted edits rather than blindly regenerating a surface. Treat every output as untrusted until it passes representative-data, semantic, state, accessibility, runtime, and human review checks.
- **AI product features** expose model output or actions to users. Clearly disclose AI involvement, material limits, and relevant output provenance or sources. Give people control over activation, scope, review, editing, confirmation, stopping, correction, and recovery. Do not imply certainty, fabricate citations, hide autonomous action, or make users lose work when the model fails.

## Validate and report

In design or implementation mode, validate the rendered product rather than only source plausibility. Exercise the primary journey and claimed interactions with the relevant input modes. Inspect the actual supported windows, themes, text scaling, zoom or reflow, long and localized copy, loading, empty, error, permission, slow-content, and recovery behavior. Measure public-web performance when it is in scope, and verify rendered search-visible content and links only for indexable public surfaces.

In review mode, report findings by user impact and evidence, distinguish defects from risks and assumptions, identify untested states, and recommend the smallest remediation. Finish only when the requested mode's artifact is complete, its material claims are verified or clearly bounded, and departures from the design system or platform guidance are recorded without promotional language.
