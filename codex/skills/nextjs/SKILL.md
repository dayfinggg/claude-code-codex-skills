---
name: nextjs
description: Engineer, review, debug, secure, test, optimize, deploy, or upgrade Next.js applications using the App Router or an existing Pages Router, including Server and Client Components, rendering, caching, revalidation, Route Handlers, Server Actions, metadata, runtimes, authentication boundaries, observability, and production deployment. Use whenever `next`, `next.config.*`, `app/`, `pages/`, or Next.js framework behavior is involved; determine the exact installed version and router before applying version-sensitive guidance.
---

# Next.js Engineering

## Establish the exact local contract

1. Read the nearest repository instructions, then inspect `package.json`, the lockfile, workspace boundaries, `next.config.*`, TypeScript and lint configuration, `instrumentation*`, environment examples, tests, CI, container and deployment configuration.
2. Resolve the installed `next`, `react`, and `react-dom` versions from the lockfile or installed package metadata. Treat declared ranges as constraints, not the resolved version.
3. If `node_modules/next/dist/docs/` exists, read its version-matched guide and API pages before coding. Prefer those bundled docs to general web docs. Use current official docs, releases, support policy, and security advisories only to fill gaps or assess an upgrade.
4. Detect the router from actual files: `app/` or `src/app/` for App Router, `pages/` or `src/pages/` for Pages Router, or both during an incremental migration. Do not mix their APIs or caching models.
5. Inspect configuration that changes semantics, especially `cacheComponents`, `output`, `runtime`, `experimental`, `images`, `serverActions`, `basePath`, `assetPrefix`, redirects, rewrites, headers, Turbopack/Webpack customization, and deployment adapter settings.
6. Identify the execution and trust boundaries: static build, Node server, serverless function, Edge runtime, browser, Route Handler, Server Action, proxy/middleware, external API, database, and shared cache.

Read [router-rendering-cache.md](references/router-rendering-cache.md) before changing routing, rendering, data fetching, caching, revalidation, or navigation. Read [sources.md](references/sources.md) whenever current version, support, security, or feature status matters.

## Preserve App Router boundaries

- Treat layouts and pages as Server Components by default. Add a client entry point only for state, Effects, event handlers, browser APIs, or a client-only dependency.
- Keep `use client` boundaries as deep and narrow as practical. Everything imported below the boundary can become client code; pass minimal serializable public props across it.
- Keep secrets, database clients, privileged SDKs, and authorization logic in server-only modules. Mark server-only modules with the repository's established guard when available.
- Fetch from the data source in Server Components or a server data layer. Do not call the application's own Route Handler from server rendering unless an actual network boundary is required.
- Await request-time APIs and route props according to the installed version. Do not copy synchronous examples from an older major or asynchronous examples into an incompatible one.
- Use route groups, private folders, layouts, templates, loading, error, not-found, parallel routes, and intercepting routes only when their lifecycle and URL behavior solve a concrete requirement.

For Pages Router code, follow [pages-router.md](references/pages-router.md) and preserve its data methods, API Routes, `_app`, `_document`, and router APIs until an explicit incremental migration is approved.

## Make rendering and caching explicit

Before implementing a data path, write down:

- Who may see the result and which authorization/tenant scope belongs in the key.
- Whether the result must be fresh per request, may be stale, or can be immutable.
- Whether only same-request deduplication or cross-request persistence is intended.
- Which event, tag, path, time window, or deployment invalidates it.
- How multi-instance or serverless deployment changes cache durability and coordination.

Branch on the installed version and `cacheComponents` setting. Do not combine Cache Components directives with the previous route-segment caching model unless the version-matched docs explicitly allow it. Distinguish React request memoization, Next.js data/output caches, browser/CDN caches, and client router caches.

- With Cache Components enabled, use documented `use cache`, cache lifetime, tags, Suspense, and runtime-value patterns. Keep user-specific runtime data outside shared entries or in a supported private cache mode.
- Without Cache Components, opt individual fetches or non-fetch work into caching and revalidation using only APIs supported by the installed version. Do not infer cache behavior from a page being statically generated.
- After mutations, choose read-your-writes invalidation for interactive edits and stale-while-revalidate only where stale data is acceptable.
- Test cache keys, authorization isolation, invalidation, build-time behavior, and multi-instance behavior rather than relying on development observations.

Use [router-rendering-cache.md](references/router-rendering-cache.md) for the versioned decision matrix.

## Choose the correct server entry point

- Use a Server Action for a UI-originated mutation that benefits from form integration and the RSC response. Treat it as a directly reachable POST endpoint: validate input, authenticate, authorize, enforce ownership, and control its return value inside the action.
- Use a Route Handler for a public HTTP contract, webhook, callback, non-UI representation, or browser/client API. Validate method, content type, body size, schema, credentials, origin/signature, and rate limits.
- Use Server Components for server-side reads. Do not use Server Actions for parallel data fetching; their purpose and client dispatch behavior favor mutations.
- Use proxy/middleware for routing concerns and optimistic checks, never as the only authorization layer. Re-check access at the protected data operation.
- Preserve framework control-flow errors such as redirects and not-found responses. Do not swallow them in broad catch blocks.

