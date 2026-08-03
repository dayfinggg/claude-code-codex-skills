---
name: spec-to-tasks
description: Create an evidence-backed implementation plan or decompose an approved specification when the user explicitly asks for planning or decomposition. Do not trigger merely because an authorized implementation is multi-stage.
---

# Spec to Tasks

1. Inspect the applicable instructions, source specification, repository structure, relevant execution paths, tests, configuration, and version constraints before planning. Do not invent files, APIs, commands, or architecture. Read [planning principles](references/planning-principles.md).
2. State the intended outcome, current state, explicit scope, non-goals, constraints, acceptance criteria, and material assumptions. Surface unresolved product decisions instead of hiding them inside tasks.
3. Choose the smallest sufficient approach. Compare alternatives only for material trade-offs, and exclude speculative flexibility, unrelated cleanup, and work not required for the outcome.
4. Map requirements and material risks to affected capabilities, contracts, data, integrations, runtime paths, files or symbols when known, compatibility obligations, and operational concerns.
5. Organize only the milestones and vertical tasks needed for useful execution. Give each task a bounded outcome, prerequisites, affected boundaries, implementation intent, acceptance criteria, and concrete validation evidence; avoid ceremony that adds no decision or proof.
6. Record only real blocking edges, keep independent tasks parallelizable, assign one owner to overlapping files, and keep intermediate states buildable, compatible, recoverable, or explicitly isolated.
7. Check that every requirement and material risk maps to work and evidence and every task maps back to an approved requirement or necessary enabling change. Keep task state current during execution and remove duplicates, vague phases, orphan tasks, and stale work.
8. Write to an external tracker only when authorized; otherwise return the proposed plan. Planning does not revoke existing authorization or add an approval gate for implementation or commands.

Finish when another capable agent can execute the plan without rediscovering its intent, every dependency and decision is visible, scope is minimal, and completion can be proven.
