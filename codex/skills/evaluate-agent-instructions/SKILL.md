---
name: evaluate-agent-instructions
description: Compare baseline and candidate behavior for changes to prompts, system or developer instructions, model-instructions.md, AGENTS.md, SKILL.md, or custom-agent instructions. Use when instruction text or routing is the primary variable. Skip ordinary product-code tests; use llm-application-quality when evaluating an LLM application without changing its authoring instructions.
---

# Evaluate Agent Instructions

1. Identify the artifact, authority level, scope, intended behavior, affected tasks, and decision owner. Inspect the effective instruction stack and neighboring skills or agents before editing or evaluating. For a skill package, run `audit-agent-skills` as the structural and safety audit; this skill measures behavior rather than replacing that audit.
2. Preserve the current artifact and establish a reproducible baseline before changing it. Define the candidate as one coherent instruction cluster, its hypothesis, expected benefit, credible regressions, acceptance rule, and rollback. Do not combine prompt changes with model, reasoning, tool, permission, or dataset changes when attribution matters.
3. Build or select saved cases using [evaluation design](references/evaluation-design.md). Include direct, indirect, incomplete, negative, and neighboring requests; conflicts and false premises; exact-format tasks; simple and complex work; safety and permission boundaries; and cases where the instruction or skill must not activate.
4. For skills and custom agents, apply [routing cases](references/routing-cases.md) to the name, description, scope, handoff, stop conditions, and overlap with adjacent roles. Test the description as Codex sees it before relying on the body, because implicit selection happens from metadata.
5. Run baseline and candidate under the same model, reasoning effort, context, repository state, tools, permissions, timeouts, and limits. Predefine repetitions for nondeterministic cases and separate infrastructure failures from behavior failures.
6. Measure task success, completeness, factual and tool evidence, unsafe or unauthorized actions, missed or unnecessary questions, trigger precision and recall, style fit, tokens, latency, and cost where material. Treat safety, data integrity, permissions, and irreversible effects as must-pass. Use blind human comparison for naturalness, usefulness, and other subjective criteria.
7. Analyze failures by task segment and instruction conflict. Reject a candidate that improves its target metric by hiding required facts, weakening verification, expanding permissions, over-triggering workflows, turning simple work into ceremony, or regressing a required neighboring task.
8. Accept, revise, or reject using the predefined rule. Record artifact hashes, cases, configuration, raw outcomes, graders, human decisions, limitations, and the exact rollback. After acceptance, re-run structural validation and a focused regression set for preserved invariants.

Use [sources](references/sources.md) when a primary reference is needed to justify the evaluation design or instruction-scope decision.

Finish only when baseline and candidate are comparable, every must-pass case is accounted for, the decision is traceable to saved evidence, and rollback remains usable. A plausible rule, an agent's self-assessment, or agreement among several models is not behavioral proof.
