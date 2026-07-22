# Claude Code & Codex Skills

A compact personal setup for Claude Code and OpenAI Codex: 23 narrowly triggered skills, five specialist subagents, silent execution, evidence-first final reports, and structural checks for the Codex catalog.

The catalog deliberately avoids a universal skill cascade. A framework, language, database, or package activates a skill only when the requested behavior depends on that domain; `domain-modeling` and `grill-me` are explicit-only workflows.

[See every skill in action](https://dayfinggg.github.io/claude-code-codex-skills/).

## Install

Back up existing configuration first. The copy commands replace same-named files but do not remove unrelated files already present in `~/.claude` or `~/.codex`, so delete retired catalog entries or install into a clean directory when upgrading from an older release.

### macOS / Linux

```bash
git clone https://github.com/dayfinggg/claude-code-codex-skills.git
cd claude-code-codex-skills
cp -R claude/. "$HOME/.claude/"
cp -R codex/. "$HOME/.codex/"
chmod +x "$HOME/.claude/hooks/policy-context.sh"
```

### Windows (PowerShell)

```powershell
git clone https://github.com/dayfinggg/claude-code-codex-skills.git
Set-Location claude-code-codex-skills
Copy-Item -Recurse -Force .\claude\* "$HOME\.claude\"
Copy-Item -Recurse -Force .\codex\* "$HOME\.codex\"
```

`claude/settings.json` and `codex/config.toml` are opinionated templates with permissive execution settings. Merge them manually if you already have MCP servers, plugins, trusted projects, status-line hooks, model selections, or platform-specific paths. The repository contains no user-specific absolute paths; the shipped Codex agent paths point from `~/.codex/agents` to the sibling `~/.codex/skills` tree.

Restart Claude Code and Codex after installation so both catalogs are rediscovered.

## Layout

```text
claude/
  CLAUDE.md
  agents/             five specialist agents
  hooks/              SessionStart/SubagentStart context only
  output-styles/      silent execution and evidence report
  settings.json       portable template
  skills/             23 Claude-adapted skills

codex/
  agents/             five specialist agents
  checks/             catalog and routing quality tooling
  config.toml         portable template
  model-instructions.md
  skills/             23 Codex skills with agents/openai.yaml
```

## Skills

The shared catalog contains `api-design`, `delegate-work`, `domain-modeling`, `full-stack-testing`, `git`, `grill-me`, `javascript`, `mongodb`, `nextjs`, `node-js`, `planning`, `powershell`, `project-documentation`, `python`, `react`, `redis`, `software-engineering`, `sql`, `systematic-debugging`, `typescript`, `ui-ux-design`, `web-application-security`, and `web-research`.

`grill-me` performs a user-invoked requirements interview: it inspects discoverable facts first, asks one high-value decision at a time, recommends an answer with consequences, and returns a compact decision record. `domain-modeling` is also explicit-only. Architecture guidance now lives behind just-in-time references in `software-engineering`, while acceptance and delivery evidence lives in `full-stack-testing`; the retired `software-architecture` and `delivery-verification` skills should be removed during upgrades.

## Agents

The five Codex and Claude agents are intentionally narrow: `bulk-scanner` performs fixed-schema inventories, `researcher` gathers current primary evidence, `reviewer` separates specification compliance from repository standards, `verifier`/`verification-agent` independently checks acceptance evidence, and `vulnerability-audit` reviews material trust boundaries. Built-in exploration and planning remain preferable for ordinary repository mapping and plans; implementation and debugging stay with the primary model unless a bounded independent packet justifies delegation.

## Behavior

The global policy keeps authorization, scope preservation, production-ready implementation, verification, and response evidence at the top level. It does not repeat language, architecture, testing, and security checklists already owned by narrower skills.

Claude's pure Bash hook runs only at `SessionStart` and `SubagentStart` and returns short, model-agnostic `additionalContext`; it is not a stop hook and does not block tool calls. Static behavior stays in `CLAUDE.md` instead of being injected again on every submitted prompt.

Final coding reports lead with delivered behavior and scope, then name observed commands and results, and end with material residual risk or checks that were not run. Work remains silent until that report unless a genuinely blocking question or required permission warning is necessary.

## Codex checks

Run the structural validator from the repository root:

```bash
python codex/checks/validate_codex_rules.py
python codex/checks/validate_codex_rules.py --self-test
```

The Node-based routing and behavior harness is optional and requires installing its package dependencies inside `codex/checks`. Generated reports, temporary fixtures, and `node_modules` are intentionally not committed.

## License

MIT
