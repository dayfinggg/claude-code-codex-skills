# .NET

Honor the target framework, language version, nullable configuration, analyzers, `.editorconfig`, formatter, package policy, and test framework. Follow [Microsoft C# conventions](https://learn.microsoft.com/dotnet/csharp/fundamentals/coding-style/coding-conventions) unless the repository defines otherwise.

Enable nullable reference types for new code and express absence deliberately. Prefer immutable data, pattern matching, records, and asynchronous APIs when they simplify behavior. Use `async` end to end, propagate `CancellationToken`, avoid blocking waits, and distinguish CPU-bound from I/O-bound work.

Dispose owned resources deterministically with `using` or `await using`. Preserve exception causes, catch only when adding meaningful recovery or context, and avoid exceptions for expected control flow. Keep dependency-injection boundaries explicit without introducing interfaces that have no substitutable role.

For libraries, evaluate source, binary, and behavioral compatibility before changing public members, nullability, virtual dispatch, serialization, or dependency versions.

Primary references: [.NET design guidelines](https://learn.microsoft.com/dotnet/standard/design-guidelines/) and [.NET compatibility rules](https://learn.microsoft.com/dotnet/core/compatibility/library-change-rules).
