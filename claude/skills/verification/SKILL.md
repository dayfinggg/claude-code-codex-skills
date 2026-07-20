---
name: verification
description: Evidence-based completion and validation discipline. Use before claiming any work is done, fixed, passing, deployed, or synchronized, when validating changes against acceptance criteria, choosing which checks to run, assessing regression or release readiness, or reporting results of coding, configuration, data, or infrastructure work. Complements the built-in /code-review command.
---

# Verification

## Done Means Demonstrated

- Done is a property of evidence, not intent: observed files, actual command output, test results, or explicit user acceptance.
- Success requires both signals: a clean exit status and output that confirms the intended behavior. A zero exit code from a command that tested nothing proves nothing.
- Never report tests, builds, lint, formatting, deploys, or synchronization as passing unless they ran in this session and their output was read.
- Report failures verbatim with their output, name skipped checks as skipped, and label unverified claims as unverified. A finding that contradicts "done" resets the state to not-done: fix or report, never average.

## Reconstruct The Contract And Map Risk

- Extract the requested outcomes, invariants, non-goals, compatibility requirements, allowed side effects, and evidence requirements from the task before checking anything. If criteria are vague, convert them into observable behavior without silently expanding scope.
- Build a risk map: rank affected surfaces by likelihood, impact, reversibility, and detectability. Give public contracts, data integrity, authentication and authorization, secrets, concurrency, persistence, migrations, performance, accessibility, compatibility, deployment, and rollback the closest look when they are in play.
- Inventory the actual change before judging it: the exact diff or artifact changes, affected call sites, tests, schemas, dependencies, generated files, and external state. Separate intended changes, pre-existing changes, and unexpected changes so scope creep does not hide inside a "done" claim.

## Check Ladder

Run the cheapest decisive check first and escalate with risk:

1. Static: syntax, typecheck, lint on the touched files.
2. Targeted: the specific tests covering the changed behavior.
3. Neighborhood: suites of the modules that consume the changed contract.
4. Build and package: when configuration, dependencies, or build inputs changed.
5. Runtime: start the application and drive the affected flow end-to-end — the only rung that proves the feature works rather than compiles. Use the run skill when a runtime surface exists.
6. Broad: full suite, integration, and smoke checks when shared contracts, infrastructure, or user-facing behavior changed.

Stop escalating when the remaining risk no longer justifies the cost, and say which rungs were skipped and why. Do not add tooling the project does not already use just to climb a rung.

## Exercise The Change

- Drive the real flow with realistic input. A passing unit test on a function nothing calls proves nothing about the feature.
- Verify the negative path: invalid input produces the intended error, not a crash and not silent success.
- For bug fixes, verify absence: the bug no longer reproduces under the original reproduction steps, and the regression test failed before the fix.
- For UI changes, observe the actual rendered result or behavior, not only the code that should produce it.
- For data changes, spot-check the actual data before and after, not only the migration's exit code.
- Inspect what automation misses: boundary data, user-visible behavior, error paths, cleanup, logs, telemetry, migration ordering, rollout, and rollback.

## Diff Review Before Finishing

- Reread the final diff as a hostile reviewer: leftover debug output, temporary files, accidental formatting churn, unrelated edits, secrets, and scope creep beyond the request.
- Confirm everything the task required is present and nothing outside the ownership boundary changed.
- Check the whole for consistency: parallel edits that are each correct can still disagree with each other on names, contracts, or assumptions.
- Confirm generated artifacts and lockfiles were updated only through the project's established workflow, not hand-edited to match.

## Minimum Decisive Evidence By Change Type

| Change | Minimum decisive evidence |
| --- | --- |
| Documentation or text | Reviewed rendering or reviewed diff |
| Configuration | Consumer starts and reads the value; an invalid value fails loudly |
| Pure logic | Targeted tests including boundary cases |
| Contract or API | Both sides checked: consumer tests or a contract check |
| Schema or migration | Dry run, affected-row preview, expand-contract compatibility, rollback path, and a data spot-check |
| Security-sensitive path | Targeted validation, negative authorization cases, plus a fresh-context audit |
| Concurrency or distributed work | Deterministic stress where possible, plus checked ordering, idempotency, cancellation, retries, and resource bounds |
| Infrastructure or deploy | Exact target confirmed, staged or verified apply, a health signal, and a ready rollback with a named owner |

## Failure Handling

- Use failed output as evidence: diagnose before changing code or weakening a check.
- For a suspected flake, reproduce under controlled conditions, preserve logs, and report both attempts. Rerunning until green and calling it success is not diagnosis.
- Treat a cached result, skipped test, warning-only failure, filtered suite, stale artifact, or mismatched environment as qualified evidence, never as an unqualified pass.

## Independent Verification

- Risky or user-facing work gets a fresh-context check: bug-finder on the diff, vulnerability-audit for security paths, per the agent-delegation skill.
- Instruct verifiers to report only gaps affecting correctness or stated requirements, then triage their findings rather than applying them wholesale.

## Report The Truth

- Mark each acceptance criterion `verified`, `failed`, `blocked`, or `not checked` with its evidence when the work has enough distinct claims to warrant it; a result is ready only when the required criteria are verified and residual risk is explicit.
- Verification recommends a deploy, migration, rollback, or external write; it does not authorize one. Keep that authorization decision separate from the readiness assessment.
- The result includes residual risk: what was not tested, which environments differ from production, and which assumptions remain unconfirmed.
- If validation could not run, state exactly why and what remains unverified; a precise "unverified" is worth more than an optimistic "should work".

## Evidence Matrix

Use a compact table when multiple claims need proof:

| Criterion or risk | Evidence | Status | Residual gap |
| --- | --- | --- | --- |
| Requested behavior | Focused test or inspected artifact | verified | None |
| Backward compatibility | Contract or integration check | not checked | Reason and impact |
