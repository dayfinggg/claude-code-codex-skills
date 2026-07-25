# Model Instructions

Global working rules for every session. These define *how* to work; project-specific
knowledge (commands, stack, conventions) lives in each project's own CLAUDE.md.
Communication style and response shape are left to Claude Code's own defaults.

## 1. Engineering Quality: Simple, Precise, Fast

**Simplicity — no overengineering:**
- Don't add features, refactor, or introduce abstractions beyond what the task requires.
  A bug fix doesn't need surrounding cleanup; a one-shot operation usually doesn't need a helper.
- Don't design for hypothetical future requirements. Do the simplest thing that works well.
  Avoid premature abstraction — but avoid half-finished implementations too.
- Don't add error handling, fallbacks, or validation for scenarios that cannot happen.
  Trust internal code and framework guarantees. Validate only at system boundaries
  (user input, external APIs, file/network I/O).
- Prefer changing existing code over adding parallel new code. Reuse what the codebase
  already has (utils, patterns, dependencies) before writing something new.

**Scope and workspace safety:**
- Solve the root cause with the smallest complete change. Don't patch symptoms when
  the actual cause is reachable within the task's scope.
- Preserve existing user work: check version-control state before editing, distinguish
  pre-existing changes from your own, and never revert, overwrite, or reformat
  unrelated work. Keep the final diff focused on the requested outcome.
- Report unrelated failures you notice without fixing them, unless the user expands
  the scope.
- For bug fixes, reproduce the failure first when feasible and add a regression test
  where the repository has a test surface. Don't introduce a test framework into a
  project that has none unless asked.

**Attention to detail:**
- Read the surrounding code before editing it: match its naming, idioms, error-handling
  style, and comment density. New code should be indistinguishable from the code around it.
- Handle the edge cases that actually exist in the data flow you touched (empty input,
  boundary values, concurrent access if the code path is concurrent) — name them in your
  summary so the reviewer knows they were considered.

**Performance and speed:**
- Choose the right algorithm and data structure first — that's where performance lives.
  Avoid accidental O(n²) (lookups in lists inside loops, repeated re-parsing, N+1 queries).
- Don't do work twice: cache/reuse results within a code path, batch I/O and network
  calls, move invariant computation out of loops.
- Micro-optimize only with a measurement in hand. If performance matters for the task,
  measure before and after; otherwise prefer the clearest implementation.
- Your own workflow should be fast too: run independent tool calls in parallel,
  don't re-read files you already have, and don't re-derive facts already established.

## 2. Code Style & Completeness

**Self-documenting code:**
- Names carry the meaning: functions say what they do, variables say what they hold.
  Don't write comments, docstrings, inline explanations, or section headers in code.
- The single exception: a constraint the code itself cannot show (a workaround for a
  documented upstream bug, a non-obvious invariant). Never comment what the next line
  does, where code came from, or why your change is correct.

**Complete code only:**
- Every function you write ships complete: real logic, real data, and error handling
  that runs — never a placeholder, a TODO/FIXME stub, or an empty catch block.
- If the full implementation is too large for one pass, say so and agree on scope —
  don't ship a hollow skeleton that looks done.
- No feature flags or backwards-compatibility shims when you can just change the code.

**Modern, idiomatic, patterned:**
- Write code that is idiomatic for the language and current for the versions this
  project actually uses — check the manifest (package.json, pyproject.toml, go.mod)
  before choosing syntax or APIs.
- Follow the established patterns of the ecosystem (e.g. functional components and hooks
  in React, context managers in Python, error wrapping in Go) and of this codebase —
  when they conflict, the codebase wins.
- Prefer deep modules: simple interfaces hiding real logic. Don't extract pure functions
  just for testability while the real complexity hides in how they're called.

**Verify APIs before writing:**
- Never invent package names, APIs, methods, or config keys. If you're not certain a
  library function exists with that exact name and signature in the installed version,
  check first: read the dependency manifest and lockfile, look at the installed source
  or type definitions, or search the official docs.
- Match the installed major version — an API that exists in v5 may not exist in the
  project's v4. When docs and installed code disagree, the installed code wins.
- Never suggest installing a package you haven't verified exists in the registry.
- If verification isn't possible, say what you assumed instead of presenting a guess
  as fact.

## 3. Tools, Subagents & Memory

- Search before assuming: when the answer depends on information that may have changed
  since training (versions, APIs, prices, recent events) or that lives in the codebase,
  look it up instead of answering from memory.
- Choose the narrowest reliable tool for the question. Prefer repository-native tools
  and existing indexes before introducing new dependencies or services.
- For ordinary text and file discovery, prefer `rg` and `rg --files` when available,
  and use `fd` when filename or filesystem filters are the main question. Use
  `git grep` when tracked files, revisions, or Git path rules matter. Use
  language-aware tools for definitions, references, types, and safe renames, and
  syntax-tree tools for structural patterns or repeated transformations. Fall back to
  platform tools when they better fit stream input, portability, or availability.
- Don't treat a text match alone as proof of a semantic relationship. Confirm material
  conclusions through the compiler, language tooling, tests, call sites, or another
  independent signal as appropriate. Don't install heavyweight indexers or analysis
  tools unless repository scale or repeated work justifies their cost.
- Delegate when work fans out: for independent parallel streams (reading many files,
  checking many candidates, running separate investigations), use subagents. Work
  directly for single-file reads and sequential steps.
- Use persistent memory: before a non-trivial task, check memory for relevant prior
  context; write down corrections, confirmed approaches, and non-obvious project facts
  as you learn them — including why they mattered. Update existing notes rather than
  duplicating; delete notes that turn out to be wrong.
