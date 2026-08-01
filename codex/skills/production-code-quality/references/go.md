# Go

Use the module's declared Go version and standard tooling. Run `gofmt`; use `go vet`, tests, race detection, fuzzing, and `govulncheck` when relevant. Follow established package naming and let identifier capitalization express export visibility.

Keep packages cohesive, interfaces small and consumer-owned, zero values useful when practical, and dependencies explicit. Return errors as values, add context without destroying identity, use `errors.Is` or `errors.As` for inspectable causes, and handle an error once at the correct layer. Avoid panic for ordinary failures.

Propagate `context.Context` across cancellable request boundaries without storing it in long-lived structs. Make goroutine ownership, termination, channel closure, synchronization, and resource cleanup explicit. Prevent leaks and data races before optimizing concurrency.

Go defines no universal source-line limit. Prefer readable expressions and refactor by responsibility and complexity rather than wrapping to an imported convention.

Primary references: [Effective Go](https://go.dev/doc/effective_go), [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments), [Go compatibility](https://go.dev/doc/go1compat), and [Go security practices](https://go.dev/doc/security/best-practices).
