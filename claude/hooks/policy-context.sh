#!/usr/bin/env bash
set -euo pipefail

input=''
while IFS= read -r line || [[ -n "$line" ]]; do
  input+="$line"$'\n'
done

case "$input" in
  *SubagentStart*|*subagentstart*)
    event='SubagentStart'
    role_context='This is an isolated subagent context. Stay inside the delegated boundary, emit no progress narration, return only the requested evidence or artifact to the parent, and return any required user decision instead of attempting an interactive question.'
    ;;
  *)
    event='SessionStart'
    role_context='This session uses silent execution. Plan approval starts execution and is never a report boundary: call the first implementation tool immediately without a transition message. While implementation, waiting, verification, restart, deployment, or follow-up work remains, emit only tool calls and no progress, next-step, result, or waiting prose. Write user-visible prose once after all work and verification finish, except for a genuinely blocking question or required permission warning.'
    ;;
esac

printf '{"hookSpecificOutput":{"hookEventName":"%s","additionalContext":"%s"}}' \
  "$event" "$role_context"
