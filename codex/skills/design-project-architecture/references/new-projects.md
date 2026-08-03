# New-project design

1. Identify the smallest set of use cases, actors, trust boundaries, data lifecycles, operating constraints, team responsibilities, and measurable quality-attribute scenarios that can reject an unsuitable design.
2. Compare only the module, data, runtime, deployment, and team-boundary options that address those drivers. Include the cost of latency, failure handling, consistency, release coordination, tooling, and cognitive load.
3. Define each selected boundary's responsibility, owner, public contract, state ownership, allowed dependencies, failure behavior, interaction mode, and planned evidence. Add a seam, deployable, or abstraction only for a stated driver.
4. Stop before committing to an irreversible contract, data migration, trust boundary, availability strategy, deployment topology, or ownership model if the driver or accountable owner is unknown. Record the question and use a reversible thin path where possible.
5. Implement a thin end-to-end path through the intended boundaries. Exercise the selected scenarios in the real build, runtime, and operational environment before multiplying the pattern.
6. Document only decisions and views that answer a stakeholder question: typically a context or boundary map, a runtime or deployment view where relevant, and an ADR for consequential trade-offs.

Use [architecture validation](architecture-validation.md) to select proportionate fitness functions and complete the data/distributed checklist.
