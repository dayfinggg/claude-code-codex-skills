# Authoritative sources

Use exact-version documentation when behavior differs from the rolling pages below. Redis Open Source release notes showed the 8.8 line as current by the access date; managed providers and clients may lag or restrict commands. All sources were accessed 2026-07-13.

| Source | Publisher | Topic | Version or currentness | Access |
| --- | --- | --- | --- | --- |
| [Redis Open Source release notes](https://redis.io/docs/latest/operate/oss_and_stack/stack-with-enterprise/release-notes/redisce/) | Redis | Server releases and changes | Rolling; 8.8 release line visible | 2026-07-13 |
| [Redis Open Source overview](https://redis.io/docs/latest/operate/oss_and_stack/) | Redis | Deployment and operations documentation | Rolling latest | 2026-07-13 |
| [Data types](https://redis.io/docs/latest/develop/data-types/) | Redis | Native structures and use cases | Rolling latest | 2026-07-13 |
| [Hashes and field expiration](https://redis.io/docs/latest/develop/data-types/hashes/) | Redis | Hash operations and field-level TTLs | Rolling; field expiration requires Redis 7.4+ | 2026-07-13 |
| [`HEXPIRE`](https://redis.io/docs/latest/commands/hexpire/) | Redis | Hash-field expiry command semantics | Redis 7.4+; verify client/provider support | 2026-07-13 |
| [Keyspace and expiration](https://redis.io/docs/latest/develop/using-commands/keyspace/) | Redis | Key management, scan, TTL behavior | Rolling latest | 2026-07-13 |
| [Eviction](https://redis.io/docs/latest/develop/reference/eviction/) | Redis | `maxmemory` and eviction policies | Rolling latest | 2026-07-13 |
| [Transactions](https://redis.io/docs/latest/develop/using-commands/transactions/) | Redis | `MULTI`, `EXEC`, `WATCH`, error semantics | Rolling; notes include 8.4 changes | 2026-07-13 |
| [Redis Functions introduction](https://redis.io/docs/latest/develop/programmability/functions-intro/) | Redis | Persisted server-side functions | Redis 7+; rolling latest | 2026-07-13 |
| [Lua API](https://redis.io/docs/latest/develop/interact/programmability/lua-api/) | Redis | Script behavior and restrictions | Rolling latest | 2026-07-13 |
| [Persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/) | Redis | RDB, AOF, recovery tradeoffs | Rolling latest | 2026-07-13 |
| [Replication](https://redis.io/docs/latest/operate/oss_and_stack/management/replication/) | Redis | Asynchronous replication behavior | Rolling latest | 2026-07-13 |
| [Sentinel](https://redis.io/docs/latest/operate/oss_and_stack/management/sentinel/) | Redis | Monitoring and automatic failover | Rolling latest | 2026-07-13 |
| [Redis Cluster specification](https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/) | Redis | Hash slots, redirection, failover guarantees | Rolling latest | 2026-07-13 |
| [Distributed locks](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/) | Redis | Lease algorithms and Redlock assumptions | Rolling; notes include 8.4 command support | 2026-07-13 |
| [Streams](https://redis.io/docs/latest/develop/data-types/streams/) | Redis | Consumer groups, pending work, acknowledgement | Rolling; notes include 8.2/8.6 features | 2026-07-13 |
| [Streaming solutions](https://redis.io/docs/latest/develop/use-cases/streaming/) | Redis | Streams versus Pub/Sub semantics | Rolling latest | 2026-07-13 |
| [Client pools and multiplexing](https://redis.io/docs/latest/develop/clients/pools-and-muxing/) | Redis | Connection management models | Rolling latest | 2026-07-13 |
| [Client handling](https://redis.io/docs/latest/develop/reference/clients/) | Redis | Limits, buffers, timeouts, observability | Rolling latest | 2026-07-13 |
| [Client-side caching](https://redis.io/docs/latest/develop/reference/client-side-caching/) | Redis | Tracking and invalidation | Rolling latest | 2026-07-13 |
| [Latency diagnosis](https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/latency/) | Redis | Systematic latency investigation | Rolling latest | 2026-07-13 |
| [Latency monitor](https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/latency-monitor/) | Redis | Server-side latency events | Rolling latest | 2026-07-13 |
| [Security](https://redis.io/docs/latest/operate/oss_and_stack/management/security/) | Redis | Network trust and secure deployment | Rolling latest | 2026-07-13 |
| [ACLs](https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/) | Redis | Users, command and key permissions | Redis 6+; rolling latest | 2026-07-13 |
| [TLS](https://redis.io/docs/latest/operate/oss_and_stack/management/security/encryption/) | Redis | Transport encryption | Rolling latest | 2026-07-13 |
| [Redis administration](https://redis.io/docs/latest/operate/oss_and_stack/management/admin/) | Redis | Operational configuration and monitoring | Rolling latest | 2026-07-13 |
| [node-redis](https://github.com/redis/node-redis) | Redis | Official Node.js client behavior | Main branch; verify installed release | 2026-07-13 |
| [Jedis production usage](https://redis.io/docs/latest/develop/clients/jedis/produsage/) | Redis | Java client pooling, timeouts, retries | Client-specific rolling guide | 2026-07-13 |
