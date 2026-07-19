# Primary references

Accessed 2026-07-13. Living standards, drafts, and cheat sheets require rechecking before version-sensitive implementation.

| Source | Status/currentness | Use in this skill |
| --- | --- | --- |
| [OWASP Top 10: 2025](https://owasp.org/Top10/2025/) | Current released awareness list | Broad web risk categories; not a verification checklist |
| [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) | Stable version 5.0.0, released 2025-05-30 | Version-pinned application security requirements and verification evidence |
| [OWASP SAMM model](https://owaspsamm.org/model/) | Maintained version 2 model | Risk-driven secure-development maturity across governance, design, implementation, verification, and operations |
| [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) | Living defensive guidance | Implementation detail; use the specific sheets below and verify current framework behavior |
| [Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) | Living OWASP guidance | Authentication, password, recovery, reauthentication, and error handling |
| [Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) | Living OWASP guidance | Deny-by-default, per-request, object, and attribute authorization |
| [Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) | Living OWASP guidance | Syntactic and semantic validation, allowlists, normalization, and bounds |
| [XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) | Living OWASP guidance | Context-aware encoding, safe sinks, sanitization, and anti-patterns |
| [CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) | Living OWASP guidance | Token patterns, origin checks, SameSite, and state-changing requests |
| [CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html) | Living OWASP guidance | CSP construction, reporting, nonces/hashes, and defense-in-depth use |
| [SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) | Living OWASP guidance | Destination validation, allowlists, network controls, and bypass considerations |
| [File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) | Living OWASP guidance | Filename, extension, type, storage, scanning, and resource controls |
| [Deserialization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html) | Living OWASP guidance | Avoiding unsafe native-object and polymorphic deserialization |
| [HTTP Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html) | Living OWASP guidance | Browser security headers and deployment caveats |
| [Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) | Living OWASP guidance | Security event coverage, sensitive-data exclusion, integrity, and operations |
| [Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) | Living OWASP guidance | Secret lifecycle, storage, access, rotation, and logging |
| [OWASP API Security Top 10: 2023](https://owasp.org/API-Security/editions/2023/en/0x10-api-security-risks/) | Current released API risk edition | Object/property/function authorization, resources, SSRF, inventory, and third-party APIs |
| [NIST SP 800-218 SSDF 1.1](https://csrc.nist.gov/pubs/sp/800/218/final) | Final, February 2022; SSDF 1.2 remained draft at review time | Secure-development practices and supply-chain integration |
| [NIST SP 800-63-4](https://csrc.nist.gov/pubs/sp/800/63/4/final) and [SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b/authenticators/) | Final, July 2025; supersedes revision 3 | Digital identity, authenticator, recovery, and phishing-resistance guidance |
| [Web Authentication Level 3](https://www.w3.org/TR/webauthn-3/) | W3C Candidate Recommendation Snapshot, 2026-05-26; version-sensitive | Passkey/public-key credential protocol; use current browser/server libraries |
| [RFC 9700: OAuth 2.0 Security BCP](https://www.rfc-editor.org/rfc/rfc9700.html) | BCP 240, January 2025 | Current OAuth threat mitigations and deprecated flows |
| [RFC 9325: Secure Use of TLS and DTLS](https://www.rfc-editor.org/rfc/rfc9325.html) | BCP 195, November 2022 | TLS protocol and cipher configuration baseline |
| [WHATWG Fetch Standard](https://fetch.spec.whatwg.org/) | Living Standard, updated 2026-07-02 at review | Browser fetch and CORS processing model |
| [Content Security Policy Level 3](https://www.w3.org/TR/CSP/) | W3C Working Draft, 2026-05-05; work in progress | CSP processing model; verify current browser behavior |
| [RFC 6265](https://www.rfc-editor.org/rfc/rfc6265.html) and [6265bis draft-21](https://datatracker.ietf.org/doc/draft-ietf-httpbis-rfc6265bis/21/) | RFC 6265 is stable 2011; bis remained an Internet-Draft dated 2025-12 | Cookie protocol baseline and evolving modern behavior |
| [MDN Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie) | Mozilla-maintained current browser reference | Effective `Secure`, `HttpOnly`, `SameSite`, domain, path, and prefix behavior |
| [SLSA specification 1.2](https://slsa.dev/spec/v1.2/) | Current approved Linux Foundation specification | Build and source provenance assurance framework |
| [CISA/FBI Product Security Bad Practices](https://www.cisa.gov/news-events/alerts/2025/01/17/cisa-and-fbi-release-updated-guidance-product-security-bad-practices) | Updated CISA guidance, 2025-01-17 | Avoiding dangerous product defaults and development practices |
