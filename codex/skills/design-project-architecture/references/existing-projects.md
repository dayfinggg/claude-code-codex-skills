# Existing-project evolution

1. Describe the implemented architecture, including dependency and data graphs, runtime and deployment behavior, operational evidence, and actual team ownership. Do not infer it from folders alone.
2. Locate a costly boundary through change history, incidents, coordinated releases, failures, slow feedback, owner ambiguity, or a measurable scenario that the current system misses.
3. Protect current behavior with the narrowest useful characterization, contract, integration, or end-to-end test. Confirm the source of truth, migration and rollback constraints, and accountable owner before moving data or contracts.
4. Define one seam and one reversible increment. Route new behavior through it, migrate a bounded responsibility and its owned data, measure the selected scenarios, and validate the rollback path before proceeding.
5. Treat dual writes, compatibility layers, shared stores, and temporary cross-boundary dependencies as transitions. Give each an owner, consistency strategy, observability, reconciliation plan, removal criterion, and date or event for review.
6. Remove obsolete code, contracts, flags, data, tests, and documentation only after consumers have migrated and evidence shows the old path is unused.

Pause at an irreversible contract, data, security, availability, deployment, or ownership choice when its driver remains unknown. Prefer an instrumented experiment, adapter, or staged migration until it is known. Follow [architecture validation](architecture-validation.md) for evidence and the data/distributed checklist.
