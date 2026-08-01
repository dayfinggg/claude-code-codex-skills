---
name: review-changes
description: Review a diff, pull request, patch, or completed implementation for material defects and unmet requirements. Use when the user asks for code review, implementation review, risk assessment, or pre-merge validation; remain read-only unless fixes are explicitly requested.
---

# Review Changes

1. Establish the intended behavior from the request, specification, issue, and repository rules. Inspect the diff and enough surrounding code to understand changed contracts and callers.
2. Verify behavior rather than style preference. Examine correctness, missing cases, data integrity, security, error handling, compatibility, concurrency, performance, accessibility, migrations, and tests only where the change makes them relevant.
3. Prove each finding with a concrete execution path, violated invariant, authoritative requirement, or reproducible check. Do not report speculative defects without a plausible triggering condition.
4. Prioritize findings by impact and likelihood. For each finding, give the precise location, cause, consequence, and smallest useful remediation direction.
5. Check acceptance criteria and validation results separately from defect discovery. Mention residual testing gaps that materially reduce confidence.
6. Report explicitly when no material findings remain. Keep summaries subordinate to findings.

Finish when every changed behavior and affected boundary has been considered and every reported issue is actionable and evidence-backed.
