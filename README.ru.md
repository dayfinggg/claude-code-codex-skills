# OpenAI Codex Agent Skills

[English](README.md) · [Українська](README.uk.md) · Русский

Инструкции, агенты и навыки для OpenAI Codex.

## Добавить в существующую конфигурацию

Создайте резервную копию `~/.codex`, клонируйте репозиторий и скопируйте управляемые файлы.

### macOS и Linux

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

Добавьте эту строку верхнего уровня в `~/.codex/config.toml`:

```toml
model_instructions_file = "model-instructions.md"
```

## Полностью заменить конфигурацию

Команды заменяют `config.toml`, `model-instructions.md`, `agents` и `skills`.

### macOS и Linux

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

После установки перезапустите Codex.

## Состав

13 инженерных навыков, 5 специализированных агентов, общие инструкции и полная конфигурация Codex. Лицензия MIT.
