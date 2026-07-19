# Authoritative sources

MongoDB's release-notes index identified 8.3 as the current stable server line on the access date, while rolling pages and provider surfaces exposed multiple supported lines. Do not infer a deployment's version from the rolling manual; inspect the server binary, feature compatibility version, driver, ODM, provider, and exact versioned documentation. All sources were accessed 2026-07-13.

| Source | Publisher | Topic | Version or currentness | Access |
| --- | --- | --- | --- | --- |
| [Server release notes index](https://www.mongodb.com/docs/manual/release-notes/) | MongoDB | Current and previous stable server lines | Rolling index; identified 8.3 as current stable | 2026-07-13 |
| [MongoDB 8.3 release notes](https://www.mongodb.com/docs/manual/release-notes/8.3/) | MongoDB | Current stable server changes and compatibility | Versioned 8.3 line; verify exact patch and provider support | 2026-07-13 |
| [MongoDB 8.2 release notes](https://www.mongodb.com/docs/manual/release-notes/8.2/) | MongoDB | Server changes and compatibility | Versioned 8.2 line; verify release metadata | 2026-07-13 |
| [Embedding](https://www.mongodb.com/docs/manual/data-modeling/embedding/) | MongoDB | Embedded document modeling | Rolling manual | 2026-07-13 |
| [References](https://www.mongodb.com/docs/manual/data-modeling/referencing/) | MongoDB | Referenced relationships | Rolling manual | 2026-07-13 |
| [Schema design patterns](https://www.mongodb.com/docs/manual/data-modeling/design-patterns/) | MongoDB | Workload-oriented document patterns | Rolling manual | 2026-07-13 |
| [Schema validation](https://www.mongodb.com/docs/manual/core/schema-validation/) | MongoDB | Database-enforced validation | Rolling manual | 2026-07-13 |
| [Documented limits](https://www.mongodb.com/docs/manual/reference/limits/) | MongoDB | Document, namespace, and deployment limits | Rolling; verify exact server/provider | 2026-07-13 |
| [Data-modeling anti-patterns](https://www.mongodb.com/docs/manual/data-modeling/design-antipatterns/) | MongoDB | Unbounded arrays and schema risks | Rolling manual | 2026-07-13 |
| [Index properties](https://www.mongodb.com/docs/manual/core/indexes/index-properties/) | MongoDB | Unique, partial, sparse, TTL and other indexes | Rolling manual | 2026-07-13 |
| [Equality, sort, range guideline](https://www.mongodb.com/docs/manual/tutorial/equality-sort-range-guideline/) | MongoDB | Compound index field ordering | Rolling heuristic; verify with plans | 2026-07-13 |
| [Explain results](https://www.mongodb.com/docs/manual/reference/explain-results/) | MongoDB | Query-plan interpretation | Rolling and output-version-sensitive | 2026-07-13 |
| [Evaluate query performance](https://www.mongodb.com/docs/manual/tutorial/evaluate-operation-performance/) | MongoDB | Query measurement | Rolling manual | 2026-07-13 |
| [Write performance](https://www.mongodb.com/docs/manual/core/write-performance/) | MongoDB | Index and write-cost tradeoffs | Rolling manual | 2026-07-13 |
| [Aggregation optimization](https://www.mongodb.com/docs/manual/core/aggregation-pipeline-optimization/) | MongoDB | Pipeline and index optimization | Rolling and version-sensitive | 2026-07-13 |
| [MongoDB Search overview](https://www.mongodb.com/docs/atlas/atlas-search/atlas-search-overview/) | MongoDB | Search indexes and architecture | Atlas rolling product docs | 2026-07-13 |
| [Manage Search indexes](https://www.mongodb.com/docs/atlas/atlas-search/manage-indexes/) | MongoDB | Search-index lifecycle | Atlas rolling product docs | 2026-07-13 |
| [Transaction production considerations](https://www.mongodb.com/docs/manual/core/transactions-production-consideration/) | MongoDB | Transaction constraints and conflicts | Rolling manual | 2026-07-13 |
| [Read concern](https://www.mongodb.com/docs/manual/reference/read-concern/) | MongoDB | Read visibility guarantees | Rolling manual | 2026-07-13 |
| [Causal consistency and concerns](https://www.mongodb.com/docs/manual/core/causal-consistency-read-write-concerns/) | MongoDB | Guarantee matrix for causal sessions | Rolling manual; topology and concern-sensitive | 2026-07-13 |
| [Retryable writes](https://www.mongodb.com/docs/manual/core/retryable-writes/index.html) | MongoDB | Supported automatic write retry | Rolling; driver/server-sensitive | 2026-07-13 |
| [Retryable reads](https://www.mongodb.com/docs/manual/core/retryable-reads/) | MongoDB | Supported automatic read retry | Rolling; driver/server-sensitive | 2026-07-13 |
| [Node.js driver transactions](https://www.mongodb.com/docs/drivers/node/current/crud/transactions/) | MongoDB | Session and transaction retry behavior | Current Node driver docs; verify installed release | 2026-07-13 |
| [Sharding](https://www.mongodb.com/docs/manual/sharding/) | MongoDB | Sharded topology and routing | Rolling manual | 2026-07-13 |
| [Shard keys](https://www.mongodb.com/docs/manual/core/sharding-shard-key/) | MongoDB | Shard-key properties and selection | Rolling manual | 2026-07-13 |
| [Change streams](https://www.mongodb.com/docs/manual/changestreams/) | MongoDB | Stream availability and resume | Rolling manual | 2026-07-13 |
| [Change Streams specification](https://github.com/mongodb/specifications/blob/master/source/change-streams/change-streams.md) | MongoDB | Cross-driver behavior contract | Accepted driver specification; main branch | 2026-07-13 |
| [Node.js connection pools](https://www.mongodb.com/docs/drivers/node/current/connect/connection-options/connection-pools/) | MongoDB | Pool sizing and wait queues | Current Node driver docs; verify installed release | 2026-07-13 |
| [Node.js connection options](https://www.mongodb.com/docs/drivers/node/current/connect/connection-options/) | MongoDB | Driver timeouts and topology options | Current Node driver docs; verify installed release | 2026-07-13 |
| [Security](https://www.mongodb.com/docs/manual/security/) | MongoDB | Authentication, authorization, encryption | Rolling manual | 2026-07-13 |
| [Role-based access control](https://www.mongodb.com/docs/manual/core/authorization/) | MongoDB | Roles and self-managed access control | Rolling manual | 2026-07-13 |
| [Data encryption](https://www.mongodb.com/docs/manual/core/security-data-encryption/) | MongoDB | TLS, storage and field encryption | Rolling/provider-sensitive | 2026-07-13 |
| [Atlas multi-tenant architecture](https://www.mongodb.com/docs/atlas/build-multi-tenant-arch/) | MongoDB | Tenant isolation patterns | Atlas rolling guidance | 2026-07-13 |
| [Monitor slow queries](https://www.mongodb.com/docs/manual/tutorial/monitor-slow-queries/) | MongoDB | Profiling and diagnostics | Rolling manual | 2026-07-13 |
| [Backup and restore tools](https://www.mongodb.com/docs/manual/tutorial/backup-and-restore-tools/) | MongoDB | Logical dump and restore boundaries | Rolling; topology-sensitive | 2026-07-13 |
