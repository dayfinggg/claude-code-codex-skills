# Routing cases

Test metadata and behavior with these case classes:

- **Direct:** the user explicitly names the skill, agent, artifact, or exact workflow.
- **Implicit:** the task clearly matches the description without using its name.
- **Incomplete:** the task may match, but a required artifact, decision, or input is absent.
- **Negative:** the task contains related words but should not activate the workflow.
- **Neighboring:** another skill or agent owns the task more precisely.
- **Combined:** two workflows are both relevant and need an explicit order or handoff.
- **Conflict:** repository or higher-priority instructions narrow or prohibit the workflow.
- **Stop:** the workflow begins correctly but must halt for permission, missing evidence, repeated failure, or an out-of-scope decision.

For each case record the expected selection, non-selection, handoff, or stop; the evidence available to the router; and the consequence of a false positive or false negative. Test the front-loaded portion of long descriptions because Codex may shorten skill metadata when the initial skill list approaches its context budget.

Prefer one focused job per skill or agent. Tighten an overlapping description before adding exceptions to both bodies. Disable implicit invocation for a workflow that is consequential or cannot be routed reliably from ordinary language.
