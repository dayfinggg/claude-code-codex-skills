param(
    [ValidateSet("Merge", "Replace")]
    [string]$Mode = "Merge"
)

$ErrorActionPreference = "Stop"
$Repository = if ($env:CODEX_SKILLS_REPO) { $env:CODEX_SKILLS_REPO } else { "dayfinggg/openai-codex-agent-skills" }
$Branch = if ($env:CODEX_SKILLS_BRANCH) { $env:CODEX_SKILLS_BRANCH } else { "main" }
$Destination = Join-Path $HOME ".codex"
$BackupParent = Join-Path $HOME ".codex-backups"
$Stamp = [DateTime]::UtcNow.ToString("yyyyMMddTHHmmssZ")
$Backup = Join-Path $BackupParent $Stamp
$TemporaryDirectory = Join-Path ([System.IO.Path]::GetTempPath()) ("openai-codex-agent-skills-install-" + [guid]::NewGuid())

function Copy-ManagedPath {
    param([string]$Name)
    $SourcePath = Join-Path $Source $Name
    $DestinationPath = Join-Path $Destination $Name
    if (Test-Path -LiteralPath $DestinationPath) {
        New-Item -ItemType Directory -Force -Path $Backup | Out-Null
        Copy-Item -LiteralPath $DestinationPath -Destination $Backup -Recurse -Force
    }
    Copy-Item -LiteralPath $SourcePath -Destination $Destination -Recurse -Force
}

function Set-ModelInstructionsFile {
    $ConfigPath = Join-Path $Destination "config.toml"
    $Lines = if (Test-Path -LiteralPath $ConfigPath) { [string[]](Get-Content -LiteralPath $ConfigPath) } else { @() }
    $Result = [System.Collections.Generic.List[string]]::new()
    $Found = $false
    $InTopLevel = $true
    foreach ($Line in $Lines) {
        if ($Line -match '^\s*\[') {
            if ($InTopLevel -and -not $Found) {
                $Result.Add('model_instructions_file = "model-instructions.md"')
                $Result.Add('')
                $Found = $true
            }
            $InTopLevel = $false
        }
        if ($InTopLevel -and $Line -match '^\s*model_instructions_file\s*=') {
            $Result.Add('model_instructions_file = "model-instructions.md"')
            $Found = $true
        }
        else {
            $Result.Add($Line)
        }
    }
    if (-not $Found) {
        $Result.Add('model_instructions_file = "model-instructions.md"')
    }
    $Utf8WithoutBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllLines($ConfigPath, $Result, $Utf8WithoutBom)
}

try {
    New-Item -ItemType Directory -Force -Path $TemporaryDirectory | Out-Null
    $Archive = Join-Path $TemporaryDirectory "source.zip"
    Invoke-WebRequest -Uri "https://codeload.github.com/$Repository/zip/$Branch" -OutFile $Archive
    Expand-Archive -Path $Archive -DestinationPath $TemporaryDirectory
    $SourceRoot = Get-ChildItem -Path $TemporaryDirectory -Directory | Select-Object -First 1
    if (-not $SourceRoot) { throw "Downloaded archive is empty." }
    $Source = Join-Path $SourceRoot.FullName "codex"
    New-Item -ItemType Directory -Force -Path $Destination | Out-Null

    if ($Mode -eq "Replace") {
        foreach ($Name in @("config.toml", "model-instructions.md", "agents", "skills")) {
            $Path = Join-Path $Destination $Name
            if (Test-Path -LiteralPath $Path) {
                New-Item -ItemType Directory -Force -Path $Backup | Out-Null
                Copy-Item -LiteralPath $Path -Destination $Backup -Recurse -Force
                Remove-Item -LiteralPath $Path -Recurse -Force
            }
        }
        foreach ($Name in @("config.toml", "model-instructions.md", "agents", "skills")) {
            Copy-Item -LiteralPath (Join-Path $Source $Name) -Destination $Destination -Recurse -Force
        }
    }
    else {
        foreach ($Name in @("model-instructions.md", "agents", "skills")) { Copy-ManagedPath -Name $Name }
        $ConfigPath = Join-Path $Destination "config.toml"
        if (Test-Path -LiteralPath $ConfigPath) {
            New-Item -ItemType Directory -Force -Path $Backup | Out-Null
            Copy-Item -LiteralPath $ConfigPath -Destination $Backup -Force
        }
        Set-ModelInstructionsFile
    }

    Set-Content -LiteralPath (Join-Path $Destination ".openai-codex-agent-skills.install-mode") -Value $Mode.ToLowerInvariant()
    Write-Host "Codex setup installed in $Mode mode."
    if (Test-Path -LiteralPath $Backup) { Write-Host "Previous files were backed up to $Backup" }
    Write-Host "Restart Codex to load the new agents and skills."
}
finally {
    if (Test-Path -LiteralPath $TemporaryDirectory) { Remove-Item -LiteralPath $TemporaryDirectory -Recurse -Force }
}
