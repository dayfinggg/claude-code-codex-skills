param(
    [ValidateSet("Auto", "Codex", "Claude", "All")]
    [string]$Target = "Auto"
)

$ErrorActionPreference = "Stop"
$Repository = if ($env:CODEX_SKILLS_REPO) { $env:CODEX_SKILLS_REPO } else { "dayfinggg/claude-code-codex-skills" }
$Branch = if ($env:CODEX_SKILLS_BRANCH) { $env:CODEX_SKILLS_BRANCH } else { "main" }
$TemporaryDirectory = Join-Path ([System.IO.Path]::GetTempPath()) ("claude-code-codex-skills-" + [guid]::NewGuid())

try {
    New-Item -ItemType Directory -Path $TemporaryDirectory | Out-Null
    try {
        $Nonce = [DateTime]::UtcNow.Ticks
        $Commit = (Invoke-RestMethod `
            -Headers @{ Accept = "application/vnd.github+json"; "Cache-Control" = "no-cache"; "User-Agent" = "claude-code-codex-skills-updater" } `
            -Uri "https://api.github.com/repos/$Repository/commits/$Branch`?update=$Nonce").sha
    }
    catch {
        $Commit = $Branch
    }

    $Archive = Join-Path $TemporaryDirectory "source.zip"
    Invoke-WebRequest -Uri "https://codeload.github.com/$Repository/zip/$Commit" -OutFile $Archive
    Expand-Archive -Path $Archive -DestinationPath $TemporaryDirectory
    $SourceRoot = Get-ChildItem -Path $TemporaryDirectory -Directory | Select-Object -First 1
    if (-not $SourceRoot) {
        throw "Downloaded archive is empty."
    }

    function Update-Target {
        param(
            [string]$Name,
            [string]$Source,
            [string]$Destination,
            [string[]]$ManagedPaths
        )

        New-Item -ItemType Directory -Force -Path $Destination | Out-Null
        $ManifestPath = Join-Path $Destination ".claude-code-codex-skills.manifest"
        $VersionPath = Join-Path $Destination ".claude-code-codex-skills.version"
        $Stamp = [DateTime]::UtcNow.ToString("yyyyMMddTHHmmssZ")
        $BackupRoot = Join-Path $Destination ".claude-code-codex-skills-backups\$Stamp"
        $Previous = @{}

        if (Test-Path -LiteralPath $ManifestPath) {
            foreach ($Line in Get-Content -LiteralPath $ManifestPath) {
                $Parts = $Line -split "`t", 2
                if ($Parts.Count -eq 2) {
                    $Previous[$Parts[1]] = $Parts[0]
                }
            }
        }

        $SourceFiles = foreach ($ManagedPath in $ManagedPaths) {
            $Candidate = Join-Path $Source $ManagedPath
            if (Test-Path -LiteralPath $Candidate -PathType Container) {
                Get-ChildItem -LiteralPath $Candidate -File -Recurse
            }
            elseif (Test-Path -LiteralPath $Candidate -PathType Leaf) {
                Get-Item -LiteralPath $Candidate
            }
        }
        $SourceFiles = $SourceFiles | Sort-Object FullName
        $Current = @{}
        $Updated = 0
        $Unchanged = 0
        $Removed = 0
        $Preserved = 0

        foreach ($SourceFile in $SourceFiles) {
            $SourcePrefix = $Source.TrimEnd("\", "/") + [System.IO.Path]::DirectorySeparatorChar
            $Relative = $SourceFile.FullName.Substring($SourcePrefix.Length)
            $Relative = $Relative.Replace("\", "/")
            $TargetFile = Join-Path $Destination $Relative
            $Hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $SourceFile.FullName).Hash.ToLowerInvariant()
            $Current[$Relative] = $Hash

            if ($Previous.ContainsKey($Relative) -and $Previous[$Relative] -eq $Hash) {
                if ((Test-Path -LiteralPath $TargetFile -PathType Leaf) -and
                    ((Get-FileHash -Algorithm SHA256 -LiteralPath $TargetFile).Hash.ToLowerInvariant() -eq $Hash)) {
                    $Unchanged++
                }
                else {
                    Write-Host "Preserved local change to upstream-unchanged file: $TargetFile"
                    $Preserved++
                }
                continue
            }
            if ((Test-Path -LiteralPath $TargetFile -PathType Leaf) -and
                ((Get-FileHash -Algorithm SHA256 -LiteralPath $TargetFile).Hash.ToLowerInvariant() -eq $Hash)) {
                $Unchanged++
                continue
            }

            if (Test-Path -LiteralPath $TargetFile) {
                $BackupFile = Join-Path $BackupRoot $Relative
                New-Item -ItemType Directory -Force -Path (Split-Path -Parent $BackupFile) | Out-Null
                Copy-Item -LiteralPath $TargetFile -Destination $BackupFile -Force
            }
            New-Item -ItemType Directory -Force -Path (Split-Path -Parent $TargetFile) | Out-Null
            Copy-Item -LiteralPath $SourceFile.FullName -Destination $TargetFile -Force
            $Updated++
        }

        foreach ($Entry in $Previous.GetEnumerator()) {
            if ($Current.ContainsKey($Entry.Key)) {
                continue
            }
            $TargetFile = Join-Path $Destination $Entry.Key
            if (-not (Test-Path -LiteralPath $TargetFile -PathType Leaf)) {
                continue
            }
            $CurrentHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $TargetFile).Hash.ToLowerInvariant()
            if ($CurrentHash -eq $Entry.Value) {
                $BackupFile = Join-Path $BackupRoot $Entry.Key
                New-Item -ItemType Directory -Force -Path (Split-Path -Parent $BackupFile) | Out-Null
                Copy-Item -LiteralPath $TargetFile -Destination $BackupFile -Force
                Remove-Item -LiteralPath $TargetFile
                $Removed++
            }
            else {
                Write-Host "Preserved locally modified retired file: $TargetFile"
                $Preserved++
            }
        }

        $Manifest = $Current.GetEnumerator() |
            Sort-Object Key |
            ForEach-Object { "$($_.Value)`t$($_.Key)" }
        $Utf8WithoutBom = New-Object System.Text.UTF8Encoding($false)
        [System.IO.File]::WriteAllLines($ManifestPath, [string[]]$Manifest, $Utf8WithoutBom)
        [System.IO.File]::WriteAllText($VersionPath, "$Commit`n", $Utf8WithoutBom)
        Write-Host "${Name}: updated=$Updated unchanged=$Unchanged removed=$Removed preserved=$Preserved commit=$Commit"
    }

    $RunCodex = $Target -in @("Codex", "All")
    $RunClaude = $Target -in @("Claude", "All")
    if ($Target -eq "Auto") {
        $RunCodex = Test-Path -LiteralPath (Join-Path $HOME ".codex") -PathType Container
        $RunClaude = Test-Path -LiteralPath (Join-Path $HOME ".claude") -PathType Container
    }
    if (-not $RunCodex -and -not $RunClaude) {
        throw "No existing ~/.codex or ~/.claude installation found. Use -Target Codex, Claude, or All."
    }

    if ($RunCodex) {
        Update-Target `
            -Name "Codex" `
            -Source (Join-Path $SourceRoot.FullName "codex") `
            -Destination (Join-Path $HOME ".codex") `
            -ManagedPaths @("model-instructions.md", "agents", "skills")
    }
    if ($RunClaude) {
        Update-Target `
            -Name "Claude" `
            -Source (Join-Path $SourceRoot.FullName "claude") `
            -Destination (Join-Path $HOME ".claude") `
            -ManagedPaths @("CLAUDE.md", "agents", "skills", "output-styles")
    }

    Write-Host "Local config.toml and settings.json were not changed. Restart the updated application."
}
finally {
    if (Test-Path -LiteralPath $TemporaryDirectory) {
        Remove-Item -LiteralPath $TemporaryDirectory -Recurse -Force
    }
}
