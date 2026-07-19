# Strategy and boundaries

## Turn change analysis into a test portfolio

1. Write each behavior as actor, precondition, action, observable result, and prohibited result.
2. Mark affected boundaries: process, thread, database, queue, network, browser, third party, trust zone, deployment, or schema version.
3. Score impact, likelihood, exposure, reversibility, and detectability as low, medium, or high. Explain high scores with evidence rather than multiplying arbitrary numbers.
4. Choose the lowest layer that executes the risky semantics. Add a cross-boundary check for wiring or compatibility, not duplicate permutations.
5. Define the oracle, data, environment, failure injection, cleanup, and artifact needed to diagnose a failure.
6. Revisit the map after implementation; the diff may reveal new branches, dependencies, or migration risk.

## Assign each guarantee an owner

| Guarantee | Primary evidence | Complementary evidence |
| --- | --- | --- |
| Pure calculation or state machine | Unit/property tests | A few integration examples through the caller |
| Authorization or tenant isolation | Service/API integration with real policy and persistence | Critical browser journey plus security abuse cases |
| Database constraint or transaction | Integration against relevant database topology | Concurrency and retry test |
| HTTP/event/schema compatibility | Schema and consumer/provider contract tests | One deployed smoke journey |
| UI semantics and accessibility | Component tests through roles and user interaction | Browser tests, keyboard, assistive technology |
| Critical customer journey | Layered logic/integration coverage | Small browser E2E and production canary |
| Migration and recovery | Versioned integration, partial/resume, restore drill | Staged rollout signals |
| Capacity and degradation | Thresholded load/fault test | Production SLOs and canary comparison |

## Adapt the portfolio to architecture

- Monolith: keep domain tests fast, exercise framework and database boundaries with real integration, and use a few process-level journeys.
- Services: test service logic locally, verify contracts on both sides, exercise message and retry semantics, and reserve multi-service E2E for critical flows.
- Event-driven system: test schema, partition/order rules, duplicate/out-of-order delivery, poison handling, replay, checkpoint, idempotency, and observability.
- Frontend-heavy system: use component tests for states and interactions, contract tests for API assumptions, and browser tests for routing, real browser behavior, and a few critical flows.
- Serverless or job system: test handler logic, provider adapter integration, cold-start/config wiring, concurrency, timeout, retry, duplicate trigger, and dead-letter recovery.
- Data pipeline: verify schema, transformations, quality invariants, late/duplicate data, checkpoint/replay, backfill, lineage, and bounded resource behavior.

## Prefer stable oracles

- Assert public return values, persisted state, emitted contracts, visible UI, authorized side effects, and telemetry required for operation.
- Avoid snapshots of volatile markup, full serialized objects, timestamps, generated IDs, stack traces, or unordered collections unless normalized and intentionally reviewed.
- Keep each test's reason for failure narrow. A large journey may prove wiring but is a poor diagnostic oracle for every branch.
- Assert both what must happen and the dangerous effect that must not happen for security, idempotency, and partial-failure cases.

## Define completion for a change

- Acceptance criteria map to automated or explicitly manual evidence.
- Changed high-risk branches and failure paths have meaningful checks at the correct layer.
- Contracts, stored-data compatibility, authorization, observability, and rollback are covered where affected.
- Tests pass alone, in suite order, and under supported parallelism; failure artifacts identify the cause without secrets.
- Focused checks, relevant broader checks, and any required build, type, lint, migration, accessibility, security, or performance gates were run and observed.
- Gaps are named with consequence and reason; unrun checks are never reported as successful.
