---
name: design-project-architecture
description: Design, assess, or evolve the structure and architecture of new and existing software projects. Use when creating a project, adding or extracting a subsystem, reorganizing modules or directories, clarifying ownership and dependency boundaries, reducing architectural debt, or making components easier to understand, operate, replace, remove, test, and extend; skip isolated changes that do not affect structure or boundaries.
---

# Design Project Architecture

1. Establish the system scope, users, business capabilities, constraints, deployment environment, team ownership, expected change, and measurable quality-attribute scenarios. Read [architecture principles](references/architecture-principles.md).
2. For an existing project, map entry points, modules, runtime and data flows, public contracts, ownership, dependency direction, cycles, build units, deployment units, tests, and operational boundaries before proposing a target. For a new project, identify the minimum capabilities and irreversible decisions first.
3. Partition by cohesive responsibility and information hidden from other modules. Give mutable state, business rules, external integrations, and operational concerns explicit owners. Define narrow contracts and permitted dependency directions; prevent cycles, cross-module internals access, shared mutable state, and unowned `common`, `shared`, or `utils` dumping grounds.
4. Choose the simplest topology that satisfies the drivers. Prefer in-process modules until independent deployment, scaling, isolation, availability, data ownership, regulatory, or team-autonomy requirements justify a distributed boundary. Introduce layers, ports, events, repositories, services, or patterns only for a named force and verified trade-off.
5. For new systems, follow [new-project design](references/new-projects.md). For legacy or structurally weak systems, follow [existing-project evolution](references/existing-projects.md); preserve behavior while creating better local precedents through small, reversible migrations instead of a big-bang rewrite.
6. Make each capability discoverable from its entry point, testable through a stable boundary, replaceable behind an owned contract, extensible without modifying unrelated modules, and removable with a bounded dependency and data cleanup path. Keep configuration and dependency assembly explicit at composition roots.
7. Record only architecture information that helps future decisions: a concise module map, dependency rules, ownership, significant runtime or deployment views, and ADRs for consequential choices. Keep documentation beside the system and update it with the change.
8. Use `$domain-modeling` for business language, invariants, and bounded contexts; `$production-code-quality` for language-level implementation; `$tdd` for observable behavior; and `$spec-to-tasks` when migration spans dependent stages. Do not duplicate their workflows.
9. Apply [architecture validation](references/architecture-validation.md), run relevant project checks, and verify affected behavior and operational paths.

Finish when responsibilities, ownership, contracts, dependencies, and change paths are understandable and enforced; the chosen structure is justified by explicit drivers; and remaining architectural debt or unverified assumptions are reported.
