---
name: tdd
description: Run a verified red-green-refactor cycle for observable behavior. Use only when the user explicitly requests TDD or repository policy requires test-first work; skip ordinary implementation, testing, research, prose, and disposable spikes.
---

# Test-Driven Development

1. Read repository instructions, test conventions, commands, and the behavior contract. Derive a short test list from acceptance criteria and domain scenarios. For poorly understood existing behavior, first establish and run a characterization baseline.
2. Select one smallest observable behavior and its public seam. Use [test-quality](references/test-quality.md) when designing a test and [test doubles](references/test-doubles.md) when choosing a collaborator substitute.
3. Red: for behavior that is not already satisfied, write one runnable test with an independent expected result. Run it and confirm that it fails for the intended missing behavior, not syntax, setup, or an unrelated defect. If the required behavior already passes, do not manufacture an artificial red; preserve the passing characterization or regression result and select the next unmet behavior or change.
4. Green: make the smallest production change that satisfies the test. Run the new test and relevant existing tests. Preserve all assertions and requirements.
5. Refactor only while green. Improve names, duplication, cohesion, or boundaries without adding behavior, then rerun the affected tests. Keep behavior-preserving cleanup distinct from a behavior change where doing so makes evidence or review clearer.
6. Repeat one vertical behavior at a time. Classify unrelated failures and report them, but let them block progress only when they prevent trustworthy evidence for the behavior under test.
7. Run the proportionate regression suite, type checks, static analysis, and build. Report exact commands and the observed red-green or characterization-regression evidence, plus any unrelated failures that constrained confidence.

Stop when expected behavior is unresolved or the test cannot run. Finish only when each new or changed behavior has appropriate evidence: an observed red-green pair when it was initially unmet, or a recorded passing characterization or regression baseline when it already passed, and all relevant checks have run or have an explicit constraint.
