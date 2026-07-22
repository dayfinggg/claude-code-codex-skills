---
name: sql
description: Engineer relational schemas, SQL queries, constraints, indexes, transactions, locking, migrations, repairs, and dialect behavior. Use when correctness depends on a SQL engine or relational model; not for MongoDB, Redis, or generic data transport.
---

# SQL and Database Engineering

## Discover the actual database

Identify the exact engine, version, edition or managed-service restrictions, compatibility level, extensions, driver or ORM, placeholder syntax, migration framework, schema owner, environment, and deployment path. Inspect migrations, schema dumps, ORM models, query builders, representative data shape, call sites, and tests before proposing SQL.

Write for the active dialect. Verify version-sensitive DDL transactionality, online operations, isolation, locking, constraint enforcement, collations, time zones, JSON, generated columns, optimizer behavior, and warehouse limits from versioned vendor documentation. Do not transfer PostgreSQL, MySQL, SQL Server, SQLite, Oracle, or warehouse semantics to another engine.

Read [dialects, transactions, and migrations](references/dialects-transactions-migrations.md) before choosing constraints or row-level security, retrying transactions, planning live DDL, previewing repairs, using execution-capable plans, or designing rollback. Use [authoritative SQL and vendor sources](references/sources.md) for the exact deployed engine and edition.

## Own relational invariants

Put durable integrity rules in enforced primary keys, foreign keys, unique constraints, checks, `NOT NULL`, exclusion constraints, or the engine's equivalent. Choose types intentionally for range, precision, currency, collation, timestamps, identifiers, and binary or JSON data. Make nullability semantic rather than accidental.

Model expected joins, filters, sorts, uniqueness, tenant scope, retention, and backfills. Prefer normalized ownership until measured read or analytical requirements justify duplication. When tenant isolation belongs in the database, include tenant identity in keys, constraints, indexes, policies, and every authoritative query; verify bypass, owner, and privileged-role behavior for row-level security.

Use explicit application columns and deterministic ordering when order matters. Handle `NULL` in predicates, joins, aggregates, uniqueness, and anti-joins deliberately. Bind all untrusted values with the project's driver API. Allowlist dynamic identifiers, operators, and sort directions because value placeholders do not protect SQL syntax.

## Design indexes from evidence

Start with representative query text, bound-value ranges, cardinality, data volume, latency target, and an engine-native execution plan. Treat `EXPLAIN ANALYZE`, actual plans, profilers, and warehouse jobs as potentially executing, expensive, or sensitive work; require an approved bounded target before running them on shared systems.

Select indexes from predicates, joins, ordering, grouping, uniqueness, and selectivity. Consider composite order, covering columns, partial or functional support, clustering, partitioning, write amplification, storage, maintenance, replication, and build locking. Compare before and after plans or measurements; never claim a performance gain from intuition alone.

## Preserve transaction correctness

Define the invariant and transaction boundary before choosing isolation. Verify the engine's snapshot, predicate, gap-lock, serialization, and deadlock behavior. Keep transactions short and avoid remote calls or user interaction inside them. Prefer constraints and conditional writes over broad explicit locks; acquire unavoidable locks in a consistent order.

Retry a classified deadlock, serialization failure, lock timeout, or optimistic conflict only by rerunning the complete transaction from a clean boundary with bounded backoff and jitter. Do not retry only the failed statement. Defer external effects until commit or make them idempotent and outboxed. Treat timeout or disconnect after a write as an unknown outcome until reconciled.

## Migrate and repair safely

Follow the project's migration naming, checksums, wrappers, and commands. Prefer expand-contract: add compatible structures, deploy tolerant readers and writers, backfill in bounded resumable batches, validate, enforce constraints, then remove old structures. Separate backfills from DDL when this reduces locks, replication lag, or deployment risk.

Assess lock type, rewrite risk, duration, online support, replica impact, mixed-version application compatibility, and rollback before live DDL. Do not assume DDL is transactional. For irreversible transforms or drops, require a verified backup or restore path and an explicit forward-repair plan.

Preview data repairs with exact predicates, then prevent races by locking or atomically revalidating keys, versions, and row counts at mutation time. Never run production deletes, truncates, broad updates, schema drops, or credential changes without explicit authorization and a verified target.

## Validate with project-native tools

Run the repository's SQL formatter or parser, migration validator, and focused application tests. Apply and reverse only reversible migrations in a disposable database using the actual engine version. Test valid and violating constraint cases, duplicates, orphans, null edges, concurrent writers, retry behavior, mixed-version rollout, and rollback or restore steps as risk requires. Report the inspected dialect and versions, commands and plans observed, affected-data evidence, and unverified production behavior.
