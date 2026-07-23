---
name: research
description: Research technical questions, APIs, libraries, standards, security guidance, compatibility, and current product behavior using authoritative primary sources and explicit evidence. Use when a task depends on external, niche, disputed, version-sensitive, or recently changed facts, or when the user asks to research, compare, verify, or cite technical information. Do not use when the answer is established entirely by the local repository or a simple stable fact.
---

# Technical Research

Produce the smallest body of evidence needed to answer the question or support a decision. Prefer verified primary sources over familiarity, popularity, or plausible recollection.

## Respect the Research Contract

- Work read-only unless the user explicitly asks for implementation or a saved research artifact.
- When research is a dependency of another workflow, return the findings to that workflow instead of creating an unnecessary document.
- Do not broaden a focused question into a general survey.
- Do not present an inference, recommendation, or absence of evidence as a sourced fact.

## Frame the Decision

Define:

- the exact question to answer;
- the decision or implementation it informs;
- the relevant product, language, package, platform, jurisdiction, or standard;
- the versions, dates, environments, and constraints that affect applicability;
- what evidence would be sufficient to stop.

Inspect the local repository first when it can establish installed versions, active configuration, existing contracts, or current behavior.

## Use the Correct Source Route

Prefer sources in this order:

1. official specifications, product documentation, API references, standards, and source repositories;
2. official release notes, migration guides, security advisories, issue trackers, and maintainer statements;
3. original research papers and first-party technical reports;
4. reputable secondary analysis for discovery, context, or independent corroboration;
5. community discussion only when primary evidence is unavailable or the question concerns observed community behavior.

Use a dedicated authoritative product or documentation skill when one is available. Follow its required source route instead of generic web search.

For current or version-sensitive claims, verify publication dates, release versions, and whether the source still describes the active product. Prefer direct documentation pages over search-result summaries.

## Gather Evidence Efficiently

- Start with narrow queries using the essential technical terms.
- Read the exact sections that support or contradict the claim.
- Follow references to the primary source rather than citing an aggregator.
- Record the source, date or version, applicable scope, and decisive evidence.
- Search for disconfirming evidence when the claim affects architecture, security, compatibility, money, or substantial effort.
- Stop when additional sources no longer change confidence or the decision.

Do not quote more than needed. Paraphrase accurately and place citations next to the claims they support.

## Resolve Conflicts

When sources disagree:

- compare authority, date, version, environment, and scope;
- determine whether the disagreement is factual or caused by different assumptions;
- prefer the source that directly governs the user's context;
- state the unresolved conflict when the available evidence cannot settle it.

Never silently combine incompatible versions or contexts.

## Separate Knowledge Levels

Classify material statements as:

- **Confirmed fact:** directly supported by applicable evidence.
- **Inference:** a reasoned conclusion drawn from stated facts.
- **Recommendation:** a choice based on the evidence and user constraints.
- **Unknown:** not established by the available sources.

Use calibrated language. Do not invent precision, consensus, benchmarks, capabilities, quotations, or citations.

## Produce the Result

Lead with the answer or recommendation. Then include only what helps the user evaluate it:

- decisive evidence and citations;
- relevant version or date boundaries;
- material alternatives and trade-offs;
- explicit inferences;
- unresolved gaps and their practical effect.

Use a comparison table only when several options share the same decision criteria.

Save a cited Markdown artifact only when the user requests it or persistent repository knowledge is an established part of the authorized workflow. Otherwise answer in the current task.

## Completion Standard

Finish only when each material factual claim is supported by an applicable source, facts are separated from judgment, and remaining uncertainty is visible enough for the user or calling workflow to make a sound decision.
