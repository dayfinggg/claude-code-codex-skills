# Agent instruction files

Verify current official behavior before changing vendor files. The rules below were reviewed 2026-07-13.

## Claude Code hierarchy and imports

Choose scope deliberately:

- Managed memory: organization policy.
- User instructions: personal preferences across projects, discovered through Claude Code's supported user-memory mechanism.
- `./CLAUDE.md` or `./.claude/CLAUDE.md`: shared project memory.
- `./CLAUDE.local.md`: local project preferences not meant for version control.
- `.claude/rules/*.md`: modular rules, optionally path-scoped, only when the repository adopts that feature.

Claude Code loads applicable ancestor project memory at launch and can load subdirectory memory when working in that subtree. More specific context has higher precedence. Keep each file concise; Anthropic recommends targeting fewer than 200 lines.

Use `@relative/path` imports when a canonical file should be shared. Imports resolve relative to the containing file and may recurse up to four hops. Imported text still consumes context. Prefer an import to a Windows symlink. A small `CLAUDE.md` can import another canonical repository file, but retain only guidance that is semantically valid for Claude Code.

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
