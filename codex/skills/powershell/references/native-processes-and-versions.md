# Native processes and version behavior

## Establish the host contract

Record `$PSVersionTable.PSVersion`, `$PSVersionTable.PSEdition`, operating system, process architecture, `$PSNativeCommandArgumentPassing`, execution host, current provider, declared module versions, and supported Windows PowerShell compatibility before changing behavior.

Use the official lifecycle table rather than assuming a release is supported because it is installed. On 2026-07-13, documentation described PowerShell 7.6 as LTS, supported 7.5/7.4 servicing lines, and 7.7 preview; always recheck.

## Preserve native argument boundaries

- Prefer `& $Exe @Args` for a synchronous native process when PowerShell should pass an argument array and return output/exit status.
- Inspect `$PSNativeCommandArgumentPassing`: PowerShell 7.3+ supports `Legacy`, `Standard`, and `Windows`; Windows mode uses legacy handling for selected executable types such as `.cmd` and `.bat`.
- Test the exact receiver's `argv` for empty strings, quotes, trailing backslashes, Unicode, wildcard-like text, newlines, and leading hyphens.
- Avoid native command strings, `Invoke-Expression`, and batch wrappers for untrusted input. A batch file introduces `cmd.exe` parsing even when the caller expected direct process invocation.
- Check `$LASTEXITCODE` immediately after the native command and distinguish process exit from PowerShell exceptions.

## Use `Start-Process` for process control, not quoting convenience

- Use it when detachment, credentials, window style, redirection, environment, wait/pass-through, or another process-control feature is required.
- `-ArgumentList` accepts an array but joins it into one string. Build one correctly quoted string for the target executable's parser and test it; do not assume array entries remain `argv` entries.
- Use `-WindowStyle Hidden` for non-interactive background helpers launched from automation unless the user explicitly needs a visible interactive window.
- Capture the process with `-PassThru` when exit, wait, cancellation, or cleanup matters. Bound the wait and terminate only the verified process tree when authorized.

## Keep PowerShell and native failures distinct

- Use `-ErrorAction Stop` where a non-terminating PowerShell error must enter `catch`.
- Use `$LASTEXITCODE` for the last native process; `$?` alone does not preserve a detailed native failure contract.
- Emit structured objects on success and typed/terminating errors on failure. Keep display formatting at the caller boundary.
- Preserve error context and the original exception; do not hide failures with `SilentlyContinue` unless absence is an expected branch.

## Control encoding across editions

- Detect edition/version before relying on defaults. PowerShell 7 generally uses UTF-8 without BOM; Windows PowerShell 5.1 cmdlets have different defaults.
- Preserve an owned file's existing encoding/newlines unless the requested change requires a migration.
- Specify encoding at interoperability boundaries and test the consumer, especially Windows PowerShell scripts, CSV, redirected native output, and non-ASCII content.
- Do not pipe structured data through `Format-*` or `Out-String` before machine consumption.

## Make analysis fail the build intentionally

- Resolve the repository settings file and installed PSScriptAnalyzer version. Capture diagnostics and explicitly fail for the severities/rules the repository treats as gates, or use the supported exit behavior deliberately.
- Do not claim a clean analysis if the module was absent, a settings file failed to load, paths were skipped, or warnings were printed without affecting the exit status.
- Record excluded rules and generated/vendor paths; do not suppress a finding globally to hide one local false positive.

## Match Pester's major version

- Inspect the module manifest, lock/bootstrap script, CI installation, `Get-Module -ListAvailable Pester`, and repository configuration.
- Account for Pester 5 Discovery/Run changes and Pester 6 migration behavior. Do not copy current examples into an older suite without the matching guide.
- Keep fixtures isolated, mock at process boundaries, assert behavior and streams, and test `ShouldProcess` with `-WhatIf`/confirmation semantics where relevant.
- Run focused tests first, then the repository's configured suite in a clean session when module import/global state matters.
