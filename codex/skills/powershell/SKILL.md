---
name: powershell
description: Run or engineer PowerShell commands, .ps1 scripts, modules, functions, filesystem operations, pipelines, remoting, encoding, error handling, Pester tests, or PSScriptAnalyzer workflows.
---

# PowerShell

## Operating Rules

- Do not invent command output, project facts, module APIs, parameter names, execution-policy state, installed versions, test results, or Windows behavior. Verify with local files, `Get-Command`, `Get-Help`, `$PSVersionTable`, test output, or official Microsoft Learn documentation.
- Use official Microsoft Learn pages for behavior that changes by version or edition, especially quoting/parsing, encoding, remoting, module packaging, and cmdlet/function semantics.
- Prefer native PowerShell object and provider APIs. Avoid ad hoc text parsing when cmdlets emit objects, and avoid shelling through `cmd.exe`, batch, WSL, or another shell for PowerShell-manageable filesystem operations.

## Running Commands

- Identify host and edition before relying on version-specific behavior:

```powershell
$PSVersionTable
Get-Command pwsh, powershell -ErrorAction SilentlyContinue
```

- For production automation, prefer a supported PowerShell 7 LTS or stable release over Windows PowerShell 5.1 unless the project or host requires 5.1 compatibility. Verify lifecycle and .NET runtime details with Microsoft Learn when support status matters.
- Use explicit commands and bounded output. Prefer targeted `Get-ChildItem`, `Select-String`, `Get-Content -TotalCount`, `Measure-Object`, and `Format-List` over recursive dumps.
- Pass paths through parameters, not command-string interpolation. Use `-LiteralPath` for exact user-provided paths and paths containing wildcard characters. Use `Join-Path`, `Split-Path`, and `Resolve-Path -LiteralPath`.
- For ordinary native invocation, pass a verified executable and argument array through the call operator: `& $Exe @Args`. Inspect `$PSVersionTable` and `$PSNativeCommandArgumentPassing` for version-sensitive calls, and test the receiving `argv`. Use `--%` only for interactive Windows-only commands where PowerShell parsing is the problem; avoid it in reusable scripts.
- Check native command success with `$LASTEXITCODE` when the command is an external executable. Check PowerShell success with exceptions, `$?`, or command-specific output.
- Use `Start-Process` only when process-control features are required. Its `-ArgumentList` array is joined into one command-line string and does not preserve `argv` boundaries; construct one correctly quoted string for the target parser deliberately. When launching a background process from Codex or automation, keep it non-interactive unless the user requested a visible window:

```powershell
Start-Process -FilePath $Exe -ArgumentList $QuotedArgumentString -WindowStyle Hidden
```

Avoid `.cmd` and `.bat` wrappers for untrusted arguments. PowerShell's native argument mode can fall back to legacy behavior for these executable types.

## Quoting And Paths

- Use single quotes for literal strings. Use double quotes only when expansion is needed. Use `${Name}` when a variable is followed by `:` or name characters, and `$()` for expressions or property access inside expandable strings.
- Prefer single-quoted here-strings for literal multi-line content and double-quoted here-strings only when expansion is intended.
- Never build a command line just to handle paths with spaces. This is correct:

```powershell
Copy-Item -LiteralPath $Source -Destination $Destination -Recurse
```

This is fragile:

```powershell
powershell -Command "Copy-Item '$Source' '$Destination' -Recurse"
```

- For Windows paths, do not trim trailing backslashes blindly. Normalize only when needed with .NET or PowerShell path APIs.
- If a provider path might not be a filesystem path, verify the provider with `Get-Item -LiteralPath $Path` before applying filesystem-only assumptions.

## Safe Filesystem Operations

- Before any recursive delete, recursive move, broad overwrite, or generated cleanup, resolve and verify the absolute target stays inside the intended workspace or explicitly named target directory.
- Do not enumerate paths in PowerShell and pass them to another shell for deletion or moving. Keep discovery and mutation in PowerShell with `-LiteralPath`.
- Prefer previewable operations:

