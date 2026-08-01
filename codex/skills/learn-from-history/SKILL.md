---
name: learn-from-history
description: Derive reviewable agent-skill candidates from repeated successful sessions, corrections, traces, or operational histories. Use when a workflow has recurred and the user wants to preserve evidence-backed procedural knowledge; never install or activate candidates without human approval.
---

# Learn from History

1. Select histories that represent the same recognizable user goal. Include accepted outcomes, subsequent user corrections, failures, and environment details; exclude isolated success that has not generalized.
2. Redact secrets, personal data, credentials, and irrelevant proprietary content before analysis. Preserve stable references back to the permitted source evidence.
3. Extract repeated decisions, tool sequences, constraints, recovery paths, and acceptance signals. Separate project-specific facts from reusable procedure.
4. Compare successful and unsuccessful trajectories to identify which instructions changed behavior. Reject accidental correlations, one-off workarounds, and rules contradicted by later evidence.
5. Produce a candidate with a focused name, trigger description, inputs, steps, outputs, stop conditions, and checkable completion criteria. Keep provenance and confidence outside the runtime instructions.
6. Present the candidate and supporting evidence for human review. After approval, hand it to the skill-creation workflow for initialization, validation, and independent forward testing.

Finish with a reviewable candidate or a finding that the evidence is insufficient. Do not modify the installed skill set automatically.
