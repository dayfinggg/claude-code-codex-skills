---
name: react
description: Engineer, review, debug, secure, test, optimize, or migrate React applications and libraries in JSX or TSX, including components, Hooks, state, Effects, forms, rendering, accessibility, performance, SSR, hydration, React Server Components, and React Compiler compatibility. Use whenever behavior depends on React itself; combine with the repository's framework, TypeScript or JavaScript, styling, and test skills as applicable.
---

# React Engineering

## Work from the installed project

1. Read the nearest repository instructions and inspect `package.json`, the lockfile, workspace manifests, TypeScript and lint configuration, framework or bundler configuration, source layout, tests, and deployment target.
2. Resolve the installed versions of `react`, `react-dom`, their type packages, `eslint-plugin-react-hooks`, and React Compiler tooling from the lockfile or installed package metadata. Treat declared ranges as constraints, not proof of the resolved version. Check for duplicate React copies and mismatched renderer versions when Hooks, hydration, or context behave unexpectedly.
3. Identify the owner of rendering and data behavior: client-only React, an SSR framework, a React Server Components framework, a native renderer, or a component library. Follow that owner's version-matched contract rather than transplanting browser or framework assumptions.
4. Identify existing choices for routing, server state, forms, validation, styling, component primitives, testing, and error reporting. Do not introduce a competing library when the current stack satisfies the requirement.
5. Classify the requested change before editing: pure UI, local interaction, shared client state, external synchronization, data read, mutation, form, navigation, SSR/hydration, RSC boundary, performance, accessibility, or migration.

Read [versioning-interop.md](references/versioning-interop.md) before a migration, compiler change, framework boundary change, or version-sensitive API decision. Consult [sources.md](references/sources.md) whenever current support, security, or API status matters.

## Design the smallest coherent change

- Derive the component tree from user-visible states: success, loading, empty, partial, error, disabled, offline, and permission-denied where relevant.
- Keep each component or Hook responsible for one coherent concept. Split when responsibilities, abstraction levels, platform boundaries, ownership, or independent test needs diverge; never split only to satisfy an arbitrary line count.
- Prefer composition and explicit props. Introduce context only for truly cross-cutting values or services with a clear provider boundary. Introduce a reducer when named events and related transitions are clearer than several independent setters.
- Preserve state at the intentional identity and reset it with an intentional key or position change. Use stable data IDs for list keys; never use generated-per-render values.
- Keep transport records, validated domain data, editable form drafts, and view models distinct when their invariants differ.

Use [component-state-effects.md](references/component-state-effects.md) for detailed component, state, Hook, Effect, ref, and external-store decisions.

## Enforce React correctness

- Keep render idempotent and free of observable side effects. Treat props, state, context, Hook arguments, and JSX already created as immutable snapshots.
- Call components through JSX and Hooks only at the top level of components or custom Hooks, except for React APIs whose documented contract explicitly permits conditional use.
- Compute values during render when they are derivable. Handle user-caused work in event handlers or Actions. Use an Effect only to synchronize with a system outside React.
- Make every Effect setup independent and pair it with complete cleanup. Include every reactive dependency; restructure code instead of suppressing `exhaustive-deps`.
- Assume renders may be restarted, interrupted, batched, replayed in development, or committed later. Never depend on render count or timing for correctness.
- Keep controlled text-input updates urgent. Use transitions or deferred values for non-urgent rendering work only, and preserve visible pending feedback.
- Enable or preserve Strict Mode and the repository's React Hooks lint rules unless a documented compatibility constraint prevents it.

Use [rendering-performance.md](references/rendering-performance.md) for concurrency, Suspense, memoization, profiling, SSR, hydration, and RSC guidance.

## Handle forms, data, and failures at boundaries

