# Claude Code & Codex Skills

Personal agent instructions, focused skills, and specialist subagents for Claude Code and OpenAI Codex.

Both tools run the same engineering setup: a compact operating policy, seventeen composable engineering skills, and five narrow specialist agents. The two catalogs hold the same skills and agents, adapted to each tool's conventions rather than kept as separate skill sets. Both rely on repository evidence for project-specific conventions.

## Skills

| Area | Skills |
| --- | --- |
| Planning and continuity | `plan-task`, `prototype`, `to-spec`, `to-tickets`, `handoff` |
| Engineering | `diagnosing-bugs`, `tdd`, `change-review` (`code-review` on Codex), `codebase-design`, `resolving-merge-conflicts` |
| Architecture and change safety | `improve-codebase-architecture`, `migrate-contracts-safely`, `change-dependencies` |
| Production reliability | `review-production-readiness`, `incident-postmortem` |
| Evidence | `research` |
| Product interface | `design-interface` |

Each skill is invoked only when its trigger contract matches the task, and provides a focused workflow rather than a universal checklist for every request.

`design-interface` uses progressive reference files for existing-product fit, visual foundations, interaction patterns, and accessibility verification. Its core workflow stays compact while detailed guidance loads only when the task needs it.

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

The instructions prioritize direct execution, scope control, repository evidence, complete production code without placeholders or explanatory comments, verification proportional to risk, and context-aware tool selection. Live web search is enabled. Responses use the user's language naturally, prefer familiar local words over avoidable English borrowings and jargon, and preserve exact technical identifiers. User-facing prose uses structured paragraphs without headings; numbered lists are reserved for genuine sequences, priorities, or choices, and tables are used only when shared columns materially improve comparison. Intermediate narration is suppressed unless the user asks for it or the work needs a blocking decision.

On Claude Code the rules live in two places, split by what each channel does best. `CLAUDE.md` holds the working rules: scope, evidence, change safety, implementation quality, verification. The `Engineering voice` output style holds everything about how Claude talks: turn cadence, language, response shape, formatting, and the report tables. An output style edits the system prompt, so it is the stronger place for behavior that has to hold on every turn. On Codex a single `model-instructions.md` carries all of it.

## Claude

```text
claude/
  CLAUDE.md               working rules: scope, evidence, change safety, quality, verification
  output-styles/          the Engineering voice style: cadence, language, response shape
  agents/                 five specialist agents
  skills/                 seventeen engineering skills
  settings.json           reference values to merge into your own settings
```

Back up the existing configuration first. Replace `skills` and `agents` rather than copying over them, otherwise retired entries remain discoverable.

### macOS / Linux

```bash
git clone https://github.com/dayfinggg/claude-code-codex-skills.git
cd claude-code-codex-skills
cp -R claude/skills claude/agents claude/output-styles "$HOME/.claude/"
cp claude/CLAUDE.md "$HOME/.claude/"
```

### Windows PowerShell

```powershell
git clone https://github.com/dayfinggg/claude-code-codex-skills.git
Set-Location claude-code-codex-skills
Copy-Item -Recurse -Force .\claude\skills, .\claude\agents, .\claude\output-styles "$HOME\.claude\"
Copy-Item -Force .\claude\CLAUDE.md "$HOME\.claude\"
```

Turn the output style on: set `"outputStyle": "Engineering voice"` in `~/.claude/settings.json`, or pick it under **Output style** in `/config`. It applies from the next session. The style keeps Claude Code's built-in software engineering instructions through `keep-coding-instructions: true`, so it changes how Claude communicates, not how it codes.

Restart Claude Code so it picks up the skills, agents, and style.

`claude/settings.json` is a reference file: copy the keys you want into your own `~/.claude/settings.json` instead of replacing it. The ones that matter for this setup:

```json
{
  "outputStyle": "Engineering voice",
  "effortLevel": "high"
}
```

Keep `hooks`, `statusLine`, MCP servers, and anything else tied to your machine in your own settings file — the reference file carries none of them.

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
