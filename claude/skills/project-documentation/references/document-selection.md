# Document selection

Create a new artifact only when an audience has a recurring question that no authoritative existing artifact answers safely.

| Need | Artifact | Minimum content | Avoid when |
| --- | --- | --- | --- |
| Understand and start the project | `README` | Purpose, audience, prerequisites, verified quick start, checks, support links | A parent workspace README already routes readers correctly |
| Contribute repeatedly | `CONTRIBUTING` | Setup differences, workflow, checks, review, governance, releases | Rules already live in a short authoritative developer guide |
| Understand durable system structure | Architecture overview | Context, containers, ownership, data, communication, quality drivers, evolution links | Code and one short README section answer the need |
| Preserve a consequential decision | ADR | Context, decision, alternatives, consequences, status, validation, supersession | The choice is local, obvious, temporary, or already enforced by config |
| Operate or recover a system | Runbook | Trigger, access, diagnosis, action, verification, rollback, escalation | No recurring operational action exists |
| Explain a time-bounded change | Plan | Current evidence, steps, dependencies, risks, checks, rollout, completion | The change is small enough to execute directly |
| Coordinate evolving work | Roadmap | Outcome, non-goals, workstreams, owners, states, dependencies, evidence | An existing tracker is already authoritative |
| Delegate bounded work | Task packet | Inputs, ownership, forbidden actions, output, checks, merge point | Work cannot be isolated safely |
| Provide recurring agent context | Supported instruction file | Scoped commands, conventions, boundaries, validation, durable policy | The tool is not used or the guidance belongs in enforcement |
| Teach a concept | Explanation | Mental model, rationale, tradeoffs, links | The reader only needs steps or parameter reference |
| Perform a known goal | How-to | Prerequisites, ordered actions, verification, rollback | A generated CLI help or runbook is the better source |
| State a contract | Reference | Exact syntax, types, defaults, constraints, compatibility | A schema or generated reference can be authoritative |
| Onboard through practice | Tutorial | Controlled environment, learning goal, guided success | Production operations or exhaustive reference is the need |

## README minimum

- Say what the repository or package is and who should use it.
- State supported environment only when proven by manifests, CI, or policy.
- Give the shortest verified path from checkout to a meaningful success.
- Link to contribution, architecture, API, operations, security, and release docs only when they exist.
- Name support or ownership through an existing canonical mechanism; do not invent contacts.

Do not paste a full configuration reference, generated API, exhaustive directory tree, or roadmap into the README.

## Architecture documentation minimum

- Context: users and external systems.
- Containers or deployable units: responsibility, owner, data, and communication.
- Quality drivers and important constraints.
- Cross-cutting security, reliability, observability, and data decisions.
- Runtime and deployment realities when they affect understanding.
- Links to ADRs, schemas, runbooks, and fitness checks.

Use a diagram only if the same information is harder to scan as text. Attach a title, scope, legend when needed, and source so it can be updated.

## Runbook minimum

- Trigger and symptoms.
- Scope, prerequisites, permissions, environment, and danger level.
- Read-only diagnosis before mutation.
- Exact action with decision points and bounded blast radius.
- Success and failure signals.
- Rollback or containment.
- Escalation and evidence to preserve.
- Last verification mechanism or freshness trigger.

Require explicit authorization for destructive, irreversible, credential, production, or shared-infrastructure actions.

## Split or merge

Split when audience, purpose, owner, lifecycle, access sensitivity, or generation mechanism differs. Merge when two files repeat the same facts and always change together. Preserve stable incoming links with redirects or an index when the documentation system supports them.