- Prefer semantic HTML form behavior and progressive enhancement where the renderer supports it. Choose controlled fields for React-owned live behavior and uncontrolled fields when the DOM can own transient values safely.
- Validate for usability in the client and for trust on the authoritative server or persistence boundary. Model field, form, transport, and unexpected errors separately.
- Follow the framework or existing data library for reads, deduplication, cancellation, caching, invalidation, retries, and Suspense integration. Do not invent an Effect-based fetch layer by default.
- Abort obsolete work or ignore stale completions, bound retries and concurrency, and define cache ownership plus invalidation before adding caching.
- Place error boundaries at useful recovery scopes. Do not expect them to catch event-handler failures, arbitrary asynchronous callbacks, or every server-rendering failure.

Use [forms-data-errors.md](references/forms-data-errors.md) for detailed form, Action, optimistic UI, data fetching, error, and retry patterns.

## Preserve platform boundaries

- Keep browser-only APIs and secrets out of server/shared modules, and keep privileged server code out of client bundles. Treat every value serialized to the client as public.
- Keep server and client initial output deterministic. Fix hydration mismatches at their source; do not silence them globally or render a different first tree merely to hide the warning.
- Let the framework own RSC transport, bundling, request memoization, streaming, and Server Function endpoints. Verify serializability and module graph direction at each server/client boundary.
- Use React DOM streaming APIs only when building the renderer integration itself. Select Node streams for Node and Web Streams for compatible edge environments, following the installed React documentation.

## Meet production quality

- Build semantic, keyboard-operable UI with visible focus, correct names and labels, deliberate focus movement, announced status/error changes, sufficient contrast, reduced-motion support, and touch targets appropriate to the product standard.
- Never render unsanitized HTML. Validate navigation URLs, keep secrets and authorization on the server, and treat Server Functions and public endpoints as hostile-input boundaries.
- Measure before optimizing. Profile the real interaction and build, then address the largest render, network, bundle, layout, or algorithmic cost. Do not add blanket `memo`, `useMemo`, or `useCallback`.
- Test observable behavior through the same roles, labels, text, and interactions a user uses. Add integration or browser coverage for hydration, routing, RSC, forms, focus, and critical workflows that component tests cannot prove.
- Include rejected input, error, retry, cancellation, empty, slow, and accessibility states when they are part of the changed contract.

Use [testing-accessibility-security.md](references/testing-accessibility-security.md) for the production checklist and source-backed test and accessibility heuristics.

## Migrate deliberately

- Read the installed major's upgrade guidance and release notes before changing React, the renderer, types, compiler, lint plugin, framework, or test utilities.
- Keep React and its renderer compatible, update one coherent compatibility set, run official codemods only on a clean reviewable diff, and inspect every transformation.
- Do not introduce Canary, RC, or experimental APIs into production unless the repository already owns that channel or the user explicitly requests it. Isolate unavoidable experiments behind narrow boundaries.
- Characterize legacy behavior before replacing class lifecycles, render props, manual subscriptions, deprecated root APIs, or effect-driven data flows.
- Run the repository's focused typecheck, lint, tests, and production build. Add a real browser or server smoke test when static checks cannot validate rendering or hydration.

## Reference map

- [component-state-effects.md](references/component-state-effects.md): component shape, state ownership, reducers, context, Effects, refs, custom Hooks, and external stores.
- [rendering-performance.md](references/rendering-performance.md): rendering semantics, transitions, Suspense, profiling, memoization, SSR, hydration, and RSC boundaries.
- [forms-data-errors.md](references/forms-data-errors.md): forms, Actions, optimistic UI, data reads, caches, cancellation, and error recovery.
- [testing-accessibility-security.md](references/testing-accessibility-security.md): test layers, accessible UI, security, privacy, and production checks.
- [versioning-interop.md](references/versioning-interop.md): local version discovery, stable versus experimental APIs, compiler and framework interoperability, and migration strategy.
- [sources.md](references/sources.md): authoritative source inventory, scope, currentness notes, and access dates.
