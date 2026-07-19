# Consistency and distribution

## Choose an atomicity boundary

| Mechanism | Use for | Required caveat |
| --- | --- | --- |
| Single-document update | Most invariants owned by one aggregate | Include current state or version in the predicate to prevent lost updates |
| Unique index | Durable uniqueness | Scope tenant and collation correctly; prepare conflicting data before build |
| Transaction | Invariant spanning documents or collections | Requires replica set or sharded cluster; keep short and retry as a unit |
| Outbox in transaction | Durable state plus later external delivery | Consumer remains at-least-once and must be idempotent |
| Compensating workflow | Long-running cross-service change | Define irreversible steps, reconciliation, and operator recovery |

- Do not perform network calls or irreversible external effects inside a transaction callback.
- Do not run parallel operations on one session. Propagate the session to every intended database operation and nowhere else.
- Handle transient transaction errors by retrying the entire transaction. Handle unknown commit results by retrying commit according to the driver; never rerun external effects blindly.
- Keep transaction working sets and duration bounded to reduce write conflicts, cache pressure, lock retention, and aborts.

## Compose consistency deliberately

- Write concern defines acknowledgement evidence; read concern defines the visibility guarantee; read preference selects eligible members. Configure and document them together.
- Use primary reads when stale reads would violate behavior. Use secondary reads only with explicit lag and rollback tolerance.
- Use majority semantics where rollback visibility matters, but verify topology and journaling details and acknowledge the latency/availability tradeoff.
- Use sessions and causal consistency when ordered read-your-writes behavior is required across operations. For durable full causal guarantees, pair causal sessions with `readConcern: "majority"` and `writeConcern: { w: "majority" }`; weaker concerns can provide only rollback-tolerant behavior and may lose read-own-writes or monotonic guarantees after topology changes. Keep session ownership explicit and state the selected concern matrix.
- Treat timeouts and network errors after dispatch as unknown outcomes. Reconcile by stable operation ID, version, unique key, or current state.
- Retryable writes cover only supported acknowledged single-document operation forms. Application workflows still require idempotency.

## Design a shard key from traffic

1. List the query shapes that must be targeted and the write paths that drive growth.
2. Measure candidate cardinality, value frequency, monotonicity, tenant skew, zone needs, and compound-prefix targeting.
3. Simulate common, worst-case, and single-tenant traffic. Check scatter-gather reads, hot chunks, hot shards, jumbo ranges, and balancing cost.
4. Decide ranged versus hashed distribution from routing and locality needs; hashing distributes monotonic values but weakens range targeting.
5. Include the shard key in update/delete targeting and uniqueness designs as required by the target version.
6. Plan index build, data movement, resharding, abort, and rollback with capacity and application compatibility.

## Respect topology behavior

- Use replica sets for redundancy, elections, transactions, and change streams. Test primary stepdown and client rediscovery rather than assuming transparent failover.
- Use `mongos` for sharded application traffic. Direct shard access bypasses routing and can produce incomplete or incorrect behavior.
- Budget for asynchronous replication, elections, rollback windows, maintenance, region latency, and degraded-member behavior.
- Keep feature compatibility version changes separate from binary rollout and verify driver/ODM support before using newer features.

## Consume change streams safely

- Run on a replica set or sharded cluster and preserve the resume token with the same pipeline/options needed to resume.
- Treat delivery and side effects as at least once. Deduplicate with event identity or an idempotent domain transition.
- Persist the resume checkpoint only after the intended durable side effect, or atomically with it when the architecture permits.
- Handle invalidate, history loss, topology change, network timeout, slow consumer, and application restart explicitly. Define a full-resync path when resume is impossible.
- Bound and monitor open streams, lag, batch size, processing time, resume attempts, and pool usage; an open stream can occupy connection resources.
- Do not use change streams as a substitute for an auditable immutable event log when long retention and replay are product requirements.
