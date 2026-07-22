---
name: web-application-security
description: Threat-model and verify defensive controls at material web trust boundaries. Use for authentication, authorization, sessions, sensitive untrusted input, uploads, outbound requests, secrets, cryptography, personal data, privileged actions, or abuse controls; not for ordinary web code without such a boundary.
---

# Web Application Security

## Scope the trust boundary

Perform only defensive, authorized work and disclose credentials, personal data, logs, and vulnerability detail only as needed. Inspect the exact framework and runtime versions, deployment path, identity middleware, handlers, templates, queries, storage, cookies, proxy or CDN behavior, tests, and operational controls that participate in the boundary. Verify version-sensitive security APIs against installed code and official documentation.

Use OWASP ASVS 5.0.0 as a risk-selected verification baseline, not a claim of compliance. Read [control playbook](references/control-playbook.md) for implementation detail, [verification matrix](references/verification-matrix.md) for evidence and rollout, and [authoritative sources](references/sources.md) for current standards and version status.

Map the protected asset, actors, entry points, trust transitions, privileged effects, and invariants. Trace where identity is established, authority is decided, data becomes trusted, secrets appear, and external effects occur. Consider anonymous, authenticated, cross-tenant, privileged, compromised-client, dependency, and operator contexts. Assign each required control one enforcement point, owner, failure behavior, and negative test.

## Establish identity and sessions

Use maintained identity providers, protocol libraries, and framework primitives; do not invent passwords, token formats, OAuth, OpenID Connect, WebAuthn, or cryptography. Protect enrollment, recovery, credential linking, MFA reset, and identity changes as privileged workflows with reauthentication, notification, delay, or review according to risk.

Generate session identifiers with a vetted cryptographic source. Rotate sessions on login, recovery, and privilege elevation; invalidate them on logout, revocation, account disablement, or compromise. Set session cookies with `Secure`, `HttpOnly`, an intentional `SameSite`, narrow host and path scope, and defined idle and absolute lifetimes.

Validate token signature and permitted algorithm, issuer, audience, time claims, nonce or state, authorized party, and key rotation as the protocol requires. Never choose an algorithm or key from untrusted token input. Keep bearer credentials out of URLs, browser-readable persistent storage, logs, analytics, and error reports unless an explicit threat model justifies the exposure.

## Enforce authorization at the owner

Deny by default and authorize each operation, object, field, tenant, and privileged state transition on the server. Derive actor and tenant context from the authenticated session or validated token; treat path, query, body, header, GraphQL field, job, cache key, and message identifiers only as untrusted selectors.

Apply authorization in the authoritative query or service boundary so forgotten post-filtering cannot leak records. Check ownership, relationship, and object state rather than role names alone. Explicitly select readable and writable fields to prevent mass assignment. Test horizontal, vertical, cross-tenant, batch, export, indirect-reference, background-job, and property-level denial, including existence leaks through status, timing, counts, search, and caches.

## Control untrusted data and browser behavior

Validate shape, type, length, range, format, cardinality, nested depth, decompression, and cross-field meaning at the first trusted boundary. Reject ambiguous encodings, duplicate parameters, and unexpected content types when they change meaning. Use parameterized database APIs, fixed command arguments, non-evaluating parsers, and context-specific output encoding at the final sink. Sanitize rich HTML only with a maintained allowlist configured for its output context.

Protect cookie-authenticated state changes from CSRF with a server-validated framework mechanism; treat `SameSite` as defense in depth. Configure CORS only as a browser read-sharing policy, using exact trusted origins when credentials are allowed. Use restrictive CSP, framing control, `nosniff`, intentional referrer policy, HTTPS, and carefully scoped HSTS according to the actual browser, proxy, CDN, and cache path.

For outbound requests, allow only required schemes and destinations, resolve and validate each hop, block prohibited local and metadata networks, revalidate redirects, constrain ports, apply egress controls, and bound time and response size. Account for DNS rebinding. For uploads, verify allowed content, bound bytes and counts, generate storage names, store outside executable paths, authorize download, and contain parser bombs. For filesystem access, resolve against a fixed root and verify the canonical result remains inside it. Never deserialize untrusted native objects or enable open polymorphic construction.

## Protect secrets and resist abuse

Keep secrets in the approved runtime injection or secret manager path, never source, client bundles, URLs, logs, fixtures, or build output. Scope credentials per workload and environment, rotate without downtime, revoke on exposure, and use vetted platform cryptography with managed key lifecycle. Minimize personal-data collection, retention, access, exports, backups, and logging.

Bound requests, concurrency, queues, fan-out, retries, exports, uploads, and expensive operations. Rate-limit the actor and resource capable of harm without creating a shared denial-of-service lever. Log security outcomes and correlation data but redact passwords, sessions, tokens, keys, and unnecessary payloads. Define fail-closed behavior, revocation, repair, monitoring, rollout, and rollback for high-risk controls.

## Verify the boundary

Run project-native authorization matrices, focused unit and integration tests, real browser checks where cookie or header behavior matters, and approved dynamic or configuration checks proportionate to risk. Test malformed input, cross-tenant access, privilege changes, replay, timeout, dependency outage, proxy rewriting, and control failure. Do not treat a scanner pass or Top 10 review as proof of safety, suppress findings without evidence, or weaken a control merely to make a test pass.
