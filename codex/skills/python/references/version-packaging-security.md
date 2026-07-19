# Version, packaging, and security boundaries

## Establish the interpreter matrix

- Derive minimum/maximum Python from `requires-python`, classifiers, lock metadata, CI, tox/nox, containers, deployment, compiled extensions, and production inventory.
- Distinguish CPython version from implementation, build mode, operating system, architecture, ABI, libc, free-threaded build, and subinterpreter support.
- Use the Python Developer's Guide versions table for current branch status. On 2026-07-13 it showed 3.14 as the stable bugfix line and 3.15 as prerelease; always recheck.
- Test syntax/import behavior on the oldest supported interpreter and new-runtime behavior on every deployment target before widening support.

## Keep types and annotations version-aware

- Prefer the `type Alias = ...` statement when the minimum version supports it; use `TypeAlias` only for compatibility with older interpreters/tooling.
- Treat type hints as erased design/tooling metadata unless a framework deliberately evaluates them. Do not use them as input validation.
- Verify `annotationlib`, deferred annotations, runtime introspection, dataclass/framework evaluation, and serialization on the exact interpreter and library versions.
- Use PEPs for accepted design, history, and rationale; follow current `typing` and language/library docs for implemented behavior.

## Qualify free-threaded and multiple-interpreter claims

- Check whether the interpreter is a free-threaded build and whether every C extension, callback, global cache, and dependency declares compatible behavior.
- Do not infer thread safety from code that happened to be serialized by the GIL. Protect invariants or use message passing regardless of build.
- Verify extension/module support before using subinterpreters; process-global state, extension initialization, object sharing, and resource ownership can differ.
- Benchmark representative workloads. Removing the GIL or adding interpreters does not guarantee a speedup and can change memory and synchronization costs.

## Preserve packaging ownership

- Treat `pyproject.toml`, build backend, lockfile, virtual environment, index configuration, constraints, dependency groups, and project scripts as one workflow.
- Use Dependency Groups and `pylock.toml` only when the selected tools support the applicable specification/version. A PyPA specification does not imply tool adoption.
- Never edit resolved lock content by hand. Regenerate with the owning tool and review source/index, hashes, markers, platforms, extras, transitive changes, and build artifacts.
- Build sdist/wheel and inspect their contents and metadata. Test installation/import/entrypoints in a clean environment on supported Python versions.
- Prefer PyPI Trusted Publishers/OIDC and attestations with least-privilege CI permissions; avoid long-lived publishing tokens.

## Extract archives defensibly

1. Create a new isolated destination under a verified root with bounded available space.
2. On Python 3.12+, pass `filter="data"` explicitly for tar extraction; do not depend on a version-changing default.
3. Reject absolute and parent-traversal paths, dangerous links/devices, unexpected file types, excessive depth/count/size, duplicate overwrite tricks, and resource exhaustion.
4. Avoid following extracted links during later processing and do not execute/import extracted content.
5. Clean up only the verified isolated destination and report partial extraction safely.

The data filter reduces dangerous metadata but is not a denial-of-service, decompression-bomb, or disk-exhaustion defense.

## Invoke subprocesses without hidden shells

- Resolve a trusted executable and pass an argument list with `shell=False`, `check=True`, a timeout/cancellation plan, bounded output, explicit environment, and working directory where relevant.
- On Windows, the operating system can route `.bat`/`.cmd` through a shell even with `shell=False`. Never send untrusted values to a batch wrapper.
- If a shell is genuinely required, name the shell/grammar, constrain inputs through an allowlist, and test every supported platform; generic quoting is not portable.
- Distinguish spawn failure, timeout, signal/termination, nonzero exit, invalid encoding, and malformed output.

## Reject unsafe deserialization

- Never unpickle or unmarshal untrusted data. Signing an untrusted pickle can prove origin but does not make executing an authorized malicious payload safe.
- Use safe YAML loaders and restrict constructors/tags. Bound JSON/XML/message size, depth, number formats, and expansion behavior.
- Validate parsed external data into explicit internal types before side effects.
- Keep credentials, tokens, PII, and secrets out of reprs, exceptions, logs, traces, fixtures, and package artifacts.
