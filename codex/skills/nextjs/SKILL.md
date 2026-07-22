---
name: nextjs
description: Engineer installed-version Next.js routing, rendering, caching, revalidation, handlers, actions, metadata, and runtimes. Use only for Next.js semantics; not for generic React behavior or because next or an app directory exists.
---

# Next.js

## Establish the exact framework contract

- Inspect the lockfile, installed package metadata, `next.config.*`, runtime/deployment configuration, scripts, and relevant route files. Resolve the exact `next`, `react`, and `react-dom` versions; dependency ranges are not proof of the installed build.
- Prefer version-matched documentation under `node_modules/next/dist/docs/` when present. Use current official documentation only to fill gaps or assess upgrades.
- Detect `app`/`src/app`, `pages`/`src/pages`, or a deliberate mixed migration. Do not mix App Router and Pages Router data, navigation, error, or cache models. For Pages Router code, follow [Pages Router guidance](references/pages-router.md).
- Inspect semantics-changing settings such as `cacheComponents`, `output`, `runtime`, `experimental`, images, Server Actions, `basePath`, redirects, rewrites, headers, and bundler or adapter customization.

Read [router, rendering, and cache guidance](references/router-rendering-cache.md) before changing routing, rendering, data fetching, caching, revalidation, or navigation. Use [authoritative Next.js sources](references/sources.md) when version, support, security, or feature status matters.

## Preserve router and rendering boundaries

- In App Router, keep layouts and pages as Server Components by default. Add a client boundary only for state, Effects, event handlers, browser APIs, or a client-only dependency, and keep it narrow with minimal serializable props.
- Keep secrets, database clients, privileged SDKs, and authorization in server-only modules. Fetch from the underlying data source during server rendering rather than calling the application's own Route Handler without a real network boundary.
- Await request APIs and route props according to the installed version. Preserve framework control-flow errors for redirect, not-found, and similar outcomes; do not swallow them in broad catches.
- Use Route Handlers for HTTP contracts and Server Actions for UI-originated mutations that benefit from the RSC response. Treat both as directly reachable: validate input and size, authenticate, authorize ownership, constrain output, and apply origin, signature, idempotency, or rate-limit rules where required.
- Use proxy/middleware for routing and optimistic checks, never as the only authorization layer. Re-check access at the protected operation. Read [data, security, and runtime guidance](references/data-security-runtime.md) before changing these boundaries.

## Make caching and runtime explicit

- Before caching, identify the viewer and tenant scope, freshness requirement, cache key, invalidation event, durability, and multi-instance behavior. Separate React request memoization, Next data/output caches, CDN/browser caches, and the client router cache.
- Branch on the installed version and `cacheComponents` setting. With Cache Components, use only documented cache directives, lifetimes, tags, Suspense, and runtime-value patterns. Without it, use only the fetch or non-fetch caching APIs supported by that version.
- Never put user-specific or authorization-sensitive data in a shared entry without a proven scoped key or supported private mode. After mutations, choose read-your-writes invalidation for interactive edits and stale revalidation only when stale data is acceptable.
- Verify Node versus Edge APIs, environment-variable timing, filesystem assumptions, connection reuse, static export limits, image behavior, and cache sharing against the deployment adapter.
- Preserve Metadata and asset conventions supported by the detected router. Keep generated metadata server-side and avoid leaking unrestricted data into client props or public metadata.

Use [production testing and upgrade guidance](references/production-testing-upgrades.md) for deployment, self-hosting, performance, and version transitions.

## Use project feedback

Run the configured typecheck and lint commands explicitly, then focused route, handler, action, cache, or navigation tests. Run a production build when routing, rendering, cache, metadata, configuration, runtime, or module boundaries change. Smoke-test built output in the deployment runtime and verify cache isolation, invalidation, authorization failures, and control-flow responses when those paths changed.
