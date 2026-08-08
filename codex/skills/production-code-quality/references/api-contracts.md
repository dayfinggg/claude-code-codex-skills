# API and dependency contracts

Use this reference when adding or upgrading a dependency, calling a version-sensitive external API, or relying on an SDK, protocol, symbol, parameter, or return shape whose exact contract affects the change.

1. Establish the effective version and environment from manifests, lockfiles, build configuration, installed package metadata, generated clients, or runtime inspection. Do not infer a version from memory or from an unrelated project.
2. Inspect local definitions, types, schemas, tests, and existing call sites before searching externally. Prefer the contract actually installed or generated for the project.
3. When local evidence is incomplete or the contract may have changed, consult current primary documentation, specifications, release notes, deprecation notices, or the authoritative source repository for the established version.
4. Confirm exact package and symbol names, imports, parameters and defaults, types, return shape, error behavior, async and cancellation semantics, pagination, rate limits, timeouts, and supported versions only where relevant. Do not substitute a nearby API without proving compatibility.
5. Keep untrusted data validation and error translation at the boundary. Add an adapter only when it isolates a credible compatibility, testing, or migration concern.
6. Verify the integration through the strongest project-native check available: definition navigation, schema validation, compilation, type checking, focused tests, build, or a narrow runtime call against a safe local, fake, or staging target. Exercise a material error path as well as success.
7. If authoritative evidence or an executable check is unavailable, state the unverified contract and its consequence instead of filling the gap with a plausible implementation.

Do not add dependencies for functionality already provided adequately by the project, use deprecated examples because they are easier to find, or claim compatibility from documentation for a different version.

Primary basis: project manifests and SDK definitions, official platform documentation, specifications, and release notes. The evidence order follows [sources](sources.md) and the current OpenAI guidance recorded in the research corpus.
