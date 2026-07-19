# HTTP contract guide

## Method and status review

| Concern | Contract guidance |
| --- | --- |
| `GET` / `HEAD` | Keep safe: the client requests no state change. Incidental logging or metering must not change resource semantics. |
| `PUT` / `DELETE` | Make the intended effect idempotent even if each attempt produces audit or operational side effects. |
| `POST` | Use for non-idempotent processing, subordinate creation, or commands; add a domain operation ID or request-key contract when duplicates are harmful. |
| `PATCH` | Name the patch media type and define omitted, null, replace, add, and remove behavior. |
| `201` | Return when creation completed; provide `Location` for the new resource when applicable. |
| `202` | Return only when work is accepted but incomplete; expose a status resource or equivalent monitoring contract. |
| `204` | Return no representation; do not accidentally serialize a body. |
| `400` / `422` | Follow the established contract and document the distinction; do not alternate unpredictably for the same validation class. |
| `401` / `403` | Use authentication challenge semantics for `401`; use `403` for authenticated-but-not-allowed when disclosure policy permits. |
| `404` | Use for absent resources and, where policy requires, to avoid revealing existence; keep authorization enforcement unchanged. |
| `409` | Use for a conflict with current resource state when precondition semantics do not better express it. |
| `412` | Use when a request precondition such as `If-Match` evaluates false. |
| `429` | Use for rate limiting and include useful retry semantics when known. |

Verify nuanced status behavior against RFC 9110 and the existing API contract.

## Problem Details shape

Use the RFC 9457 members with stable semantics:

```json
{
  "type": "https://api.example.test/problems/credit-limit-exceeded",
  "title": "Credit limit exceeded",
  "status": 409,
  "detail": "The requested authorization exceeds the available limit.",
  "instance": "https://api.example.test/problem-instances/01J...",
  "request_id": "req_01J..."
}
```

- Make `type` a stable identifier whose documentation can evolve without changing its meaning. Prefer an absolute URI.
- Keep `title` stable for that type and `detail` specific to this occurrence.
- Match `status` to the HTTP response status; it does not replace the actual status line.
- Namespace extensions carefully and document their types, optionality, and privacy.
- Use a safe opaque correlation identifier. Do not expose internal exception, stack, SQL, hostname, token, or authorization details.

## Cursor contract

Define:

- the stable sort tuple, including a unique tie-breaker;
- forward and, if supported, backward navigation semantics;
- whether the cursor represents a position, snapshot, or query state;
- query parameters and authorization context bound into the cursor;
- expiration and response when the cursor is invalid or expired;
- maximum and default page sizes;
- behavior when records are inserted, updated, or deleted between requests;
- whether exact totals are omitted, estimated, or separately computed.

Encode cursors opaquely and integrity-protect client-controlled state when tampering would alter scope or cost. Never use opacity as authorization.

## Optimistic concurrency

1. Return a representation validator such as a strong ETag for the version clients edit.
2. Require `If-Match` on a mutation where lost updates matter.
3. Evaluate the precondition atomically with the write.
4. Return `412 Precondition Failed` when the supplied version is stale.
5. Return the current version or a safe refetch path so the client can reconcile.

Do not calculate a validator from a representation that omits fields relevant to the mutation unless the version changes whenever those fields do.

## Request-key idempotency

Persist the following atomically at the operation owner:

- actor or tenant scope;
- operation or route scope;
- key;
- canonical request fingerprint;
- in-progress or terminal state;
- status, response body, and relevant headers for completed work;
- creation and expiration timestamps.

On a duplicate with the same fingerprint, return or await the original outcome according to the documented contract. Reject a reused key with a different fingerprint. Define behavior when the first attempt is still running or failed ambiguously. Keep retention long enough for the client retry window and short enough for policy and storage bounds.

## Caching review

- Decide whether a response may be stored by browsers, private caches, shared intermediaries, or none.
- Set `Cache-Control` explicitly for sensitive or expensive endpoints.
- Include every representation-varying request header in `Vary` without creating unbounded cache-key cardinality.
- Use ETag or Last-Modified only with correct validation semantics.
- Ensure authenticated, personalized, and tenant responses cannot cross identities in a shared cache.
- Define stale-while-revalidate or stale-if-error only when stale data is acceptable.
- Test invalidation and authorization behavior through the actual CDN, gateway, or framework.
