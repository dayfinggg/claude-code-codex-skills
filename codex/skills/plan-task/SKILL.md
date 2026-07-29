---
name: plan-task
description: "Create an evidence-grounded, decision-complete implementation plan at the smallest useful level of detail. Use when the user explicitly asks to plan, scope, or break down a complex change, or when unresolved product or architecture decisions block safe implementation. Do not use for obvious one-step work, ordinary explanations, execution of an approved plan, or multi-session ticket creation."
---

# Plan Task

Produce the smallest plan that lets a capable implementer begin without
rediscovering material context or inventing decisions.

## Respect the Planning Contract

For a plan-only request, work read-only and do not implement. For an
implementation request, plan only enough to coordinate dependent work, then
continue unless a material decision requires the user.

Do not save a plan artifact or create tickets unless requested or required by an
authorized repository convention.

Use no formal plan for obvious local work. Use a working plan for a bounded task
with real dependencies. Use an execution plan only for multi-hour,
multi-session, risky, or cross-system work when requested or required. Read
`references/plan-levels.md` only before producing an execution plan. When a
working plan is tracked, keep one step active and update it when its completion
evidence exists.

## Establish the Outcome

Identify the observable outcome, completion evidence, constraints, exclusions,
and whether the deliverable ends with the plan. Read only the repository
instructions, code, contracts, tests, configuration, and history needed to
settle the approach. Verify paths and commands before naming them.

For a self-contained scenario or a workspace without the relevant
implementation, do not search unrelated files or inflate missing details into a
repository audit. State the material unknown briefly and describe proposed
components without inventing paths, symbols, commands, or current behavior.

Separate confirmed facts, safe assumptions, proposals, and open decisions.

## Resolve Material Uncertainty

Investigate discoverable facts. Choose the least surprising default for safe,
reversible choices. Ask only when an answer changes product behavior,
architecture, security, compatibility, data, cost, or another hard-to-reverse
outcome.

Close parent decisions before dependent work. A decision-complete plan settles
choices that block implementation. It is not exhaustive documentation. Do not
add rollout, recovery, observability, migration, performance, security, or
future-extension work unless the requested change or verified system makes that
risk material.

## Select and Sequence the Smallest Approach

Choose the least complex approach that covers the outcome and fits the existing
architecture and vocabulary. Reuse proven components, preserve compatibility
unless a break is settled, and exclude unrelated cleanup and speculative
flexibility. Compare alternatives only when the choice is consequential or hard
to reverse, then state the deciding trade-off rather than cataloging options.

Order work by dependency and independently verifiable outcomes rather than file
layers. Each plan paragraph should make clear the result, the verified
component or interface when known, the necessary change, and the evidence that
proves completion. Name genuine blockers only. Group equivalent edge cases and
checks instead of enumerating every example.

Use staged compatibility or migration only when old and new states must actually
coexist. Mark work parallelizable only when its evidence and writes are
independent. Agent orchestration belongs to `delegate-work` and requires
explicit authorization.

## Verify and Present

Map each completion criterion to the narrowest suitable test, type check, lint,
build, schema validation, runtime observation, visual check, benchmark, or
migration rehearsal. State expected evidence rather than “test as needed.”

For an ordinary response, use connected complete prose paragraphs in dependency
order. Do not use headings, subheadings, lists, tables, empty sections, or
status narration. For a bounded change, default to three to six focused
paragraphs and group equivalent locations, edge cases, and checks. Treat
“complete” as coverage of material decisions rather than maximal detail. Do not
restate the request, teach generic practice, inventory every possible artifact,
or fully plan a later release when one sentence establishes its contract. Stop
once the approach, dependencies, material decisions, and verification are
sufficient for implementation.

For a persistent execution plan, follow the repository template or
`references/plan-levels.md`.

## Completion Standard

Finish when the plan level fits the task, every material decision and dependency
is addressed, completion evidence is explicit, and no speculative work remains.
