---
name: python
description: Engineer Python language, interpreter, typing, async, packaging, imports, subprocess, and serialization behavior. Use for Python-owned semantics; not non-Python work merely because pyproject.toml or a Python tool exists.
---

# Python

## Establish the Python contract

- Inspect the touched modules, `pyproject.toml`, lock and requirements files, `setup.cfg`, tox/nox configuration, runtime images, CI matrix, and project scripts. Resolve the interpreter actually used by the project command or environment and its exact version; distinguish it from the declared minimum in `requires-python` and classifiers.
- Identify the packaging workflow—such as uv, Poetry, PDM, Hatch, setuptools, pip-tools, pip, or conda—from repository evidence. Use its existing environments, dependency groups, lock behavior, entry points, and commands; do not substitute another tool.
- Determine package roots, import style, namespace packages, editable-install assumptions, generated metadata, type-checker mode, and sync/async entry points before editing.

Read [version, packaging, and security boundaries](references/version-packaging-security.md) before changing the minimum version, annotations, free-threaded behavior, packaging metadata or locks, archives, subprocesses, or serialization. Use [authoritative Python sources](references/sources.md) for exact interpreter and packaging behavior.

## Preserve language, typing, and package semantics

- Match syntax to the supported minimum: built-in generics, union syntax, `Self`, type-parameter syntax, exception groups, `TaskGroup`, and newer annotation behavior are version-sensitive.
- Type public APIs and non-obvious boundaries. Prefer precise read-only protocols such as `Sequence` and `Mapping`, structural `Protocol` where substitution is real, and `TypedDict` or dataclasses for stable records. Keep `Any`, casts, and ignores local.
- Treat annotations as tooling input, not runtime validation. Reflection and deferred annotations vary by Python version; verify before relying on evaluated annotation objects.
- Avoid import-time network calls, file mutation, secret reads, migrations, and worker startup. Keep library code from taking ownership of the event loop with `asyncio.run()`.
- Preserve packaging contracts: import names, entry points, extras or dependency groups, wheel contents, data files, editable installs, and minimum-Python metadata. Update locks only through the project's package manager when dependency input actually changes.
- Raise specific exceptions in libraries and translate them at CLI, worker, or service boundaries. Chain useful causes and clean up context-managed resources without hiding the original failure.

## Bound concurrency and unsafe boundaries

- Use async for I/O concurrency, not CPU acceleration. Keep blocking filesystem, database, network, sleep, and CPU-heavy calls off the event loop; use existing thread or process executors when required.
- Bound task creation, queues, pools, and worker counts. Use structured concurrency and timeout APIs only when supported by the minimum version. Preserve cancellation and re-raise `asyncio.CancelledError` after cleanup.
- Treat free-threaded builds and subinterpreters as separate compatibility targets. Verify extension and dependency support before assuming shared state is safe without the GIL or portable across interpreters.
- Prefer `subprocess.run` with a verified executable, argument list, `shell=False`, `check=True`, and a timeout. On Windows, batch wrappers still introduce shell parsing; never pass untrusted values through them.
- Do not load untrusted pickle, marshal, unsafe YAML, dynamic imports, or executable strings. Resolve user-controlled paths beneath an allowed root. For archives, validate members and bound count, total bytes, depth, links, and extraction location even when a safe filter is available.
- Use explicit encodings, timezone-aware datetimes, `Decimal` for exact decimal quantities, and stable serialization rules at persistent or public boundaries.

## Use project feedback

Run the smallest configured formatter or lint check, type checker, and focused test or import check that covers the touched package. Run tox/nox environments, build wheels/sdists, or test installed artifacts when changing supported Python versions, imports, entry points, package metadata, generated declarations, or dependency resolution. Exercise cancellation, subprocess failure, archive rejection, or serialization errors when those semantics changed.
