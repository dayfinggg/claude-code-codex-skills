# Non-functional, CI, and production verification

## Accessibility

- Define the target WCAG version/level and supported browser/assistive-technology matrix; use WCAG 2.2 unless the project has another explicit obligation.
- Run automated rules on components and representative pages, then manually verify keyboard-only flow, focus visibility/order/restoration, zoom/reflow, labels, names/roles/values, errors, status messages, contrast, and critical screen-reader journeys.
- Sample every distinct page template, state, component pattern, and critical process. Automated tools find only a subset; record manual evidence and limitations.
- Treat an automated violation as evidence to inspect, not a conformance verdict. Prefer standardized ACT-backed rules where available.

## Security

- Derive cases from data flow and threat modeling: identity, session, authorization, tenant isolation, input handling, injection, SSRF, file handling, secrets, cryptography, logging, rate limits, business abuse, dependency and configuration risks.
- Select applicable ASVS 5.0.0 requirements and assurance level, use a version-pinned WSTG methodology to design test techniques, and use OWASP API Security 2023 categories to review threat coverage. None replaces application-specific risk analysis.
- Test denial and prohibited side effects, not only rejection status. Verify least privilege at application, database, storage, queue, and administrative boundaries.
- Keep active scans and destructive payloads in explicitly authorized isolated targets; redact artifacts and rotate exposed test credentials.

## Performance and resilience

1. Define workload mix, arrival pattern, concurrency, data volume/distribution, environment, warmup, duration, and service-level thresholds before running.
2. Measure latency percentiles, throughput, errors, saturation, queue depth, resource use, and recovery; avoid average-only conclusions.
3. Separate smoke, load, stress, spike, soak, and capacity experiments by question. Compare to a baseline with environmental noise noted.
4. Inject one explicit failure at a time: latency, reset, timeout, dependency outage, pool exhaustion, process loss, failover, disk pressure, duplicate or delayed message.
5. Assert load shedding, bounded queues, retry budgets, circuit behavior, fallback correctness, data integrity, recovery time, and observability.

## Migrations and recovery

- Test expand-migrate-contract with old/new application versions and old/new data shapes.
- Exercise preflight, partial batch, interruption, resume, retry, concurrent writes, reconciliation, rollback or roll-forward, cleanup, and idempotency.
- Restore an approved backup into isolation and verify schema, constraints/indexes, permissions, encryption keys, counts, invariants, application reads, RPO, and measured RTO.
- Never substitute rollback documentation for an executed representative recovery check when the change is high impact.

## Eliminate flakes at the cause

- Reproduce with seed, order, worker, environment, duration, and artifacts recorded. Compare isolated, repeated, shuffled, and parallel runs.
- Classify shared state, leaked resource, time/clock, async wait, race, network, external service, environment, random data, and product nondeterminism.
- Replace sleeps with condition waits, isolate state, own cleanup, bound deadlines, control clocks/randomness, and expose synchronization.
- Use retries only as temporary diagnostic containment. Quarantine with owner, issue, scope, evidence, and expiry; keep the lost coverage visible.

## Use coverage and mutation responsibly

- Inspect changed-line, branch, and risk-area gaps. Do not equate statement percentage with behavior or assertion quality and do not impose a universal target without project policy.
- Exclude generated or unreachable code only with documented configuration. Investigate sudden drops and suspiciously high coverage from broad incidental execution.
- Use mutation testing selectively on stable critical logic. Review surviving mutants as missing assertions, equivalent mutants, unreachable paths, or design problems; do not chase a vanity score.

## Design CI selection and artifacts

- Order gates by cost and feedback: formatting/static/type/unit, focused integration, contracts, build, broader integration, browser/system, then scheduled specialized suites as risk requires.
- Use dependency and change mapping conservatively; always run contract, migration, shared-library, and configuration consumers affected by the change.
- Shard from historical duration and preserve deterministic test identity. Detect imbalance and ensure every shard reports zero tests, crash, timeout, and cancellation distinctly.
- Capture redacted logs, traces, screenshots, video when useful, coverage, seed, timing, versions, container/service logs, and failing inputs. Retain enough to diagnose intermittent failures.

## Extend confidence into production

- Use health and readiness checks that exercise necessary dependencies without causing unsafe side effects.
- Compare canary to control on user SLOs, errors, saturation, business and data-integrity signals; predefine promotion, pause, rollback, and abort thresholds.
- Add synthetic checks for a few critical read or safely reversible write paths and verify telemetry itself during rollout.
- Treat canaries as complementary evidence: they limit exposure but do not replace pre-production tests, compatible migrations, backups, or rollback practice.
