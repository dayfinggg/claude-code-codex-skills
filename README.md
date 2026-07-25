# Claude Code & Codex Skills

Personal agent instructions, focused skills, and specialist subagents for Claude Code and OpenAI Codex.

Both tools run the same engineering setup: a compact operating policy, seventeen composable engineering skills, and five narrow specialist agents. The two catalogs hold the same skills and agents, adapted to each tool's conventions rather than kept as separate skill sets. Both rely on repository evidence for project-specific conventions.

## Skills

| Area | Skills |
| --- | --- |
| Planning and continuity | `plan-task`, `prototype`, `to-spec`, `to-tickets`, `handoff` |
| Engineering | `diagnosing-bugs`, `tdd`, `code-review`, `codebase-design`, `resolving-merge-conflicts` |
| Architecture and change safety | `improve-codebase-architecture`, `migrate-contracts-safely`, `change-dependencies` |
| Production reliability | `review-production-readiness`, `incident-postmortem` |
| Evidence | `research` |
| Product interface | `design-interface` |

Each skill is invoked only when its trigger contract matches the task, and provides a focused workflow rather than a universal checklist for every request.

## Agents

| Claude agent | Codex agent | Responsibility |
| --- | --- | --- |
| `docs-researcher` | `docs_researcher` | Current primary documentation, standards, releases, and compatibility |
| `quality-reviewer` | `quality_reviewer` | Correctness, regressions, contract violations, and missing tests |
| `security-auditor` | `security_auditor` | Concrete trust-boundary, authorization, injection, secret, and abuse risks |
| `delivery-verifier` | `delivery_verifier` | Acceptance criteria, tests, builds, migrations, and delivery readiness |
| `interface-reviewer` | `interface_reviewer` | Rendered UI quality, responsive behavior, accessibility, and product fidelity |

The main agent keeps requirements, decisions, integration, and final accountability. It delegates only bounded independent work, prefers read-heavy parallel tasks, and avoids overlapping writes.

## Behavior

The instructions prioritize direct execution, scope control, repository evidence, complete production code without placeholders or explanatory comments, verification proportional to risk, and context-aware tool selection. Live web search is enabled. Responses use the user's language naturally, prefer familiar local words over avoidable English borrowings and jargon, and preserve exact technical identifiers. User-facing prose uses structured paragraphs without headings; numbered lists are reserved for genuine sequences, priorities, or choices, while substantive work retains evidence-based report tables. Intermediate narration is suppressed unless the user asks for it or the work needs a blocking decision.

On Claude Code this splits across two files: `model-instructions.md` (engineering quality, code style, tools) loaded through `CLAUDE.md`, and the `Focused Engineer` output style (communication, autonomy, verification). On Codex a single `model-instructions.md` carries all of it.

## Claude

```text
claude/
  CLAUDE.md               imports model-instructions.md
  model-instructions.md   engineering quality, code style, tools
  agents/                 five specialist agents
  skills/                 seventeen engineering skills
  settings.json           example; statusline and hooks are machine-specific
```

Back up the existing configuration first. Replace `skills` and `agents` rather than copying over them, otherwise retired entries remain discoverable.

### macOS / Linux

```bash
git clone https://github.com/dayfinggg/claude-code-codex-skills.git
cd claude-code-codex-skills
cp -R claude/skills claude/agents "$HOME/.claude/"
cp claude/CLAUDE.md claude/model-instructions.md "$HOME/.claude/"
```

### Windows PowerShell

```powershell
git clone https://github.com/dayfinggg/claude-code-codex-skills.git
Set-Location claude-code-codex-skills
Copy-Item -Recurse -Force .\claude\skills, .\claude\agents "$HOME\.claude\"
Copy-Item -Force .\claude\CLAUDE.md, .\claude\model-instructions.md "$HOME\.claude\"
```

Restart Claude Code so it rediscovers skills and agents. There is no output style: communication and response shape are left to Claude Code's defaults, and `model-instructions.md` carries only the engineering rules. The bundled `settings.json` is an example only: its statusline and hooks point to a local integration and should be adapted, not copied verbatim.

## Codex

```text
codex/
  agents/                 five specialist agents
  config.toml             portable minimal template
  model-instructions.md   global operating policy
  skills/                 seventeen focused Codex skills
```

System-managed Codex skills from `~/.codex/skills/.system` are not vendored. Codex installs and updates them separately.

### macOS / Linux

```bash
cp -R codex/agents codex/skills "$HOME/.codex/"
cp codex/model-instructions.md "$HOME/.codex/model-instructions.md"
```

### Windows PowerShell

```powershell
Copy-Item -Recurse -Force .\codex\agents, .\codex\skills "$HOME\.codex\"
Copy-Item -Force .\codex\model-instructions.md "$HOME\.codex\model-instructions.md"
```

Merge `codex/config.toml` into the local configuration instead of overwriting platform-specific MCP servers, plugins, trusted projects, notification commands, or desktop settings. Its instruction setting is portable:

```toml
model_instructions_file = "model-instructions.md"
```

Restart Codex after installation so it rediscovers agents and skills.

## License

MIT
