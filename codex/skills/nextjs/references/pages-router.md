# Pages Router Maintenance and Migration

Read this file only when `pages/` or `src/pages/` exists, a route is owned by the Pages Router, or the user requests a migration.

## Preserve the existing router

- Use the current Pages Router documentation matching the installed Next.js version. It remains supported on current versions but does not share App Router component, data, or cache semantics.
- Keep routing in `pages`, API contracts in `pages/api`, global application setup in `_app`, and document markup in `_document` according to existing conventions.
- Use `getStaticProps`/`getStaticPaths` for build-time or ISR data and `getServerSideProps` for per-request server data. Keep client fetching in the existing data library when browser-driven refresh is required.
- Never import `next/navigation` Hooks into a Pages Router route; use `next/router` and Pages-compatible APIs. Shared components must not assume an App Router context.
- Treat API Routes as public endpoints with the same validation, auth, authorization, size, rate-limit, timeout, and error rules as Route Handlers.
- Preserve Automatic Static Optimization and serialization constraints. Do not add `getInitialProps` to `_app` casually because it changes optimization behavior across routes.

## Coexistence with App Router

- Determine route ownership by filesystem and URL; the same URL cannot be served by both routers.
- Keep router-specific providers and navigation adapters at each router's boundary. Share pure UI, domain logic, schemas, and server data functions only when their runtime contracts are neutral.
- Do not call App Router-only cache, Server Action, layout, metadata, loading, or error APIs from Pages routes.
- Test transitions between Pages and App routes as full navigations may differ from same-router client navigation.

## Incremental migration

1. Upgrade to a supported Next.js version before or separately from broad route migration when practical.
2. Characterize the existing route's SSR/SSG/ISR behavior, status codes, redirects, headers, auth, metadata, analytics, and tests.
3. Create the root App layout and shared providers without changing unrelated Pages routes.
4. Migrate one route segment at a time. Convert `next/head` to Metadata APIs, Pages router Hooks to App equivalents, and data methods to Server Component/data-cache patterns explicitly.
5. Move mutations/API endpoints only when their public contract and consumers are understood. A Server Action is not a drop-in replacement for a public API Route.
6. Verify static/dynamic output, cache invalidation, loading/error behavior, hydration, client navigation, SEO metadata, and analytics for the migrated URL.
7. Remove Pages-specific code only after no route/import depends on it. Keep rollback possible until production behavior is verified.

Do not combine the migration with a design-system rewrite or data-layer replacement unless required. The official migration guide supports incremental coexistence; use it with the installed major's upgrade notes.
