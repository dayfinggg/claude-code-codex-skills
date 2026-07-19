# Claude Code & Codex Skills

My daily setup for [Claude Code](https://code.claude.com) and [Codex CLI](https://developers.openai.com/codex): agent skills, subagents, output styles, hooks and config templates. Copy two folders into your home directory, restart, done.

**[See every skill in action →](https://dayfinggg.github.io/claude-code-codex-skills/)** — before/after examples of what each one changes.

## Install

**macOS / Linux**

```bash
git clone https://github.com/dayfinggg/claude-code-codex-skills.git
cd claude-code-codex-skills
cp -r claude/. ~/.claude/
cp -r codex/. ~/.codex/
```

**Windows (PowerShell)**

```powershell
git clone https://github.com/dayfinggg/claude-code-codex-skills.git
cd claude-code-codex-skills
Copy-Item -Recurse -Force claude\* "$HOME\.claude\"
Copy-Item -Recurse -Force codex\* "$HOME\.codex\"
```

Already have a `settings.json` or `config.toml`? Back it up first or merge the keys by hand. Want only the skills? Copy just `skills/` and `agents/`.

## What's inside

```
claude/   → ~/.claude    skills, agents, output style, hooks, settings.json
codex/    → ~/.codex     skills, agents, model instructions, config.toml
```

- **23 skills** — software engineering and architecture as the base, plus TypeScript, JavaScript, Node.js, React, Next.js, Python, SQL, MongoDB, Redis, PowerShell, Git, API design, testing, debugging, security, web research, UI/UX and more. Both CLIs pick them up automatically.
- **Subagents** — planner, executor, debugger, researcher, code reviewer, security auditor, verifier and others, each with its own tools and preloaded skills.
- **Operating policy** — an output style (Claude) / model instructions (Codex) that make the assistant work quietly and answer once with evidence, instead of narrating every step.
- **Hooks & configs** — a small hook that keeps long sessions on-policy, plus settings tuned for autonomous work.

## What changes

- The assistant loads the relevant skills before touching code, so every task follows the same engineering rules: find the root cause, keep the diff small, verify before claiming done.
- No progress chatter — tools run silently and you get one final answer backed by checks that actually ran.
- Generated code comes without filler comments, TODOs or placeholder scaffolding.
- Bigger tasks get delegated to focused subagents instead of one context doing everything.

The configs favor autonomy (few approval prompts, permissive sandbox) — skim `claude/settings.json` and `codex/config.toml` before adopting them as-is.

## FAQ

**How do Claude Code skills work?**
Skills are folders with a `SKILL.md` file that Claude Code discovers in `~/.claude/skills`. When a task matches a skill's description, Claude loads its instructions — so a Python task follows Python rules, a SQL migration follows database rules, and so on. Codex CLI uses the same format under `~/.codex/skills`.

**What are Claude Code subagents?**
Subagents are role definitions in `~/.claude/agents` (Markdown) or `~/.codex/agents` (TOML). Each one gets its own context window, a limited toolset and preloaded skills — a researcher can't edit files, an executor stays inside its assigned scope.

**What is a Claude Code output style?**
An output style replaces the default response behavior. The `operating-policy` style in this repo makes Claude Code work silently and reply once with a verified result. For Codex CLI the same policy ships as `model-instructions.md`, wired via `model_instructions_file` in `config.toml`.

**Does this work on Windows, macOS and Linux?**
Yes. All paths are relative, nothing is machine-specific. The only extra requirement is `bash` and `jq` for the Claude Code hook (Git Bash covers both on Windows).

**Can I use just part of it?**
Sure — every piece is independent. Take only the skills, only the agents, or a single skill folder; nothing else breaks.

## License

MIT
