# C and C++

Honor the selected C or C++ standard, supported compilers and platforms, warning policy, formatter, analyzer, build system, ABI requirements, and test tools. Prefer the repository's established idioms; do not import modern-language techniques that its compatibility targets cannot support.

Make ownership, lifetime, bounds, and error contracts explicit. In C++, use RAII, value semantics, standard containers, smart pointers for ownership, and narrow interfaces. In C, centralize cleanup paths, validate sizes and conversions, and pair every allocation or acquisition with an unambiguous owner and release.

Avoid undefined behavior, unchecked arithmetic and narrowing, raw owning pointers, unsafe string operations, data races, and manual resource management when a safer facility exists. Keep concurrency synchronization and memory ordering justified and reviewable.

Use warnings, sanitizers, static analysis, fuzzing, and platform builds according to risk. Evaluate ABI and binary compatibility before changing exported layouts, symbols, calling conventions, or templates.

Primary references: [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines) and [SEI CERT C](https://wiki.sei.cmu.edu/confluence/display/c/SEI+CERT+C+Coding+Standard).
