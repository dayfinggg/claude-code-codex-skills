# Architecture decision workflow

Use this reference for boundary-changing or high-risk decisions. Keep routine changes on the lightweight path in `SKILL.md`.

## Decision sequence

1. Frame the outcome: name the user or business capability, current failure or limitation, and non-goals.
2. Inventory evidence: map real components, owners, data, calls, deployments, runtime constraints, tests, and operations.
3. State invariants: define what must remain true across success, concurrency, partial failure, migration, and rollback.
4. Write quality scenarios: make latency, availability, security, modifiability, observability, and recoverability measurable.
5. Find the decision boundary: distinguish a local implementation choice from a durable cross-component contract.
6. Generate options: include status quo, smallest local change, and only the materially different architectures.
7. Compare consistently: use the same quality scenarios, delivery cost, ongoing cost, failure surface, and reversibility for every option.
8. Prototype only the uncertain property: validate throughput, compatibility, failure recovery, or tool support rather than building a disguised production system.
9. Plan evolution: specify mixed-version behavior, data movement, rollout gates, telemetry, rollback, and cleanup.
10. Decide and verify: record rationale only if durable; create fitness checks for the properties that justify the choice.

## Quality scenario template

Use a measurable sentence rather than an adjective:

`When <stimulus> occurs in <environment>, <artifact> responds by <behavior> within <measure>.`

Examples:

- When one dependency times out during peak traffic, checkout rejects or queues the operation within the latency budget without duplicate charges.
- When an old worker consumes the expanded event during a rolling deployment, it ignores the new optional field and preserves existing semantics.
- When one tenant guesses another tenant's identifier, the owning service denies access without revealing whether the object exists.
- When the primary region becomes unavailable, operators restore the critical write path within the recovery objective and lose no more data than the recovery-point objective allows.

## Pattern selection cues

| Structure | Favor when | Costs to prove acceptable |
| --- | --- | --- |
| Modular monolith | One deployment and transaction boundary fit; coordinated change is common | Internal boundaries need explicit ownership and enforcement |
| Distributed services | Independent deploy, scale, fault isolation, or team ownership is measured | Network failure, data duplication, security, telemetry, and operations |
| Layered | Dependency direction and separation of concerns need clarity | Pass-through indirection and domain leakage |
| Hexagonal | Core policy must outlive or be tested apart from external adapters | Port proliferation and lowest-common-denominator interfaces |
| Event-driven | Temporal decoupling, fan-out, replay, or audit is required | Ordering, duplicates, lag, schema evolution, replay, and debugging |
| Data-oriented | Profiling proves locality, allocation, or vectorization dominates | Reduced domain clarity and more specialized implementation |

Treat these as cues, not recipes. A system can use different structures at different scales.

## Boundary checklist

- Give each capability and datum one accountable owner.
- Publish a contract only where another owner or deployment unit must depend on it.
- Keep transactions local where possible; make cross-boundary workflows and compensation explicit.
- Separate commands that request change from events that report facts.
- Decide whether synchronous availability coupling is acceptable.
- Define identity, time, ordering, deduplication, and authorization at the boundary.
- Prevent infrastructure models from silently becoming the domain or public API.
- Prefer stable dependency direction; detect cycles automatically when they matter.

## ADR minimum

Record:

- title, date, status, and owners;
- problem context and constraints;
- decision and scope;
- alternatives seriously considered;
- positive and negative consequences;
- validation and rollout plan;
- reversal or review conditions;
- links to superseded or superseding decisions.

Do not turn an ADR into a timeless decree. Update status when reality changes; preserve history instead of rewriting the old rationale.
