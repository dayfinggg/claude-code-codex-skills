---
name: mongodb
description: "Design, implement, review, debug, test, migrate, secure, and operate MongoDB-backed systems. Use for workload-driven document schemas, embedding and references, validation, indexes and explain plans, aggregation, atomic updates and transactions, read and write concerns, retries, replica sets, sharding and shard keys, change streams, drivers and connection pools, multi-tenancy, encryption, backup, performance, and MongoDB production incidents in any language or framework."
---

# MongoDB Engineering

Model from the application's reads, writes, invariants, growth, and failure requirements. Treat document shape, indexes, consistency, topology, and driver behavior as one design rather than independent tuning choices.

## Apply the workflow

1. Inspect the actual system.
   - Read repository guidance, manifests, lockfiles, driver configuration, model or ODM definitions, validators, migrations, queries, aggregations, indexes, tests, dashboards, and runbooks.
   - Identify server version, feature compatibility version, exact driver and ODM versions, deployment topology, managed service tier and restrictions, regions, read preference, read and write concerns, retry settings, authentication, TLS, and encryption features.
   - Capture representative query shapes, sort and projection, update paths, batch size, document and array size distributions, cardinality, selectivity, growth rate, tenant distribution, latency SLO, throughput, and retention.
   - Trace each invariant and authoritative write through retries, transactions, events, caches, and downstream consumers. Do not infer guarantees from a framework default.
2. Design one workload slice at a time.
   - List the operations that must be fast, atomic, independently updated, independently secured, or independently retained.
   - Embed data that is read and changed together and remains predictably bounded. Reference data with independent lifecycle, high fan-out, unbounded growth, many-to-many ownership, or conflicting write contention.
   - Prefer a small amount of intentional duplication over hot-path joins only when an owner, propagation rule, staleness budget, repair path, and test exist.
   - Keep documents and arrays bounded well below the 16 MiB document limit; design pagination, bucketing, or child collections before growth becomes exceptional.
   - Apply schema validation to enforce durable invariants. Roll stricter validation through compatibility analysis, measurement, cleanup, and a reversible deployment.
   - Read [modeling and querying](references/modeling-and-querying.md) before changing schemas or indexes.
3. Design indexes from exact query shapes.
   - Inventory existing indexes and usage before adding one. Account for memory, cache pressure, write amplification, build time, replication, and migration overlap.
   - Use equality, sort, range as a starting heuristic, not a substitute for measurement. Consider selectivity, sort direction, multikey behavior, collation, partial filters, and projection.
   - Use unique indexes for enforceable uniqueness, including tenant scope. Use partial indexes for a defined subset and TTL indexes only for asynchronous retention cleanup.
   - Treat MongoDB Search indexes and vector-search indexes as separate product-specific structures with different consistency, analyzer, capacity, and operational behavior from database indexes.
   - Compare `explain()` plans on representative data and parameters. Inspect returned rows, keys and documents examined, sort or spill, fetch, execution time, and rejected alternatives; do not optimize from a plan name alone.
4. Make consistency and retries explicit.
   - Prefer a single-document atomic update when one document can own the invariant. Use conditional predicates and update operators instead of read-modify-write races.
   - Use a transaction only when a required invariant spans documents or collections. Keep it short, bounded, and free of parallel session operations and external side effects.
   - Retry the whole transaction according to the driver's documented labels. Treat an unknown commit result separately and make every external effect idempotent or outboxed.
   - Select read concern, write concern, read preference, and session or causal behavior as a coherent policy. State what stale reads, rollback, acknowledged loss, and read-your-writes behavior are acceptable.
   - Read [consistency and distribution](references/consistency-and-distribution.md) for transactions, replica sets, sharding, shard keys, and change streams.
5. Engineer queries and aggregations.
   - Push selective filters and index-supported sorts early. Project only needed fields, bound results, paginate with stable indexed cursors where large offsets would scan excessively, and cap user-controlled pipelines.
   - Examine `$lookup`, `$unwind`, grouping, window, regex, array, and in-memory sort cardinality. Verify spill and memory behavior on the target version.
   - Reject unbounded filters, sorts, batch sizes, arrays, and regular expressions at the application boundary. Apply server-side limits and cancellation where the driver supports them.
   - Keep aggregation semantics and output schemas covered by tests, especially null, missing, type conversion, timezone, collation, and duplicate-key cases.
