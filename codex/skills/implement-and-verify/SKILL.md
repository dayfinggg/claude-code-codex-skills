---
name: implement-and-verify
description: Implement an approved specification, ticket, or explicit production change and prove its acceptance criteria. Use for scoped coding work that requires repository inspection, current technical documentation, complete implementation, and proportionate validation; do not use for review-only requests.
---

# Implement and Verify

1. Read applicable repository instructions, the approved requirement, nearby code, tests, configuration, and versions in use. Consult current official documentation when behavior or APIs may have changed.
2. Map each acceptance criterion to an implementation point and a verification method. Surface a blocking contradiction before editing.
3. Implement the smallest coherent change that addresses the root requirement and preserves established architecture and compatibility. Complete all in-scope paths; report a blocker instead of inserting a substitute implementation.
4. Add or update focused tests when the repository has an appropriate pattern. Validate boundary cases, failure behavior, security-sensitive inputs, resource handling, and concurrency only where relevant.
5. Run the narrowest useful formatter, static analysis, type check, test, build, and user-visible verification available, then broaden according to risk.
6. Compare the final state against every acceptance criterion and inspect the resulting diff for unintended changes.

Finish only when each criterion has implementation evidence and verification evidence, or is explicitly blocked by an external condition.
