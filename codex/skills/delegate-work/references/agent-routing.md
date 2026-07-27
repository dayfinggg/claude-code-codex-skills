# Agent Routing

Choose a role from the work product, not from job-title resemblance. Verify which roles are actually available before routing.

| Role | Best use | Required return | Do not use for |
|---|---|---|---|
| `explorer` | A specific repository question, caller or data-flow trace, or read-heavy scan | Direct answer with exact paths, symbols, and decisive evidence | Broad open-ended audits, implementation, or duplicate exploration |
| `worker` | A bounded implementation with exclusive file or module ownership | Changed files, behavior delivered, commands run, results, and remaining integration needs | Overlapping writes, unresolved design, or final acceptance |
| `docs_researcher` | Current documentation, standards, releases, compatibility, or external technical evidence | Applicable version/date, primary references, conclusion, and evidence gaps | General web summaries or repository questions |
| `quality_reviewer` | Correctness, regressions, contract violations, and missing tests in a defined change | Findings ordered by impact with paths, lines, causal evidence, and reproduction where possible | General architecture taste or implementing fixes |
| `security_auditor` | Concrete trust boundaries, authorization, injection, secrets, privacy, or abuse surfaces | Exploit preconditions, affected boundary, evidence, impact, and smallest mitigation direction | Generic security checklists or unrelated code |
| `interface_reviewer` | Rendered UI quality, responsive behavior, accessibility, interaction states, and product fidelity | Screens or states inspected, reproducible findings, impact, and exact locations | Backend logic or design from source code alone |
| `delivery_verifier` | Independent acceptance, tests, builds, migrations, runtime behavior, and delivery readiness | Criteria-to-evidence mapping, commands and results, blockers, and final readiness judgment | Source implementation or substituting missing authority |
| `default` | A bounded lane that does not match a specialist and has a clear output contract | The task-specific evidence contract | Vague “help with this” work |

Route by risk:

1. Use an explorer before a worker only when a specific repository unknown blocks safe ownership.
2. Use a docs researcher when current external behavior controls the implementation.
3. Add security, interface, or quality review only for the matching surface.
4. Use a delivery verifier after integration when acceptance deserves an independent gate.
5. Keep product decisions and synthesis in the main task.

Avoid role inflation. A change does not need every reviewer. One agent may cover a coherent lane, but do not combine implementation and supposedly independent verification in the same lane.

Use the role's configured model and effort unless the user or applicable instructions require an override. This catalog assigns `docs_researcher` to the faster `gpt-5.6-terra` at medium effort for read-heavy evidence and assigns quality, security, interface, and delivery judgment to `gpt-5.6-sol` at high effort. Preserve that cost boundary instead of using the strongest setting for routine scans.
