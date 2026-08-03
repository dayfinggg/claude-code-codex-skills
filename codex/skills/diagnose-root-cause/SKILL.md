---
name: diagnose-root-cause
description: Isolate an unknown cause of a bug, regression, flaky failure, or performance anomaly through reproducible evidence. Use when the cause is uncertain; skip straightforward changes with a known cause.
---

# Diagnose Root Cause

1. For a live incident, first reduce harm with an approved, safe, reversible mitigation or rollback when warranted. Preserve timestamped logs, traces, metrics, inputs, versions, configuration, and correlation identifiers before the action when that does not delay mitigation, or while the action executes. Do not destroy or overwrite evidence during recovery.
2. Restate the observed and expected behavior, environment, frequency, affected scope, and earliest known occurrence. Establish an unaffected baseline and find the earliest observable divergence between it and the failing path, rather than starting from the final exception.
3. Reproduce the smallest faithful failure. If reproduction is impossible, identify the missing observation and use the strongest available trace without presenting a hypothesis as fact. For flaky failures and performance regressions, record repetitions, random seeds, scheduling or load conditions, environment, and a baseline measurement with its variation before inferring a trend.
4. Generate a short set of falsifiable hypotheses ranked by evidence. Test them with controlled, reversible experiments that change one relevant factor at a time and preserve an outcome record. Prefer representative non-production environments; do not use live users or production data for an experiment without authorization.
5. Trace the causal chain across the relevant boundary and distinguish the precipitating trigger, direct cause, contributing causes, and systemic causes. Identify the first incorrect state or decision supported by the evidence, not merely a symptom or the final exception.
6. For diagnosis-only requests, stop after reporting the supported causal chain, evidence, confidence, and remaining uncertainty. When a fix is requested, make the narrowest root-cause correction and add a regression check that fails before the fix and passes after it where feasible.
7. Check that the correction does not merely suppress errors, weaken validation, or conceal the failure. For flakiness or performance, repeat the relevant measurement enough to compare against the recorded baseline.

Finish when the claimed cause explains the evidence and a targeted change or experiment controls the failure.
