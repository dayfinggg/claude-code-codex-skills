# Data Security, Runtimes, Metadata, and Observability

## Choose and enforce a data boundary

- Preserve an existing external API boundary for large systems with established zero-trust controls.
- Prefer a server-only Data Access Layer for new production applications: authenticate/authorize close to each operation, use parameterized queries, and return minimal DTOs.
- Limit direct database access in Server Components to prototypes or tightly scoped code with the same validation and authorization discipline.
- Choose one dominant approach per area and make cross-boundary calls obvious. Mixed ad hoc access makes auditing and cache isolation unreliable.
- Use `server-only` or the repository's equivalent to fail builds when privileged modules leak into the client graph. Treat every Client Component prop as public.

## Authenticate and authorize every entry point

- Validate the session cryptographically and check revocation/expiry according to the auth system. Set cookies with appropriate `HttpOnly`, `Secure`, `SameSite`, path, domain, rotation, and lifetime.
- Re-check authentication, role/capability, tenant, and record ownership inside each DAL operation, Server Action, and Route Handler. Page visibility and proxy redirects do not grant access.
- Treat Server Actions as reachable POST endpoints even when their IDs are opaque. Validate every `FormData`, bound argument, search parameter, header, and client-supplied identifier.
- Treat Route Handlers as public APIs: enforce methods, schema, content type, body size, rate limit, timeouts, CORS/CSRF/origin policy, and stable error responses.
- Verify webhook signatures over the exact raw body with replay protection and bounded timestamp skew. Make retryable mutations idempotent.
- Prevent open redirects and SSRF by allowlisting schemes, hosts, ports, and paths; resolve DNS/private-network risks for server-side fetch and image proxying.

## Protect data and code

- Keep secrets in server environment or a secret manager. Prefix only intentionally public build-time values with `NEXT_PUBLIC_`; assume they are embedded in browser code.
- Validate environment configuration at startup or build according to when the value is consumed. Do not silently use unsafe production defaults.
- Filter private fields before React render context. Taint APIs, where supported, are defense in depth rather than a replacement for a DAL and DTOs.
- Do not forward incoming headers wholesale to upstreams or responses. Allowlist necessary headers and remove cookies, authorization, internal routing, and tracing secrets.
- Sanitize untrusted HTML and JSON-LD serialization, validate uploaded files, isolate user assets, and never expose stack traces, SQL, tokens, or internal hosts.
- Add a CSP appropriate to the rendering mode. Verify nonce/SRI behavior against the exact Next.js patch because security fixes have affected App Router CSP and scripts.
- Check the official Next.js and React security advisories before production changes; use supported patched releases, not hosting mitigations alone.

## Runtime selection

- Use the default Node.js runtime for Node APIs, database drivers, native modules, ISR, and broad library compatibility.
- Select Edge only when latency/location and Web API constraints justify it and every dependency supports the runtime. Edge lacks parts of Node and some caching features.
- In current Next.js 16, `proxy` uses Node.js and deprecated `middleware` remains relevant only for version-specific Edge needs. Verify the installed major before renaming or changing runtime.
- Treat serverless handlers as ephemeral and bounded: no correctness dependence on process memory, local disk, background work after termination, or long-lived sockets.
- Verify provider limits for duration, body size, response streaming, regions, concurrency, connections, filesystem, image optimization, caches, and WebSockets.

## Metadata and assets

- Export static metadata or `generateMetadata` only from supported Server Components. Set a correct `metadataBase`, canonical URLs, localized alternates, robots policy, and social images from trusted data.
- Escape or serialize JSON-LD so user content cannot close the script element. Validate public URLs and do not place secrets in metadata.
- Use `next/image` with intrinsic dimensions or `fill` plus a stable container, accurate `sizes`, meaningful `alt`, and narrow `remotePatterns`/`localPatterns`. Do not enable local-IP or SVG hazards without a reviewed requirement.
- Use `next/font` to self-host/subset required fonts and avoid layout shift. Keep fallback and language coverage deliberate.
- Use `next/script` with the least disruptive strategy and load only necessary third-party code. Measure consent, privacy, CSP, and main-thread cost.

## Errors and observability

- Use route error boundaries for recoverable segment UI, global error handling for root failures, and expected typed results for validation/conflict cases.
- Preserve `redirect`, `notFound`, and other framework control-flow exceptions through catch blocks. Use framework rethrow helpers only when present in the installed version.
- Instrument server startup through `instrumentation.ts|js` and browser startup through `instrumentation-client` only when supported. Keep initialization bounded and runtime-specific imports conditional.
- Record request/trace IDs, route template, status, latency, dependency spans, cache hit/miss/invalidation, action outcome, and build/deployment identity.
- Redact cookies, authorization, action arguments, form values, query secrets, and personal data. Ensure telemetry failure cannot take down the request path.
