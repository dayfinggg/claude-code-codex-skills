# Planning principles

## Evidence before decomposition

Inspect the real system before naming tasks. A useful plan explains where change belongs, what behavior and contracts must remain, and how completion will be observed. If repository evidence is unavailable, state that limitation and plan discovery first rather than fabricating precision.

## Outcomes, dependencies, and feedback

Plan from the desired result backward. Use milestones for meaningful intermediate outcomes and tasks for independently verifiable slices. Show blocking relationships explicitly, place uncertainty-reducing work early, and preserve parallelism where ownership does not overlap.

Keep the plan live during execution. Status changes only when evidence changes. New findings may split, replace, reorder, or remove work. Completion percentage or checked boxes do not substitute for acceptance evidence.

## Scope and task quality

Prefer the simplest approach that fully satisfies the stated requirements. Each task must describe one outcome, boundaries, prerequisites, intended change, acceptance criteria, and proof. Avoid layer-only tasks that leave the product unusable, vague phases such as “finish backend,” speculative extension points, and unrelated cleanup.

Keep changes conceptually small and reversible. Include related tests with behavior, separate large refactors from features, and ensure useful intermediate states. Escalate unresolved product or architectural choices instead of converting assumptions into implementation work.

## Source basis

- [OpenAI Codex best practices](https://learn.chatgpt.com/guides/best-practices) recommends explicit goals, context, constraints, completion criteria, planning for complex work, and practical concise durable guidance.
- [Cursor planning](https://docs.cursor.com/en/agent/planning) uses structured tasks with dependencies and requires task state to update as work progresses.
- [Claude Code best practices](https://code.claude.com/docs/en/best-practices) recommends exploring before planning, planning before coding, giving the agent verification paths, and correcting direction early.
- [Claude Code plan mode](https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode) separates read-only analysis and plan review from authorized execution.
- [OpenCode agents](https://opencode.ai/docs/agents) separates planning from building through narrow agent roles and permissions.
- [Linear project planning](https://linear.app/learn/project-planning), [milestones](https://linear.app/docs/project-milestones), and [dependencies](https://linear.app/docs/project-dependencies) connect objectives, milestones, executable work, blocking relationships, and ongoing status updates.
- [Google small changes](https://google.github.io/eng-practices/review/developer/small-cls.html) favors self-contained changes with related tests, safe intermediate states, easier review, and simpler rollback.
