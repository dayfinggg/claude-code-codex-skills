---
name: plan-task
description: Research-first planning for non-trivial coding tasks. Produces an editable markdown plan (goal, vertical-slice steps with file paths, per-step verification, stopping conditions) and waits for approval before any code changes. Use this whenever the user asks to plan, design, or "think through" an approach, requests a feature, refactor, or migration that touches multiple files or systems, or describes a task where the right approach isn't obvious — even if they don't say the word "plan". Skip it only for single-file fixes with an obvious implementation.
---

# Plan a Task

Turn a request into a verified, approved plan before touching any code. A plan built
on unread code is fiction; a plan without verification steps is a wish. This skill
exists to prevent both.

## Phase 1 — Research before asking

Read the code first. Every question you can answer yourself from the codebase is a
question the user shouldn't have to answer.

1. Find the entry points: where does the affected flow start, which files own it,
   what calls what. Use parallel searches; delegate to subagents if the sweep is wide.
2. Check the dependency manifest (package.json, pyproject.toml, go.mod) — the plan
   must target the versions actually installed.
3. Note the existing patterns the change must follow (error handling, naming,
   test layout) — the plan will inherit them, not fight them.
4. Look for prior art: has something similar been done in this repo? A migration or
   feature that already solved half the problem changes the plan entirely.

## Phase 2 — Clarify until shared understanding

Classify each unknown before deciding what to ask:
- **Discoverable** — answer it yourself with read-only investigation. Never ask the
  user for information that lives in the workspace.
- **Safe and reversible** — pick the least surprising default and record the
  assumption in the plan.
- **Material** — ask the user: the answer changes product behavior, architecture,
  security, data compatibility, or another hard-to-reverse outcome.

Ask only the questions that change what you'd build — requirements you couldn't
derive from the code, tradeoffs only the user can decide, ambiguity about scope.
Batch them into one focused message; don't drip-feed. If research answered
everything, skip this phase and say so.

Do not start planning while a scope-changing question is unanswered. A confident
plan for the wrong task is worse than a short wait.

Running autonomously (no user available to answer): don't block. Pick the most
reasonable default for each open question, and record every assumption in the
plan's Context section so the reviewer sees exactly what was decided for them.

## Phase 3 — Write the plan

Save to `.claude/plans/<short-slug>.md` in the project (create the directory if
needed). A file, not a chat message — the user edits it directly, work can resume
from it after an interruption, and future sessions inherit the context.

Use this structure:

```markdown
# <Task title>

## Goal
One sentence: what exists when this is done that doesn't exist now.

## Context
Key files (with paths) and the patterns/constraints found in research that shape
this plan. Short — only what a reader needs to evaluate the steps.

## Out of scope
What this task deliberately does NOT change. This is the fence against scope creep.

## Steps
Each step is a vertical slice: after it lands, something works end-to-end and is
verifiable. Not "create all models, then all handlers" — thin slices through the
whole stack.

### 1. <Step name>
- Files: `path/to/file.ts`, `path/to/other.py`
- Change: what happens here, one or two sentences
- Verify: the exact command or check that proves this step works
  (e.g. `npm test -- auth`, `curl localhost:3000/health`, a specific manual check)

### 2. ...

## Done when
The checkable conditions that end the task. If a condition can't be checked by a
command or observation, rewrite it until it can.

## Risks / open questions
Only real ones. If there are none, delete this section entirely.
```

Rules for the steps:
- Every step names its files with real paths from research — no "relevant files".
- Every step has a verification. A step you can't verify is two steps or a guess.
- Prefer 3–7 steps. More than that usually means the task should be split; propose
  the split in the plan.
- The plan states the goal and constraints, not the implementation line-by-line.
  Leave implementation freedom inside each step — over-specified plans go stale on
  first contact with the code.
- When step order matters, note the dependency ("after step 2"); mark steps as
  parallelizable only when they touch no overlapping files or state.

Before presenting, audit the plan: every requirement maps to a step and a
verification; every step supports a requirement; referenced paths and symbols were
actually verified in research; assumptions are visible; no vague steps like "update
as needed". A fresh implementer should be able to start without repeating the
investigation. Revise until this holds.

## Phase 4 — Approval gate

Present the plan file path and a compact summary (goal + step names + done-when).
Then stop. Do not edit any project files until the user approves (environment
setup like installing declared dependencies belongs to execution, after approval) — the plan is theirs to
change, and edits made before approval turn the review into an argument with
already-written code.

If the user edits the plan file, re-read it before starting; their version wins.

Exception — planning as an internal stage: when the user already asked for the
implementation and planning is just how you're starting it, present the compact
summary and continue into execution without waiting, unless a material decision
genuinely needs their answer. The gate exists for requested plans, not as a toll
booth on every task.

## Phase 5 — Execute against the plan

After approval, work step by step. Run each step's verification before moving on.
If reality diverges from the plan (a file doesn't work the way research suggested,
a step turns out unnecessary), update the plan file and say what changed and why —
one sentence, not a re-planning ceremony. The plan file at the end should describe
what actually happened.

## Completion Standard

Finish only when the plan file states a checkable goal, steps backed by real file
paths and per-step verification, and done-when conditions — and either every step's
verification has passed, or execution is proceeding against the plan with any
deviations noted in the file.
