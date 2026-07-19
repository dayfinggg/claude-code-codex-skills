# Correctness and distribution

## Choose the narrowest atomic mechanism

| Mechanism | Provides | Does not provide |
| --- | --- | --- |
| Single command | Atomic execution on the server | Durability, cross-system atomicity, or safe blind retry |
| Pipeline | Fewer network round trips | Atomic grouping or rollback |
| `MULTI`/`EXEC` | Sequential isolated execution of queued commands | Rollback after a command error or external side-effect coordination |
| `WATCH` | Optimistic compare-and-set | Progress under heavy contention without bounded retries |
| Lua script | Atomic server-side logic for declared keys | Unbounded computation safety or automatic cross-slot access |
| Redis Function | Persisted, replicated server-side logic | Compatibility with older servers or permission to block the server |

- Validate arguments before a transaction when possible. Interpret every result; transaction execution can contain command errors.
- Keep scripts and functions deterministic, bounded, version-controlled, tested, and observable. Avoid network calls and large scans.
- Make external side effects idempotent or move them behind a durable outbox or queue. Redis cannot atomically commit with another database or service.

## State the durability window

- RDB snapshots trade recovery point for lower write overhead; AOF records writes and has a configurable fsync loss window; combined persistence can improve restart recovery but still needs tested backups.
- Asynchronous replicas may lag. Failover can lose writes acknowledged only by the old primary. `WAIT`/`WAITAOF` can improve acknowledgement evidence but do not turn Redis into a consensus database.
- Test restart recovery from the configured persistence mode and restore from an independent backup. Monitor last successful save, AOF errors and rewrite, replication offsets, backlog, disk, fork latency, and recovery time.
- State whether lost, duplicated, stale, or reordered writes are acceptable for each Redis role.

## Design for Sentinel or Cluster

### Sentinel

- Use Sentinel for high availability of non-Cluster Redis, not as data sharding.
- Configure a quorum and a majority of Sentinels able to authorize failover; place failures independently and synchronize clocks.
- Use a Sentinel-aware client and authenticate both Sentinel and Redis connections. Exercise discovery, promotion, DNS or address advertisement, and stale-client recovery.

### Cluster

- Redis Cluster assigns keys to 16,384 hash slots. Multi-key commands, transactions, scripts, and functions normally require all keys in one slot.
- Use hash tags only for true co-location. A single high-volume tag can defeat distribution.
- Use a Cluster-aware client that refreshes topology and handles `MOVED`, temporary `ASK`, resharding, node replacement, and partial slot availability.
- Treat replication as asynchronous and plan for the documented minority-partition and failover write-loss windows. Cluster uses database 0 only.

## Make leases and locks defensible

1. Ask whether a unique database constraint, conditional version update, queue partition, or consensus system can enforce the invariant instead.
2. Acquire a single-instance lease with one atomic conditional set plus expiry and a cryptographically strong unique token.
3. Release only when the stored token matches, using an atomic conditional command, script, or supported function.
4. Bound the protected work below the lease and stop it when renewal or ownership validation fails.
5. Attach a monotonically increasing fencing token to the authoritative write; make the resource reject stale tokens.
6. Do not claim exactly-once execution or mutual exclusion through long pauses and partitions. Describe Redlock assumptions and the consequence of clock or network uncertainty if it is used.

## Engineer Streams for at-least-once processing

- Use consumer groups for work sharing. Persist the domain-side idempotency key or state transition before acknowledging with `XACK`.
- Monitor pending-entry count and age. Reclaim abandoned work deliberately with `XAUTOCLAIM` or the target-version equivalent and cap retry attempts.
- Trim by a retention requirement, not an arbitrary length. Ensure slow or offline consumers can recover before entries disappear.
- Store poison-message context and route exhausted work to a recoverable dead-letter path.
- Treat a timeout around `XADD`, `XACK`, or consumer work as an unknown result and reconcile by message ID or application idempotency key.
- Use Pub/Sub only when loss during disconnect and lack of replay are acceptable. Use Streams or a durable broker otherwise.
