---
name: improve-codebase-architecture
description: Assess a codebase for evidence-backed architectural improvements and rank bounded candidates before implementation. Use for an architecture audit or health review, to locate structural bottlenecks, or when repeated change friction spans multiple modules and the boundary to change has not yet been chosen. Do not use for a known interface or seam, an ordinary diff review, or planning or implementing an already selected refactor.
---

# Improve Codebase Architecture

Find the smallest architectural changes that would make important future work
safer and cheaper. Diagnose before designing and stop before implementation.

## Respect the Assessment Contract

- Work read-only unless the user explicitly asks to implement a selected change.
- Produce candidates, evidence, and a recommendation. Do not silently begin a
  refactor, create architecture documents, or rewrite domain terminology.
- Keep the main agent responsible for scope, synthesis, and the final
  recommendation.
- Use `codebase-design` after a specific module boundary or interface is chosen.
- Use `plan-task` when the selected change needs an execution-ready migration
  plan.

## Choose the Review Surface

Use the user's named module, subsystem, pain point, or change direction when one
exists.

Otherwise, identify likely change pressure from repository evidence:

- recent history and repeatedly changed paths;
- defect-prone or rollback-prone areas;
- features that require edits across many unrelated files;
- duplicated invariants or policy;
- tests that must reach through several layers;
- architecture records, ownership boundaries, and active roadmap work.

Do not equate age, file size, dependency count, or unfamiliar style with an
architectural problem. Widen the scan only when the initial evidence does not
identify a useful surface.

## Explore the Current Design

Read applicable instructions, architecture records, domain documentation,
tests, public interfaces, callers, dependencies, and recent relevant changes.
Trace representative behavior end to end.

For a broad codebase, delegate independent read-only areas to explorers when
parallel investigation will reduce context noise. Give each explorer a
non-overlapping scope and require file-level evidence. Do not ask several agents
to repeat the same scan.

Look for concrete friction:

- understanding one behavior requires bouncing across many shallow modules;
- callers reconstruct policy that should be hidden;
- one invariant or failure policy is duplicated across boundaries;
- an interface exposes ordering, configuration, or provider details callers do
  not naturally own;
- related changes and defects repeatedly scatter across the same paths;
- testing important behavior requires internal access or excessive mocking;
- a dependency direction forces unrelated modules to change together;
- a temporary adapter or parallel implementation has become permanent.

Apply the deletion test to suspected shallow modules: if deletion merely moves
their complexity into callers, the module may concentrate useful knowledge; if
the complexity disappears, it may be pass-through structure.

## Build Bounded Candidates

Keep only candidates supported by current pain or credible near-term change.
Reject speculative platform work, universal abstractions, technology-driven
rewrites, and microservice extraction without operational evidence.

For each candidate, state:

- affected files, modules, callers, and tests;
- observed friction and the evidence establishing it;
- the responsibility that should become more local;
- the likely deepened module or corrected dependency direction;
- complexity that would be hidden from callers;
- compatibility, migration, performance, and operational implications;
- how verification would improve;
- recommendation strength: `Strong`, `Worth exploring`, or `Speculative`.

Do not finalize a new interface during this assessment. Describe the direction
only far enough to compare candidates honestly.

## Compare and Present

Rank no more than three useful candidates. Prefer fewer strong candidates over a
catalog of code smells.

Lead with the top recommendation and explain why it has the best combination of
change pressure, leverage, locality, safety, and bounded migration cost. Use a
small before-and-after diagram only when relationships are materially clearer
than prose. Do not create an HTML report unless the user requests an artifact
or the number of candidates genuinely requires an interactive comparison.

After presenting the assessment, ask which candidate to develop only when the
user has not already selected one. Ask one material decision at a time and
continue from discoverable repository evidence instead of conducting an
unbounded interview.

## Completion Standard

Finish only when every candidate is tied to repository evidence, speculative
ideas are labeled or removed, the top recommendation is explicit, and the next
step can proceed through `codebase-design` or `plan-task` without rescanning the
entire codebase.
