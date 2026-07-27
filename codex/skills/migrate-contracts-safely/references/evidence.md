# Evidence for Contract Migrations

Use this reference when selecting migration phases, compatibility guarantees, or cutover evidence.

## Applied principles

1. Break incompatible change into expand, migrate, and contract stages.
2. Support old and new states during the declared compatibility window.
3. Make data movement restartable, observable, and safe under partial failure.
4. Remove the old path only after usage and data evidence show it is no longer needed.

Parallel Change describes the expand-migrate-contract pattern for interfaces and database refactoring:

- [Parallel Change](https://martinfowler.com/bliki/ParallelChange.html)

Evolutionary database design emphasizes small migrations, versioned changes, and continuous integration of schema and application evolution:

- [Evolutionary Database Design](https://martinfowler.com/articles/evodb.html)

Microsoft's versioning guidance distinguishes compatible additions from breaking removals or semantic changes and places responsibility on the API to communicate and preserve the intended compatibility boundary:

- [Implement versioning operations](https://learn.microsoft.com/en-us/connectors/custom-connectors/operational-versioning)
- [API design and versioning](https://learn.microsoft.com/en-us/azure/architecture/microservices/design/api-design)
