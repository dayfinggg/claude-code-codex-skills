# Domain artifacts

Maintain the smallest artifact that preserves a decision.

A glossary entry contains the canonical term, concise meaning, context, accepted aliases, rejected ambiguities, and one representative scenario.

A context map names each bounded context, its responsibility and owner, the meaning it owns, upstream and downstream relationships, and required translations.

An invariant record states the rule, triggering scenarios, owner, consistency boundary, enforcement point, and failure behavior.

Create an ADR only for a consequential, surprising, or difficult-to-reverse choice with real alternatives. Record context, decision, alternatives, consequences, and status. Keep implementation details out of the ubiquitous-language glossary.

Useful formats: [Matt Pocock's context format](https://github.com/mattpocock/skills/blob/main/skills/engineering/domain-modeling/CONTEXT-FORMAT.md) and [ADR format](https://github.com/mattpocock/skills/blob/main/skills/engineering/domain-modeling/ADR-FORMAT.md).
