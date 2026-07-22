# Planning patterns

## Choose the smallest plan

| Situation | Planning artifact |
| --- | --- |
| Small, low-risk, known change | Short ordered checklist with one acceptance check |
| Uncertain defect | Reproduction, ranked hypotheses, discriminating experiments, stop condition |
| Material architecture decision | Quality scenarios, options, tradeoffs, decision, validation, reversal conditions |
| Cross-boundary implementation | Dependency graph, vertical milestones, contracts, owners, merge gates |
| Data or infrastructure change | Rehearsal, compatibility window, backup/recovery, rollout, rollback, cleanup |
| Multi-release outcome | Roadmap with status, dependencies, decision points, risks, and evidence |

Do not expand a checklist into a roadmap merely to appear thorough.

## Define vertical milestones

Each milestone must deliver a behavior, validated contract, usable capability, migration state, or decision. Include:

- prerequisites and inputs;
- owned files, components, services, or data;
- output and affected consumers;
- acceptance evidence;
- rollout or integration point;
- stop condition and recovery path.

Prefer slices that cross the necessary layers and can be verified. Avoid separate frontend, backend, database, and test phases that produce no usable result until the end.

## Estimate without false precision

- Estimate only when it supports a staffing, sequencing, scope, or deadline decision.
- Break work into evidence-backed units and include discovery, review, integration, tests, migration, rollout, and rework—not only coding.
- State assumptions, dependencies, team capacity, calendar constraints, and confidence.
- Use a range or scenarios when uncertainty is material. Keep unknown external decisions separate from execution estimates.
- Identify the critical path and slack; adding parallel workers does not shorten serialized decisions or shared-state work.
- Re-estimate after high-impact unknowns are resolved. Do not preserve an obsolete number for consistency.

Historical throughput can inform a forecast only when work type, team, definition of done, and environment are comparable. Do not treat story points as time or compare them across teams.

## Record a decision

For a durable, costly-to-reverse choice, capture:

- status, date, decision owner, and affected scope;
- context, constraints, and quality scenarios;
- options, including the current or simpler path;
- selected option and why alternatives lose;
- positive and negative consequences;
- validation, rollout, rollback, and review triggers;
- superseded or superseding records.

Keep the plan linked to the decision rather than duplicating its rationale.

## Maintain a risk register

For each material risk record:

- cause, event, and consequence;
- likelihood and impact with the scale used;
- owner;
- prevention or reduction action;
- early detection signal;
- contingency and trigger;
- residual risk and decision deadline.

Do not list generic risks without detection or action. Treat an unresolved assumption as a risk only when its failure matters.

## Maintain a roadmap

- Define the observable outcome and non-goals.
- Use workstreams or capability increments, not a date-only feature list.
- Keep status vocabulary explicit and evidence-based.
- Show dependencies, decision gates, external commitments, and cleanup.
- Separate target dates from confidence and hard deadlines.
- Mark complete only after the acceptance evidence exists.
- Supersede or archive stale roadmaps and link the replacement.

Use Scrum, Kanban, stage gates, or another delivery framework only when the team actually follows it. Do not borrow its terminology without its accountabilities and decision rules.
