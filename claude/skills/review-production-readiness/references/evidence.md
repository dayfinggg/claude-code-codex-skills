# Evidence for Production Readiness

Use this reference for go-live criteria, operational ownership, rollout, or recovery decisions.

## Applied principles

1. Assess concrete critical journeys and failure paths, not a universal checklist.
2. Require evidence for capacity, observability, recovery, ownership, and data compatibility in proportion to risk.
3. Define rollout success and abort signals before exposure.
4. Treat readiness as a decision with blockers, not a score that can hide a missing recovery path.

Google SRE describes production readiness reviews as a mechanism for establishing reliability requirements and shared operational understanding:

- [Evolving SRE Engagement Model](https://sre.google/sre-book/evolving-sre-engagement-model/)

Launch planning and launch checklists cover capacity, architecture, failure modes, monitoring, emergency response, rollout, and ownership:

- [Production Launch Planning](https://sre.google/resources/practices-and-processes/production-launch-planning/)
- [Launch Coordination Engineering](https://sre.google/sre-book/launch-checklist/)

Checklists become stale when detached from system evidence. Reuse repository runbooks and standards, then trace the actual change and its production surface.
