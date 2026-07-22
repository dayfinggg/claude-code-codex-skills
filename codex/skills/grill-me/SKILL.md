---
name: grill-me
description: Run an explicit read-only requirements interview that resolves consequential decisions one question at a time before planning or implementation. Use only when the user invokes $grill-me or directly asks to be grilled; do not invoke for ordinary clarification, routine implementation, or facts discoverable from the environment.
---

# Grill Me

Build shared understanding without turning the interview into ceremony. Stay read-only: inspect available evidence and ask questions, but do not edit files, write a plan, or implement anything until the user ends the interview and separately requests that work.

## Prepare the decision map

1. State the outcome that needs clarification and inspect the repository, documents, configuration, issue, or authoritative sources that can answer factual questions.
2. Separate discovered facts, user-owned decisions, assumptions, conflicts, and unknowns. Never ask the user for a fact that can be found safely.
3. Map only the decision branches that can materially change behavior, scope, compatibility, safety, data, UX, or acceptance. Rank irreversible and high-impact branches first.
4. Begin with the hardest unresolved branch rather than exhaustively walking every possible question. Skip settled choices and branches whose answer would not change the result.

## Interview one decision at a time

Ask exactly one short question, then wait for the answer. Use the structured question tool when the active mode exposes it; otherwise ask one concise plain-text question. Never require a tool that is unavailable, and never simulate a structured prompt in prose.

For each question, provide a recommended answer first and one sentence explaining its consequence. Offer two or three mutually exclusive choices when choices help; allow the user to provide a different answer. Resolve dependencies before moving to the next branch, and update the decision map from each answer rather than repeating settled context.

Probe vague terms with examples, counterexamples, boundary cases, failure behavior, and explicit non-goals. Ask about implementation details only when the user owns that decision or the choice changes an external contract; otherwise leave internals to repository conventions and later engineering work.

## Control interview depth

Do not maximize the number of questions. After several answers, or when the user signals fatigue, summarize what remains and offer to finish with clearly labeled assumptions. Stop when the requested precision is reached, the user says enough, remaining branches have low information value, or the agreed question or time budget is exhausted.

For complex business vocabulary, state machines, ownership, or invariants, recommend a separate `$domain-modeling` pass after the interview rather than expanding this skill into a domain workbook.

## Close without acting

Return a compact decision record containing confirmed decisions, evidence-backed facts, accepted assumptions, open decisions, non-goals, and observable acceptance examples. Identify any answer that still conflicts with an authoritative source. Do not claim agreement on unanswered branches, and do not begin planning or implementation unless the user explicitly requests the next phase.
