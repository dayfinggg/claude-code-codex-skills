# Operations, security, and testing

## Configure clients by failure budget

- Reuse a bounded number of long-lived clients. Follow the exact client's pooling or multiplexing model; more connections can increase server CPU, memory, and failover load.
- Set bounded connect, command, blocking, socket, queue, and total request deadlines. A socket timeout alone is not an end-to-end deadline.
- Give blocking commands, subscriptions, and stateful modes dedicated connections when multiplexing would starve unrelated work.
- Retry only classified transient failures and proven-idempotent operations. Use exponential backoff with jitter, cap attempts by a deadline, and expose exhausted retries.
- Bound offline queues and caller concurrency. Prefer load shedding or role-specific degradation to unbounded memory growth during an outage.
- Close clients gracefully and handle credentials, certificate, DNS, and topology rotation without process-wide storms.

## Diagnose latency and memory methodically

1. Establish intrinsic host latency, network latency, command latency, and end-to-end application latency separately.
2. Inspect latency events, `SLOWLOG`, command statistics, CPU, event-loop saturation, swap, transparent huge pages, disk fsync, fork or copy-on-write, network, and client queuing.
3. Use `SCAN` and bounded sampling for keyspace analysis. Inspect representative memory usage and encoding; do not run large blocking introspection on a hot primary.
4. Find big keys, hot keys, unbounded collections, expensive algebra, broad deletes, and long scripts. Delete large values incrementally or asynchronously when supported and safe.
5. Monitor used memory, RSS, fragmentation ratio, allocator and dataset bytes, evictions, expirations, hit rate, rejected connections, blocked clients, output buffers, replication lag, persistence status, and slot health.
6. Alert on user-visible symptoms and exhaustion trends, not a single generic hit-rate target.

## Secure the complete path

- Place Redis on private networks behind strict ingress and egress controls; never depend on protected mode as the only boundary.
- Use named ACL users with least-privilege command and key patterns. Separate application, monitoring, replication, Sentinel, backup, and administration identities.
- Require TLS for clients, replication, Cluster bus, and Sentinel wherever the network is not otherwise trusted; verify certificates and rotation behavior.
- Keep credentials in the repository's secret-management mechanism, never in source, key names, logs, metrics, or diagnostic captures.
- Review dangerous administrative, scripting, module, pub/sub, keyspace notification, and broad key permissions. Prefer ACLs over command renaming.
- Treat tenant identifiers as an authorization boundary in code and tests; Redis ACL key patterns can supplement but not replace application authorization.

## Test the guarantees, not only commands

| Scope | Required evidence when relevant |
| --- | --- |
| Unit | Key encoding, tenant scope, serialization compatibility, TTL and jitter bounds, retry classification, limiter math, fallback policy |
| Integration | Exact server/client compatibility, expiry, eviction response, atomic update, script/function errors, auth/TLS, cancellation and cleanup |
| Failure | Timeout before/after commit, reconnect, primary loss, replica lag, Sentinel failover, Cluster redirection/reshard, persistence restart |
| Delivery | Duplicate Stream message, abandoned pending entry, reclaim, poison handling, trim boundary, idempotent side effect and acknowledgement |
| Capacity | Representative value sizes, hot-key skew, big-key latency, connection/queue saturation, fork/AOF overhead, migration overlap |
| Security | Least-privilege denial, cross-tenant denial, credential rotation, certificate failure, redaction, administrative command denial |

## Migrate and recover safely

- Inventory producers and consumers before changing key schema, serializer, TTL, topology, or client. Preserve mixed-version compatibility through rollout.
- Use versioned namespaces, shadow reads, dual writes, or backfill only with metrics, bounded duration, replay safety, rollback, and eventual removal.
- Avoid mass expiry and mass backfill at one timestamp. Rate-limit work, add jitter, and verify memory headroom and persistence/failover impact.
- Back up independently, verify integrity, and perform a restore drill into an isolated target. Record RPO, RTO, credentials, modules, ACLs, and topology reconstruction.
- For destructive cleanup, prove the exact namespace and environment, sample matches, count incrementally, require explicit authorization, and retain a rollback or reconstructability path.
