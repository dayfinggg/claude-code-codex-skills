---
name: api-design
description: Design, implement, review, document, test, and evolve durable APIs and integration contracts. Use for HTTP or REST APIs, OpenAPI, GraphQL, gRPC, RPC, webhooks, asynchronous jobs, events, pagination, filtering, errors, authentication, authorization, idempotency, retries, caching, rate limits, compatibility, versioning, and API lifecycle work.
---

# API Design

## Operating contract

Design from consumer outcomes and domain semantics, then choose a protocol. Preserve the repository's established contract style unless evidence justifies change. Treat schemas, status behavior, authorization, idempotency, errors, events, and operational limits as part of the API—not implementation detail.

Inspect the implemented handlers, callers, schemas, generated code, gateway, authentication, documentation, tests, telemetry, and supported tool versions before editing a contract. Distinguish observed consumer behavior from assumptions. Never infer compatibility from a specification file alone.

Read [http-contracts.md](references/http-contracts.md) for HTTP, collection, concurrency, caching, and error details. Read [async-and-protocols.md](references/async-and-protocols.md) for jobs, webhooks, events, OpenAPI, GraphQL, and gRPC. Consult [sources.md](references/sources.md) for the exact standards status and version-sensitive claims.

## Choose the interaction style

Use the smallest style that fits the interaction:

| Style | Prefer when | Do not ignore |
| --- | --- | --- |
| HTTP resources with OpenAPI | Broad interoperability, request/response workflows, web and partner APIs | HTTP semantics, caching, compatibility, generated-client behavior |
| GraphQL | Clients need consumer-selected views over a connected domain graph | Resolver authorization, query cost, nullability, cache strategy, schema evolution |
| gRPC | Controlled typed clients, low-latency service calls, or streaming justify protobuf and HTTP/2 tooling | Browser/proxy support, deadlines, status mapping, schema compatibility |
| Webhooks | A provider must push changes to a consumer-controlled endpoint | Signing, replay defense, delivery retries, deduplication, endpoint abuse |
| Events | Independent consumers need facts, fan-out, replay, or temporal decoupling | Ownership, delivery semantics, ordering, schema evolution, observability |
| Asynchronous jobs | Work cannot reliably finish within a request budget | Status resource, cancellation, retention, idempotency, progress semantics |

Do not layer GraphQL, REST, gRPC, and events over the same capability without an explicit consumer or operational need.

## Run a contract-first workflow

1. Identify consumers, actors, trust boundaries, use cases, frequency, payload shape, latency, availability, and lifecycle needs.
2. Define domain operations, resources, identities, invariants, side effects, and authorization decisions independent of transport.
3. Select the protocol and interaction pattern. Model success, empty, invalid, unauthorized, forbidden, conflict, overload, timeout, dependency failure, and partial-progress outcomes.
4. Specify request, response, error, event, and webhook schemas before implementation. Define limits, defaulting, optionality, nullability, units, time zones, precision, and unknown-field behavior.
5. Define concurrency, idempotency, retry, caching, rate-limit, and ordering semantics.
6. Review compatibility against known consumers and stored messages. Use schema diff and generated-client review where applicable.
7. Implement authorization and validation at the owning boundary, not only in clients or gateways.
8. Verify examples, contract tests, negative paths, observability, rollout, deprecation, and rollback.

## Model HTTP semantics deliberately

- Use nouns for resources and stable identifiers in paths. Use a subordinate action only when no resource-state transition expresses the domain operation clearly.
- Respect method semantics. Keep safe methods free of requested state change, and make idempotent methods produce the same intended effect across duplicate requests.
- Select status codes for the actual protocol result. Do not return `200` with an error envelope or use `500` for client validation failures.
- Use `201 Created` and a `Location` header when a new resource has been created and can be identified. Use `202 Accepted` only when processing has not completed and expose how to observe it.
- Define `PUT` as replacement only when that contract is intended. Use `PATCH` with a documented patch media type and explicit absent/null/delete semantics.
- Keep identifiers opaque to clients. Do not embed authorization, tenant trust, mutable routing, or sensitive information in guessable identifiers.
- Specify URI, header, body, media type, content negotiation, and size limits. Treat header names as case-insensitive and do not invent transport behavior that intermediaries can break.

## Design precise representations

- Give fields one meaning. Distinguish omitted, null, empty, zero, false, and unknown where the domain distinguishes them.
- Use bounded, documented types and formats. Specify units, currency, decimal precision, Unicode normalization when relevant, time zone, calendar, and timestamp precision.
- Return stable machine identifiers in addition to localized display text. Never require clients to parse prose.
- Accept unknown fields only when the serialization and compatibility strategy supports them; reject ambiguous or security-sensitive input.
- Avoid mirroring database rows. Expose the consumer contract and protect internal columns, joins, and storage migrations.
- Keep examples valid against the schema and include realistic edge cases without secrets or personal data.

## Standardize failures

For HTTP APIs, prefer RFC 9457 Problem Details with `application/problem+json` unless an existing contract must be preserved. Define stable problem `type` identifiers, correct HTTP `status`, concise `title`, occurrence-specific `detail`, optional `instance`, and namespaced extensions.

Do not expose stack traces, query text, credentials, internal hostnames, authorization reasoning, or sensitive record existence. Give operators a safe correlation identifier while returning consumers enough structured information to recover. Document which errors are retryable and under what condition; never make clients infer it from message text.

## Design collections as contracts

- Use cursor pagination for large or mutating collections. Make cursors opaque, integrity-protected when needed, scoped to the query, and backed by a deterministic order with a unique tie-breaker.
- Use offset pagination only when bounded size, stable snapshots, random-page access, or administrative simplicity justifies its drift and cost.
- Bound page size and query complexity. Define first/last-page, empty, deleted-item, expired-cursor, and concurrent-insert behavior.
- Allow only documented filters and sort keys. Define operators, combination rules, case and locale behavior, null ordering, defaults, and indexes or resource budgets.
- Keep collection totals optional when computing an exact count is expensive or misleading under concurrent change.

