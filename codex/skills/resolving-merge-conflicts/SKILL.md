---
name: resolving-merge-conflicts
description: Resolve conflicts in an in-progress Git merge, rebase, cherry-pick, or revert by reconstructing the intent of both sides and preserving compatible behavior. Use when Git reports unmerged paths or the user asks to inspect or resolve merge conflicts. Do not use for ordinary branch comparison, starting a new integration operation, rewriting history without conflicts, or aborting an operation unless the user explicitly requests it.
---

# Resolve Merge Conflicts

Resolve each conflict from verified intent and current repository behavior. Do not choose a side mechanically or invent a third behavior without evidence.

## Respect the Operation Contract

- Work only on the active Git operation and its resulting conflicts.
- Preserve unrelated and pre-existing user changes.
- Never run destructive reset, checkout, clean, or broad restore commands.
- Do not abort the merge, rebase, cherry-pick, or revert unless the user explicitly requests it.
- Do not create a commit or continue an operation that creates commits unless the user explicitly asks to complete the operation or the surrounding request clearly authorizes it.
- Stop and ask when two intents are genuinely incompatible and the desired product behavior cannot be derived from available sources.

## Inspect the Current State

Determine:

- the active operation and current step;
- the source and destination refs or commits;
- all unmerged paths and conflict types;
- staged, unstaged, untracked, and pre-existing changes;
- applicable repository instructions and verification commands.

Use Git's operation metadata and status. Do not assume every conflict is represented by visible text markers.

## Reconstruct Both Intents

For each conflicting area, inspect:

- the base, ours, and theirs versions;
- the commits that introduced each side;
- commit messages and directly related history;
- relevant issues, pull requests, plans, specifications, and ADRs when available;
- current callers, tests, schemas, generated sources, and configuration.

State the intent of each side in behavioral terms before editing. Distinguish independent compatible changes from competing decisions.

## Resolve One Conflict at a Time

- Preserve both intents when they are compatible.
- When one side supersedes the other, use the newer governing requirement rather than the newer timestamp alone.
- Keep established public contracts and data compatibility unless the integration explicitly changes them.
- Do not resolve a semantic conflict by retaining duplicate code paths.
- Do not use whole-file `ours` or `theirs` selection unless the entire file is generated, replaced, or one side is proven irrelevant.
- Keep edits limited to what the integration requires.

For renamed, deleted, binary, generated, lock, or schema files, determine the source of truth and regenerate with existing project tooling when possible.

## Validate Each Resolved File

After editing:

- search for remaining conflict markers;
- inspect the complete file, not only the former hunk;
- verify syntax, types, imports, identifiers, and generated relationships;
- compare the result against both reconstructed intents;
- stage only paths that are fully resolved and intentionally in scope.

Do not stage unrelated user changes.

## Verify the Integrated Behavior

Run focused checks for the affected behavior first, then the relevant type checks, tests, linters, builds, schema checks, or runtime exercises.

Add or adjust tests only when the integration exposes a real uncovered behavior and the request authorizes code changes. Do not weaken tests to make the merge pass.

Review the final diff against the operation's expected combined result.

## Finish Only When Authorized

If the user asked only to resolve conflicts:

- leave the index in a resolved, staged state when appropriate;
- do not run the continuation or create a commit;
- report the exact next Git command.

If the user asked to complete the operation:

- continue the merge, rebase, cherry-pick, or revert non-interactively where safe;
- repeat the intent and verification process for every newly surfaced conflict;
- finish only when Git reports no active conflict operation and required checks pass.

Do not push or publish the result without separate authorization.

## Present the Resolution

Report:

- the operation and conflicts resolved;
- how each material pair of intents was preserved or chosen;
- tests and checks executed;
- remaining trade-offs or user decisions;
- whether the operation was completed or the exact next command.

## Completion Standard

Finish only when every in-scope conflict is resolved without markers or unmerged paths, the combined behavior matches the strongest available intent evidence, and the operation has advanced no further than authorized.
