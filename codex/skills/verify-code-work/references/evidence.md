# Research Basis

Use this reference to adapt the workflow or explain why a verification gate exists. The sources describe specific products and repositories. Treat the cross-project rules below as synthesis, not as universal vendor claims.

## Adopted Patterns

### Separate deterministic proof from model-dependent proof

Cloudflare's Code Mode keeps deterministic end-to-end tests separate from live-model tests. The deterministic suite covers the HTTP-to-sandbox execution path, errors, timeouts, invalid tools and inputs, logs, and blocked network access. The model suite has separate configuration, longer bounds, and CI retries. Adopt deterministic-first execution, explicit readiness, bounded timeouts, and isolated nondeterministic evidence.

- [Deterministic Playwright configuration](https://github.com/cloudflare/agents/blob/0efd545a58c9075885977627e5d853b6e98f6d54/packages/codemode/e2e/playwright.config.ts#L4-L22)
- [Live-model Playwright configuration](https://github.com/cloudflare/agents/blob/0efd545a58c9075885977627e5d853b6e98f6d54/packages/codemode/e2e/playwright.llm.config.ts#L4-L43)
- [Executor end-to-end cases](https://github.com/cloudflare/agents/blob/0efd545a58c9075885977627e5d853b6e98f6d54/packages/codemode/e2e/executor.spec.ts#L153-L249)

### Verify the working result and preserve the trace

Cursor documents repository rules containing exact commands, a test-first regression loop when appropriate, evaluation of the resulting working tree with a real runner or judge, and a separate final diff review. Adopt repository-native commands, observable behavior, retained command evidence, and a distinct final inspection. Cursor's published Bugbot research describes multiple review passes and validation. Infer from this that independent review is a higher-cost option rather than a default requirement.

- [Cursor agent best practices](https://cursor.com/blog/agent-best-practices)
- [Cursor evals](https://cursor.com/docs/evals)
- [Cursor Bugbot](https://cursor.com/docs/bugbot)
- [Building a better Bugbot](https://cursor.com/blog/building-bugbot)

### Do not equate edit success or task status with correctness

OpenCode validates patches mechanically, shows diffs, returns language-server diagnostics, and asks completed todos to be verified. Its todo schema does not attach a test result to completion, and post-edit diagnostics do not roll back an edit. Adopt diff and diagnostics as evidence slots, but require an explicit behavior check before a verified verdict.

- [OpenCode patch validation and diagnostics](https://github.com/anomalyco/opencode/blob/f67e80c2756ac0d9d05a31da59483b0a7a6cd0c3/packages/opencode/src/tool/apply_patch.ts#L193-L303)
- [OpenCode todo contract](https://github.com/anomalyco/opencode/blob/f67e80c2756ac0d9d05a31da59483b0a7a6cd0c3/packages/opencode/src/tool/todowrite.txt#L3-L30)
- [OpenCode todo schema](https://github.com/anomalyco/opencode/blob/f67e80c2756ac0d9d05a31da59483b0a7a6cd0c3/packages/schema/src/session-todo.ts#L7-L23)

### Start narrow, report observed results, and keep rules close to code

Codex's own instructions require the narrowest relevant check before broader checks and forbid fixing unrelated failures. OpenAI's review rubric requires causal, location-specific, non-speculative findings. Durable repository commands and invariants belong in scoped `AGENTS.md`, while the reusable verification procedure belongs in this skill.

- [Codex validation instructions](https://github.com/openai/codex/blob/ee0247f95a6fe2b094ba2253d82cae2a2b4c2dff/codex-rs/protocol/src/prompts/base_instructions/default.md#L149-L163)
- [Codex review rubric](https://github.com/openai/codex/blob/ee0247f95a6fe2b094ba2253d82cae2a2b4c2dff/codex-rs/prompts/templates/review/rubric.md#L46-L61)
- [OpenAI Codex skill guidance](https://learn.chatgpt.com/docs/build-skills)

### Require regression and non-regression evidence

Agentless separates localization, repair, and patch validation. It selects existing regression tests and adds a reproduction test before ranking candidate patches. SWE-bench distinguishes tests that must change from failing to passing from tests that must remain passing. Adopt an independent reproduction for the target behavior plus relevant neighboring coverage, without requiring multiple candidate patches.

- [Agentless workflow](https://github.com/OpenAutoCoder/Agentless#about)
- [SWE-bench evaluation harness](https://github.com/SWE-bench/SWE-bench/blob/main/swebench/harness/run_evaluation.py)

### Automate feedback without treating a green tool as sufficient

Aider automatically lints edits and can run a configured test command, feeding failures back into a repair loop. Its configuration keeps lint and test commands repository-selectable. Adopt quick automated feedback and rerun it after corrections, while retaining requirement coverage and final diff inspection as separate gates.

- [Aider linting and testing](https://github.com/Aider-AI/aider#linting--testing)
- [Aider command configuration](https://github.com/Aider-AI/aider/blob/main/aider/website/assets/sample.aider.conf.yml#L269-L287)

## Limits of the Evidence

These sources do not prove that any single command, passing suite, model review, coverage percentage, or agent architecture guarantees correctness. Exact commands, environment fidelity, risk depth, and required checks must come from the repository and task under verification. Pinned repository links reflect snapshots inspected on 1 August 2026 and should not be treated as current product contracts indefinitely.