## Control concurrency, duplication, and retries

- Use a version, ETag, or other compare-and-swap token for lost-update-sensitive changes. Require `If-Match` where appropriate and return the correct precondition failure rather than silently overwriting.
- Derive idempotency from a domain operation identifier when possible. For create or command APIs that need a request key, scope it to the actor and operation, bind it to a request fingerprint, store the atomic outcome, define expiry, and reject key reuse with a different request.
- Do not call `Idempotency-Key` an Internet Standard. It remains an IETF draft as of the source review date; follow the deployed provider or framework contract explicitly.
- Retry only safe or idempotent operations and only for transient failures. Bound attempts and elapsed time, use exponential backoff with jitter, honor applicable `Retry-After`, and prevent layered retry multiplication.
- Propagate deadlines and cancellation where supported. Make ambiguous completion observable through status lookup or idempotent reconciliation.

## Enforce identity and access at every boundary

- Separate authentication from authorization. Validate issuer, audience, signature, time, nonce, and transport according to the selected protocol and library.
- Authorize the operation, object, field, and tenant on every request. Use the authenticated context as tenant authority; never trust a tenant ID merely because it appears in the path or body.
- Apply object-level and property-level checks after resolving the target and before disclosing data or existence.
- Avoid bearer tokens in URLs. Minimize token scope and lifetime, rotate credentials, and use sender-constrained tokens when the threat model warrants them.
- Treat OAuth and OpenID Connect as security protocols with exact redirect, PKCE, state/nonce, discovery, and token-validation requirements. Use maintained libraries and current profiles rather than hand-written flows.

## Validate requests and responses

Validate structural shape, semantic constraints, authorization context, cross-field rules, referential integrity, and bounded work at the first trusted owner. Normalize only once and only where canonicalization is defined. Reject ambiguous duplicate parameters and unexpected content types.

Validate server responses against the contract in tests or at safe boundaries. Prevent partial objects, undocumented nulls, internal fields, and sensitive errors from escaping. Keep client validation for usability, never as the security boundary.

## Design asynchronous integrations

- For jobs, return a stable job resource with state, timestamps, progress semantics, result or result link, structured failure, cancellation behavior, retention, and expiry.
- For webhooks, authenticate the sender with a versioned signature over the exact raw payload plus a freshness value; support key rotation, replay defense, constant-time comparison, retries, deduplication, and safe secret storage.
- Protect outbound webhook and callback delivery against SSRF. Validate scheme, destination, DNS/IP resolution, redirects, ports, egress policy, and payload limits.
- Name events as facts that already occurred. Define producer ownership, subject identity, occurrence time versus publication time, immutable meaning, schema version, ordering scope, delivery guarantee, and replay behavior.
- Assume at-least-once delivery unless the actual transport and end-to-end design prove otherwise. Make consumers idempotent and surface lag, failures, and dead letters.

## Cache and limit work safely

Define cacheability instead of relying on defaults. Set appropriate `Cache-Control`, validators such as ETag, and `Vary`; prevent shared caching of personalized or tenant data. Use `no-store` when storage itself is unsafe, not as a substitute for access control. Define invalidation and stale behavior.

Treat rate limits as product quotas and abuse controls, not authentication. Scope limits to relevant actors, tenants, resources, operations, or cost. Return `429 Too Many Requests` and applicable `Retry-After` semantics. Current RateLimit header work remains an IETF draft; verify deployed gateway and client support before adopting it.

Bound batch size, query depth, payload bytes, decompression, fan-out, work duration, concurrent jobs, and expensive filters. Fail predictably before exhausting shared resources.

## Evolve and retire contracts

- Prefer additive changes with stable meanings. Adding a required request field, narrowing accepted values, changing default ordering, making a nullable response non-null without proof, or reinterpreting a field can be breaking.
- Evaluate generated code and actual consumers; source, wire, behavioral, and operational compatibility differ.
- Version only when a breaking semantic change cannot be staged compatibly. Keep versions meaningful and avoid per-endpoint version sprawl.
- Publish deprecation and sunset policy, replacement path, dates, ownership, and usage telemetry. Do not remove a contract based only on documentation age.
- Reserve deleted protobuf field numbers and names. Deprecate GraphQL fields before removal and assess nullability and enum changes carefully.
- For stored events, support old schema instances for their retention or replay lifetime.

## Verify the lifecycle

Run specification validation, schema compatibility checks, generated-client compilation, provider and consumer contract tests, authorization matrix tests, fuzz or property tests for parsers when justified, retry/idempotency/concurrency tests, and load/resource-limit tests proportionate to risk.

Instrument operation identity, status class, latency, error type, saturation, retries, throttles, and async lag without logging credentials or sensitive payloads. Define SLOs for consumer-visible outcomes. Stage rollout, observe old and new consumer behavior, and retain a rollback path compatible with data and messages already emitted.

## Reject common failure modes

- Do not expose storage models as public contracts.
- Do not use `POST` for every operation or status `200` for every result.
- Do not make error prose, undocumented headers, or timing the only recovery contract.
- Do not accept an idempotency key without atomic persistence and request binding.
- Do not confuse CORS, API keys, gateway routing, or rate limiting with object authorization.
- Do not claim exactly-once delivery without an end-to-end proof and reconciliation story.
- Do not publish a specification that examples, implementation, gateway, and generated clients contradict.
- Do not adopt the newest specification version until the repository's generators, validators, gateways, and consumers support it.
