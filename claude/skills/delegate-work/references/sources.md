# Primary references

Accessed 2026-07-22. Recheck living vendor documentation and the active tool schema before depending on exact capabilities.

| Source | Publisher/owner and currentness | Governed topic |
| --- | --- | --- |
| [Create custom subagents](https://code.claude.com/docs/en/sub-agents) | Anthropic, current Claude Code documentation | Agent frontmatter, isolated context, foreground and background limits, model routing, skill preloading, and tool access |
| [Model configuration](https://code.claude.com/docs/en/model-config) | Anthropic, current Claude Code documentation | Model aliases, full model names, settings precedence, providers, and subagent model overrides |
| [Extend Claude with skills](https://code.claude.com/docs/en/slash-commands) | Anthropic, current Claude Code documentation | Skill invocation, explicit-only workflows, progressive loading, arguments, and subagent preloading |
| [Hooks reference](https://code.claude.com/docs/en/hooks) | Anthropic, current Claude Code documentation | Lifecycle context, hook input and output, foreground interaction, and non-interactive limits |
| [About issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues) | GitHub, living product documentation | Issue purpose, relationships, sub-issues, dependencies, and repository collaboration |
| [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) | GitHub, living product documentation | PR review and merge model, draft state, checks, base and head, and collaboration lifecycle |

Background Claude Code subagents cannot obtain interactive clarification, and subagents do not spawn other subagents. Do not infer capabilities, model availability, effort, tool access, concurrency, or lifecycle behavior from another agent runtime; inspect the active Claude Code schema and observed configuration.
