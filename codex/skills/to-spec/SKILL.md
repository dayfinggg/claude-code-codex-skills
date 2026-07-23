---
name: to-spec
description: Turn an agreed conversation, plan, prototype result, or issue into a durable, implementation-independent specification with testable requirements and explicit scope. Use when the user asks for a specification, PRD, requirements document, acceptance criteria, or a stable artifact for multi-session implementation. Do not use while material product decisions remain unresolved, for a simple one-step change, or to publish externally without explicit authorization.
---

# Write Specification

Preserve what must be built and why without freezing volatile implementation details. Synthesize settled decisions; do not reopen them or invent missing requirements.

## Respect the Specification Contract

- Work read-only except for the requested specification artifact.
- Return the specification in the response by default.
- Save it to a file only when the user requests a file, provides a path, or an established repository workflow requires one.
- Do not publish to GitHub, Linear, or another external tracker without explicit authorization and an exact target.
- Do not repeat a planning interview when the active context is already decision-complete.

## Gather the Settled Context

Read:

- the user request and accepted clarifications;
- the active plan and prototype or research findings;
- relevant repository behavior, tests, domain vocabulary, and architecture decisions;
- existing issue or specification material and comments;
- compatibility, security, data, migration, and operational constraints.

Verify important claims against the repository when possible. Preserve the user's language unless the project has a more precise established term.

If a material product, architecture, or compatibility decision remains open, return to the active planning workflow before finalizing the specification.

## Separate Requirements from Implementation

Describe observable behavior, contracts, constraints, and acceptance evidence.

Include implementation decisions only when they are already settled and materially constrain valid solutions, such as:

- public interfaces or protocols;
- data and schema contracts;
- compatibility or migration strategy;
- security and authorization invariants;
- performance or operational thresholds;
- a required integration seam.

Avoid volatile file paths, line numbers, internal call sequences, code snippets, and speculative module structure. Reference stable components or verified artifacts when useful.

## Write the Specification

Use only applicable sections:

```markdown
# <Outcome>

## Problem
## Desired outcome
## Scope
## Requirements
## Acceptance criteria
## Contracts and invariants
## Settled decisions
## Verification strategy
## Migration and rollout
## Out of scope
## Open decisions
## References
```

Keep the problem and desired outcome user-centered.

Write requirements as uniquely identified, testable statements. Each requirement should define one observable rule, constraint, or behavior without prescribing unnecessary implementation.

Write acceptance criteria that:

- map to requirements;
- state observable success or failure;
- include material boundaries and failure behavior;
- can be verified by an agent or engineer;
- avoid vague terms such as fast, intuitive, robust, or appropriate unless a measurable definition follows.

Use user stories only when actor, action, and benefit materially improve understanding. Do not inflate the document with repetitive stories.

## Preserve Decisions and Boundaries

- Record the rationale for consequential settled decisions.
- Mark explicit exclusions so future work does not absorb them silently.
- Link to existing ADRs, plans, issues, research, and prototypes rather than copying them.
- Keep unresolved matters visible as open decisions; do not disguise them as assumptions.
- Remove obsolete alternatives and discussion history that no longer constrain implementation.

## Audit the Specification

Confirm:

- every requested outcome is represented;
- requirements do not conflict;
- each acceptance criterion maps to at least one requirement;
- every requirement has a plausible verification route;
- facts, decisions, assumptions, and proposals remain distinct;
- implementation freedom remains where no decision was made;
- no external publication or repository location was invented.

If the specification is not decision-complete, state the exact missing decision instead of presenting it as ready.

## Completion Standard

Finish only when a fresh implementer can understand the problem, scope, required behavior, constraints, settled decisions, and proof of completion without reading the full prior conversation.
