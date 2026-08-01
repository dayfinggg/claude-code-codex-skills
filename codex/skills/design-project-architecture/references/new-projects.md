# New-project design

1. Write the smallest set of primary use cases, external actors, trust boundaries, data lifecycles, deployment constraints, and quality-attribute scenarios that can reject an unsuitable design.
2. Select the simplest runtime and deployment topology that satisfies those drivers. Start with one deployable unit containing explicit modules unless a distributed boundary is already justified.
3. Organize the source tree around cohesive capabilities and platform boundaries that developers actually navigate. Keep framework adapters, generated code, migrations, tests, deployment definitions, and operational configuration identifiable without scattering one capability across arbitrary technical folders.
4. Define each module's responsibility, owned data, public contract, allowed dependencies, failure behavior, and extension or removal path before adding abstraction. Keep dependency assembly in explicit composition roots.
5. Establish only the tooling and architecture checks needed by present risks. Prefer enforceable import, dependency, schema, contract, and deployment rules over prose conventions.
6. Add a system-context view and a container or module view only when they improve communication. Use deeper diagrams only for a concrete question. Record consequential decisions and rejected alternatives as short ADRs.
7. Implement a thin end-to-end path through the intended boundaries, validate it in the real build and runtime, and revise the structure before multiplying it.

References: [C4 diagrams](https://c4model.com/diagrams), [C4 review checklist](https://c4model.com/diagrams/checklist), and [Architectural Decision Records](https://adr.github.io/).
