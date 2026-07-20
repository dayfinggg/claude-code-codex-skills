---
name: agent-delegation
description: Orchestration workflow for delegating work to the configured custom agents (bug-finder, bulk-scanner, codebase-analysis, debugger, executor, planning-agent, researcher, verifier, vulnerability-audit) and built-in subagents. Use whenever any task component matches an agent role, work can run in parallel or in an isolated context, research, review, audit, planning, debugging, validation, or bounded implementation can be dispatched, multi-step work needs task tracking, background agents need monitoring, steering, or resuming, or delegated work must be verified and turned into commits or pull requests.
---

# Agent Delegation

## Why Delegation Works

- Context is the binding resource. An agent burns its own context on exploration, logs, and dead ends, and returns a distilled summary; the main conversation stays sharp for decisions and synthesis.
- Fresh context removes bias. A reviewer that did not write the code judges the diff on its own terms; self-review inherits the author's blind spots.
- Parallel lenses find more. Independent agents examining the same artifact from different angles (correctness, security, contracts) catch failure modes no single pass finds.
- Isolation enforces least privilege. Read-only agents cannot damage the working tree regardless of what they encounter.

Delegation is the default for matching work, not an optimization: when a task component matches a configured agent's role, dispatch that agent instead of doing the work inline.

## Agent Roster

| Agent | Access | Dispatch for |
| --- | --- | --- |
| codebase-analysis | read-only | Mapping code before edits: exact files, symbols, call sites, contracts, validation paths |
| planning-agent | read-only | Executable plans for complex, risky, or multi-file work; coordination plans for other agents |
| executor | read, write, shell | Bounded implementation with a concrete write scope and clear ownership |
| bug-finder | read-only | Correctness review after changes: bugs, regressions, edge cases, missing tests |
| vulnerability-audit | read-only, web | Security-sensitive paths: auth, input handling, secrets, dependencies, deploy changes |
| researcher | read-only, web | Current or cited external evidence: docs, versions, changelogs, standards, advisories |
| debugger | read, run | Root-cause diagnosis with execution: reproduce failures, bisect history, localize causes before any fix is designed |
| verifier | read, run | Independent execution of project checks after implementation: tests, typecheck, lint, build, runtime flow, with output evidence |
| bulk-scanner | read-only | Bounded deterministic inventory, extraction, classification, or normalization over many files with a fixed schema, explicit criteria, and stop conditions — never judgment calls |

Built-ins complement the roster: Explore for fast read-only search when no synthesis is needed (skips CLAUDE.md, not resumable); general-purpose only when no specialist fits; a fork when a side task needs the full conversation context a fresh agent would lack. The Workflow tool orchestrates dozens of agents deterministically but only after the user explicitly opts in; never launch it on your own initiative.

## Delegate or Work Inline

Delegate when the component matches a roster role, when exploration would flood the main context with content that will not be referenced again, when independent parts can run in parallel, when a fresh-context verdict is worth more than a fast one, or when write work is bounded and independent. Each delegated stream needs a clear deliverable it can return as a distilled result, and the coordination cost plus duplicated context must stay lower than the expected benefit. Prefer read-heavy delegation for exploration, research, test analysis, security review, bug review, and log triage; keep urgent blocking discovery local when the next step depends on it.

Work inline when the task is a trivial single step, when the next action depends on tight iteration with the full conversation, when a small edit touches code already read, when agent startup would cost more than the work itself, or when the files are already owned by a running agent. Do not delegate to avoid responsibility or to add ceremony.

Do not spawn an agent to run one Grep. Do not run a fifty-file exploration inline.

## Task Packet

Agents see none of the conversation, so output quality is bounded by packet quality. Every delegation prompt carries:

- Role and objective: one narrow responsibility with acceptance criteria, one or two sentences each.
- Known facts and inputs: exact paths, symbols, commands, versions, errors, and decisions already made. Never make an agent rediscover what the conversation already established.
- Required skills the agent must load before substantive work.
- Scope and ownership: allowed files or directories, forbidden files and actions, out-of-scope behavior.
- Dependencies: upstream facts the work relies on and downstream consumers of the result.
- Task-critical constraints restated even when CLAUDE.md covers them.
- Expected output: findings with file and line evidence, changed files, validation output, remaining risks — summaries, never raw dumps.
- Validation: exact commands the agent must run, or an explicit statement that validation stays with the orchestrator.
- Stop conditions: the ambiguity, safety boundary, conflict, or failure that must return to the orchestrator instead of being improvised around.
- Merge point: what the orchestrator will integrate and when.

Write packets in English; keep user-visible strings in the user's language. Example executor packet:

```
Objective: make config loading tolerate a missing optional telemetry block.
Acceptance: app starts when the block is absent; existing configs behave identically.
Known facts: parsing lives in src/config/loader.ts:120-180; repro: npm test -- --run loader.
Write scope: src/config/loader.ts and src/config/loader.test.ts only.
Do not: touch other files, add dependencies, refactor unrelated code.
Validate: npm test -- --run loader; return the actual output.
Return: changed files, behavior change, validation output, remaining risks.
```

## Parallel Execution

