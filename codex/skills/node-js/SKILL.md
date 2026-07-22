---
name: node-js
description: Engineer Node.js processes, modules, asynchronous I/O, packages, workers, CLIs, and runtime APIs. Use only when correctness depends on those Node mechanics; not for ordinary backend or API logic merely hosted on Node, browser React, TypeScript types, or package.json alone.
---

# Node.js

## Establish the runtime contract

- Inspect `package.json`, lockfiles, `packageManager`, version files, `engines`, `type`, `exports`, `imports`, scripts, deployment images, CI, and the touched runtime entry points. Resolve the Node and package-manager versions actually used locally and in deployment; a declared range is not the executed version.
- Identify whether the code is a long-lived service, worker, CLI, library, test runner, build tool, serverless function, or edge adapter. Verify available Node APIs, filesystem durability, connection reuse, signal delivery, and execution deadlines for that host.
- Determine ESM/CJS behavior from file extensions, package scope, compiler output, loaders, and conditional exports. Do not infer it from source syntax alone.

Read [runtime compatibility and operations](references/runtime-compatibility-operations.md) before runtime upgrades, built-in TypeScript execution, signal or process work, child processes, test servers, permissions, or graceful shutdown. Use [authoritative Node.js sources](references/sources.md) for exact release status and API behavior.

## Preserve process and package semantics

- Keep startup in an explicit entry point or lifecycle hook. Avoid import-time sockets, timers, mutable-file reads, and connections that make imports order-dependent.
- Validate configuration at process start and fail with actionable errors. Keep library entry points side-effect-light and expose only intentional paths through `exports` and matching declarations.
- Preserve ESM/CJS interop deliberately: default versus named exports, file extensions, dynamic import, top-level `await`, test loaders, and package conditions must agree with real consumers. Node type stripping does not typecheck or generally honor `tsconfig` paths or transforms.
- For CLIs, parse arguments explicitly, send diagnostics to stderr, data to stdout, and set exit codes deliberately. Avoid depending on profiles, current directory, or ambient global state unless part of the contract.

## Bound asynchronous and external work

- Await or register every task with ownership, error reporting, and shutdown behavior. Choose parallel, settled, sequential, queued, or worker execution from ordering and partial-failure requirements; never use async callbacks with `forEach`.
- Bound concurrency, queue depth, buffers, caches, listeners, and fan-out. Use stream pipeline helpers and respect backpressure for large input. Move CPU-heavy work off request loops when it would block other work.
- Propagate cancellation with `AbortSignal` where supported, impose deadlines on external calls, and release handles in `finally` or lifecycle hooks. Retry only transient, idempotent work with bounded attempts and no ambiguity after partial commit.
- Implement graceful shutdown as an idempotent sequence: stop admission, drain bounded in-flight work, close servers, sockets, workers, and clients, enforce a hard deadline, and preserve the intended exit status. Installing signal handlers changes Node's default signal exit behavior.
- Bind test servers to an ephemeral port, await readiness, retain the listener, and close it. Do not hard-code a supposedly free port.

## Protect runtime boundaries

- For `child_process`, pass a verified executable and argument array with `shell: false`; treat `.cmd` and `.bat` as separate quoting languages and never pass untrusted values through them.
- Resolve user-controlled paths against an allowed base. Avoid unsafe `vm`, dynamic code evaluation, unbounded regex work, prototype-key assignment, and unsafe deserialization.
- Treat the Permission Model as defense in depth, not a sandbox for malicious packages. Keep secrets out of logs and client bundles, and use fixed-length protocol inputs with vetted cryptographic comparisons.

## Use project feedback

Run the configured focused lint/typecheck and relevant tests, then exercise the real Node entry point when process, module, signal, stream, or CLI behavior changed. Run package or production builds when changing `exports`, module format, loaders, native dependencies, or deployment configuration, and test shutdown or cancellation paths when static checks cannot prove cleanup.
