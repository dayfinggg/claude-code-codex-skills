# Domain modeling workbook

Use only the sections that expose a real ambiguity or preserve a decision. Do not fill every template to make the model appear complete.

## Question ledger

| Field | Record |
| --- | --- |
| Decision | The behavior or boundary this answer changes |
| Evidence | Source, current behavior, example, or owner statement |
| Status | Confirmed, proposed, conflicting, assumed, or unknown |
| Recommended interpretation | One concrete answer and why |
| Consequence | Acceptance case, compatibility, data, UI, or operational effect |
| Owner | Decision owner only when established by evidence |

Prioritize questions that distinguish two plausible models. Avoid asking for implementation preferences before domain behavior is known.

## Ubiquitous language

| Term | Exact meaning | Includes | Excludes | Aliases or conflicts | Source |
| --- | --- | --- | --- | --- | --- |

Use one term for one concept. When stakeholders use the same word differently, preserve the conflict until a decision is made rather than silently normalizing it.

## Ownership and boundaries

For each rule or datum, record the authoritative owner, writers, readers, public contract, consistency requirement, and consequences of stale or unavailable data. A boundary is justified when it protects distinct language, ownership, lifecycle, consistency, or failure behavior; shared technology alone is not a domain boundary.

## State transitions

| Current state | Command or event | Actor | Preconditions | Next state | Durable effects | Failure or retry semantics |
| --- | --- | --- | --- | --- | --- | --- |

Check impossible transitions, repeated commands, reordered events, concurrent actors, cancellation, expiry, correction, deletion, and unknown commit outcomes. State whether a rejected transition is an error, no-op, conflict, or compensating workflow.

## Invariants

Write an invariant as a proposition that must remain true across every allowed transition. Name its owner and the public evidence that could falsify it. Do not encode a database constraint, class method, or UI step as the invariant unless that mechanism itself is the domain contract.

Useful categories include identity and uniqueness, authorization, conservation and totals, cardinality, ordering, time windows, monotonic state, mutual exclusion, referential integrity, auditability, and retention. Apply only categories relevant to the domain.

## Examples and counterexamples

Use concrete values and expected observable outcomes. Cover the smallest normal example, every rule-changing boundary, a rejected example, duplicate or retry behavior, and a material partial failure. Derive expected results from the accepted rule, not by copying the current algorithm.

When examples disagree with a proposed rule, change the rule or expose the unresolved decision. Do not average incompatible expectations into vague prose.

## Acceptance handoff

For each accepted behavior, provide the initiating public action, starting state, expected output and durable effects, forbidden effects, and the test seam that can observe it. Keep architecture choices separate unless a domain invariant requires a particular consistency, ordering, security, or ownership boundary.

If the model becomes a durable document, record its canonical location, audience, authoritative inputs, accountable owner when known, update trigger, and retirement condition. Remove speculative sections before publication.
