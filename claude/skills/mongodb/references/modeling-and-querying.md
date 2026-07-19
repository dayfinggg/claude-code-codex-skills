# Modeling and querying

## Derive documents from access and ownership

| Relationship | Embed when | Reference when |
| --- | --- | --- |
| One-to-one | Same owner, lifecycle, access, and atomic update boundary | Independent security, lifecycle, reuse, or write contention |
| One-to-few | Child set is predictably bounded and normally read with parent | Child grows, paginates, expires, or updates independently |
| One-to-many | Use a bounded subset, summary, or bucket | Full set is unbounded or queried independently |
| Many-to-many | Duplicate small stable snapshots with explicit repair | Both sides change independently or need independent queries |

- Name the aggregate root that owns each invariant. Keep fields required for one atomic decision in one document when growth permits.
- Define maximum array length, document size, nesting, field count, string length, and user-defined key count. Enforce limits before persistence.
- Separate high-churn fields from large cold documents when update contention, network transfer, or copy cost is material.
- Model history as immutable events, buckets, or child documents rather than an ever-growing array.
- Treat duplication as a consistency contract: canonical owner, propagation event, tolerated staleness, reconciliation query, and repair procedure.

## Evolve and validate schemas

1. Inventory real shapes and type drift, including null, missing, legacy enums, malformed dates, and oversized values.
2. Make readers tolerant first; add a schema version only when behavior truly differs.
3. Add validation in a mode compatible with current data and writes; measure violations before enforcing stricter action.
4. Backfill idempotently in small resumable batches with stable ordering and conditional updates.
5. Verify counts, invariants, samples, error rates, replication lag, and application compatibility before contraction.
6. Keep a rollback path until all old writers are gone and restoration has been tested.

## Build an index candidate

- Start from exact filter, sort, projection, collation, and tenant constraint. Include equality prefixes first; choose sort versus range order from selectivity and required server-side sort, then verify.
- Use compound indexes to serve meaningful query families, not every syntactic permutation. Remove redundant indexes only after usage and rollback analysis.
- Use a unique compound index such as `{ tenantId, normalizedValue }` when uniqueness is tenant-scoped. Handle existing duplicates before building it.
- Use a partial index only when queries include a compatible predicate. Prefer it to a sparse index for explicit subset semantics.
- Remember that a multikey index has array-specific compound and coverage constraints. Avoid indexing multiple unbounded arrays.
- Use TTL for asynchronous expiration, not precise scheduling or cascading cleanup. Test late deletion and legal-hold exceptions.
- Treat MongoDB Search and vector search as separate capabilities. Verify deployment availability, index freshness, analyzers, filters, scoring, capacity, and fallback.

## Read an execution plan with context

1. Reproduce with representative data distribution, parameters, collation, projection, sort, limit, and read preference.
2. Record `nReturned`, keys examined, documents examined, execution time, index bounds, fetch, blocking sort, spill, shard targeting, and rejected plans.
3. Compare ratios and tail latency across common and worst-case values. A fast empty result or warm-cache micro-run is not representative.
4. Confirm coverage only when no document fetch is required and all filters/projections are satisfied correctly by the index.
5. Recheck after data growth and distribution changes. Explain output and planner behavior are version-sensitive, and `explain()` does not behave like normal plan-cache use.

## Keep aggregations bounded

- Match and project early when semantics allow; preserve an index-supported sort before stages that prevent index use.
- Estimate cardinality after every unwind, lookup, facet, group, and window stage. Bound joins and arrays before multiplication.
- Define null versus missing behavior, numeric precision, collation, timezone, ordering, and duplicate treatment in tests.
- Use cursor batches and cancellation. Do not materialize unbounded results in application memory.
- Consider a precomputed read model only with ownership, update propagation, freshness, reconciliation, rebuild, and storage-cost plans.

## Reject recurring anti-patterns

- Unbounded arrays or documents; excessive collections or indexes; collection-per-tenant; bloated documents; unnecessary `$lookup`; computed values with no repair path.
- Skip/limit pagination over deep offsets when stable range pagination is available.
- Case-insensitive regex as a substitute for a suitable index, normalized field, or search capability.
- Read-then-write updates without a conditional predicate, version, or atomic update operator.
