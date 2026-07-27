---
name: plan-task
description: "Create an evidence-grounded, decision-complete implementation plan at the smallest useful level of detail. Use when the user explicitly asks to plan, scope, or break down a complex change, or when unresolved product or architecture decisions block safe implementation. Do not use for obvious one-step work, ordinary explanations, execution of an approved plan, or multi-session ticket creation."
---

# Plan Task

Produce the smallest plan that lets a capable implementer begin without rediscovering material context or inventing decisions.

## Respect the Planning Contract

For a plan-only request, work read-only and do not implement. For an implementation request, plan only enough to coordinate dependent work, then continue without ceremonial approval unless a material decision requires the user.

Do not save a plan artifact unless the user requests it or the repository has an authorized convention. Do not convert the plan into tickets unless the user requests independently scheduled work units.

## Choose the Plan Level

Use exactly one level:

1. **No formal plan:** the work is obvious, local, low-risk, and verifiable in one or two actions.
2. **Working plan:** three to seven outcome-oriented steps for a bounded task. Track it in the available plan tool when coordination benefits from visible state.
3. **Execution plan:** durable, self-contained milestones for multi-hour, multi-session, risky, or cross-system work. Use only when requested or required by repository convention.

Read `references/plan-levels.md` before creating an execution plan. Do not impose its ceremony on ordinary work.

When tracking a working plan, keep exactly one step `in_progress`. Mark a completed step immediately after its evidence is available and before starting the next step. Split or revise a step as soon as reality invalidates it; never batch stale status updates at the end.

## Establish Outcome and Evidence

Identify:

1. the observable user or operational outcome;
2. completion criteria;
3. constraints and explicit exclusions;
4. whether the deliverable is only a plan or includes later implementation.

Inspect before asking. Read applicable instructions, relevant code, tests, configuration, contracts, history, and verified commands. Trace the current behavior and the path that must change. Use authoritative external sources only for material current or version-sensitive facts.

Distinguish confirmed facts, safe assumptions, proposals, and open decisions.

## Resolve Only Material Uncertainty

Classify each unknown:

1. **Discoverable:** investigate it with available read-only evidence.
2. **Safe and reversible:** choose the least surprising default and disclose it only when it affects execution.
3. **Material:** ask when the answer changes product behavior, architecture, security, compatibility, data, cost, or another hard-to-reverse outcome.

In explicit Plan mode or a plan-only request, continue until the material decision tree is closed. Resolve parent decisions before their dependent branches. Ask focused questions with evidence and a recommended default. Stop when only discoverable implementation details, reversible choices, explicit exclusions, or intentionally delegated decisions remain.

Do not ask for facts available in the workspace. Do not confuse a plausible approach with a decision-complete plan.

## Select the Smallest Complete Approach

Choose an approach that:

1. covers every completion criterion;
2. fits the existing architecture and vocabulary;
3. reuses proven components before adding abstractions;
4. preserves compatibility unless a deliberate break is settled;
5. addresses only relevant data, security, performance, migration, rollout, and recovery risks;
6. excludes unrelated cleanup and speculative future work.

Compare alternatives only when the choice is consequential or hard to reverse. Record the deciding trade-off rather than a catalog of options.

## Build the Dependency Graph

Decompose by independently verifiable outcomes, not by files or technical layers. Each step must state:

1. the observable result;
2. verified components, paths, or interfaces involved;
3. the necessary change and why;
4. the evidence that proves completion;
5. genuine blockers or dependencies.

Place uncertainty-reducing work first. Prefer vertical slices that leave the system in a coherent, verifiable state. Use expand-migrate-contract stages when a wide compatibility change cannot remain green as one slice.

Mark work parallelizable only when its evidence or writes are independent. Planning may identify lanes and ownership boundaries, but agent selection and orchestration belong to `delegate-work` when delegation is explicitly authorized.

## Design Verification with the Work

Map every completion criterion to at least one observed check. Prefer repository-native tests, types, lint, builds, schema validation, runtime paths, visual checks, benchmarks, or migration rehearsals according to the risk.

Verify existing commands and paths before naming them. Mark proposed artifacts clearly. State expected evidence rather than “test as needed.”

## Audit and Present

Before presenting, verify that:

1. every requirement and material risk is covered;
2. every step produces useful evidence;
3. ordering follows real dependencies;
4. referenced existing locations and commands are verified;
5. assumptions, exclusions, and unresolved decisions are visible;
6. no scope expansion, placeholder decision, or invented estimate remains.

For an ordinary response, start with one concise paragraph and use a numbered list for the plan. Use a compact table only when several steps need the same columns for locations, verification, or dependencies. Do not add headings, subheadings, empty sections, or status narration.

For a persistent execution plan, follow the repository template or `references/plan-levels.md`.

## Completion Standard

Finish only when the selected plan level matches the task, material decisions are settled, dependencies and verification are explicit, and tracked status can remain accurate throughout execution.
