---
name: git
description: Operate Git safely for status, diffs, branches, staging, commits, history, conflicts, worktrees, tags, remotes, hooks, cleanup, and recovery. Use only for actual Git operations.
---

# Git

## Core Rules

Treat the repository as shared. Inspect first, preserve user work, and make the smallest reviewable Git operation that satisfies the request.

- Run Git commands to verify state; do not infer branch, cleanliness, staged files, upstreams, conflicts, tags, or remotes from memory.
- Use official Git docs (`https://git-scm.com/docs/git-<command>`) when command behavior, flags, or edge cases matter.
- Verify the installed Git version for version-sensitive syntax and read [authoritative Git sources](references/sources.md) before relying on rolling command documentation.
- Before writing or committing, inspect `git status --short --branch`, changed file names or stats, targeted diffs, and recent history when history affects the operation.
- Prefer non-destructive commands. Treat `reset --hard`, `clean`, `checkout -- <path>`, `restore <path>`, force-push, submodule deinit, tag deletion, and history rewriting as high-risk.

## First Inspection

Use this sequence before any Git-affecting work:

```bash
git rev-parse --show-toplevel
git status --short --branch
git diff --stat
git diff --name-status
git diff --staged --stat
git diff --staged --name-status
```

Add targeted commands as needed:

- Branch/upstream: `git branch --show-current`, `git branch -vv`, `git remote -v`
- Recent history: `git log --oneline --decorate --graph --max-count=20`
- Changed names: `git diff --name-status`, `git diff --staged --name-status`
- Submodules: `git submodule status --recursive`
- Stashes/worktrees: `git stash list`, `git worktree list`

Inspect full diffs only for relevant paths or staged changes that matter to the task: `git diff -- <path>...` and `git diff --staged -- <path>...`. If output is large, narrow by pathspec, commit range, or `--stat`/`--name-only`. Do not dump full repository history or full repo diffs unless necessary.

When a script must parse paths or status, use a stable machine format such as `git status --porcelain=v1 -z`; never parse human-oriented short or colorized output.

## Preserving User Changes

- Separate your changes from existing changes before editing. Record the initial status mentally or in notes.
- If a file already has user changes, read the relevant sections and patch around them; do not normalize unrelated formatting.
- If a required operation needs a clean tree, prefer a new branch or worktree. Use stash only with explicit intent and a descriptive message.
- Use pathspecs for staging and diffs. Avoid broad `git add .` unless the whole change set is intentionally yours and reviewed.
- Before finalizing, rerun status and inspect the exact staged or unstaged diff you are claiming.

## Branches

- Inspect current branch and upstream before branch operations.
- Create topic branches with `git switch -c <name>` when asked to isolate work.
- Switch branches only after checking for local changes that would be carried, overwritten, or conflicted.
- Treat fetches as external state-changing operations. Before comparing with remote branches, use local upstream data when sufficient; otherwise prefer `git fetch --dry-run --prune` for discovery and `git fetch --prune` only when current remote-tracking refs are needed.
- Do not delete branches unless the user asks and the branch has been checked for unmerged work.

Useful checks:

```bash
git branch --show-current
git branch -vv
git fetch --dry-run --prune
git fetch --prune
git log --oneline --left-right --cherry-pick HEAD...@{upstream}
```

## Staging

- Stage only intended paths: `git add -- <path>...`
- For partial staging, use `git add -p` when an interactive terminal is appropriate; otherwise split the patch manually.
- Unstage without losing work using `git restore --staged -- <path>` or `git reset -- <path>`.
- Verify the index with `git diff --staged` before committing.

## Commits

Only commit when the user explicitly authorizes the commit.

- Inspect `git diff --staged` and `git status --short --branch` immediately before `git commit`.
- Use a message that describes the user-visible or maintainer-visible change, not the implementation trivia.
- Prefer one focused commit over a mixed commit. Split commits when changes are independently reviewable.
- Do not amend someone else's commit or rewrite published history without explicit instruction.
- If hooks fail, inspect the failure and fix the cause when in scope. Do not bypass hooks with `--no-verify` unless explicitly requested.

Commit message shape:

```text
Short imperative summary following repository convention; use 72 characters as a fallback readability guideline

Optional body explaining motivation, compatibility, or risk.
```

## Rebase, Merge, Cherry-Pick, Revert

Use history-changing operations deliberately and only after inspecting state.

- Rebase: use for replaying local unpublished commits or when the user requests it. Check upstream and dirty state first. Stop on conflicts, resolve, validate, then `git rebase --continue`; use `git rebase --abort` if the operation should be abandoned.
- Merge: use when preserving branch topology matters. Consider `git merge --no-commit --no-ff <branch>` for inspectable integration before committing.
- Cherry-pick: inspect the source commit with `git show --stat <commit>` and `git show <commit>` first. Use `git cherry-pick -x <commit>` for public backports when provenance matters.
- Revert: prefer `git revert <commit>` over history rewriting for published commits. For merge commits, verify the mainline parent and use `git revert -m <parent> <merge>`.
- After any operation, run status, inspect resulting diff or commit, and run risk-appropriate validation.

Abort/continue commands:

```bash
git rebase --continue
git rebase --abort
git merge --continue
git merge --abort
git cherry-pick --continue
git cherry-pick --abort
git revert --continue
git revert --abort
```

## Conflict Handling

- Start with `git status --short` and identify unmerged paths.
- Inspect each conflict in context; do not blindly choose ours/theirs.
- Understand operation semantics: during rebase, "ours" is the rebased-onto side and "theirs" is the commit being replayed.
- Resolve files, stage only resolved paths, and continue the active operation.
- Validate after conflict resolution, especially for generated lockfiles, migrations, submodules, and binary files.
- If conflict state is confusing, stop and report the safest next command instead of improvising.

