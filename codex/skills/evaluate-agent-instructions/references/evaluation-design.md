# Evaluation design

## Case contract

For each case record an identifier, task segment, input and starting state, applicable instruction scope, required result, acceptable variants, forbidden behavior, required evidence, grader, repetitions, and must-pass status. Preserve real tasks when lawful and anonymize sensitive content; otherwise create faithful cases that exercise the same decision.

## Comparison controls

Keep model, reasoning effort, verbosity, tools, permissions, context, repository revision, environment, timeouts, and budgets fixed between baseline and candidate. Randomize presentation to human reviewers and hide the variant label. Store raw outputs and tool traces rather than only aggregate scores.

## Metrics

Use task success and required-behavior completion as primary metrics. Add unsupported claims, nonexistent APIs, tool and postcondition success, unsafe effects, unnecessary actions or questions, trigger precision and recall, exact-format preservation, style preference, tokens, latency, and cost when the changed instruction can affect them.

Automatic graders need a defined rubric and spot checks. Use deterministic checks for schemas, files, commands, tests, and forbidden actions. Use blind human comparison for natural writing, proportional detail, and ambiguous usefulness. Resolve reviewer disagreement with a predefined adjudication rule.

## Decision

Set practical thresholds before the run. A candidate must pass every safety, permission, data-integrity, and irreversible-effect case and must not materially regress any required task segment. Efficiency improvements count only when quality is preserved. Report uncertainty when the sample or repetitions cannot support a stable conclusion.
