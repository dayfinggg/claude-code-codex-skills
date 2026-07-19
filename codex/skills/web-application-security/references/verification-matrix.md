# Security verification matrix

## Evidence by control

| Area | Minimum evidence | Higher-risk evidence |
| --- | --- | --- |
| Threat model | Assets, flows, trust boundaries, abuse cases, owners | Cross-functional review and residual-risk acceptance |
| Authentication | Protocol/library configuration and negative tests | Recovery, factor change, replay, phishing-resistance, session-theft review |
| Authorization | Server-side policy tests for allowed and denied cases | Full actor/resource/tenant/field matrix and cross-tenant data tests |
| Session | Cookie/header inspection, rotation and logout tests | Revocation, concurrency, timeout, compromised-session exercise |
| Input/output | Boundary tests and safe-sink code review | Parser fuzzing, property tests, sanitizer bypass regression corpus |
| CSRF/CORS/CSP | Browser integration through real proxy/edge | Cross-origin matrix, report-only analysis, enforced CSP regression |
| Database/injection | Parameter binding and operator allowlist review | SAST plus targeted authorized dynamic tests |
| SSRF | Destination parser and egress policy tests | DNS rebinding, redirect, IPv4/IPv6, metadata and proxy integration tests |
| Upload/path | Type, size, name, containment, authorization tests | Bomb/parser, quarantine, scan failure, TOCTOU, download-origin tests |
| Secrets/crypto | Secret-source, redaction, key and algorithm review | Rotation/revocation drill and key-lifecycle review |
| Dependencies/build | Lockfile diff, SCA, CI permission review | Provenance/SBOM verification and isolated-build review |
| Configuration/deploy | IaC/config scan and effective header/TLS check | Staged production-like smoke, rollback, fail-closed exercise |
| Logging/privacy | Redaction tests, event coverage, access/retention review | Detection exercise, deletion/backup audit, incident evidence test |
| Abuse/availability | Limit and bounded-work tests | Load, queue, retry-storm, resource-exhaustion, graceful-degradation tests |

## ASVS workflow

1. Pin `OWASP ASVS 5.0.0`; do not silently use bleeding-edge content.
2. Select the verification level and requirements from the actual application risk, not convenience.
3. Look up each applicable requirement in the official version and record its exact identifier and text location. Never invent IDs from memory.
4. Link each requirement to its enforcement point and concrete evidence: test, configuration, review, scan result, operational monitor, or accepted residual risk.
5. Mark not-applicable items with a defensible scope reason, not a generic assertion.
6. Revisit the mapping when the trust boundary, identity model, sensitive data, architecture, dependency, or deployment changes.

ASVS alignment is verification evidence; it does not by itself establish regulatory compliance or certify the system.

## Tooling rules

- Run existing focused tests before adding tools. Add scanning only when the repository can own its configuration, triage, updates, and runtime cost.
- Pin analyzer and ruleset versions where reproducibility matters. Record the commit, artifact, configuration, and date for material assessments.
- Treat SAST, SCA, secret, container, IaC, DAST, and browser scanners as complementary signals with blind spots.
- Confirm findings through safe code and configuration analysis. Use dynamic testing only on explicitly authorized targets and data.
- Do not disable a rule globally to hide one false positive; narrow the suppression and document evidence in the tool's established format.
- Test security behavior, not only the presence of middleware or a header in source.
- Re-run the relevant checks after fixes and inspect the exact diff and effective deployed path.

## Failure and rollout review

- Verify dependency timeout, identity-provider outage, key rotation, stale session, invalid signature, storage outage, scanner failure, logging outage, and policy-service failure behavior.
- Decide where failing closed protects assets and where a controlled degraded mode prevents unsafe availability failure.
- Define security and user-impact metrics before rollout.
- Stage changes through the normal release controls. Avoid a rollback that restores the vulnerable path; prepare a forward fix or narrowly scoped containment.
- For a confirmed defect, identify affected versions, data, sessions, credentials, tenants, logs, and downstream artifacts; preserve evidence and follow the authorized disclosure process.

## Completion statement

Report what was observed, changed, and run. Separate:

- verified control behavior;
- unverified assumptions or environment gaps;
- scanner findings still requiring triage;
- residual risk and its owner;
- rollout or incident actions that require explicit authorization.

Never state that an application is secure, compliant, or breach-free from limited testing.
