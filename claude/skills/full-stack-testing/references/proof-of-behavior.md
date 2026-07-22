# Proof of behavior

Use proof of behavior when a passing build or isolated unit test cannot demonstrate the requested outcome. The objective is a short, reproducible observation through the public surface, not an oversized test report.

## Demonstrate the contract

1. State the exact behavior and the public route, command, API, component, job, or data transition through which a user or consumer observes it.
2. Establish the starting state with controlled fixtures and record the runtime, version, environment, and relevant permissions.
3. Exercise the smallest happy path and the material failure or boundary case that motivated the change.
4. Observe the final user-visible output and durable side effects, not only an internal call, log line, mock invocation, compilation result, or successful process exit.
5. Clean up created processes, files, accounts, rows, messages, ports, browser state, and temporary credentials even when the demonstration fails.

For a defect, keep a regression test that fails for the original symptom and passes after the fix. When practical, temporarily revert or disable the production change and confirm that the test fails for the intended reason; this catches tests that exercise the wrong path or merely restate the implementation. Restore the implementation before continuing and do not weaken the oracle to obtain green output.

For visual or interactive work, verify the affected flow at a representative viewport or device through semantic controls. Check the relevant loading, empty, error, success, focus, keyboard, responsive, and assistive-technology states according to the changed risk. Capture a screenshot or short video only when it proves a visual claim; logs and snapshots do not substitute for observing the rendered result.

## Create repository-local product test skills selectively

When the same product flow repeatedly requires non-discoverable setup, create a repository-local `test-<product>` skill rather than expanding global instructions. Create it only after the workflow has been executed successfully and its value recurs. Keep exact commands and versioned project facts in repository scripts or configuration and have the skill orchestrate them.

The product test skill must define:

- positive and negative activation boundaries tied to that product;
- prerequisites and the authoritative setup commands;
- isolated environment, unique ports and namespaces, readiness signals, and timeouts;
- fixture creation, authentication or pairing, and safe handling of credentials;
- the public scenario, expected semantic and visual observations, and failure evidence;
- owned processes and artifacts plus idempotent cleanup;
- supported clients, devices, or platforms and explicit coverage gaps.

Do not create a global generic browser-testing skill, duplicate CLI help, embed credentials, or silently use a shared development or production environment. One controlled server should be reused by cooperating checks when safe; competing agents must not start duplicate services against shared state.

## Report evidence

Record the command or interaction, working directory or client, relevant version and fixture, exit status, observed behavior, and residual gap. Mark automated and manual evidence separately. Use `verified`, `failed`, `blocked`, or `not checked`; never claim a visual, integration, migration, or production property that the executed environment could not observe.
