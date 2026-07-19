---
name: debugging
description: Systematic root-cause debugging workflow. Use whenever behavior is wrong or unexplained and before proposing or applying any fix: errors, exceptions, stack traces, failing or flaky tests, crashes, hangs, regressions, wrong output, broken builds, performance anomalies, or "works in one environment, fails in another" situations in any language or system.
---

# Debugging

## Ground Rules

- Reproduce before explaining; explain before fixing. A fix without a confirmed cause is a guess wearing a diff.
- Change one variable per experiment; parallel changes destroy the information an experiment produces.
- Evidence over plausibility: the bug is where the facts point, not where it would be convenient or familiar.
- Suspect the newest, least-tested code first — usually the current change. The compiler, runtime, and framework are almost never the culprit; claim so only with a minimal reproduction that proves it.
- If the user is describing a problem rather than requesting a change, the deliverable is the diagnosis; report findings and wait before fixing.

## Read The Failure

- Read the exact error text, not its general shape; the specific message, code, and identifiers usually name the cause.
- In logs, find the first error, not the last: later failures are usually cascade.
- In stack traces, find the deepest frame inside owned code; frames above it describe consequences, frames below it describe machinery.
- Diff against last-known-good along every axis: code, data, configuration, dependency versions, environment, time-of-day, and load.
- Record the first known bad state, frequency, impact, environment, version, and exact reproduction inputs alongside the error text and any request or trace IDs, without exposing secrets in the record.

## Reproduce

- Build the smallest deterministic reproduction: shrink the input, remove components, and pin versions until removing anything more makes the bug disappear. What remains is a map of the cause.
- Control every axis that can smuggle nondeterminism into the reproduction: time, randomness, network, concurrency, caches, environment variables, locale, timezone, and data fixtures.
- If it cannot be reproduced yet, collect the failure's fingerprint instead of guessing: versions, environment, flags, data samples, frequency, timing, and correlation with deploys or load. Add targeted instrumentation and let the next occurrence report itself.
- A flaky test is a deterministic bug in disguise: timing, ordering, shared state, or external dependence. Reproduce by stressing that axis — run it in a loop, randomize order, add load — rather than rerunning until green.

## Hypothesis Loop

1. List candidate causes ranked by likelihood and by how cheaply each can be tested. For each, note the evidence it explains and the evidence against it; prefer the hypothesis that explains all material symptoms with the fewest unsupported assumptions.
2. Run the cheapest experiment that discriminates between the top candidates, not the one that confirms the favorite. Test one hypothesis at a time — patching several at once destroys the information the result would have carried.
3. Predict the result before running. A surprise means the mental model is wrong; update the model before acting further.
4. Record what each experiment ruled out and never re-test ruled-out hypotheses.

## Localize

- Trace from the observable symptom back through callers, state transitions, boundaries, data transformations, and error handling; compare the working and failing paths, versions, inputs, environments, or commits along the way.
- Binary-search everything: `git bisect` across history, halve the input, disable half the pipeline, probe the midpoint of the data flow, and recurse into the failing half.
- Instrument the seams: log inputs and outputs at the boundary nearest the failure; assert invariants where corruption would first become visible. Remove temporary instrumentation once it has served its purpose unless it is worth keeping as production observability.
- Inspect the actual state at the failure point — debugger, dump, targeted print — instead of deducing what it should be. The gap between expected and actual state is the bug's address.
- Confirm the code being read is the code that runs: build artifacts, caches, deployed versions, and shadowed modules routinely diverge from the editor.

## Usual Suspects

- Stale state and caches: build outputs, memoization, ORM identity maps, CDN, browser, container layers.
- Async and concurrency: races, missing awaits, unhandled rejections, deadlocks, event ordering, double execution, lost wakeups, backpressure, idempotency, and cleanup on cancellation.
- Boundaries: off-by-one, empty/one/many, maximum sizes, pagination edges, inclusive/exclusive ranges.
- Silent failure: swallowed exceptions, default fallbacks masking errors, broad catches hiding the real cause.
- Environment: config and env vars, working directory, path separators, locale, timezone, encoding, version skew between machines, feature flags, and permissions.
- Resource exhaustion: file descriptors, connections, memory, disk, pool and queue limits.
- Distributed systems: retries, duplicate delivery, partial success, stale reads, clock skew, consistency, rate limits, and correlation across services.
- Data and databases: schema drift, nulls, encoding, transaction boundaries, isolation, locks, cardinality, migrations, and environment parity.
- Frontend: browser state, hydration, event order, focus, caching, network evidence, layout, accessibility, and device or viewport differences.
- Performance: measure before and after the change; separate CPU, memory, I/O, query, network, allocation, contention, startup, and algorithmic causes rather than guessing which one degraded.

## Fix Discipline

- Fix the root cause; a symptom patch leaves the defect in production wearing camouflage. Name the violated invariant, boundary contract, ordering assumption, ownership rule, resource limit, or version behavior, and explain why it produces the symptom and why nearby alternatives do not.
- Repair the invariant at the layer that owns it. Avoid symptom suppression, blanket exception handling, arbitrary delays, unbounded retries, weakened assertions, broad cache clears, and unrelated refactors riding along with the fix.
- Write the regression test first and watch it fail for the right reason; then fix; then watch it pass.
- Verify under the original reproduction, not only under the new test, and re-run the neighboring tests of everything touched.
- Preserve compatibility, and add migration or rollback handling, when the fix changes stored data or a public contract.
- Search for the same bug class elsewhere before closing; defects cluster around the same misunderstanding.
- If a mitigation ships while the root cause remains unknown, say so explicitly. A mystery reported as solved returns at a worse time.

## Anti-Patterns

- Do not infer causality from temporal correlation alone; two events near each other in time are not automatically cause and effect.
- Do not accept a restart, retry, cache clear, or longer timeout as a root-cause fix without explaining the underlying state it worked around.
- Do not mock away the failing boundary so thoroughly that the regression test becomes tautological — it should be able to fail.
- Do not weaken types, validation, security controls, or tests merely to make the symptom disappear.
- Do not claim reproduction, root cause, or resolution without observed evidence backing the claim.

## When Stuck

- Re-read the failing code line by line as a stranger's pull request; state every assumption and verify the "obviously true" ones — the bug lives inside one of them.
- Write a three-line state summary: expected, observed, ruled out. The gap the summary exposes is usually the next experiment.
- Widen the frame: wrong layer, wrong process, wrong machine, wrong data, or wrong question. Confirm the failure is where it appears to be, not merely where it is observed.
- Take a fresh-context second opinion: dispatch bug-finder with the reproduction, the fingerprint, and the ruled-out list.

## Reporting

State the failure definition, reproduction status, root cause and its evidence, changed paths, regression coverage, validation results, and remaining risk. If the defect is not yet resolved, report the ranked hypotheses and the single highest-value next experiment instead of a guessed fix.
