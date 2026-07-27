# Evidence for Merge Conflict Resolution

Use this reference for nontrivial Git state, repeated conflicts, or ambiguous base/ours/theirs behavior.

## Applied principles

1. Reconstruct the common base and both sides before resolving intent.
2. Treat text markers as only one representation of the index state.
3. Inspect the complete integrated file and behavior, not only the conflicting hunk.
4. Reuse prior resolutions only after confirming that the same intent still applies.

Git records up to three index stages for conflicted paths: the common ancestor, `HEAD`, and the other side. The user manual documents commands for comparing these stages and `AUTO_MERGE`:

- [Git user manual: resolving a merge](https://git-scm.com/docs/user-manual#_resolving_a_merge)
- [git merge](https://git-scm.com/docs/git-merge)

`git rerere` can record and reuse a manual resolution for recurring conflicts, but the reused result still requires inspection and verification:

- [git rerere](https://git-scm.com/docs/git-rerere)

Do not map “ours” and “theirs” from memory during rebase or other operations. Verify the active operation and actual stage contents.