```powershell
$Root = Get-Item -LiteralPath $Workspace -ErrorAction Stop
$Target = Get-Item -LiteralPath $Candidate -ErrorAction Stop
if ($Root.PSProvider.Name -ne 'FileSystem' -or $Target.PSProvider.Name -ne 'FileSystem') {
    throw 'Refusing to modify non-filesystem provider paths.'
}
$RootPath = [System.IO.Path]::GetFullPath($Root.FullName)
$TargetPath = [System.IO.Path]::GetFullPath($Target.FullName)
$RelativePath = [System.IO.Path]::GetRelativePath($RootPath, $TargetPath)
if ([System.IO.Path]::IsPathRooted($RelativePath) -or $RelativePath -eq '..' -or $RelativePath.StartsWith('..' + [System.IO.Path]::DirectorySeparatorChar) -or $RelativePath.StartsWith('..' + [System.IO.Path]::AltDirectorySeparatorChar)) {
    throw "Refusing to modify path outside workspace: $TargetPath"
}
Remove-Item -LiteralPath $TargetPath -Recurse -Force -WhatIf
```

- Use `SupportsShouldProcess` for functions that create, modify, move, delete, overwrite, invoke remote work, start or stop services/processes, install modules, or change machine/user state.
- When editing files, preserve existing encoding and newline style when practical. In PowerShell 7+, text output defaults to UTF-8 without BOM; Windows PowerShell 5.1 differs, so check Microsoft Learn before relying on defaults.

## Pipelines And Objects

- Design pipelines around objects, not formatted text. Keep `Format-*` at the display boundary only.
- Use `Where-Object`, `ForEach-Object`, `Sort-Object`, `Group-Object`, `Select-Object`, and `Measure-Object` for object processing. Use `.Where()` and `.ForEach()` only when the code is clearly local and materializing collections is acceptable.
- For advanced functions that accept pipeline input, use `begin`, `process`, and `end`; bind with `[Parameter(ValueFromPipeline)]` or `[Parameter(ValueFromPipelineByPropertyName)]` intentionally.
- Emit objects with properties for downstream use. Avoid `Write-Host` except for deliberate host-only user interface output.

## Authoring Scripts And Functions

- Use approved verb-noun names. Verify unfamiliar verbs with `Get-Verb`; prefer names such as `Get-*`, `Set-*`, `New-*`, `Remove-*`, `Test-*`, `Invoke-*`, `ConvertTo-*`, and `ConvertFrom-*`.
- Use `[CmdletBinding()]` for production functions. Add `SupportsShouldProcess` and an appropriate `ConfirmImpact` for state-changing functions.
- Use typed parameters, validation attributes, parameter sets when they reduce ambiguity, and explicit defaults. Avoid aliases in scripts and modules unless preserving an established public API.
- Prefer `param()` at the top of scripts. Avoid dependence on profiles, current directory, ambient variables, and global state.
- Use `Set-StrictMode -Version Latest` only in a controlled host with tested upgrade behavior. For reusable cross-version modules, select and test an explicit strictness level when compatibility is contractual; otherwise avoid introducing strict mode into existing scripts without checking impact.

## Errors And Reliability

- Use `-ErrorAction Stop` when failure must be caught. `try`/`catch` catches terminating errors; many cmdlets emit non-terminating errors unless `-ErrorAction Stop` is set.
- Catch specific exception types when recovery differs. Otherwise include useful context and rethrow or `throw` a new clear error.
- Do not suppress errors with `SilentlyContinue` unless absence is explicitly acceptable and handled.
- Use `Write-Verbose`, `Write-Debug`, `Write-Information`, `Write-Warning`, and `Write-Error` for the right stream. Do not use formatted console text as machine-readable output.
- For native commands, capture both streams only when needed, and preserve exit codes:

```powershell
& $Exe @Args
if ($LASTEXITCODE -ne 0) {
    throw "$Exe failed with exit code $LASTEXITCODE"
}
```

## Modules

- Use a module when functions are reused, tested, or exported as a public API. Keep private helpers unexported.
- Prefer a `.psm1` with a `.psd1` manifest for production modules. Validate manifests with `Test-ModuleManifest`.
- Export only intentional public commands with `Export-ModuleMember` or manifest `FunctionsToExport`; avoid wildcard exports in stable modules.
- Do not add dependencies or install modules without checking project conventions. Prefer `CurrentUser` scope over machine-wide installation when installation is necessary.
- Check command discovery and conflicts with:

