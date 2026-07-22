# Standards, runtime, and async behavior

## Build a target matrix before using a feature

Record these independently:

- ECMAScript syntax and built-in semantics implemented by the target engine.
- Host APIs supplied by browser, Node.js, worker, edge runtime, Electron, or test environment.
- Transpiler syntax transforms and their semantic limits.
- Polyfills or ponyfills and whether they affect globals.
- Type-library declarations, which can describe APIs that the runtime does not provide.
- Bundler module resolution, tree-shaking, code splitting, and side-effect assumptions.

Treat ECMA-262 and WHATWG documents as normative behavior, TC39 proposal pages as maturity/history evidence, MDN as practical compatibility guidance, and the project's runtime matrix as deployment truth.

## Keep module boundaries executable

- Match ESM/CJS and file extensions to the actual runtime, `package.json`, bundler, and test runner. A transpiler-resolved import is not necessarily runtime-resolvable.
- Keep shared/browser modules free of Node-only APIs and secrets. Keep server modules out of client graphs through explicit entrypoints and existing server-only guards.
- Avoid top-level network, timer, listener, storage, or mutable-singleton side effects in reusable modules.
- Test package exports and imports through the same public entrypoint and module formats consumers use.

## Compose promises and cancellation

- `Promise.all()` rejects when an input rejects but does not stop other work. Cancel remaining operations explicitly or tolerate and observe their completion.
- Forward a caller's signal through every supporting boundary. Do not replace it with a private timeout signal that prevents upstream cancellation.
- Use `AbortSignal.any()` or `AbortSignal.timeout()` only when all targets support them or the project supplies a tested equivalent. Preserve the reason if callers distinguish timeout, shutdown, and user cancellation.
- Treat abort as an expected control path where appropriate; still release resources and avoid logging it as an unexplained server fault.
- Give all external work a total deadline. A socket or fetch timeout alone may not bound queueing, retries, parsing, and cleanup.

## Bound concurrency and queues

- Do not start unbounded work with `array.map(async ...)`, event callbacks, or recursive scheduling. Use an existing limiter, pool, iterator, or queue.
- Choose fail-fast, collect-all, sequential, bounded-parallel, or race semantics from the domain and side effects.
- Make retry budgets part of the total deadline. Retry only classified transient failures and idempotent or deduplicated work.
- Apply backpressure from streams, queues, sockets, and consumers rather than buffering an unbounded payload.

## Respect event-loop and stream semantics

- Distinguish task/macrotask scheduling, microtasks, rendering opportunities, and runtime-specific next-tick queues only when order matters; test the exact host instead of assuming universal ordering.
- Use standard stream readers/writers or project adapters and propagate cancellation/error in both directions.
- Set size, time, and nesting limits before parsing or buffering untrusted data. Streaming does not remove decompression bombs, oversized fields, or slow-consumer risk.
- Close readers, writers, subscriptions, observers, ports, sockets, and timers through explicit lifecycle cleanup.

## Keep browser security at the boundary

- Prefer text and DOM construction APIs over HTML parsing. Sanitize unavoidable HTML with the project's vetted policy and test dangerous URL, event-handler, SVG, and encoding cases.
- Validate schemes and origins before navigation, redirects, fetches, workers, frames, or resource loading. Treat CORS as a browser read policy, not authorization.
- Keep credentials out of shipped bundles, source maps, rendered state, browser storage, URLs, errors, and telemetry.
- Enforce authorization and validation on the server even when the browser already checks them.
