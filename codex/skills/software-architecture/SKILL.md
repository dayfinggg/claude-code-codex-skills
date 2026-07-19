---
name: software-architecture
description: "Design, assess, implement, review, and evolve software architecture in any language or runtime. Use for every software development task: apply a lightweight architecture pass to routine local changes and a deeper pass when work changes boundaries, data ownership, public contracts, deployment topology, consistency, concurrency, security, operability, performance, migration, or failure behavior."
---

# Software Architecture

## Operating contract

Treat architecture as the system's important structures, constraints, and tradeoffs—not a diagram or a preferred pattern. Start from repository evidence and preserve intentional existing architecture unless the requested outcome requires a change.

Apply this skill together with the language, framework, database, security, debugging, and verification skills relevant to the task. Scale the work to risk:

- For a routine local change, identify the owning component, its contract, dependencies, invariants, and focused checks. Do not produce architecture prose unless it helps the implementation or decision.
- For a boundary-changing or high-risk change, perform the full workflow below and record durable decisions only when future contributors need them.

Read [decision-workflow.md](references/decision-workflow.md) for the full decision sequence and pattern tradeoffs. Read [quality-and-fitness.md](references/quality-and-fitness.md) when defining quality scenarios, failure behavior, migration, or architecture checks. Consult [sources.md](references/sources.md) before relying on a named method or version-sensitive framework.

## Detect deep-review triggers

Use the deeper pass when any of these are true:

- Introduce or split a service, process, package boundary, runtime, datastore, queue, public API, or deployment unit.
- Move ownership of domain logic or data, share a database across owners, or change transaction and consistency guarantees.
- Add asynchronous delivery, events, retries, concurrency, distributed coordination, caching, or background work.
- Change authentication, authorization, tenant isolation, secrets, privacy, audit, or another trust boundary.
- Change an SLO, capacity assumption, hot path, recovery objective, failure domain, rollout, migration, or rollback path.
- Make a costly-to-reverse choice, introduce a cross-team contract, or create a material operational burden.

If none apply, keep the architecture pass lightweight.

## Build an evidence map

Inspect the smallest useful surface before proposing a design:

1. Read scoped instructions, manifests, configuration, entry points, module boundaries, public interfaces, schemas, migrations, tests, deployment files, and operational documentation.
2. Trace representative write and read paths through real call sites. Identify the component that owns each rule and record where validation, authorization, transactions, retries, and error translation occur.
3. State observed constraints separately from assumptions. Confirm uncertain scale, latency, availability, compliance, and team-boundary claims rather than inventing them.
4. Identify the change's blast radius: callers, consumers, stored data, deployment order, background workers, caches, metrics, and rollback behavior.
5. Preserve unrelated work and existing contracts. Prefer the smallest cohesive change that removes the root cause.

## Define the architectural decision

Express the decision in testable terms:

- Name the business capability and invariants the design must protect.
- Define one or more measurable quality scenarios: stimulus, operating environment, affected artifact, expected response, and response measure.
- Separate mandatory constraints from preferences.
- Include the simplest viable option and the option of retaining the current design.
- Compare alternatives against the same criteria: correctness, evolvability, security, reliability, operability, performance, cost, team ownership, migration risk, and reversibility.
- Expose tradeoffs and rejected assumptions. Do not choose a pattern because it is fashionable or familiar.

## Shape boundaries and dependencies

Assign every business rule and datum one clear owner. Make dependencies explicit and point them toward stable policy rather than volatile infrastructure.

- Keep domain rules independent from transport, storage, frameworks, and vendor SDKs when doing so protects a real change axis or improves testability.
- Use ports and adapters only at meaningful external or volatile boundaries. Do not wrap stable libraries in speculative interfaces.
- Prevent dependency cycles. Enforce allowed dependency directions with module, package, lint, or build rules when the boundary matters.
- Treat a database schema, queue, cache key, event, filesystem layout, and shared library as contracts when another component depends on them.
- Do not use a shared database as an undocumented integration API. If multiple owners must touch the same data, define authority, write paths, compatibility, locking, and migration order.
- Keep public APIs narrower and more stable than internal implementation details. Translate external models at the owning boundary when their semantics differ from the domain.

## Select a structure by tradeoff

Prefer a modular monolith when one deployment unit, one transactional boundary, and rapid coordinated change fit the constraints. Enforce internal module ownership so later separation remains possible without pretending the network already exists.

Choose distributed services only when independent deployment, scaling, isolation, data ownership, or team autonomy has measured value greater than network latency, partial failure, duplicated data, observability, security, and operational cost.