```powershell
Get-Command -Module ModuleName
Get-Command CommandName -All
```

## Remoting And External State

- Treat remoting as high risk. Before `Invoke-Command`, `Enter-PSSession`, `New-PSSession`, service changes, registry changes, scheduled tasks, cloud CLIs, or package installs, verify the target, credentials, side effects, and user authorization.
- Never run destructive remote commands from inferred context. Require explicit target and intent.
- Remember that `Invoke-Command -ComputerName` creates a temporary session; use `New-PSSession` only when persistent state is required and clean it up with `Remove-PSSession`.

## Encoding And Cross-Version Behavior

- Check `$PSVersionTable.PSVersion` and `$PSVersionTable.PSEdition` before assuming defaults.
- PowerShell 7+ generally writes UTF-8 without BOM for text output. Windows PowerShell 5.1 often uses different defaults and may need UTF-8 with BOM for non-ASCII scripts. Verify with Microsoft Learn before changing files shared across versions.
- Specify `-Encoding` for `Set-Content`, `Add-Content`, `Out-File`, `Export-Csv`, and related cmdlets when interoperability matters.
- Avoid `Out-File` for structured data. Prefer `Export-Csv`, `ConvertTo-Json`, `Export-Clixml`, or direct object output according to consumer needs.

## Performance

- Filter early with provider/cmdlet parameters before piping. Prefer `Get-ChildItem -Filter` over broad enumeration followed by `Where-Object` when supported.
- Avoid repeated array concatenation in loops. Use pipelines, generic lists, or collect once when necessary.
- Avoid `Format-*`, `Out-String`, and full materialization in hot paths unless display text is the goal.
- Use `ForEach-Object -Parallel` only after checking PowerShell version, thread-safety, startup cost, and whether the work is large enough to benefit.
- Keep command output bounded in Codex runs; avoid unbounded recursive listings, full event logs, and full build logs unless necessary.

## Testing And Validation

- Match validation to risk. For command-only work, run the exact command or a safe preview. For scripts, run parser checks, PSScriptAnalyzer when available, and focused tests. For modules, import in a clean session when practical.
- Parse-check scripts before claiming they are valid:

```powershell
$tokens = $null
$errors = $null
[System.Management.Automation.Language.Parser]::ParseFile($Path, [ref] $tokens, [ref] $errors) > $null
if ($errors) { $errors | Format-List *; throw 'PowerShell parse errors found.' }
```

- Use PSScriptAnalyzer if installed; do not pretend it ran if the module is unavailable:

```powershell
if (Get-Module -ListAvailable -Name PSScriptAnalyzer) {
    $Findings = Invoke-ScriptAnalyzer -Path $Path -Recurse -Severity Warning, Error
    if ($Findings) { $Findings; throw 'PSScriptAnalyzer findings failed validation.' }
}
```

- Use Pester tests when present. Inspect the installed or declared Pester major and repository configuration before writing or running tests; Pester 5 changed Discovery/Run behavior and current documentation can target Pester 6. Discover before running broad suites:

```powershell
Get-ChildItem -LiteralPath . -Recurse -Filter '*.Tests.ps1'
Invoke-Pester -Path .\tests
```

## Microsoft Learn References

Use these official pages when details matter:

- `about_Quoting_Rules`
- `about_Parsing`
- `about_Pipelines`
- `about_Functions_CmdletBindingAttribute`
- `Approved Verbs for PowerShell Commands`
- `about_Try_Catch_Finally` and `about_Error_Handling`
- `about_Character_Encoding`
- `about_Modules`
- `about_Remote` and `about_Remote_Requirements`
- `PSScriptAnalyzer` rule documentation

Read [native processes and version behavior](references/native-processes-and-versions.md) before native invocation, `Start-Process`, cross-version encoding, lifecycle decisions, PSScriptAnalyzer, or Pester work.

## References

- Read [native processes and version behavior](references/native-processes-and-versions.md) for argument passing, parser boundaries, lifecycle, encoding, errors, ScriptAnalyzer, and Pester compatibility.
- Read [authoritative PowerShell sources](references/sources.md) for exact version/edition behavior. Pin PowerShell, PSScriptAnalyzer, and Pester versions before using rolling documentation.
