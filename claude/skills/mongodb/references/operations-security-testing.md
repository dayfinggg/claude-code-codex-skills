# Operations, security, and testing

## Configure clients and pools

- Create one reusable client per cluster and credential context during application startup; close it during controlled shutdown.
- Bound `serverSelection`, connection, socket, wait-queue, transaction, cursor, and total request time using the exact driver's supported controls.
- Size `maxPoolSize`, minimum connections, and concurrent establishment from measured request concurrency, transaction/cursor duration, server limits, and failover behavior.
- Expose pool checkout time, waiters, created/closed connections, server selection failures, command latency, retries, and cancellations.
- Close cursors, sessions, and change streams deterministically. Avoid loading complete collections or aggregation results into memory.
- Separate transient topology/network errors, write conflicts, duplicate keys, validation errors, authorization failures, and bad queries in retry and user-facing behavior.

## Secure every boundary

- Enable authentication and authorization for self-managed deployments; use separate least-privilege roles for applications, migrations, monitoring, backups, and administration.
- Require TLS with certificate verification wherever traffic is not otherwise trusted. Test certificate and credential rotation.
- Keep credentials and encryption keys in approved secret/key management, never in source, logs, dumps, query comments, or diagnostic exports.
- Encrypt storage and backups; use client-side field or queryable encryption only after verifying query limitations, key lifecycle, recovery, and performance on the exact version/provider.
- Redact sensitive command, profiler, audit, and application logs. Treat profiler and diagnostic data as production data with access and retention controls.
- Enforce tenant scope centrally, include it in compound uniqueness and shard routing where appropriate, and test malicious cross-tenant IDs and aggregation pipelines.

## Observe symptoms and causes

- Monitor user latency and error SLOs plus query latency, keys/documents examined, scans, sorts/spills, cache pressure, page faults, CPU, disk, connections, wait queues, tickets, replication lag, oplog window, elections, chunk balance, and backup status.
- Use profiler or increased diagnostic verbosity only with bounded duration, access control, overhead review, and explicit approval on shared systems.
- Correlate slow operations with exact query shape, comments or trace IDs, plan, parameters, data distribution, pool wait, topology events, and resource pressure.
- Alert on saturation trends and recovery capability, not isolated average latency.

## Test by risk and topology

| Scope | Required evidence when relevant |
| --- | --- |
| Unit | Serialization, validators, tenant filters, conditional updates, pagination cursors, retry labels, migration transforms |
| Integration | Exact driver/server compatibility, indexes, explain shape, collation, aggregation edge cases, auth/TLS, cancellation |
| Concurrency | Lost-update prevention, duplicate keys, write conflicts, transaction retry, idempotent requests, unknown commit |
| Topology | Primary stepdown, replica lag, server selection, pool exhaustion, sharded routing, hot shard, resharding behavior |
| Change stream | Resume token, duplicate event, restart, invalidation/history loss, slow consumer, checkpoint and resync |
| Security | Least-privilege denial, cross-tenant denial, injection or operator allowlist, redaction, rotation, encrypted backup recovery |
| Migration | Mixed old/new application versions, resume, partial batch, rollback, throttling, validation and reconciliation |

## Back up and restore

- Select backup technology compatible with replica sets, sharding, transactions, encryption, provider, scale, RPO, and RTO. Logical dumps are not automatically a consistent large-cluster backup strategy.
- Protect backup credentials, encryption keys, retention, immutability, and deletion permissions independently from the primary cluster.
- Perform recurring isolated restore drills. Verify indexes, users and roles, validation, encryption keys, point-in-time target, application reads, counts, invariants, and measured recovery time.
- Monitor backup completion and restoreability; a green job without a tested restore is insufficient evidence.

## Migrate without hidden downtime

- Use expand-migrate-contract with mixed-version compatibility and explicit feature flags or cutover controls.
- Backfill by stable `_id` or another indexed checkpoint in bounded idempotent batches. Throttle against replication lag, latency, disk, cache, and pool pressure.
- Capture concurrent writes with dual-write, change stream, or a repeat reconciliation pass; state the consistency gaps of the chosen method.
- Build indexes with the target version's supported online behavior and enough temporary disk/memory/replication capacity.
- Define preflight, progress, abort, rollback, cleanup, and post-deploy validation before starting.
