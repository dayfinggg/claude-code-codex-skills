---
name: python
description: Production Python engineering workflow for creating, modifying, reviewing, testing, packaging, typing, securing, and validating Python code. Use when working in Python repositories or touching .py files, pyproject.toml, requirements or lock files, Python tests, async/concurrency code, architecture, dependencies, security-sensitive Python paths, or Python tooling.
---

# Python

## Operating Rules

- Inspect project files before giving advice or editing code. Use `pyproject.toml`, lock files, `requirements*.txt`, `setup.cfg`, `tox.ini`, `noxfile.py`, CI, README, tests, and nearby code as the source of truth.
- Do not invent files, commands, package versions, APIs, flags, framework behavior, or test results. If evidence is missing, say what is unknown.
- For unstable or version-specific claims, verify against project metadata and official documentation before relying on memory. Prefer `docs.python.org`, `packaging.python.org`, pytest docs, and the official docs for the framework or library in use.
- Preserve existing architecture, style, and user edits. Make the smallest change that solves the requested problem.
- Use the project's package manager, formatter, linter, type checker, and test runner. Do not replace tooling because another tool is currently fashionable.
- Ask for clarification only when ambiguity blocks a safe implementation. Otherwise proceed with conservative project-compatible assumptions.

## First Pass

1. Identify the supported Python version from `requires-python`, classifiers, runtime images, CI matrices, tox/nox envs, or lock files.
2. Identify the packaging and dependency workflow: `uv`, Poetry, PDM, Hatch, setuptools, pip-tools, plain pip, conda, or project-specific scripts.
3. Locate the relevant package, entry points, tests, fixtures, configuration, and call sites with targeted search.
4. Determine the cheapest useful validation command before editing.
5. For non-trivial or cross-cutting changes, keep a short internal plan and update it as facts change; report plans only when the user asks or a safe decision blocks progress.

## Design And Architecture

- Keep domain logic separate from I/O, framework adapters, persistence, CLI parsing, environment lookup, time, randomness, and network calls.
- Preserve existing layering. Typical boundaries are API/CLI, service or use-case logic, domain models, persistence, and infrastructure clients.
- Put dependencies at the edges. Use small protocols or adapter interfaces when code needs substitutable external services.
- Prefer clear functions and cohesive classes over clever abstractions. Add an abstraction only when it removes real duplication or isolates a volatile dependency.
- Avoid import-time side effects. Importing a module should not open sockets, read secrets, mutate global state, run migrations, or start worker loops.
- Parse configuration once near the application edge. Keep secrets out of source, logs, test snapshots, and default reprs.
- Use `pathlib`, context managers, explicit encodings, timezone-aware datetimes, and `Decimal` for money or exact decimal quantities.
- Use structured logging for services and libraries. Reserve `print` for small scripts and CLIs where it is the user interface.

## Typing Rules

- Type public APIs, dataclasses/models, fixtures with non-obvious shape, callbacks, async boundaries, and complex internal helpers.
- Match syntax to the project's minimum Python version. Use newer syntax such as `list[str]`, `X | Y`, `Self`, the `type Alias = ...` statement, or type parameters only when supported or already standardized in the project. Retain `TypeAlias` for older-version compatibility; it has been deprecated since Python 3.12 without a planned removal.
- For Python 3.14+ projects, verify current `typing`, `annotationlib`, t-string, and concurrency behavior against official docs before relying on new syntax or reflection semantics. Use PEPs for rationale/status and current language/library documentation for implemented behavior.
- Prefer precise interfaces: `Sequence` over `list` for read-only inputs, `Mapping` over `dict` for read-only mappings, `Iterable` for streams, `Protocol` for structural dependencies, and `TypedDict` or dataclasses for structured dictionaries.
- Avoid widening to `Any`. If `Any`, `cast`, or `# type: ignore` is necessary, keep it local and explain why when the reason is not obvious.
- Treat type hints as design and tooling input, not runtime validation. Validate untrusted data explicitly at the boundary.
- Use `typing_extensions` only when the project already depends on it or the compatibility benefit justifies the dependency.

## Testing Rules

- Add or update tests for changed behavior unless the change is mechanical and existing tests cover it.
- Follow the existing test framework. Use pytest conventions when pytest is present; use `unittest` where the project already uses it.
- Test behavior, boundaries, and regressions. Include success cases, representative failure cases, and edge cases tied to the bug or feature.
- Keep tests deterministic and isolated. Use fixtures such as `tmp_path`, `monkeypatch`, and log capture instead of real home directories, clocks, network calls, or global environment mutation.
- Mock only process boundaries: network, subprocesses, time, randomness, file systems outside temp dirs, and expensive external services. Do not mock the unit under test into tautology.
- Prefer small focused tests first, then broader integration tests for high-risk paths.
- If a bug is fixed, make the test fail before the fix when practical.

## Tooling And Dependencies

