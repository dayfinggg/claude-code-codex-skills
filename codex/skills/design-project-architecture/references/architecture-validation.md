# Architecture validation

Validate the architecture against the drivers that selected it, not against pattern names.

- Trace representative features from entry point through policy, data, integrations, and observable result. A developer should be able to identify the owning module and permitted change location without scanning the entire repository.
- Enforce forbidden dependencies, cycles, layering, module visibility, and public API rules with the ecosystem's maintained analyzer or architecture tests when the risk justifies it.
- Test module contracts, data ownership, failure behavior, compatibility, and critical runtime paths. For distributed boundaries, also test timeouts, retries, idempotency, partial failure, version skew, observability, and recovery.
- Exercise a plausible extension, replacement, and removal scenario mentally or with a narrow spike. Count affected modules, public contracts, deployment units, data migrations, and coordinated owners; unexpected spread is evidence of a weak boundary.
- Verify build, test, packaging, deployment, migration, rollback, and local-development workflows remain understandable and repeatable.
- Compare current diagrams and ADRs with the implemented dependency and deployment graph. Delete stale artifacts rather than preserving misleading documentation.
- Record remaining risks, assumptions, temporary bridges, owners, and explicit removal conditions.

Architecture is acceptable when its important qualities are observable, its boundaries are enforceable, and future change does not depend on undocumented coordination.
