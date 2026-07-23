---
name: handoff
description: Create a compact, secret-safe continuation brief that lets a fresh Codex task or another engineer resume work without reopening settled decisions. Use only when the user explicitly asks to hand off, compact, transfer, pause and resume, or continue substantial work in a new task or session. Do not use for ordinary final reports, short tasks, or automatic progress updates.
---

# Create Handoff

Preserve the live, resumable core of the work. Reference durable sources of truth instead of copying them.

## Respect the Handoff Contract

- Create a handoff only on explicit request.
- Do not continue implementation, make unrelated changes, or reopen settled decisions while preparing it.
- Save the brief in the operating system's temporary directory by default so it does not become repository maintenance burden.
- Save it in the workspace only when the user specifies a path or the repository has an established authorized handoff location.
- Return the brief directly in the response instead of creating a file when the user requests response-only output.

## Reconstruct the Current Truth

Verify the current state from available evidence rather than relying only on conversation memory:

- active instructions, plan, specification, and accepted decisions;
- workspace and version-control state;
- changed and untracked files;
- relevant command, test, build, and validation results;
- open tool processes or runtime state;
- external task, issue, PR, document, and deployment references.

Distinguish completed work, partially completed work, proposed work, and unverified claims.

## Preserve What the Next Task Needs

Capture:

- the objective and requested outcome;
- current scope and explicit exclusions;
- decisions already made and the reasons that constrain future work;
- the current implementation state and material files;
- completed verification with exact results;
- failures, uncertainties, blockers, and user input still required;
- the next concrete action;
- commands needed to resume safely;
- relevant paths, symbols, URLs, commits, branches, task IDs, and artifacts;
- ownership of pre-existing or unrelated workspace changes.

Include assumptions only when they remain active and material.

## Reference, Do Not Duplicate

Link to existing plans, specifications, ADRs, issues, diffs, commits, logs, and documentation. Summarize only the live thread that those artifacts do not already contain.

Do not copy:

- settled detail available in a cited source;
- long command output or conversation history;
- obsolete attempts with no effect on the next action;
- generic project information a fresh task can discover normally.

Preserve rationale for consequential decisions so the next task does not relitigate them.

## Protect Sensitive Information

Remove credentials, tokens, keys, cookies, private personal data, internal secrets, and sensitive command output. Replace necessary references with safe descriptions of where authorized access is expected.

Do not include secret values even if they appeared earlier in the conversation or terminal.

## Structure the Brief

Use only applicable sections:

```markdown
# Handoff

## Objective
## Current state
## Decisions and rationale
## Changes
## Verification
## Open issues
## Next action
## References
```

Keep the brief concise enough for a fresh task to read fully before acting. Use absolute local paths and direct external URLs where appropriate.

## Write and Verify

When creating a file:

- use a unique descriptive Markdown filename;
- write it to the resolved temporary or user-specified location;
- reread it to confirm completeness and path accuracy;
- scan it for obvious secret patterns and remove sensitive content;
- report the final path and a one-sentence prompt the user can give the next task.

Do not claim the handoff is complete if the workspace state or verification results could not be inspected; state the missing evidence.

## Completion Standard

Finish only when a capable fresh task can identify what is being done, why current decisions were made, what is already complete, what remains, and the exact next action without reading the full prior conversation.
