# Evidence for Code Review

Use this reference when deciding review scope, finding quality, or output severity.

## Applied principles

1. Review behavior, design, complexity, tests, naming, documentation, and project rules in proportion to the changed surface.
2. Optimize for codebase health and actionable defects, not maximum comment count.
3. Keep findings specific, comprehensible, relevant to the change, and supported by a causal path.
4. Treat a large diff or unfamiliar file as a reason for focused context gathering, not speculative comments.

Google's reviewer guidance defines review dimensions and the standard of improving overall code health:

- [Google code review guide](https://google.github.io/eng-practices/review/)
- [The standard of code review](https://google.github.io/eng-practices/review/reviewer/standard.html)

Google's case study used 12 interviews, 44 survey responses, and logs from 9 million reviewed changes:

- [Modern Code Review: A Case Study at Google](https://research.google/pubs/modern-code-review-a-case-study-at-google/)

Microsoft's study analyzed about 1.5 million comments across five projects. Useful comments tended to identify defects, better solutions, or team-practice violations; usefulness declined as changes grew:

- [Characteristics of Useful Code Reviews](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/bosu2015useful.pdf)
