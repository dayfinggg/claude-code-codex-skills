# Existing-project evolution

1. Describe the architecture that exists, including accidental dependencies and operational reality. Do not design from the directory tree alone.
2. Use change history, defect concentration, dependency cycles, coordinated edits, ownership ambiguity, slow tests, deployment coupling, and incident evidence to locate costly boundaries.
3. Protect current behavior with the narrowest useful characterization, contract, integration, or end-to-end tests before moving responsibility.
4. Choose one migration seam. Establish the target boundary, route new behavior through it, move one responsibility and its owned data at a time, and validate after every reversible step.
5. Isolate incompatible legacy or third-party models behind an adapter or anti-corruption boundary. Avoid allowing a poorly structured area to define contracts for cleaner modules.
6. Support old and new paths only for a defined transition. Identify consumers, migration order, rollback, data reconciliation, observability, and the condition for deleting the old path.
7. Improve touched and directly blocking code to the target standard. Do not combine architectural migration with unrelated cleanup, broad renaming, or speculative abstraction.
8. Remove obsolete paths, bridges, flags, dependencies, data, tests, and documentation only after consumers have migrated and evidence shows the old path is unused.

Prefer frequent, small, reversible improvement over a big-bang rewrite. This follows [AWS evolutionary operational guidance](https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/evolve.html) and Microsoft's current [microservices assessment and incremental decomposition guidance](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/microservices-assessment).
