---
name: project-documentation
description: Create, edit, review, and verify lean project documentation from repository evidence. Use for README, CONTRIBUTING, architecture docs, ADRs, runbooks, roadmaps, implementation plans, delegation packets, AGENTS.md or AGENTS.override.md, CLAUDE.md, GitHub Copilot instruction files, and documentation drift or information-architecture work.
---

# Project Documentation

## Operating contract

Create the minimum documentation that helps the intended reader act correctly. Treat source code, schemas, configuration, scripts, CI, deployment artifacts, tests, and observed command output as stronger evidence than existing prose. Never make an unverified command, path, feature, status, owner, or guarantee sound current.

Do not create a document merely because a template permits it. Prefer one authoritative location and links over copied instructions. Keep policy and guidance separate from enforceable configuration, generated artifacts, tests, linters, schemas, hooks, permissions, and source code.

Read [document-selection.md](references/document-selection.md) before adding or restructuring docs. Read [agent-instructions.md](references/agent-instructions.md) before editing Codex, Claude Code, or GitHub Copilot instruction files. Read [roadmap-and-delegation.md](references/roadmap-and-delegation.md) for roadmaps, task packets, and handoffs. Consult [sources.md](references/sources.md) for current vendor rules and documentation frameworks.

## Discover before writing

Inspect the smallest useful repository surface:

1. Read scoped instruction files and check the working tree so existing work is not overwritten.
2. Inspect manifests, package or build configuration, scripts, CI, source entry points, tests, deployment files, ownership metadata, and existing documentation.
3. Trace every proposed command to a real script or tool and every path or identifier to the current tree.
4. Use history or ownership evidence only when it answers a real freshness, rationale, or maintainer question.
5. Identify the audience, decision or task, entry point, source of truth, owner, and freshness trigger for the document.
6. Label assumptions and unverified environment-dependent behavior. Remove claims that cannot be established or are unnecessary.

Preserve established terminology, tone, heading hierarchy, links, generated markers, and repository conventions unless they are the defect being fixed.

## Select the minimum artifact

Use the decision table in [document-selection.md](references/document-selection.md). In general:

- Use `README` for orientation, capabilities, prerequisites, the shortest verified start path, and links to deeper material.
- Use `CONTRIBUTING` for recurring contributor workflow, review, tests, style, governance, and release rules.
- Use architecture documentation for system boundaries, responsibilities, quality drivers, runtime/deployment views, and cross-cutting decisions that code alone does not reveal.
- Use an ADR for one significant, durable, costly-to-reverse decision and its context, alternatives, consequences, status, and supersession.
- Use a runbook for an operational trigger, diagnosis, safe action, verification, rollback, and escalation.
- Use a roadmap for a multi-step evolving outcome with status, dependencies, risks, evidence, and acceptance criteria.
- Use a task or delegation packet for bounded execution by another person or agent.
- Use an agent instruction file only for durable, recurring repository guidance relevant to that supported tool.

Do not duplicate CLI help, configuration reference, API schema, dependency metadata, or generated output. Link or generate it from its authoritative artifact.

## Match the document to the reader's need

Use the Diátaxis distinction to avoid mixed-purpose pages:

- Tutorial: guide a learner through a successful, controlled experience.
- How-to: provide goal-oriented steps for a reader who already has context.
- Reference: state precise facts, contracts, parameters, and constraints.
- Explanation: clarify rationale, concepts, and tradeoffs.

One page can link to another type, but do not bury a runnable how-to inside a long conceptual essay or mix normative rules with optional explanation without labels.

## Write for action and scanning

- Lead with purpose, audience, and the next action. Use stable headings and short sections.
- Put prerequisites before commands and verification immediately after the action it verifies.
- Use exact paths, symbols, UI labels, commands, expected outcomes, and failure or rollback conditions.
- Distinguish required, recommended, optional, example, and historical information.
- Use tables only for true comparisons or structured facts. Use lists for procedures and prose for rationale.
- Keep examples minimal, executable, non-secret, and consistent with supported platforms.
- Define unfamiliar acronyms once. Use the repository's domain vocabulary rather than introducing synonyms.
- Add diagrams only when relationships, flow, or topology are clearer visually. Prefer C4 context or container views for durable architecture and keep frequently changing code detail close to source.
- Omit decorative badges, exhaustive trees, generic principles, and obvious restatements that cost maintenance without changing behavior.

There is no universal ideal file length. Optimize for retrieval and maintenance. Split when audiences, owners, update cadence, or document type differ—not at an arbitrary line count.

## Establish a single source of truth

For each fact, identify the authoritative artifact:

- Commands and versions belong in manifests, task runners, lockfiles, or tool configuration; documentation links to or invokes them.
- API contracts belong in schemas or specifications; prose explains usage and lifecycle.
- Architecture decisions belong in ADRs; architecture overviews summarize and link them.
- Operational values belong in deployment or runtime configuration; runbooks explain safe observation and change.
- Work status belongs in the selected issue, roadmap, or task tracker—not several stale checklists.
- Recurring agent policy belongs in the closest applicable instruction file; enforcement belongs in tests, permissions, hooks, CI, or configuration.

