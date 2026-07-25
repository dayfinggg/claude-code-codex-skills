#!/usr/bin/env bash
set -euo pipefail

cat >/dev/null 2>&1 || true

read -r -d '' RULE <<'EOF' || true
Turn shape, in force for this turn: an assistant turn that calls tools contains tool calls and nothing else - no text block before them, between them, or after them. Step labels, intentions, observations, findings and transitions go in reasoning, which the user does not read. Speaking before the task is finished means emitting a turn that makes no tool call, and there are exactly three occasions for one: you need the user's input, a decision or an approval; a blocker stops progress and you cannot get past it yourself; or you discovered something that changes the task's scope or expected outcome. Everything else waits for the final response - a failed call you are retrying, background work you launched or are waiting on, a result you are folding in, a finished step, a new phase, a changed approach, an empty search. Do not reason about whether this rule's purpose is served in the present case; the rule is the turn shape, and it holds even where a sentence would genuinely help.
EOF

RULE=${RULE%$'\n'}
ESCAPED=${RULE//\\/\\\\}
ESCAPED=${ESCAPED//\"/\\\"}

printf '{"hookSpecificOutput":{"hookEventName":"UserPromptSubmit","additionalContext":"%s"},"suppressOutput":true}\n' "$ESCAPED"
