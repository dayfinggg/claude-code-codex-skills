---
name: review-production-readiness
description: Review and improve the operational readiness of a service, API, worker, migration, infrastructure change, or release for production rollout. Use when the user asks for a go-live or readiness decision, or when delivering a new production service, public launch, deployment-path change, high-risk data migration, or change that materially affects capacity, external-service failure modes, observability, or recovery. Do not use for local-only libraries, routine implementation or code review without a rollout-readiness objective, contract-migration design, or active incident response.
---

# Review Production Readiness

Determine whether the changed system can be deployed, observed, operated,
recovered, and owned safely in its real production environment.

## Respect the Delivery Contract

- For a readiness review, work read-only and report evidence and blockers.
- For an authorized implementation task, fix readiness gaps only when they are
  required by the requested production outcome and remain in scope.
- Do not invent availability targets, traffic forecasts, retention policy,
  ownership, compliance requirements, or rollback guarantees.
- Reuse established runbooks, service standards, SLOs, deployment mechanisms,
  and observability conventions before proposing new ones.

## Define the Production Surface

Identify:

- critical user and operator journeys;
- runtime, regions, tenants, traffic shape, and data sensitivity;
- upstream and downstream dependencies;
- stateful components and irreversible effects;
- deployment owner, operational owner, and support path;
- existing reliability objectives and release criteria.

When a material target or ownership decision is missing, make the gap explicit.
Ask only if it blocks a sound readiness decision.

## Trace Failure and Degradation

Map the important request, event, and data flows. For each critical dependency
or state transition, verify:

- timeouts, cancellation, bounded retries, and retry safety;
- idempotency and duplicate handling;
- overload behavior, backpressure, queue limits, and load shedding;
- partial failure, dependency unavailability, and degraded modes;
- startup, shutdown, restart, replay, and recovery behavior;
- consistency, ordering, concurrency, and data-loss boundaries.

Prefer a specific failure path and evidence over a generic reliability
checklist. Distinguish a release blocker from a hardening opportunity.

## Verify Data and Compatibility

For schema, storage, protocol, or configuration changes, establish:

- backward and forward compatibility during mixed-version operation;
- migration rehearsal, duration, validation, and restart behavior;
- backups or recovery points where applicable;
- rollback or roll-forward strategy after data has changed;
- handling of old messages, clients, workers, and cached state;
- cleanup timing for obsolete fields, flags, and compatibility code.

Do not call a migration reversible when only the application binary can be
rolled back.

## Verify Capacity and Performance

Use measurements, load evidence, existing capacity models, or representative
benchmarks. Check:

- expected peak and growth assumptions;
- resource limits and saturation signals;
- latency and throughput on critical paths;
- queue growth, connection pools, fan-out, and external quotas;
- safe behavior when estimates are wrong.

Do not require elaborate load testing for a low-risk change, but do not infer
capacity from local functional tests.

## Verify Observability and Operations

Ensure operators can detect and diagnose user impact:

- service-level indicators reflect critical journeys;
- logs, metrics, traces, and audit events preserve useful context without
  leaking secrets;
- alerts are actionable, symptom-oriented, owned, and tied to a response;
- dashboards distinguish healthy, degraded, and failing behavior;
- runbooks cover likely mitigations and dangerous actions;
- feature flags, kill switches, or operational controls have known owners and
  safe defaults.

## Verify Rollout and Recovery

Confirm the release path includes the narrowest suitable safeguards:

- pre-deployment checks and a reproducible artifact;
- staged, canary, tenant-limited, or otherwise bounded exposure when risk
  warrants it;
- comparison against a concurrent control where practical, with one release
  candidate varied at a time;
- explicit success and abort signals;
- tested rollback or roll-forward commands;
- post-deployment verification of user-visible behavior;
- cleanup and follow-up conditions after stabilization.

Review security-sensitive trust boundaries with a security specialist and use
an independent delivery verifier when delegation materially improves
confidence. Keep scopes non-overlapping and synthesize evidence in the main
task.

## Produce the Decision

Classify the outcome as:

- `Ready`: required evidence exists and no material blocker remains.
- `Conditionally ready`: named preconditions must be completed before rollout.
- `Not ready`: a concrete failure, recovery, data, security, or ownership gap
  makes rollout unsafe.

Report blockers first, then required evidence, safe rollout guidance, and
unverified assumptions. Do not bury a missing rollback or observability path in
general recommendations.

## Completion Standard

Finish only when critical journeys and failure modes have evidence, data and
compatibility risks have a recovery strategy, operators can detect and respond
to impact, rollout has success and abort criteria, and the readiness decision is
explicit.
