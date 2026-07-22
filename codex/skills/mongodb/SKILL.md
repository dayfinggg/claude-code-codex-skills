---
name: mongodb
description: Engineer MongoDB schemas, validation, queries, indexes, atomic updates, transactions, topology, drivers, and migrations. Use when correctness depends on MongoDB semantics; not for SQL, Redis, or generic document transport.
---

# MongoDB Engineering

## Inspect MongoDB as deployed

Model from real reads, writes, invariants, growth, and failure requirements. Identify the exact server version, feature compatibility version, driver and ODM versions, topology, managed-service tier and restrictions, regions, read preference, read and write concerns, retry settings, authentication, TLS, and encryption features. Inspect model definitions, database validators, query and update shapes, aggregations, indexes, migrations, tests, and operational configuration; do not infer guarantees from ODM defaults.

Read [modeling and querying](references/modeling-and-querying.md) for document boundaries, validation, indexes, plans, aggregation, and anti-patterns. Read [consistency and distribution](references/consistency-and-distribution.md) for transactions, concerns, retries, replica sets, sharding, and change streams. Use [operations, security, and testing](references/operations-security-testing.md) for clients, pools, timeouts, isolation, backup, migration, and production checks. Pin server, driver, topology, and provider behavior through [authoritative sources](references/sources.md).

## Shape documents around ownership

Embed data read and changed together when its growth is predictably bounded. Reference data with an independent lifecycle, high fan-out, unbounded growth, many-to-many ownership, or conflicting write contention. Permit intentional duplication only with a source of truth, propagation rule, staleness budget, repair path, and tests.

Keep documents and arrays bounded below the server limit; introduce pagination, bucketing, or child collections before exceptional growth. Enforce durable shape and invariants with database validation, not only an ODM schema. Roll stricter validation through compatibility measurement, repair, and reversible deployment. Put tenant identity into every shared query, compound unique index, cache key, event, and authorization boundary.

## Design queries and indexes together

Capture exact filters, sorts, projections, cardinality, selectivity, data distribution, array behavior, collation, and representative parameters. Inventory existing indexes and usage before adding one. Account for cache pressure, write amplification, build time, replication, migration overlap, multikey rules, partial filters, and uniqueness scope.

Compare `explain()` results on representative data. Inspect returned rows, keys and documents examined, fetches, sorts or spills, execution time, and rejected alternatives rather than optimizing from a plan name. Bound result sets, batch sizes, pipeline stages, `$lookup` fan-out, `$unwind`, grouping, regex work, and user-controlled filters. Prefer stable indexed cursor pagination over large offsets.

## Make atomicity and failure explicit

Prefer a single-document atomic update when one document can own the invariant. Use conditional predicates and update operators instead of read-modify-write races. Use a transaction only for an invariant that truly spans documents or collections; keep it short, bounded, serial within the session, and free of external side effects.

Retry the complete transaction only according to documented driver labels. Handle unknown commit results separately, and make external effects idempotent or outboxed. Select read concern, write concern, read preference, and causal/session behavior as one policy; state permitted staleness, rollback, acknowledged loss, and read-your-writes behavior. Never equate retry support with exactly-once execution or assume a timed-out write did not occur.

Reuse a long-lived client per cluster and credential context. Bound server selection, connect, socket, wait-queue, transaction, and total request time; propagate cancellation and close cursors, sessions, and change streams. Size pools from measured concurrency and cap caller pressure rather than hiding saturation behind unbounded queues.

For sharding, choose keys from routing frequency, cardinality, monotonicity, zones, growth, and tenant distribution. Test hot partitions, scatter-gather, jumbo ranges, and resharding implications. Connect through supported routers or discovery rather than addressing shards directly. Define change-stream resume, duplicate handling, invalidation, lag, and retention failure behavior.

## Migrate and validate

Prefer expand-migrate-contract: deploy readers tolerant of old and new shapes, make writes compatible, backfill idempotently in bounded resumable batches, verify, then retire old paths. Include throttling, replication and storage headroom, concurrent-change handling, telemetry, abort conditions, rollback, and cleanup.

Run project-native unit tests for query construction, tenant scope, validation, update predicates, cursors, retries, and transforms. Use the relevant MongoDB version and topology for integration tests; use a replica set for transactions or change streams and sharding when routing matters. Exercise concurrent updates, duplicate requests, stale reads, unknown commit outcomes, stepdown, pool exhaustion, timeout, partial migration, and malformed legacy documents. Never perform broad writes or deletes, index drops, failover, restore, resharding, or profiling on a shared system without explicit authorization and a verified target.
