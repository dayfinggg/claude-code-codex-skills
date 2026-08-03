# Architecture validation

Validate a boundary against the drivers that selected it, not against a pattern name.

## Fitness functions

For every material scenario, define a signal, threshold, cadence, owner, and response to failure. Make the function proportionate to the risk and repetition:

- Record a reviewable decision, dependency map, or manual scenario walk-through for a low-risk, one-off choice.
- Run maintained architecture, import, API-compatibility, contract, schema, or deployment checks in CI for recurring structural risks.
- Exercise representative load, fault, security, backup-restore, reconciliation, and observability paths in a pipeline, scheduled environment, or production when failure has material consequences.

Reject a check that cannot change a decision or detect a relevant regression. Keep evidence with the decision and recalibrate thresholds after real operation changes the driver.

## Data and distributed boundaries

For each affected boundary, verify or record why it is not applicable:

- source of truth and owner;
- schema evolution and compatible readers or consumers;
- transaction scope and consistency expectations;
- derived data, freshness, and rebuild path;
- idempotency, retry limits, timeout behavior, and duplicate handling;
- reconciliation, observability, and manual recovery;
- retention, deletion, backup, restore, and rollback.

Trace representative work from entry point through policy, state, integrations, and observable outcome. Verify that an engineer can find the accountable team, permitted change location, contract, migration order, and rollback path without undocumented coordination. Test only the runtime, deployment, and team interaction paths affected by the decision, then record unresolved risks, assumptions, and removal conditions.
