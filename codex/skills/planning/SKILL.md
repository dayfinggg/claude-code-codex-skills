---
name: planning
description: Create or review evidence-backed plans for complex, risky, cross-cutting, or explicitly planned work. Use for sequencing, estimates, decisions, migrations, roadmaps, or Plan mode; not to implement or add ceremony to simple work.
---

# Planning

Produce the smallest executable decision and delivery map. Stay read-only unless the user explicitly requests a plan artifact to be edited.

Read [plan-patterns.md](references/plan-patterns.md) for milestones, estimates, decision records, risk registers, and evolving roadmaps. Read [sources.md](references/sources.md) before applying a named planning, architecture, or delivery framework; adapt it to repository evidence.

## Establish the contract

1. Inspect the repository before asking questions: applicable instructions, current files, entry points, call sites, tests, schemas, configuration, scripts, CI, deployment paths, and existing plans. Verify paths and commands instead of inventing them.
2. State the desired behavior and user-visible outcome. Record scope, non-goals, ownership, allowed side effects, constraints, compatibility needs, and a deadline only when one exists.
3. Identify test seams: the boundaries, observable outputs, fixtures, contracts, or operational signals through which each behavior can be falsified.
4. Separate observed facts, user-provided facts, inferences, assumptions, and unknowns. Ask only when an unknown materially changes safety, architecture, cost, compatibility, or outcome.
5. Ask one materially blocking question at a time. Include a recommended answer and its consequence so the user can decide quickly. Continue without asking when repository evidence or a reversible default is sufficient.

## Shape the approach

Map the affected entry points, data flow, state transitions, trust boundaries, persistence, external services, public contracts, and deployment path. Put contract discovery, reproduction, enabling decisions, and irreversible choices before dependent work.

For material or unfamiliar decisions, compare the leading option with at least one meaningfully different alternative, including a simpler subtractive option when plausible. Judge correctness, complexity, security, compatibility, performance, operations, migration, maintenance, and rollback. Do not manufacture alternatives for routine changes.

Turn uncertainty into a bounded experiment with a decision criterion. Use a spike, measurement, documentation check, or prototype only when prose cannot resolve the uncertainty cheaply. Mark exploratory prototypes disposable, isolate them from production paths, and require a separate reviewed implementation decision; never let a prototype silently become production code.

## Sequence delivery

Prefer small vertical tracer slices that cross the real boundaries and produce observable behavior. Use the first slice to validate the riskiest contract, integration, or test seam, then extend it incrementally. Avoid horizontal phases that build every layer before anything can run.

Give each step verified inputs and targets, dependencies, owner or write boundary, expected behavior or artifact, acceptance check, and stop condition. Mark the critical path, parallel-safe packets, shared-state serialization, and integration gates only when they matter.

Keep the plan proportional. A small change needs a short ordered checklist, not discovery, design, build, rollout, and retrospective ceremony. Add migrations, flags, observability, staged rollout, rollback, backup, or recovery only when the affected risk calls for them.

Persist a handoff only when work must survive a context reset or transfer. Record accepted decisions, exact current state, completed evidence, unresolved risks, and the smallest next executable action; retire the handoff when the work or its canonical tracker supersedes it.

## Review the plan

Map every requested behavior and major risk to evidence, starting with focused cheap checks and expanding only as needed. Review backward from completion: every criterion needs an implementing step and a falsifying check; every step must change behavior, an artifact, a decision, or confidence.

Remove unsupported paths, commands, APIs, dependencies, and redundant steps. Expose irreversible decisions, residual assumptions, and recovery ownership. Revise the plan when evidence invalidates an assumption, scope changes, or a validation result crosses a stop condition; do not silently rewrite prior constraints.

End with the smallest next executable action. Do not implement unless implementation is separately authorized.
