---
name: systematic-debugging
description: Reproduce, isolate, explain, fix, or verify observed failures, regressions, flakiness, crashes, hangs, performance anomalies, races, integration defects, or incidents. Do not use for feature design without a failure.
---

# Systematic Debugging

Find the causal defect before optimizing the patch. A symptom disappearing is not proof of a root-cause fix.

Read [experiments-and-observability.md](references/experiments-and-observability.md) when the failure is intermittent, distributed, timing-sensitive, performance-related, or visible only in telemetry. Read [sources.md](references/sources.md) before relying on a debugger, trace, telemetry specification, or named experimental technique; match the exact runtime and tool version.

## Debugging Loop

1. Define the failure precisely.
   - Record expected behavior, actual behavior, first known bad state, frequency, impact, environment, version, inputs, and acceptance criteria.
   - Preserve exact errors, timestamps, request or trace IDs, and reproduction inputs without exposing secrets.

2. Reproduce at the narrowest reliable layer.
   - Use the smallest deterministic reproduction available.
   - Confirm the failure before editing when practical. If it cannot be reproduced, identify what evidence still establishes it and what remains uncertain.
   - Control time, randomness, network, concurrency, caches, environment variables, locale, timezone, and data fixtures when relevant.

3. Map the execution path.
   - Trace from the observable symptom through callers, state transitions, boundaries, data transformations, side effects, and error handling.
   - Compare working and failing paths, versions, inputs, environments, or commits. Use binary search or `git bisect` when a reliable predicate and known good state exist.

4. Build ranked hypotheses.
   - For each hypothesis, state the evidence it explains, evidence against it, and the cheapest discriminating experiment.
   - Prefer hypotheses that explain all material symptoms with the fewest unsupported assumptions.
   - Do not patch several hypotheses at once.

5. Run controlled experiments.
   - Change one causal variable at a time or add focused instrumentation.
   - Observe the result and update confidence. Treat surprising results as new evidence rather than forcing the original theory.
   - Keep diagnostic changes local and remove temporary instrumentation unless it is valuable production observability.
   - Define the predicted result before running the experiment so hindsight cannot turn every outcome into confirmation.

6. Prove the root cause.
   - Identify the violated invariant, boundary contract, ordering assumption, ownership rule, resource limit, or version behavior.
   - Explain why the defect produces the symptom and why nearby alternatives do not.

7. Implement the smallest defensible fix when authorized.
   - Repair the violated invariant at the layer that owns it.
   - Avoid symptom suppression, blanket exception handling, arbitrary delays, unbounded retries, weakened assertions, broad cache clears, or unrelated refactors.
   - Preserve compatibility and add migration or rollback handling when the fix changes stored data or public contracts.

8. Add a regression oracle.
   - Add or update the narrowest deterministic test that fails for the defect and passes for the fix when practical.
   - Test the failure boundary, not only the happy path.

9. Verify outward.
   - Re-run the reproduction, focused tests, adjacent integration checks, and broader validation according to blast radius.
   - Inspect the final diff for accidental changes and state residual uncertainty.

## Failure-Class Checks

- Async and concurrency: ordering, cancellation, lost wakeups, shared mutation, races, deadlocks, backpressure, timeouts, idempotency, and cleanup.
- Distributed systems: retries, duplicate delivery, partial success, stale reads, clock skew, consistency, rate limits, and correlation across services.
- Data and databases: schema drift, nulls, encoding, transaction boundaries, isolation, locks, cardinality, migrations, and environment parity.
- Frontend: browser state, hydration, event order, focus, caching, network evidence, layout, accessibility, and device or viewport differences.
- Performance: measure before and after; separate CPU, memory, I/O, query, network, allocation, contention, startup, and algorithmic causes.
- Environment-specific failures: exact runtime, architecture, dependency version, feature flag, permissions, filesystem, locale, timezone, proxy, and configuration.

## Anti-Patterns

- Do not infer causality from temporal correlation alone.
- Do not accept a restart, retry, cache clear, or longer timeout as a root-cause fix without explaining the underlying state.
- Do not mock away the failing boundary so thoroughly that the regression test becomes tautological.
- Do not weaken types, validation, security controls, or tests merely to make the symptom disappear.
- Do not claim reproduction, root cause, or resolution without observed evidence.

## Result

Report the failure definition, reproduction status, root cause and evidence, changed paths when any, regression coverage, validation results, and remaining risk. If unresolved, return the ranked hypotheses and the single highest-value next experiment.
