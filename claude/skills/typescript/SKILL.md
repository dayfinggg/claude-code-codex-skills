---
name: typescript
description: Production TypeScript engineering guidance for Claude Code. Use when creating, reviewing, refactoring, debugging, testing, or validating TypeScript code, .ts or .tsx files, tsconfig/module settings, type definitions, typed package scripts, async flows, security-sensitive TypeScript code, or dependency/tooling changes in a TypeScript project.
---

# TypeScript

## Operating Workflow

1. Inspect the project before proposing or editing: `package.json`, lockfile, `tsconfig*`, lint/format/test configs, framework config, nearby modules, and existing tests.
2. Identify the package manager and scripts from the repo. Do not assume `npm`, `pnpm`, `yarn`, `bun`, Jest, Vitest, ESLint, or a framework until verified.
3. Make the smallest reviewable change that solves the user's request. Avoid opportunistic rewrites, architecture churn, and style changes outside touched code.
4. Run the cheapest meaningful validation first, then broaden only when risk justifies it.

## Evidence And Currentness

- Ground every project claim in files, commands, tests, logs, or official documentation inspected during the current run.
- Do not invent APIs, scripts, package versions, compiler defaults, framework behavior, or test results.
- For unstable or version-specific claims, first verify local versions in `package.json`, lockfiles, `tsconfig*`, and installed package metadata. If the behavior may have changed, check official docs for TypeScript, Node, the framework, the package, or the tool before acting.
- Treat web posts, StackOverflow, blog posts, AI summaries, and stale memory as secondary. Use them only after local files and official docs.
- If evidence is missing, say what is unknown and choose a conservative implementation that does not depend on the unverified claim.

## Mandatory Quality Rules

- Preserve existing public behavior unless the user explicitly requests a breaking change.
- Maintain or improve type safety. Do not silence errors with `any`, broad assertions, `@ts-ignore`, `@ts-expect-error`, or non-null assertions unless there is a documented, narrow reason.
- Keep runtime behavior and types aligned. TypeScript types do not validate untrusted input at runtime.
- Prefer clear domain names, explicit boundaries, and boring control flow over clever type gymnastics.
- Keep functions small enough to test and reason about, but avoid single-use abstractions.
- Preserve generated files unless the repo clearly expects them to be regenerated.

## Type System Rules

- Prefer `unknown` at trust boundaries and narrow with runtime checks, parsers, schemas, or type guards.
- Use `any` only at unavoidable interop boundaries, confine it to the smallest scope, and convert immediately to a safer type.
- Let local variables infer when obvious. Add explicit return types for exported functions, public APIs, callbacks crossing package boundaries, and complex async flows.
- Model state with discriminated unions, literal unions, generics with clear constraints, and exhaustive `switch` checks using `never` where useful.
- Use `satisfies` to validate object literals while preserving narrow types. Use `as const` to prevent literal widening and produce readonly views; it does not freeze runtime objects.
- Prefer `readonly` for shared data, public config, and values that should not be mutated through that typed view. It is shallow and can be bypassed through mutable aliases, so copy or freeze only when runtime immutability is a real invariant.
- Avoid truthiness checks when `0`, `""`, `false`, or empty arrays are valid values. Use explicit nullish checks.
- Distinguish `undefined`, optional properties, and `null` intentionally. Do not blur absence semantics.
- Avoid ambient global declarations unless integrating with a known runtime or framework pattern.
- Keep declaration files accurate; do not widen external types to hide implementation errors.

## Compiler And Module Discipline