If content must be generated, preserve explicit generated-section markers, name the generator and source, and never hand-edit inside the generated region. Avoid copying the same policy into multiple vendor instruction files; use a shared canonical file and supported import or a deliberately small adapter when the tool permits it.

## Write agent instructions as scoped context

Create vendor-specific instruction files only when the repository uses that tool or the user explicitly asks. Confirm current vendor discovery and precedence rules before editing.

For Codex:

- Place `AGENTS.md` at the broadest scope where every instruction applies and a deeper `AGENTS.md` for narrower rules.
- Use `AGENTS.override.md` only when that directory must replace the regular file selected there.
- Keep files small enough to fit the configured combined project-document budget; current Codex defaults the combined project instructions to 32 KiB.
- Put recurring repository facts, build/test commands, conventions, boundaries, and review expectations there. Keep task-specific context in the task.

For Claude Code:

- Use the supported `CLAUDE.md`, `.claude/CLAUDE.md`, `CLAUDE.local.md`, or managed/user locations according to intended scope.
- Keep project memory concise; Anthropic recommends targeting fewer than 200 lines per `CLAUDE.md`.
- Use supported `@path` imports to reference shared guidance when useful; verify paths and remember imported content still consumes context.
- Use `.claude/rules` only when the repository actually adopts Claude Code path-scoped rules.

For GitHub Copilot:

- Use `.github/copilot-instructions.md` for repository-wide guidance.
- Use `.github/instructions/**/*.instructions.md` with a valid `applyTo` glob for path-specific guidance.
- Verify which Copilot surfaces and repository contexts support each instruction type; multiple applicable files must not conflict.

Treat all agent instruction files as context that can be missed or interpreted imperfectly. Do not move correctness or security invariants out of code, schemas, tests, configuration, permissions, or CI.

## Document architecture and decisions proportionately

Use architecture documentation to answer: who uses the system, what systems and deployable units exist, which capability and data each owns, how they communicate, which quality attributes drive design, and how the system is operated and evolved.

Use arc42 as a selectable checklist, not a demand for twelve populated sections. Use C4 diagrams at the context and container levels when they clarify boundaries. Keep detailed component or code views only when their maintenance value exceeds their drift risk.

Write an ADR only for a consequential decision. Include date, status, context, constraints, decision, alternatives considered, positive and negative consequences, validation, owners, review or reversal conditions, and links to superseded or superseding records. Preserve historical rationale; update status rather than rewriting the past.

## Document operations safely

Every runbook must name its trigger, prerequisites, required access, blast radius, safe observation commands, action steps, success signals, failure signals, rollback or containment, escalation, and post-action evidence. Mark destructive, production, credential, privacy, or irreversible steps explicitly and require the repository's authorization process.

Never include live credentials, tokens, private endpoints, customer data, security answers, or sensitive production output. Use placeholders that cannot be mistaken for real secrets and point to the approved access mechanism. Define redaction, retention, and audience for incident material.

## Build roadmaps and delegation packets for execution

A roadmap is not a wish list. Define the outcome, non-goals, current evidence, workstreams, ordering, dependencies, decision points, owners, status vocabulary, risks, validation, rollout, and completion criteria. Update status from observed evidence and archive or supersede obsolete plans.

Give a delegated task explicit inputs, owned files or systems, forbidden actions, expected artifact or behavior, required skills or sources, checks, evidence format, and merge point. Prevent concurrent writers from owning the same files or shared state. See [roadmap-and-delegation.md](references/roadmap-and-delegation.md).

## Verify documentation

Before finishing:

1. Reread every touched document and inspect the exact diff.
2. Resolve every internal link, anchor, referenced file, symbol, and command.
3. Run examples or the cheapest safe representative command; record environment-sensitive gaps rather than fabricating success.
4. Compare documented defaults, versions, flags, endpoints, schemas, and workflows to their authoritative artifacts.
5. Check scope and conflicts across nested agent instructions and supported vendor behavior.
6. Run the repository's existing documentation build, link check, linter, formatter, spelling, or generated-content check where applicable.
7. Search for stale names, removed paths, unfinished template markers, secrets, personal data, and copied contradictory rules.
8. Ensure ownership, status, and freshness triggers are present where readers need them, without inventing maintainers or dates.

Report unverified commands, unavailable environments, and known drift risks. Do not claim a document is current merely because it renders.

## Reject common failure modes

- Do not write from memory when the repository can prove the fact.
- Do not create README, architecture, ADR, runbook, roadmap, and three agent files for one small change.
- Do not repeat the same setup or policy in several files.
- Do not put volatile version numbers or directory trees in prose when they can be generated or linked.
- Do not turn aspirational architecture into a statement of current behavior.
- Do not mark roadmap work complete without acceptance evidence.
- Do not create `CLAUDE.md` or Copilot files in a repository that does not use those tools unless explicitly requested.
- Do not use instruction files as a substitute for tests, configuration, schemas, access control, or source-owned contracts.
