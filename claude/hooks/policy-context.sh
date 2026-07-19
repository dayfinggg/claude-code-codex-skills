#!/usr/bin/env bash
set -euo pipefail

input="$(cat)"
event="$(printf '%s' "$input" | jq -r '.hook_event_name // "Unknown"')"
tool="$(printf '%s' "$input" | jq -r '.tool_name // ""')"

case "$event" in
  UserPromptSubmit)
    context="Apply the complete operating policy loaded in the system prompt. Before any substantive work tool, perform a fresh skill gate for this user request: every software task requires software-engineering and software-architecture plus every directly applicable stack and domain skill; a framework skill never replaces either universal skill. Code and configuration changes default to zero new comments, docstrings, TODOs, or FIXMEs unless the user explicitly requests them or a minimal comment is required for a non-obvious safety invariant. While any action remains, assistant responses contain tool-use blocks only and zero visible text. Reserve prose for the terminal final answer or a genuinely blocking question, and verify every completion claim against current-turn evidence."
    ;;
  PostToolBatch|PostToolUseFailure)
    context="This result, failure, model switch, or continuation remains inside the same turn. If anything remains—including a restart, deployment, verification, retry, wait, poll, or agent follow-up—the next assistant response contains tool-use blocks only and zero text. Never emit a status such as 'Build succeeded. Now restarting the service.' Before any next Write or Edit, remove newly proposed explanatory or narrative comments, docstrings, TODOs, and FIXMEs unless explicitly requested or required for a non-obvious safety invariant. A success or failure is not terminal while another action remains. Write one evidence-based final answer only after no action remains."
    ;;
  SubagentStart)
    context="Follow the agent system prompt, delegated task, and project instructions. Before substantive action, ensure every applicable skill is loaded; skills preloaded through agent frontmatter already satisfy this requirement. Software work requires software-engineering and software-architecture plus all directly applicable stack and domain skills. Produce code and configuration with zero new comments, docstrings, TODOs, or FIXMEs unless explicitly requested or minimally required for a non-obvious safety invariant. Keep plans, progress, waiting, and intermediate status out of visible text, and return only verified findings or the requested artifact to the parent agent."
    ;;
  PostToolUse)
    [[ "$tool" == "Agent" ]] || exit 0
    context="A returned agent result is a tool result, not a reportable milestone. Do not acknowledge the agent or narrate its completion. If any parent action remains, the next assistant response contains tool-use blocks only and zero text; continue, verify, wait, or poll silently. Write the terminal final answer only after every required agent and parent action is complete."
    ;;
  *)
    exit 0
    ;;
esac

jq -n --arg event "$event" --arg context "$context" '{hookSpecificOutput:{hookEventName:$event,additionalContext:$context}}'
