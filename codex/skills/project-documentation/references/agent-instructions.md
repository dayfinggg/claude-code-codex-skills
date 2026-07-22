# Agent instruction files

Verify current official behavior before changing vendor files. The rules below were reviewed 2026-07-13.

## Codex discovery and precedence

Codex builds project instructions from the project root, usually the Git root, down to the current working directory:

1. At each directory, it checks `AGENTS.override.md`, then `AGENTS.md`, then any configured fallback names.
2. It includes at most one non-empty file per directory.
3. It concatenates selected files from root toward the working directory; later, closer guidance overrides earlier guidance.
4. Empty files are skipped.
5. Combined project instructions stop at `project_doc_max_bytes`, which defaults to 32 KiB.

For the global `CODEX_HOME` layer, Codex uses `AGENTS.override.md` when present; otherwise it uses `AGENTS.md`. Keep broad rules high and narrow rules close to the files they govern. Use an override deliberately because it replaces the regular selection in that directory.

Include durable repository commands, conventions, architecture boundaries, test expectations, generated-file rules, and review constraints. Exclude task-specific narrative, secrets, copied tool manuals, and requirements already enforced elsewhere.

For a complex or fast-moving dependency, include only a short version-matched source map when repeated work needs it: the dependency and supported version, authoritative manifest or lockfile, local types or source path, optional read-only upstream checkout at an exact revision, official documentation or release path, and the command that refreshes the mapping. Do not copy vendor documentation into instructions. Update or remove the map when the dependency version, source location, or support policy changes.

When a product repeatedly requires non-discoverable integration setup, prefer a repository-local `test-<product>` skill linked to verified scripts over more global prose. Its owner is the product or test surface that owns the setup; refresh it when startup, fixtures, authentication, supported clients, or cleanup changes, and retire it when project commands make the workflow self-evident.

## Claude Code hierarchy and imports

Choose scope deliberately:

- Managed memory: organization policy.
- `~/.claude/CLAUDE.md`: user preferences across projects.
- `./CLAUDE.md` or `./.claude/CLAUDE.md`: shared project memory.
- `./CLAUDE.local.md`: local project preferences not meant for version control.
- `.claude/rules/*.md`: modular rules, optionally path-scoped, only when the repository adopts that feature.

Claude Code loads applicable ancestor project memory at launch and can load subdirectory memory when working in that subtree. More specific context has higher precedence. Keep each file concise; Anthropic recommends targeting fewer than 200 lines.

Use `@relative/path` imports when a canonical file should be shared. Imports resolve relative to the containing file and may recurse up to four hops. Imported text still consumes context. Prefer an import to a Windows symlink. If `AGENTS.md` is canonical and the repository uses both tools, a small `CLAUDE.md` can import it, but retain only guidance that is semantically valid for Claude Code.

## GitHub Copilot repository instructions

- Put repository-wide guidance in `.github/copilot-instructions.md`.
- Put path-specific guidance in `.github/instructions/<name>.instructions.md` with YAML frontmatter containing an `applyTo` glob.
- Keep applicable files mutually consistent because multiple instruction sets can be combined.
- Verify support for the target Copilot surface; repository, path-specific, agent, and personal instruction support differs across IDE and GitHub experiences.
- Use short, self-contained statements with exact paths and commands. Avoid unsupported assumptions about ordering or deterministic compliance.

Example path-scoped frontmatter:

```markdown
---
applyTo: "src/api/**/*.ts"
---
```

## Content test

Keep an instruction only if all are true:

- It recurs across tasks.
- It applies to this scope.
- It changes how work should be done or verified.
- It is current, specific, and non-secret.
- It does not duplicate a stronger authoritative artifact.
- It can fit within the tool's context without crowding out task evidence.

Convert hard requirements into enforcement where possible: a formatter for style, test for behavior, schema for shape, permission for access, CI gate for required checks, and code ownership for review. Instruction files explain how to work with those mechanisms; they do not replace them.

## Conflict and drift check

1. Enumerate every applicable instruction file for the target path and tool.
2. Resolve conflicts in favor of the supported vendor precedence and the closest intended scope.
3. Remove duplicated commands or link/import the authoritative source.
4. Verify all paths, scripts, versions, and generated-file rules.
5. Check size and line guidance without padding to a target.
6. Test representative agent behavior only as an indicator; nondeterministic compliance is not enforcement proof.
