# Safety, rewriting, and recovery

## Treat every write as a state transition

1. Resolve the repository root and inspect branch, upstream, worktree, index, untracked files, conflicts, active sequencer state, remotes, worktrees, submodules, and stashes relevant to the operation.
2. Name the exact refs, commits, paths, index entries, or worktrees that may change.
3. Preserve unrelated work and create a recovery point when the operation can orphan commits or overwrite refs.
4. Execute the narrowest command with explicit pathspecs or refs.
5. Verify status, diff, ref targets, operation state, and relevant tests before the next mutation.

## Parse Git output safely

- Use `git status --porcelain=v1 -z` for scripts that consume path names. NUL termination preserves spaces, newlines, quoting, and rename records.
- Use plumbing or documented stable formats for automation; keep `--short`, graph output, colors, and formatted log text for people.
- Separate revision arguments from paths with `--` when ambiguity is possible. Use pathspec magic deliberately and quote it from the invoking shell.
- Avoid storing secrets in command-line arguments, remote URLs, commit messages, reflogs, or patches.

## Rewrite only with a verified expected ref

1. Confirm that the commits are unpublished or obtain explicit authorization for the exact remote rewrite.
2. Fetch only when current remote-tracking evidence is required and the external read/write is authorized by the task.
3. Read the remote ref's expected object ID from trusted, freshly verified evidence.
4. Use `--force-with-lease=<ref>:<expected-oid>` for the named ref. Do not substitute `--force`.
5. Re-read the remote relationship after push and verify no unintended refs or tags moved.

An unqualified `--force-with-lease` compares against a local remote-tracking ref, which background fetches can update. An explicit lease prevents overwriting a ref that no longer equals the named object, but it does not validate other refs, CI state, repository rules, or semantic compatibility.

## Preserve worktrees, stashes, and submodules

- Inspect a worktree with `git -C <path> status --short --branch` before removal. A worktree may contain untracked, ignored, or nested repository data outside the superproject's view.
- Prefer `stash apply`, inspection, then `stash drop`; `pop` combines restoration and deletion. Name stashes and inspect both summary and patch.
- Inspect every submodule as its own repository. Preserve its detached commit and local changes before changing the superproject gitlink.
- Never combine recursive enumeration in one shell with deletion in another shell.

## Recover before garbage collection wins

- Inspect `reflog`, `ORIG_HEAD`, sequencer state, stashes, worktree administrative data, and `git fsck` output before assuming a commit is gone.
- Reflogs are local and expire according to configuration; unreachable objects can be pruned. Remote hosts may have different retention and recovery controls.
- Once an object is found, create a protective branch, tag, or other ref immediately. Export a patch or bundle when repository-level evidence must survive further repair.
- Do not run aggressive prune, expire reflogs, repack destructively, or delete recovery artifacts while investigating loss.
- Never promise recovery. State what objects were found, what ref now protects them, and what remains unverified.

## Stop rather than improvise

- Stop when the target ref, repository, branch, worktree, or remote identity differs from the request.
- Stop when user changes cannot be separated safely, operation state is unclear, or the next command could discard data without an explicit recovery path.
- Stop before remote pushes, tag/ref deletion, destructive cleanup, or history rewriting unless the exact side effect is authorized.
