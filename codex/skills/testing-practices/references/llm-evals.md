# LLM and Agent Evaluations

Use this reference for prompts, model upgrades, retrieval, tools, routing,
multi-agent workflows, graders, and other nondeterministic behavior.

## Define the Contract

Specify the task distribution, observable success criteria, prohibited actions,
acceptable abstention, and non-negotiable safety floors before comparing
systems. Include quality, factual support, scope adherence, latency, tokens, and
cost only when each metric affects the decision.

Build cases from real requests and failure traces. Cover typical, edge, and
adversarial cases, including prompt injection, conflicting evidence, unavailable
tools, partial failures, dirty workspaces, and claims of completion. Keep a
held-out regression set and do not expose its expected answers to the system
being evaluated.

## Compare Fairly

Freeze the model snapshot, reasoning effort, tool set, permissions, harness, and
dataset while changing one prompt or workflow group at a time. Preserve raw
outputs, tool traces, final state, exit codes, and grader decisions. Randomize or
counterbalance candidate order and hide candidate identity from human or model
judges.

Run multiple trials when sampling, tool timing, retrieval, or environment can
change the result. Report `pass@1` for one-run success. Use `pass@k` only to
describe whether at least one of several attempts can succeed, and use `pass^k`
to describe repeated reliability across all attempts. Also report the trial
count, task count, failure classes, latency, tokens, and cost. There is no
universal adequate sample size, so widen the set when uncertainty could reverse
the decision.

## Grade Outcomes and Traces

Prefer deterministic checks of final state, exact schemas, tests, permissions,
and prohibited effects. Use task-specific rubrics for qualities that cannot be
checked mechanically. Calibrate LLM graders against blinded human labels, check
false positives and false negatives, and test position and verbosity bias.
Pairwise or pass-fail grading is often easier to calibrate than an opaque
aggregate score.

For agents, evaluate both the result and the trajectory. Inspect tool selection,
argument validity, retries, handoffs, skill-routing precision and recall,
instruction provenance, citation-to-claim support, unauthorized actions, and
whether reported completion matches the trace and final state. A persuasive
explanation is not evidence that the action occurred.

## Protect the Evaluation

Do not weaken tests, reveal hidden fixtures, encode evaluator answers in the
prompt, select only successful runs, or tune repeatedly on the held-out set.
Audit tasks and oracles when all systems fail or a surprising score appears.
Read representative raw failures even when aggregate metrics improve.

Accept a candidate only when it meets every safety floor and improves the
targeted behavior without a material regression elsewhere. Report uncertainty
and unresolved trade-offs rather than presenting a single noisy run as proof.

OpenAI recommends eval-driven development, task-specific graders, trace
inspection, and continuous evaluation. Anthropic's agent-evaluation guidance
explains repeated trials, outcome grading, and the distinction between
`pass@k` and `pass^k`. The GPT-5.6 system card supports checking actual actions
and claims of completion rather than trusting self-report.

Sources: [OpenAI evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices),
[OpenAI agent evals](https://developers.openai.com/api/docs/guides/agent-evals),
[Anthropic agent evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents),
and [GPT-5.6 system card](https://deploymentsafety.openai.com/gpt-5-6).