Helpful commands:

```bash
git diff --name-only --diff-filter=U
git diff
git ls-files -u
git status --short --branch
```

## Stash And Worktree

Prefer worktrees for parallel work that should not disturb the current tree:

```bash
git worktree list
git worktree add <absolute-or-verified-sibling-path> -b <branch>
git worktree remove <path>
```

- Before adding a worktree, verify the target path is absolute or an intended sibling path, does not already exist with unexpected contents, and is outside the current worktree.
- Before removing a worktree, inspect `git worktree list`, verify the target path, and run `git -C <path> status --short --branch`. Do not remove a dirty worktree or one with untracked/ignored work unless the user explicitly asks after the risk is known.

Use stash when temporarily shelving local changes is the safest option:

```bash
git stash push -u -m "<clear reason>"
git stash show --stat stash@{0}
git stash show -p stash@{0}
git stash apply stash@{0}
git stash drop stash@{0}
```

Do not use `git stash clear`. Do not pop a stash unless immediate deletion on successful apply is intended; prefer `apply`, inspect, then `drop`.

## Tags, Remotes, And Pushes

- Inspect remotes with `git remote -v` before fetch/push operations.
- Fetch before comparing local and remote state.
- Treat pushes as external side effects. Push only when the user asks or the workflow explicitly calls for it.
- For an explicitly authorized history rewrite, never use plain `--force`. Verify the remote ref and prefer `--force-with-lease=<ref>:<expected-oid>`; an unqualified lease can be weakened by background fetches, and any lease protects only the named expectation.
- For tags, prefer annotated tags for releases: `git tag -a <tag> -m "<message>"`. Verify target commit with `git show <tag>` or `git rev-parse <tag>^{}`.
- Do not delete or move local or remote tags without explicit instruction.

## Submodules

Submodules have separate repositories and can contain independent user changes.

- Inspect superproject and submodule state: `git submodule status --recursive`, then `git -C <submodule> status --short --branch`.
- Update submodules only when requested or required by the task.
- When changing a submodule commit, inspect and validate inside the submodule, then stage the gitlink change in the superproject.
- Do not run recursive reset, clean, deinit, or checkout across submodules without explicit permission and a verified recovery path.

## Untrusted Repositories

- Treat repositories from unknown sources as untrusted until inspected. Do not run hooks, build scripts, package scripts, or tooling from them unless the task requires it and the risk is acceptable.
- Do not set `safe.directory=*`. If Git blocks an operation due to ownership, verify the repository path and add only that exact path when necessary.
- When cloning from a local path controlled by another user or an untrusted source, avoid hardlink/object-sharing surprises by using `git clone --no-local <path> <dest>` when isolation matters.

## Hooks

- Treat hooks as repository policy. Let them run by default.
- If a hook edits files, inspect the resulting diff before proceeding.
- If hooks are missing dependencies or are broken outside the requested scope, report the blocker and the attempted command.
- Do not bypass hooks, edit hook scripts, or disable hook configuration unless explicitly asked.

## Investigation: Log, Blame, Bisect

Use history tools to ground claims:

```bash
git log --oneline --decorate -- <path>
git log -p -S'<text>' -- <path>
git blame -L <start>,<end> -- <path>
git show --stat <commit>
git show <commit>
```

Use bisect for regressions with a known good and bad commit:

```bash
git bisect start
git bisect bad <bad>
git bisect good <good>
git bisect run <test-command>
git bisect reset
```

Always run `git bisect reset` before leaving the task. If the test command mutates files, inspect status after reset.

## Cleanup And Recovery

- Use `git restore --staged <path>` to unstage without changing the working tree.
- Use `git restore <path>` only for changes you own and intend to discard.
- Use `git clean -nd` first to preview untracked deletion. Require explicit user intent before `git clean -fd`, and be more cautious with `-x`.
- Avoid `git reset --hard`. If a hard reset is explicitly requested, first show status, branch, target commit, and recovery information.
- Use recovery tools before assuming data is lost:

```bash
git reflog
git show ORIG_HEAD
git fsck
git stash list
```

Treat reflog and unreachable-object recovery as local, best-effort, and time-limited. Reflogs expire and unreachable objects can be pruned. After locating an object, immediately protect it with an appropriate branch, tag, ref, patch, or bundle before further cleanup.

Use `git fsck --lost-found` only when its repository-metadata writes into `.git/lost-found` are intentional and authorized; inspect with read-only `git fsck` options first.

If recovery involves another person's work, preserve evidence first with a branch, tag, patch file, or bundle before attempting cleanup.

Read [safety, rewriting, and recovery](references/safety-and-recovery.md) before force updates, history rewriting, cleanup, worktree removal, or recovery.

## Validation

Choose checks based on risk:

- Git-state validation: `git status --short --branch`, `git diff`, `git diff --staged`, `git log --oneline --max-count=5`
- Integrity validation: `git fsck` only when repository corruption or recovery is suspected
- Code validation: run the repo's cheapest relevant formatter, typecheck, lint, or tests from project instructions
- Commit validation: `git show --stat HEAD` and `git show --check HEAD`
- Push validation: compare local and upstream with `git log --oneline --left-right HEAD...@{upstream}`

## References

- Read [safety, rewriting, and recovery](references/safety-and-recovery.md) for state machines, explicit leases, machine-readable status, worktree/stash safety, and best-effort recovery.
- Read [authoritative Git sources](references/sources.md) for current command semantics and source classification. Pin the installed Git version before using version-sensitive flags.
