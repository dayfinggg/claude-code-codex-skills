---
name: project-documentation
description: Create, revise, review, or retire repository documentation such as README, CONTRIBUTING, ADRs, runbooks, roadmaps, and agent instructions. Use for durable audience guidance; not product copy, generic tutorials, or facts better enforced by code.
---

# Project Documentation

Create the minimum durable document that helps its audience act correctly. Treat source, schemas, configuration, scripts, CI, tests, deployment artifacts, and observed command output as stronger evidence than existing prose.

Read [document-selection.md](references/document-selection.md) before adding or restructuring documents. Read [agent-instructions.md](references/agent-instructions.md) before editing Codex, Claude Code, or GitHub Copilot instructions. Read [roadmap-and-delegation.md](references/roadmap-and-delegation.md) for roadmaps, task packets, and handoffs. Read [sources.md](references/sources.md) when current vendor discovery rules or a named documentation framework matters.

## Establish ownership and lifecycle

Before writing, inspect the applicable instructions, current docs, manifests, scripts, CI, source entry points, tests, deployment files, and ownership metadata. Trace each command, path, version, identifier, feature, and status claim to current repository evidence.

For every document, name or determine:

- its audience and the task or decision it supports;
- the authoritative source of truth for each volatile fact;
- its accountable owner or owning team when repository evidence provides one;
- the freshness trigger, such as a release, schema change, command change, incident, or periodic review;
- the retirement condition, including supersession, feature removal, migration completion, or loss of a real audience.

Do not invent owners or review dates. If ownership is unknown, expose the gap rather than manufacturing certainty.

## Choose the smallest artifact

Use a README for orientation and the shortest verified start path; CONTRIBUTING for recurring contributor workflow; an architecture page for boundaries and quality drivers; an ADR for one consequential durable decision; a runbook for an operational trigger and safe recovery; a roadmap for evolving multi-step work; and a task packet for bounded execution. Create agent instructions only for durable recurring guidance used by that supported tool.

Keep each page primarily tutorial, how-to, reference, or explanation. Split only when audience, owner, lifecycle, or purpose differs. Do not create several document types for one small change.

## Prevent drift and duplication

Assign every fact one source of truth. Commands and versions belong in manifests or task runners; API contracts in schemas; decisions in ADRs; operational values in configuration; status in one tracker. Prose should explain intent, safe use, and consequences, then link to the authoritative artifact.

Do not copy CLI help, directory trees, generated output, configuration reference, or policy across files. Link instead. If generation is required, preserve generated markers, identify the generator and input, and never hand-edit the generated region. Keep enforceable invariants in code, schemas, permissions, tests, hooks, or CI rather than prose.

Write for scanning and action: lead with purpose and next action, put prerequisites before commands, place verification after the action it checks, and name failure, rollback, or escalation conditions. Use exact repository terminology and minimal non-secret examples. Separate current behavior from aspirations and historical context.

Agent instructions must be scoped to the nearest applicable location and must not duplicate task-specific context or security controls. Runbooks must state trigger, access, blast radius, safe observation, action, success and failure signals, containment or rollback, escalation, and evidence. Never include live credentials, private endpoints, customer data, or sensitive logs.

## Check the document

Reread touched files and confirm internal links, anchors, commands, paths, symbols, defaults, and versions against their authoritative sources. Run safe representative examples and existing doc checks when applicable. Search for stale names, unfinished template text, duplicated claims, secrets, and conflicting scoped instructions.

Confirm the audience, owner status, source of truth, freshness trigger, and retirement condition remain visible where maintainers need them. Report environment-dependent commands and other unverified claims explicitly. Retire, archive, or mark superseded documents when their condition is met; do not leave plausible-looking stale guidance in place.
