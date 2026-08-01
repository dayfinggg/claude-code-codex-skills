---
name: verify-code-work
description: "Verify that an AI- or agent-produced code change is correct, complete, scoped, and supported by observed evidence. Use after implementation or when asked whether coding work really works. Not for diff-only review, unknown-cause diagnosis, or release readiness."
---

# Verify Code Work

Prove the delivered behavior rather than trusting the implementation, an agent's summary, or a green command in isolation. Use the smallest evidence set that can falsify each material requirement.

Read `references/evidence.md` only when adapting this workflow, resolving a disputed verification practice, or designing an agent-quality gate. Use `$code-review` for a review-only request and `$testing-practices` when test design is substantial.

## Establish the Verification Contract

Identify the requested outcome, acceptance criteria, explicit exclusions, affected contracts, and required environment. Recover them from the user request, issue or specification, active plan, applicable `AGENTS.md`, manifests, CI configuration, and maintained nearby tests. Do not infer the specification from the submitted implementation.

Turn each material requirement and risk into an observable check with an independent oracle. Prefer a specification, invariant, known input and output, real consumer, established test, or verified prior behavior over values copied from the implementation.

Define completion before running checks. Treat a criterion as verified only when applicable evidence was observed after the final relevant edit.

## Pin the Artifact and Baseline

Identify the exact files, working-tree state, branch or commit range, generated files, migrations, fixtures, and configuration under verification. In Git repositories inspect status plus staged, unstaged, and untracked changes. Separate pre-existing user work from the delivered change and never rewrite unrelated work.

Establish the narrowest useful baseline. For a defect, reproduce the original failure or use an existing reproduction artifact when safely available. For new behavior, confirm the previous state lacks the requested outcome when that distinction matters. Do not destructively switch or reset the user's workspace to manufacture a baseline.

## Discover Checks Instead of Guessing

Derive commands from repository guidance, package scripts, task runners, CI, and maintained tests. Confirm the active package, supported runtime, dependencies, services, and credentials. Do not invent a framework, test command, or quality threshold.

Select checks by affected boundary and risk:

1. Run syntax, formatter-check, diagnostics, static analysis, lint, or type checks when applicable.
2. Run the narrowest unit or regression test that exercises the changed behavior.
3. Run integration, contract, migration, build, runtime, UI, accessibility, or end-to-end checks only when the change crosses those boundaries.
4. Exercise material failure, edge, authorization, compatibility, concurrency, cleanup, or data-integrity paths.
5. Use a real model or external service only when deterministic checks cannot establish the required behavior.

Keep nondeterministic or costly checks separate from deterministic checks. Record retries, seeds, model and harness versions, or environmental variance when they can change the conclusion.

## Execute a Bounded Verification Ladder

Run the fastest decisive check first, then expand according to risk. Wait for background work, eventual assertions, service readiness, and cleanup before interpreting results. A started process or open port is not proof that a system is ready.

Capture the exact command, exit status, relevant pass and fail counts, and decisive output. Distinguish a product failure from a harness, dependency, credential, network, or environment failure. Retry only when the failure mode justifies it, and never turn a passing retry into proof that flakiness is fixed.

When a check fails, trace the failure to the changed path before attributing it to the implementation. If fixes are explicitly authorized, apply the smallest supported correction and rerun affected evidence after the final edit. Otherwise report the failure without changing source.

Do not perform deployment, publication, external writes, destructive operations, or privileged network calls as verification without explicit authority. Prefer local, isolated, reversible execution.

## Audit the Evidence

Inspect the final diff separately from command results. Confirm that the change matches the request, important callers and consumers remain compatible, errors and lifecycle paths are handled, and no unrelated scope entered the patch.

Review production code separately from tests, snapshots, fixtures, evaluators, generated artifacts, CI, and configuration. Reject evidence obtained by deleting, skipping, muting, weakening, filtering, hard-coding, snapshot-blessing, test-only production branches, evaluator leakage, or bypassing safeguards.

Confirm that each test reaches the changed production path, would detect the relevant defect, and derives its expected result independently. A clean diff does not prove runtime behavior, and passing tests do not prove uncovered requirements.

Use an independent verification pass only when risk, ambiguity, or impact justifies its extra cost and delegation is authorized. Give the verifier the raw artifact, fixed criteria, and reproducible commands without the intended verdict. Treat the verifier's report as evidence to reproduce, not authority.

## Report a Calibrated Verdict

Map every material criterion to one of `pass`, `fail`, `blocked`, or `not checked`, followed by its strongest observed evidence. Keep the mapping compact and include only decisive output.

Use `verified` only when all material criteria pass after the final relevant edit and the evidence is intact. Use `not verified` when a material criterion fails. Use `inconclusive` when any material criterion is blocked, unavailable, or not checked, and state the exact limitation and strongest remaining evidence.

Report commands actually run, the exact artifact verified, material pre-existing failures, nondeterminism, and residual risk. Never report an unexecuted check as passing or let a polished agent summary substitute for proof.

## Completion Standard

Finish only when the artifact and requirements are pinned, every material criterion has independent observed evidence or an explicit gap, the final diff and evidence integrity have been inspected, applicable checks were rerun after the last edit, and the verdict follows from the evidence.
