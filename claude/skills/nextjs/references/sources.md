# Authoritative Sources

All sources were opened and inspected on 2026-07-13. Official live documentation displayed Next.js 16.2.10 on the access date. The support policy listed 16.x as Active LTS and 15.x as Maintenance LTS, while the June 2026 blog labeled 16.3 announcements as Preview. Treat this as a dated snapshot and re-check the installed package, bundled docs, release channel, and advisories for each task.

## Version, support, and project discovery

| Source | Publisher | Governs | Currentness note |
|---|---|---|---|
| [AI Coding Agents](https://nextjs.org/docs/app/guides/ai-agents) | Vercel / Next.js | Version-matched docs in `node_modules/next/dist/docs/` | Current 16.2-era guide; bundled docs take priority for installed behavior; accessed 2026-07-13. |
| [Support Policy](https://nextjs.org/support-policy) | Vercel / Next.js | Active/Maintenance LTS and Canary policy | Live policy listed 16.x and 15.x as supported; accessed 2026-07-13. |
| [Next.js 16.2](https://nextjs.org/blog/next-16-2) | Vercel / Next.js | Stable 16.2 changes and feature status | Published 2026-03-18; accessed 2026-07-13. |
| [Next.js blog](https://nextjs.org/blog) | Vercel / Next.js | Release/preview/security announcements | Live index labeled 16.3 as Preview in June 2026; accessed 2026-07-13. |
| [Version 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16) | Vercel / Next.js | Runtime requirements, async APIs, cache/image/proxy/removal changes | Current guide displayed docs 16.2.10; accessed 2026-07-13. |
| [Codemods](https://nextjs.org/docs/app/guides/upgrading/codemods) | Vercel / Next.js | Official transformations and version applicability | Live guide; inspect transformations before running; accessed 2026-07-13. |
| [GitHub releases](https://github.com/vercel/next.js/releases) | Next.js maintainers | Exact release artifacts, patches, and Canary tags | Primary repository; verify newest stable at task time; accessed 2026-07-13. |
| [GitHub security advisories](https://github.com/vercel/next.js/security/advisories) | Next.js maintainers | Affected/patched versions and framework CVEs | Primary advisory index included May 2026 advisories; accessed 2026-07-13. |

## App Router, rendering, caching, and server entry points

| Source | Publisher | Governs | Currentness note |
|---|---|---|---|
| [App Router docs](https://nextjs.org/docs/app) | Vercel / Next.js | Current App Router feature index | Live docs displayed 16.2.10; accessed 2026-07-13. |
| [Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) | Vercel / Next.js | Special files, route groups, private folders, `src` | Current App Router guide; accessed 2026-07-13. |
| [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) | Vercel / Next.js | Component defaults, client graph, serialization, environment poisoning | Updated 2026-03-16; accessed 2026-07-13. |
| [Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data) | Vercel / Next.js | Server reads, streaming, parallelism, request memoization | Current 16.2 guide; accessed 2026-07-13. |
| [Updating Data](https://nextjs.org/docs/app/getting-started/updating-data) | Vercel / Next.js | Server Functions/Actions, pending UI, refresh/revalidation/redirect | Updated 2026-02-27; verify installed APIs; accessed 2026-07-13. |
| [Caching with Cache Components](https://nextjs.org/docs/app/getting-started/caching) | Vercel / Next.js | `cacheComponents`, `use cache`, Suspense, runtime values | Updated 2026-05-13; applies only when enabled and supported; accessed 2026-07-13. |
| [Caching without Cache Components](https://nextjs.org/docs/app/guides/caching-without-cache-components) | Vercel / Next.js | Previous fetch/non-fetch cache and revalidation model | Updated 2026-03-03; use only when Cache Components is off; accessed 2026-07-13. |
| [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config) | Vercel / Next.js | Runtime and config availability under caching modes | Updated 2026-03-13; version history records v16 removals; accessed 2026-07-13. |
| [Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers) | Vercel / Next.js | Public Web request handlers and file convention | Updated 2026-02-27; accessed 2026-07-13. |
| [`route.js` reference](https://nextjs.org/docs/app/api-reference/file-conventions/route) | Vercel / Next.js | Handler params, caching, methods, segment options | Version history records GET default change in v15; accessed 2026-07-13. |
| [Backend for Frontend](https://nextjs.org/docs/app/guides/backend-for-frontend) | Vercel / Next.js | Handler scope, security, server self-fetch caveat, deployment limits | Updated 2026-03-25; accessed 2026-07-13. |

## Security, runtime, assets, observability, and production

| Source | Publisher | Governs | Currentness note |
|---|---|---|---|
| [Data Security](https://nextjs.org/docs/app/guides/data-security) | Vercel / Next.js | API/DAL/component access, DTOs, server-only, Actions security | Updated 2026-06-23; accessed 2026-07-13. |
| [Authentication](https://nextjs.org/docs/app/guides/authentication) | Vercel / Next.js | Session, DAL authorization, action/handler checks | Current 16.2 guide; use an established auth library where appropriate; accessed 2026-07-13. |
| [Content Security Policy](https://nextjs.org/docs/app/guides/content-security-policy) | Vercel / Next.js | Nonces, SRI, rendering and CSP tradeoffs | Updated 2026-02-27; also check patch advisories; accessed 2026-07-13. |
| [Edge Runtime](https://nextjs.org/docs/pages/api-reference/edge) | Vercel / Next.js | Node versus Edge API and ISR limitations | Shared runtime reference in current docs; accessed 2026-07-13. |
| [Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) | Vercel / Next.js | Metadata exports, file conventions, streaming | Updated 2026-02-27; accessed 2026-07-13. |
| [Image Optimization](https://nextjs.org/docs/app/getting-started/images) | Vercel / Next.js | `next/image`, sizing, remote assets, layout stability | Updated 2026-03-16; check target provider support; accessed 2026-07-13. |
| [`error.js` reference](https://nextjs.org/docs/app/api-reference/file-conventions/error) | Vercel / Next.js | Route error boundary scope and recovery | Current 16.2 reference; experimental APIs require local verification; accessed 2026-07-13. |
| [Instrumentation](https://nextjs.org/docs/app/guides/instrumentation) | Vercel / Next.js | Server startup instrumentation and runtime-specific imports | Updated 2026-02-27; accessed 2026-07-13. |
| [`useReportWebVitals`](https://nextjs.org/docs/app/api-reference/functions/use-report-web-vitals) | Vercel / Next.js | Client Core Web Vitals reporting | Current 16.2 reference; accessed 2026-07-13. |
| [Production guide](https://nextjs.org/docs/app/guides/production-checklist) | Vercel / Next.js | Framework production performance/security checklist | Current 16.2 guide; accessed 2026-07-13. |
| [Deploying](https://nextjs.org/docs/app/getting-started/deploying) | Vercel / Next.js | Node, container, adapter, and static deployment modes | Current 16.2 guide; verify provider implementation; accessed 2026-07-13. |
| [Self-Hosting](https://nextjs.org/docs/app/guides/self-hosting) | Vercel / Next.js | Reverse proxy, caches, multi-instance keys and deployments | Current 16.2 guide; accessed 2026-07-13. |
| [Testing](https://nextjs.org/docs/app/guides/testing) | Vercel / Next.js | Test layers and async Server Component limitation | Updated 2026-02-03; recommends E2E for async Server Components; accessed 2026-07-13. |
| [Accessibility](https://nextjs.org/docs/architecture/accessibility) | Vercel / Next.js | Route announcements, linting, framework accessibility behavior | Current architecture guide; pair with WCAG 2.2; accessed 2026-07-13. |

## Pages Router and migration

| Source | Publisher | Governs | Currentness note |
|---|---|---|---|
| [Pages Router docs](https://nextjs.org/docs/pages) | Vercel / Next.js | Supported legacy router index and API separation | Live docs displayed 16.2.10 and recommend App Router for latest features; accessed 2026-07-13. |
| [Pages data fetching](https://nextjs.org/docs/pages/building-your-application/data-fetching) | Vercel / Next.js | `getStaticProps`, `getStaticPaths`, `getServerSideProps`, client reads | Use only for Pages-owned routes; accessed 2026-07-13. |
| [API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) | Vercel / Next.js | `pages/api` contracts and limits | Use only for Pages Router endpoints; accessed 2026-07-13. |
| [App Router migration](https://nextjs.org/docs/app/guides/migrating/app-router-migration) | Vercel / Next.js | Incremental coexistence and route conversion | Updated 2026-03-13; combine with target-major upgrade docs; accessed 2026-07-13. |
