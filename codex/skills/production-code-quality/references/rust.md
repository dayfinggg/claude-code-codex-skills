# Rust

Honor the crate's minimum supported Rust version, editions, feature flags, workspace policy, `rustfmt`, Clippy configuration, and test tools. Use ownership and borrowing to make lifetimes and mutation explicit. Prefer expressive domain types, enums, newtypes, iterators, and exhaustive matching over sentinel values and invalid states.

Use `Result` for recoverable failures and `Option` for absence. Preserve error sources and choose library or application error types according to callers' needs. Avoid `unwrap` and `expect` in retained production paths unless an invariant makes failure impossible and the project permits it.

Keep `unsafe` minimal, isolated behind a safe abstraction, and validated for every required invariant. Make concurrency and asynchronous cancellation behavior explicit; require `Send` and `Sync` only where the design needs them. Minimize public API and feature interactions, and evaluate SemVer effects before changing exported types or traits.

Primary references: [The Rust Book](https://doc.rust-lang.org/book/), [Rust API Guidelines](https://rust-lang.github.io/api-guidelines/), and [Cargo SemVer compatibility](https://doc.rust-lang.org/cargo/reference/semver.html).
