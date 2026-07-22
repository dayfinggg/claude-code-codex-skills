---
name: redis
description: Engineer Redis keys, TTLs, data structures, atomic commands, scripts, transactions, persistence, replication, Cluster, and clients. Use when correctness depends on Redis semantics; not for SQL, MongoDB, or a generic cache abstraction.
---

# Redis Engineering

## Inspect the deployed system

Treat Redis as a networked stateful system, not a faster map. Identify the exact server and client versions, managed-service restrictions, standalone, Sentinel, or Cluster topology, persistence, replicas, failover, modules, TLS, and ACL configuration. Inspect key helpers, serialization, call sites, retries, tests, dashboards, and runbooks. Quantify peak operations, key count, value and collection sizes, memory budget, hot-key risk, latency target, and recovery objectives instead of copying generic limits.

Read [roles and data modeling](references/roles-and-data-modeling.md) for native types, key shape, TTLs, invalidation, stampede control, and boundedness. Read [correctness and distribution](references/correctness-and-distribution.md) for atomicity, replication, Sentinel, Cluster, locks, Streams, Pub/Sub, and delivery. Use [operations, security, and testing](references/operations-security-testing.md) for clients, memory, ACLs, TLS, migration, recovery, and production checks. Verify exact server, client, topology, and provider behavior with [authoritative sources](references/sources.md).

## Define role and lifecycle

State whether Redis is a disposable cache, session store, limiter, queue or stream, coordination aid, derived index, or authoritative store. Name the system of record and justify durability and recovery if Redis is authoritative. Define per-operation behavior during timeout or outage: fail open, fail closed, serve stale, shed load, or use a fallback. Security controls normally fail closed; optional caches should normally degrade without taking down the product.

Use a stable namespace that includes service, environment, tenant, entity, version, and identifier as applicable. Escape or hash untrusted components and keep secrets and personal data out of key names. Bound cardinality, value size, collection length, and per-tenant use, including allocator, replication, persistence, and fragmentation overhead.

Choose the smallest native data type matching the access pattern. Define TTL owner, refresh, jitter, invalidation, delete path, negative-cache lifetime, and recomputation behavior. Remember that expiry is asynchronous cleanup, not an exact deadline. Use Cluster hash tags only for a required multi-key atomic operation and avoid concentrating unrelated traffic in one slot.

## Specify atomicity and failure

Distinguish single-command atomicity, optimistic transactions, scripts or functions, pipelining, replication acknowledgement, and application idempotency. Pipelining is not a transaction, Redis transactions do not roll back partial command errors, and acknowledgement does not prove survival through failover.

Keep `MULTI`/`EXEC`, Lua, and Functions short, deterministic, and bounded. Retry reads and proven-idempotent writes only within a deadline. Use operation identifiers, deduplication, or conditional state transitions where duplicate execution matters. Treat timeout after a write as an unknown result until reconciled; never silently replay a non-idempotent command.

Do not treat a lease as proof of current ownership after pauses, partitions, or expiry. Prefer an authoritative database constraint, queue, or consensus system for critical exclusion. Where a Redis lease is appropriate, use a unique token, conditional release, bounded work, renewal policy, fencing token, and authoritative fenced write.

For Streams, define consumer-group ownership, pending-entry recovery, duplicate handling, ordering scope, acknowledgement point, trimming, poison messages, lag, and replay. Pub/Sub is ephemeral; do not use it when disconnected consumers must recover messages.

## Match client and topology

Reuse long-lived clients and follow their documented pooling or multiplexing model. Reserve connections for blocking commands, subscriptions, or stateful operations where required. Bound connect, command, blocking, queue, and total time; propagate cancellation, cap queued work, apply deadline-bounded backoff with jitter, and expose reconnect and failover behavior.

For Sentinel, account for asynchronous replication and possible acknowledged-write loss during failover. For Cluster, support slot discovery, `MOVED`, `ASK`, resharding, hash-slot constraints, and partial availability; do not issue arbitrary multi-key operations across slots. Verify provider command, module, backup, maintenance, persistence, and networking restrictions before implementation.

## Migrate and validate

Preserve existing serialization and key contracts unless the request includes migration. Use versioned keys or dual read/write only with bounded duration, telemetry, rollback, and cleanup. Validate key construction, serialization, TTL calculation, limits, fallback, retries, duplicate delivery, unknown writes, saturation, eviction, stale data, and degraded Redis behavior with project-native tests. Use an integration environment matching the material version and topology for expiry, atomicity, reconnect, failover, scripts, Streams recovery, or slots.

Never use `KEYS` on an unbounded production keyspace or perform flushes, broad deletion, ACL or persistence mutation, failover, resharding, or restore without explicit authorization and a verified target. Never expose Redis publicly; use network isolation, least-privilege authenticated users, and TLS across untrusted transport.
