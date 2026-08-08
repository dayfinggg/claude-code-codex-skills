# Concurrency and resilience

Use this reference when changing shared mutable state, asynchronous or background work, queues, networking, distributed coordination, retries, or resource lifecycle. Do not add locks, retries, workers, queues, service meshes, or distributed transactions to sequential local code without an evidenced need.

1. Define ownership of each task, resource, and mutable state transition. State who starts, joins, cancels, closes, releases, and observes failure; make every acquired permit, lock, handle, subscription, and task reach a terminal path.
2. Define atomicity, ordering, consistency, capacity, and progress requirements. Bound in-flight work and queues; choose an explicit block, reject, drop, coalesce, or spill policy from product requirements rather than allowing unbounded growth.
3. Propagate deadlines and cancellation across waits and calls. Specify behavior for timeout, caller cancellation, shutdown, worker failure, and a participant that never arrives. Avoid blocking I/O inside a critical section unless the invariant requires it.
4. Use retries only for identified transient failures. Bound attempts and total elapsed time, apply backoff and jitter when contention is possible, respect server guidance, and require idempotency or a deduplication key before retrying a side effect.
5. Define partial-success handling and recovery. Preserve enough state for reconciliation, make duplicate delivery and restart behavior explicit, and keep observability useful without recording secrets or sensitive payloads.
6. Verify the relevant failure modes with deterministic synchronization where possible: race detection, controlled scheduling, stress or property tests, cancellation and timeout tests, fault injection, saturation tests, and resource-leak checks. Avoid sleep-based timing assertions when a barrier, fake clock, hook, or bounded eventual assertion can observe the condition.

Measure the signal that represents the risk, such as maximum in-flight work, queue depth, permit balance, lock wait and hold time, cancellation latency, retry count, duplicate effects, reconciliation lag, or time to recover. Fairness, throughput, latency, and complexity are trade-offs, not universal maxima.

Primary basis: Allen B. Downey, *The Little Book of Semaphores*; NIST SP 800-204A and SP 800-204C; Google SRE guidance. Provenance is recorded in [sources](sources.md).
