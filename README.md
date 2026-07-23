# Claude Code & Codex Skills

Personal agent instructions, focused skills, and specialist subagents for Claude Code and OpenAI Codex.

The Claude and Codex catalogs are intentionally independent. Claude keeps the broader language and framework catalog, while Codex uses a smaller set of reusable engineering workflows and relies on repository evidence for project-specific conventions.

[See the Claude catalog examples](https://dayfinggg.github.io/claude-code-codex-skills/).

## Codex

The Codex setup contains:

- one portable `model-instructions.md`
- five narrow custom agents
- seventeen composable engineering skills
- a minimal `config.toml` with a relative instruction path

System-managed Codex skills from `~/.codex/skills/.system` are not vendored. Codex installs and updates them separately.

### Skills

| Area | Skills |
| --- | --- |
| Planning and continuity | `plan-task`, `prototype`, `to-spec`, `to-tickets`, `handoff` |
| Engineering | `diagnosing-bugs`, `tdd`, `code-review`, `codebase-design`, `resolving-merge-conflicts` |
| Architecture and change safety | `improve-codebase-architecture`, `migrate-contracts-safely`, `change-dependencies` |
| Production reliability | `review-production-readiness`, `incident-postmortem` |
| Evidence | `research` |
| Product interface | `design-interface` |

Skills are invoked only when their trigger contract matches the task. They provide a focused workflow rather than a universal checklist for every request.

### Agents

| Agent | Responsibility |
| --- | --- |
| `docs_researcher` | Current primary documentation, standards, releases, and compatibility |
| `quality_reviewer` | Correctness, regressions, contract violations, and missing tests |
| `security_auditor` | Concrete trust-boundary, authorization, injection, secret, and abuse risks |
| `delivery_verifier` | Acceptance criteria, tests, builds, migrations, and delivery readiness |
| `interface_reviewer` | Rendered UI quality, responsive behavior, accessibility, and product fidelity |

The main agent keeps requirements, decisions, integration, and final accountability. It delegates only bounded independent work, prefers read-heavy parallel tasks, and avoids overlapping writes. Codex's built-in `explorer` and `worker` roles remain available and are not duplicated here.

### Behavior

The model instructions prioritize direct execution, scope control, repository evidence, complete production code, verification proportional to risk, and compact human writing. Responses use the user's language naturally, prefer familiar local words over avoidable English borrowings and jargon, and preserve exact technical identifiers. Intermediate narration is suppressed unless the user asks for it or the work needs a blocking decision. Material implementation work ends with an evidence-based report.

## Installation

Back up the existing configuration first. When upgrading the Codex catalog, replace the old `skills`, `agents`, and `model-instructions.md` rather than copying over them, otherwise retired entries remain discoverable.

### macOS / Linux

```bash
git clone https://github.com/dayfinggg/claude-code-codex-skills.git
cd claude-code-codex-skills
cp -R codex/agents codex/skills "$HOME/.codex/"
cp codex/model-instructions.md "$HOME/.codex/model-instructions.md"
```

### Windows PowerShell

```powershell
git clone https://github.com/dayfinggg/claude-code-codex-skills.git
Set-Location claude-code-codex-skills
Copy-Item -Recurse -Force .\codex\agents, .\codex\skills "$HOME\.codex\"
Copy-Item -Force .\codex\model-instructions.md "$HOME\.codex\model-instructions.md"
```

Merge `codex/config.toml` into the local configuration instead of overwriting platform-specific MCP servers, plugins, trusted projects, notification commands, or desktop settings. Its instruction setting is portable:

```toml
model_instructions_file = "model-instructions.md"
```

Restart Codex after installation so it rediscovers agents and skills.

## Layout

```text
claude/
  CLAUDE.md
  agents/
  hooks/
  output-styles/
  settings.json
  skills/

codex/
  agents/                 five specialist agents
  config.toml             portable minimal template
  model-instructions.md   global operating policy
  skills/                 seventeen focused Codex skills
```

## License

MIT
