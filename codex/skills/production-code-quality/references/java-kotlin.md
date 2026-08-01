# Java and Kotlin

Honor the configured JDK, Kotlin, Android or server target, build tool, formatter, static analyzers, nullability model, and test framework. Follow repository naming first; otherwise use the established [Java style](https://google.github.io/styleguide/javaguide.html) or [Kotlin conventions](https://kotlinlang.org/docs/coding-conventions.html) appropriate to the language.

Model required states with types, keep visibility narrow, favor immutable values, and use records, sealed hierarchies, data classes, or value classes when they express the domain. Avoid nullable flows, unchecked casts, reflection, and framework magic where an explicit contract is practical.

Handle checked and unchecked failures according to caller recovery. Preserve causes, avoid empty catch blocks, and keep transaction and resource boundaries explicit through language facilities. For Kotlin coroutines, preserve structured concurrency and cancellation; do not hide blocking work in asynchronous code.

Do not impose one declaration per file on Kotlin or several declarations per file on Java without considering their distinct conventions. Evaluate source, binary, and behavioral compatibility for published libraries.

Primary references: [Java Language Specification](https://docs.oracle.com/javase/specs/) and [Kotlin documentation](https://kotlinlang.org/docs/home.html).
