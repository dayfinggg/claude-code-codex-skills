# Compiler and runtime compatibility

## Inventory the complete toolchain

Record the exact versions and executable paths for:

- TypeScript compiler package and `tsc` binary actually invoked by scripts.
- Language service/editor integration and workspace SDK selection.
- Framework compiler, bundler, transformer, test runner, linter/parser, API extractor, declaration emitter, documentation tool, and custom compiler plugin.
- Node/browser/edge runtime, module loader, package manager, and deployment platform.
- Root and inherited `tsconfig` files, project references, generated configs, and command-line overrides.

Do not call a migration complete because one `tsc` command succeeds. Exercise every compiler-API consumer and runtime entrypoint.

## Handle TypeScript 7 deliberately

- TypeScript 7 was announced as the native compiler on 2026-07-08. Its CLI/compiler can outpace tools that depend on the legacy JavaScript compiler API.
- Verify whether the installed TS7 release exposes the APIs a tool requires. Keep a compatible TS6 package or side-by-side compiler only when an identified consumer requires it and scripts make the split explicit.
- Compare diagnostics, emit, declaration output, module resolution, build cache, source maps, plugin behavior, editor behavior, and performance on representative packages.
- Follow framework and tool support statements, not only TypeScript release notes. Do not suppress migration errors globally.

## Keep project invocation reproducible

- Prefer the repository's script or `tsc -p <config>`/build mode over positional source files.
- On TypeScript 6+, file arguments beside a discovered `tsconfig.json` produce TS5112 unless `--ignoreConfig` is explicit; older versions could ignore the project config. Treat `--ignoreConfig` as constructing a separate compilation.
- Resolve config inheritance and project references before editing. Ensure CI, editor, tests, bundler, and package build select the same intended project graph.
- Pin compiler versions in the project workflow. Avoid floating `npx` or implicit global binaries.

## Separate type descriptions from runtime behavior

- `target` controls downlevel emit; it does not add host APIs. `lib` adds ambient type declarations; it does not polyfill them.
- `ESNext` floats as the compiler changes. Use it only when the project intentionally tracks compiler/runtime evolution; prefer an explicit edition for reproducible library and deployment output.
- `as const`, `readonly`, private modifiers, and erased type checks do not freeze, validate, or secure runtime values. Add runtime validation or copying/freezing only where the invariant requires it.
- TypeScript types do not prove JSON, environment, database, HTTP, message, or JavaScript-consumer inputs. Parse and narrow at every trust boundary.

## Align modules end to end

- Match `module`, `moduleResolution`, `verbatimModuleSyntax`, package `type`/`exports`/`imports`, file extensions, bundler, test runner, and runtime loader.
- Ensure type-only imports are explicitly erased where the execution path requires it. Avoid extensionless or alias imports that the runtime cannot resolve.
- Test public package exports from a packed artifact in every supported ESM/CJS and runtime combination. Prevent accidental deep imports and undeclared files.
- Review conditional exports and declaration routing together; runtime and type consumers must select compatible branches.

## Treat Node type stripping as a separate execution mode

- Verify the exact target Node version. Built-in stripping does not typecheck and does not generally apply project `tsconfig` behavior.
- Use runtime-resolvable file extensions and imports, explicit `import type`, and no `paths` assumption unless a separate loader handles it.
- Check unsupported transform-required syntax and whether the target version's explicit transform option covers it.
- Run the real Node entrypoint plus the project's full typecheck. Passing one does not imply the other.

## Validate a compiler or config change

1. Capture baseline compiler version, resolved config, diagnostics, emit/declarations, and representative build time.
2. Change one compatibility dimension at a time.
3. Run typecheck, lint/parser, unit/integration tests, production build, package/consumer checks, and actual runtime entrypoints.
4. Inspect generated declarations, source maps, exports, and artifact contents.
5. Record unsupported consumers, temporary dual-compiler ownership, exit criteria, rollback, and exact unverified environments.