- Respect the existing `tsconfig` inheritance, project references, path aliases, module target, JSX mode, and `moduleResolution`.
- Validate emit `target`, ambient `lib` declarations, and actual runtime/API support separately. `lib` supplies types rather than polyfills, and `ESNext` changes with the compiler version; prefer an explicit edition when reproducible output matters.
- For TypeScript 6/7 migrations, check official release notes before changing compiler defaults, and identify the actual compiler binary/package and every tool that embeds the compiler API before changing defaults. TypeScript 7's native compiler/tooling surface can require a compatibility TypeScript 6 package or side-by-side compilers for frameworks, language services, linters, build tools, declaration emitters, and plugins. Do not hide deprecated options long-term with broad suppressions, and avoid invoking `tsc <file>.ts` beside a project `tsconfig` because it can bypass intended project settings.
- Use repository scripts or project mode. TypeScript 6+ rejects file arguments beside a discovered `tsconfig.json` unless `--ignoreConfig` is explicit; older compilers could silently ignore project settings. Never use `--ignoreConfig` without reconstructing and verifying all intended options.
- Prefer strict compiler settings for new projects. In existing projects, do not flip broad strictness flags unless the task is to migrate strictness or the fallout is fully handled.
- Consider strictness flags such as `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, and `useUnknownInCatchVariables` only after checking current settings and project tolerance.
- Align ESM/CJS choices with `package.json` `type`, `exports`, runtime target, bundler, and test runner. Do not mix module systems casually.
- Use `import type`/`export type` when imports are type-only and the repo's compiler/lint settings support or require it.
- Prefer import attributes using `with` where the project/runtime supports them; treat legacy import assertions as migration-sensitive.
- Keep `paths` aliases, package exports, and runtime resolution consistent. Do not create aliases that only TypeScript understands unless the runtime/bundler also resolves them.
- When relying on Node's built-in TypeScript execution/type stripping, remember it does not typecheck, ignores most `tsconfig` behavior, and does not replace the project's compiler, bundler, or tests.
- Avoid broad barrel exports that create cycles or unstable public surfaces. Use package-level `index.ts` only for intentional API boundaries.

## Architecture And Module Structure

- Follow the local organization first: feature folders, domain modules, service/adapters, app/router/controller layers, or framework conventions already present.
- Separate domain logic from I/O, framework glue, persistence, network calls, and environment access.
- Put validation and normalization at boundaries: HTTP handlers, CLI inputs, environment config, files, queues, database rows, and third-party API responses.
- Keep public APIs narrow and stable. Avoid deep imports across packages unless the repo already treats them as internal.
- Prefer dependency injection or explicit parameters for external services, clocks, random IDs, and configuration when it improves testability.
- Avoid hidden global mutable state, import-time side effects, and singleton caches unless they are an established project pattern.
- In monorepos, respect package ownership, project references, workspace boundaries, and published package contracts.

## Implementation Patterns

- Use standard library and existing project helpers before adding a dependency.
- Gate newer ECMAScript features such as `RegExp.escape`, import attributes, iterator helpers, set methods, `Promise.try`, and Float16 APIs on the project's runtime, browser support, transpilation target, or polyfill policy before using them.
- Prefer plain objects, arrays, maps, and small functions unless classes match existing code or encapsulate stateful behavior clearly.
- Use typed `Result`/`Either`, discriminated responses, or existing error conventions for expected failures. Throw only for exceptional conditions in codebases that use exceptions that way.
- Preserve error causes and useful context without leaking secrets.
- Keep date, time zone, currency, locale, and serialization behavior explicit when user-visible or persisted.
- Use stable IDs and deterministic ordering where tests, snapshots, or APIs depend on output shape.
- Avoid overloading and conditional types unless they simplify call sites materially.

## Async And Concurrency

- Await promises or intentionally handle them. Do not leave floating promises unless the repo has a safe fire-and-forget helper.
- Use `Promise.all` for independent work and sequential `await` when order, rate limits, transactions, or side effects require it.
- Bound concurrency for network, filesystem, database, queue, and CPU-heavy work. Prefer existing limiters/pools.
- Support cancellation/timeouts with `AbortSignal` or the project's established cancellation primitive for external calls and long-running work.
- Retry only transient failures, only when the operation is idempotent or protected by an idempotency key, with bounded attempts, backoff plus jitter, and `Retry-After` support when available.
- Clean up resources with `finally`, disposal helpers, or framework lifecycle hooks.
- Avoid mixing callbacks, event emitters, streams, and promises without clear error propagation.
- Do not make constructors async. Use async factories or explicit initialization.

## Testing Strategy

- Add or update tests for behavior changes, regressions, parsing/validation, edge cases, and public APIs.
- Prefer unit tests for pure logic, integration tests for module boundaries, and end-to-end tests only when they cover user-critical flows or framework wiring.
- Test runtime validation failures, not just happy paths.
- For type-level behavior, use the repo's existing type-test setup if present. Do not invent a new one unless the task requires it.
- Keep snapshots minimal and stable. Prefer semantic assertions over large snapshots.
- If a test is flaky or environment-dependent, state that and isolate the cause instead of weakening assertions silently.

## Security And Runtime Safety

- Treat all external input as untrusted: requests, files, env vars, database rows, local storage, CLI args, and third-party responses.
- Validate and encode data at boundaries. Avoid SQL/NoSQL injection, command injection, path traversal, SSRF, XSS, unsafe redirects, prototype pollution, and unsafe deserialization.
- Never hard-code, log, snapshot, or expose secrets, tokens, credentials, private keys, or personal data.
- Avoid `eval`, dynamic `Function`, unsafe template execution, and shell command construction from untrusted input.
- Normalize filesystem paths before access and preserve workspace/project boundaries.
- Keep authorization, tenant isolation, and ownership checks near the operation they protect.
- For auth, crypto, payments, data deletion, migrations, and production side effects, require explicit evidence and targeted tests.

## Dependency And Tooling Discipline

- Use the existing package manager and lockfile. Do not add or upgrade dependencies without a clear need and user-visible justification.
- For package publishing, prefer registry trusted publishing, OIDC, provenance, and minimal CI permissions over long-lived tokens when the ecosystem and project support them.
- Prefer well-maintained, typed packages already in the project. Verify license/security posture when adding production dependencies.
- Do not introduce a new framework, compiler, bundler, formatter, lint stack, test runner, schema library, or state manager unless the task explicitly requires it.
- Use local project scripts and local binaries. Avoid commands that implicitly download packages unless the user approves or the project convention requires it.
- Keep formatting mechanical and localized. Run the repo's formatter only on touched files unless the project expects broader formatting.
- Respect CI as the source of truth when local checks differ; report local environment limitations clearly.

## Validation

Default validation order:

1. Typecheck: run the repo script if present, otherwise use the local TypeScript compiler with the relevant `tsconfig`.
2. Lint/format check: run configured checks for touched files or the smallest relevant package.
3. Tests: run targeted tests first; broaden to package or full-suite tests when shared behavior, public APIs, or risk justify it.
4. Build: run when changing bundling, module exports, framework config, generated types, packaging, or runtime entry points.
5. Runtime/manual check: run the app, CLI, or focused script when static checks cannot prove behavior.

If validation cannot run, state exactly why, what was not verified, and the safest next command for the user.


