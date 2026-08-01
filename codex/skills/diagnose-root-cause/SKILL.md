---
name: diagnose-root-cause
description: Reproduce and isolate the root cause of bugs, regressions, flaky behavior, failures, or unexpected performance. Use when the cause is uncertain and evidence must distinguish symptoms from causes; do not use for straightforward changes with a known cause.
---

# Diagnose Root Cause

1. Restate the observed behavior, expected behavior, environment, frequency, and earliest known occurrence. Preserve logs, errors, inputs, and versions as evidence.
2. Reproduce the smallest faithful failure. If reproduction is impossible, identify the missing observation and use the strongest available trace without presenting a hypothesis as fact.
3. Generate a short set of falsifiable hypotheses ranked by evidence. Run the cheapest discriminating check for each and update the ranking after every result.
4. Minimize the failing case and trace the causal chain across the relevant boundary. Identify the first incorrect state or decision, not merely the final exception.
5. For diagnosis-only requests, stop after reporting the supported cause and evidence. When a fix is requested, make the narrowest root-cause correction and add a regression check that fails before the fix and passes after it where feasible.
6. Check that the correction does not merely suppress errors, weaken validation, or conceal the failure.

Finish when the claimed cause explains the evidence and a targeted change or experiment controls the failure.
