# Evidence for Dependency Changes

Use this reference when compatibility, supply-chain risk, or update policy is material.

## Applied principles

1. Treat the manifest, lockfile, resolved graph, build environment, and provenance as one change surface.
2. Verify affected and fixed versions from primary advisories and official release or migration documentation.
3. Preserve reproducibility and integrity checks; do not force an apparently successful resolution past incompatible constraints.
4. Evaluate outcomes against project risk rather than treating every available update as required.

NIST's Secure Software Development Framework is outcome-based and includes provenance, security requirements, risk tracking, and software component practices:

- [NIST Secure Software Development Framework](https://csrc.nist.gov/projects/ssdf)

GitHub documents that supported dependency updates are derived from package manifests or lockfiles, may require resolving the whole graph, and can be blocked by constraints from other packages:

- [Dependabot supported ecosystems](https://docs.github.com/en/code-security/reference/supply-chain-security/supported-ecosystems-and-repositories)
- [Dependabot errors](https://docs.github.com/en/code-security/reference/supply-chain-security/troubleshoot-dependabot/dependabot-errors)

Ecosystem-specific official documentation remains authoritative for version ranges, peer dependencies, generated lockfiles, and migration steps.
