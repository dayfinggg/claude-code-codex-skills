# Primary references

Accessed 2026-07-13. Verify draft and living-standard status again before treating it as stable.

| Source | Status/currentness | Use in this skill |
| --- | --- | --- |
| [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) | Internet Standard, June 2022 | Methods, safety, idempotency, status codes, conditional requests, fields, and representation semantics |
| [RFC 9111: HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111.html) | Internet Standard, June 2022 | Cache storage, freshness, validation, and intermediary behavior |
| [RFC 9457: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html) | Standards Track, July 2023; obsoletes RFC 7807 | Machine-readable HTTP error format and security considerations |
| [Idempotency-Key HTTP Header Field draft-07](https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/07/) | Expired Internet-Draft, expired 2026-04-18; not an Internet Standard | Informative request-key convention only; follow deployed provider contracts |
| [RateLimit header fields draft](https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/) | Active Internet-Draft, draft-11 in May 2026; not an RFC | Work-in-progress interoperable rate-limit metadata; verify implementation support |
| [OpenAPI Specification index](https://spec.openapis.org/oas/) and [3.2.0](https://spec.openapis.org/oas/v3.2.0.html) | OpenAPI Initiative; 3.2.0 published 2025-09-19 | HTTP API description; adopt only with compatible tooling |
| [GraphQL Specification, September 2025](https://spec.graphql.org/September2025/) | GraphQL Foundation released specification | Type system, execution, validation, response, and schema evolution semantics |
| [gRPC introduction](https://grpc.io/docs/what-is-grpc/introduction/) | Current official gRPC documentation | Protobuf service contracts, generated stubs, streaming, and RPC model |
| [CloudEvents specification](https://github.com/cloudevents/spec) | CNCF; current released core version 1.0.2, with work-in-progress separate | Interoperable event-envelope metadata, not delivery guarantees |
| [OWASP API Security Top 10: 2023](https://owasp.org/API-Security/editions/2023/en/0x10-api-security-risks/) | Current released OWASP API risk edition | Object/property/function authorization, resource use, SSRF, inventory, and third-party API risks |
| [RFC 9700: OAuth 2.0 Security Best Current Practice](https://www.rfc-editor.org/rfc/rfc9700.html) | BCP 240, January 2025 | Current OAuth threat mitigations, redirect, PKCE, token, and deprecated-flow guidance |
| [OpenID Connect Core 1.0 incorporating errata set 2](https://openid.net/specs/openid-connect-core-1_0-22.html) | OpenID Foundation final specification with errata | Identity layer, ID Token, claims, nonce, discovery-related protocol semantics |

The OWASP risk list prioritizes review areas; it is not a complete design or verification standard. Use the web-application-security skill for a full threat model and security control verification.
