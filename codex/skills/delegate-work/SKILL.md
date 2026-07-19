---
name: delegate-work
description: Coordinate Codex subagents, parallel task packets, and issue or pull-request workflows. Use when active instructions permit delegation or the user asks for agents, tasks, issues, or PRs; not for tightly coupled single-agent work.
---

# Delegate Work

Delegate to reduce wall-clock time, isolate noisy context, or obtain specialized evidence. Do not delegate to avoid responsibility or to add ceremony.

Read [sources.md](references/sources.md) before relying on vendor-specific orchestration, handoff, issue, or pull-request behavior. Treat the live collaboration and connector tool schemas as authoritative for this runtime; the OpenAI Agents SDK sources describe transferable orchestration patterns, not Codex tool guarantees.

## Authorization Gate

- Start subagents only when active runtime, project, skill, or user instructions permit delegation.
- Treat a request to draft a task, issue, or PR as local artifact work. Treat a request to create, publish, submit, comment, assign, label, push, or open one as authorization for that exact external write only.

## Delegation Decision

Delegate only when all are true:

- The work has independent, bounded streams or needs a genuinely specialized review.
- Each stream has a clear deliverable and can return a distilled result.
- Coordination cost and duplicate context are lower than the expected benefit.
- Write ownership can be made disjoint or serialized.

Prefer read-heavy delegation for exploration, research, test analysis, security review, bug review, and log triage. Keep urgent blocking discovery local when the next step depends on it.

## Role Routing

Use the global role router and verify availability rather than inventing an agent name. Use the built-in fallback only when no custom role fits; one agent owns one zone.

## Model And Effort Routing

Choose responsibility first. The configured intent is:

- `gpt-5.6-sol` with `high`: planning, correctness, security, implementation, and verification specialists.
- `gpt-5.6-terra` with `medium`: codebase analysis and external research.
- `gpt-5.6-luna` with `medium`: `bulk-scanner` for high-volume deterministic processing with a fixed schema and independent verification.

Treat these as effective only when the runtime exposes and confirms profile or model routing. `task_name` is a label unless its schema says otherwise; if no selector exists, assume the child may inherit the parent and do not claim savings from the TOML. Do not simulate effort with prompt phrases. Change defaults only after representative evaluations show better success, evidence, latency, and cost.

Do not give Luna architecture, security, correctness, planning, integration, or acceptance authority. Escalate ambiguity, conflict, high impact, or material judgment to the matching Terra or Sol role.

## Build The Work Graph

1. Define the final acceptance criteria and integration owner.
2. Split work by independent output, not by arbitrary file count.
3. Record dependencies and the critical path.
4. Run independent read-only work in parallel.
5. Serialize decisions and shared-state writes behind explicit merge gates.
6. Reserve capacity for integration and verification; do not occupy every slot with optional work.
7. Fork no history or the smallest sufficient bounded history by default; use full history only when essential.

## Task Packet

Every delegated prompt must include the information needed to succeed without hidden context:

```md
Role: One narrow responsibility.
Objective: One observable outcome.
Inputs: Exact files, artifacts, links, errors, or prior decisions.
Required skills: Skills that must be activated before substantive work.
Scope: In-scope behavior and allowed files or systems.
Forbidden: Files, actions, side effects, and adjacent work that must remain untouched.
Dependencies: Upstream facts and downstream consumers.
Deliverable: Required result shape and language.
Evidence: File and line references, sources, command output, or test results required.
Validation: Exact checks when known and fallback evidence when they cannot run.
Stop conditions: Ambiguity, safety boundary, conflict, or failure that must return to the parent.
Merge point: What the parent will integrate and when.
```

Ask for summaries, not raw logs. Preserve exact identifiers and user-facing text, but keep private coordination in English.

## Write Ownership

- Assign every writable file or stateful system to one agent at a time.
- Never parallelize edits to the same file, migration chain, lockfile, generated artifact, deployment target, branch, or shared external record.
- If discovery changes the intended design, stop downstream writers and revise packets before continuing.
- The main task owns cross-agent decisions, conflict resolution, final diff review, and end-to-end validation.

## Waiting And Integration

- Collect every required result, check claims against artifacts and tool output, resolve conflicts by evidence, and validate the integrated result against the original request.
- If the user changes scope, interrupt or redirect work that would now conflict; do not let stale writers continue against shared state.
- Treat a child status, summary, or model claim as evidence to inspect, not proof of completion. The parent remains responsible for the final diff, contract, checks, and user-facing statement.

## Issues And Pull Requests

Use the GitHub connector when installed and authorized. Otherwise use an existing verified repository CLI or API workflow; do not invent commands, repository metadata, labels, reviewers, or project fields.

Before creating an issue or PR:

- Inspect repository guidance, current Git status, branch and base relationship, relevant diff, tests, and remote identity.
- Confirm whether the user asked to draft or to perform the external write.
- Keep secrets, private logs, credentials, and unrelated changes out of the payload.

An issue or task should contain the problem or objective, evidence and context, scope and non-goals, acceptance criteria, dependencies, risk, and validation expectations. Assign owners, labels, milestones, or projects only from verified repository conventions or explicit user instructions.

A PR should contain why the change is needed, what changed, affected contracts or migrations, validation with actual results, risk and security notes, rollout and rollback when relevant, and linked issues. Do not claim checks passed unless observed. Do not push, commit, or open the PR unless authorized.
