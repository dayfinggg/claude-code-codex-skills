---
name: web-application-security
description: Threat-model, implement, review, and verify defensive security for web frontends, backends, APIs, data stores, dependencies, build pipelines, and deployments. Use whenever work touches authentication, sessions, authorization, tenant or object access, untrusted input or output, browsers, uploads, outbound requests, secrets, cryptography, privacy, logging, dependencies, CI/CD, infrastructure, abuse controls, or incident-sensitive behavior.
---

# Web Application Security

## Operating contract

Use this skill for defensive, authorized work. Protect users and systems; do not turn review findings into instructions for attacking a target. Handle credentials, personal data, vulnerability details, and logs at the minimum disclosure needed for the task.

Start from the exact repository, deployment model, data flows, and supported runtime and framework versions. Inspect scoped instructions, authentication and authorization middleware, handlers, templates, queries, storage, cookies, proxy/CDN, CI/CD, dependency lockfiles, infrastructure, tests, and operational controls before changing code. Verify uncertain security APIs against official documentation for the installed version.

Use OWASP ASVS 5.0.0 as a stable, version-pinned verification baseline selected by risk; use the OWASP Top 10 only as an awareness list. Read [control-playbook.md](references/control-playbook.md) for implementation controls, [verification-matrix.md](references/verification-matrix.md) for evidence and rollout, and [sources.md](references/sources.md) for standards status and current versions.

## Scale the security pass

For a routine local change with no new trust boundary, trace untrusted input to sensitive sinks, confirm existing identity and authorization behavior, preserve secure defaults, and run focused negative tests.

Perform a deeper threat model when work introduces or changes:

- login, account recovery, multi-factor authentication, passkeys, sessions, tokens, roles, permissions, or administration;
- tenant, object, property, or function-level access;
- uploads, rich text, templates, raw HTML, interpreters, queries, filesystem paths, or deserialization;
- server-side outbound requests, callbacks, webhooks, URL previews, imports, or internal network access;
- secrets, cryptography, personal or regulated data, retention, export, or deletion;
- new dependencies, registries, build steps, CI identities, artifacts, deployment targets, or privileged infrastructure;
- payments, high-value actions, abuse-prone workflows, public exposure, or incident-response obligations.

## Build a threat model from evidence

1. List assets and invariants: accounts, tenant data, money, credentials, code execution, configuration, availability, audit history, and privacy obligations.
2. Draw only the data flows needed to show actors, browser, edge, application, workers, databases, third parties, build systems, and trust boundaries.
3. Identify entry points and abuse cases for anonymous, authenticated, cross-tenant, privileged, compromised-client, dependency, and operator contexts.
4. Trace where identity is established, authority is decided, input becomes trusted, secrets appear, data is persisted, and external effects occur.
5. Rank threats by likelihood, impact, exposure, detectability, and reversibility. Separate a proven defect from a plausible risk and an unverified assumption.
6. Assign each control one owner, enforcement point, failure behavior, and verification method. Prefer removing a dangerous capability over detecting its misuse.
7. Define rollout, monitoring, incident, revocation, repair, and rollback behavior before high-risk changes ship.

Do not declare a system secure because a scanner passed or a Top 10 list was reviewed.

## Establish identity safely

- Prefer a maintained identity provider and framework security primitives. Do not implement passwords, token validation, WebAuthn, OAuth, OpenID Connect, or cryptography from scratch.
- Use passkeys/WebAuthn when the product and recovery model can support them. Treat phishing-resistant authentication as an end-to-end property; fallback and account recovery must not undercut it.
- Follow the current NIST SP 800-63-4 family or applicable regulation for authenticator, enrollment, recovery, and assurance decisions. Document deviations driven by product constraints.
- For passwords, allow password managers and paste, avoid arbitrary composition rules, block known-compromised values where appropriate, rate-limit guesses, and store only with a modern framework-supported password hash and calibrated work factor.
- Protect enrollment, recovery, email or phone changes, MFA reset, and credential linking as privileged workflows with reauthentication, notification, delay or review where risk warrants it.
- Keep authentication errors and timing from revealing avoidable account state while retaining usable recovery paths and operator evidence.

## Protect sessions and tokens

