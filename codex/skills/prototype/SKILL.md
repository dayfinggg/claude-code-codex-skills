---
name: prototype
description: Build a disposable, runnable experiment that answers one material design question about behavior, state, integration feasibility, or user interface. Use when the user explicitly requests a prototype, spike, proof of concept, or UI alternatives, or when an authorized implementation task contains an important question that inspection cannot resolve safely. Do not use during plan-only work without explicit permission, for production delivery, or when documentation and existing code already establish the answer.
---

# Prototype

Create the smallest runnable experiment that can produce evidence for one decision. Keep the answer; do not let experimental code silently become production code.

## Establish the Question

Write one falsifiable question and the evidence that would answer it.

Classify it:

- **Logic or state:** determine whether rules, transitions, invariants, or interactions behave coherently.
- **Interface or UI:** compare materially different interaction or presentation choices.
- **Integration feasibility:** verify that a library, protocol, platform, or boundary can support the required behavior.

Do not start until the prototype has one primary question. If several decisions are independent, split them into separate experiments.

## Respect the Prototype Contract

- Do not create a prototype during a plan-only request unless the user explicitly authorizes the experiment.
- Use the operating system's temporary directory by default.
- Place it in the workspace only when access to the real build, route, components, or configuration is necessary and the task authorizes changes.
- Name and label workspace artifacts clearly as prototypes.
- Do not create branches, commits, dependencies, deployments, external resources, or persistent data without explicit authorization.
- Use scratch data and reversible local state.
- Do not modify production behavior to support the experiment.

## Reuse the Existing Environment

Inspect the repository's runtime, package manager, components, fixtures, conventions, and available commands. Reuse existing dependencies and tooling.

Avoid installing a framework or building infrastructure for a question that a small script, local route, test harness, or temporary component can answer.

Provide one command that starts or runs the experiment.

## Build Only the Required Fidelity

Make the prototype complete and functional for the question it answers. Exclude production concerns that do not affect the result, such as:

- generalized abstractions;
- exhaustive error handling;
- persistence unrelated to the decision;
- broad test coverage;
- production observability;
- compatibility beyond the evaluated path;
- visual polish unrelated to the UI choice.

Do not use placeholders for behavior that the decision depends on.

## Prototype Logic and State

- Exercise difficult transitions, invalid inputs, repeated actions, concurrency, and recovery when relevant.
- Show the full relevant state after each action.
- Make assumptions and invariants visible in the experiment output.
- Compare alternative state models using the same scenarios.
- Prefer a small interactive CLI or deterministic harness over a large application shell.

## Prototype Interfaces and UI

- Produce at least two materially different options when the question is comparative.
- Keep options reachable from one simple entry point.
- Reuse the project's design system when visual fidelity affects the decision.
- Make important states visible, including loading, empty, error, success, and constrained layouts when relevant.
- Optimize for learning, not decoration.

## Prototype Integration Feasibility

- Verify the exact installed or documented versions.
- Exercise the real boundary with the smallest safe input.
- Capture response shape, errors, limits, latency, and lifecycle behavior that affect the decision.
- Avoid live writes, paid actions, or production systems unless the user explicitly authorizes them.

## Evaluate the Evidence

Run the experiment and record:

- the question;
- the tested scenarios or alternatives;
- the observed result;
- the decision supported by the evidence;
- limitations that prevent generalizing the result;
- what must change in the production design.

Do not call the experiment successful merely because it runs.

## Close the Experiment

- Keep temporary artifacts long enough for the user to inspect them.
- Report their absolute location and the run command.
- Do not merge or copy prototype code into production automatically.
- If implementation follows, transfer the validated decision and rebuild production-quality code under the normal implementation and verification workflows.
- Remove workspace prototype artifacts only when the user requests cleanup or the authorized workflow explicitly makes them disposable.

## Completion Standard

Finish only when the prototype runs, directly exercises the material question, produces interpretable evidence, and remains clearly separated from production code and state.
