# Async and protocol guide

## Asynchronous job resource

Model a job as a first-class resource when work outlives the request:

- Return `202 Accepted` with the job URI.
- Expose stable states such as queued, running, succeeded, failed, cancellation-requested, cancelled, and expired; define terminal states explicitly.
- Include creation, start, update, and completion times where useful.
- Define whether progress is exact, approximate, phase-based, or unavailable.
- Link to the result rather than duplicating a large or separately authorized resource.
- Return structured terminal failure that does not leak internals.
- Define polling guidance, cache behavior, push notification option, retention, expiry, authorization, and deletion.
- Make submission idempotent when duplicate work would be harmful.
- Define cancellation as a request with race behavior, not an impossible guarantee.

## Webhook contract

- Sign the exact raw bytes with an algorithm identifier, key identifier, and timestamp or nonce.
- Compare signatures in constant time after selecting the correct key.
- Enforce an acceptable clock window and store event identifiers to reject replay.
- Rotate keys with an overlap period and explicit revocation.
- Deliver a stable event identifier and schema version; require idempotent consumer handling.
- Document retry schedule, timeout, success statuses, maximum attempts, disablement, replay, and ordering.
- Bound payload and response sizes. Do not follow arbitrary redirects or fetch consumer-provided URLs without SSRF controls.
- Provide a safe test and redelivery mechanism with the same signing behavior as production.

## Event contract

Define:

- producer and schema owner;
- past-tense event type and immutable business meaning;
- event ID, subject ID, occurrence time, publication time, and correlation or causation identifiers;
- partition and ordering scope;
- delivery and retry expectations;
- additive schema evolution and unknown-field behavior;
- retention, replay window, deletion/privacy obligations, and backfill policy;
- consumer idempotency, dead-letter ownership, lag and failure telemetry.

Use CloudEvents when interoperable envelope metadata helps, but do not mistake the envelope for domain schema or delivery guarantees.

## OpenAPI

- Use the newest OpenAPI version fully supported by the repository's validator, generator, gateway, documentation renderer, and clients—not merely the newest published version.
- Keep reusable schemas semantically coherent; avoid inheritance tricks that generators interpret inconsistently.
- Specify security requirements, content types, constraints, examples, errors, callbacks or webhooks, and operation identifiers.
- Test examples and generated clients. Diff the bundled or resolved document, not only handwritten fragments.
- Treat vendor extensions as part of the toolchain contract and document ownership.

OpenAPI 3.2.0 is published, but ecosystem support may lag; verify before upgrading.

## GraphQL

- Design around a coherent domain graph and consumer use cases, not a one-to-one database mirror.
- Authorize every resolver path and field that can expose protected data; parent authorization does not automatically protect children.
- Bound query depth, breadth, aliases, fragments, pagination, and resolver cost. Batch and cache data access without crossing tenant or authorization boundaries.
- Use connections or another explicit pagination contract for large collections.
- Treat changing nullable to non-null, adding enum values to exhaustively matched clients, and input changes as compatibility-sensitive.
- Deprecate with a reason and usage telemetry before removal.
- Define partial-data and error semantics deliberately; test clients against null propagation.

## gRPC and protobuf

- Set and propagate deadlines; distinguish cancellation, retryable status, and ambiguous completion.
- Define retry policy only for semantically idempotent operations and coordinate it with service-side protection.
- Preserve protobuf field numbers and wire types. Reserve removed names and numbers; do not reuse them.
- Prefer additive fields and tolerant readers. Review presence semantics, defaults, `oneof`, enum evolution, and unknown fields across actual language runtimes.
- Use streaming only when flow control, backpressure, connection lifetime, and intermediary support are understood.
- Map identity, authorization, audit, and error details consistently through interceptors and owning handlers.
- Run compatibility checks and compile representative generated clients for supported languages.
