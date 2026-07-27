# Evidence for Diagnosis

Use this reference for difficult reproduction, minimization, or causal isolation.

## Applied principles

1. Establish an executable failure signal before detailed theorizing.
2. Minimize the failing input, change, state, or interaction while preserving the symptom.
3. Test falsifiable hypotheses with one meaningful variable at a time.
4. Require a causal chain from trigger through incorrect behavior to the observed failure.

Delta Debugging systematically isolates failure-inducing circumstances and recommends automated simplification of failing tests:

- [Simplifying and Isolating Failure-Inducing Input](https://doi.org/10.1109/32.988498)
- [Finding Failure Causes through Automated Testing](https://arxiv.org/abs/cs/0012009)

Git's binary search supports locating a regression between a known good and bad commit when a reliable test command exists:

- [git bisect](https://git-scm.com/docs/git-bisect)

These techniques do not prove that every minimal reproducer is the root cause. Causal evidence still requires tracing the mechanism and ruling out relevant alternatives.
