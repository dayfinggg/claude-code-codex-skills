# Architecture principles

## Drivers and scenarios

Treat architecture as a response to stakeholder concerns and constraints, not a preferred pattern or diagram. Prioritize only qualities that can change the boundary decision. Write each as:

`<source> causes <stimulus> in <environment>; <asset> responds <response> measured by <metric> at <threshold>.`

For example: `During a weekday traffic spike of 2,000 requests/minute, checkout completes with p95 latency at or below 300 ms and errors below 0.1%.` Name the scenario owner, evidence source, and time horizon. A scenario without a threshold is a concern to clarify, not a decision criterion.

## Boundary choices

Group behavior and data that need the same owner or change cadence, while hiding volatile implementation, representation, and third-party semantics behind an owned contract. Test a proposed boundary against code imports, runtime calls, shared data, coordinated releases, operational dependencies, and the teams that must change it.

Choose dependency direction, cycle tolerance, state sharing, replacement seams, and deployment topology according to the scenarios. Prefer a simpler option when it meets the drivers. Accept added separation only when its benefit exceeds its communication, consistency, tooling, and cognitive-load cost. State the reason, safeguard, owner, and removal condition for each exceptional dependency or temporary bridge.

## Teams and communication

Give a stable team enough ownership to build, test, deploy, and operate its responsibility without transferring hidden work. Measure cognitive load by the domains, tools, services, operational duties, and dependencies the team must understand. Reduce unnecessary load before dividing responsibility further.

Make cross-team interaction explicit: use time-boxed collaboration to discover a boundary, X-as-a-Service for a consumable capability with an interface and support expectations, and facilitation to transfer a defined capability with an exit condition. Revisit the mode when the team or architecture changes.

Read [sources](sources.md) for ISO 42010, SEI scenario methods, modularity, and team-topology guidance.