- Centralize project metadata and tool configuration in `pyproject.toml` when the project already uses it. Do not migrate scattered config opportunistically.
- Respect lock files. When changing dependencies, update the lock file with the project's tool and include the lock change.
- Separate runtime dependencies from development/test dependencies using the project's existing convention. Use dependency groups, `pylock.toml`, or other PyPA packaging features only when the tooling in the project supports them.
- Do not add dependencies for small standard-library-solvable problems. If adding one, justify maintenance, security, license, transitive dependency, and deployment impact.
- Do not install packages globally. Use the existing virtual environment, tool runner, or project command.
- Do not use `sudo pip` or `--break-system-packages` unless the user explicitly asks after the system-package risk is clear.
- For PyPI publishing, prefer Trusted Publishers/OIDC and attestations over long-lived API tokens when the project and CI provider support them.
- Run formatter/linter/type checker commands that the project already defines. Common tools include Ruff, Black, isort, mypy, Pyright, pytest, coverage, tox, and nox.
- Avoid changing generated files, vendored files, lock files, or snapshots unless the task requires it and the generation path is known.

## Security Rules

- Treat all external input as untrusted: HTTP requests, CLI args, environment variables, files, archives, database rows, queue messages, and model/tool output.
- Never hardcode or log secrets, tokens, passwords, API keys, private URLs, session cookies, or full authorization headers.
- Validate paths before reading or writing user-controlled locations. Resolve paths and prevent traversal outside the intended root.
- When extracting archives, enforce safe extraction filters or explicit member validation, reject path traversal and unsafe links, and bound extracted size and file count where possible. When extracting tar archives on Python 3.12+, pass `filter="data"` explicitly for stable intent across versions; the filter is not a denial-of-service defense, so still extract into an isolated directory and bound count, total bytes, per-file bytes, depth, links, and resource use. For other formats or older runtimes, validate every member equivalently.
- Use parameterized database queries and framework-safe query builders. Do not concatenate SQL or shell commands with untrusted input.
- Prefer `subprocess.run([...], shell=False, check=True, timeout=...)` with a verified executable and argument list. If a shell is unavoidable, document why and quote inputs safely. On Windows, `.bat`/`.cmd` files can still be launched through the system shell; never pass untrusted values to batch wrappers, and use a real executable or platform-safe API instead.
- Avoid `eval`, `exec`, unsafe YAML loaders, dynamic imports from untrusted strings, and `pickle` or marshal data from untrusted sources.
- For network clients, set timeouts, validate TLS by default, and guard URL fetchers against SSRF where user-supplied URLs are possible.
- Retry only transient failures, only when the operation is idempotent or protected by an idempotency key, with bounded attempts, backoff plus jitter, and `Retry-After` support when available.
- Use secure randomness from `secrets` for tokens. Do not use `random` for security-sensitive values.
- Check dependency-audit or vulnerability tools if the project has them, especially after dependency changes.

## Async And Concurrency

- Use async for I/O concurrency, not CPU speedups. Use processes, native/vectorized libraries, or worker pools for CPU-bound work.
- Do not block the event loop with synchronous file, network, database, sleep, or CPU-heavy calls. Move blocking work to a thread or process executor when necessary.
- Bound concurrency with semaphores, queues, pools, or worker limits. Avoid unbounded task creation.
- Use explicit timeouts and cancellation-aware cleanup around external calls.
- Prefer structured concurrency such as `asyncio.TaskGroup` and `asyncio.timeout` when the project's supported Python version allows it. Otherwise use existing project patterns with clear error and cancellation handling.
- Treat free-threaded Python and subinterpreter-based concurrency as version- and extension-sensitive. Verify dependency support before assuming code is safe without the GIL or across interpreters.
- Do not swallow `asyncio.CancelledError` unless cleanup requires it; re-raise after cleanup.
- Library code should not call `asyncio.run()` internally or assume ownership of the event loop.
- Keep thread-shared state minimal. Protect shared mutation with locks or queues and document invariants.

## Data And API Boundaries

- Validate and normalize untrusted data at the boundary, then pass typed internal objects through the core.
- Preserve backward compatibility for public APIs, CLIs, serialized data, migrations, and config unless the user explicitly requests a breaking change.
- Make errors actionable. Raise specific exceptions in libraries; translate them to user-facing messages at CLI/API boundaries.
- For APIs and services, handle idempotency, retries, pagination, rate limits, and partial failures deliberately.
- Keep serialization formats stable. Avoid changing JSON field names, nullability, date formats, or enum values without tests and migration notes.

## Validation Before Final Response

- Re-read the touched code or inspect the exact diff before finalizing.
- Run the cheapest useful validation first: targeted tests, import checks, lint, format check, type check, or a narrow integration command.
- Escalate to broader tests when the change touches shared infrastructure, public APIs, concurrency, persistence, security-sensitive behavior, packaging, or dependency resolution.
- If validation fails, use the failure output as evidence and repair once the cause is understood.
- If a command cannot be run, state that clearly with the residual risk.



