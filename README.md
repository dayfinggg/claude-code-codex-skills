# OpenAI Codex Agent Skills

Готовый набор инструкций, агентов и навыков для OpenAI Codex.

## Установка

### Добавить в существующую конфигурацию

Сохраняет текущие настройки. Добавляет навыки и агентов, подключает `model-instructions.md`.

**macOS / Linux**

```bash
curl -fsSL https://raw.githubusercontent.com/dayfinggg/openai-codex-agent-skills/main/scripts/install.sh | sh -s -- --merge
```

**Windows PowerShell**

```powershell
& ([scriptblock]::Create((Invoke-RestMethod https://raw.githubusercontent.com/dayfinggg/openai-codex-agent-skills/main/scripts/install.ps1))) -Mode Merge
```

### Полностью заменить конфигурацию

Заменяет `config.toml`, `model-instructions.md`, `agents` и `skills`. Старые файлы сохраняются в `~/.codex-backups/`.

**macOS / Linux**

```bash
curl -fsSL https://raw.githubusercontent.com/dayfinggg/openai-codex-agent-skills/main/scripts/install.sh | sh -s -- --replace
```

**Windows PowerShell**

```powershell
& ([scriptblock]::Create((Invoke-RestMethod https://raw.githubusercontent.com/dayfinggg/openai-codex-agent-skills/main/scripts/install.ps1))) -Mode Replace
```

Перезапустите Codex после установки.

## Состав

`codex/skills` содержит 13 инженерных навыков. `codex/agents` содержит 5 специализированных агентов. `codex/model-instructions.md` задаёт общие правила работы. `codex/config.toml` содержит готовую полную конфигурацию.

## Лицензия

MIT
