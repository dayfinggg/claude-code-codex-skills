---
name: software-engineering
description: Apply cross-language production engineering to broad or mixed-stack implementation, review, or material architecture work. Use when repository-wide contracts, errors, or delivery evidence cross domains; not for research-only dependency selection or when one narrow skill fully owns the task.
---

# Software Engineering

Use repository evidence to deliver the smallest correct production change. This skill supplies cross-language invariants; a language, framework, database, or workflow skill owns its specific mechanics.

## Work from the contract

1. Read scoped instructions and inspect the current implementation, call sites, public contracts, configuration, tests, dependencies, and project commands that govern the requested behavior.
2. State the observable outcome, invariants, compatibility constraints, allowed side effects, and evidence needed for completion. Distinguish observations from assumptions.
3. Implement a thin end-to-end slice that proves the behavior before expanding it. Preserve intentional architecture and unrelated work.
4. Run the cheapest check that can falsify the change, then expand validation only where risk crosses a boundary.
5. Inspect the exact diff or reread changed files. Report observed results and residual gaps without claiming checks that did not run.

## Keep code production-ready

- Prefer direct, readable code and existing conventions. Add an abstraction only when it owns a stable concept, removes harmful coupling, or protects a real variation point.
- Keep modules cohesive and public surfaces narrow. Prefer deep or grey-box modules: callers should understand the contract without depending on internal steps. Do not fragment a straightforward change into pass-through layers, single-use wrappers, or generic utility files.
- Validate and normalize untrusted data at the owning boundary. Preserve useful error causes, make expected failure behavior explicit, and guarantee cleanup of files, locks, transactions, tasks, streams, sockets, timers, and partial writes.
- Preserve public APIs and stored data unless the user authorized a breaking change. Treat schema, event, cache-key, filesystem, and command formats as contracts when another component depends on them.
- Apply security, accessibility, concurrency, observability, performance, rollout, and recovery work only when the changed surface creates that risk. Bound waits, retries, concurrency, queues, and resource use where applicable.
- Prefer the standard library, platform and framework APIs, and existing dependencies. Before changing a dependency, verify the need, installed version, official API, compatibility, maintenance, license, security, size, and operational cost. Load `web-research` with the Skill tool for current version selection or uncertain external APIs and use its dependency-evaluation procedure. Never hand-edit generated dependency artifacts outside the established workflow.
- Keep tests and production code honest. Do not add test-only branches, weaken assertions, suppress failures, or hard-code expected fixtures into implementation paths.

## Escalate architecture selectively

Read [architecture decisions](references/architecture-decisions.md) when work changes a service, process, package, datastore, queue, public API, trust boundary, deployment unit, or ownership of data or business rules. Read [architecture fitness](references/architecture-fitness.md) for consistency, concurrency, migration, failure-domain, SLO, capacity, recovery, or rollback decisions. These references are not a mandatory pass for local code changes.

For a material decision, compare the current design, the simplest viable change, and any genuinely different alternative against the same invariants and failure costs. Assign each datum and rule one clear owner, make dependency direction explicit, define user-visible partial-failure behavior, and turn important claims into focused fitness checks. Record an ADR only when future contributors need the context and consequences.

Read [engineering sources](references/sources.md) or [architecture sources](references/architecture-sources.md) only when a named standard, lifecycle, method, or current version affects the decision.
