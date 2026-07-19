---
name: full-stack-testing
description: "Design, implement, review, debug, and operate risk-based testing for full-stack software in any language or framework. Use whenever behavior changes, a defect is fixed, a system boundary or schema changes, tests are added or flaky, CI is designed, or confidence is needed across unit, component, integration, contract, browser E2E, accessibility, security, performance, resilience, migration, and production verification."
---

# Full-Stack Testing

Build evidence for the risks introduced or exposed by a change. Prefer the smallest realistic test that can fail for the intended reason, then add boundary and end-to-end evidence only where the risk crosses those boundaries.

## Apply the workflow

1. Inspect before selecting tools or layers.
   - Read repository guidance, architecture, manifests, lockfiles, test configuration, existing test suites, CI, schemas and API contracts, fixtures, factories, migrations, observability, and release process.
   - Identify exact language, runtime, framework, test runner, assertion and mock libraries, browser runner, database or broker setup, coverage policy, and supported versions.
   - Trace the changed behavior from entry point through authorization, validation, domain logic, persistence, events, caches, external services, UI state, and telemetry.
   - Reproduce an observed defect before changing it. Add a focused characterization or regression test that fails for the right reason when practical.
2. Build a risk map.
   - List changed behaviors, invariants, consumers, trust boundaries, stored data, concurrency, failure paths, and rollback requirements.
   - Rank risk using impact, likelihood, exposure, reversibility, and how easily another check would detect it. Give highest priority to money, permissions, identity, privacy, irreversible data, cross-tenant access, availability, and compatibility.
   - Define observable acceptance criteria and oracles. Do not test an implementation detail when a stable public effect exists.
   - Read [strategy and boundaries](references/strategy-and-boundaries.md) when deciding scope, ownership, and layer.
3. Choose the minimum sufficient evidence.

   | Layer | Best use | Avoid using it for |
   | --- | --- | --- |
   | Static analysis | Types, syntax, dependency and policy violations | Runtime behavior it cannot observe |
   | Unit | Pure logic, state transitions, validation, edge cases | Framework/database behavior reproduced with elaborate mocks |
   | Component | One UI, service, handler, or module through its public surface | Whole-system deployment confidence |
   | Integration | Real database, broker, filesystem, framework, or adapter semantics | Every combinatorial domain case |
   | Contract/schema | Producer-consumer compatibility and protocol shape | Provider business correctness by itself |
   | Browser/API E2E | A few critical journeys and deployed wiring | Exhaustive validation or logic branches |
   | Non-functional | Accessibility, security, load, resilience, migration, recovery | Generic checklists without a threat, workload, or failure model |

   - Use a portfolio, not a universal pyramid quota. Keep many fast deterministic checks close to the logic and a smaller set of realistic cross-boundary journeys.
   - Test each guarantee at the lowest layer that can observe it accurately. Add a higher-layer check only for wiring, configuration, compatibility, or user-visible integration risk.
4. Design deterministic test data and control.
   - Give each test isolated state and a clear owner for setup and cleanup. Make it pass alone, in any order, and under parallel execution.
   - Prefer builders or factories with valid minimal defaults and explicit scenario overrides. Keep fixtures small, readable, versioned, and free of hidden shared mutation.
   - Control time, timezone, locale, randomness, identifiers, network, and concurrency at the narrowest boundary. Record or seed randomness when generative testing is used.
   - Wait for observable conditions, events, or eventual assertions within a deadline. Never add arbitrary sleeps to make a test appear stable.
   - Use real dependencies where their semantics are the risk; use fakes or stubs for controlled boundary responses; use mocks or spies sparingly for an interaction that is itself the contract.
   - Read [fixtures, contracts, and workflows](references/fixtures-contracts-workflows.md) before adding shared test infrastructure.
5. Cover the behavior, edges, and failures.
   - Cover the happy path, validation boundaries, empty and maximum values, malformed and legacy data, authorization denial, cross-tenant attempts, not-found, conflicts, and stable error contracts.
   - Exercise retries, duplicate requests, idempotency, timeout before and after commit, partial external success, cancellation, backpressure, stale cache, out-of-order and duplicate messages, and dependency degradation when relevant.
   - Test concurrent updates with controlled synchronization rather than hoping for a race. Assert the invariant, not a particular scheduler order.
   - Test time around expiry, daylight-saving transitions, leap boundaries, clock skew, locale, and absolute versus relative time where the domain depends on them.
   - For a defect, make the regression test distinguish the root cause from nearby behavior and demonstrate fail-before/pass-after when feasible.
