---
name: change-dependencies
description: "Change external libraries, frameworks, SDKs, runtimes, compilers, or build tools with verified compatibility and bounded scope. Use when an authorized change adds, upgrades, downgrades, replaces, or removes a dependency, including CVE remediation. Do not use for internal imports, inventory or advice only, or wholesale stack replacement."
---

# Change Dependencies

Change external dependencies through primary evidence, the repository's native tooling, and a verified compatibility boundary.

Read `references/evidence.md` when compatibility, supply-chain risk, or update policy is material. If delegation is explicitly authorized, use `delegate-work` to route current compatibility research to a documentation specialist and keep implementation ownership separate.

## Establish the change

- Identify the exact package, current and target versions, reason, affected manifests and lockfiles, supported runtimes, platforms, and deployment constraints.
- For an addition, prove the existing platform or dependency set does not already provide the needed capability.
- For a replacement or removal, trace every direct consumer, generated artifact, plugin, peer dependency, and runtime integration before editing.
- Keep unrelated dependency churn out of scope.

## Inspect the baseline

- Read package-manager configuration, manifests, lockfiles, toolchain pins, workspace boundaries, and the dependency's real call sites.
- Inspect the resolved dependency graph, including relevant transitive and peer dependencies.
- Run the smallest meaningful baseline: deterministic install or restore, static checks, focused tests, build, and a representative runtime path.
- Record existing failures separately. Do not attribute them to the dependency change without evidence.

## Verify compatibility

- Prefer official package metadata, release notes, migration guides, support matrices, security advisories, and repository documentation.
- Confirm runtime, operating-system, architecture, compiler, framework, peer-dependency, and license compatibility where relevant.
- Identify breaking changes and deprecated behavior at the actual call sites.
- If a security advisory is involved, verify the affected range and fixed version from authoritative sources.
- State uncertainty when primary evidence or repository coverage is incomplete.

## Make the smallest coherent change

- Use the repository's native package manager and preserve its configured version and workflow.
- Let the package manager update lockfiles. Do not hand-edit generated lock data.
- Upgrade related package families together only when compatibility requires it.
- Do not use force flags, ignored peer constraints, broad resolution overrides, or disabled integrity checks unless the user explicitly accepts the documented consequence.
- Adapt production code and configuration completely; do not leave compatibility placeholders, dead adapters, or partial migrations.

## Inspect the resulting graph

- Review direct and transitive additions, removals, supplier changes, integrity metadata, platform artifacts, and license or security effects.
- Confirm removed dependencies are absent from manifests, lockfiles, code, build outputs, and deployment artifacts.
- Treat unexpected graph expansion or duplicated major versions as a finding to investigate, not an automatic acceptance.

## Verify the result

- Run a clean install or restore from the committed manifests and lockfiles.
- Run relevant static checks, focused and broader tests, build or package steps, and representative runtime checks.
- Re-run the applicable security or dependency audit when it can provide a trustworthy signal.
- Report the exact versions resolved, commands run, results, remaining risks, and any unverified environment.
- Do not publish packages or deploy changes without separate authorization.

## Completion standard

The dependency change is complete only when the repository resolves reproducibly, affected behavior is adapted, relevant verification passes, and the compatibility and supply-chain impact is understood.
