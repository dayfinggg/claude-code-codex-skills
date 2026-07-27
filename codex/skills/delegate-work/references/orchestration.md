# Orchestration and Evidence

## Select the topology

Use fan-out and fan-in when lanes are independent and the main task can reconcile their outputs. Examples include separate repository areas, documentation and code evidence, or correctness and security review.

Use owned implementation lanes only when file or module ownership is disjoint. Define integration contracts before spawning. Parallel writes to the same files create more coordination cost than they save.

Use a pipeline when a later lane genuinely cannot start without a stable earlier artifact. Keep the chain short. A sequence of lossy summaries is not a substitute for shared source-of-truth artifacts.

Use an independent gate after integration for high-impact correctness, security, UI, migration, or release work. A verifier must reproduce evidence rather than repeat the implementer's report.

## Handle shared-workspace hazards

1. Inspect the active branch, worktree, and uncommitted state before assigning writes.
2. Name exclusive writable paths or modules.
3. Tell every writer that concurrent edits are visible immediately.
4. Keep integration in the main task.
5. Recheck version-control state after agents finish.
6. Never assume a child uses an isolated branch or worktree unless the tool explicitly guarantees it.

## Handle lifecycle hazards

1. Do not duplicate work because an agent has not replied yet.
2. Steer the existing agent for related clarification.
3. Interrupt work that is unsafe or outside scope.
4. Wait for all required lanes before synthesis.
5. Treat agent completion as a result to inspect, not automatic acceptance.

## Evidence behind the workflow

OpenAI's Codex guidance says subagents trade extra tokens for parallel work and context isolation, and recommends starting with read-heavy tasks such as exploration, tests, triage, and summarization. It also recommends narrow custom roles and keeping the main task responsible for coordination and synthesis:

- [Codex subagents](https://developers.openai.com/codex/subagents)
- [Codex best practices](https://developers.openai.com/codex/learn/best-practices)
- [GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model)

Anthropic's agent workflow analysis recommends parallelization for independent subtasks, orchestrator-worker patterns for tasks whose decomposition emerges dynamically, and the simplest architecture that works:

- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)

Research does not support treating multi-agent complexity as an unconditional improvement. Agentless achieved strong repository-repair results with a simple localization, repair, and validation pipeline, while MASAI showed that multi-agent systems benefit from narrow objectives and strategies:

- [Agentless](https://arxiv.org/abs/2407.01489)
- [MASAI](https://arxiv.org/abs/2406.11638)

Long contexts can lose effective recall as they grow, which supports isolating noisy searches and logs rather than copying them into the main task:

- [Context Rot](https://research.trychroma.com/context-rot)

Community reports and Codex issues show recurring failure modes: weak child prompts, duplicate work after perceived stalls, stale agent lifecycle state, and shared-branch drift. Treat these as operational warnings rather than universal measurements:

- [Codex subagent prompt discussion](https://www.reddit.com/r/codex/comments/1tzv912/subagent_usage/)
- [Codex subagent lifecycle issue](https://github.com/openai/codex/issues/19197)
