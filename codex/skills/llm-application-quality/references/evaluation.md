# Evaluation

1. Preserve a versioned dataset of real, anonymized, or faithful synthetic tasks. Include common cases, hard cases, boundary conditions, expected abstention, adversarial inputs, and cases where retrieval, tools, or agents must not activate.
2. Define the oracle before the run: required result, acceptable variants, forbidden behavior, required evidence, grader, repetitions, aggregation rule, and decision threshold. Safety, permission, data-integrity, and external-action cases are must-pass.
3. Keep baseline and candidate conditions comparable: model and snapshot or alias, reasoning effort, prompts, tools, permissions, data, indexes, environment, timeouts, and token or cost limits. Change one attributable block unless the components cannot function independently.
4. Measure end-to-end task success first. Add factual support, citation entailment, retrieval recall and relevance, tool-call validity and success, stop behavior, unsafe effects, latency distribution, token use, and cost only where they represent the contract.
5. Separate component failures. A good final answer does not excuse failed retrieval or an unauthorized tool attempt; strong retrieval does not prove grounded generation; a valid schema does not prove the external postcondition.
6. Repeat nondeterministic cases according to a fixed rule and retain raw outputs, tool traces, errors, and grader reasons. Blind human review should resolve subjective style or usefulness judgments and inspect high-consequence cases.
7. Accept a candidate only when it clears must-pass gates, meets the practical improvement threshold, and causes no material regression in a required segment. Preserve the baseline and a direct rollback path.

Do not optimize to one grader, use model confidence as factual proof, or count lower tokens or fewer tool calls as success when task quality declines.