- Generate session identifiers with a vetted cryptographic generator. Store only opaque identifiers in browser cookies when server-side sessions fit.
- Rotate the session on login, privilege change, credential recovery, and other trust elevation. Invalidate affected sessions on logout, revocation, password reset, account disablement, or compromise according to policy.
- Set `Secure`, `HttpOnly`, and an intentional `SameSite` value on session cookies; use a narrow host and path, avoid `Domain` unless required, and prefer host-bound cookie prefixes when supported.
- Define idle and absolute lifetimes, renewal, concurrent-session policy, device visibility, and revocation. Do not put long-lived bearer credentials in browser-readable persistent storage without a threat-modelled reason.
- Validate token signature and algorithm, issuer, audience, time claims, nonce or state, authorized party, and key rotation as required by the protocol. Never accept an algorithm or key based only on attacker-controlled input.
- Keep bearer tokens out of URLs, logs, analytics, error reports, and referrers. Minimize scope and lifetime and use sender-constrained credentials when the risk justifies them.

## Enforce authorization at the owner

- Deny by default and enforce on the server for every operation, object, field or property, tenant, and privileged workflow.
- Derive tenant and actor context from the authenticated session or validated token. Treat path, body, query, header, GraphQL field, job, cache key, and message identifiers as untrusted selectors.
- Apply authorization in the data query or authoritative service boundary so a forgotten post-filter cannot expose another tenant's rows.
- Check relationship and state, not only role names. Centralize policy decisions where that improves consistency, but keep resource-specific facts with their owner.
- Prevent mass assignment by explicitly selecting writable fields. Protect read-side fields separately from write permission.
- Test horizontal, vertical, cross-tenant, object-level, property-level, function-level, batch, export, background-job, and indirect-reference paths.
- Avoid existence leaks through status, timing, counts, caches, search, autocomplete, error detail, or side channels when policy requires non-disclosure.

## Validate input and encode output

- Validate at the first trusted boundary with allowlisted shape, type, length, range, format, cardinality, and cross-field semantics. Bound nested depth, decompression, parsing, and computational cost.
- Canonicalize only once using a specified encoding and normalization. Reject ambiguous encodings, duplicate parameters, unexpected content types, and invalid Unicode where they change security meaning.
- Use parameterized database queries, safe ORM APIs, fixed command arguments, and non-evaluating parsers. Never concatenate untrusted input into SQL, NoSQL operators, shell commands, templates, expressions, headers, or interpreters.
- Apply context-specific output encoding at the final sink for HTML text, attributes, URLs, JavaScript, CSS, and headers. Prefer framework auto-escaping and safe DOM APIs.
- Sanitize only when the product intentionally accepts rich HTML, using a maintained allowlist sanitizer configured for the exact output context. Treat sanitization and later mutation as one security boundary.
- Keep Content Security Policy as defense in depth, not a replacement for correct encoding, safe sinks, and dependency control.

## Secure browser boundaries

- Protect every cookie-authenticated state-changing request against CSRF. Prefer framework defenses using a server-validated token or an appropriate signed double-submit design; also verify origin where suitable.
- Use `SameSite` as defense in depth, not the sole CSRF control when cross-site delivery, browser differences, subdomains, or high-impact actions matter.
- Configure CORS as a browser read-sharing policy, not authentication or network access control. Use exact trusted origins, methods, and headers; never combine wildcard origins with credentials.
- Deploy a restrictive nonce- or hash-based CSP aligned with real script and style loading. Roll out with report-only telemetry when compatibility risk is high, then enforce; protect the reporting endpoint from sensitive-data capture and noise.
- Set HTTPS and current TLS configuration, HSTS only after verifying all covered hosts, `X-Content-Type-Options: nosniff`, framing control through CSP `frame-ancestors`, and an intentional referrer policy.
- Test through the actual browser, framework, CDN, reverse proxy, and cache because each can rewrite security headers and cookie behavior.

## Contain dangerous data paths

For server-side requests, allow only required schemes and destinations. Parse with a standard URL library, resolve and validate every destination, block local, link-local, private, metadata, and otherwise prohibited networks, constrain ports, revalidate redirects, apply egress controls, and bound time, response size, and protocol behavior. Account for DNS rebinding and alternate IP encodings. Avoid fetching attacker-controlled locations when a safer identifier or proxy exists.

For uploads, allow only required extensions and verified content types, set byte and count limits, generate storage names, prevent path control, store outside executable/public paths, apply authorization to download, scan or transform according to risk, and defend parsers against bombs and resource exhaustion. Do not trust client filenames or `Content-Type` alone.

