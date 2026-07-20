#!/usr/bin/env bash
set -euo pipefail

input="$(cat)"
event="$(printf '%s' "$input" | jq -r '.hook_event_name // "Unknown"')"
tool="$(printf '%s' "$input" | jq -r '.tool_name // ""')"

case "$event" in
  UserPromptSubmit)
    context="The operating policy in the system prompt governs this request. For this task the skill gate runs before the first work tool, code changes carry zero new comments, intermediate responses are tool calls without visible text, and the one final answer is short plain paragraphs without bold, headings, or bullets, with completion claims backed by current-turn evidence."
    ;;
  PostToolBatch|PostToolUseFailure)
    context="This result is intermediate; the turn continues. Remaining work - restarts, deployments, verification, retries, waits, polls, and agent follow-ups - proceeds through tool calls with no visible text. The single final answer, written only after nothing remains, reports outcomes with current-turn evidence in short plain paragraphs and contains no promise of later work; a background script's result is reported in that answer, not announced in advance. New Write or Edit content carries no new comments, docstrings, TODOs, or FIXMEs unless explicitly requested or required by a non-obvious safety invariant."
    ;;
  SubagentStart)
    context="Follow the agent system prompt, delegated task, and project instructions. Before substantive action, ensure every applicable skill is loaded; skills preloaded through agent frontmatter already satisfy this requirement. Software work requires software-engineering and software-architecture plus all directly applicable stack and domain skills. Produce code and configuration with zero new comments, docstrings, TODOs, or FIXMEs unless explicitly requested or minimally required for a non-obvious safety invariant. Keep plans, progress, waiting, and intermediate status out of visible text, and return only verified findings or the requested artifact to the parent agent. Returned text is plain flowing paragraphs without Markdown bold, headings, bullet lists, or numbered lists; a compact table appears only for row-per-item data."
    ;;
  PostToolUse)
    [[ "$tool" == "Agent" ]] || exit 0
    context="A returned agent result is a tool result inside the same turn. While any parent action remains, the response consists of tool-use blocks only; the agent's outcome is reported once, in the terminal final answer, after all required agent and parent work is complete."
    ;;
  *)
    exit 0
    ;;
esac

jq -n --arg event "$event" --arg context "$context" '{hookSpecificOutput:{hookEventName:$event,additionalContext:$context}}'
