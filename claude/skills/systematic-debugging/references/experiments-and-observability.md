# Experiments and observability

## Build a discriminating experiment

For each hypothesis, write:

- causal claim and violated invariant;
- observations it explains and observations against it;
- one variable to change or observe;
- predicted result if true and if false;
- measurement and stopping rule;
- confounders and environment controls;
- cleanup and safety boundary.

Choose the experiment with the highest expected information per unit cost and risk. Do not run several patches together or interpret an unpredicted outcome after the fact as confirmation.

## Reduce a failure

Minimize along one dimension at a time:

- input or dataset;
- operation sequence;
- dependency or commit range;
- process or service topology;
- concurrency and timing schedule;
- configuration, feature flags, locale, timezone, or permissions;
- browser, operating system, architecture, or runtime version.

Keep a deterministic predicate for `fails` versus `passes`. Use `git bisect` only when known-good and known-bad revisions exist and the predicate is reliable. Use delta-debugging-style reduction when a large input or change set can be split and tested; account for interacting fragments that do not fail independently.

## Instrument without changing the bug

- Prefer existing metrics, traces, logs, profiles, dumps, and database or queue diagnostics before adding probes.
- Use monotonic clocks for durations and wall-clock timestamps for correlation. Record timezone and clock source.
- Preserve request, trace, job, message, and actor-safe correlation across boundaries.
- Add structured events around state transitions, ownership changes, retries, deadlines, queueing, locks, and external effects.
- Bound log and trace volume, redact secrets and personal data, and avoid logging entire payloads.
- Check whether instrumentation changes scheduling, buffering, optimization, memory layout, or timeout behavior.
- Remove temporary probes after the experiment unless they provide durable, low-cost operational value.

## Debug distributed paths

Build a timeline from independently observed facts:

- trace context and request identifiers;
- send, receive, enqueue, dequeue, start, commit, publish, acknowledge, retry, timeout, and cancel events;
- service and dependency versions;
- authoritative state transitions and transaction outcomes;
- queue lag, clock skew, sampling, dropped telemetry, and log ingestion delay.

Do not infer causal order from wall-clock timestamps alone when clocks or ingestion can differ. Trace Context propagates identity, not truth, completeness, or guaranteed sampling.

## Debug performance

1. Define workload, environment, baseline, percentile or throughput, resource budget, and regression threshold.
2. Separate latency from throughput and cold from warm behavior.
3. Measure CPU, allocation, memory, I/O, database, network, lock, queue, garbage collection, and scheduler evidence before choosing a bottleneck.
4. Use a profiler or tracing tool appropriate to the exact runtime; sampling and instrumentation have different overhead and blind spots.
5. Change one limiting factor, repeat enough runs, and report variation rather than one best result.
6. Recheck correctness, resource use, and representative workloads after optimization.

## Preserve incident evidence

Capture exact versions, configuration, sanitized errors, timestamps, trace IDs, inputs, deployment events, and affected scope before restarting or clearing state when safe. Respect incident authorization, privacy, legal hold, and retention. A restart may be necessary containment, but record what evidence it destroys and do not call it root-cause resolution.
