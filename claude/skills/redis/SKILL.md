---
name: redis
description: "Design, implement, review, debug, test, migrate, secure, and operate Redis-backed systems. Use for caches, sessions, rate limits, counters, queues, Streams, coordination, distributed locks, key and TTL design, transactions or functions, persistence, replication, Sentinel, Cluster, client behavior, latency, memory, ACLs, TLS, and Redis production incidents in any language or framework."
---

# Redis Engineering

Treat Redis as a networked, stateful system with explicit failure semantics, not as a faster map. Match every design to the inspected server, topology, provider, client, workload, and acceptable loss, duplication, staleness, and outage behavior.

## Apply the workflow

1. Inspect before proposing changes.
   - Read repository guidance, manifests, lockfiles, configuration, deployment files, schema or key helpers, call sites, tests, dashboards, and runbooks.
   - Identify the Redis server version, managed service and restrictions, deployment mode, persistence, replicas, failover mechanism, TLS and ACL setup, and exact client version.
   - Trace ownership from request to key: producer, consumers, authoritative source, serialization, TTL, invalidation, retry, cleanup, and observability.
   - Quantify peak operations, key count, value and collection sizes, memory budget, hot-key risk, latency SLO, and recovery objectives. Do not invent missing capacity numbers.
2. Select Redis's role and failure policy.
   - State whether Redis is a cache, disposable accelerator, session store, limiter, queue or stream, coordination aid, derived index, or authoritative store.
   - Name the system of record. If Redis is authoritative, justify durability, recovery, consistency, and operational ownership explicitly.
   - Define fail-open, fail-closed, stale-serving, shedding, or fallback behavior per operation. Security controls normally fail closed; optional caches normally degrade without taking the product down.
   - Read [roles and data modeling](references/roles-and-data-modeling.md) before choosing a data type or lifecycle.
3. Define keys and lifecycle.
   - Use a documented namespace such as `<service>:<environment>:<tenant>:<entity>:<version>:<id>`; escape or hash untrusted components and avoid secrets or personal data in key names.
   - Bound key cardinality, value size, collection length, and per-tenant consumption. Account for key, object, allocator, replication, persistence, and fragmentation overhead rather than payload bytes alone.
   - Use Cluster hash tags only for a known multi-key atomicity requirement; avoid concentrating unrelated traffic in one slot.
   - Choose the smallest native data type that supports the access pattern. Avoid opaque blobs when partial updates, expiry, or inspection matter.
   - Specify TTL ownership, refresh policy, jitter, invalidation event, delete path, negative-cache duration, and behavior during recomputation. Never add an unbounded cache entry by accident.
4. Make correctness explicit.
   - Distinguish command atomicity, optimistic transactions, server-side functions or scripts, pipelining, replication acknowledgement, and application-level idempotency. Pipelining is not a transaction.
   - Keep `MULTI`/`EXEC`, Lua, and Functions short and bounded. Treat validation, retry, partial external effects, and Redis's lack of transaction rollback as application concerns.
   - Design retries from operation semantics. Retry reads and proven-idempotent writes only within a deadline; use tokens, deduplication, or conditional state transitions where duplicates matter.
   - Do not present a lease as proof of current ownership after pauses, partitions, or expiry. Prefer database constraints, queues, or consensus for critical exclusion; otherwise use unique tokens, conditional release, bounded work, fencing tokens, and an authoritative fenced write.
   - Read [correctness and distribution](references/correctness-and-distribution.md) for failure windows, Streams, Sentinel, Cluster, and locks.
5. Configure the client deliberately.
   - Reuse long-lived clients. Bound connect, command, blocking, queue, and total operation time; include cancellation and cleanup.
   - Use the client's documented pooling or multiplexing model. Reserve dedicated connections for blocking commands, subscriptions, and stateful operations when required.
   - Cap queued work and concurrency. Apply exponential backoff with jitter within a deadline and distinguish transient topology errors from permanent command, authentication, and validation errors.
   - Make reconnect and failover behavior observable. Do not silently replay non-idempotent commands after an unknown result.
6. Design for the deployed topology.
   - For standalone or Sentinel, account for asynchronous replication and acknowledged-write loss during failover.
   - For Cluster, support slot discovery, `MOVED` and `ASK`, resharding, hash-slot constraints, and partial availability. Do not send arbitrary multi-key operations across slots.
   - Verify provider-specific command, module, persistence, backup, networking, maintenance, and failover constraints before using them.
7. Implement the smallest compatible change.
   - Preserve existing serialization, key contracts, client abstractions, metrics, and error behavior unless a migration is part of the request.
   - Use versioned keys or dual-read/dual-write only with a bounded migration, telemetry, rollback, and cleanup plan.
   - Avoid new wrappers or dependencies unless the existing client cannot express the required safety property.
8. Verify from cheapest to most representative.
   - Run focused unit tests for key construction, serialization, TTL calculation, limits, retry classification, and fallback behavior.
   - Run integration tests against the relevant Redis version and topology for expiry, atomicity, reconnection, failover, scripts or functions, Streams recovery, and Cluster slot behavior.
   - Exercise duplicate delivery, unknown write result, timeout, client saturation, stale data, eviction, replica lag, process restart, and degraded dependency paths where material.
   - Check latency, throughput, memory growth, hot keys, big keys, slow commands, error rates, connection counts, evictions, rejected connections, persistence health, and replication health.
   - Read [operations, security, and testing](references/operations-security-testing.md) before production-affecting work.
9. Report evidence and residual risk.
   - State the inspected versions and topology, role of Redis, authoritative source, guarantees, failure policy, tests run, operational signals, migration or rollback path, and anything not verified.

## Enforce production guardrails

- Never run or recommend `FLUSHALL`, `FLUSHDB`, broad deletion, `CONFIG SET`, ACL mutation, failover, resharding, restore, or persistence changes against shared or production systems without explicit authorization and a verified target.
- Never use `KEYS` on an unbounded production keyspace. Use cursor-based `SCAN` for diagnosis and redesign application paths that require global scans.
- Never assume persistence is a backup, a replica is a backup, an acknowledged write survives failover, an expired key is reclaimed immediately, or a successful timeout means the write did not happen.
- Never cache authorization decisions, secrets, or tenant data without explicit scope, invalidation, isolation, encryption, and fail-closed behavior.
- Never expose Redis directly to the public internet. Require network isolation, authenticated least-privilege users, TLS where traffic is not otherwise trusted, secret rotation, and audited administrative access.
- Never copy generic limits blindly. Derive timeouts, pool sizes, TTLs, retry counts, stream retention, and memory policies from the workload and deployment.

## Load references selectively

- Use [roles and data modeling](references/roles-and-data-modeling.md) for role selection, native types, key shape, TTLs, invalidation, stampede control, and boundedness.
- Use [correctness and distribution](references/correctness-and-distribution.md) for atomicity, durability, replication, Sentinel, Cluster, locks, Streams, Pub/Sub, and delivery semantics.
- Use [operations, security, and testing](references/operations-security-testing.md) for clients, retries, latency, memory, observability, ACLs, TLS, migrations, recovery, and test coverage.
- Use [authoritative sources](references/sources.md) to verify version-sensitive behavior. Pin the exact server, client, topology, and managed-service documentation before implementation.
