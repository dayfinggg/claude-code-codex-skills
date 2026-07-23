---
name: code-review
description: Review a branch, pull request, commit range, or working-tree diff for correctness, regressions, security, performance, repository standards, and fidelity to the originating requirements. Use when the user asks for code review, diff review, PR review, pre-merge inspection, validation of changes since a fixed point, or after a substantive implementation needs its final quality gate. Do not use when there is no code change to inspect or when the request is only to implement an already reviewed fix.
---

# Code Review

Review the exact change against two independent questions: whether it is built correctly and whether it builds the requested thing.

## Respect the Review Contract

- Treat a review-only request as read-only. Do not modify code, resolve findings, or change repository state.
- When the user explicitly requests review and fixes, complete the evidence-based review first, then correct supported findings and verify the result.
- Review only the requested diff and directly affected behavior. Do not turn the review into a general codebase audit.
- Preserve the distinction between repository standards and product requirements.

## Pin the Review Scope

Resolve and verify the fixed point before reviewing:

- the merge base, branch, commit, tag, or working-tree state;
- committed, staged, unstaged, and untracked changes in scope;
- generated, vendored, lock, schema, and migration files affected by the change.

Fail clearly on an invalid base or empty diff. Do not silently substitute a different comparison.

Read the full relevant diff and enough surrounding code to understand runtime behavior. Trace changed interfaces to important callers, consumers, tests, configuration, and data boundaries.

## Gather the Standards Evidence

Collect the instruction and convention sources that govern the changed files:

- applicable `AGENTS.md` and override files;
- contribution, architecture, security, and style guidance;
- formatter, linter, compiler, test, and build configuration;
- established patterns in nearby maintained code;
- compatibility requirements from manifests and lockfiles.

Repository rules override generic preferences. Leave mechanically enforceable formatting to the project's tooling unless it causes a functional issue.

## Gather the Specification Evidence

Locate the source of intent:

- the user's request and accepted clarifications;
- the active plan;
- an issue, specification, PR description, acceptance criteria, ADR, or migration document;
- tests that encode established public behavior.

If no specification exists, state that the specification axis cannot be completed. Do not infer requirements from the implementation under review.

## Review the Standards Axis

Look for actionable defects in:

- correctness and failure handling;
- data integrity and compatibility;
- security, authorization, privacy, and secret handling;
- concurrency, lifecycle, resource ownership, and cleanup;
- performance when the changed path or evidence makes it relevant;
- public API and migration safety;
- test quality and observability;
- maintainability where complexity creates a concrete defect or regression risk;
- compliance with applicable repository instructions.

Treat code smells as prompts for investigation, not automatic violations. Do not report personal style preferences.
Apply the active codebase-design vocabulary only when the diff creates concrete boundary, locality, or test-surface problems.

## Review the Specification Axis

Map each requirement and acceptance criterion to the implemented behavior and evidence. Check for:

- missing or only partially implemented requirements;
- behavior that contradicts the requested outcome;
- scope added without authorization;
- unsupported assumptions;
- omitted edge cases explicitly required by the specification;
- changes that pass tests while solving the wrong problem.

Keep these findings separate from standards findings even when they point to the same line.

## Validate Every Finding

Before reporting a finding:

- cite the exact file and narrowest useful line range;
- explain the causal path from the code to the user-visible or operational impact;
- verify the surrounding code does not already handle the case;
- use focused tests or read-only experiments when they materially increase confidence;
- assign severity from impact and likelihood, not stylistic preference;
- propose the smallest direction for remediation without implementing it.

Use priorities consistently:

- **P0:** immediate catastrophic or broadly exploitable failure;
- **P1:** serious defect likely to block release or cause data, security, or major functional harm;
- **P2:** real correctness or reliability defect with bounded impact;
- **P3:** lower-impact issue worth correcting but not release-blocking.

Exclude speculative, non-actionable, and already-covered concerns. Do not inflate the finding count.

## Inspect Verification Quality

Confirm that tests and checks:

- exercise the changed production path;
- would fail on the relevant regression;
- cover required success and failure behavior;
- avoid tautological expected values and excessive implementation coupling;
- were actually executed when the review claims rely on their results.

Do not assume passing CI proves requirements coverage.

## Present Findings First

Report actionable findings first, ordered by priority and then by file location. For each finding include:

- priority and concise title;
- file and line;
- violated standard or requirement;
- causal explanation and impact;
- evidence and focused remediation direction.

Then state material assumptions, unanswered questions, and residual verification gaps. End with a brief overall assessment.

If there are no actionable findings, say so directly and mention only material residual risks or unverified areas.

## Completion Standard

Finish only when the entire scoped diff has been inspected, both available review axes have been evaluated independently, and every reported finding is grounded in a specific code path and source of expected behavior.
