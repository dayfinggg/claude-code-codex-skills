---
name: incident-postmortem
description: Create an evidence-backed, blameless postmortem after a production incident has stabilized. Use when the user asks to review a stabilized outage or degradation, data loss, incident-driven emergency rollback or manual intervention, or a material monitoring failure that affected detection or response. Do not implicitly invoke during active response or for routine failed deployments or alert tests; during an active incident, preserve evidence only when explicitly requested, and do not operate production or coordinate response.
---

# Incident Postmortem

Turn incident evidence into shared understanding and corrective actions that reduce recurrence, detection time, and recovery time.

## Confirm the boundary

- Verify that the incident is stabilized before conducting the full review.
- During an active incident, preserve timestamps, commands, alerts, graphs, deployments, logs, and decisions without distracting responders.
- Do not operate production, contact people, publish the postmortem, or create tracker items without explicit authorization.
- Protect secrets, personal data, customer data, and privileged operational details.

## Establish the evidence

- Use a single declared timezone and precise timestamps.
- Gather monitoring data, logs, traces, deploy and configuration history, tickets, communication records, and relevant code changes.
- Separate observed facts, credible inferences, and unknowns.
- Quantify impact only from defensible evidence: affected users or requests, duration, data integrity, regions, products, and business consequences.
- If the technical cause remains uncertain, route the unresolved investigation to `diagnosing-bugs`.

## Reconstruct the timeline

- Cover the first known contributing condition, trigger, detection, escalation, diagnosis, mitigation, recovery, and confirmation.
- Include important decision points and the information available at the time.
- Distinguish incident duration from time to detect, acknowledge, mitigate, and fully recover.
- Do not fill timeline gaps with invented precision.

## Analyze causes and defenses

- Separate the triggering event, proximate technical cause, and contributing systemic conditions.
- Examine design assumptions, dependencies, change controls, capacity, observability, runbooks, testing, access, and recovery mechanisms where evidence makes them relevant.
- Identify what worked, what failed, where responders relied on luck, and whether the pattern has happened before.
- Avoid stopping at operator error. Explain why the system allowed an ordinary human action or expected failure to cause the observed impact.

## Create durable actions

- Prefer actions that prevent the failure, detect it earlier, limit blast radius, or shorten recovery.
- Give each action a measurable end state and evidence of completion.
- Assign an owner, priority, and due date only when the organization or user provides them; otherwise mark them as decisions still needed.
- Reject vague actions such as “be more careful,” “monitor closely,” or training without a concrete system change.
- Keep the action set small enough to finish and trace every action to a documented contributing factor.
- Use `to-tickets` only when the user requests a backlog or external work items.

## Write blamelessly

- Describe decisions in the context of the information, incentives, interfaces, and safeguards that existed at the time.
- Name systems and conditions rather than blaming individuals.
- Preserve accountability through clear facts, ownership of follow-up, and verification of corrective work.
- Record disputed claims and missing evidence explicitly.

## Completion standard

A postmortem is complete when it states the impact, evidence-backed timeline, cause and contributing conditions, effective and failed defenses, and a bounded set of measurable corrective actions without inventing facts or assigning personal blame.