For filesystem access, resolve against a fixed root, reject traversal and dangerous device or special paths, and verify the canonical result remains inside the root. Avoid TOCTOU-sensitive path checks when a safer file-descriptor or storage API exists.

For deserialization, prefer simple data formats and strict schemas. Never deserialize untrusted native objects or enable polymorphic type construction without a tightly controlled allowlist and proven need.

## Manage secrets and cryptography

- Keep secrets in an approved secret manager or runtime injection path, never source, examples, images, build output, client bundles, URLs, logs, or test fixtures.
- Grant the smallest identity and secret scope, rotate without downtime, revoke on exposure, and inventory owners and consumers. Use separate credentials per environment and workload.
- Use vetted, maintained libraries and current platform defaults for encryption, signatures, randomness, password hashing, and TLS. Do not invent algorithms, modes, key derivation, serialization, or nonce management.
- Separate encryption keys from encrypted data and protect key lifecycle, access, backup, rotation, and destruction. Use authenticated encryption when encrypting application data.
- Minimize collection and retention of personal data. Define purpose, access, redaction, export, deletion, backup behavior, and audit evidence.

## Secure dependencies and delivery

- Commit and review lockfiles. Verify package identity, source, maintainers, license, install scripts, transitive impact, and compatibility before adding or upgrading dependencies.
- Use trusted registries, least-privilege automation tokens, protected branches or equivalent review controls, isolated builds, and reviewed CI changes. Pin third-party actions and build inputs to immutable identities where supported.
- Generate and preserve provenance or an SBOM when supply-chain risk, policy, or deployment requires it. Use SLSA 1.2 as a current framework for build and source assurance, not as a self-attested security badge.
- Run dependency, secret, source, container, and infrastructure scans at the cheapest useful stage, triage findings against actual reachability and exposure, and patch or mitigate by risk.
- Remove unused dependencies, permissions, endpoints, feature flags, credentials, and build paths. A smaller attack surface is easier to verify.

## Log, detect, and resist abuse

- Log authentication and recovery outcomes, authorization denials, privileged changes, input rejection classes, secret and policy changes, webhook verification failures, throttling, and security-control failures with safe actor, target, time, outcome, and correlation data.
- Never log passwords, session IDs, access or refresh tokens, API keys, encryption keys, raw sensitive payloads, or unnecessary personal data. Apply structured redaction at the source and protect log access, integrity, retention, and deletion.
- Rate-limit and quota by the actor and resource that can cause harm: account, tenant, IP or network when useful, destination, object, expensive operation, and global capacity. Avoid one shared limit that attackers can weaponize against everyone.
- Bound requests, concurrency, queues, fan-out, retries, batch work, search, exports, emails, uploads, and cost-amplifying features. Add backpressure, admission control, circuit breaking, and graceful degradation.
- Detect business abuse such as enumeration, credential stuffing, recovery flooding, invitation abuse, promo abuse, scraping, payment manipulation, and automated high-value actions with privacy-aware signals and review paths.

## Verify and release safely

Map applicable controls to exact OWASP ASVS 5.0.0 requirement identifiers in the work evidence; do not cite unverified IDs from memory. Combine design review, code review, unit and integration tests, authorization matrices, browser tests, dependency and configuration analysis, and authorized dynamic testing according to [verification-matrix.md](references/verification-matrix.md).

Test that controls fail closed without causing unsafe outages. Stage high-risk changes, observe both security and user-impact metrics, and retain a rollback that does not reopen the vulnerability. Prepare credential revocation, session invalidation, data repair, customer notification, evidence preservation, and patch rollout when the threat model requires incident readiness.

## Reject common failure modes

- Do not rely on client-side validation, hidden buttons, unpredictable IDs, CORS, or a gateway as authorization.
- Do not use a denylist where a narrow allowlist or removal of the capability is possible.
- Do not build SQL, NoSQL, shell, template, or URL behavior through string concatenation.
- Do not store tokens in browser-accessible locations merely because it is convenient.
- Do not weaken TLS, cookie, CSP, CSRF, or redirect checks to make a test pass without understanding the runtime path.
- Do not suppress a scanner finding without evidence, and do not equate an untriaged scanner result with an exploitable defect.
- Do not disclose detailed vulnerability paths, secrets, or production data beyond the authorized audience.
- Do not claim compliance, phishing resistance, exactly-once controls, or security certification without matching evidence.
