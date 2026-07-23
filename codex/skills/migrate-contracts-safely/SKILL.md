---
name: migrate-contracts-safely
description: Evolve a live external or persisted contract, such as an API, database schema, event or message format, stored or configuration format, externally consumed interface, or production provider boundary, without breaking consumers or data. Use to design or implement a staged compatibility migration when old and new states must coexist, a schema or format migration transforms production data, or producers and consumers cannot change atomically. Do not use for private atomic refactors, greenfield contracts, one-off data repairs, go or no-go rollout reviews, or destructive production execution without explicit authorization.
---

# Migrate Contracts Safely

Use an expand-migrate-contract sequence so producers, consumers, and stored data can move independently without an unsafe flag day.

## Set the operating boundary

- Default to review or planning unless implementation is explicitly requested.
- Never execute a production migration, delete production data, remove a live contract, or perform a cutover without explicit authorization.
- Inventory producers, consumers, stored representations, supported versions, owners, deployment order, and the required compatibility window.
- Define the old and new invariants, failure semantics, observability signals, and rollback constraints.

## Expand

- Introduce the new contract in a backward-compatible form while preserving the old path.
- Version migration and backfill code with the application change that depends on it.
- Make data migration steps idempotent, restartable, observable, and safe under partial failure.
- Add adapters, feature controls, dual-read or dual-write paths only when the migration requires them.
- Define the exact evidence and state that permit every temporary mechanism to be removed.

## Migrate

- Move producers and consumers in small independently verifiable batches.
- Test old and new versions in mixed deployment states, including retries, duplicate delivery, partial failure, and rollback.
- For data changes, validate on production-like volume and distributions before production execution.
- Compare independent signals when shadowing, backfilling, dual-reading, or dual-writing.
- Monitor correctness, compatibility errors, latency, resource use, and migration progress.

## Cut over

- Define pass, pause, abort, rollback, and roll-forward criteria before starting the cutover.
- Prefer reversible traffic or feature-control changes over irreversible steps.
- Stop when observed behavior violates the predeclared thresholds.
- Confirm that every supported consumer and stored representation works on the new path before disabling the old one.

## Contract

- Remove the old contract only after usage evidence shows no remaining consumers and migrated data has been verified.
- Remove temporary flags, adapters, duplicate writes, compatibility branches, and obsolete tests in the same cleanup stage.
- Preserve audit evidence for material data transformations.
- Keep permanent version compatibility only when it is an explicit product requirement.

## Route related work

- Use `codebase-design` when the migration exposes a boundary or interface design problem.
- Use `tdd` to lock down concrete compatibility behavior before implementation.
- Use `review-production-readiness` when the migration materially affects capacity, failure modes, observability, or rollback.
- Use `to-tickets` only when the user requests independently scheduled work units.

## Completion standard

The migration is complete only when the new contract is verified in all supported mixed states, production execution has an explicit recovery path, old usage is proven absent, and temporary migration machinery is removed or has a documented removal condition.