6. Verify contracts at boundaries.
   - Validate requests, responses, events, database records, and files against the versioned schema used by the system.
   - Test required and optional fields, null versus missing, enums, formats, unknown fields, status and error semantics, pagination, ordering, idempotency keys, authentication, and compatibility across supported versions.
   - Generate tests or clients from specifications only when the existing toolchain owns that flow; still test semantic examples and negative cases.
   - For consumer-driven contracts, keep consumer expectations minimal and verify every deployed provider version in CI. Do not encode provider implementation behavior into the consumer contract.
7. Test UI behavior as a user.
   - Query by accessible role, name, label, or visible text before test IDs. Interact through public controls and assert visible state, navigation, accessibility state, and meaningful network or persistence results.
   - Use the browser runner's actionability and retry model. Avoid brittle CSS/XPath tied to layout, implementation state, fixed delays, and conditional branches based on transient DOM state.
   - Cover keyboard operation, focus order and restoration, labels, names/roles/values, errors, loading, empty and disabled states, responsive breakpoints, and critical screen-reader flows.
   - Combine automated accessibility rules with keyboard and assistive-technology review for high-risk journeys; automation cannot prove full conformance.
8. Add non-functional evidence by risk.
   - Derive security tests from the threat model. Use ASVS as versioned verification requirements, WSTG as testing methodology, and the API Security Top 10 as a risk-category index; none replaces application-specific risk analysis.
   - Derive performance tests from a workload model and SLOs. Include warmup, representative data, concurrency, percentiles, errors, saturation, and pass/fail thresholds.
   - Inject specific failures such as latency, reset, partition, unavailable dependency, exhausted pool, process restart, or duplicate message, then assert bounded degradation and recovery.
   - Test schema and data migrations with old/new binaries, expand-contract compatibility, partial execution, resume, rollback or roll-forward, reconciliation, and restore.
   - Read [non-functional, CI, and production verification](references/nonfunctional-ci-production.md) for these workflows.
9. Keep CI fast, diagnosable, and honest.
   - Put deterministic cheap gates first; run affected integration and contract suites next; shard expensive browser or system suites from measured duration; reserve scheduled suites for risks too costly per change.
   - Preserve exact exit status and publish actionable failure artifacts: seed, logs with secrets redacted, request/response summaries, screenshots, traces, video when useful, service logs, and environment/version metadata.
   - Quarantine only with an owner, issue, evidence, scope, and deadline. Never make retries, widened timeouts, or disabled assertions the final flake fix.
   - Use coverage to locate unexamined risk, not as proof of correctness. Require meaningful branch/path evidence for changed critical code; use mutation testing selectively to assess assertion strength.
10. Verify production confidence and report gaps.
   - Tie the release to health checks, telemetry, canary or staged exposure, compatible migrations, rollback signals, and a practiced recovery path when impact warrants it.
   - State what behavior was tested at which layer, exact commands and results, versions and environment, risks covered, artifacts captured, flaky or quarantined tests, and unverified assumptions.

## Enforce testing guardrails

- Never add a new framework, container stack, browser runner, contract broker, coverage gate, mutation tool, or load tool merely because it is fashionable. Prefer the project's established stack; justify and obtain authorization for dependency changes.
- Never call a test isolated if it shares mutable database rows, accounts, files, queues, ports, clock, process globals, or external sandbox state without a proven namespace and cleanup strategy.
- Never mock the behavior being verified, assert only that a mock was called when the outcome matters, or duplicate an external dependency's implementation in a fake.
- Never use production credentials or unrestricted production data. Use synthetic or approved anonymized data and redact artifacts.
- Never run destructive, high-load, fault-injection, migration, failover, or security scans against shared or production targets without explicit authorization and target verification.
- Never weaken assertions, suppress failures, inflate timeouts, add broad retries, skip platforms, or lower quality gates merely to make CI green.
- Never claim accessibility, security, resilience, recovery, or performance from a single automated scan or happy-path test.

## Load references selectively

- Use [strategy and boundaries](references/strategy-and-boundaries.md) for risk mapping, layer selection, test ownership, architecture, and completion criteria.
- Use [fixtures, contracts, and workflows](references/fixtures-contracts-workflows.md) for deterministic data, dependency choices, boundary contracts, browser/API/database/message scenarios, time, concurrency, and failures.
- Use [non-functional, CI, and production verification](references/nonfunctional-ci-production.md) for accessibility, security, performance, resilience, migration, flakes, coverage, mutation, CI, canaries, and rollback signals.
- Use [framework notes](references/framework-notes.md) only after inspecting the installed stack; the notes are conditional guidance, not dependency recommendations.
- Use [authoritative sources](references/sources.md) to verify current and version-sensitive behavior before writing configuration or framework APIs.
