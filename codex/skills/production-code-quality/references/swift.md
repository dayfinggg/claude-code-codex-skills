# Swift

Honor the Swift and platform versions, package or Xcode settings, formatter, linter, concurrency checks, and test framework. Follow [Swift API Design Guidelines](https://www.swift.org/documentation/api-design-guidelines/) and project terminology so calls read clearly at the use site.

Prefer value types unless identity or shared mutable state is required. Model absence with optionals, failures with appropriate throwing or result-based APIs, and state variants with enums. Avoid force unwraps, forced casts, implicitly unwrapped optionals, and broad mutable global state in retained code.

Use structured concurrency, propagate cancellation, isolate mutable shared state with actors or another explicit mechanism, and satisfy `Sendable` where values cross concurrency domains. Keep UI work on the required actor without masking background blocking work.

Preserve ownership and resource lifecycle across Objective-C, C, and platform-framework boundaries. Evaluate source and binary compatibility for public packages and frameworks before changing signatures, conformances, or serialized data.

Primary references: [The Swift Programming Language](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/) and [Swift.org documentation](https://www.swift.org/documentation/).