Use layered structure to clarify directional dependencies such as interface, application, domain, and infrastructure. Avoid pass-through layers that add no policy or isolation.

Use hexagonal structure when a stable application core must be tested independently or multiple external adapters genuinely vary. Keep ports in the language of the application, not the vendor.

Use event-driven integration when temporal decoupling, fan-out, replay, or audit history is required. Define event meaning, schema ownership, ordering scope, delivery guarantee, idempotency, backpressure, retry, dead-letter handling, observability, and replay safety before implementation.

Use data-oriented layout or algorithms for measured throughput, memory locality, vectorization, or transformation-heavy hot paths. Do not sacrifice domain clarity for unmeasured micro-optimization.

Combine styles at different scales only when each style solves an explicit problem.

## Design data, time, and failure

- State the source of truth, transaction boundary, isolation expectation, uniqueness rules, and authoritative clock or ordering source.
- Select strong, eventual, or compensating consistency per invariant. Describe what users and downstream systems observe during lag or conflict.
- Define concurrent-write behavior: serialize, compare-and-swap, optimistic version, lock, commutative update, idempotent operation, or explicit conflict.
- Assume remote calls, queues, caches, and workers can be slow, duplicate, reorder, partially succeed, or become unavailable. Bound waits, retries, queues, and resource use.
- Make retry ownership singular. Retry only operations whose semantics are safe, use backoff and jitter, and prevent retry storms.
- Define degradation, timeout, cancellation, circuit-breaking, recovery, reconciliation, and poison-message behavior where relevant.
- Keep caches derived and disposable unless the design explicitly treats them as durable state. Define keys, freshness, invalidation, stampede protection, and failure fallback.

## Cover security, privacy, and operations

Map trust boundaries and privileged operations. Enforce authorization at the owning server-side boundary, validate untrusted data, minimize sensitive data, and ensure logs and telemetry do not leak credentials or personal data.

Design observable outcomes, not only logs. Define service-level indicators, structured events, traces, correlation, health signals, capacity limits, and alerts tied to user impact. Ensure on-call operators can diagnose and recover the new behavior.

Estimate performance from workload shape and budgets before optimizing. Measure the representative path and retain correctness under overload through bounded concurrency, admission control, backpressure, and deliberate degradation.

## Evolve safely

Prefer compatible, staged change:

1. Expand contracts or schemas so old and new code can coexist.
2. Deploy readers and writers in an order that preserves invariants.
3. Backfill or reconcile with resumable, observable, idempotent work.
4. Switch traffic or authority gradually and watch explicit success and rollback signals.
5. Contract obsolete paths only after usage and data prove they are no longer required.

Account for the data state during rollback. Avoid unbounded dual writes; if unavoidable, define authority, failure handling, reconciliation, and exit criteria. Never call a migration reversible merely because code can be redeployed.

## Verify architecture with fitness checks

Turn important architectural claims into the cheapest reliable checks:

- Unit and property tests for domain invariants.
- Dependency, cycle, visibility, or package-boundary checks for structure.
- Contract and schema-compatibility tests for public interfaces and events.
- Migration tests against representative data and mixed-version deployments.
- Authorization and tenant-isolation tests across boundaries.
- Load, fault, recovery, and concurrency tests when the risk justifies them.
- Production metrics or monitors for latency, errors, saturation, lag, data drift, and recovery objectives.

Treat checks as architecture fitness functions only when they objectively protect a desired property. Do not add broad tooling for a narrow local change.

## Record only durable knowledge

Create an architecture decision record when the context, decision, alternatives, consequences, and reversal conditions will matter later. Mark its status and link superseding decisions. Use a C4 context or container diagram when it clarifies people, systems, deployable units, or responsibilities; prefer text and code-level evidence for details that change frequently.

Do not create diagrams, ADRs, or new architecture documents for routine implementation unless the repository convention or request requires them.

## Reject common failure modes

- Do not start with microservices, event sourcing, clean architecture, or another named style before defining the problem.
- Do not split by technical layer across services while leaving data and business ownership ambiguous.
- Do not hide network or transactional behavior behind a local-looking abstraction.
- Do not centralize every concern in a shared package that becomes an unversioned coupling point.
- Do not rely on diagrams that disagree with deployable artifacts, schemas, or runtime topology.
- Do not optimize for hypothetical scale while ignoring present correctness, delivery speed, and operability.
- Do not accept eventual consistency, retries, or caching without defining user-visible semantics and failure recovery.
- Do not record a decision without consequences, validation, and a path to revisit it.
