# Security

Load this reference only when the changed code or configuration creates, crosses, or alters one of these: a trust boundary; authentication, authorization, or permissions; secrets or keys; sensitive data; untrusted input; output encoding or rendering; files or archives; processes or commands; cryptography; dependencies or supply-chain controls; or build, release, and deployment handling.

Identify the assets, actors, entry points, trust boundaries, and failure modes in the changed surface. Validate decoded and canonicalized data at the receiving boundary, and encode output for its destination. Use parameterized operations, least privilege, deny-by-default authorization, secure platform primitives, approved cryptography, and cryptographically secure randomness.

Keep secrets out of source, generated artifacts, logs, errors, tests, and client-visible state. Avoid leaking stack traces or internal identifiers. Bound resource use, timeouts, retries, payloads, recursion, decompression, and concurrency to resist abuse.

For dependencies and releases, verify provenance, integrity, known vulnerabilities, and the least privileges needed by build and deployment credentials. Preserve audit-relevant security events without sensitive contents. Threat-model material new boundaries and verify failure behavior. Apply the relevant verification depth rather than treating every source edit as a full security review.

Primary references: [NIST SSDF](https://csrc.nist.gov/pubs/sp/800/218/final), the [OWASP Developer Guide](https://owasp.org/www-project-developer-guide/), the [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/), and [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/). Use ASVS requirements when the changed system is a web application or API and version any requirement identifier cited in evidence.
