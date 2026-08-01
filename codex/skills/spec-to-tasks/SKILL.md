---
name: spec-to-tasks
description: Create an evidence-backed implementation plan or decompose an approved specification into executable work with dependencies, decision points, acceptance criteria, and validation evidence. Use when the user asks for a plan or when work spans multiple substantive actions, components, migrations, risks, or independently verifiable stages; skip simple one-step changes.
---

# Spec to Tasks

1. Inspect the applicable instructions, source specification, repository structure, relevant execution paths, tests, configuration, and version constraints before planning. Do not invent files, APIs, commands, or architecture. Read [planning principles](references/planning-principles.md).
2. State the intended outcome, current state, explicit scope, non-goals, constraints, acceptance criteria, and material assumptions. Return unresolved product decisions to clarification instead of hiding them inside tasks.
3. Identify the smallest sufficient approach. Compare alternatives only when they differ materially, choose one, and record the decisive trade-off. Exclude speculative flexibility, unrelated cleanup, and work not required for the outcome.
4. Map requirements and risks to affected capabilities, contracts, data, integrations, runtime paths, files or symbols when known, compatibility obligations, and operational concerns.
5. Organize work into outcome-based milestones, then slice each milestone into vertical, independently understandable tasks. Keep every task large enough to produce a meaningful verified result and small enough for one focused implementation session.
6. Give every task one outcome, bounded scope, prerequisites, affected boundaries, implementation intent, acceptance criteria, and concrete validation evidence. Add migration, rollout, rollback, observability, documentation, or cleanup only when the task requires them.
7. Record only real blocking edges. Put discovery, risky assumptions, contracts, schemas, and irreversible decisions before dependent implementation. Keep independent tasks parallelizable, assign one owner to overlapping files, and identify the critical path.
8. Ensure every intermediate state remains buildable, compatible, recoverable, or explicitly isolated. Separate broad refactoring from behavior changes unless one cannot be completed safely without the other.
9. Check bidirectional coverage: every requirement and material risk maps to work and evidence, and every task maps back to an approved requirement or necessary enabling change. Remove duplicates, vague phases, orphan tasks, and unexplained cycles.
10. Present the plan at the minimum useful depth. Use a short ordered plan for moderate work and milestones plus dependent tasks for large work. Mark decisions, unknowns, permission-gated commands, and stopping points explicitly.
11. During execution, keep task state current: start only unblocked work, mark completion after evidence exists, and add, split, reorder, or remove tasks immediately when reality changes. Do not preserve a stale plan for appearance.
12. Write to an external tracker only when authorized; otherwise return the proposed plan for review. Planning alone does not authorize implementation or gated commands.

Finish when another capable agent can execute the plan without rediscovering its intent, every dependency and decision is visible, scope is minimal, and completion can be proven.
