---
name: systematic-debugging
description: Reproduce, isolate, explain, fix, and verify observed failures. Use when a supplied symptom or failing command requires diagnosis, or reproduction and root cause are requested; not for an already diagnosed fix, and do not trigger merely from the words bug, fix, or regression.
---

# Systematic Debugging

Find the violated invariant before optimizing the patch. A disappearing symptom is not proof of causality.

Read [experiments-and-observability.md](references/experiments-and-observability.md) for intermittent, distributed, timing-sensitive, performance, or telemetry-only failures. Read [sources.md](references/sources.md) before depending on a named debugger, tracing system, telemetry specification, or experimental method; match its runtime and version.

## Build the reproduction first

1. Record expected and actual behavior, impact, frequency, environment, version, inputs, first known bad state, and exact errors. Preserve useful timestamps and correlation identifiers while redacting secrets and private data.
2. Before proposing hypotheses, create a short deterministic reproduction at the narrowest layer that still exhibits the symptom. State its setup, action, and failing observation so another engineer can repeat it.
3. Control time, randomness, network, concurrency, caches, locale, timezone, configuration, and fixtures where relevant. Confirm the reproduction fails before editing.
4. If deterministic reproduction is impossible, document attempts, the evidence that establishes the failure, and the uncontrolled variable. Do not turn uncertainty into a confident diagnosis.

## Isolate the cause

Trace the failing path through callers, boundaries, state transitions, transformations, side effects, cleanup, and error handling. Compare a working and failing input, environment, version, or path. Use binary search or `git bisect` only when a reliable predicate and known-good state exist.

Create a ranked list of falsifiable hypotheses. For each, state the causal claim, evidence for and against it, the predicted observation, and the cheapest experiment that would distinguish it. Rank by explanatory power and probability, not convenience. Change one causal variable at a time and do not patch several hypotheses together.

Add focused instrumentation only when existing evidence cannot discriminate among hypotheses. Keep it local, redact sensitive values, and record the predicted signal before running. Treat surprising results as evidence. Remove all temporary logging, probes, flags, fixtures, and diagnostic branches before finishing unless each is deliberately accepted as durable production observability.

## Fix and prove

Identify the violated invariant, contract, ordering rule, ownership boundary, resource limit, or version behavior. Explain why it produces every material symptom and why nearby alternatives do not.

When a fix is authorized, repair the invariant at the layer that owns it. Avoid blanket catches, arbitrary delays, unbounded retries, global cache clears, weakened validation, broader timeouts, and unrelated refactors. Preserve public and stored-data compatibility unless a change is explicitly required.

Add a symptom-specific regression test: the narrowest deterministic test that expresses the original setup and failing observation, fails for the causal defect, and passes for the fix. Test the real failure boundary rather than mocking it away or asserting only a happy path. If automation is impractical, preserve an executable repro and explain the remaining gap.

Re-run the original reproduction, the regression test, and adjacent checks selected from the actual blast radius. For races or async defects, check ordering, cancellation, idempotency, cleanup, and partial failure. For data defects, check schema, nulls, encoding, transaction boundaries, locks, and environment parity. For performance defects, compare the same metric and environment before and after.

Report the reproduction, ranked hypothesis outcome, proven root cause, changed paths, regression coverage, removed instrumentation, observed checks, and residual uncertainty. If unresolved, return the current ranking and the single highest-value next experiment.
