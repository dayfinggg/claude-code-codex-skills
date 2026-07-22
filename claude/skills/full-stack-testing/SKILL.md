---
name: full-stack-testing
description: Design risk-based test strategy, test infrastructure, CI gates, flaky-test diagnosis, or evidence spanning processes, data, browsers, or deployment. Use only for those cross-boundary concerns; do not trigger merely because a request adds or runs focused tests.
---

# Full-Stack Testing

Build the smallest body of evidence that can disprove the requested behavior or delivery claim. Match depth to risk rather than applying every test layer.

## Start with one observable behavior

1. Recover the explicit specification, repository standards, affected public contract, consumers, failure paths, and existing test commands.
2. For a defect, establish a deterministic reproduction before editing. For new behavior, select the smallest public example that demonstrates value end to end.
3. Run one Red–Green–Refactor loop at a time: add one test that fails for the intended reason, implement the minimum behavior, observe it pass, then improve structure while it stays green.
4. Derive expected values independently from the implementation. Assert public effects and invariants, not private steps or a mock call when the outcome matters.
5. Expand from the tracer test only for distinct boundary, compatibility, failure, or risk cases.

Do not generate a large imagined test suite before any implementation feedback. A thin vertical test through the real public seam is more informative than complete-looking horizontal layers that have never worked together.

## Select evidence by risk

Use static checks for syntax, types, schemas, dependencies, and policy. Use unit tests for pure rules, component tests for one public module, integration tests for framework or infrastructure semantics, contract tests for producer-consumer compatibility, and a few browser or API end-to-end tests for critical journeys. Add accessibility, security, performance, resilience, migration, or recovery checks only from an explicit risk, threat, workload, or failure model.

Read [strategy and boundaries](references/strategy-and-boundaries.md) before changing layer ownership or the test portfolio. Read [fixtures, contracts, and workflows](references/fixtures-contracts-workflows.md) for deterministic data, real-versus-fake dependencies, time, concurrency, browser, API, database, and message scenarios. Read [proof of behavior](references/proof-of-behavior.md) when delivery requires a manual demonstration, UI evidence, or a repeatable repository-local product test skill. Read [framework notes](references/framework-notes.md) only after identifying the installed stack.

## Keep tests deterministic and meaningful

Give each test isolated state and explicit cleanup. Control time, timezone, locale, randomness, network, identifiers, ports, concurrency, and external services at the narrowest boundary. Wait for observable conditions with deadlines instead of sleeping. Reproduce races with synchronization rather than scheduler luck.

Use real dependencies when their semantics are the risk. Use fakes for controlled boundary responses and mocks only when the interaction itself is the contract. Never copy the production algorithm into the expected result, mock the behavior under test, use production credentials, or rerun a flaky check until green and call it success.

## Review two independent axes

Report repository-standard findings and specification findings separately. Standards cover established conventions, correctness, safety, and maintainability. Specification coverage checks only behavior the user or authoritative artifact actually requires; do not invent missing requirements. A change can pass one axis and fail the other.

## Verify delivery claims

For high-impact work, read [delivery evidence](references/delivery-evidence.md) and map each acceptance criterion or material risk to the cheapest evidence that can falsify it. Record command, scope, exit status, relevant output, environment, and skipped coverage. Mark each item `verified`, `failed`, `blocked`, or `not checked`; authorization for deployment or external writes remains separate from readiness.

Use stronger gates for migrations and data integrity, authorization and privacy, distributed concurrency, critical UI interaction, measured performance, or staged rollout. Read [non-functional, CI, and production verification](references/nonfunctional-ci-production.md) for those cases. Do not weaken assertions, widen timeouts, add broad retries, disable platforms, or introduce a new testing tool merely to obtain a green result.

Read [testing sources](references/sources.md) or [delivery sources](references/delivery-sources.md) only for current, versioned, or named standards.
