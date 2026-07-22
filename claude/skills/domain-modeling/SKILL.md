---
name: domain-modeling
description: Clarify ambiguous business domains through vocabulary, ownership, states, invariants, examples, and acceptance cases. Use only when explicitly invoked for complex rules or product discovery; not for routine CRUD, implementation alone, or behavior already fixed by an authoritative specification.
disable-model-invocation: true
---

# Domain Modeling

Turn ambiguous domain language into a small falsifiable model before architecture or implementation hardens guesses into code. Preserve the user's decision ownership and distinguish discovered facts from proposed terminology.

Read [domain workbook](references/domain-workbook.md) when a structured glossary, state table, decision table, example set, or durable domain artifact is needed.

## Establish authority

1. Identify the decision this model must support, affected users and systems, source documents, current implementation, subject-matter owners, and explicit non-goals.
2. Separate authoritative rules, observed current behavior, user statements, inferred rules, assumptions, conflicts, and unknowns. Do not treat existing code as correct merely because it exists.
3. Ask one high-information question at a time only when the answer changes a rule, state transition, compatibility obligation, or acceptance case. Offer a recommended interpretation and consequence when useful.

## Build the model

Use the language of the domain rather than framework, database, or UI terminology. Define each important term once and record aliases or conflicting meanings. Identify entities, values, events, commands, policies, actors, boundaries, and the single owner of every datum and rule.

Model lifecycle behavior as explicit states and allowed transitions. For each transition, record actor, preconditions, authorization, input, resulting state, emitted effects, idempotency, failure outcome, and whether an unknown commit result can occur. Express invariants independently from the implementation that will enforce them.

Test the model with concrete examples and counterexamples. Include boundary values, missing or duplicate input, retries, concurrency, ordering, time and timezone, cancellation, partial failure, correction, deletion, and historical compatibility only where the domain can encounter them. Prefer a small decision table or state diagram over paragraphs that hide contradictions.

## Turn ambiguity into evidence

When sources conflict, cite both and identify the owner who must decide. When wording alone cannot resolve behavior, define a disposable prototype, data sample, simulation, or tracer scenario with a decision criterion; do not let exploratory output become production behavior silently.

Map accepted rules to public acceptance examples and likely test seams without prescribing internal classes or storage prematurely. Keep alternatives open until the domain distinction requires an architectural boundary.

## Deliver the result

Return the minimum useful combination of glossary, ownership map, invariants, state transitions, examples and non-examples, unresolved decisions, and acceptance cases. If persisted, identify its audience, source of truth, owner when known, freshness trigger, and retirement condition. Do not fabricate product requirements, invent an owner, or implement code unless the user separately requested implementation.
