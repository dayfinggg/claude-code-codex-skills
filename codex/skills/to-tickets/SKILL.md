---
name: to-tickets
description: Break an approved plan, specification, or substantial conversation into independently verifiable vertical-slice tasks with acceptance criteria and explicit blocking dependencies. Use when the user asks to create tickets, issues, implementation tasks, a dependency-aware backlog, or work units for multiple sessions or agents. Do not use before requirements are settled, for a simple single-session change, or to publish or modify an external tracker without explicit authorization.
---

# Create Tickets

Turn settled intent into the smallest set of independently executable tasks that can remain green as work progresses.

## Respect the Ticket Contract

- Draft tickets in the response by default.
- Create local files only when the user requests them or provides an established location.
- Publish or modify GitHub, Linear, Jira, or another tracker only with explicit authorization and an exact repository or project target.
- Never close, relabel, or modify a parent issue unless the user explicitly asks.
- Do not decompose unresolved product decisions into implementation guesses.

## Gather the Source of Truth

Read the complete approved plan, specification, issue, or conversation and its accepted decisions. Inspect the repository enough to understand:

- current architecture and domain vocabulary;
- existing seams and test surfaces;
- data, API, migration, and compatibility boundaries;
- relevant implementation and verification commands;
- expected blast radius.

Use stable component names and verified paths where they help execution. Avoid brittle line numbers and speculative file lists.

## Identify Required Preparation

Look for a small prerequisite change that makes later work safer or independently verifiable. Add it only when evidence shows the current structure blocks the requested implementation.

Do not create generic cleanup, modernization, documentation, or infrastructure tickets unrelated to the desired outcome.

## Prefer Vertical Slices

Each ticket should deliver a narrow but complete observable behavior across the necessary layers. A completed ticket must be independently testable, reviewable, and useful as progress toward the outcome.

Avoid horizontal tickets such as:

- build all database changes;
- build all endpoints;
- build all UI;
- add all tests.

Instead, slice by a user-visible behavior, domain transition, contract, compatibility stage, or end-to-end scenario.

Size each ticket for one focused fresh context. Split when a ticket contains independent outcomes, unrelated risks, or several verification strategies. Merge tickets that cannot produce meaningful evidence independently.

## Handle Wide Changes with Expand-Contract

When a mechanical or contract change has a broad blast radius and no vertical slice can remain green:

1. **Expand:** add the new form beside the old while preserving compatibility.
2. **Migrate:** move callers in bounded, independently verifiable batches.
3. **Contract:** remove the old form only after all callers are migrated and verified.

Use a shared integration point only when individual migration batches genuinely cannot remain valid alone. State where the system is expected to be green.

## Build the Dependency Graph

For every ticket, identify only dependencies that genuinely block starting or verifying it.

- Keep the graph acyclic.
- Publish or list blockers before blocked tickets.
- Mark independent tickets as parallelizable only when they do not depend on overlapping mutable state or conflicting files.
- Identify the initial frontier: tickets with no unresolved blockers.
- Avoid turning preferred order into a false dependency.

## Write Agent-Ready Tickets

Use this structure:

```markdown
# <Ticket title>

## Outcome
## Context
## Scope
## Acceptance criteria
## Relevant locations
## Verification
## Blocked by
## Out of scope
```

Requirements:

- Title the delivered behavior, not an activity.
- Describe the outcome from the caller, user, or operator perspective.
- Include only context not already available through a linked source.
- Use checkable acceptance criteria.
- Name verified relevant files, components, or interfaces without dictating unnecessary implementation.
- State exact existing verification commands when confirmed; otherwise describe the required evidence and label commands as proposed.
- Use `None` when no blocker exists.
- Preserve explicit exclusions.

Do not include production code, placeholder implementations, invented estimates, or excessive background.

## Validate the Breakdown

Confirm:

- every source requirement maps to one or more tickets;
- no ticket lacks a requirement or necessary risk-reduction purpose;
- every ticket has independent completion evidence;
- dependencies form a valid graph;
- the initial frontier is visible;
- wide migrations preserve compatibility at each promised green point;
- the set contains no hidden scope expansion;
- a fresh agent can execute any unblocked ticket without reconstructing the full planning conversation.

Ask the user about granularity only when a material trade-off cannot be derived from the approved plan. Do not require ceremonial approval for a response-only breakdown.

## Publish Only When Authorized

Before an external write:

- show the exact tracker, project or repository, parent reference, ticket count, and dependency relationships;
- obtain any required confirmation;
- create blockers before dependents so relationships can reference real identifiers;
- report the created identifiers and URLs;
- do not start implementation unless separately requested.

## Completion Standard

Finish only when the tickets cover the approved scope, each ticket is independently verifiable, the dependency frontier is explicit, and no external state has changed beyond the user's authorization.
