---
name: powershell
description: Run or engineer PowerShell commands, scripts, cmdlets, modules, pipelines, quoting, paths, native calls, and error behavior. Use for PowerShell semantics; not generic Windows work or merely because the host is Windows.
---

# PowerShell

## Establish the PowerShell contract

- Inspect the touched command or script, module manifest, repository commands, Pester configuration, and declared compatibility. Resolve `$PSVersionTable.PSVersion`, `$PSVersionTable.PSEdition`, the host executable, relevant module versions, and `$PSNativeCommandArgumentPassing`; do not assume Windows PowerShell 5.1 and PowerShell 7 behave alike.
- Verify cmdlet and parameter behavior with `Get-Command` and `Get-Help`. Prefer native object/provider APIs over formatted-text parsing or routing filesystem work through `cmd.exe`, batch, WSL, or another shell.
- Use `-LiteralPath` for exact or user-provided paths. Build paths with `Join-Path` and resolve providers before applying filesystem-only assumptions.

Read [native processes and version behavior](references/native-processes-and-versions.md) before native invocation, `Start-Process`, cross-version encoding, lifecycle decisions, PSScriptAnalyzer, or Pester work. Use [authoritative PowerShell sources](references/sources.md) for exact version and edition behavior.

## Preserve parsing, pipeline, and error semantics

- Use single quotes for literals, double quotes only for expansion, `${Name}` before ambiguous name characters, and `$()` for expressions inside expandable strings. Prefer single-quoted here-strings for literal multiline text.
- Pass a verified executable and argument array through `& $Exe @Args`, then inspect `$LASTEXITCODE`. Test the receiver's actual `argv` for version-sensitive calls. `Start-Process -ArgumentList` joins values into one command line; use it only when process-control features justify constructing the target parser's quoting deliberately.
- Treat `.cmd` and `.bat` as separate parsing boundaries. Never pass untrusted arguments to batch wrappers, and never interpolate a command string merely to handle spaces in paths.
- Design pipelines around objects. Keep `Format-*` at the display boundary, emit structured objects from reusable functions, and use the correct output stream instead of formatting machine-readable output with `Write-Host`.
- Use `[CmdletBinding()]`, approved verb-noun names, typed parameters, validation, and parameter sets for reusable commands. Add `SupportsShouldProcess` for state-changing functions and avoid aliases or profile-dependent behavior in scripts.
- Use `-ErrorAction Stop` when a cmdlet failure must enter `catch`; many errors are otherwise non-terminating. Catch only where recovery or context differs, preserve the original failure, and do not hide errors with `SilentlyContinue` unless absence is expected and handled.

## Protect paths, state, and compatibility

- Before recursive delete, move, broad overwrite, or cleanup, resolve the absolute filesystem root and target and prove the target remains under the authorized root. Keep discovery and mutation in PowerShell and use preview or `-WhatIf` where supported.
- Preserve encoding and newline style when editing. Specify encoding when interoperability matters because Windows PowerShell 5.1 and PowerShell 7 have different defaults.
- Keep module exports explicit and validate manifests. Check command conflicts with `Get-Command -All`; do not install modules or change user/machine state without the task's authorization.
- Treat remoting, services, registry, scheduled tasks, cloud CLIs, and package installs as external state. Verify the exact target and authorization, clean up persistent sessions, and never infer permission for destructive remote work.
- Bound background jobs and parallel work, collect failures, and avoid shared mutable state across runspaces unless explicitly synchronized. Keep Claude Code command output targeted rather than recursively dumping large trees or logs.

## Use project feedback

Run a parser check for changed scripts, PSScriptAnalyzer when installed and configured, and focused Pester tests using the installed major and repository configuration. Import changed modules in a clean session when practical, validate manifests, and run the exact command or a safe preview. Report unavailable optional tools rather than claiming they ran.