6. Configure the driver deliberately.
   - Reuse one long-lived client per distinct cluster and credential context. Let the driver manage pools; do not create a client per request.
   - Bound server selection, connect, socket, wait-queue, transaction, and total request time. Propagate cancellation and close cursors, sessions, and change streams.
   - Size pools from measured concurrency and service capacity. Cap wait queues or caller concurrency instead of hiding saturation behind unbounded waiting.
   - Classify retryable reads and writes from exact driver/server support. Never blindly retry multi-document application workflows.
7. Design topology and tenant isolation.
   - Connect through the replica-set seed list, SRV record, or `mongos` routers appropriate to the deployment; do not bypass routers to address a shard directly.
   - Choose a shard key from cardinality, frequency, monotonicity, routing, zone, and growth evidence. Test hot partitions, scatter-gather queries, jumbo ranges, resharding, and tenant imbalance before rollout.
   - Put tenant identity in every shared query, unique index, cache key, event, and authorization check. Prefer database-per-tenant when isolation or lifecycle justifies its operational cost; avoid collection-per-tenant sprawl.
8. Implement a compatible migration.
   - Prefer expand-migrate-contract: deploy readers that tolerate old and new shapes, start compatible writes, backfill idempotently in bounded batches, verify, then remove old paths.
   - Avoid application start-up migrations, irreversible in-place rewrites, unthrottled collection scans, and simultaneous index/schema cutovers.
   - Include resumable checkpoints, rate limits, replication and storage headroom, change handling during backfill, telemetry, abort conditions, and rollback.
9. Verify from cheapest to most representative.
   - Unit-test query construction, tenant scope, validators, serialization, update predicates, pagination cursors, retry classification, and migration transforms.
   - Integration-test against the relevant MongoDB version and topology. Use a replica set for transactions and change streams; use sharding when shard routing or resharding is material.
   - Test duplicate requests, concurrent updates, stale reads, unknown commit results, primary stepdown, pool exhaustion, timeouts, partial migration, change-stream resume, and malformed legacy documents.
   - Validate security, backup, restore, performance, and observability using [operations, security, and testing](references/operations-security-testing.md).
10. Report evidence and residual risk.
    - State inspected versions and topology, workload and growth assumptions, schema and index choices, consistency guarantees, retry and failure behavior, tests and plans observed, migration and rollback, recovery evidence, and anything not verified.

## Enforce production guardrails

- Never drop a database, collection, index, user, shard, chunk, backup, or encryption key; run broad updates or deletes; initiate failover, resharding, restore, or compatibility changes; or enable profiling on a shared system without explicit authorization and a verified target.
- Never assume an ODM schema is database validation, a replica is a backup, majority writes guarantee every read sees them, retries imply exactly once, TTL deletion happens at the deadline, or a successful timeout means no write occurred.
- Never create an index from a generic rule without exact query shapes, representative `explain()` evidence, write-cost analysis, and a deployment plan.
- Never use unbounded arrays, documents, result sets, `$lookup` fan-out, regex, sort, migration batches, or per-request clients.
- Never let tenant scope depend on callers remembering a filter. Centralize it, enforce compound uniqueness, test denial, and use separate credentials or databases when the risk requires stronger isolation.
- Never copy version-sensitive syntax or defaults from rolling documentation without verifying server, feature compatibility version, driver, ODM, and provider support.

## Load references selectively

- Use [modeling and querying](references/modeling-and-querying.md) for workload-first schemas, embedding, references, validation, indexes, explain plans, aggregation, and anti-patterns.
- Use [consistency and distribution](references/consistency-and-distribution.md) for atomicity, transactions, concerns, retries, replica sets, sharding, shard keys, and change streams.
- Use [operations, security, and testing](references/operations-security-testing.md) for clients, pools, timeouts, multi-tenancy, access control, encryption, observability, backups, migrations, and verification.
- Use [authoritative sources](references/sources.md) to verify version-sensitive behavior. Pin the exact manual, driver, feature compatibility version, topology, and managed-service documentation before implementation.
