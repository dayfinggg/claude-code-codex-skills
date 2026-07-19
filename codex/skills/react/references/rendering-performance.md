# Rendering, Concurrency, Performance, and Server Interoperability

## Rendering model

- Treat each render as a snapshot. State setters request a future render; they do not mutate the current snapshot.
- Keep component and Hook bodies pure because React may render without committing, restart work, or invoke development checks more than once.
- Keep DOM reads and writes in event handlers, layout Effects, or framework lifecycle boundaries. Never mutate nodes owned by React behind its back.
- Preserve deterministic server/client markup: normalize locale, timezone, random values, dates, feature flags, and browser-only state before the shared first render.

## Transitions and Suspense

- Keep direct input, focus, selection, and drag feedback urgent. Wrap only non-urgent state updates in a transition.
- Show pending feedback that preserves the previous useful UI rather than replacing the whole screen with a spinner.
- Use `useDeferredValue` when a slow consumer may lag behind an urgent value; do not use it as debouncing or network cancellation.
- Place Suspense boundaries around meaningful independent regions. Avoid one root boundary that blanks the application and avoid dozens of flickering micro-boundaries.
- Use Suspense only with a framework or data source that documents integration. Throwing ad hoc promises is not a stable application data API.
- Pair streamed regions with useful skeletons sized to avoid layout shifts and with error recovery at the same or a nearby ownership boundary.

## Performance workflow

1. Define the failing metric or interaction: input latency, render duration, commits, LCP, INP, CLS, memory, network transfer, hydration, or server render time.
2. Reproduce with a production build and realistic data/device conditions.
3. Use React DevTools Profiler or React Performance tracks plus the browser Performance and Network panels to identify the expensive path.
4. Fix data waterfalls, excessive client JavaScript, algorithmic work, unstable identities, broad context updates, or unnecessary rendering before micro-optimizing.
5. Measure again and keep the optimization only when the intended metric improves without breaking behavior.

Prefer local state, component composition, list virtualization/pagination, route or component code splitting, and moving non-interactive work off the client before manual memoization. Use `memo`, `useMemo`, and `useCallback` only when a measured expensive child or required stable identity benefits. They are performance hints, not correctness tools.

When React Compiler is configured:

- Preserve the repository's compiler target, gating, lint rules, and incremental-adoption strategy.
- Fix Rules of React violations rather than adding manual memoization around impure code.
- Do not delete existing memoization blindly; use compiler diagnostics and performance evidence.
- Keep library compilation and consumer React-version compatibility explicit.

## SSR and hydration

- Let an SSR framework own root creation, streaming, asset injection, abort behavior, and hydration unless implementing framework infrastructure.
- Use `hydrateRoot` only for server-generated matching HTML; use `createRoot` for client-only roots.
- Use `useId` for deterministic accessibility IDs, not list keys.
- Investigate hydration mismatches for invalid HTML nesting, environment branches, locale/time differences, extension/CDN rewriting, mutable external data, or differing initial cache snapshots.
- Use an escape such as hydration-warning suppression only for a known unavoidable single-node difference and document the invariant in code if the repository permits comments.
- Abort or time out streaming renders, log server errors without leaking private data, and provide shell plus late-boundary recovery.

## React Server Components

- Treat RSC as a framework capability. React's component programming model may be stable while the bundler/framework integration APIs remain version-sensitive.
- Keep server-only dependencies, database clients, filesystem access, credentials, and private environment values in the server graph.
- Add a client boundary only for state, Effects, event handlers, browser APIs, or client-only libraries. Everything imported below that boundary can enter the client bundle.
- Pass only serializable, minimal public values across the boundary. Never pass an entire database or session record for convenience.
- Use request memoization and persistent caching according to the framework; do not assume `React.cache` persists between requests.
- Audit installed `react-server-dom-*` packages and framework advisories before production upgrades because RSC protocol vulnerabilities have required patch releases.

When implementing SSR infrastructure directly, prefer React DOM's Node stream APIs in Node and Web Stream APIs only in compatible runtimes. Verify the installed version because resume, prerender, and partial-prerender APIs differ across releases.
