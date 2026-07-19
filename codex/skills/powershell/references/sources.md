# Authoritative sources

Microsoft Learn pages use version selectors, but lifecycle and module pages can remain rolling. Verify the installed PowerShell edition/version plus PSScriptAnalyzer and Pester majors. All sources were inspected and accessed 2026-07-13.

| Source | Publisher | Governed topic | Version or currentness | Access |
| --- | --- | --- | --- | --- |
| [PowerShell support lifecycle](https://learn.microsoft.com/en-us/powershell/scripting/install/powershell-support-lifecycle?view=powershell-7.5) | Microsoft PowerShell team | Release channels and support policy | Rolling article; 7.6 LTS described at inspection | 2026-07-13 |
| [PowerShell product lifecycle](https://learn.microsoft.com/en-us/lifecycle/products/powershell) | Microsoft Lifecycle | Support end dates | Rolling authoritative lifecycle table | 2026-07-13 |
| [PowerShell releases](https://github.com/PowerShell/PowerShell/releases) | Microsoft PowerShell project | Release artifacts | Rolling; v7.6.3 latest stable at inspection | 2026-07-13 |
| [`Start-Process`](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/start-process?view=powershell-7.6) | Microsoft | Process creation and `ArgumentList` behavior | Versioned 7.6 cmdlet docs | 2026-07-13 |
| [Preference variables](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_preference_variables?view=powershell-7.6) | Microsoft | `$PSNativeCommandArgumentPassing` and preferences | Versioned 7.6; native passing changed in 7.3 | 2026-07-13 |
| [Parsing](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_parsing?view=powershell-7.6) | Microsoft | Expression, argument and stop-parsing rules | Versioned 7.6 | 2026-07-13 |
| [Quoting rules](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_quoting_rules?view=powershell-7.6) | Microsoft | Expandable/verbatim strings and native quoting | Versioned 7.6 | 2026-07-13 |
| [Character encoding](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_character_encoding?view=powershell-7.6) | Microsoft | PowerShell 7 versus 5.1 encoding | Versioned 7.6; edition-sensitive | 2026-07-13 |
| [Try, catch, finally](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_try_catch_finally?view=powershell-7.6) | Microsoft | Terminating-error semantics | Versioned 7.6 | 2026-07-13 |
| [`CmdletBinding` and `ShouldProcess`](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_functions_cmdletbindingattribute?view=powershell-7.6) | Microsoft | Advanced-function behavior | Versioned 7.6 | 2026-07-13 |
| [`Invoke-ScriptAnalyzer`](https://learn.microsoft.com/en-us/powershell/module/psscriptanalyzer/invoke-scriptanalyzer?view=ps-modules) | Microsoft/PSScriptAnalyzer | Diagnostics and exit behavior | Rolling module docs; inspect installed version | 2026-07-13 |
| [Pester quick start](https://pester.dev/docs/quick-start) | Pester project | Current test syntax and runner | Rolling docs targeting Pester 6 at inspection | 2026-07-13 |
| [Pester v4 to v5 migration](https://pester.dev/docs/migrations/v4-to-v5) | Pester project | Discovery/Run breaking changes | Version-specific migration guide | 2026-07-13 |
| [Pester v5 to v6 migration](https://pester.dev/docs/migrations/v5-to-v6) | Pester project | Pester 6 compatibility changes | Version-specific migration guide | 2026-07-13 |
