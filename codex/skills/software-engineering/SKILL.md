---
name: software-engineering
description: Universal engineering rules for designing, implementing, reviewing, debugging, validating, or explaining code, architecture, APIs, tests, dependencies, security, performance, and production tradeoffs in any language. Use for every software development task alongside the most specific stack and domain skills.
---

# Software Engineering

## Operating Mode

- Do not create or update READMEs or changelogs unless requested or required by the project's established workflow.
- Inspect scoped instructions, current state, contracts, call sites, tests, schemas, configuration, dependencies, and documented commands before changing code.
- Activate the most specific language, framework, architecture, API, security, database, debugging, and verification skills required by the actual surface; this skill supplies the universal baseline rather than replacing them.
- Read [sources.md](references/sources.md) when a decision depends on a named lifecycle, quality, review, security, compatibility, or supply-chain framework. Pin version-sensitive guidance and prefer repository evidence over a generic rule.

## Design Principles

- Apply principles as tradeoffs, not slogans. Prefer the local design that makes future changes easier without hiding today's behavior.
- Use KISS by default: direct, boring code beats clever abstractions when requirements are simple.
- Use YAGNI to reject speculative hooks, config knobs, generic frameworks, or extension points that are not needed by current requirements.
- Use DRY when duplication represents the same concept and a shared abstraction improves clarity. Keep similar code separate when the behaviors may diverge or abstraction would obscure intent.
- Use SOLID and OOP rules where the project is object-oriented or has stable polymorphic boundaries. Do not force classes, inheritance, or interface layers into procedural, functional, data-oriented, or script-style code.
- Prefer composition over inheritance unless a framework requires inheritance or the subtype relationship is stable and meaningful.
- Keep high cohesion and low coupling. A unit should have one coherent reason to change and should expose only the dependencies its callers need.
- Favor readable, explicit code over compact code that relies on hidden control flow, surprising mutation, or implicit global state.

## Decision Quality And Non-Standard Thinking

- Start from invariants, constraints, failure costs, and user value rather than a favorite pattern or framework.
- For high-impact or unfamiliar decisions, compare at least two materially different approaches, including a simpler subtractive option when plausible. Do not manufacture alternatives for routine work.
- Challenge the leading design with counterexamples, boundary cases, a pre-mortem, and the question "What would make this correct locally but harmful system-wide?"
- Consider first-order and second-order effects: compatibility, data migration, operational load, observability, security, privacy, accessibility, organizational ownership, future change cost, and rollback.
- Prefer experiments that cheaply falsify risky assumptions: a focused benchmark, spike, characterization test, trace, execution plan, or prototype behind a reversible boundary.
- Treat novelty as a means, not a quality signal. Unconventional solutions must improve a measured constraint without making correctness, review, operation, or recovery worse.

## Naming and Shape

- Use names from the domain and existing codebase. Match local terminology before introducing new vocabulary.
- Choose precise names for responsibilities and effects. Avoid vague `manager`, `helper`, `util`, `data`, or `service` names unless they are established project idioms.
- Name booleans and predicates so truth reads naturally. Name commands by their action and queries by the value they return.
- Keep functions focused enough to understand, test, and change safely. Split when a function mixes abstraction levels, business concepts, side effects, or unrelated branches.
- Do not split code into tiny single-use wrappers that make the call graph harder to follow.
- Keep modules/files cohesive. There is no universal line limit; split when navigation, ownership, dependency boundaries, build performance, or testability suffer.
- Avoid dumping unrelated behavior into generic utility files. Prefer domain-specific modules with clear ownership.

## Architecture Boundaries

- Respect the repository's existing architecture before applying a generic pattern.
- Use layered, clean, or hexagonal architecture when it reduces coupling between domain logic, application orchestration, infrastructure, UI, transport, persistence, and external services.
- Avoid heavyweight architecture for small scripts, one-off tools, or simple features where direct code is clearer and cheaper to maintain.
- Keep dependency direction intentional. Stable domain or core logic should not depend on volatile UI, HTTP, database, filesystem, vendor SDK, or framework details when those boundaries matter.
- Put external systems behind adapters or ports when they are hard to test, likely to change, or used from multiple places. Do not wrap every library call just to satisfy a pattern.
- Keep orchestration separate from policy-heavy domain logic where that improves testability and reuse.
- Preserve public API stability unless a breaking change is explicitly requested. Prefer additive changes, compatibility shims, migrations, and clear deprecation paths.
- Validate and normalize data at system boundaries: user input, API requests, file reads, database records, messages, CLI args, environment variables, and third-party responses.

## Dependencies

- Keep dependency direction acyclic where practical. Avoid making low-level modules import high-level application concerns.
- Isolate optional or heavyweight dependencies so they do not leak across unrelated code paths.

