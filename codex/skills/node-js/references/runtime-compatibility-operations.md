# Runtime compatibility and operations

## Pin the actual runtime

- Read `engines`, `devEngines`, `packageManager`, version files, container base images, CI, serverless configuration, and production inventory.
- Inspect the official release/lifecycle page rather than applying a remembered odd/even rule. Current, Active LTS, Maintenance LTS, and EOL status changes over time and policy can change.
- Verify native add-ons, OpenSSL, ICU, libc, architecture, permission flags, loaders, test runners, and deployment platform support before upgrading.
- Exercise the oldest and newest supported runtime when publishing a library or maintaining a compatibility range.

## Align packages, modules, and TypeScript execution

- Match package `type`, file extensions, `exports`/`imports`, conditions, `main`, declarations, loader, bundler, and test runner.
- Treat built-in TypeScript stripping as runtime execution, not compilation. It does not typecheck, does not generally read `tsconfig`, does not support `paths`, and refuses TypeScript under `node_modules`.
- Use runtime-resolvable extensions/imports and explicit `import type`. Verify syntax that requires transformation against the target version and its documented opt-in transform support.
- Run both the actual Node entrypoint and the project's compiler/typecheck/build. Test a packed library artifact through public exports.

## Start test servers without a port race

1. Call `listen(0)` or omit the port so the operating system chooses an available port atomically.
2. Await the `listening` event or callback and then read `server.address().port`.
3. Keep ownership of that listener until the test finishes; publish the selected URL only after readiness.
4. Close the server and all sockets during cleanup. Use isolated per-worker networks when fixed ports are unavoidable.

Never select a random port in advance or probe-then-bind; both can race another process.

## Spawn processes with explicit parsing boundaries

- Prefer `spawn`/`execFile` with a verified executable, argument array, `shell: false`, bounded output, timeout/abort, and exit/signal handling.
- Never concatenate untrusted values into a command string or enable a shell for them. Shell scripts and Windows batch files introduce another parser and quoting rules.
- Bound stdout/stderr buffers, handle backpressure, kill process trees deliberately, and clean up on cancellation and shutdown.
- Separate a command's nonzero exit, signal termination, spawn error, timeout, and malformed output in diagnostics.

## Compare cryptographic values correctly

- Decode and validate a protocol-defined representation and fixed length before comparing bytes.
- `crypto.timingSafeEqual()` requires equal-length byte inputs. Avoid secret-dependent work and early exits in surrounding code; length itself may also be sensitive in a poorly designed protocol.
- Use constant-time verification functions supplied by the chosen MAC, password, token, or signature library instead of assembling a protocol from primitives.
- Keep secrets out of strings, logs, errors, traces, heap snapshots, command arguments, and environment dumps where practical.

## Treat permissions as defense in depth

- Node's Permission Model restricts supported resource access but is not a sandbox for malicious code or dependencies.
- Grant the narrowest filesystem, child-process, worker, inspector, and addon permissions required by the inspected version.
- Combine permissions with OS/container identities, network controls, secret separation, dependency review, and least-privilege service accounts.
- Test denied paths and startup behavior on the exact runtime/platform.

## Shut down with a deadline

1. Install signal handlers once and make repeated signals idempotent. Remember that custom handlers remove default exit behavior for handled signals.
2. Mark the instance unready and stop accepting new requests/jobs.
3. Abort or drain in-flight work within a deadline; stop schedulers and consumers before closing their dependencies.
4. Close servers, sockets, pools, workers, telemetry exporters, and other handles while retaining useful error evidence.
5. Exit through an explicit service-manager-compatible path when complete or when the hard deadline expires. Preserve a nonzero exit code for failed shutdown.

Test normal completion, signal during startup, repeated signal, stuck request/job, dependency-close failure, deadline expiry, and container/orchestrator grace-period alignment.
