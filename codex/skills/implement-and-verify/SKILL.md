---
name: implement-and-verify
description: Deliver an approved scoped change and map its acceptance criteria to implementation and observed evidence. Use for criterion-driven implementation; skip review-only, planning-only, and unresolved product decisions.
---

# Implement and Verify

1. Read the applicable repository instructions, approved requirement, nearby code and tests, relevant configuration, and the versions that affect the requested behavior. Consult current official documentation when behavior, APIs, or version-specific rules may have changed.
2. Before editing, create a criterion-to-evidence map. For each acceptance criterion, record the expected outcome, implementation location, verification method or artifact, and final result. Surface a blocking contradiction, missing decision, or unverifiable criterion before editing. Do not treat the presence of code as verification evidence.
3. Determine whether compatibility, release, migration, or rollback planning is relevant. Apply compatibility analysis only to public, consumer-facing, protocol, persisted-data, or supported-environment changes. Plan release only when delivery or operational behavior changes. Plan a migration only for state, schema, or format transitions. Define rollback or recovery only when a change can be deployed, is irreversible, or can affect live data or users. For every applicable case, place the plan and its verification evidence in the map; otherwise do not add speculative process.
4. Implement the smallest coherent change that addresses the root requirement and preserves established architecture and applicable compatibility. Complete all in-scope paths; report a blocker instead of inserting a substitute implementation.
5. Add or update focused tests when the repository has an appropriate pattern. Validate boundary cases, failure behavior, security-sensitive inputs, resource handling, and concurrency only where relevant.
6. Run the narrowest useful formatter, static analysis, type check, test, build, and user-visible verification available, then broaden according to the mapped risk. Record commands, artifacts, and any constraints in the map.
7. Compare the final state and resulting diff against every acceptance criterion. Update the map so each criterion has both implementation and verification evidence, or an explicit external blocker.

Finish only when each criterion has implementation evidence and verification evidence, or is explicitly blocked by an external condition.
