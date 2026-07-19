# Roadmaps and delegation packets

## Roadmap structure

Include only sections that support execution:

1. Outcome: observable user, system, or operational result.
2. Non-goals: nearby work explicitly excluded.
3. Current evidence: repository state, metrics, incidents, decisions, and material unknowns.
4. Workstreams or milestones: independently verifiable capability increments, not vague phases.
5. Dependencies and ordering: prerequisites, external decisions, migrations, and critical path.
6. Status vocabulary: for example proposed, ready, active, blocked, verified, complete, superseded.
7. Risks and decision points: likelihood, impact, owner, mitigation, trigger, and reversal path.
8. Validation: checks and evidence required at each milestone.
9. Rollout and rollback: compatibility, observation window, stop conditions, and cleanup.
10. Completion: explicit acceptance criteria and where final evidence is recorded.

Use dates only when they are commitments or decision constraints. Do not turn guesses into precise estimates. Name an owner only from repository or user evidence.

## Status rules

- Update status from observed artifacts and check output, not narrative confidence.
- Mark blocked only with the concrete unresolved dependency and owner or decision path.
- Mark complete only when acceptance criteria and required validation are satisfied.
- Keep partial completion visible; do not collapse several workstreams into one optimistic percentage.
- Archive or mark superseded plans and link the replacement so readers do not execute stale work.

## Delegation packet

Give another person or agent:

- Objective and observable completion criteria.
- Exact repository/worktree, starting revision when relevant, and scoped inputs.
- Exclusive file, component, issue, service, or data ownership.
- Forbidden actions: unrelated edits, remote writes, production changes, dependency upgrades, destructive operations, or overlapping files as applicable.
- Required skills, repository instructions, source versions, and authoritative references.
- Constraints and contracts that must remain compatible.
- Expected output: changed files, analysis, artifact, patch, or evidence.
- Required checks with exact commands or discovery method.
- Evidence format: diff, command exit status, logs with secrets removed, screenshots, benchmark, or test report.
- Merge point: who owns integration, conflict resolution, final verification, and any follow-up.

Make the packet bounded enough to execute independently. Do not delegate a decision the parent must own without giving decision criteria.

## Parallel-work rules

- Give concurrent workers disjoint files or read-only responsibilities.
- Do not assign concurrent writes to shared lockfiles, schemas, migrations, generated indexes, or deployment state.
- State whether workers may create files, change dependencies, run network operations, or touch external systems.
- Require workers to preserve unrelated work and inspect scoped instructions.
- Have the integrator validate combined behavior; passing isolated checks does not prove the merge.

## Task evidence table

| Item | Record |
| --- | --- |
| Scope | Owned files/components and explicit exclusions |
| Inputs | Paths, issue, schema, source version, environment |
| Decision | Choice made, criteria, and unresolved assumptions |
| Changes | Exact artifacts changed |
| Checks | Command/tool, exit status, relevant result |
| Gaps | Unavailable environment, flaky or unrelated failure, residual risk |
| Merge | Integration owner, conflicts, follow-up, final acceptance |

Keep sensitive logs and credentials out of packets. Link to access-controlled evidence rather than copying it.

## Review questions

- Can a worker start without guessing repository, scope, or expected output?
- Are write ownership and forbidden side effects unambiguous?
- Can completion be verified without trusting a prose assertion?
- Are external or irreversible actions separately authorized?
- Does the packet preserve public contracts and unrelated work?
- Does one owner remain responsible for integration and final acceptance?
