# Forms, Data, Mutations, and Error Recovery

## Forms

- Start with native `<form>`, `<label>`, `<button>`, `<input>`, `<select>`, and `<textarea>` semantics. Keep submission possible by keyboard and avoid click-only containers.
- Give every control an accessible name, correct input type and autocomplete token, and persistent instructions where the format is not obvious.
- Choose one ownership mode per field. Use controlled values for immediate dependent UI or coordinated validation; use `FormData` and uncontrolled controls when native form ownership is sufficient.
- Validate on blur/change only when it helps the user, and validate again at the authoritative server boundary. Preserve submitted values after a recoverable failure.
- Associate field errors programmatically, focus or summarize errors deliberately after submission, and announce asynchronous status without stealing focus.
- Prevent duplicate destructive submissions, but preserve progressive enhancement and keyboard semantics. Model pending, success, field failure, form failure, and unexpected failure separately.

Use React form Actions, `useActionState`, `useFormStatus`, or `useOptimistic` only when the installed React renderer/framework supports their exact contract. Keep optimistic state reversible, reconcile the authoritative response, and expose failure recovery.

## Data reads

Use this priority order:

1. Framework loader, Server Component, or route data boundary.
2. Existing query/cache library already configured in the repository.
3. A narrow external-store adapter or event-driven fetch for client-only needs.
4. A direct Effect only when synchronization with an external data source truly begins and ends with component lifetime.

For every read path:

- Validate and normalize untrusted responses before rendering or storing them.
- Define freshness, deduplication, cache scope, cache key, invalidation, authorization scope, and error behavior.
- Start independent requests together and avoid client-server waterfalls. Keep dependent requests sequential when the dependency is real.
- Propagate cancellation and timeouts. Ensure an obsolete response cannot replace newer data.
- Retry only transient idempotent work with bounded attempts, backoff and jitter, and visible terminal failure.
- Keep sensitive or user-specific results out of shared caches unless the key and storage boundary enforce isolation.

Do not copy query results into local state unless creating an intentional editable snapshot. Do not use Suspense with a source that does not publish a supported Suspense contract.

## Mutations and optimistic UI

- Authenticate, authorize, validate, and enforce ownership at the server operation; hidden buttons and client state are not controls.
- Make repeated submissions safe through idempotency, optimistic concurrency, or explicit conflict handling when the operation can be retried or duplicated.
- Invalidate or update every affected cache deliberately. Prefer read-your-writes behavior for user edits and stale-while-revalidate only where stale content is acceptable.
- Apply optimistic changes from the user intent, retain enough information to roll back, and reconcile server-generated IDs, timestamps, permissions, and normalization.
- Distinguish validation errors from conflicts, rate limits, dependency outages, and unknown failures so the UI offers the right recovery.

## Error boundaries and recovery

- Use an error boundary around a route, major panel, plugin, or risky widget when that scope can present useful fallback and retry behavior.
- Remember that a React error boundary catches descendant render/lifecycle errors, not its own errors, event-handler exceptions, arbitrary asynchronous callback errors, or all server-rendering errors.
- Handle expected failures as typed state/results near the boundary that can recover. Reserve thrown errors for exceptional rendering or framework flows according to local conventions.
- Preserve error causes for diagnostics, attach route/request/action context, redact secrets and personal data, and never expose internal stack traces to users.
- Make retry re-run the failing operation and reset only the necessary state. Avoid infinite automatic retry loops.
- Test both the fallback and recovery path; ensure fallback UI is accessible and usable without relying on the failed subtree.
