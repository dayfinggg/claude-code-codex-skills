---
name: domain-modeling
description: Discover and refine ubiquitous language, business rules, invariants, ownership, bounded contexts, and justified domain patterns. Use for domain-rich features, conflicting terminology, unclear consistency boundaries, legacy model extraction, or explicit DDD requests; skip simple CRUD, utilities, styling, and generic architecture cleanup.
---

# Domain Modeling

1. Read existing domain documents, decisions, tests, workflows, and relevant code. Identify the domain authority and mark unknowns instead of inventing business rules.
2. Collect representative success, failure, and edge scenarios. Resolve synonyms, overloaded terms, and meanings that differ by actor or context. Use the agreed language in models and code.
3. Extract business rules and invariants. Assign each invariant an owner and a consistency boundary, then challenge it against the scenarios and current implementation.
4. Read [ddd-reference.md](references/ddd-reference.md). Introduce subdomains, bounded contexts, context mappings, entities, value objects, aggregates, services, or events only when a concrete difference in meaning, ownership, lifecycle, or consistency requires them.
5. Read [aggregate-design.md](references/aggregate-design.md) before defining or changing an aggregate. Do not equate a bounded context with a service or an aggregate with an object graph.
6. Validate the model by walking every representative scenario with the user or an authoritative source. Record stable language and justified decisions using [artifact-formats.md](references/artifact-formats.md); keep unresolved questions explicit.

Finish when terms are unambiguous within each context, invariants have enforcement boundaries, cross-context translations are explicit where needed, and every technical pattern has a domain reason.