Read [data-security-runtime.md](references/data-security-runtime.md) before changing auth, data access, handlers, actions, proxy, runtime, metadata, assets, CSP, or secrets.

## Design production-safe data access

- Choose one dominant data-access approach per application area: existing external APIs, a server-only data access layer, or direct component-level access for a limited prototype. Avoid an unauditable mixture.
- Centralize secure authorization and return minimal DTOs from the server boundary. Never serialize an ORM entity, session object, secret-bearing SDK result, or unrestricted database row to a Client Component.
- Validate every boundary with the repository's existing schema tools. Use parameterized database APIs, bounded timeouts, cancellation, idempotency for repeatable mutations, and explicit transaction behavior.
- Keep server code stateless across requests unless the deployment contract guarantees durable shared state. Reuse safe clients according to their official serverless/runtime guidance, but do not rely on module globals for correctness.

## Handle metadata, assets, and user experience

- Use the Metadata APIs and file conventions supported by the router; keep metadata generation on the server and provide canonical, social, robots, and sitemap behavior from authoritative data.
- Use `next/image`, `next/font`, `next/script`, and `next/link` when their optimization and routing contracts fit. Define meaningful alternative text, dimensions or aspect ratio, responsive sizes, trusted remote patterns, and script strategy.
- Build semantic, keyboard-operable UI with visible focus, announced navigation/form status, stable layout, useful loading/error/empty states, and reduced-motion support.
- Keep streaming fallbacks meaningful and sized. Place Suspense and error boundaries around independently useful regions rather than hiding the whole route.

## Observe and optimize measured behavior

- Instrument server startup and runtime-specific code through `instrumentation.*`; capture route/action dependency latency, failures, and traces without logging secrets or personal data.
- Measure Core Web Vitals and real route behavior. Profile production builds, client JavaScript, RSC payloads, images, fonts, third-party scripts, prefetch traffic, server rendering, and data waterfalls before optimizing.
- Minimize client boundaries and third-party browser code before adding memoization or cache complexity. Confirm that a supposed optimization improves the target metric and does not weaken freshness or authorization.
- Provide accessible, redacted error UI and route-scoped recovery. Log an error identifier and actionable server context, not raw credentials, cookies, form bodies, or internal stack traces to the client.

## Test and ship against the deployment target

- Use unit tests for pure domain and validation code, integration tests for data/auth/handler boundaries, component tests for synchronous client UI, and browser tests for async Server Components, streaming, hydration, navigation, cookies, Actions, metadata, and critical workflows.
- Test unauthorized, forbidden, invalid, duplicate, oversized, rate-limited, timeout, stale-cache, invalidation, and dependency-failure paths when relevant.
- Run the repository's typecheck and configured lint command explicitly; newer Next.js versions may not run lint during `next build`.
- Run focused tests, then a production build. Smoke-test the built output in the same runtime mode used by deployment.
- Verify static export compatibility, Node/Edge API availability, environment variable timing, filesystem assumptions, image optimization, cache sharing, graceful shutdown, reverse proxy limits, and health/observability behavior.

Use [production-testing-upgrades.md](references/production-testing-upgrades.md) for test selection, performance, deployment, self-hosting, and upgrade checks.

## Upgrade deliberately

- Check the official support policy and security advisories before choosing a target. Prefer a supported stable Active or Maintenance LTS line; never treat Canary or Preview as production-stable.
- Read every intervening official upgrade guide and the installed package's bundled docs. Verify Node.js, TypeScript, browser, bundler, React, and platform requirements.
- Run official codemods only on a clean reviewable diff and inspect each change. Migrate configuration, async request APIs, cache semantics, proxy/middleware behavior, image restrictions, and removed commands explicitly.
- Keep Pages-to-App migration incremental. Do not combine a router migration, framework major upgrade, data-layer rewrite, and visual redesign without a requirement that justifies the combined risk.
- Re-run type generation if the project uses generated route types, then typecheck, lint, test, build, inspect bundle/runtime output, and exercise auth plus cache invalidation in a production-like environment.

## Reference map

- [router-rendering-cache.md](references/router-rendering-cache.md): router detection, Server/Client Components, async APIs, rendering, caching, revalidation, navigation, handlers, and Actions.
- [data-security-runtime.md](references/data-security-runtime.md): DAL/DTO boundaries, auth, validation, handlers, secrets, CSP, runtimes, metadata, assets, and observability.
- [production-testing-upgrades.md](references/production-testing-upgrades.md): organization, test matrix, performance, deployment, self-hosting, upgrades, and release checks.
- [pages-router.md](references/pages-router.md): Pages Router maintenance and incremental migration rules; read only when `pages/` exists or migration is requested.
- [sources.md](references/sources.md): authoritative official source inventory, scope, currentness, and access dates.
