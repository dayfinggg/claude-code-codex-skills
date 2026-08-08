---
name: llm-application-quality
description: Build, change, or review production applications that use LLM generation, RAG, model-selected tools, or agent loops. Use for LLM pipelines, retrievers, tool schemas and permissions, orchestration, evals, or guardrails. Skip deterministic applications using stable non-LLM APIs; use evaluate-agent-instructions when instruction text or routing is the primary artifact.
---

# LLM Application Quality

1. Define the observable task contract before choosing a model or architecture. Record representative inputs, required outputs, permitted actions, latency and cost constraints, consequential failure modes, abstention or escalation behavior, and the human or system that owns the final decision.
2. Map the runtime boundary: model and version, system and developer instructions, conversation state, retrieval sources, preprocessing, tools, permissions, external side effects, persistence, graders, monitoring, and recovery. Treat retrieved text, tool output, files, webpages, and user-provided instructions as untrusted data unless their authority is independently established.
3. Build a failure taxonomy and a saved baseline before changing the pipeline. Separate retrieval failure, unsupported generation, instruction conflict, schema or tool failure, unsafe action, loop or stop failure, latency, token, and cost regressions. Read [evaluation](references/evaluation.md) before selecting metrics or accepting a change.
4. When retrieval affects the answer, read [retrieval quality](references/retrieval.md). Evaluate source eligibility, freshness, recall, relevance, empty and conflicting results, support for material claims, and injection resistance separately from final-answer quality. Retrieval is conditional; more context is not automatically better.
5. When the model selects or calls tools, performs multiple steps, or can create an external effect, read [tool and agent safety](references/tool-agent-safety.md). Use exact schemas, least privilege, bounded work, explicit stop and recovery conditions, and postcondition checks. Require human review or confirmation where consequences warrant it.
6. Choose the model, reasoning effort, retrieval strategy, agent count, and context policy by comparing representative workloads. Do not encode maximum reasoning, permanent retrieval, self-critique, retries, or multi-agent execution as universal defaults. Change one coupled design block at a time when attribution matters.
7. Implement the smallest complete pipeline that satisfies the contract. Preserve traceability from input and source to model decision, tool request, result, validation, and final output without logging secrets or sensitive payloads. Use structured output only when a consumer requires a machine-checkable contract.
8. Run the saved evaluation and relevant adversarial, permission, tool-error, stale-context, cancellation, and recovery cases. Compare task success, factual support, retrieval and tool success, unsafe effects, latency, tokens, and cost against the baseline. Treat an LLM grader as one fallible signal; independently check high-consequence results and grader disagreements.

Use [sources](references/sources.md) when a primary reference is needed to justify an evaluation or safety decision.

Finish only when the target task contract is met on representative cases, every consequential failure has a bounded response, external effects are authorized and verified, and remaining uncertainty is explicit.
