---
name: production-code-quality
description: Apply current language-specific engineering standards and production quality gates when creating a project or modifying retained source code, including legacy or low-quality codebases. Use for features, fixes, refactors, migrations, integrations, APIs, and new applications in any language; skip disposable experiments and generated or vendored code unless explicitly in scope.
---

# Production Code Quality

1. Detect every language, version, framework, runtime, target platform, package manager, and build system in scope. Read repository instructions, nearby patterns, manifests, lockfiles, formatter, linter, analyzer, compiler, and test configuration before choosing a convention.
2. Load exactly the applicable language reference: [Python](references/python.md), [TypeScript and JavaScript](references/typescript-javascript.md), [Go](references/go.md), [Rust](references/rust.md), [Java and Kotlin](references/java-kotlin.md), [.NET](references/dotnet.md), [C and C++](references/c-cpp.md), or [Swift](references/swift.md). For every unlisted language, use [other languages](references/other-languages.md) and current official documentation.
3. Assess the existing quality baseline before preserving conventions. Keep compatible, deliberate conventions, but do not reproduce unsafe, obsolete, inconsistent, or unmaintainable patterns. In a low-quality codebase, make new code and every touched responsibility a clean local precedent, improving adjacent code when required for correctness, cohesion, or reliable verification. Preserve behavior and compatibility, keep the change bounded, and expand into unrelated debt only with explicit user approval. For new projects, select maintained stable tooling and official defaults appropriate to the target environment.
4. Design precise names, cohesive units, explicit contracts and ownership, simple control flow, deliberate error handling, minimal dependencies, and the smallest public surface. Introduce a pattern only for a concrete force it resolves.
5. Treat size as a design signal, not a universal line limit. Split code when responsibilities, reasons to change, branching complexity, reviewability, or testability demand it; obey configured numeric limits when present.
6. Use `$design-project-architecture` when creating a project or changing module, dependency, ownership, data, runtime, or deployment boundaries. Use `$domain-modeling` for domain-rich rules or unclear business boundaries. Use `$tdd` when test-first development is requested, required, or appropriate for changed observable behavior.
7. Load [security](references/security.md), [testing](references/testing.md), or [compatibility](references/compatibility.md) only when their trigger conditions apply. Implement completely, then run the configured formatting, analysis, compilation, tests, build, and relevant runtime checks.

Finish when changed code meets the strongest compatible project and current language rules, every changed contract is verified, and no material quality gate remains unrun without an explicit reason. Report legacy constraints that prevent the touched area from meeting that bar.
