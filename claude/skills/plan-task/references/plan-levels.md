# Plan Levels and Formats

## Working plans

Use a working plan to expose live progress for a bounded task with dependent steps.

1. Keep three to seven outcome steps.
2. Keep exactly one step in progress.
3. Update status immediately after the completion evidence exists.
4. Revise the plan when discovered work changes dependencies or scope.
5. Include verification as a step or as completion evidence for the relevant step.
6. Do not use status as a substitute for doing the work.

Good step:

```text
Adapt the token parser to the verified v2 schema and pass the parser regression tests.
```

Weak step:

```text
Update code.
```

## Execution plans

Use a durable execution plan for work that must remain understandable across long sessions or fresh implementers. It must be self-contained and explain the user-visible purpose, current behavior, chosen design, milestones, exact locations, commands, expected observations, recovery, and validation.

Keep these sections current:

1. `Purpose / Big Picture`
2. `Progress`
3. `Surprises & Discoveries`
4. `Decision Log`
5. `Outcomes & Retrospective`
6. repository context and orientation
7. milestones with observable proof
8. concrete commands and expected output
9. validation and acceptance
10. idempotence and recovery

Update `Progress` at every stopping point. Record plan changes and their reasons. A future implementer must be able to continue from the document and repository alone.

Write milestones as narrative outcomes, not bureaucratic task inventories. Checklists belong mainly in `Progress`. Keep the plan safe to rerun and explicit about irreversible actions.

OpenAI's current guidance distinguishes ordinary planning from ExecPlans for complex, long-running work and reports that a well-maintained plan can support hours of autonomous execution:

- [Codex ExecPlans](https://developers.openai.com/cookbook/articles/codex_exec_plans)
- [Codex best practices](https://developers.openai.com/codex/learn/best-practices)

CodePlan supports planning repository changes as a dependency-aware chain of edits whose later steps incorporate earlier changes:

- [CodePlan](https://www.microsoft.com/en-us/research/publication/codeplan-repository-level-coding-using-llms-and-planning-2/)

## Tool-neutral task shape

GitHub Projects supports table, board, roadmap, custom fields, issue forms, and sub-issues. Linear models projects, parent/sub-issues, and blocking relations. Jira commonly uses epics and child work items. Their shared useful structure is smaller than any product vocabulary:

1. outcome;
2. scope and context;
3. acceptance evidence;
4. owner when assigned;
5. blocking dependencies;
6. relevant locations or contracts;
7. explicit exclusions.

Keep plans tool-neutral until publication is authorized. Do not force epics, sprints, estimates, or a fixed hierarchy into a task that does not need them.

- [GitHub project planning](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GitHub issue forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)
- [Linear parent and sub-issues](https://linear.app/docs/parent-and-sub-issues)
- [Linear issue relations](https://linear.app/docs/issue-relations)
- [Jira epics](https://support.atlassian.com/jira-software-cloud/docs/what-is-an-epic/)
