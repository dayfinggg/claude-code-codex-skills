# Domain-driven design reference

Start with language and behavior. Strategic patterns precede tactical patterns.

Identify subdomains only when their business purpose and investment needs differ. Define a bounded context when one term or model has a distinct meaning, owner, lifecycle, or rate of change. Map upstream and downstream relationships and translate between incompatible models; use an anti-corruption layer when an external or legacy model must not leak inward.

Use an entity for continuity of identity, a value object for an immutable descriptive concept, an aggregate for transactional consistency, and a domain service for domain behavior that belongs to no single object. Domain events express facts meaningful to the domain. CQRS, event sourcing, repositories, and factories are optional techniques, not proof of DDD.

Primary references: [Eric Evans' DDD Reference](https://www.domainlanguage.com/ddd/reference/) and [Matt Pocock's domain-modeling skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/domain-modeling/SKILL.md).
