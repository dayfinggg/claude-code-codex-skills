# Long-running handoff

Create a persistent handoff only when work must continue in another task, agent, context window, or later session. Do not create one for ordinary same-session work or use it as a substitute for inspecting live repository state.

Record the current objective and acceptance criteria, exact repository or worktree and revision when relevant, scoped instructions, decisions that remain binding, changed and owned files, completed checks with exit status, observed failures, unresolved risks, external dependencies, and the smallest next executable action. Link to live files, issues, sources, and generated evidence instead of pasting large logs or stale summaries.

Separate observations from assumptions and pending decisions. Include no credentials, private logs, customer data, or hidden model reasoning. State which artifacts may be changed, which external or destructive actions remain unauthorized, and who owns integration and final acceptance.

The receiving agent must recheck current state before editing and stop if the handoff conflicts with live evidence. Update the handoff only from observed work, mark superseded decisions explicitly, and delete or archive it when completion, cancellation, or a canonical tracker makes it unnecessary.
