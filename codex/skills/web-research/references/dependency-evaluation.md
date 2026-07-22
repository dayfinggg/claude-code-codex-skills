# Dependency and versioned API evaluation

Use this procedure only when work adds, upgrades, replaces, or removes a dependency, chooses between libraries, or relies on uncertain version-specific external behavior. Do not browse for an ordinary import when the installed package, repository code, and tests already establish the needed contract.

## Establish the exact local baseline

1. Identify the owning runtime, package manager, manifest, lockfile, workspace boundary, supported platforms, deployment target, and generated artifacts.
2. Resolve the actually installed version from the lockfile and package metadata rather than a range in the manifest. Inspect local declarations, exported API, source, changelog, license, and transitive dependency information when present.
3. Trace current call sites and tests. State the capability or defect that motivates change and the simplest option that uses the standard library, platform, framework, or an existing dependency.
4. Preserve generated-file ownership. Use the repository package manager for dependency changes; never hand-edit a lockfile or generated integrity data.

## Inspect current primary evidence

Prefer the official version-matched API reference, release notes, migration guide, support policy, registry metadata, source repository, security advisory database, and license text. Record the package, exact candidate version, publication date, relevant runtime or platform, inspected URLs or commits, and access date when the evidence can change.

Resolve these questions with evidence:

| Dimension | Required decision |
| --- | --- |
| Need | What owned requirement cannot be met more simply? |
| API fit | Does the exact version provide the required public contract without relying on an undocumented internal path? |
| Compatibility | Does it support the repository runtime, module system, framework, operating systems, architectures, and adjacent dependencies? |
| Migration | What breaks between the installed and candidate versions, including defaults, data formats, peer dependencies, and deprecated behavior? |
| Security | Are either version or relevant transitives affected by current official advisories, and is the proposed mitigation applicable? |
| Maintenance | Are releases, issue handling, support policy, ownership, and deprecation signals adequate for the expected lifetime? |
| License | Is the package and its relevant distribution model compatible with the project? Escalate legal ambiguity rather than interpreting it as legal advice. |
| Cost | What bundle, install, memory, startup, network, storage, operational, and supply-chain cost does it add? |

Use issue discussions and community reports only to investigate real-world behavior not established by primary material. Label them as experience evidence, match their version and environment, and do not let popularity or download counts substitute for contract, maintenance, or security evidence.

## Prove the chosen path

When uncertainty remains, build the smallest disposable reproduction or smoke test against the exact candidate version in an isolated temporary location. Exercise the required API, failure mode, packaging or runtime boundary, and cleanup. Do not commit exploratory artifacts or let a prototype become production code without a separate implementation decision.

After an authorized dependency change, run the focused tests, type or schema checks, build or package path, and one direct smoke test that would fail if the assumed API or compatibility were wrong. Inspect the resulting manifest and lockfile diff for unrelated churn, unexpected transitives, scripts, registry changes, or integrity anomalies.

Return the chosen version, reason, rejected alternatives, primary sources, observed compatibility checks, material transitive changes, and unresolved risk. If current evidence cannot establish safety or compatibility, keep the installed version or report the decision as blocked rather than guessing.
