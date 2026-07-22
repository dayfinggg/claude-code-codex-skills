# Verification evidence design

## Build a falsifiable matrix

For each acceptance criterion and material risk, record:

- the exact claim;
- the boundary or state where it could fail;
- the cheapest check capable of falsifying it;
- the expected oracle;
- the environment, version, data, and permissions required;
- the observed command or inspection result;
- residual coverage gaps and their impact.

Do not map several unrelated claims to one broad command unless its output proves each one. A build proves compilation and packaging, not user behavior, accessibility, migration safety, or production readiness.

## Check evidence integrity

- Record the command, working directory, relevant inputs, tool version, exit status, and meaningful output.
- Confirm the intended tests were collected and executed. Inspect filters, skips, quarantines, retries, shards, cache hits, and early termination.
- Use a clean or representative environment when environment drift is a risk. State when local-only evidence cannot cover CI, browser, operating system, architecture, or production topology.
- Distinguish the artifact tested from the artifact delivered. Verify generated bundles, images, packages, signatures, provenance, or deployment manifests when they differ from source.
- Preserve enough evidence to reproduce a failure without copying secrets, personal data, or excessive logs.
- For a flake, report attempt count and all outcomes; do not discard failures after a green rerun.

## Validate migrations and stored data

1. Inspect schema and data invariants, old and new readers/writers, affected rows, locks, transaction boundaries, and expected duration.
2. Test expand-migrate-contract ordering with mixed versions where relevant.
3. Run against representative volume and pathological records, not only an empty fixture.
4. Verify resumability, idempotency, rate limits, progress visibility, reconciliation, and failure cleanup.
5. Test the backup or recovery route and post-migration rollback semantics; code rollback alone may not restore data.
6. Confirm retention, deletion, audit, privacy, and downstream export obligations.

Never perform a production migration, restore, or destructive cleanup without exact authorization.

## Assess staged release evidence

- Define entry criteria, target cohort, baseline window, guardrail metrics, user-outcome metrics, stop thresholds, observation period, and decision owner before exposure.
- Compare like-for-like traffic and account for novelty, seasonality, sample size, delayed outcomes, and instrumentation drift.
- Verify telemetry from the delivered artifact and route, not only a local simulation.
- Keep rollback or containment compatible with data and messages already produced.
- Escalate when metrics disagree, the cohort is biased, or the signal cannot detect the expected failure.

Canarying reduces blast radius; it does not make an untested change safe.

## Independent evidence

Use a separate reviewer, implementation-independent oracle, consumer contract, restored backup, or production-like environment for claims whose failure is high-impact and hard to detect. Independence must target a shared blind spot; duplicating the same test with the same assumptions adds little confidence.

## Readiness record

Use `verified`, `failed`, `blocked`, and `not checked` consistently. Name the evidence and residual gap. Avoid a percentage score that lets a critical failure hide inside an average.
