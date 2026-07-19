---
name: test-engineering
description: Test design and authoring workflow for effective, fast, deterministic test suites. Use when writing or modifying tests, adding coverage for new or changed behavior, creating regression tests for bugs, designing a test strategy for a feature, diagnosing or fixing flaky tests, choosing test doubles, structuring fixtures and test data, or reviewing test quality in any language or framework.
---

# Test Engineering

## What To Test

- Before choosing tools or layers, read the repository's test configuration, existing suites, CI, schemas and API contracts, fixtures, factories, and migrations, and identify the exact language, runtime, framework, test runner, assertion and mock libraries, and coverage policy in use.
- Trace the changed behavior from its entry point through authorization, validation, domain logic, persistence, events, caches, external services, UI state, and telemetry so the test targets where the risk actually lives.
- Test behavior contracts through public interfaces, not implementation details. A refactor that preserves behavior must not break tests; a test that breaks on renames is welded to the wrong layer.
- Changed behavior always gets a test. Bug fixes start from a regression test that fails before the fix for the right reason.
- Prioritize by risk: money paths, data mutations, identity, permissions, cross-tenant access, privacy, irreversible data, availability, compatibility, concurrency, parsing of external input, and boundary handling come before happy-path CRUD. Rank by impact, likelihood, exposure, reversibility, and how easily another check would catch it.
- Define observable acceptance criteria and oracles before writing the test; do not test an implementation detail when a stable public effect exists.
- Apply the mutation question to every test: would it fail if the code broke? A test that cannot fail for a real defect is decoration — strengthen or delete it.
- Follow project conventions first: existing test layout, runner, naming, and fixtures define the local idiom.

## Layer Selection

Choose a portfolio, not a universal pyramid quota: many fast deterministic checks close to the logic, plus a smaller set of realistic cross-boundary journeys. Test each guarantee at the lowest layer that can observe it accurately, and add a higher-layer check only for wiring, configuration, compatibility, or user-visible integration risk.

| Layer | Best use | Avoid using it for |
| --- | --- | --- |
| Static analysis | Types, syntax, dependency and policy violations | Runtime behavior it cannot observe |
| Unit | Pure logic, state transitions, validation, edge cases | Framework/database behavior reproduced with elaborate mocks |
| Component | One UI, service, handler, or module through its public surface | Whole-system deployment confidence |
| Integration | Real database, broker, filesystem, framework, or adapter semantics | Every combinatorial domain case |
| Contract/schema | Producer-consumer compatibility and protocol shape | Provider business correctness by itself |
| Browser/API E2E | A few critical journeys and deployed wiring | Exhaustive validation or logic branches |
| Non-functional | Accessibility, security, load, resilience, migration, recovery | Generic checklists without a threat, workload, or failure model |

## Input Design

- Cover equivalence classes, not random samples. For each input dimension: empty, one, many, maximum, just over maximum, zero, negative, duplicate, unicode and special characters, malformed, and legacy data shapes.
- Error paths are first-class scenarios: wrong types, missing fields, unavailable dependencies, timeouts, permission denials, cross-tenant attempts, not-found, conflicts, and cancellations each deserve a case when the code claims to handle them.
- Cover retries, duplicate requests, idempotency, timeout before and after commit, partial external success, backpressure, stale cache, out-of-order and duplicate messages, and dependency degradation where the code sits on that kind of boundary.
- Test concurrent updates with controlled synchronization rather than hoping for a race; assert the invariant that must hold, not a particular scheduler order.
- Test time-dependent logic around expiry, daylight-saving transitions, leap boundaries, clock skew, locale, and absolute versus relative time where the domain depends on them.
- Use table-driven or parameterized tests for input classes: coverage stays visible and adding a case costs one line.
- Use property-based testing when the input space is large and invariants are statable — roundtrips, idempotency, ordering, conservation. Fuzz parsers that consume external input.

## Structure

- Arrange-Act-Assert with one behavior per test; the name states the scenario and the expected outcome so a failure reads as a bug report without opening the file.
- Assert on outcomes that matter to callers. Avoid asserting incidental details: ordering of unordered collections, full-object snapshots that churn, or internal call sequences.
- Build test data with builders or factories that carry sensible defaults, overriding only the fields the scenario is about; the reader should instantly see what makes this case special.
- Prefer readable duplication over clever shared setup that hides causality; a test should be understandable without chasing helpers.

## Determinism And Isolation

- Control the uncontrollable: inject or fake the clock, seed randomness, stub the network, confine filesystem use to temporary directories, generate identifiers deliberately, and reset global state between tests.
- No sleeps. Synchronize on events, awaited results, polls with deadlines, or fake timers; a sleep is a race condition with a timeout.
- Tests pass in any order and in parallel; order dependence is a defect in the tests. Never call a test isolated if it shares mutable database rows, accounts, files, queues, ports, the clock, process globals, or external sandbox state without a proven namespace and cleanup strategy.
- A flaky test is a real bug in the test or the code. Quarantine it visibly and fix it promptly; retry-until-green converts a signal into noise.

