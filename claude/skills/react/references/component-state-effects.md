# Components, State, Hooks, and Effects

## Component and API shape

- Start from the product's data model and UI states, then create a component tree whose ownership follows those states.
- Keep the public prop surface minimal, typed, and domain-named. Prefer explicit variants or discriminated unions over interacting booleans that permit impossible states.
- Prefer children and composition to configuration-heavy components. Use render props or compound components only when callers genuinely need control of rendering or shared coordination.
- Keep event props named for intent (`onSave`, `onDismiss`) rather than the underlying gesture when the component represents a domain action.
- Avoid defining a component inside another component; doing so changes its identity on every render. Extract it or pass data/children.
- Avoid generic `components`, `common`, or `utils` dumping grounds. Co-locate route/feature-specific UI and promote a reusable primitive only after its contract is stable.

## State ownership decision

1. Do not store a value if props, state, or context can derive it during render.
2. Keep transient interaction state at the lowest common owner that needs it.
3. Lift state only when two branches must coordinate one source of truth.
4. Separate authoritative remote state from an editable local draft. Reconcile drafts explicitly instead of copying every prop change into state.
5. Normalize state enough to avoid contradictions, duplication, and deeply nested updates, but keep small local shapes direct.
6. Use a reducer when transitions are event-driven, multiple fields change together, or invariants benefit from one transition function. Keep reducers pure.
7. Use context for stable cross-tree concerns such as theme, authenticated viewer summary, locale, or an injected service. Split unrelated high-frequency values and render providers as narrowly as practical.

Choose controlled components when the parent must coordinate, validate, reset, or observe every value. Choose uncontrolled components for simple native form ownership, file inputs, or integration with imperative widgets. Do not switch between controlled and uncontrolled during one lifetime.

## Effect decision tree

Ask in order:

1. Can render derive the value? Compute it in render.
2. Did a user interaction cause the work? Run it in the event handler or Action.
3. Does a framework loader, Server Component, route boundary, or existing query library own it? Use that boundary.
4. Must the component synchronize with a browser API, network connection, timer, DOM widget, analytics subscription, or another external system while mounted? Use an Effect.

For every Effect:

- Make setup and cleanup symmetrical and safe across setup-cleanup-setup development probes.
- Include all reactive values. Move object/function creation inside the Effect, stabilize a true API boundary, or extract an Effect Event where the installed React version supports it; never lie to the dependency list.
- Cancel requests or subscriptions and prevent stale completions from overwriting newer state.
- Use `useLayoutEffect` only for measurements or synchronous pre-paint mutations that visibly break with `useEffect`; keep it out of server-rendered paths where possible.
- Keep analytics and logging idempotent or deduplicated at the receiving boundary.

## Hooks and refs

- Extract a custom Hook to reuse stateful behavior or present a narrow capability, not merely to shorten a file.
- Return a small stable contract and avoid exposing internal setters when intent-named commands preserve invariants.
- Use refs for mutable values that do not affect rendering, DOM handles, and imperative integration. Do not read or write refs during render except documented initialization patterns.
- Use `useImperativeHandle` only when a parent needs a narrow imperative capability that cannot be expressed declaratively.
- Use `useSyncExternalStore` for subscriptions to mutable external stores, including a server snapshot for SSR; do not approximate store consistency with an Effect and local state.

## Identity and reset behavior

- Treat type, position, and key as state identity. Preserve state by keeping identity stable; reset deliberately with a meaningful key or changed position.
- Use stable entity IDs as list keys. Use an index only for a truly static list with no insertion, removal, reordering, or item-local state.
- Never call random or time-based generators during render to create keys, IDs, or default state. Use stable data IDs, `useId` for accessibility relationships, or event-time creation as appropriate.
