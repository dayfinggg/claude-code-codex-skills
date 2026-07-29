---
name: coding-practices
description: "Implement or refactor production code across languages with focused scope, boundary safety, compatibility, and evidence-backed verification. Use for ordinary feature, maintenance, refactoring, or known-root-cause fix work when no narrower skill governs the task. Do not use for unknown-cause diagnosis, explicit TDD, dependency-only changes, contract migrations, or broad architecture audits; use the matching specialized skill instead."
---

# Language-Agnostic Coding Practices

Deliver the smallest coherent change that satisfies the requested behavior and
fits the existing system. Preserve current contracts unless the task explicitly
requires a break.

Read `references/evidence.md` when a principle materially affects architecture,
security, compatibility, dependencies, or a disputed practice. Use
`$testing-practices` when test design is a substantial part of the task.

## Establish the Change Contract

Identify the requested behavior, acceptance evidence, affected callers, and
explicit exclusions. Read only the instructions, code, configuration, contracts,
and tests needed to change the behavior safely.

Reproduce a reported defect before changing production behavior when practical.
If the cause is unknown, switch to the diagnostic workflow rather than guessing
or applying speculative fixes.

## Use Principles as Decision Rules

Apply KISS by choosing the least complex design that still handles required
behavior, failures, compatibility, and security. Simplicity does not justify
omitting necessary safeguards.

Apply YAGNI by declining unused configuration, extension points, factories,
interfaces, plugin systems, fields, or generalized workflows. Add flexibility
only for a current caller, demonstrated variation, or authorized migration.

Apply DRY to duplicated knowledge or policy that must change together. Do not
merge code that merely looks similar but represents independently changing
concepts.

Apply DDD only where domain complexity warrants it. Use the language of the
relevant domain, keep each model internally consistent, and translate explicitly
at real context boundaries. Do not impose aggregates, repositories, services, or
other tactical patterns on simple technical work.

Treat SOLID and similar heuristics as contextual design vocabulary, not
language-independent laws. Introduce a boundary only when it hides real
complexity, serves real callers, or isolates an external or variable dependency.

## Protect Boundaries

Treat user input, files, environment values, network responses, tool outputs,
stored data, and third-party payloads as untrusted until validated. Check syntax,
semantics, authorization, and relevant invariants before relying on a value.
Static types and type assertions are not runtime validation.

Preserve public API, event, persistence, configuration, and serialized-data
contracts. Inspect real consumers before changing a shared shape. Use compatible
evolution or the migration workflow when old and new states must coexist.

Return stable caller-safe errors and keep sensitive diagnostics in protected
telemetry. Do not expose credentials, tokens, personal data, internals, or raw
untrusted values in errors or logs. Add observability only for material failure
modes and sanitize logged data.

Do not bypass security controls, search credential stores, or transfer
credentials or sensitive data unless the user explicitly authorizes that exact
action.

## Implement the Smallest Complete Change

Follow supported versions, repository conventions, types, error handling, and
existing abstractions. Prefer a maintained existing capability over duplicate
local machinery when it reduces total risk.

Add or change a dependency only for a real capability after checking project
compatibility, maintenance, security, licensing, and transitive impact. Use the
dependency-change workflow when the dependency itself is the task.

Keep behavior changes separate from broad cleanup when feasible. Include only
the enabling refactor needed to make the requested change safe and clear. Stop
when further work is speculative or unrelated.

Use names and structure to explain what the code does. Add concise comments for
non-obvious rationale, invariants, compatibility constraints, or trade-offs that
cannot be made clear in code. Do not narrate the implementation.

Update in-scope documentation only when the change alters a documented public
contract or how users build, test, operate, or release the system.

## Preserve Verification Integrity

Treat tests, fixtures, evaluators, coverage gates, CI configuration, and test
commands as evidence. Do not delete, skip, mute, weaken, filter, or bypass them
to make a change pass.

Do not hard-code visible examples, branch on test names or fixtures, read
evaluator internals, add test-only production paths, mock the behavior under
test, or replace a real oracle with a snapshot of current output.

Change tests only when the requested contract changes or the existing test is
proven incorrect. Review test changes separately from production changes and
state why each assertion changed.

## Verify and Finish

Run the narrowest relevant check after the final edit, then expand according to
risk across tests, types, lint, builds, runtime behavior, security boundaries,
and affected integrations. Inspect the final diff for scope expansion,
compatibility breaks, weakened evidence, unsafe data handling, and unnecessary
complexity.

Report only commands actually run and outcomes actually observed. If a check
cannot run, name the limitation and the strongest remaining evidence.

Finish only when the requested behavior works, required contracts and safeguards
hold, relevant checks pass, the evidence has not been weakened, and no
speculative machinery remains.
