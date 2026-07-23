---
name: plan-task
description: Create evidence-grounded, decision-complete implementation plans for complex coding and technical tasks. Use when the user asks to plan, scope, design an approach, break down a multi-step change, prepare an implementation plan, or when material ambiguity and dependencies should be resolved before coding. Do not use for simple single-step work, ordinary explanations, or execution of an already approved and complete plan.
---

# Plan Task

Produce the smallest plan that another capable engineer or agent can execute without rediscovering important context or inventing missing decisions.

## Respect the Planning Contract

- When the requested deliverable is only a plan, analysis, or design, work read-only. Do not edit source files, run mutating commands, or implement the change.
- If planning is an internal stage of an implementation request, prepare the plan and continue execution without requesting approval unless a material decision requires the user.
- Do not save a plan file unless the user asks for one or the repository has an established, authorized convention for persistent plans.
- Skip formal planning when the task is obvious, local, low-risk, and verifiable in one or two actions.
- Scale the plan to the work: use a short checklist for bounded changes and milestones with dependencies for large or cross-cutting work.
- Do not narrate routine inspection. Report only findings that affect the plan or require a decision.

## Build the Plan

### 1. Establish the Outcome

Determine:

- the user-visible or operational outcome;
- the completion criteria;
- the constraints and explicit exclusions;
- whether the user wants only a plan or expects implementation afterward.

Restate the outcome only when doing so removes ambiguity. Do not turn the request into a larger project.

### 2. Inspect Before Asking

Gather enough evidence to understand the current system:

- read the applicable instruction hierarchy and repository documentation;
- inspect relevant code, tests, configuration, schemas, interfaces, and recent history;
- trace the current behavior and the data or control flow that must change;
- identify existing patterns, abstractions, and verification commands;
- record exact file paths and symbols that anchor the plan;
- consult authoritative external documentation only when behavior is version-dependent, unfamiliar, or not established locally.

Prefer repository evidence over memory. Distinguish confirmed facts from assumptions and proposals.
Apply the active research workflow when external evidence materially affects the design.

### 3. Resolve Uncertainty

Classify each important unknown:

- **Discoverable:** investigate it with available read-only tools.
- **Safe and reversible:** choose the least surprising default and state the assumption if it affects execution.
- **Material:** ask the user when the answer changes product behavior, architecture, security, data compatibility, cost, or another hard-to-reverse outcome.

When planning is an internal stage of an implementation request, ask only questions that block a sound plan. Choose safe defaults and continue autonomously.

When the user explicitly requests Plan mode or asks only for a plan, interview them until both sides share a decision-complete understanding:

- walk the design tree from the desired outcome through every material dependent decision;
- surface unstated choices about behavior, scope, interfaces, compatibility, failure handling, and acceptance criteria;
- resolve parent decisions before following the branches they create;
- pursue newly exposed questions after each answer instead of stopping at the first plausible design;
- challenge contradictions and vague requirements with concrete evidence from the workspace;
- ask focused questions one decision at a time, or in a small group only when their answers are independent;
- include the relevant evidence and recommend a default when possible;
- stop only when the remaining unknowns are discoverable implementation details, safe reversible choices, explicit exclusions, or decisions the user has deliberately delegated.

Never ask the user for information that can be found in the workspace. Do not produce the final plan merely because a plausible approach exists; produce it when the material design tree has been resolved.

### 4. Choose the Smallest Complete Design

Define an approach that:

- satisfies every completion criterion;
- follows the existing architecture and conventions;
- reuses proven components before adding abstractions;
- preserves compatibility unless a deliberate break is required;
- accounts for relevant data, API, security, performance, migration, and rollback concerns;
- excludes speculative improvements unrelated to the requested outcome.

Mention alternatives only when the trade-off is material. State why the selected approach fits the evidence and constraints.
Apply the active codebase-design workflow when the plan introduces or materially changes a module interface or seam.

### 5. Decompose by Verifiable Outcomes

Create ordered steps that each describe:

1. the observable outcome of the step;
2. the exact files, symbols, or components involved;
3. the required change and its reason;
4. the verification that proves the step works;
5. any dependency on an earlier step.

Prefer vertical slices that deliver coherent behavior over layers of generic activity. Place uncertainty-reducing work early. Mark independent steps as parallelizable only when they do not modify overlapping state or depend on each other's results.

For work too large for one focused execution:

- group steps into meaningful milestones;
- identify dependency and decision checkpoints;
- specify what must be true before the next milestone starts;
- recommend a persistent execution plan only when continuity across sessions materially helps.

### 6. Design Verification with the Change

Include proportionate verification:

- establish a baseline when existing behavior or failures matter;
- map each completion criterion to at least one check;
- prefer the repository's real tests, linters, type checks, builds, and runtime checks;
- add targeted manual or integration checks when automation cannot prove the behavior;
- include failure paths, boundary cases, compatibility, security, or performance checks only when relevant;
- state expected evidence, not merely “test the change.”

Do not claim that a command, path, dependency, or test exists unless it was verified. Label proposed new files and commands clearly.

### 7. Audit the Plan

Before presenting the plan, confirm:

- every requirement is covered by a step and a verification;
- every step supports a requirement or necessary risk reduction;
- the order respects dependencies;
- referenced existing paths and symbols were verified;
- required work is separated from optional follow-up;
- assumptions and unresolved decisions are visible;
- the plan contains no hidden scope expansion, placeholder decisions, or vague steps such as “update as needed”;
- a fresh implementer could begin without repeating the investigation.

Revise the plan until these checks pass.

## Present the Result

Start with one concise paragraph stating the target outcome and selected approach.

For a bounded task, use a numbered plan. For a task with several exact mappings or dependencies, use this compact table:

| Step | Outcome and change | Location | Verification | Depends on |
|---|---|---|---|---|

Add only the sections that contain useful information:

- **Scope:** boundaries and explicit exclusions.
- **Evidence:** decisive repository or documentation findings.
- **Decisions and assumptions:** choices the implementer must preserve.
- **Risks:** material failure modes and mitigations.
- **Open decision:** a genuinely blocking user choice.

Keep the result concise but decision-complete. Do not include implementation code, generic advice, empty sections, invented estimates, or status prose.

## Completion Standard

Finish only when the plan is grounded in inspected evidence, ordered by dependencies, explicit about material decisions, and paired with checks that can demonstrate completion.
