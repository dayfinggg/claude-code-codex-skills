# OpenAI Codex Agent Skills

[English](README.md) · Українська · [Русский](README.ru.md)

Інструкції, агенти та навички для OpenAI Codex.

## Додати до наявної конфігурації

Створіть резервну копію `~/.codex`, клонуйте репозиторій і скопіюйте керовані файли.

### macOS і Linux

```bash
cp -R "$HOME/.codex" "$HOME/.codex.backup-$(date +%Y%m%d-%H%M%S)" 2>/dev/null || true
git clone https://github.com/dayfinggg/openai-codex-agent-skills.git
mkdir -p "$HOME/.codex/agents" "$HOME/.codex/skills"
cp -R openai-codex-agent-skills/codex/agents/. "$HOME/.codex/agents/"
cp -R openai-codex-agent-skills/codex/skills/. "$HOME/.codex/skills/"
cp openai-codex-agent-skills/codex/model-instructions.md "$HOME/.codex/"
```

### Windows PowerShell

```powershell
if (Test-Path "$HOME\.codex") { Copy-Item -Recurse "$HOME\.codex" "$HOME\.codex.backup-$(Get-Date -Format yyyyMMdd-HHmmss)" }
git clone https://github.com/dayfinggg/openai-codex-agent-skills.git
New-Item -ItemType Directory -Force "$HOME\.codex\agents", "$HOME\.codex\skills" | Out-Null
Copy-Item -Recurse -Force .\openai-codex-agent-skills\codex\agents\* "$HOME\.codex\agents\"
Copy-Item -Recurse -Force .\openai-codex-agent-skills\codex\skills\* "$HOME\.codex\skills\"
Copy-Item -Force .\openai-codex-agent-skills\codex\model-instructions.md "$HOME\.codex\"
```

Додайте цей рядок верхнього рівня до `~/.codex/config.toml`:

```toml
model_instructions_file = "model-instructions.md"
```

## Повністю замінити конфігурацію

Команди замінюють `config.toml`, `model-instructions.md`, `agents` і `skills`.

### macOS і Linux

```bash
cp -R "$HOME/.codex" "$HOME/.codex.backup-$(date +%Y%m%d-%H%M%S)" 2>/dev/null || true
git clone https://github.com/dayfinggg/openai-codex-agent-skills.git
rm -rf "$HOME/.codex/agents" "$HOME/.codex/skills"
mkdir -p "$HOME/.codex"
cp -R openai-codex-agent-skills/codex/agents openai-codex-agent-skills/codex/skills "$HOME/.codex/"
cp openai-codex-agent-skills/codex/model-instructions.md openai-codex-agent-skills/codex/config.toml "$HOME/.codex/"
```

### Windows PowerShell

```powershell
if (Test-Path "$HOME\.codex") { Copy-Item -Recurse "$HOME\.codex" "$HOME\.codex.backup-$(Get-Date -Format yyyyMMdd-HHmmss)" }
git clone https://github.com/dayfinggg/openai-codex-agent-skills.git
Remove-Item -Recurse -Force "$HOME\.codex\agents", "$HOME\.codex\skills" -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force "$HOME\.codex" | Out-Null
Copy-Item -Recurse -Force .\openai-codex-agent-skills\codex\agents, .\openai-codex-agent-skills\codex\skills "$HOME\.codex\"
Copy-Item -Force .\openai-codex-agent-skills\codex\model-instructions.md, .\openai-codex-agent-skills\codex\config.toml "$HOME\.codex\"
```

Після встановлення перезапустіть Codex.

## Склад

15 інженерних навичок, 5 спеціалізованих агентів, спільні інструкції та повна конфігурація Codex. Ліцензія MIT.
