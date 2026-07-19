# Production Structure, Testing, Performance, Deployment, and Upgrades

## Project organization

- Follow the existing root or `src/` convention. Keep route-private components, actions, loaders, schemas, and tests near their route; move code to shared `lib`, `ui`, or domain packages only when multiple owners need the same stable contract.
- Separate domain policy, application orchestration, data access, transport/Next adapters, and presentation when that reduces coupling. Do not force a layer for a simple route.
- Keep server-only and client-only module graphs obvious. Avoid broad barrels that accidentally pull server packages into client bundles or create cycles.
- Keep environment parsing, database/client creation, auth verification, and observability in dedicated server boundaries rather than scattered across pages.
- There is no universal file or component line limit. Split on ownership, runtime, cohesion, independent testing, and change frequency.

## Test matrix

- Unit-test pure validators, permission policy, cache-key builders, serializers, reducers, and domain logic.
- Integration-test DAL authorization, database transactions, external API adapters, Route Handlers, webhook verification, and cache invalidation with realistic boundaries.
- Component-test synchronous Client Components through roles, labels, and interactions using the repository's configured tools.
- Prefer browser/end-to-end tests for async Server Components, streaming, hydration, router navigation, cookies, metadata, Server Actions, and complete auth workflows; DOM unit runners may not support async Server Components fully.
- Test production behavior for static/dynamic rendering, cache hit/miss, on-demand revalidation, redirect/not-found control flow, and client/server serialization.
- Include keyboard/focus, responsive layout, loading, empty, error, slow, offline/degraded, unauthorized, and retry states where the feature owns them.
- Keep tests deterministic and isolated by tenant/session/cache. Never let one test's module cache, environment, database row, or browser storage leak into another.

## Performance workflow

1. Define budgets for Core Web Vitals, client JavaScript, RSC payload, route response, server render/data latency, image/font bytes, and cost.
2. Measure a production build with realistic routes and data; development timing and cache behavior are not representative.
3. Remove unnecessary client boundaries and third-party scripts, then fix waterfalls, query count, oversized images/fonts, broad imports, and blocking work.
4. Use the bundler-compatible analyzer and browser/server traces. Confirm prefetch and Suspense behavior over a slow network.
5. Re-measure the same scenario and keep the change only when the target improves without stale data, leakage, or degraded accessibility.

Use built-in image, font, script, link, metadata, lazy-loading, and streaming facilities when their contract fits. Do not enable experimental optimizers or undocumented flags merely to improve a synthetic score.

## Deployment and self-hosting

- Match output to the target: static export only for routes without runtime-only features; Node/serverless/adapter output for dynamic rendering, Actions, handlers, and image/caching needs.
- Run the production build in CI with the deployment's Node version, package manager, environment timing, and native dependencies. Do not build once with public values that should vary at runtime.
- For self-hosting, place a reverse proxy in front to handle malformed/slow requests, body limits, rate limiting, TLS, and compression as appropriate.
- For multiple instances, coordinate cache tags/data, deployment IDs, Server Action encryption keys, build artifacts, and rolling-version compatibility according to official self-hosting docs.
- Avoid split deployments serving incompatible build IDs or action keys. Use health/readiness checks and graceful shutdown for Node servers.
- Verify writable filesystem, connection pooling, cold starts, regional data locality, CDN cache keys/headers, streaming, ISR, and image optimization on the actual provider.

## Upgrade workflow

1. Record exact Next.js, React, Node, TypeScript, lint, test, and adapter versions plus router and `cacheComponents` state.
2. Read `node_modules/next/dist/docs/` when available, then the official support policy, security advisories, target release notes, and every intervening upgrade guide.
3. Check target runtime/browser requirements and third-party compatibility. Treat Canary/Preview posts as non-production until a stable release exists.
4. Characterize critical routes, auth, Actions, handlers, cache behavior, images, metadata, and deployment output before modifying dependencies.
5. Use official codemods on a clean diff; review async API conversions, directives, configuration moves, proxy/middleware rename, bundler differences, and removed commands manually.
6. Migrate cache semantics explicitly. Detect whether Cache Components is enabled; never paste a v14/v15 recipe into v16 or vice versa.
7. Regenerate route types if used, then run typecheck, explicit lint, focused tests, production build, browser smoke tests, and a production-like deployment check.

As of the source review date, official live docs displayed stable 16.2.10, 16.x as Active LTS, 15.x as Maintenance LTS, and 16.3 announcements as Preview. This is a research snapshot only; re-check at task time.

## Release gate

- Verify no unsupported Next/Node line or known advisory remains.
- Verify every public entry point validates and authorizes independently.
- Verify client bundles and RSC payloads contain no private data or server-only modules.
- Verify cache isolation, freshness, invalidation, and multi-instance coordination.
- Verify critical browser journeys, accessibility, metadata, observability, and rollback/runbook expectations established by the repository.
