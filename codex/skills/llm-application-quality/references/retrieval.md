# Retrieval quality

1. Define which claims require retrieval, which sources are eligible, and how identity, authority, version, jurisdiction, and freshness are represented. Preserve source identifiers through chunking and generation.
2. Evaluate ingestion and retrieval independently. Test parsing, chunk boundaries, metadata, access control, deduplication, index freshness, recall of required evidence, ranking relevance, and behavior when the answer is absent.
3. Include empty, stale, duplicate, contradictory, poisoned, and access-restricted results. Do not force an answer from weak context; allow clarification, abstention, or escalation when the task contract requires support that retrieval did not supply.
4. Treat retrieved content as untrusted. Keep data separate from instructions, prevent retrieved text from expanding permissions or tool scope, and test prompt-injection attempts embedded in documents and metadata.
5. Require the generator to preserve the distinction between sourced fact and inference. Verify that each material citation supports the adjacent claim and that no unsupported claim is smuggled in from model memory.
6. Compare retrieval-disabled, baseline, and candidate behavior on the same cases when retrieval is optional. Additional context must earn its latency, token, cost, and distraction risk through measured task improvement.

Use recall or ranking metrics only alongside task-level support and answer quality. A retrieved passage that contains a keyword is not necessarily relevant evidence.
