# Framework notes

Apply only the section matching the repository's installed and supported stack. Verify exact local versions before copying APIs or configuration. Do not add these dependencies merely because they appear here.

## Testing Library

- Query by role and accessible name first, then label, placeholder or text as appropriate; use test IDs only when no semantic query exists.
- Use `getBy` for immediate presence, `queryBy` for absence, and `findBy` for awaited appearance. Prefer user-event interactions that reflect user behavior.
- Avoid asserting component internals, hook state, private methods, or DOM structure unrelated to the user contract.

## Playwright

- Use role, label, text, or explicit stable contract locators; rely on actionability and web-first assertions rather than manual polling or sleeps.
- Keep browser contexts isolated, authenticate through supported setup/storage-state patterns without sharing mutable accounts, and trace the first retry or failures.
- Use projects for supported browsers/devices and shard only after measuring duration. Keep a small set of true user journeys.

## Cypress

- Preserve test isolation and create state through controlled APIs/tasks. Do not make tests depend on prior tests.
- Chain retryable queries and assertions; remember non-query commands execute once. Avoid fixed waits and conditional logic derived from unstable DOM snapshots.
- Use stable semantic selectors or explicit test contracts when accessible queries are unavailable.

## Vitest and Jest

- Follow the repository's module, environment, setup, worker, and fake-timer configuration. Restore mocks and timers after every test.
- Use fake timers only when the behavior can be advanced faithfully; flush pending work and test real timer integration when scheduler semantics matter.
- Isolate process globals, module caches, environment variables, ports, files, and databases under parallel workers.

## pytest

- Keep fixture scope no broader than the state it owns; use `yield`/finalizers for cleanup and avoid autouse fixtures that hide scenario dependencies.
- Use parametrization for meaningful behavior matrices, not unreadable Cartesian products. Mark integration or slow tests according to repository policy.
- Control temporary paths, environment, clock, randomness, database transactions, and async loop ownership under parallel execution.

## Pact and schema tools

- Keep consumer contracts minimal and provider states explicit. Verify each provider version against published contracts before deploy and remove stale consumers deliberately.
- Pin the OpenAPI, GraphQL, JSON Schema, protobuf, or event-schema version supported by project tooling. Validate semantic behavior beyond structural conformance.

## Testcontainers or equivalent

- Use when real database, broker, cache, or service semantics are material and the project already supports containerized tests.
- Pin images, await semantic readiness, isolate networks/data, capture service logs, and clean up. Do not enable experimental reuse in CI without explicit project policy.

## k6 or an existing load tool

- Encode workload and pass/fail thresholds from SLOs; separate setup from measured work and use representative data distribution.
- Keep high-load execution on an authorized target with monitoring, capacity, abort thresholds, and cleanup.

## Toxiproxy or an existing fault tool

- Inject named network faults deterministically around a real client/server boundary and remove every toxic during cleanup.
- Assert bounded retries, timeouts, degradation, data correctness, and recovery rather than only observing errors.
