# Claude Code & Codex Skills

Personal agent instructions, focused skills, and specialist subagents for Claude Code and OpenAI Codex.

The Codex setup contains a compact global policy, five specialist agents, and thirteen focused skills. It uses automatic skill discovery, so no agent or skill file contains a machine-specific installation path.

## Skills

| Area | Skills |
| --- | --- |
| Specification and planning | `clarify-and-specify`, `spec-to-tasks` |
| Architecture and domain | `design-project-architecture`, `domain-modeling` |
| Implementation quality | `production-code-quality`, `tdd`, `implement-and-verify` |
| Diagnosis and review | `diagnose-root-cause`, `review-changes` |
| Evidence | `research-current-sources` |
| Skill governance | `audit-agent-skills`, `learn-from-history` |
| Product interface | `design-ui-ux` |

Each skill is invoked only when its trigger contract matches the task, and provides a focused workflow rather than a universal checklist for every request.

The skills use progressive reference files so language rules, architecture guidance, planning evidence, design scenarios, and uncommon branches load only when the task needs them. `design-ui-ux` adds complexity-based workflows, public-web search visibility, performance guidance, and guardrails for AI-generated interfaces.

This structure follows current [OpenAI GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model): state an instruction once, expose only task-relevant tools and guidance, and validate prompt reductions on representative work. OpenAI reports a directional internal sample in which leaner coding-agent prompts improved evaluation scores by about 10–15% while reducing total tokens by 41–66% and cost by 33–67%; these ranges are not treated as guarantees for this catalog.

## Agents

| Claude agent | Codex agent | Responsibility |
| --- | --- | --- |
| — | `routine_executor` | Clear, bounded, repeatable implementation and focused validation |
| — | `complex_executor` | Ambiguous, architectural, domain-rich, or multi-stage implementation |
| — | `research_strategist` | Current, rare, disputed, or poorly indexed information |
| — | `quality_reviewer` | Independent correctness, security, compatibility, and quality review |
| — | `skill_curator` | Skill safety, precision, trigger quality, and evidence-based evolution |

GPT-5.6 Sol remains the orchestrator. GPT-5.6 Luna Max handles routine execution, while GPT-5.6 Terra Max handles complex execution, research, independent review, and skill curation. The orchestrator keeps requirements, task state, integration, and final accountability.

## Behavior

The instructions prioritize minimal sufficient solutions, scope control, repository evidence, complete production code without placeholders or explanatory comments, and verification proportional to risk. Commands that build artifacts, start servers or watchers, install dependencies, run migrations, or perform deployment and other persistent operations require explicit user confirmation. Live web search is enabled. Responses use the user's language naturally, prefer familiar local words over avoidable English borrowings and jargon, and preserve exact technical identifiers. Reports lead with the outcome and observed evidence without promotional language. Prose is the default, numbered lists are reserved for genuine sequences or rankings, and headings or tables appear only when they improve a longer answer. Intermediate narration is suppressed unless the work needs a blocking decision.

On Claude Code the rules live in two places, split by what each channel does best. `CLAUDE.md` holds the working rules: scope, evidence, change safety, implementation quality, verification. The `Engineering voice` output style holds everything about how Claude talks: turn cadence, language, response shape, formatting, and the report tables. An output style edits the system prompt, so it is the stronger place for behavior that has to hold on every turn. On Codex a single `model-instructions.md` carries all of it.

## Claude

```text
claude/
  CLAUDE.md               working rules: scope, evidence, change safety, quality, verification
  output-styles/          the Engineering voice style: cadence, language, response shape
  agents/                 five specialist agents
  skills/                 eighteen engineering skills
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
  skills/                 thirteen focused Codex skills
```

System-managed Codex skills from `~/.codex/skills/.system` are not vendored. Codex installs and updates them separately.

### macOS / Linux

```bash
cp -R codex/agents codex/skills "$HOME/.codex/"
cp codex/model-instructions.md codex/config.toml "$HOME/.codex/"
```

### Windows PowerShell

```powershell
Copy-Item -Recurse -Force .\codex\agents, .\codex\skills "$HOME\.codex\"
Copy-Item -Force .\codex\model-instructions.md, .\codex\config.toml "$HOME\.codex\"
```

Back up an existing `config.toml` before a manual installation. The distributed configuration is portable and intentionally replaces local model, permission, agent, web-search, and documentation-server defaults:

```toml
model_instructions_file = "model-instructions.md"
```

Restart Codex after installation so it rediscovers agents and skills.

## Update without Git

The update scripts download the latest `main` archive, compare it with the
previously installed revision, and apply only files changed upstream. Local
edits to files unchanged upstream are preserved. When both the upstream and
local copies changed, the local copy is backed up before replacement. Files
retired upstream are removed only when their installed copy was not modified
locally. Codex `config.toml` is managed and backed up before replacement;
Claude `settings.json` is not changed.

By default, the scripts update existing `~/.codex` and `~/.claude`
installations. Pass a target when you want to update or create only one of them.

### macOS / Linux

```bash
curl -fsSL https://raw.githubusercontent.com/dayfinggg/claude-code-codex-skills/main/scripts/update.sh | sh
```

To keep a reusable local command:

```bash
curl -fsSL https://raw.githubusercontent.com/dayfinggg/claude-code-codex-skills/main/scripts/update.sh -o "$HOME/update-agent-skills.sh"
chmod +x "$HOME/update-agent-skills.sh"
"$HOME/update-agent-skills.sh" --codex
```

Available targets are `--auto`, `--codex`, `--claude`, and `--all`.

### Windows PowerShell

```powershell
Invoke-RestMethod https://raw.githubusercontent.com/dayfinggg/claude-code-codex-skills/main/scripts/update.ps1 |
    Invoke-Expression
```

To keep a reusable local command:

```powershell
Invoke-WebRequest https://raw.githubusercontent.com/dayfinggg/claude-code-codex-skills/main/scripts/update.ps1 `
    -OutFile "$HOME\update-agent-skills.ps1"
& "$HOME\update-agent-skills.ps1" -Target Codex
```

Available targets are `Auto`, `Codex`, `Claude`, and `All`.

## License

MIT
