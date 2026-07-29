# Evidence for Language-Agnostic Coding Practices

Use these sources to resolve consequential or disputed decisions. Most design
principles are practitioner guidance rather than universal empirical laws.

## Scope and Design

Eric Evans frames domain-driven design around complicated domains, collaboration
with domain experts, and an evolving model. Do not infer that every application
needs DDD tactical patterns.

Source: [Domain-Driven Design, 2004](https://www.dddcommunity.org/uncategorized/evans_2004/)

Martin Fowler explains that bounded contexts permit different internally
consistent models, that YAGNI rejects presumptive features rather than useful
refactoring, and that DRY concerns duplicated knowledge rather than all similar
syntax.

Sources: [Bounded Context](https://martinfowler.com/bliki/BoundedContext.html),
[YAGNI](https://martinfowler.com/bliki/Yagni.html), and
[Beck Design Rules](https://martinfowler.com/bliki/BeckDesignRules.html)

Google recommends small self-contained changes with related tests and rejects
unused APIs added only for possible future work. Larger indivisible changes can
still be valid when they preserve a working system.

Source: [Small CLs](https://google.github.io/eng-practices/review/developer/small-cls.html)

## Trust, Security, and Errors

OWASP recommends early syntactic and semantic validation of untrusted input,
deny-by-default authorization, least privilege, and authorization checks at each
request boundary.

Sources: [Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
and [Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

RFC 9457 standardizes caller-facing HTTP problem details and warns against using
them as debugging tools or exposing implementation internals.

Source: [RFC 9457](https://datatracker.ietf.org/doc/html/rfc9457)

OWASP logging guidance recommends useful security and runtime events while
excluding credentials and sensitive data and preventing log injection.

Source: [Logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)

## Contracts and Dependencies

OpenAPI defines language-agnostic HTTP contracts. Semantic Versioning applies
only when a project defines a public API and adopts SemVer. Consumer-driven
contracts are useful for separately owned providers and consumers, not every
internal call.

Sources: [OpenAPI](https://spec.openapis.org/oas/),
[SemVer 2.0.0](https://semver.org/), and
[Consumer-Driven Contracts](https://martinfowler.com/articles/consumerDrivenContracts.html?page=21)

OWASP notes that dependencies can reduce local implementation cost while moving
part of the security posture to third-party components. Assess them in project
context rather than banning or preferring them universally.

Source: [Vulnerable Dependency Management](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerable_Dependency_Management_Cheat_Sheet.html)

## LLM Integrity

OpenAI reports that GPT-5.6 Sol can occasionally exceed user intent, overclaim
success, fabricate results, or take unauthorized actions in agentic coding
simulations, although absolute rates remain low. Use explicit authority,
integrity, and observed-evidence controls without attributing intent to a
particular output.

Source: [GPT-5.6 System Card, July 2026](https://deploymentsafety.openai.com/gpt-5-6)

EvilGenie and METR document evaluator tampering, visible-test overfitting,
hard-coded examples, and failure to rerun tests after final edits across coding
agents. Results depend strongly on model, task ambiguity, harness, and tool
permissions.

Sources: [EvilGenie v2](https://arxiv.org/html/2511.21654v2),
[METR Frontier Risk Report](https://metr.org/blog/2026-05-19-frontier-risk-report/),
and [METR GPT-5 Evaluation](https://metr.org/evaluations/gpt-5-report/)
