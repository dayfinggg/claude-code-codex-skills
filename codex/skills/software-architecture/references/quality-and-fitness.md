# Quality, failure, and fitness guide

## Translate qualities into evidence

| Quality | Questions | Evidence or checks |
| --- | --- | --- |
| Correctness | Which invariants hold under concurrency and partial failure? | Domain, property, transaction, and concurrency tests |
| Modifiability | Which expected change should remain local? | Dependency graph, ownership boundaries, change-impact exercise |
| Reliability | What fails, how is it detected, and how does it recover? | Fault tests, recovery drill, SLI/SLO, reconciliation metrics |
| Performance | What workload, percentile, and resource budget matter? | Representative benchmark, load profile, saturation telemetry |
| Security | Which assets, trust boundaries, and abuse paths exist? | Threat model, authorization tests, security control verification |
| Operability | Can operators understand and restore the system? | Structured telemetry, runbook exercise, alert quality, RTO/RPO test |
| Compatibility | Can old and new producers, consumers, code, and data coexist? | Contract/schema diff, mixed-version test, migration rehearsal |
| Cost | What build and recurring operational cost is justified? | Capacity model, provider bill estimate, ownership/on-call estimate |
| Sustainability | Which resource and lifecycle choices reduce avoidable impact? | Utilization, retention, right-sizing, lifecycle policy |

Do not claim a quality without a response measure or observable proxy.

## Failure review

For each external call, queue, datastore, cache, lock, worker, and deployment boundary, answer:

- What are the timeout and cancellation semantics?
- Which failures are transient, permanent, ambiguous, or partial?
- Which component owns retries, and is the operation safe to retry?
- Can the operation duplicate, reorder, or arrive after its caller has abandoned it?
- What bounds concurrency, queue depth, payload size, work duration, and memory?
- What happens under dependency slowdown rather than total outage?
- How are poison data, dead letters, and reconciliation exposed and resolved?
- What user-visible result and operator signal appear in each failure class?
- Does recovery preserve authorization, privacy, and audit requirements?

## Data evolution review

- Define old-code/new-data and new-code/old-data behavior.
- Make additive schema changes before requiring new fields or semantics.
- Backfill in resumable, rate-limited, observable batches with idempotent checkpoints.
- Prefer one authoritative writer during transitions.
- If dual writing is unavoidable, identify the source of truth, divergence metric, repair path, and removal date.
- Delay destructive schema changes until telemetry proves no old reader or writer remains.
- Test rollback with post-migration data; code rollback alone is insufficient.
- Verify backup, restore, retention, and deletion obligations when data criticality changes.

## Fitness-function selection

Use an automated fitness function only when all are true:

1. The architectural property is important and sufficiently precise.
2. A repeatable signal can distinguish conformance from drift.
3. The check's false-positive and maintenance costs are acceptable.
4. The check runs at the cheapest useful layer: editor, build, test, deployment gate, or production monitor.

Examples:

- Deny forbidden module imports and dependency cycles in the build.
- Diff OpenAPI, protobuf, event, or database schemas for incompatible changes.
- Run consumer contract tests before provider deployment.
- Assert tenant filters and object authorization across representative endpoints.
- Alert on queue age, reconciliation drift, error-budget burn, or recovery lag.
- Benchmark a measured hot path against an explicit regression budget.

Avoid proxies that reward the wrong behavior, such as line-count quotas, arbitrary layer counts, or a single global latency target that hides critical paths.

## Risk-scaled evaluation

For ordinary changes, one engineer can walk the quality scenarios and checks. For high-cost, cross-team, safety-critical, or hard-to-reverse decisions, involve the affected stakeholders and use a structured tradeoff review inspired by ATAM. Do not call a brief design review a formal ATAM; the SEI method has defined participants, preparation, scenarios, and analysis activities.
