# Primary references

Accessed 2026-07-13. Match living manuals and telemetry specifications to the deployed tool version before using exact commands or fields.

| Source | Publisher/owner and currentness | Governed topic |
| --- | --- | --- |
| [Simplifying and Isolating Failure-Inducing Input](https://doi.org/10.1109/32.988498) | Andreas Zeller and Ralf Hildebrandt, IEEE TSE 2002, original peer-reviewed paper | Delta debugging and systematic reduction of failure-inducing input |
| [git-bisect documentation](https://git-scm.com/docs/git-bisect) | Git project, living manual | Binary search across revisions, automated predicates, skip, replay, and terms |
| [NIST/SEMATECH e-Handbook: Process Improvement](https://www.itl.nist.gov/div898/handbook/pri/pri.htm) | NIST, stable engineering statistics handbook | Experimental design, measurement, variation, and process improvement concepts |
| [OpenTelemetry specification](https://opentelemetry.io/docs/specs/otel/) | CNCF OpenTelemetry, version 1.59.0 at review; versioned and evolving | Telemetry data model, context, signals, SDK, and protocol behavior |
| [W3C Trace Context](https://www.w3.org/TR/trace-context/) | W3C Recommendation, 2021-11-23 | Interoperable trace identity propagation and privacy/security considerations |
| [Monitoring distributed systems](https://sre.google/sre-book/monitoring-distributed-systems/) | Google SRE book, stable published chapter | Symptoms versus causes, latency, traffic, errors, saturation, and actionable monitoring |
| [Debugging with GDB](https://sourceware.org/gdb/current/onlinedocs/gdb.html/) | GNU/Sourceware, continuously generated current manual; 18.0.50 development build at review | Native debugging commands and semantics; match the installed GDB version rather than the moving URL |

The scientific and telemetry sources improve experiment quality; they do not establish a root cause without a reproduction, causal mechanism, and observed discriminating evidence.
