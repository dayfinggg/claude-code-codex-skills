# Performance engineering

Use this reference only for explicit optimization, a performance regression, a hot path, materially growing data, or a stated latency, throughput, memory, I/O, or cost constraint. Do not turn an ordinary small change into a benchmarking project.

1. Define the user-visible or operational outcome, metric, budget, representative workload, data distribution, environment, and correctness oracle. Include input growth and resource ceilings when algorithmic complexity or scaling is material.
2. Measure a baseline before editing. Keep workload and environment stable, account for warm-up and caches, repeat enough runs to observe variation, and record versions and configuration. One fast run is not evidence.
3. Locate the limiting resource with an appropriate profiler, trace, query plan, allocation report, counter, or complexity analysis. Distinguish CPU, waiting, locking, allocation, storage, network, serialization, and downstream limits instead of guessing.
4. Change the smallest evidenced bottleneck. Match data structures and algorithms to the operations and scale actually observed. Reject speculative caching, batching, parallelism, denormalization, or micro-optimization without a constraint and invalidation or failure model.
5. Repeat the same measurement after the change and compare absolute results, relative change, variation, errors, and correctness. Use relevant latency percentiles; pair throughput with saturation and errors; measure peak memory, allocations, or GC; and count I/O operations and volume when applicable.
6. Add a stable regression benchmark, budget check, or production signal when the risk will recur. If representative automation is infeasible, preserve the command, workload, environment, raw result, and limitation needed to repeat the comparison.

Preserve maintainability and compatibility unless the measured requirement justifies a trade-off. Never hard-code benchmark fixtures, hide work outside the measured interval, or report improvement from incomparable runs.

Primary basis: Jeff Erickson, *Algorithms*; Pat Morin, *Open Data Structures*; Google, *Software Engineering at Google*; Google SRE guidance. Provenance is recorded in [sources](sources.md).
