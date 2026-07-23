---
name: tdd
description: Implement features and bug fixes test-first through verified red-green-refactor cycles, one observable behavior at a time. Use when the user requests TDD or red-green-refactor, when a concrete behavior has an appropriate automated test surface, or when a regression must be locked down before a fix. Do not use for exploratory prototypes, generated artifacts, purely mechanical changes, or repositories where introducing tests would exceed the requested scope.
---

# Test-Driven Development

Build one thin, observable behavior at a time. Require each test to prove that it can detect the missing or broken behavior before relying on it.

## Establish the Test Contract

- Identify the requested behavior, completion criteria, and stable public seam.
- Read the repository's test instructions, framework configuration, nearby tests, and implementation patterns.
- Use the existing test framework and commands. Do not introduce a new framework unless the user requests it or the task clearly authorizes it.
- Establish the narrowest relevant baseline before editing.
- Test behavior and contracts, not incidental private structure.

If the behavior is still materially undefined, resolve it through the active planning workflow before writing tests.
If no stable public seam exists, apply the active codebase-design workflow before exposing internals only for testing.

## Choose the First Vertical Slice

Select the smallest end-to-end path that delivers observable value and reduces uncertainty. The first slice should cross the real integration seam needed by the behavior without building every case in advance.

Order later slices by:

- core success behavior;
- meaningful failure behavior;
- boundaries and state transitions;
- compatibility and regression risks.

Do not write a batch of speculative tests before implementation.

## Run the Red Phase

Write exactly one focused test that:

- names the behavior in domain terms;
- uses the public interface or nearest stable seam;
- drives the real production path as directly as practical;
- uses expected values from an independent source such as the specification, a known-good literal, or a verified example;
- remains deterministic and isolated from unrelated state.

Run that test immediately. Confirm that it fails because the required behavior is absent or defective.

If the test passes before implementation, strengthen or replace it. If it fails because of syntax, setup, fixtures, or an unrelated problem, repair the test harness and repeat until the failure proves the intended gap.

Never count an unexecuted test as red.

## Run the Green Phase

Implement the smallest complete production change that makes the single failing behavior pass.

- Follow the repository's architecture, types, error model, and supported versions.
- Do not hard-code the assertion value, bypass the production path, weaken the test, or add test-only branches.
- Do not add speculative abstractions or unrelated cleanup.
- Run the focused test until it passes.
- Run the nearest relevant existing tests to detect immediate regressions.

Never count an unexecuted test as green.

## Refactor Only on Green

Once the relevant tests pass:

- remove duplication and improve names or boundaries only where the completed slice demonstrates a need;
- keep behavior unchanged;
- rerun the focused and neighboring tests after each meaningful refactor;
- stop refactoring when the code is clear and fits the existing design.

Do not refactor while the suite is red.

## Repeat by Behavior

Add the next test only after the previous cycle is green. Let evidence from each cycle refine the next slice.

For bug fixes, make the first red test reproduce the exact reported symptom. For legacy code without a stable seam, first add the narrowest useful characterization test, then create a seam only when required for the requested behavior.

Use doubles only at true external or nondeterministic boundaries. Prefer real domain logic and public contracts over mocks of internal collaborators.

## Handle Cases Where TDD Does Not Fit

Do not force a unit test when stronger verification is a compiler check, schema validation, migration dry run, visual comparison, benchmark, or end-to-end runtime exercise.

If an automated regression test is impractical:

- explain the concrete limitation;
- use the strongest repeatable verification available;
- avoid adding low-value tests that merely reproduce implementation details.

## Complete the Work

After all required slices are green:

- run the complete relevant test set;
- run applicable type checks, linters, builds, and runtime checks;
- inspect the final diff for untested behavior, weakened assertions, skipped tests, brittle implementation coupling, and scope expansion;
- confirm every completion criterion has evidence.

## Completion Standard

Finish only when each implemented behavior was preceded by a meaningful failing signal, all relevant checks are green, and the tests would detect a regression through stable observable contracts.
