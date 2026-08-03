---
name: domain-modeling
description: Resolve unclear business meaning, invariants, consistency ownership, or bounded-context boundaries. Use only while one of those domain decisions remains material; skip technical module reorganization, generic architecture, CRUD, utilities, and styling.
---

# Domain Modeling

1. Confirm that business meaning, invariants, consistency ownership, or bounded-context boundaries are materially unclear. Keep technical module reorganization and generic architecture outside this workflow.
2. Read existing domain documents, decisions, tests, workflows, and relevant code. Identify the domain authority and mark unknowns instead of inventing business rules.
3. Collect representative success, failure, and edge scenarios. Resolve synonyms, overloaded terms, and meanings that differ by actor or context. Use the agreed language in models and code.
4. Extract business rules and invariants. Assign each invariant an owner and a consistency boundary, then challenge it against the scenarios and current implementation.
5. Read [ddd-reference.md](references/ddd-reference.md). Introduce subdomains, bounded contexts, context mappings, entities, value objects, aggregates, services, or events only when a concrete difference in meaning, ownership, lifecycle, or consistency requires them.
6. Read [aggregate-design.md](references/aggregate-design.md) before defining or changing an aggregate. Do not equate a bounded context with a service or an aggregate with an object graph.
7. Validate the model by walking every representative scenario with the user or an authoritative source. Record stable language and justified decisions using [artifact-formats.md](references/artifact-formats.md); keep unresolved questions explicit.

Finish when terms are unambiguous within each context, invariants have enforcement boundaries, cross-context translations are explicit where needed, and every technical pattern has a domain reason.
