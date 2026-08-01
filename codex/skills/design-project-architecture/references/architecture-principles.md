# Architecture principles

## Drivers and trade-offs

Treat architecture as a response to stakeholder concerns, constraints, and quality attributes rather than a preferred diagram or pattern. Express important attributes as observable scenarios covering a stimulus, environment, response, and measurable outcome. Evaluate security, reliability, modifiability, performance, operability, usability, cost, and delivery independence only to the degree demanded by the system.

Choose and document trade-offs explicitly. A structure that improves independent change can increase runtime calls, operational burden, latency, and consistency work. Require evidence before paying those costs.

## Boundaries and responsibilities

Group behavior that changes for the same reason. Hide volatile decisions, data representation, infrastructure details, and third-party semantics behind an owner-controlled boundary. A module must have a purpose that can be stated without listing its files, an explicit public contract, and a clear policy for allowed callers and dependencies.

Aim for high cohesion and low coupling. Prefer acyclic dependencies toward stable policy. Do not infer good boundaries from folders alone: verify compile-time imports, runtime calls, shared data, coordinated releases, and team ownership.

## Topology and communication

Modularity is independent of deployment style. A modular monolith can provide clear boundaries without distributed-system cost. Split deployment units only when a concrete quality attribute requires independent lifecycle, scaling, fault isolation, security isolation, data ownership, or team autonomy.

Keep synchronous and asynchronous interactions intentional. Assign ownership for state transitions, failure handling, consistency, retries, timeouts, observability, versioning, and removal.

## Evidence base

- [ISO/IEC/IEEE 42010:2022](https://www.iso.org/standard/74393.html) defines architecture-description concepts around stakeholder concerns, viewpoints, models, and relationships.
- [SEI quality-attribute guidance](https://www.sei.cmu.edu/library/reasoning-about-software-quality-attributes/) connects architecture decisions to explicit quality-attribute scenarios and trade-offs.
- [Parnas, On the Criteria To Be Used in Decomposing Systems into Modules](https://citeseerx.ist.psu.edu/document?doi=5d752e29e29b42cc509417699a98d9dca8212c83&repid=rep1&type=pdf) establishes information hiding as a criterion for comprehensible and changeable modules.
- [Google Cloud modular design guidance](https://docs.cloud.google.com/architecture/framework/performance-optimization/promote-modular-design) recommends well-defined independent modules and clear interfaces while recognizing performance trade-offs.
- [Microsoft architecture design principles](https://learn.microsoft.com/en-ie/azure/architecture/guide/design-principles/) emphasize cohesion, loose coupling, domain encapsulation, operations, failure analysis, and evolution from business requirements.
