---
name: planning
description: Create or review evidence-backed plans for complex software or operational work. Use in Plan mode or for requested decomposition, estimation, sequencing, or plan revision; not for implementation or simple tasks.
---

# Planning

Produce an executable decision and delivery map, not a ceremonial checklist. Stay read-only unless the user explicitly asks to create or edit a plan artifact.

Read [plan-patterns.md](references/plan-patterns.md) when the task needs milestones, estimates, a decision record, a risk register, or an evolving roadmap. Read [sources.md](references/sources.md) before invoking a named planning, architecture, or delivery framework; tailor it to repository evidence rather than copying the framework.

## Planning Algorithm

1. Frame the outcome.
   - State the desired end state and user-visible value in one sentence.
   - Define measurable acceptance criteria, scope, non-goals, ownership, allowed side effects, constraints, and deadline only when one exists.
   - Translate vague quality words into observable properties.

2. Establish evidence.
   - Inspect applicable instructions, relevant code, call sites, tests, schemas, interfaces, logs, commands, issue text, and current official documentation.
   - Separate `Observed`, `User-provided`, `Inferred`, `Assumption`, and `Needs confirmation`.
   - Ask only when an unresolved fact changes safety, architecture, cost, compatibility, or the requested outcome.

3. Map the system and dependencies.
   - Identify entry points, data flow, state transitions, trust boundaries, external services, persistence, deployment path, and affected contracts.
   - Build a dependency graph. Put enabling decisions, reproduction, contract discovery, and irreversible choices before downstream work.
   - Mark the critical path, parallel-safe work, serialization points, and merge gates.

4. Resolve uncertainty deliberately.
   - Rank unknowns by impact and cost of being wrong.
   - Convert high-impact unknowns into a bounded spike, prototype, measurement, documentation check, or reversible experiment with a decision criterion.
   - Prefer reversible decisions while evidence is weak. Escalate irreversible decisions for explicit review.

5. Compare designs when the decision is material.
   - Consider at least two materially different options for high-impact or unfamiliar architecture decisions, including the simplest subtractive option when plausible.
   - Compare correctness, complexity, compatibility, security, performance, operability, migration, maintenance, cost, and rollback.
   - Choose one option and record why the rejected alternatives lose. Do not manufacture alternatives for routine work.

6. Decompose into vertical milestones.
   - Each milestone must produce an artifact, behavior, decision, or verification signal.
   - Give every step inputs, exact targets when known, owner or write boundary, dependencies, expected output, acceptance check, and stop condition.
   - Prefer small end-to-end slices over horizontal layers that remain unverifiable until the end.

7. Design validation and recovery.
   - Build a validation matrix that maps each acceptance criterion and major risk to evidence.
   - Order checks from focused and cheap to broad and expensive.
   - Include migration rehearsal, backup, rollback, feature flags, observability, staged rollout, and recovery for high-impact changes.

8. Run a pre-mortem.
   - Ask what could make the plan technically correct but operationally fail.
   - Check hidden consumers, backward compatibility, concurrency, permissions, data quality, partial failure, rate limits, timezones, encoding, accessibility, privacy, supply chain, deployment ordering, and rollback realism where relevant.

9. Review the plan backward.
   - Starting from `Done When`, confirm every criterion has an implementing step and a verification step.
   - Remove steps that do not change a decision, artifact, behavior, or confidence level.
   - Confirm no step invents a file, command, API, dependency, or environment fact.

## Plan Shape

Use only the sections that materially help execution.

```md
## Goal
Desired end state and measurable success.

## Scope
In scope, out of scope, ownership, constraints, and allowed side effects.

## Evidence And Assumptions
Observed facts, assumptions, decisions, and blocking questions.

## System Impact
Affected files, interfaces, data, dependencies, users, and operations.

## Decision Record
Options considered, selected option, rationale, and consequences.

## Sequence
1. Step with inputs, targets, output, acceptance check, and stop condition.
2. Step with inputs, targets, output, acceptance check, and stop condition.

## Parallel Work
Independent work packets, file ownership, merge points, and serialization gates.

## Risks And Recovery
Risk, mitigation, detection, rollback, and residual risk.

## Validation Matrix
Acceptance criterion mapped to command, test, inspection, or operational evidence.

## Done When
Observable completion criteria and required evidence.
```

## Delegation Packets

When active runtime, project, skill, or user instructions permit delegation, define each packet with:

- Role and single objective.
- Required skills and exact inputs.
- Read and write boundaries, including forbidden files or actions.
- Dependencies and whether it can run in parallel.
- Required output, evidence, validation, stop conditions, and merge point.

Do not delegate merely to make the plan look sophisticated. Keep shared-state writes serialized and retain integration ownership in the main task.

## Planning Quality Gates

- The plan is specific enough for another capable engineer or agent to execute without repeating broad discovery.
- The critical path and irreversible decisions are visible.
- Acceptance criteria cover behavior, not only file creation or command execution.
- Risks have detection and recovery, not only labels.
- Commands and paths are verified or explicitly marked unknown.
- Estimates, when requested, state assumptions and ranges rather than false precision.
- The plan remains proportional to the task. Use a short checklist for a small change.

## Change Control

Revise the plan when evidence invalidates an assumption, a dependency changes, validation fails, scope changes, or a risk crosses its stop threshold. Preserve the goal and decision history; do not silently rewrite constraints.

End with the smallest next action. Do not implement unless the user subsequently authorizes implementation.
