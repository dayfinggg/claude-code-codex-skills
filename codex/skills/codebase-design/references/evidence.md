# Evidence for Codebase Design

Use this reference when a boundary or abstraction choice is consequential.

## Applied principles

1. Hide decisions likely to change behind a small interface rather than grouping by execution order.
2. Compare alternatives against concrete quality attributes and trade-offs.
3. Treat coupling, scattered change, and repeated maintenance effort as evidence; do not infer architectural debt from style or age alone.
4. Prefer bounded modular improvements over disruptive optimization of the whole structure.

Parnas established information hiding as a criterion for decomposing systems into modules:

- [On the Criteria To Be Used in Decomposing Systems into Modules](https://www.cs.umd.edu/class/spring2003/cmsc838p/Design/criteria.pdf)

The SEI Architecture Tradeoff Analysis Method evaluates architectural decisions through competing quality attributes, risks, sensitivity points, and trade-offs:

- [Architecture Tradeoff Analysis Method](https://insights.sei.cmu.edu/library/the-architecture-tradeoff-analysis-method/)

An empirical study across different systems found tightly coupled files cost more to maintain:

- [Technical debt and system architecture: the impact of coupling on defect-related activity](https://doi.org/10.1016/j.jss.2016.06.007)

Research on cohesion and coupling also reports that structural optimization can be highly disruptive, supporting smaller evidence-backed changes:

- [An Empirical Study of Cohesion and Coupling](https://oro.open.ac.uk/49002/)
