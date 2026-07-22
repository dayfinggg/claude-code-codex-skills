---
name: typescript
description: Engineer TypeScript types, declarations, tsconfig, compiler behavior, and typed module contracts. Use only when those TypeScript semantics change; not for generic React or Node behavior, and not merely because TypeScript, TSX, or a .ts or .tsx file is named.
---

# TypeScript

## Pin the compiler contract

- Inspect `package.json`, the lockfile, every applicable `tsconfig*`, workspace/project references, lint configuration, framework or bundler configuration, and the exact source and declaration files involved.
- Resolve the compiler binary actually used by project scripts and record its version. Declared ranges, a global `tsc`, editor TypeScript, framework-embedded compilers, and a compatibility compiler may differ. For TypeScript 6/7 work, identify every compiler-API consumer before changing defaults.
- Trace `extends`, `references`, `include`, `exclude`, emit settings, `module`, `moduleResolution`, `target`, `lib`, JSX mode, path aliases, and package `type`/`exports`. Run in project mode; do not invoke a file list that bypasses or changes discovered configuration.

Read [compiler and runtime compatibility](references/compiler-runtime-compatibility.md) before compiler upgrades, config or module-resolution changes, declaration publishing, or Node type stripping. Use [authoritative TypeScript sources](references/sources.md) for exact compiler-version and option semantics.

## Model types precisely

- Use `unknown` at untyped boundaries and narrow through runtime validation, predicates, or existing schema tools. Types do not validate HTTP data, environment variables, files, messages, or deserialized values.
- Let obvious local values infer. Type exported APIs, callbacks crossing package boundaries, complex generic helpers, and async results whose failure shape matters.
- Model exclusive states with discriminated unions and check exhaustiveness. Distinguish optional properties, `undefined`, and `null`; account for `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess` when enabled.
- Prefer `satisfies` when an expression needs conformance without widening, and `as const` when literal preservation is intended. Neither provides runtime immutability. Use `readonly` as a typed view, not a deep-freeze guarantee.
- Confine unavoidable `any`, assertions, non-null assertions, `@ts-ignore`, and `@ts-expect-error` to the narrowest interop point. Retain an expectation comment only when it proves the intended diagnostic and the repository accepts that convention.
- Keep declaration files truthful. Do not widen third-party or ambient declarations merely to hide an implementation error, and avoid global augmentation unless the host contract requires it.

## Align types, modules, and runtime

- Treat `target` as emit policy and `lib` as available declarations, not proof of runtime APIs or polyfills. Gate new syntax and APIs on the actual runtime, browser, bundler, and transform path.
- Keep type-only dependencies explicit with `import type` and `export type` when project settings require or benefit from it. Verify that path aliases and package subpaths resolve in TypeScript, the runtime, the bundler, and tests.
- Preserve ESM/CJS boundaries across extensions, `type`, conditional exports, declaration emit, and consumers. Test public package entry points rather than relying on editor resolution.
- Node's built-in TypeScript stripping is runtime execution, not typechecking; verify its exact supported syntax, resolvable specifiers, and lack of general `tsconfig` behavior.
- Type async APIs around real cancellation and failure semantics. Do not encode a promise as infallible when rejection is part of its contract, and do not use a type assertion to bypass validation after concurrent or external work.

## Use project feedback

Run the repository's focused typecheck with the relevant project configuration first. Then run configured lint or format checks and targeted tests that exercise runtime narrowing or public contracts. Run declaration generation, package tests, or the production build when changing module resolution, exports, JSX settings, generated types, compiler configuration, or published API shape. Inspect diagnostics rather than weakening strictness or excluding files to obtain a pass.