## Test Doubles

- Prefer real implementations, then fakes (working in-memory versions), then stubs; mocks with interaction assertions are the last resort.
- Replace dependencies only at architectural boundaries — network, clock, external services, randomness. Mocking internals welds tests to the implementation and makes refactoring dishonest.
- Never mock the behavior actually being verified, assert only that a mock was called when the outcome matters, or duplicate an external dependency's implementation inside a fake.
- If a boundary is faked everywhere, contract-test the fake's assumptions against the real dependency somewhere in the suite.
- Never use production credentials or unrestricted production data in a test; use synthetic or approved anonymized data and redact captured artifacts.

## Contract And Schema Testing

- Validate requests, responses, events, database records, and files against the versioned schema the system actually uses.
- Test required and optional fields, null versus missing, enums, formats, unknown fields, status and error semantics, pagination, ordering, idempotency keys, authentication, and compatibility across supported versions.
- Generate tests or clients from a specification only when the existing toolchain already owns that flow; still write semantic examples and negative cases by hand.
- For consumer-driven contracts, keep consumer expectations minimal and verify every deployed provider version in CI. Do not encode provider implementation behavior into the consumer contract.

## UI And Accessibility Testing

- Query by accessible role, name, label, or visible text before test IDs; interact through public controls and assert visible state, navigation, accessibility state, and the resulting network or persistence effect.
- Use the browser runner's actionability and retry model. Avoid brittle CSS/XPath selectors tied to layout, fixed delays, and branches based on transient DOM state.
- Cover keyboard operation, focus order and restoration, labels, names/roles/values, errors, loading, empty and disabled states, responsive breakpoints, and critical screen-reader flows for high-risk journeys.
- Combine automated accessibility rules with keyboard and assistive-technology review for high-risk journeys; automation alone cannot prove full conformance.

## Non-Functional Testing

- Derive security tests from an actual threat model for the change; a generic scan is a starting point, not a substitute for application-specific analysis.
- Derive performance tests from a workload model and SLOs: warmup, representative data, concurrency, percentiles, errors, saturation, and explicit pass/fail thresholds.
- Inject specific failures — latency, connection reset, network partition, unavailable dependency, exhausted pool, process restart, duplicate message — and assert bounded degradation and recovery, not just that nothing crashed.
- Test schema and data migrations with old/new binaries running together, expand-contract compatibility, partial execution, resume, rollback or roll-forward, reconciliation, and restore.
- Never run destructive, high-load, fault-injection, migration, failover, or security scans against a shared or production target without explicit authorization and target verification.
- Never claim accessibility, security, resilience, recovery, or performance from a single automated scan or a happy-path test alone.

## Suite Economics

- Shape the suite by cost: many fast unit tests on pure logic, integration tests at real boundaries, few end-to-end tests for critical journeys.
- The suite must stay fast enough to run habitually; a suite nobody runs protects nothing. Run the targeted subset during iteration and the broader suite before completion.
- In CI, put deterministic cheap gates first, run affected integration and contract suites next, and shard expensive browser or system suites by measured duration; reserve scheduled runs for risks too costly to check on every change.
- On failure, preserve the exact exit status and publish actionable artifacts: seed, logs with secrets redacted, request/response summaries, screenshots, traces, and environment/version metadata.
- Coverage measures what is untested; it is a signal, not a target. High coverage with weak assertions is worse than lower coverage with decisive ones. Require meaningful evidence on changed critical code, and use mutation testing selectively to assess whether assertions are strong enough.
- Never add a new framework, container stack, browser runner, contract broker, coverage gate, mutation tool, or load tool merely because it is fashionable; prefer the project's established stack and get authorization before adding a dependency.

## Maintenance

- Never weaken, skip, or delete a failing test to make progress. Fix the code, or fix a genuinely wrong test and state the justification.
- Never weaken assertions, suppress failures, inflate timeouts, add broad retries, skip platforms, or lower a quality gate merely to make CI green.
- Update tests as part of the behavior change, not afterwards; a red suite at handoff is unfinished work.
- Prune tests that no longer pin any decision; dead tests cost attention on every run.
- Quarantine a flaky test only with an owner, an issue, evidence, a defined scope, and a deadline; never make widened timeouts or disabled assertions the final fix.

## Production Confidence

Tie a release to health checks, telemetry, canary or staged exposure, compatible migrations, rollback signals, and a practiced recovery path when the change's impact warrants it. When reporting results, state what behavior was tested at which layer, the exact commands and results, versions and environment, risks covered, artifacts captured, flaky or quarantined tests, and any unverified assumptions.
