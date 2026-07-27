# Agent Routing

Choose a role from the work product, not from job-title resemblance. Verify which agent types are available in the active Claude Code environment.

| Role | Best use | Required return | Do not use for |
|---|---|---|---|
| `Explore` | A specific repository question, caller or data-flow trace, or read-heavy scan | Direct answer with exact paths, symbols, and decisive evidence | Broad open-ended audits, implementation, or duplicate exploration |
| `general-purpose` | A bounded implementation with exclusive file or module ownership | Changed files, behavior delivered, commands run, results, and remaining integration needs | Overlapping writes, unresolved design, or final acceptance |
| `docs-researcher` | Current documentation, standards, releases, compatibility, or external technical evidence | Applicable version/date, primary references, conclusion, and evidence gaps | General web summaries or repository questions |
| `quality-reviewer` | Correctness, regressions, contract violations, and missing tests in a defined change | Findings ordered by impact with paths, lines, causal evidence, and reproduction where possible | General architecture taste or implementing fixes |
| `security-auditor` | Concrete trust boundaries, authorization, injection, secrets, privacy, or abuse surfaces | Exploit preconditions, affected boundary, evidence, impact, and smallest mitigation direction | Generic security checklists or unrelated code |
| `interface-reviewer` | Rendered UI quality, responsive behavior, accessibility, interaction states, and product fidelity | Screens or states inspected, reproducible findings, impact, and exact locations | Backend logic or design from source code alone |
| `delivery-verifier` | Independent acceptance, tests, builds, migrations, runtime behavior, and delivery readiness | Criteria-to-evidence mapping, commands and results, blockers, and final readiness judgment | Source implementation or substituting missing authority |

Route by risk:

1. Use `Explore` before an implementation agent only when a specific repository unknown blocks safe ownership.
2. Use `docs-researcher` when current external behavior controls the implementation.
3. Add security, interface, or quality review only for the matching surface.
4. Use `delivery-verifier` after integration when acceptance deserves an independent gate.
5. Keep product decisions and synthesis in the main session.

Avoid role inflation. A change does not need every reviewer. One agent may cover a coherent lane, but do not combine implementation and supposedly independent verification in the same lane.
