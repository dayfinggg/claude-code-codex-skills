# Evidence for Architecture Assessment

Use this reference when ranking friction or refactoring candidates.

## Applied principles

1. Start from repeated change cost, defect activity, duplicated policy, or difficult verification rather than a universal ideal.
2. Trace structural dependencies and change propagation before proposing a boundary.
3. Evaluate each candidate against stakeholder quality attributes, migration cost, and expected reduction in future effort.
4. Rank a few bounded candidates; metrics are signals to investigate, not self-justifying scores.

The SEI ATAM frames architecture evaluation around scenarios, quality attributes, risks, sensitivity points, and trade-offs:

- [Architecture Tradeoff Analysis Method](https://insights.sei.cmu.edu/library/the-architecture-tradeoff-analysis-method/)

Empirical work links tight file-level coupling with higher defect-related maintenance cost:

- [Technical debt and system architecture](https://doi.org/10.1016/j.jss.2016.06.007)

A longitudinal study measured architecture debt through coupling and architectural flaws before and after a major refactor, reinforcing the need for before/after evidence:

- [A Longitudinal Study of Identifying and Paying Down Architectural Debt](https://arxiv.org/abs/1811.12904)

SEI case evidence shows missed architectural dependencies can make change impact materially larger than expected:

- [Missed Architectural Dependencies](https://insights.sei.cmu.edu/library/missed-architectural-dependencies-the-elephant-in-the-room/)
