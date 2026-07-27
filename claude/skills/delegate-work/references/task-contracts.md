# Task Contracts

Use the shortest contract that prevents rediscovery, scope drift, and ambiguous completion.

## Read-only investigation

```text
Objective: Answer <one repository or external question>.
Why this role: <specific evidence or expertise needed>.
Scope: Inspect <paths, symbols, versions, or sources>.
Context: <verified facts and relevant artifacts>.
Do not: Edit files, widen the question, or repeat <other lane>.
Evidence: Return <paths/lines, commands/results, or primary citations>.
Done when: <the decision can be made or the evidence gap is precisely stated>.
Output: Conclusion first; decisive evidence; remaining uncertainty.
```

## Implementation

```text
Objective: Deliver <one observable behavior>.
Ownership: You may edit only <exclusive files or module>.
Context: <settled design, interfaces, constraints, dependencies>.
Shared workspace: Other agents are working here. Do not revert their edits; adapt to compatible changes and report conflicts.
Do not: Change <excluded files/behavior>, redesign settled decisions, commit, push, deploy, or publish.
Evidence: Run <verified focused checks> and report exact results.
Done when: <acceptance criteria and integration boundary>.
Output: Outcome; changed files; verification; integration needs or blockers.
```

## Independent review or verification

```text
Objective: Independently assess <defined diff, artifact, or acceptance criteria>.
Scope: <exact comparison or build>.
Perspective: <correctness, security, interface, or delivery>.
Do not: Edit source, accept claims without evidence, or report style preferences.
Evidence: Reproduce material findings and cite exact locations or command output.
Done when: Every scoped criterion or risk surface has a supported judgment.
Output: Findings first by impact; evidence; gaps; overall judgment.
```

Good contracts specify outputs, not a detailed thought process. Give agents freedom over local investigative steps while preserving authority, boundaries, and proof.