- Launch independent agents in a single message so they run concurrently.
- Parallelize reads freely. Never give two writing agents overlapping file scope; split write work by disjoint ownership or serialize it. The same-file rule extends to migration chains, lockfiles, generated artifacts, deployment targets, branches, and shared external records — one writer at a time for each.
- If discovery invalidates the intended design, stop or redirect downstream writers and revise their packets before continuing; if the user changes scope mid-flight, interrupt work that would now conflict rather than letting stale writers continue against shared state.
- Background is the default: keep working while agents run, and do not poll — completion notifications arrive on their own. When nothing remains but waiting, wait in silence: no dispatch summaries and no waiting messages; the user watches the task list, not a commentary track.
- An agent completion continues the same turn: fold the result into the next tool call, never into a text message. Commentary on a finished agent belongs only in the single final answer, after the whole request is done.
- Run an agent synchronously only when its result gates the immediate next step.
- Define the merge point before fanning out: what gets combined, which conflicts are possible, and that conflicts are arbitrated with evidence rather than majority vote.
- Cap a wave at roughly three to five agents; beyond that, synthesis quality drops faster than coverage grows. Reserve capacity for integration and verification; do not occupy every slot with optional work.
- Split work by independent output, not by arbitrary file count, and record dependencies and the critical path before fanning out.

## Standard Pipelines

| Task shape | Pipeline |
| --- | --- |
| Feature in unfamiliar code | codebase-analysis → planning-agent → executor (parallel per disjoint scope) → bug-finder → fix → verifier |
| Focused bugfix | debugger for root cause → executor → bug-finder on the diff → verifier |
| External facts or versions | researcher; split independent angles across parallel researchers |
| Security-sensitive change | executor → bug-finder and vulnerability-audit in parallel on the same diff |
| Pre-merge review | bug-finder and vulnerability-audit in parallel, synthesized by severity |
| Large migration | codebase-analysis discovers sites → planning-agent batches the work → executor waves per batch → verifier per wave |
| Unexplained failure | debugger reproduces and names the cause → executor fixes → verifier proves absence under the original reproduction |

Skip stages that add nothing: a one-file fix in familiar code needs no analysis stage, and a documentation change needs no security audit.

## Monitor, Steer, Resume

- Read every agent summary critically before building on it; it is input, not truth.
- Continue an existing agent with SendMessage, by ID or name, when the follow-up needs its accumulated context; respawning discards everything it learned and repays its exploration cost.
- Course-correct a running agent by message the moment its direction is predictably wrong; waiting for a predictably wrong result wastes the whole run.
- If an agent returns empty or dies, retry once with a narrower scope and more facts. A second failure means the packet is underspecified — fix the packet, not the retry count.
- The user-facing answer reports the task outcome; what, how, or why an agent did internally appears only when the user explicitly asks. Agent findings surface as verified results, never as process narrative.

## Verify Delegated Work

- Agent claims are not evidence. Require actual command output; delegate the decisive checks to verifier or re-run them yourself when the change is risky or user-facing.
- Route every nontrivial executor diff through bug-finder before treating it as done.
- Tell reviewers to report only gaps that affect correctness or stated requirements. A reviewer asked to find problems will always find some: fix correctness findings, drop taste findings, and do not enter an over-engineering loop.
- You own what agents wrote: read the aggregated diff as a whole before reporting completion, because independently correct pieces can still disagree with each other.

## Task Tracking

For work spanning several agents or steps, keep a private task list current: one task per delivered outcome, marked in progress when dispatched and completed only after verification. Tracking exists to prevent dropped work between parallel agents, not to narrate progress; keep it private unless the user asks to see it.

## Commits and Pull Requests

Create branches, commits, tags, or pull requests only when the user asks. Treat a request to draft an issue, task, or PR description as local artifact work; only a request to create, publish, submit, comment, assign, label, push, or open one authorizes that exact external write. Before creating an issue or PR, inspect repository guidance, current Git status, the branch and base relationship, the relevant diff, tests, and remote identity, and keep secrets, private logs, credentials, and unrelated changes out of the payload.

Follow the git skill, and build commit messages and PR descriptions from verified evidence — what changed, why, and what was validated with actual results — never from agent self-reports alone. An issue should carry the problem or objective, evidence, scope and non-goals, acceptance criteria, dependencies, risk, and validation expectations; a PR should carry why the change is needed, what changed, affected contracts or migrations, validation with actual results, risk notes, and linked issues. Assign owners, labels, milestones, or reviewers only from verified repository conventions or explicit user instruction — never invented. Use gh for GitHub operations. Review the full diff before pushing anything produced by agents.

## Model and Effort

Inherit model and effort by default; the roster already pins the intended values per role. The very complex roles — planning-agent, debugger, bug-finder, vulnerability-audit — inherit the session model the user selected (claude-fable-5 unless changed); executor, verifier, and codebase-analysis run Opus at high effort; researcher and bulk-scanner run Sonnet. Never route an agent to Haiku, and never give bulk-scanner architecture, security, correctness, planning, integration, or acceptance authority — escalate ambiguity, conflict, high impact, or material judgment to a stronger role.

The Agent tool's model parameter and the agent frontmatter are the only real selectors; never claim a child ran on a given model or effort without that observable configuration. Override per invocation only with a concrete reason: lower effort for mechanical high-volume waves, higher effort for the hardest verification or arbitration stages. When unsure, inherit.
