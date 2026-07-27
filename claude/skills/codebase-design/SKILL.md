---
name: codebase-design
description: "Design or improve a known module boundary, interface, seam, dependency, or test surface. Use when implementing a new module, restructuring identified coupling, choosing an interface, or improving concrete testability. Do not use for broad architecture discovery, arbitrary file splitting, formatting, or speculative abstraction."
---

# Codebase Design

Concentrate related complexity behind the smallest stable interface that fully serves real callers. Optimize for correctness, locality, leverage, testability, and consistency with the existing repository.

Read `references/evidence.md` when a boundary or abstraction decision is consequential. If delegation is explicitly authorized, use `delegate-work` for non-overlapping read-only traces or an independent review, not for competing writers on the same interface.

## Use Repository Evidence First

- Read applicable instructions, architecture records, nearby code, tests, callers, and supported versions.
- Preserve established domain language and architecture unless evidence justifies a change.
- Identify the concrete behavior, callers, variation, failure modes, and change pressure before proposing a boundary.
- Treat current pain and expected work as evidence. Do not design for hypothetical reuse.

## Use a Precise Design Vocabulary

- **Module:** a cohesive unit with an interface and hidden implementation, at any scale.
- **Interface:** everything a caller must know, including inputs, outputs, invariants, errors, ordering, configuration, and relevant cost.
- **Seam:** a location where behavior can vary without changing its callers.
- **Adapter:** an implementation that satisfies an interface at a seam.
- **Depth:** the useful behavior and complexity hidden behind a small interface.
- **Leverage:** the value many callers and tests gain from one implementation.
- **Locality:** the degree to which related knowledge, changes, defects, and verification remain together.

Use repository terminology in user-facing work. Use this vocabulary internally when it makes a design decision more exact.

## Find the Natural Module

Group behavior that shares:

- the same domain responsibility;
- the same invariants and failure policy;
- the same data ownership or lifecycle;
- the same reason to change;
- the same verification surface.

Do not group code merely because it uses the same technology or sits in the same layer. Do not split cohesive behavior to satisfy arbitrary line or file limits.

Apply the deletion test: imagine removing the proposed module. If its complexity disappears, it may be a pass-through. If the complexity spreads across callers, the module is concentrating real knowledge.

## Design the Interface

Make callers provide only information they naturally own and return results they can use directly.

- Minimize methods, parameters, states, configuration, and ordering requirements.
- Hide policy, orchestration, persistence details, retries, caching, and provider quirks when callers do not need to control them.
- Make invalid states difficult to represent when the repository's type system supports it.
- Define failure behavior and ownership explicitly.
- Preserve compatibility unless the task authorizes a deliberate break.
- Prefer one coherent operation over a sequence that forces callers to reconstruct internal policy.

Do not expose implementation structure merely to make internal code reachable by tests.

## Place Seams Only Where Evidence Supports Them

Introduce a seam when at least one real need exists:

- multiple current adapters or algorithms;
- an external, nondeterministic, or expensive boundary;
- independent lifecycle or ownership;
- a compatibility boundary;
- a stable test surface around important behavior.

One implementation does not automatically require an interface. Avoid factories, registries, plugin systems, generic repositories, and dependency injection layers created only for hypothetical future variation.

## Design for Verification

Treat the public interface as the primary test surface.

- Verify observable behavior, invariants, transitions, and failures through the same seam callers use.
- Keep internal seams private unless real consumers require them.
- Accept dependencies at the boundary when construction would otherwise hide nondeterminism or external effects.
- Separate decision logic from irreversible effects when doing so produces a clearer real seam.
- Avoid tests that mirror internal call graphs.

If no stable test surface exists, reconsider the boundary before adding test-only access.

## Compare Alternatives When the Choice Is Material

Generate two or three genuinely different interface shapes when placement or ownership is uncertain. Compare them against:

- caller simplicity;
- hidden complexity;
- locality of invariants and failure handling;
- number and reality of seams;
- compatibility and migration cost;
- verification quality;
- operational and performance consequences.

Choose the smallest complete design supported by evidence. Record rejected alternatives only when the trade-off is consequential or hard to reverse.

## Keep the Change Focused

- Prefer deepening or replacing a weak boundary over layering a new abstraction on top of it.
- Avoid parallel implementations, broad rewrites, unrelated cleanup, and premature generalization.
- Stage risky migrations through compatible intermediate states when necessary.
- Measure performance-sensitive decisions rather than assuming indirection or consolidation is faster.

## Present the Design

State:

- the responsibility and callers;
- the proposed interface and seam;
- what complexity remains hidden;
- ownership, invariants, failures, and compatibility;
- verification strategy;
- material alternatives and migration implications.

Use diagrams only when relationships cannot be explained clearly with concise prose.

## Completion Standard

Finish only when the boundary is justified by real behavior, its interface is smaller than the complexity it hides, callers and tests can use the same stable seam, and no speculative abstraction is required.
