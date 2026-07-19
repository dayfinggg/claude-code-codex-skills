# Fixtures, contracts, and workflows

## Build deterministic fixtures

- Create the minimum valid object through builders or factories; override only fields relevant to the scenario.
- Generate unique namespaces from the worker and test identity for database rows, tenants, queues, files, buckets, and accounts. For TCP/UDP ports, bind port `0` and retain the listener or use an atomic allocator; use isolated per-worker networks when a fixed port is unavoidable.
- Prefer transactional rollback only when the application and test use the same database visibility model. Otherwise create isolated state and delete by exact namespace.
- Make cleanup idempotent and run it after failure. Never use broad deletion against an unverified target.
- Freeze or inject a clock; set timezone and locale explicitly; seed randomness and print the seed on failure.
- Use controlled barriers, latches, fake schedulers, or deterministic hooks for races. Repeating a race many times can complement but not replace control.
- Version canonical fixtures with their schema and keep legacy fixtures for supported migration paths. Avoid giant shared fixture graphs.

## Choose real dependencies and doubles intentionally

| Choice | Use when | Required discipline |
| --- | --- | --- |
| Pure fake | Semantics are simple, owned, and deliberately modeled | Document deviations; do not treat it as dependency compatibility |
| Stub | A boundary response or failure must be controlled | Assert the system outcome, not only the stub call |
| Mock/spy | The interaction itself is a stable contract | Keep expectations minimal and independent of internal call order |
| Emulator | Provider behavior is sufficiently faithful for the risk | Track unsupported features and add provider-level evidence |
| Real local dependency | Database, broker, cache, filesystem, or protocol semantics matter | Pin version, isolate state, await readiness, capture logs, clean up |
| Shared sandbox | External service cannot run locally | Namespace data, bound rate, handle instability, protect credentials |

- Match production topology when the feature depends on topology: replica set, sharding, transaction support, broker partitions, object-store consistency, or TLS/authentication.
- Do not mock owned code merely to bypass difficult design. Improve seams at true external boundaries.

## Verify API and event contracts

- Validate consumer requests and provider responses against the exact OpenAPI, GraphQL schema, JSON Schema, protobuf, AsyncAPI, or repository-owned contract version.
- Cover content type, status, headers, authentication, required/optional/null fields, formats, enums, unknown fields, defaults, error shape, pagination, ordering, and deprecation.
- Check backward and forward compatibility for every concurrently deployed producer and consumer. Include old producer/new consumer and new producer/old consumer when rollout allows both.
- For consumer-driven contracts, express only behavior the consumer needs; publish immutable versions and verify the provider before deployment.
- Test semantic constraints that a schema cannot express. A schema-valid payload can still violate authorization or business invariants.

## Exercise full request and message workflows

### HTTP or RPC

- Test authentication, authorization, validation, conflict, not-found, rate limit, cancellation, timeout, retry, idempotency, partial response, and stable error mapping.
- Test duplicate submission and an unknown outcome after the server may have committed.
- Verify database state and emitted side effects, not merely the response.

### Database

- Test constraints, isolation assumptions, transactions, rollback, concurrent updates, pagination stability, collation/timezone, migrations, and pool exhaustion.
- Run against the relevant engine/version; an in-memory substitute rarely proves SQL, document, or distributed semantics.

### Messages and jobs

- Test duplicate, out-of-order, delayed, missing, malformed, and poison messages; retry exhaustion; dead-lettering; restart; replay; checkpoint; and idempotent side effects.
- Assert acknowledgement or checkpoint order relative to durable work.

### Browser and UI

- Start from a public route or user-visible state. Interact by accessible role/name and await visible outcomes or known network state.
- Test loading, empty, error, success, optimistic update and rollback, double click, navigation, refresh, session expiry, focus, keyboard, responsive layout, and meaningful browser differences.
- Keep setup through APIs or fixtures when the setup itself is not under test; retain the user interface for the journey being verified.

## Test dangerous temporal assumptions

- Boundary instants: exactly before, at, and after expiry or cutoff.
- Calendar behavior: timezone conversion, DST gap and fold, month/year end, leap day, locale formatting.
- Async behavior: cancellation before dispatch, during work, and after commit; late responses; reordered events; retry overlap.
- Distributed behavior: stale reads, clock skew, split result, duplicate delivery, leader change, and unknown commit outcome.
