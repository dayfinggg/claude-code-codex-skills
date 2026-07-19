---
name: node-js
description: Engineer Node.js apps, APIs, CLIs, workers, libraries, monorepos, packages, ESM/CJS modules, runtime configuration, observability, security, performance, testing, packaging, or deployment.
---

# Node.js

## Operating Mode

- Ground decisions in inspected project files first: `package.json`, lockfiles, `tsconfig*`, framework config, source layout, tests, CI, Docker/deploy files, and local instructions.
- Prefer the package manager indicated by the lockfile or `packageManager`: `pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`, `bun.lockb`/`bun.lock`.
- For any unstable or version-specific claim, verify against project files and official docs before relying on it. This includes Node release support, runtime APIs, package-manager flags, framework behavior, TypeScript options, security advisories, and deployment-platform limits. Use official sources such as `nodejs.org`, `docs.npmjs.com`, package-manager docs, TypeScript docs, and the relevant framework docs; state uncertainty instead of guessing.

## Project Discovery

- Inspect scripts, dependencies, dev dependencies, `engines`, `type`, `exports`, `imports`, `main`, `module`, `types`, `workspaces`, and package-manager metadata.
- Identify the runtime target from `engines`, `.nvmrc`, `.node-version`, Dockerfile, CI, deployment config, or README. Do not silently change the supported Node version.
- For production targets, prefer Active LTS or Maintenance LTS releases. Treat Current releases as opt-in unless the project explicitly targets them.
- Identify module format before editing: ESM via `"type": "module"`/`.mjs`, CommonJS via `.cjs` or default package behavior, and TypeScript transpilation settings.
- Determine runtime boundaries: HTTP server, serverless/edge, queue worker, cron job, CLI, library package, frontend build tooling, or test-only code.

## Runtime and Modules

- Use the existing module system consistently. Avoid mixed ESM/CJS unless the project already has an interop pattern.
- Import Node built-ins with the `node:` prefix when the project style allows it.
- Use native Node/Web platform APIs only when supported by the project's configured runtime.
- When using Node's built-in TypeScript execution/type stripping, verify the exact Node version and run the real entrypoint. It does not typecheck or generally honor `tsconfig`; require runtime-resolvable extensions/imports, explicit type-only imports, no unsupported `paths` assumption, and no transform-required syntax outside the target version's documented support.
- Avoid import-time side effects. Keep I/O and network startup in explicit `main`, factory, bootstrap, or framework lifecycle code.
- Use top-level `await` only in ESM startup/configuration paths where the runtime supports it.
- For libraries, keep a small public surface through `exports` and `types`; do not rely on private deep imports across packages.
- Validate configuration at startup and fail fast with actionable errors.

## Architecture

- Respect existing boundaries. When introducing structure, separate transport/controller, application/service, domain logic, infrastructure adapters, persistence, and configuration.
- Keep pure business logic independent from HTTP, queues, file systems, databases, clocks, and environment variables.
- Inject I/O clients, clocks, loggers, and config through constructors, factories, or framework dependency injection rather than hidden globals.
- In monorepos, preserve workspace boundaries. Do not import another package's private `src` files unless that is already the accepted pattern.
- Co-locate tests with the code when the repo does so; otherwise follow the established `test`/`tests` layout.

## Implementation Rules

- Prefer TypeScript with strict types when the project uses it. Avoid `any`; use `unknown` plus narrowing for external data.
- In JavaScript projects, use clear runtime validation and JSDoc types where the codebase already does.
- Validate all external input: HTTP bodies, query params, headers, env vars, messages, files, database records, third-party API responses, and CLI args.
- Keep logging structured and contextual. Avoid `console.*` in production paths unless that is the existing logging strategy.
- Avoid synchronous filesystem, crypto, compression, or child-process work on hot request paths.

## Async and Concurrency

- Always await promises or intentionally register managed background work with error handling, shutdown handling, and observability.
- Use `AbortController`, explicit timeouts, and cancellation propagation for network and long-running work.
- Retry only transient failures, only when the operation is idempotent or protected by an idempotency key, with bounded attempts, backoff plus jitter, `Retry-After` support when present, and no retry after a partial commit unless a recovery path is explicit.
- Bound concurrency for batch work, queues, scrapers, migrations, and fan-out API calls. Use existing utilities or a small limiter.
- Choose `Promise.all`, `Promise.allSettled`, sequential loops, or queues based on failure semantics; do not use `forEach` with async callbacks.
- Use `stream.pipeline` or equivalent stream helpers and respect backpressure for large files or responses.
- Offload CPU-heavy work from request paths to worker threads, child processes, queues, or precomputed jobs when needed.
- Clean up timers, event listeners, file handles, sockets, servers, workers, and database clients in `finally` blocks or lifecycle hooks.

