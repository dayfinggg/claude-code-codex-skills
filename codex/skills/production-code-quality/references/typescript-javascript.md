# TypeScript and JavaScript

Honor the repository's module system, runtime, target browsers, `tsconfig`, package manager, formatter, linter, and test tools. For a new TypeScript project, enable `strict` and relax individual checks only with a documented compatibility reason. Prefer narrow types, discriminated unions, exhaustive handling, `unknown` at untrusted boundaries, and inference where it remains clear.

Avoid `any`, non-null assertions, implicit coercion, mutation shared across modules, unhandled promises, floating asynchronous work, and unsafe DOM insertion. Validate runtime data because static types do not validate network, storage, environment, or user input. Propagate cancellation with the platform's supported mechanism and preserve error causes.

Use `const` by default, explicit public contracts, small modules with coherent ownership, and established platform APIs. Select dependencies by maintenance, compatibility, security, and bundle or runtime cost. Do not mix CommonJS and ESM without an intentional interoperation boundary.

Primary references: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html), [TypeScript strictness](https://www.typescriptlang.org/docs/handbook/2/basic-types.html#strictness), and [MDN JavaScript](https://developer.mozilla.org/docs/Web/JavaScript).
