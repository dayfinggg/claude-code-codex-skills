# Defensive control playbook

## Authentication and recovery

- Prefer passkeys for phishing-resistant, user-verifying authentication where platform and recovery support are mature.
- Keep recovery at the same assurance as the account's risk. Notify on credential, factor, recovery-address, and high-risk session changes.
- Reauthenticate for high-impact actions using a recent, appropriate authenticator; do not rely only on an old session.
- Rate-limit by account and additional risk signals without enabling trivial account-lockout denial of service.
- Use current OAuth security BCP and OpenID Connect validation rules through maintained libraries.

## Authorization and tenancy

- Write an authorization matrix: actor × operation × resource state × tenant relationship × allowed fields.
- Enforce the matrix in the authoritative server-side path and data query.
- Include indirect paths: search, count, export, batch, jobs, caches, notifications, logs, audit, attachments, and nested GraphQL resolvers.
- Test one permitted case and representative denied cases, including another tenant with a valid object identifier.
- Keep privileged support or impersonation explicit, time-bounded, approved, visible, and audited.

## Injection and browser sinks

| Sink | Required primary control |
| --- | --- |
| SQL / NoSQL query | Parameterized or structured API; allowlist operator and field selection |
| OS process | Avoid shell; fixed executable and separated arguments; allowlist values |
| HTML / DOM | Context-aware encoding and safe DOM APIs; sanitizer only for intended rich HTML |
| Template / expression | Non-evaluating data binding; no attacker-selected template or expression |
| URL / redirect | Parse and allowlist destination semantics; never raw string prefix checks |
| Header | Framework header API plus CR/LF and semantic validation |
| File path | Fixed root, safe generated name, canonical containment, safe filesystem API |
| Native object | Do not deserialize untrusted native or polymorphic objects |

## SSRF destination validation

1. Avoid arbitrary URLs; accept a known resource ID or pre-registered destination when possible.
2. Restrict scheme, hostname, port, path shape, credentials, and redirect behavior.
3. Resolve DNS and reject prohibited address ranges for every resolution and redirect hop.
4. Route through an egress proxy or firewall that independently denies internal and metadata networks.
5. Set connect/read/overall timeouts, byte limits, decompression limits, and response content policy.
6. Do not forward user credentials or internal headers to the destination.
7. Log safe destination identity and outcome; alert on blocked or unusual destinations.

Library URL parsers and IP classifiers differ. Test IPv4, IPv6, mapped addresses, alternate notation, case, Unicode hostnames, multiple DNS answers, and redirect handling against the exact runtime.

## Upload pipeline

1. Authenticate and authorize upload and later access.
2. Enforce request, file-count, file-size, decompressed-size, dimension, and processing-time limits.
3. Validate required extension, declared media type, and detected content; reject mismatches according to product policy.
4. Generate a storage key; retain the original name only as safely encoded metadata.
5. Store outside the executable web root with no execute permission and a separate download origin when risk warrants it.
6. Scan or transform content before release when the threat model supports a reliable control.
7. Serve with a safe content type, disposition, authorization, and anti-sniffing headers.
8. Expire abandoned uploads and handle scanner/parser failure closed or through quarantine.

## Cookie checklist

- Use `Secure`, `HttpOnly`, and an intentional `SameSite` setting.
- Prefer `__Host-` for host-bound session cookies when browser and framework support it: `Secure`, path `/`, and no `Domain`.
- Avoid broad `Domain` and unnecessary `Path`; neither is an authorization boundary.
- Set only the lifetime required by the session policy.
- Rotate identifiers on trust changes and invalidate them server-side.
- Test proxy TLS termination, local development, subdomains, embedded flows, and cross-site redirects.

## CSP rollout

- Inventory first-party and third-party script, style, frame, connection, image, font, worker, and form destinations.
- Start from `default-src 'none'` and add narrowly required directives where feasible.
- Prefer nonces or hashes for scripts; avoid broad host allowlists, `'unsafe-inline'`, and `'unsafe-eval'` unless a documented compatibility exception exists.
- Use `object-src 'none'`, `base-uri 'none'` or a narrowly required value, and `frame-ancestors` according to embedding policy.
- Run report-only to find breakage, filter noise and sensitive report content, then enforce and regression-test.
- Keep encoding and safe sinks as primary XSS controls.

## Secret incident minimum

If a secret may have escaped, do not merely delete it from the current file. Identify the exact credential and scope, stop further exposure, rotate or revoke it, inspect use, invalidate derived sessions or tokens when needed, remove it from reachable artifacts and logs under authorized procedures, preserve incident evidence, and prevent recurrence with scanning and narrower credentials.
