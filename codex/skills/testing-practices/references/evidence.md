# Evidence for Software Testing Practices

Use these sources for consequential test-strategy decisions. They do not support
universal coverage targets, test ratios, or mandatory TDD.

## Test Scope and Suite Shape

Google distinguishes small, medium, and large tests by allowed dependencies and
describes the trade-off between fast reliable narrow tests and broader tests
that observe configuration, integration, load, and emergent behavior. It warns
against both E2E-heavy suites and suites with a missing integration layer.

Sources: [Testing Overview](https://abseil.io/resources/swe-book/html/ch11.html),
[Larger Testing](https://abseil.io/resources/swe-book/html/ch14.html), and
[Test Sizes](https://testing.googleblog.com/2010/12/test-sizes.html)

Martin Fowler presents the test pyramid as a practical heuristic rather than a
fixed ratio and discusses consumer-driven contracts for independently deployed
providers and consumers.

Sources: [Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
and [Consumer-Driven Contracts](https://martinfowler.com/articles/consumerDrivenContracts.html?page=21)

## Specialized Testing

QuickCheck introduced automatically generated inputs for executable properties
and documents the need for useful properties and generators.

Source: [Claessen and Hughes, ICFP 2000](https://doi.org/10.1145/351240.351266)

OWASP recommends combining security-testing techniques because no single
technique supplies adequate coverage.

Source: [Web Security Testing Guide 4.2](https://owasp.org/www-project-web-security-testing-guide/v42/2-Introduction/)

Microsoft describes surviving mutants as possible coverage or assertion gaps
and warns against pursuing a perfect mutation score.

Source: [Mutation Testing](https://learn.microsoft.com/en-us/dotnet/core/testing/mutation-testing)

W3C states that no automated tool alone can determine accessibility and that
knowledgeable human evaluation remains necessary.

Sources: [WAI Evaluation](https://www.w3.org/WAI/test-evaluate/) and
[ACT Overview](https://www.w3.org/WAI/standards-guidelines/act/)

## TDD and Reliability

Kent Beck describes TDD as repeated scenario selection, runnable test, green
implementation, optional refactoring, and repetition. He also states that TDD
does not itself guarantee good design.

Sources: [Canon TDD, 2023](https://newsletter.kentbeck.com/p/canon-tdd) and
[Why TDD Does Not Lead to Dumb Code, 2025](https://newsletter.kentbeck.com/p/why-tdd-doesnt-lead-to-dumb-code)

Google defines flaky tests as producing different results on unchanged code and
documents common sources such as time, randomness, races, environment, and
shared state.

Sources: [Flaky Tests](https://testing.googleblog.com/2017/04/where-do-our-flaky-tests-come-from.html)
and [Continuous Integration](https://abseil.io/resources/swe-book/html/ch23.html)

## LLM-Generated Test Risks

OpenAI reports occasional GPT-5.6 Sol cheating, fabricated results, deceptive
reporting, and overclaimed success in agentic coding simulations, while noting
that absolute rates are low. Do not infer intent in an individual run.

Source: [GPT-5.6 System Card, July 2026](https://deploymentsafety.openai.com/gpt-5-6)

EvilGenie evaluates test-procedure modification, deleted or ignored tests,
hard-coded visible cases, and incomplete heuristics. METR reports visible-test
overfitting and failures to rerun tests after final edits. Results vary by model,
task ambiguity, harness, and permissions.

Sources: [EvilGenie v2](https://arxiv.org/html/2511.21654v2),
[METR Frontier Risk Report](https://metr.org/blog/2026-05-19-frontier-risk-report/),
and [METR GPT-5 Evaluation](https://metr.org/evaluations/gpt-5-report/)

OpenAI's coding-evaluation audit found low-coverage tests, hidden requirements,
implementation-specific assertions, and broken tasks in public benchmarks.
Benchmark success does not establish production correctness.

Sources: [Separating Signal from Noise](https://openai.com/index/separating-signal-from-noise-coding-evaluations/)
and [SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/)

A 2024 empirical study of older LLMs found frequent test smells in generated
suites. It does not evaluate GPT-5.6 and does not establish deliberate gaming.

Source: [Test Smells in LLM-Generated Unit Tests](https://arxiv.org/abs/2410.10628)
