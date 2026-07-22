---
name: api-design
description: Design or change externally consumed HTTP, GraphQL, RPC, webhook, event, or job contracts. Use when public request, validation, authorization-visible response, error, compatibility, delivery, or lifecycle semantics change; not for internal functions without an external contract.
---

# API Design

## Establish the contract

Design from consumer outcomes and domain invariants, then select a protocol. Treat schemas, authorization decisions, status and error behavior, concurrency, delivery guarantees, limits, and compatibility as contract surface rather than implementation detail.

Inspect the implemented handlers and callers, specifications, generated clients, gateway behavior, tests, telemetry, and deployment configuration. Identify the exact OpenAPI, GraphQL, protobuf, framework, generator, gateway, and validator versions before relying on version-sensitive syntax or semantics. Confirm behavior from implementation and consumer evidence; a specification alone is not proof.

Define consumers, actors, trust boundaries, identities, operations, side effects, latency budget, and lifecycle. Specify success, empty, validation, authentication, authorization, conflict, overload, timeout, dependency failure, cancellation, and partial-progress outcomes. Record field optionality, nullability, units, precision, time zones, unknown-field behavior, payload limits, and defaulting.

## Choose and shape the protocol

- Prefer HTTP resources for interoperable request/response workflows; respect method safety and idempotency, status semantics, caching, content negotiation, and intermediary behavior.
- Use GraphQL when consumer-selected views over a connected graph justify resolver authorization, query-cost controls, nullability rules, and schema evolution.
- Use gRPC for controlled typed clients or streaming when protobuf compatibility, deadlines, status mapping, proxy support, and generated-client behavior are understood.
- Use webhooks or events for push, fan-out, replay, or temporal decoupling. Define producer ownership, signature verification, replay defense, delivery, ordering scope, deduplication, retention, and schema evolution.
- Use asynchronous jobs when work cannot complete within the request budget. Expose a stable status resource, cancellation, progress, result or failure, retention, and expiry.

For HTTP details, read [HTTP contracts](references/http-contracts.md). For jobs, webhooks, events, OpenAPI, GraphQL, and gRPC, read [async and protocols](references/async-and-protocols.md). Verify standards status and installed-tool support with [authoritative sources](references/sources.md).

## Preserve precise semantics

Use stable opaque identifiers and consumer-oriented representations rather than database rows. Give each field one meaning and distinguish omitted, null, empty, zero, false, and unknown where the domain does. Return stable machine identifiers; never require clients to parse prose.

For HTTP failures, prefer RFC 9457 Problem Details when compatible with the existing contract. Keep retryability machine-readable and do not expose stacks, queries, credentials, internal hosts, or protected record existence. Give operators a safe correlation identifier.

For collections, define filters, sorts, cost limits, deterministic ordering, and concurrent-change behavior. Prefer opaque cursor pagination for large or mutating sets, backed by a unique tie-breaker; define expired-cursor and deleted-item behavior. Use offset pagination only when its drift and cost are acceptable.

## Define concurrency and failure behavior

Prevent lost updates with a version, ETag, or compare-and-swap token when required. For idempotent commands, scope the operation key to actor and operation, bind it to a request fingerprint, atomically store the outcome, define expiry, and reject reuse with different input.

Retry only safe or proven-idempotent operations for classified transient failures. Bound attempts and elapsed time, use backoff with jitter, honor applicable server guidance, and prevent layered retry multiplication. Propagate deadlines and cancellation. Make unknown completion observable through status lookup or reconciliation.

Assume asynchronous delivery can duplicate, reorder, delay, and partially fail unless an end-to-end guarantee proves otherwise. Make consumers idempotent, define dead-letter and replay behavior, and never claim exactly-once delivery without proof.

Authenticate and authorize at the owning server boundary for operation, object, field, and tenant. Validate structure, cross-field semantics, bounded work, and content type there. Protect outbound callbacks from unsafe destinations and never treat CORS, an API key, a gateway, or rate limiting as object authorization.

## Evolve and validate

Prefer additive evolution with stable meanings. Check wire, source, behavioral, generated-client, and operational compatibility against real consumers and retained messages. Version only when a breaking semantic change cannot be staged; define deprecation dates, replacement, usage telemetry, and removal ownership.

Run project-native specification validation, schema compatibility checks, generated-client compilation, provider and consumer contract tests, authorization negatives, and focused idempotency, retry, concurrency, and resource-limit tests. Stage risky contract changes with compatible rollout and rollback, and report exact versions, evidence, consumers checked, and residual gaps.
