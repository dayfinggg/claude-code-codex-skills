# Testing strategy

Load this reference when selecting or changing the project's test strategy, not for every trivial edit.

Map each risk to the cheapest test level that can observe it reliably. Use unit tests for local behavior, integration tests for component boundaries, contract tests for independently evolving interfaces, end-to-end tests for critical user journeys, and property or fuzz tests for broad input spaces and invariants.

Prefer behavior and public contracts over implementation structure. Keep fixtures minimal and meaningful, isolate nondeterminism, control time and external state, and make failures diagnostic. Avoid duplicated coverage that adds cost without distinguishing a new risk.

For defects, add a regression test when feasible. For migrations and compatibility, test both transition and steady states. Measure coverage only as a gap-finding signal; a percentage is not evidence that important behavior is correct.
