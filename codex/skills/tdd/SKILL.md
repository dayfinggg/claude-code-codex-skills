---
name: tdd
description: Develop observable behavior test-first through a verified red-green-refactor cycle. Use for features, bug fixes, regressions, public contracts, and integration behavior when the user requests TDD or repository policy requires it; skip research, prose-only work, disposable spikes, and changes with no testable behavior.
---

# Test-Driven Development

1. Read repository instructions, test conventions, commands, and the behavior contract. Derive a short test list from acceptance criteria and domain scenarios.
2. Select one smallest observable behavior and its public seam. Read [test-quality.md](references/test-quality.md) before designing the test.
3. Red: write one runnable test with an independent expected result. Run it and confirm that it fails for the intended missing behavior, not syntax, setup, or an unrelated defect.
4. Green: make the smallest production change that satisfies the test. Run the new test and relevant existing tests. Preserve all assertions and requirements.
5. Refactor only while green. Improve names, duplication, cohesion, or boundaries without adding behavior, then rerun the affected tests.
6. Repeat one vertical behavior at a time. Use [test-doubles.md](references/test-doubles.md) only when a collaborator is difficult, slow, nondeterministic, or external.
7. Run the proportionate regression suite, type checks, static analysis, and build. Report exact commands, red and green evidence, and unrelated failures.

Stop when expected behavior is unresolved, the test cannot run, or unrelated failures prevent trustworthy evidence. Finish only when every new behavior has observed red and green states and all relevant checks pass.
