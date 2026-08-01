# Security

Load this reference when code handles untrusted input, identity, authorization, credentials, cryptography, network traffic, files, processes, serialization, databases, dependencies, or sensitive data.

Identify trust boundaries and validate decoded, canonicalized data server-side. Encode output for its destination. Use parameterized operations, least privilege, deny-by-default authorization, secure platform primitives, approved cryptography, and cryptographically secure randomness.

Keep secrets out of source, generated artifacts, logs, errors, tests, and client-visible state. Avoid leaking stack traces or internal identifiers. Bound resource use, timeouts, retries, payloads, recursion, decompression, and concurrency to resist abuse.

Review dependency provenance and known vulnerabilities with the ecosystem's maintained scanner. Preserve audit-relevant security events without sensitive contents. Threat-model material new boundaries and verify failure behavior.

Primary references: [NIST SSDF](https://csrc.nist.gov/pubs/sp/800/218/final) and [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/).
