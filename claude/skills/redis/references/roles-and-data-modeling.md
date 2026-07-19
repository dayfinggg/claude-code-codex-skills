# Roles and data modeling

## Choose the role before the command

| Role | Required decision | Safe default | Prefer another system when |
| --- | --- | --- | --- |
| Cache | Source of truth, stale tolerance, invalidation, miss cost | Cache-aside with finite TTL, jitter, bounded value, miss coalescing | The value must be immediately consistent or durable |
| Session | Revocation, idle and absolute expiry, regional failover | Opaque session ID, server-side bounded record, explicit renewal | Stateless signed claims satisfy revocation and size needs |
| Rate limit | Scope, clock, burst, algorithm, outage policy | Atomic token or sliding-window update with tenant caps | The limit must be globally exact through partitions |
| Counter | Loss and reconciliation tolerance | Atomic increment plus durable reconciliation if needed | The count is financial, legal, or a hard invariant |
| Queue | Delivery, ordering, retry, retention, poison handling | Streams consumer groups with idempotent consumers and recovery | Durable broker routing, long retention, or stronger delivery is required |
| Pub/Sub | Disconnect loss acceptable | Use only for ephemeral live notifications | Replay, acknowledgement, or offline consumption is required |
| Coordination | Lease expiry and stale-owner behavior | Minimize scope; use fencing and authoritative validation | Correctness requires consensus or durable ownership |
| Primary data | RPO/RTO, backups, query model, failover loss | Use only after explicit durability and recovery design | General database constraints, history, or queryability matter |

## Map access patterns to native types

| Need | Candidate | Design check |
| --- | --- | --- |
| Single value, token, lease | String | Bound bytes; use conditional options and TTL atomically where needed |
| Field updates or compact record | Hash | Bound field count and field/value bytes; define key-wide or supported field-specific expiry explicitly |
| Unique membership | Set | Bound members; avoid large set algebra on hot paths |
| Ranked or time-ordered members | Sorted set | Bound size; choose stable score/tie behavior; trim explicitly |
| Ordered append log with groups | Stream | Bound retention; acknowledge, reclaim, deduplicate, and monitor pending work |
| Queue or deque | List | Define blocking-client behavior, maximum length, poison handling, and durability |
| Approximate membership/cardinality | Bitmap, HyperLogLog, probabilistic type | Make approximation and false-positive/error tolerance visible |
| Document or search structure | Redis module/data type | Verify module availability, persistence, cluster, backup, and client compatibility |

## Specify a key contract

- Record namespace, component encoding, maximum length, cardinality formula, tenant ownership, data classification, type, schema version, TTL, and deletion owner.
- For hashes, choose key-wide expiry or field-specific expiry only after verifying exact server, client, and managed-provider support; test how field expiry affects reads, scans, memory, and lifecycle repair.
- Keep environment and service boundaries explicit. Add a tenant segment to every shared multi-tenant key and test cross-tenant denial.
- Treat Cluster `{hash-tags}` as a placement contract. Keep only the minimum atomic key group in one tag and load-test the resulting slot.
- Version incompatible encodings. Prefer read-old/write-new with measurable cutover over in-place reinterpretation.
- Maintain reverse indexes only when their lifecycle is atomic or repairable. Orphaned indexes are data corruption, even if Redis is a cache.

## Make cached data bounded and correct enough

1. Define freshness budget separately from TTL. TTL is a storage mechanism, not a guarantee that all consumers see current data.
2. Invalidate on authoritative writes when feasible; keep a finite TTL as repair for missed invalidations.
3. Add randomized TTL jitter to avoid synchronized expiry. Coalesce misses or use a short refresh lease to limit stampedes.
4. Use stale-while-revalidate only when stale data is acceptable and mark the hard stale limit.
5. Cache negative results briefly and only when absence is stable enough; distinguish not-found from dependency failure and authorization denial.
6. Bound request-driven cache entries and per-tenant usage. Reject or normalize unbounded query-derived keys.
7. Prevent an eviction policy from removing correctness-critical state. Separate workloads or use explicit memory classes when cache and durable state would compete.

## Size before shipping

- Measure representative serialized values and key names; inspect allocator fragmentation and data-type encodings on the target version.
- Estimate steady state and burst state: `keys × bytes per key/value/overhead`, replica copies, copy-on-write during fork, AOF rewrite, buffers, client output, and migration overlap.
- Split or redesign big keys that create long single-threaded operations, network bursts, migration stalls, or uneven Cluster slots.
- Detect hot keys from traffic distribution, not average throughput. Shard only associative workloads and preserve atomicity requirements.
