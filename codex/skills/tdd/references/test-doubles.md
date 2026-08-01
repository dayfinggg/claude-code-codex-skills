# Test doubles

Prefer real in-process collaborators when they are fast, deterministic, and easy to construct. A test double is justified at an external system boundary, expensive resource, nondeterministic clock or random source, destructive action, or failure mode that cannot be produced safely.

Double the boundary contract, not internal implementation details. Avoid mocking private methods, call order, or layers owned by the same unit merely to isolate every class. Excessive internal mocks couple tests to structure and obstruct refactoring.

Use fakes for meaningful stateful behavior, stubs for controlled answers, and spies only when the interaction itself is the contract. Back important third-party doubles with a contract or integration test so simulated behavior cannot silently drift.

Primary reference: [Matt Pocock's mocking guidance](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/mocking.md).
