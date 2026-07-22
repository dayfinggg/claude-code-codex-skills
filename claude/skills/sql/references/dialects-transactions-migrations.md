# Dialects, transactions, and migrations

## Separate the standard from implementation

- Use ISO SQL to name portable concepts, not to assert that a vendor implements a feature or the same semantics.
- Record engine, version, edition, compatibility level, extensions, storage engine, managed-service restrictions, driver, ORM/query builder, migration tool, replication, and topology.
- Verify identifier rules, parameters, types, collations, time zones, JSON, generated columns, constraints, transactions, DDL locks, online operations, optimizer, and backup behavior in versioned vendor docs.
- For warehouses, verify whether constraints are enforced, informational, or used by the optimizer. Incorrect informational keys can produce incorrect plans/results.

## Keep integrity and access control distinct

| Mechanism | Primary purpose | Required verification |
| --- | --- | --- |
| PK/unique | Identity or uniqueness | Null/collation semantics, tenant scope, concurrent insert |
| FK | Referential integrity | Enforcement, deferral, cascade, bulk-load behavior |
| Check/`NOT NULL` | Row/domain invariant | Existing-row validation and expression semantics |
| Exclusion/temporal equivalent | Non-overlap or advanced invariant | Engine/version support and concurrent writes |
| RLS/policy/view | Authorization/visibility | Owner/bypass roles, policy combination, definer/invoker context, tenant denial |

Do not describe RLS as a data constraint. Database owners, superusers, security-definer functions, or engine-specific bypass roles can circumvent policies. Use least-privilege application roles and malicious cross-tenant tests.

## Retry whole transactions

1. Classify retryable error codes using the exact engine, driver, and version. Do not retry generic failures.
2. Roll back and release the failed transaction/session state completely.
3. Re-run every read, decision, and write from the transaction boundary; stale values from the failed attempt cannot be reused safely.
4. Bound attempts by a total deadline and use backoff with jitter to avoid synchronized contention.
5. Defer external calls/events until commit or use an outbox/idempotency design. Treat an unknown commit result as reconciliation, not blind replay.

Deadlock, serialization, lock-timeout, and optimistic-conflict behavior differs across PostgreSQL, InnoDB, SQL Server, Oracle, SQLite, and warehouses.

## Make previews race-safe

- A standalone `SELECT` preview can be invalid before the later write. Use the same transaction and required isolation/locks, or atomically predicate the write on expected primary keys, version, checksum, or row count.
- Return/capture exact affected keys where supported and abort when the count or version differs from the approved expectation.
- Keep broad repairs bounded and resumable; record checkpoint, before/after counts, invariant queries, and representative samples without exposing sensitive data.
- Never substitute `LIMIT` without deterministic ordering and a stable checkpoint for a safe batch design.

## Stage live constraints by invariant

- Expand the schema compatibly, block new invalid writes through the engine's supported mechanism, repair old rows, validate existing data, update applications, and contract only after mixed-version compatibility ends.
- PostgreSQL `NOT VALID` constraints can enforce later inserts/updates while deferring the old-row scan; other engines and constraint types differ.
- Separate data backfill from lock-heavy DDL when it improves control. Rate-limit batches and monitor latency, locks, log/WAL growth, replicas, storage, and autovacuum/statistics effects.
- Do not hide drift with unconditional `IF EXISTS`/`IF NOT EXISTS`; follow migration-tool policy and fail on unexpected schema state.

## Define rollback honestly

- Use a down migration only when the semantic inverse preserves required data and has been executed against representative state.
- For destructive or lossy transforms, require a tested backup/restore, retained old representation, or forward-fix path. Label the irreversible point and abort criteria.
- Match backup consistency to topology and transaction requirements; a replica or successful backup job is not restore evidence.
- Rehearse restore into isolation and verify schema, roles, constraints/indexes, data invariants, application reads, RPO, and RTO.

## Measure plans without harming production

- Use representative binds and distribution. Distinguish estimated from actual plans; execution-capable plan commands can run the query and mutate data.
- Inspect rows, loops, estimates, scan/seek, join, sort/spill, memory, partition pruning, remote exchange, lock time, and cache state as supported.
- Compare before/after under equivalent conditions and include write/storage/maintenance cost of new indexes.
- Never run an unbounded actual plan, full scan, index build, or profiler on a shared target without authorization and an impact bound.
