# Test doubles

Choose a collaborator by the fidelity needed to observe the behavior, then by the cost, determinism, safety, and maintenance burden of the option. Prefer a real in-process collaborator when it is fast, deterministic, and easy to construct. A double is justified at an external system boundary, expensive resource, nondeterministic clock or random source, destructive action, or failure mode that cannot be produced safely.

Double the boundary contract, not internal implementation details. Avoid mocking private methods, call order, or layers owned by the same unit merely to isolate every class. Excessive internal mocks couple tests to structure and obstruct refactoring.

Use fakes for meaningful stateful behavior, stubs for controlled answers, and spies or mocks only when the interaction itself is the contract. Back every important third-party, provider, protocol, or infrastructure double with a contract or integration test so simulated behavior cannot silently drift. Consult the current official documentation for the active test framework and external API or protocol when defining that contract.

Primary references: [Martin Fowler, "Mocks Aren't Stubs"](https://martinfowler.com/articles/mocksArentStubs.html), [Gerard Meszaros, *xUnit Test Patterns*](https://xunitpatterns.com/), and the project's current official testing-framework and provider documentation.
