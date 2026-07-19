---
name: delivery-verification
description: Independently verify acceptance criteria and delivery risk for high-impact code, configuration, data, artifact, migration, release, rollout, or rollback work. Do not use for implementation, routine checks, or style-only review.
---

# Delivery Verification

Verification converts a completion claim into inspectable evidence. Passing one command is not sufficient when it does not cover the requested behavior.

Read [verification-evidence.md](references/verification-evidence.md) when constructing a multi-layer evidence matrix, validating a migration, or assessing a staged release. Read [sources.md](references/sources.md) before applying a quality, accessibility, security, supply-chain, or release standard; pin the exact version used.

## Verification Workflow

1. Reconstruct the acceptance contract.
   - Extract requested outcomes, invariants, non-goals, compatibility requirements, allowed side effects, and evidence requirements.
   - If criteria are vague, convert them into observable behavior without silently expanding scope.

2. Inventory the actual change.
   - Inspect current status, exact diff or artifact changes, affected call sites, tests, schemas, dependencies, generated files, and external state.
   - Separate intended changes, pre-existing changes, and unexpected changes.

3. Build a risk map.
   - Rank surfaces by likelihood, impact, reversibility, and detectability.
   - Include public contracts, data integrity, authentication and authorization, secrets, concurrency, persistence, migrations, performance, accessibility, compatibility, deployment, and rollback when relevant.

4. Map criteria and risks to evidence.
   - Use the cheapest check that can actually falsify each claim.
   - Prefer focused tests and static checks first, then integration, build, end-to-end, manual, security, performance, or operational checks as risk warrants.
   - Use independent evidence for critical claims when practical.

5. Run checks from verified project commands.
   - Discover commands from project guidance, manifests, CI, scripts, or help output.
   - Record command, scope, exit status, relevant output, environment, and skipped coverage.
   - Do not treat warnings, retries, partial suites, filtered tests, cached results, or flaky reruns as clean success without qualification.

6. Inspect what automation misses.
   - Review boundary data, user-visible behavior, error paths, cleanup, logs, telemetry, accessibility, migration ordering, rollout, and rollback.
   - Confirm generated artifacts and lockfiles were updated only through the established workflow.

7. Decide readiness.
   - Mark each criterion `verified`, `failed`, `blocked`, or `not checked` with evidence.
   - A result is ready only when required criteria are verified and residual risk is acceptable and explicit.
   - Keep authorization separate from readiness: verification may recommend a deploy, migration, rollback, or external write but does not authorize it.

## Validation Ladder

Choose only relevant levels and stop escalating when evidence is sufficient:

1. Artifact review: syntax, schema, exact diff, formatting, and structural validity.
2. Focused static checks: compiler, type checker, linter, parser, migration validator, or policy check.
3. Focused behavior: regression test, unit test, reproduction, or deterministic script.
4. Boundary behavior: integration, contract, database, browser, CLI, or service test.
5. Package or application health: build, broader suite, smoke test, or representative user flow.
6. Operational fitness: security, performance, migration rehearsal, observability, staged rollout, backup, rollback, and recovery.

## High-Risk Gates

- Data or migrations: dry run, affected-row preview, backup or restore path, expand-contract compatibility, rollback or compensating action, and staging rehearsal.
- Auth, security, payments, privacy, or secrets: focused threat review, negative authorization cases, redaction, least privilege, and current primary guidance.
- Concurrency or distributed work: deterministic stress where possible, ordering, idempotency, cancellation, retries, partial failure, and resource bounds.
- User interfaces: real interaction when available, keyboard and focus behavior, accessibility, responsive states, loading, empty, error, and recovery paths.
- Performance: defined metric and environment, before and after measurement, representative load, and regression budget.
- External writes or deploys: exact target, authorization, preview, health signal, stop threshold, rollback owner, and post-change verification.

## Failure Handling

- Use failed output as evidence. Diagnose before changing code or weakening a check.
- For suspected flakes, reproduce under controlled conditions, preserve logs, and report both attempts. Do not rerun until green and call it success.
- Treat a cached result, skipped test, warning-only failure, filtered suite, stale artifact, or mismatched environment as qualified evidence, never an unqualified pass.

## Evidence Matrix

Use a compact table when multiple claims need proof:

```md
| Criterion or risk | Evidence | Status | Residual gap |
|---|---|---|---|
| Requested behavior | Focused test or inspected artifact | verified | None |
| Backward compatibility | Contract or integration check | not checked | Reason and impact |
```
