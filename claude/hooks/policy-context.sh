#!/usr/bin/env bash
set -euo pipefail

input="$(cat)"
HOOK_INPUT="$input" node <<'NODE'
let input = {};
try {
  input = JSON.parse(process.env.HOOK_INPUT || '{}');
} catch {}

const event = input.hook_event_name || 'SessionStart';
const model = String(input.model || '').toLowerCase();
let modelContext;

if (model.includes('fable-5')) {
  modelContext = 'The active model is Claude Fable 5 at a high-capability setting. Its long-horizon autonomy is useful here, but the requested boundary remains exact: avoid unrequested cleanup, speculative abstractions, hypothetical validation, and extra features. Keep self-verification tied to observable acceptance criteria, do not expose internal reasoning, and continue until the task is complete or genuinely blocked.';
} else if (model.includes('opus-4-8')) {
  modelContext = 'The active model is Claude Opus 4.8. Use tools when current evidence or execution is required rather than reasoning past an unverified fact. Interpret scope and output rules literally, keep the work narrowly complete, and reserve deep effort for multistep decisions that change the result.';
} else if (model.includes('sonnet-5')) {
  modelContext = 'The active model is Claude Sonnet 5. Keep persistent and retrieved context selective, use current tools and self-verification when they change confidence, and follow explicit scope and output rules literally. Do not compensate for uncertainty with generic prose or additional scaffolding.';
} else {
  modelContext = 'Use the active model for the requested outcome without inventing model-specific capabilities. Keep context selective, use tools for missing evidence, and follow the exact scope and output contract.';
}

const roleContext = event === 'SubagentStart'
  ? 'This is an isolated subagent context. Stay inside the delegated role and side-effect boundary, return evidence or the requested artifact to the parent, and return any required user decision instead of attempting an interactive question from a background agent.'
  : 'This session uses silent execution: while work remains, user-visible output consists of tool calls; the single prose report comes only after implementation and verification are finished. Ask only a genuinely blocking question, and use AskUserQuestion when a foreground structured choice is useful.';

process.stdout.write(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: event,
    additionalContext: `${modelContext} ${roleContext}`,
  },
}));
NODE
