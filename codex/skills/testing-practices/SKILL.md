---
name: testing-practices
description: "Select, design, implement, review, and verify software tests across languages and systems, including unit, integration, contract, database, migration, property, fuzz, mutation, performance, security, accessibility, visual, smoke, acceptance, end-to-end, and model or agent evaluations. Use for test strategy, coverage gaps, regression tests, flaky tests, or substantial test work. Use the TDD skill instead when the user explicitly requests red-green-refactor."
---

# Software Testing Practices

Choose the least costly test that can falsify the material risk. Add a broader
test only when a narrower test cannot observe the affected boundary, property,
configuration, or user outcome.

Read `references/evidence.md` when choosing an unfamiliar test type, deciding
whether TDD fits, evaluating suite shape, or making claims about test
effectiveness.

Read `references/llm-evals.md` when testing prompts, nondeterministic model
behavior, tool-using agents, skill routing, graders, or multi-step traces.

## Establish the Test Contract

Identify the behavior, public or stable seam, risk, expected outcome, failure
outcome, and independent source of truth. Read the repository's test
instructions, framework configuration, nearby tests, implementation, and
relevant contracts.

Establish the narrowest useful baseline. For a defect, reproduce the observable
failure before relying on a regression test. If the root cause is unknown,
diagnose it before encoding a speculative expectation.

## Select Tests by Evidence Needed

Use unit or component tests for focused decisions, validation, transformations,
domain rules, and error behavior that can be exercised in-process.

Use integration tests for real adapters and semantics involving databases,
filesystems, queues, serialization, configuration, processes, or services.

Use API or contract tests for published request, response, event, and
compatibility promises. Use the real database engine when its constraints,
transactions, indexes, SQL, or ORM behavior matters.

Use migration tests against representative prior schema and data. Verify
invariants and application compatibility. Test rollback only when rollback is a
supported release operation.

Use acceptance and end-to-end tests for a small set of critical user or business
journeys and deployment wiring. Use smoke tests for startup, configuration,
health, and minimum deployability. Do not move logic coverage into slow E2E
tests when a narrower test proves it.

Use property-based tests for laws, invariants, round trips, equivalence, ordering,
or broad input spaces. Use fuzzing for parsers, protocols, files, native code,
and hostile or unexpected input.

Use concurrency tests when ordering, races, locking, idempotency, or duplicate
delivery is a material risk. Use snapshot tests only for stable, reviewable
structured or rendered output and retain semantic assertions.

Use mutation testing selectively to assess assertion strength in high-risk
logic. Do not optimize for a perfect mutation score.

Use performance, load, stress, and resilience tests only when latency,
throughput, capacity, resources, degradation, recovery, or dependency failure
is a requirement or material risk.

Use security tests from an explicit threat or secure-coding requirement. Use
accessibility automation for detectable issues and targeted human evaluation
for behavior tools cannot judge. Use visual regression only for stable,
reviewed rendering surfaces and retain functional assertions.

For model and agent behavior, hold the model, configuration, harness, and task
set constant while comparing one change at a time. Check deterministic outcomes
and safety boundaries before subjective quality, and use repeated trials where
nondeterminism can change the conclusion.

Treat the test pyramid as a heuristic, not a ratio. Avoid suites dominated by
slow broad tests and suites with a missing integration layer.

Use coverage to locate unexecuted risk, not as proof of correctness or a
universal target.

## Construct a Meaningful Test

Name the behavior in domain terms. Arrange only controlled state and relevant
dependencies, perform one meaningful action, and assert observable output,
persisted state, emitted events, externally visible effects, or an owned
interaction contract.

Derive expected values independently from the implementation through a
specification, literal example, invariant, reference implementation, or
verified prior behavior. Do not reproduce the production algorithm in the test.

For a regression, confirm the test can fail on the pre-fix behavior and passes
only after the correction. If it passes before the fix, strengthen or replace
it.

Use doubles only at true external, expensive, or nondeterministic boundaries.
Do not mock the unit under test or mirror its private call graph. Pair a
double-based test with an integration or contract test when fidelity matters.

Prefer behaviorally distinct edge or holdout cases over more visible-example
copies. Cover meaningful failure, boundary, authorization, state-transition,
and compatibility cases according to risk.

## Choose TDD Deliberately

Use `$tdd` when the user requests TDD or when an agreed process requires
test-first development. TDD can provide a useful feedback and design loop, but
it does not guarantee good design or complete tests.

Do not force TDD for exploratory work, spikes, generated artifacts, UI discovery,
unknown external behavior, or work whose oracle and seam must first be
discovered. Require the same final behavioral evidence whether tests are written
before or after production code.

## Protect Test Integrity

Do not delete, skip, mute, weaken, filter, mark expected failure, change a
timeout, swallow an error, or bypass a test, validator, coverage gate, fixture,
CI rule, evaluator, or command merely to obtain a pass.

Do not hard-code visible inputs, branch on test names or environment markers,
read evaluator internals, return fixture-derived answers from production code,
add unconditional success paths, or update snapshots to bless unexplained
output.

Change an existing assertion only when the requested contract changed or the
test is proven incorrect. Review test and harness diffs separately from
production diffs and explain why each protected change is necessary.

Do not claim a test ran or passed without the executed command and observed
result. Rerun affected tests after the final source or test edit.

## Control Flakiness and State

Control clock, randomness, locale, ordering, concurrency, environment, network,
and external state where the contract permits. Isolate data, use unique
resources, and clean up reliably.

Prefer explicit readiness signals or bounded eventual assertions over sleeps.
Do not treat a passing retry as a fix. Quarantine only with an owner, reason,
and removal condition.

## Verify and Finish

Run the focused test first, then relevant neighboring, integration, and broader
checks according to risk. Use a clean process or environment when state leakage
could hide failure.

Inspect the final code, test, fixture, snapshot, harness, and CI diff for weak
assertions, protected-file tampering, implementation coupling, hidden skips,
stale snapshots, fixture lookup, and untested material risk.

Report commands actually run, observed pass and fail counts, skipped or flaky
tests, environment limitations, and remaining untested risks.

Finish only when each material behavior has an independent oracle, relevant
tests pass after the final edit, the tests would detect the targeted defect or
risk, and the evidence has not been weakened.
