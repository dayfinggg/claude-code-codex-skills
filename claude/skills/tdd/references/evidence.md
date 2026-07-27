# Evidence for Test-Driven Development

Use this reference when deciding whether strict red-green-refactor fits the task or when making claims about its effects.

## Applied principles

1. Use TDD when explicitly requested or required, not as a universal default.
2. Keep cycles small and require the red signal to fail for the intended missing behavior.
3. Test stable observable contracts and refactor only under a passing safety net.
4. Prefer a stronger non-test signal when the behavior is better verified by compilation, schema validation, visual inspection, migration rehearsal, or measurement.

A meta-analysis synthesized 27 TDD studies and found effects varied across quality and productivity contexts:

- [The Effects of Test-Driven Development on External Quality and Productivity](https://doi.org/10.1109/TSE.2012.28)

Controlled and longitudinal studies report mixed results rather than a universal productivity or quality advantage:

- [Impact of TDD on productivity, code and tests](https://doi.org/10.1016/j.infsof.2011.02.002)
- [Studying TDD over a six-month time span](https://arxiv.org/abs/2105.03312)

The skill therefore treats TDD as a disciplined workflow with verifiable cycles, not as an unsupported guarantee of better outcomes.
