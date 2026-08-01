# Aggregate design

Define an aggregate around invariants that must remain consistent in one transaction. Keep the boundary small and reference other aggregates by identity. Object navigation convenience is not a reason to enlarge the boundary.

Choose one aggregate root as the controlled entry point. Enforce internal invariants before committing. Coordinate cross-aggregate effects explicitly through application workflow, events, or compensating behavior according to the required consistency model.

Do not assume one user operation equals one transaction. Avoid large aggregates, bidirectional object graphs, and synchronous consistency across unrelated ownership boundaries. State eventual-consistency expectations and failure recovery when multiple aggregates participate.

Primary reference: [Vaughn Vernon's Effective Aggregate Design](https://www.dddcommunity.org/library/vernon_2011/).
