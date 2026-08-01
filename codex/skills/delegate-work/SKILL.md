---
name: delegate-work
description: "Delegate bounded independent work to Codex subagents with explicit ownership, evidence, and stopping conditions. Use only when the user or applicable instructions request agents or parallel delegation. Keep sequential, coupled, or overlapping work in the main task."
---

# Delegate Work

Use the smallest useful team. Delegate to protect the main context or gain independent specialist evidence, not to imitate an organization chart.

## Confirm Authority and Value

Delegate only after a direct user request or an applicable instruction explicitly authorizes it. Otherwise continue with the main task even when parallel work appears possible.

Before spawning an agent, require a bounded lane that offers at least one concrete benefit:

1. independent read-heavy exploration can run in parallel;
2. a specialist can assess a distinct risk surface;
3. implementation can have exclusive file or module ownership;
4. an independent verifier can challenge the integrated result;
5. noisy logs, broad searches, or experiments would pollute the main context.

Keep work in the main task when it is trivial, sequential, decision-heavy, tightly coupled, likely to touch the same files, or cheaper to complete than to specify and integrate. More agents are not evidence of a better process.

Read `references/agent-routing.md` before selecting roles. Read `references/task-contracts.md` before spawning agents. Read `references/orchestration.md` for three or more lanes, dependent waves, or shared-workspace risks.

## Keep the Main Task in Control

The main task owns:

1. the user's outcome, scope, constraints, and authority;
2. material product and architecture decisions;
3. the dependency graph and assignment boundaries;
4. synthesis, conflict resolution, and final edits;
5. integrated verification and the final response.

Do not delegate an unresolved decision as if it were an implementation task. Do not let a child expand scope, contact external parties, publish, deploy, spend money, or perform destructive work without the same explicit authority the main task would need.

## Choose the Smallest Team

Prefer one agent for one coherent lane. Add another only for a non-overlapping lane or an intentionally independent review.

Use these patterns:

1. **Fan-out and fan-in:** several independent investigations or review axes, followed by main-task synthesis.
2. **Owned implementation lanes:** workers change disjoint files or modules with explicit integration points.
3. **Pipeline:** one result becomes a stable input to the next agent; use only when the dependency prevents parallel work.
4. **Independent gate:** a reviewer or verifier checks the integrated result after implementation.
5. **Dynamic decomposition:** the main task adds bounded follow-up lanes only when initial evidence reveals them.

Do not create a chain of agents merely to pass summaries between phases. Every handoff loses context and adds coordination cost.

## Write a Complete Task Contract

Give every agent a self-contained prompt containing:

1. **Objective:** one outcome or question.
2. **Why this role:** the evidence or specialist judgment expected.
3. **Scope:** exact modules, files, systems, or research questions.
4. **Ownership:** read-only or writable; for writes, the exclusive files or module.
5. **Context:** verified facts, relevant artifacts, constraints, and dependencies.
6. **Exclusions:** work the agent must not perform.
7. **Evidence:** commands, paths, citations, screenshots, or observations it must return.
8. **Done:** the observable completion and stopping condition.
9. **Output:** the concise structure the main task needs for integration.

For writers, state that other agents share the workspace, that they must not revert others' edits, and that they must adapt to compatible concurrent changes. Never assign overlapping write ownership.

Pass only task-relevant context. Prefer durable paths and links over copied conversation history. Ask for conclusions and decisive evidence, not raw logs.

## Run and Steer Deliberately

Spawn independent lanes together. While they run, continue only useful local work that does not duplicate or conflict with their ownership.

Use an existing agent for a related follow-up instead of spawning a replacement. Send clarification when its scope or evidence contract needs adjustment. Interrupt only when continued work is wrong, unsafe, destructive, or guaranteed to be discarded.

Do not assume silence means failure. Do not redo a running agent's task. Wait for every required result before integration, but do not wait for optional work that no longer affects the decision.

## Integrate, Then Verify

Treat agent output as evidence, not authority.

1. Check that the agent stayed within scope and returned the requested proof.
2. Resolve contradictions against repository state, primary sources, or focused verification.
3. Inspect shared workspace and version-control state before combining edits.
4. Integrate compatible results in dependency order.
5. Run the narrowest integrated checks, then broader checks in proportion to risk.
6. Use an independent verifier only when its distinct perspective justifies the added cost.

The main task remains accountable for omissions, conflicts, and unsupported claims.

## Control Cost and Context

Use fast, lower-cost agents for bounded read-heavy scans and stronger reasoning for ambiguous design, security, correctness, or final verification when the available roles support that distinction.

Stop delegation when the decision has enough evidence. Prefer one decisive result over several redundant summaries. Close completed lanes mentally and do not keep agents active for hypothetical follow-up.

## Report the Outcome

Report the integrated result, not an activity log. Mention the delegation structure only when it explains confidence, a remaining gap, or a material trade-off. Identify incomplete or conflicting agent evidence explicitly.

## Completion Standard

Finish only when every required lane has a bounded owner, all required results have been integrated or consciously rejected, shared-workspace conflicts are resolved, and the main task has independently verified the combined outcome.
