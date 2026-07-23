---
name: diagnosing-bugs
description: Diagnose and fix difficult defects, regressions, intermittent failures, crashes, and performance problems through a reproducible evidence loop. Use when software is broken, failing, flaky, unexpectedly slow, or when the user asks to debug, diagnose, find a root cause, or repair a non-obvious bug. Do not use for obvious local corrections, feature development without a defect, or speculative architecture review.
---

# Diagnose Bugs

Find and prove the root cause before changing production behavior. Drive the investigation with the fastest reliable signal that exercises the reported symptom.

## Respect the Diagnostic Contract

- For a diagnosis-only request, work read-only apart from temporary diagnostic artifacts and report the proven cause without implementing a fix.
- For a fix request, continue through the smallest root-cause correction, regression coverage, and verification.
- Preserve unrelated user changes and avoid broad refactoring during diagnosis.
- Keep temporary instrumentation easy to identify and remove it before completion.
- Do not confuse correlation, a silenced symptom, or a passing retry with a root cause.

## Establish the Exact Symptom

Determine:

- the expected and observed behavior;
- the affected environment, version, inputs, and frequency;
- the last known-good state when available;
- the precise user-visible failure or performance threshold;
- the existing commands, tests, logs, traces, and recent changes relevant to the path.

Inspect the repository and runtime before asking the user. Ask only for information or access that cannot be discovered safely.

## Build a Red-Capable Loop

Create the narrowest command that exercises the actual failing path and produces an unambiguous pass or fail signal. Prefer, in order of fit:

- an existing focused test;
- a new regression test;
- a CLI or API invocation;
- a minimal browser or integration flow;
- a replayed trace or fixture;
- a benchmark with a defined threshold;
- a temporary harness;
- an automated version or commit bisection.

Run the loop before forming a detailed theory. Confirm that it fails for the reported symptom rather than a setup error or nearby defect.

Make the loop:

- deterministic when possible;
- fast enough to run repeatedly;
- independent of unnecessary services and state;
- explicit about inputs, output, exit status, and timing.

For intermittent failures, increase the reproduction rate through repetition, controlled concurrency, stress, or captured state. Record the observed rate and do not call a flaky run fixed after one pass.

If no executable reproduction is possible, document the exact evidence gap and use the strongest available observation. Do not overstate confidence.

## Minimize the Failure

Remove unrelated inputs, components, timing, and environmental variation while preserving the symptom. Trace the data and control flow across the smallest set of boundaries that can explain it.

Use characterization tests when legacy behavior must be understood before it can be changed. Compare against a known-good version, environment, or implementation when that produces a stronger signal.

## Test Ranked Hypotheses

Maintain a short ranked list of falsifiable hypotheses. For each hypothesis, state:

- the mechanism that would produce the exact symptom;
- the evidence already supporting or contradicting it;
- the smallest observation or experiment that can disprove it.

Test one meaningful variable at a time. Prefer boundary observations, assertions, traces, counters, and targeted state inspection over broad logging.

Tag temporary diagnostics distinctly so they can be found and removed. Do not retain sensitive values in logs or artifacts.

Revise the ranking after every result. Reject disproven hypotheses explicitly and avoid returning to them without new evidence.

## Prove the Root Cause

Require a causal explanation that connects:

1. the triggering condition;
2. the incorrect state transition or computation;
3. the observed symptom;
4. the evidence that isolates this mechanism from alternatives.

When practical, demonstrate that controlling the causal condition predictably turns the failure off and back on. Do not start a production fix until the evidence supports the mechanism.

## Implement the Smallest Complete Fix

- Correct the causal mechanism rather than suppressing its output.
- Preserve public behavior and compatibility outside the requested correction.
- Avoid retries, sleeps, broad exception handling, weakened assertions, or raised limits unless evidence shows they are the correct design.
- Add or update a regression test that fails before the fix and passes after it when the repository has an appropriate test surface.
- Apply the active TDD workflow for the regression cycle when available.
- Keep cleanup and unrelated architectural improvements out of the fix.

For a performance defect, compare equivalent workloads with repeated measurements, account for warm-up and variance, and report both baseline and corrected results.

## Verify and Clean Up

Run the focused reproduction first, then expand to relevant tests, type checks, linters, builds, and realistic runtime checks in proportion to risk.

Confirm:

- the original symptom no longer reproduces under the same conditions;
- the regression test detects the unfixed behavior;
- important neighboring behavior remains intact;
- intermittent or performance results meet the defined confidence threshold;
- all temporary instrumentation and artifacts are removed;
- the final diff contains only the intended correction and coverage.

## Present Diagnostic Evidence

For diagnosis-only work, report:

- the reproduced symptom and command;
- the proven root cause and causal evidence;
- rejected material hypotheses when useful;
- the smallest recommended correction;
- remaining uncertainty or unavailable verification.

For completed fixes, follow the active final-report instructions and include the reproduction and verification evidence.

## Completion Standard

Finish only when the reported symptom is tied to a demonstrated causal mechanism and the requested fix, if any, is covered by evidence that would fail on the original defect.
