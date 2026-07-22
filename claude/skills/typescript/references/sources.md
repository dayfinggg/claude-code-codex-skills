# Authoritative sources

The TypeScript documentation site follows the current toolchain and can differ from an installed compiler. TypeScript 7 uses a native implementation and has a distinct tooling transition; the legacy repository release feed alone no longer identifies the newest generation. All sources were inspected and accessed 2026-07-13.

| Source | Publisher | Governed topic | Version or currentness | Access |
| --- | --- | --- | --- | --- |
| [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) | Microsoft TypeScript team | Native compiler release and tooling caveats | Fixed announcement, 2026-07-08 | 2026-07-13 |
| [Announcing TypeScript 6.0](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/) | Microsoft TypeScript team | Transition release behavior | Fixed announcement, 2026-03-23 | 2026-07-13 |
| [TypeScript 6.0 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html) | Microsoft TypeScript team | Defaults, removals, TS5112 and TS7 preparation | Versioned 6.0 notes; page updated 2026-07-13 | 2026-07-13 |
| [Legacy TypeScript releases](https://github.com/Microsoft/TypeScript/releases) | Microsoft | JavaScript compiler release artifacts | Rolling feed; latest shown 6.0.3 at inspection | 2026-07-13 |
| [`typescript-go`](https://github.com/microsoft/typescript-go) | Microsoft | Native compiler source and transition | Rolling repository; verify packaged release/API | 2026-07-13 |
| [TSConfig reference](https://www.typescriptlang.org/tsconfig/) | Microsoft TypeScript team | Compiler configuration | Rolling current docs; match installed compiler | 2026-07-13 |
| [`target`](https://www.typescriptlang.org/tsconfig/target.html) | Microsoft TypeScript team | Emit target and floating `ESNext` | Rolling option reference | 2026-07-13 |
| [`lib`](https://www.typescriptlang.org/tsconfig/lib.html) | Microsoft TypeScript team | Ambient library declarations | Rolling; declarations do not prove runtime support | 2026-07-13 |
| [`moduleResolution`](https://www.typescriptlang.org/tsconfig/moduleResolution.html) | Microsoft TypeScript team | Resolver modes | Rolling and runtime-sensitive | 2026-07-13 |
| [Literal inference and `as const`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-inference) | Microsoft TypeScript team | Literal widening and const assertions | Rolling handbook; type-system behavior | 2026-07-13 |
| [`readonly` modifier](https://www.typescriptlang.org/docs/handbook/2/objects.html#the-readonly-modifier) | Microsoft TypeScript team | Compile-time readonly and aliasing | Rolling handbook; not runtime freezing | 2026-07-13 |
| [Project references](https://www.typescriptlang.org/docs/handbook/project-references.html) | Microsoft TypeScript team | Composite project/build graph | Rolling; validate installed compiler | 2026-07-13 |
| [Node.js TypeScript support](https://nodejs.org/api/typescript.html) | Node.js project/OpenJS | Runtime stripping and transformations | Rolling Node API; pin target version | 2026-07-13 |
