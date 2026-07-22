---
name: javascript
description: Engineer JavaScript-specific coercion, module, promise, host-language, and JS build-script semantics. Use when correctness depends on those mechanics; not for ordinary application code or merely because JavaScript or a .js, .mjs, .cjs, or .jsx file is named. Prefer TypeScript for .ts or .tsx.
---

# JavaScript

## Establish the JavaScript contract

- Inspect the touched files, `package.json`, lockfile, runtime and bundler configuration, `browserslist`, test configuration, and project scripts. Resolve the actual runtime, browser matrix, transpiler, and bundler versions from installed metadata or the lockfile; declared ranges are not proof of the executed versions.
- Determine whether each file is ESM, CommonJS, browser script, worker, server code, shared code, JSX, or build tooling. Respect `type`, extensions, package `exports`, bundler conditions, and the deployment host. Do not assume Node APIs exist in browsers, workers, or edge runtimes.
- Use the repository's configured JavaScript commands. Do not introduce TypeScript, a new transpiler, or a competing formatter or test runner for a JavaScript-only change.

Read [standards, runtime, and async behavior](references/standards-runtime-async.md) before using newer syntax or APIs, changing module boundaries, composing cancellation, handling streams, or targeting multiple hosts. Use [authoritative JavaScript sources](references/sources.md) when normative language status or host compatibility is material.

## Preserve language and module semantics

- Distinguish absence explicitly: `undefined`, `null`, missing properties, empty strings, zero, and `false` may carry different meanings. Prefer strict equality and explicit coercion at boundaries.
- Use `const` unless reassignment is required. Treat imported bindings as immutable and avoid prototype mutation, implicit globals, import-time I/O, and generated-per-call singleton state.
- Preserve property ownership and enumeration semantics when spreading, cloning, serializing, or merging objects. Do not mistake shallow copies for immutable or deeply isolated values.
- Keep ESM/CJS interop deliberate. Verify default versus named exports, file extensions, conditional exports, top-level `await`, and test-runner resolution against the executed toolchain. Avoid aliases that only one layer resolves.
- Gate new ECMAScript or Web APIs on both syntax support and runtime support. A standard or completed proposal does not prove support in the deployed engine, transpiler, type library, or polyfill policy.

## Handle hosts, boundaries, and failures

- Keep secrets, privileged environment values, filesystem access, and authorization logic out of browser bundles. Keep `window` and `document` out of server or shared modules unless guarded behind a host-specific entry point.
- Treat DOM HTML insertion, dynamic code generation, dynamic module names, URLs, regular expressions, and property assignment from untrusted input as security boundaries. Prefer safe DOM APIs, validated URLs and keys, and the project's established sanitizer; avoid `eval` and `Function`.
- Throw `Error` objects, preserve useful causes, and translate failures only where recovery or caller-facing context exists. Do not swallow rejected promises or expose stack traces and secrets.
- Await or return every meaningful promise. Choose `Promise.all`, `Promise.allSettled`, sequencing, or a bounded queue from the required failure semantics. Remember that `Promise.all` does not cancel siblings.
- Propagate `AbortSignal` when supported, add bounded timeouts to external work, and clean up timers, listeners, streams, subscriptions, locks, and handles in `finally`. Respect stream backpressure instead of buffering unbounded input.
- Retry only transient, safely repeatable operations with bounded attempts and backoff. Preserve partial-result semantics rather than presenting an incomplete batch as success.

## Use project feedback

Run the smallest configured lint or format check, relevant tests, and any typed-JavaScript check that covers the touched files. Run the configured build when changing module format, package exports, bundler inputs, JSX, shared/browser boundaries, or deploy-target syntax, then exercise the real entry point when static checks cannot prove host behavior.
