---
name: delegate-work
description: Coordinate permitted Codex subagents and parallel work packets. Use only when delegation is requested or authorized and work has independent ownership; not for tightly coupled tasks, overlapping writes, or ordinary single-agent work.
---

# Delegate Work

Delegate only to shorten the critical path, isolate noisy evidence, or obtain specialized review. The parent retains requirements, decisions, integration, conflict resolution, and final acceptance.

Read [long-running handoff](references/long-running-handoff.md) only when work must survive a context reset, task transfer, or later session. Read [sources.md](references/sources.md) before relying on vendor-specific orchestration, issue, or pull-request behavior. Treat the live tool schema and current connector state as authoritative.

## Pass the authorization gate

Start subagents only when active user, runtime, project, or skill instructions permit it. A request to draft an issue or PR authorizes a local draft, not publication. Creating, commenting, assigning, labeling, pushing, or opening an external record requires authorization for that exact write.

Delegate only when streams are independent, bounded, and cheaper to coordinate than to do locally. Prefer read-heavy packets for repository mapping, evidence gathering, test analysis, security review, log triage, and correctness review. Keep work local when the next decision depends immediately on the result or write ownership cannot be isolated.

## Build vertical packets

Split by self-contained vertical outcome, not by arbitrary file counts or horizontal layers. A packet should return a usable behavior, decision, evidence set, or review finding with its own acceptance signal. Assign one owner to every writable file or stateful target; serialize shared migrations, lockfiles, generated artifacts, branches, deployments, and external records.

Each packet must stand alone and contain:

- one role, objective, and observable deliverable;
- live inputs: exact current files, artifacts, errors, and direct source links;
- required skills and upstream decisions;
- allowed files, systems, and side effects, plus explicit forbidden actions;
- acceptance criteria, checks, evidence format, stop conditions, and merge point.

Do not paste stale summaries when the agent can inspect the live artifact. Pass the smallest current context and link to its source of truth. Preserve exact identifiers, but redact credentials, tokens, private logs, customer data, and unrelated content before delegation. Never make secrets discoverable merely for convenience.

Use no history or the smallest sufficient history when the runtime supports it. Full history is appropriate only when the packet cannot otherwise be self-contained. Ask for distilled evidence with file-and-line or source locators, not raw context dumps.

## Orchestrate and integrate

Use the runtime's available role router; do not invent profiles or claim model, effort, latency, or cost routing that the tool did not confirm. Reserve capacity for the parent to integrate and verify. Run independent reads in parallel, but place decisions and shared-state writes behind explicit gates.

After dispatch, wait through the runtime's orchestration tool without user-facing status prose. Treat early agent returns as working evidence and continue waiting for every required packet; do not announce partial completion, remaining agents, or the transition back to integration. Resume the next executable action silently once the required results are available.

If discovery changes the design, stop or redirect downstream writers before they continue against stale assumptions. If ownership overlaps, do not merge competing edits; return the conflict to the parent and reassign or serialize the work.

Treat agent results as evidence, not completion. The parent must inspect returned artifacts, reconcile contradictions by evidence, verify the combined behavior, and decide whether acceptance criteria are satisfied. Agents may recommend a design or external action, but the parent owns the decision and authorization check.

## Issues and pull requests

Use an installed connector or verified repository workflow and current repository conventions. Do not invent labels, reviewers, branches, remotes, project fields, commands, or check results.

An issue should state the problem or outcome, evidence, scope and non-goals, acceptance criteria, dependencies, risks, and validation. A PR should state why, what changed, affected contracts or migrations, observed checks, risk, and rollout or rollback when relevant. Keep secrets and unrelated changes out of both.

Before any authorized external write, verify the exact repository, target, current state, and payload. Publication, commit, push, deployment, and resolution remain separate actions unless each was explicitly authorized.
