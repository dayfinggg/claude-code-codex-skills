---
name: react
description: Engineer React components, Hooks, state, Effects, rendering, Suspense, SSR, hydration, and Server Components. Use for React-owned behavior; not Next.js routing or caching, and not merely because React is installed.
---

# React

## Resolve the React contract

- Inspect the renderer owner, source, lockfile, framework or bundler configuration, tests, and installed metadata. Resolve the exact `react`, `react-dom` or other renderer, type package, Hooks lint plugin, and compiler versions; declared ranges are not resolved versions.
- Check for duplicate React copies and renderer/version mismatches when Hooks, context, hydration, or scheduling behave unexpectedly. Identify whether the owner is client-only React, SSR, React Server Components, native rendering, or a component library.
- Follow the framework for routing, data caches, server endpoints, and deployment behavior. This skill owns React semantics; use the Next.js skill for Next router and cache behavior.

Read [versioning and interop](references/versioning-interop.md) before migrations, compiler changes, or version-sensitive APIs. Use [authoritative React sources](references/sources.md) when support or API status matters.

## Preserve component and Hook semantics

- Keep render idempotent and free of observable side effects. Treat props, state, context, Hook inputs, and existing JSX as immutable snapshots; never depend on render count or timing.
- Call components through JSX and Hooks only at permitted top-level positions. Keep the repository's Hooks lint rules enabled and restructure code rather than suppressing dependency diagnostics.
- Derive values during render when possible. Put user-caused work in event handlers or Actions. Use an Effect only to synchronize with a system outside React, pair setup with complete cleanup, and make it safe to restart.
- Preserve state through stable component identity. Reset intentionally with position or keys, and use stable data identifiers for list keys rather than array position or generated-per-render values.
- Choose local state, reducer, context, or an external store by ownership. Context is for a real provider boundary, not a substitute for passing a small number of clear props. Use [component, state, and Effect guidance](references/component-state-effects.md) for detailed choices.
- Keep controlled text input updates urgent. Use transitions or deferred values only for non-urgent rendering work and expose pending state without making correctness depend on scheduling.

## Handle rendering boundaries and failures

- Keep server and client initial output deterministic. Fix hydration mismatches at the source rather than suppressing warnings or rendering a deliberately different first tree.
- Keep browser-only APIs out of server/shared modules and privileged code out of client graphs. Treat every serialized prop as public and verify values crossing an RSC boundary are serializable.
- Let the renderer or framework own streaming and RSC transport. Use direct React DOM streaming APIs only when implementing the renderer integration, with the stream type supported by the host.
- Place Suspense and error boundaries around independently recoverable regions. Error boundaries do not catch every event-handler, asynchronous callback, or server-rendering failure.
- Abort obsolete work or ignore stale completions, bound concurrency and retries, and define cache ownership before adding caching. Do not create an Effect-based fetch layer when the framework or existing data library owns reads.
- Never render unsanitized HTML. Preserve semantic names, focus behavior, keyboard interaction, status announcements, and reduced motion in component behavior.

Use [rendering and performance guidance](references/rendering-performance.md) for concurrency, Suspense, memoization, SSR, hydration, and RSC details. Use [forms, data, and error guidance](references/forms-data-errors.md) for form Actions, optimistic state, cancellation, and recovery. Use [testing, accessibility, and security guidance](references/testing-accessibility-security.md) when those contracts change.

## Use project feedback

Run the repository's focused typecheck, Hooks lint, and component or integration tests. Run the production build and a real browser/server smoke test when changing SSR, hydration, RSC boundaries, Suspense, compiler behavior, or renderer versions. Profile before adding memoization, and verify rendered behavior through roles, labels, text, and interactions rather than component internals.