## Technology And Library Selection

- Evaluate maintenance activity, release cadence, security history, license, ownership, transitive graph, bundle or binary size, startup cost, platform support, escape hatches, and migration cost.
- Prefer a mature narrow library with a stable contract over a broad framework for one feature. Prefer no dependency when a small, well-tested local implementation is safer.
- Do not recommend a fashionable library as universally "best". Tie the choice to explicit requirements and record the consequences.

## Error Handling

- Handle errors at the layer that has enough context to recover, translate, retry, report, or fail safely.
- Preserve useful cause/context when wrapping errors. Do not swallow errors, convert them to vague messages, or hide partial failure.
- Treat programmer errors differently from expected external failures. Fail fast for invariant violations; handle network, filesystem, validation, timeout, cancellation, and concurrency failures deliberately.
- Prefer typed/domain-specific errors when callers need to branch on them. Prefer simple exceptions/results when no caller needs a taxonomy.
- Ensure cleanup for files, locks, transactions, streams, sockets, temporary resources, and partial writes.
- Log enough to diagnose production issues, but never log secrets, tokens, credentials, private data, or unnecessary user content.
- Make user-facing errors actionable without exposing internals.

## Testability and Validation

- Add or update tests when behavior changes, a bug is fixed, a contract is added, or regression risk is meaningful.
- Use characterization tests before risky refactors when existing behavior is unclear.
- Prefer unit tests for pure logic, integration tests for boundaries, contract tests for APIs, and end-to-end tests only when workflow risk justifies the cost.
- Test edge cases that matter: empty input, invalid input, boundary values, concurrency, permissions, encoding, timezones, retries, partial failures, and backward compatibility.
- Keep tests deterministic. Control time, randomness, network, filesystem, and external services where possible.

## Refactoring Discipline

- Separate behavior changes from mechanical refactors when practical.
- Refactor to make the requested change safer or clearer, not to impose personal taste.
- Move in small reversible steps: rename, extract, move, then change behavior.
- Preserve observable behavior during refactors unless the user requested a behavior change.
- Update all call sites, tests, type definitions, schemas, docs that are required by the project, and generated artifacts only when they are part of the established workflow.
- Stop refactoring when the code is clear enough for the current task.

## Security Basics

- Validate input with structured parsers or schemas when available. Avoid ad hoc string parsing for security-sensitive data.
- Enforce authentication, authorization, tenant isolation, and ownership checks close to the protected operation.
- Use least privilege for files, network access, database roles, tokens, and cloud permissions.
- Protect secrets. Do not hardcode credentials, print them, commit them, or send them to unnecessary tools.
- Guard against common classes of bugs relevant to the stack: injection, XSS, CSRF, SSRF, path traversal, unsafe deserialization, insecure direct object references, race conditions, replay, downgrade, and weak randomness.
- Do not invent cryptography, password storage, token formats, or security protocols. Use vetted primitives and framework defaults.
- For supply-chain-sensitive work, prefer minimal CI permissions, pinned or reviewed release actions, provenance/attestations, dependency audit signals, and release workflows that avoid long-lived credentials.
- For auth, payments, cryptography, infrastructure, credential handling, or destructive data paths, require fresh focused review and targeted validation before treating the work as safe.

## Performance

- Optimize after measurement unless the algorithmic problem is obvious and local.
- Define the target before tuning: latency, throughput, memory, CPU, startup time, binary size, bundle size, query count, or cost.
- Prefer algorithmic and data-access improvements before micro-optimizations.
- Treat caching, batching, concurrency, laziness, pooling, and parallelism as correctness-sensitive features. Handle invalidation, ordering, backpressure, cancellation, timeouts, and resource limits.
- Keep readable code unless measurement proves the complexity is worth it.

## Production Fitness

- Design for operation as well as compilation: structured and redacted diagnostics, meaningful metrics or traces, bounded resource use, timeouts, cancellation, backpressure, graceful degradation, and actionable failure modes where relevant.
- Make rollouts reversible when risk warrants it. Use compatibility windows, expand-contract migrations, staged exposure, feature flags, health signals, and a tested rollback path.
- Check accessibility, localization, timezones, encoding, privacy, retention, tenant isolation, and offline or degraded behavior when the product surface makes them relevant.
- Define resource budgets before optimization or scale work: latency, throughput, memory, CPU, storage, network, query count, bundle size, cost, or recovery time.
- For concurrency and distributed workflows, make ownership, ordering, idempotency, retries, deduplication, consistency, and partial failure explicit.

## Review Standards

- Prefer concrete evidence over style opinions. If a suggestion is optional or taste-based, label it as such.