## Testing

- For bug fixes, add or update a failing test where practical before changing behavior.
- Cover pure logic with unit tests and cover I/O boundaries with integration tests. Use end-to-end tests only when the user workflow or framework behavior requires it.
- Test error paths, cancellation/timeouts, config validation, auth/authorization branches, and concurrency limits when touched.
- Keep tests deterministic: isolate env vars, reset globals, use temporary directories, bind test servers to port `0` (or omit the port), await `listening`, read `server.address().port`, retain the listener, use fake clocks where appropriate, and avoid live external services unless the suite already requires them.
- For public packages, validate runtime behavior and generated types or declarations when the change affects the API surface.

## Security

- Do not use `eval`, `new Function`, unsafe `vm`, dynamic shell strings, or unsanitized `child_process` execution. Pass a verified executable and argument array with `shell: false`; never enable a shell with untrusted input, and treat `.cmd`/`.bat` wrappers as a separate quoting language.
- Resolve and validate filesystem paths against an allowed base directory before reading or writing user-controlled paths.
- Use parameterized database queries and framework escaping. Guard against SQL/NoSQL injection, XSS, CSRF, SSRF, open redirects, path traversal, prototype pollution, and unsafe deserialization.
- Treat Node's Permission Model as defense-in-depth only, not a sandbox for malicious dependencies or untrusted code.
- Keep CORS, cookies, sessions, auth, authorization, and rate limits explicit and least-privilege.
- Use Node's `crypto` module or vetted libraries for cryptography. Do not invent algorithms. For `timingSafeEqual`, normalize protocol-defined fixed-length byte inputs first and avoid secret-dependent early exits around the comparison; prefer a vetted protocol/library when possible.
- For uploads, enforce size limits, content validation, safe storage, and non-executable serving behavior.

## Dependencies and Tooling

- Do not hand-edit lockfiles. Use the project's package manager and preserve frozen-lockfile behavior in CI.
- For package publishing, prefer npm Trusted Publishing/OIDC and provenance over long-lived npm tokens when the project and CI provider support it. Keep release workflow permissions minimal.
- Use existing lint, format, typecheck, build, and test scripts. Do not introduce parallel tooling unless the project already uses it or the user asks.
- Keep package scripts cross-platform unless the repository is explicitly platform-specific.

## Observability

- Preserve or add structured logs with request/job IDs and relevant context, without PII or secrets.
- Surface metrics for latency, error rate, throughput, queue depth, retry counts, and dependency health when the project has a metrics path.
- Use OpenTelemetry or the existing tracing stack when present; propagate context across async boundaries and outbound calls.
- Add health/readiness/liveness checks with timeouts for critical dependencies when building services.
- Make background jobs observable: start, finish, failure, retry, dead-letter, and duration.

## Deployment and Runtime Configuration

- Read runtime configuration from env vars, config files, or secret managers according to existing project practice; validate at process start.
- Keep development defaults safe. Require explicit production values for secrets, credentials, origins, database URLs, and destructive feature flags.
- Implement graceful shutdown as an idempotent state machine: handle platform signals, stop admission, drain bounded in-flight work, close resources, enforce a hard deadline, preserve an appropriate exit code, and define a final termination path compatible with the service manager. Installing signal listeners removes Node's default exit behavior for those signals.
- Respect production install/build conventions such as `npm ci`, `pnpm install --frozen-lockfile`, `NODE_ENV=production`, and Docker build stages when already present.
- In containers, prefer non-root execution, minimal runtime images, explicit health checks, and no baked-in secrets.
- For serverless, edge, or managed platforms, verify available Node APIs, filesystem behavior, connection reuse, timeouts, and bundle limits against official platform docs.
- Treat migrations and one-off scripts as production code: idempotent where possible, logged, reversible or backed up, and validated in a non-production path first.

## Performance

- Avoid unbounded arrays, queues, recursion, caches, listeners, regex backtracking, and fan-out requests.
- Stream or paginate large data instead of buffering entire payloads.
- Use caches only with clear keys, TTLs, invalidation rules, and memory bounds.
- Prefer database/query fixes over application-side filtering for large datasets.
- Read [runtime compatibility and operations](references/runtime-compatibility-operations.md) before runtime upgrades, Node TypeScript execution, process/signal work, child processes, test servers, permissions, or graceful shutdown.

## References

- Read [runtime compatibility and operations](references/runtime-compatibility-operations.md) for lifecycle selection, module and TypeScript execution, process arguments, ports, cryptographic comparison, Permission Model limits, signals, and shutdown.
- Read [authoritative Node.js sources](references/sources.md) for current release status and exact API behavior. Pin the deployment's Node version rather than relying on rolling Current documentation.
