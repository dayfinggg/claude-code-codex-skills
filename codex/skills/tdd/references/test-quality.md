# Test quality

Test behavior through a stable public interface or the narrowest useful system boundary. Name tests in domain language and make each failure identify one violated behavior.

Use an expected result independent of the implementation: an approved example, specification, invariant, known literal, or separately derived calculation. Never copy the observed result into the expectation or reproduce the production algorithm inside the test.

Keep tests deterministic, isolated from execution order, and explicit about time, randomness, locale, storage, and network assumptions. Prefer integration or contract tests when the risk crosses component boundaries. Use characterization tests before changing poorly understood legacy behavior.

Treat snapshots as evidence only when a reviewer can determine their semantic meaning. Never weaken assertions, skip failures, or update snapshots merely to obtain green.

Primary references: [Martin Fowler on TDD](https://martinfowler.com/bliki/TestDrivenDevelopment.html), [Martin Fowler on test doubles](https://martinfowler.com/bliki/TestDouble.html), [Gerard Meszaros, *xUnit Test Patterns*](https://xunitpatterns.com/), and the project's current official testing-framework, runtime, and integration documentation.
