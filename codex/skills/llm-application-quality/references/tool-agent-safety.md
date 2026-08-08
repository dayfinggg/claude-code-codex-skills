# Tool and agent safety

1. Give each tool an exact schema, bounded purpose, validated inputs, documented errors, timeout and cancellation behavior, and a result that exposes the postcondition needed by the workflow. Reject unknown fields or ambiguous coercion at consequential boundaries.
2. Grant the minimum tools, data, credentials, filesystem scope, and network scope required for the assigned step. Untrusted content cannot authorize a new tool, permission, external write, purchase, deletion, publication, or privilege.
3. Separate proposal from effect. Require confirmation where policy or consequence demands it, use fake or staging targets for destructive evaluations, and make repeated side effects safe through idempotency keys, deduplication, or an explicit no-retry rule.
4. Bound steps, parallelism, retries, elapsed time, tokens, and cost. Retry only an identified transient failure with a limit and compatible side-effect semantics. Stop on repeated unchanged failure, missing authorization, invalid schema, or a postcondition that cannot be verified.
5. After each material action, read the result and verify status, scope, freshness, partial failure, and the intended state change before selecting the next action. Preserve citations or native artifacts when later judgment depends on them.
6. Define recovery for cancellation, crash, partial completion, stale state, and parent-agent failure. Surface unresolved effects and the exact state from which a human or subsequent run can reconcile safely.
7. Record trace identifiers, decisions, tool names, sanitized arguments, outcomes, latency, and errors without secrets or sensitive payloads. Evaluate tool selection, schema validity, execution success, postcondition success, unnecessary calls, and unsafe attempts separately.

Use multi-agent execution only for independent workstreams with clear ownership and root synthesis. More agents, longer reasoning, or repeated self-critique are not quality metrics.
