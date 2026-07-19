# Router, Rendering, Data, and Caching

## Detect before deciding

- Locate `app/`, `src/app/`, `pages/`, and `src/pages/`; account for custom `pageExtensions` and monorepo package roots.
- Read the installed `next/package.json` and `node_modules/next/dist/docs/` when present. Inspect `next.config.*` for `cacheComponents` and version-sensitive flags.
- Map the route's special files, segment hierarchy, runtime exports, generated route types, server/client directives, and existing data functions before editing.
- If both routers exist, identify which router owns the requested URL. Shared components do not make routing/data APIs interchangeable.

## App Router composition

- Keep page/layout modules server-side by default. Introduce the smallest client entry point around interactivity; imported descendants join the client graph.
- Pass server-rendered children into Client Components to avoid pulling their implementation into the client graph. Pass only serializable public values.
- Put database and private API access in server-only modules. Use React request memoization for repeated same-request reads where supported, but do not mistake it for a persistent cache.
- Start independent server reads in parallel and use nested Suspense to stream useful regions. Avoid a Server Component calling an internal Route Handler, which adds a network hop and can fail during build-time prerendering.
- Await `params`, `searchParams`, `cookies()`, `headers()`, and `draftMode()` exactly as the installed version requires. Next.js 16 removed the temporary synchronous access supported during the version 15 transition.

## Cache decision record

For each cached operation, record data owner, user/tenant scope, inputs, cache layer, freshness, invalidation, error behavior, memory/storage bound, and multi-instance coordination. Never cache an authorization result or user record under a key that omits its security scope.

### When `cacheComponents` is enabled

- Follow the installed Cache Components docs; in the 16.x model this is an explicit configuration mode, not a synonym for all Next.js caching.
- Use `use cache` only for deterministic shared work that may be reused. Set a documented lifetime and tags when freshness requires them.
- Keep uncached request-time work behind a meaningful Suspense boundary so the static shell can prerender and the dynamic content can stream.
- Read runtime APIs such as cookies or headers outside a shared cache and pass the necessary minimal value into a cached function only when that value belongs in the cache key.
- Use supported private/remote cache modes only after verifying installed-version availability and deployment storage semantics.
- Use `updateTag` for read-your-writes mutations where supported; use `revalidateTag` with the installed signature for stale-while-revalidate cases; use path invalidation only when the path is the correct dependency unit.
- Remember that enabling Cache Components changes or removes prior route-segment options. Never paste `dynamic`, `revalidate`, or `fetchCache` guidance without checking the local docs.

### When `cacheComponents` is not enabled

- Follow the previous-model guide matching the installed version. In current supported v15/v16 semantics, server `fetch` is not persistently cached by default; opt in deliberately with documented fetch or route settings.
- Use the framework's supported non-fetch cache API for ORM/database work and include every behavioral input in the key.
- Distinguish time-based revalidation from on-demand tag/path invalidation. Verify how a lower revalidation interval affects the whole route in that version.
- Do not infer dynamic/static behavior only from `cookies`, headers, or one fetch without checking the installed major's rules.
- Route Handler `GET` defaults and prerender behavior changed across majors and with Cache Components. Read the local `route.js` documentation before relying on caching.

## Navigation and route lifecycle

- Use `Link` for internal user navigation and the correct router Hook for the detected router. Never pass an untrusted URL directly to programmatic navigation.
- Add `loading`, Suspense, and error UI at segment boundaries that can render and recover independently. Size fallbacks to avoid layout shift.
- Preserve layouts for shared UI; use templates only when remount/reset behavior is intentional.
- Use `notFound`, redirects, and authorization interrupts according to the installed stable API. Let their control-flow exceptions escape framework-aware catch boundaries.
- Treat prefetch as a network/cache behavior with cost. Measure dynamic large lists and slow networks before disabling or forcing it globally.

## Route Handlers and Server Actions

- Route Handlers expose public Web `Request`/`Response` contracts. Define allowed methods, validate bodies once, return correct status/headers, and make cache headers vary on all representation inputs.
- Use Route Handlers for webhooks, callbacks, public APIs, feeds/files, or browser data access. Use direct data functions in Server Components.
- Use Server Actions for mutations initiated from the React UI. Keep them asynchronous, narrow, and secure; validate input and authorization inside every action.
- Revalidate/update the affected cache after a successful commit and before a redirect when required. Do not invalidate on a failed transaction.
- Return a minimal typed result for expected validation/conflict errors. Throw or log unexpected failures according to the route error strategy, without exposing internals.
- Do not use Actions as a general query RPC layer; client dispatch may serialize work and obscure caching and HTTP semantics.
