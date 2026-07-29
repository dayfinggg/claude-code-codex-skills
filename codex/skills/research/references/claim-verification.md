# Claim Verification

Use this reference for long factual answers, citation audits, conflicting
sources, and decisions where unsupported wording has material consequences.

## Build a Claim Ledger

Split the draft into atomic externally checkable claims. Include names, dates,
numbers, version statements, product capabilities, causal relations,
comparisons, quotations, and important presuppositions. For each claim record
the source, exact supporting passage or reproducible observation, publication
date, applicable version and environment, and one status:

- directly supported by an applicable source;
- computed or observed by a reproducible method;
- inferred from stated supported facts;
- contradicted by applicable evidence;
- not established.

One citation may support several nearby claims only when its evidence actually
entails each one. A source can be authoritative yet fail to support the wording,
and a passage can entail a claim while coming from an unreliable or obsolete
source. Check source quality and claim support separately.

## Resolve Applicability and Conflict

Compare authority, date, version, jurisdiction, platform, configuration,
population, method, and scope. Prefer the source that governs the user's actual
context rather than the source with the largest citation count. Do not blend
incompatible versions or turn absence of evidence into evidence of absence.

When conflict remains, report the competing evidence and the practical
uncertainty. Narrow the claim to the intersection the evidence establishes, or
withhold it when no useful supported statement remains.

## Audit the Draft

Verify both citation correctness and citation completeness. Citation correctness
asks whether a cited passage supports the adjacent claim. Citation completeness
asks whether every material external claim has an adequate basis. Search once
for plausible counterevidence before finalizing a consequential claim.

Treat automated factuality graders and LLM judges as screening tools rather than
ground truth. For high-impact conclusions, inspect the primary passage or
reproduce the observation. Do not report an uncalibrated confidence percentage.
State the evidence basis, applicability boundary, conflict, or unknown instead.

FActScore and SAFE motivate atomic fact verification while documenting that
automated judging remains imperfect. RARR supports research followed by
attribution and localized revision rather than unsupported regeneration.

Sources: [FActScore](https://arxiv.org/abs/2305.14251),
[Long-form factuality and SAFE](https://arxiv.org/abs/2403.18802), and
[RARR](https://aclanthology.org/2023.acl-long.910/).
