# Authoritative Sources

All sources were opened and inspected on 2026-07-13. Prefer the installed framework's version-matched documentation for framework-owned behavior, then use these sources to resolve React contracts and currentness. The React Versions page listed React 19.2 as the current documentation line and 19.2.7 as its newest patch (June 2026) on the access date; re-check rather than hard-coding that snapshot into project work.

## Version, releases, compiler, and security

| Source | Publisher | Governs | Currentness note |
|---|---|---|---|
| [React Versions](https://react.dev/versions) | React Team | Current docs line, archived majors, release links | Live page; listed 19.2 and patches through June 2026; accessed 2026-07-13. |
| [Versioning Policy](https://react.dev/community/versioning-policy) | React Team | Stable semantic versioning and experimental channels | Live policy; accessed 2026-07-13. |
| [React 19.2 release](https://react.dev/blog/2025/10/01/react-19-2) | React Team | React 19.2 APIs, SSR changes, Hooks lint v6 | Published 2025-10-01; applies only when the installed line supports it; accessed 2026-07-13. |
| [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) | React Team | Supported migration from React 18 to 19 | Updated official guide; use with installed framework guidance; accessed 2026-07-13. |
| [React Compiler](https://react.dev/learn/react-compiler) | React Team | Compiler setup, incremental adoption, configuration links | Current React 19.2 docs; accessed 2026-07-13. |
| [eslint-plugin-react-hooks](https://react.dev/reference/eslint-plugin-react-hooks) | React Team | Rules of Hooks, exhaustive dependencies, compiler diagnostics | Page labels plugin material by release status; verify installed plugin; accessed 2026-07-13. |
| [React GitHub releases](https://github.com/facebook/react/releases) | React maintainers | Patch artifacts and release notes | Primary repository; check newest release at task time; accessed 2026-07-13. |
| [RSC critical vulnerability](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components) | React Team | CVE-2025-55182 and affected RSC packages | Published 2025-12-03; superseded fixed baselines may exist; accessed 2026-07-13. |
| [RSC DoS and source exposure](https://react.dev/blog/2025/12/11/denial-of-service-and-source-code-exposure-in-react-server-components) | React Team | Follow-up RSC CVEs and patched lines | Updated 2026-01-26; always prefer newer patches/advisories; accessed 2026-07-13. |

## Components, state, Effects, forms, and rendering

| Source | Publisher | Governs | Currentness note |
|---|---|---|---|
| [Rules of React](https://react.dev/reference/rules) | React Team | Purity, immutable inputs, component and Hook invocation rules | Current React 19.2 reference; accessed 2026-07-13. |
| [Thinking in React](https://react.dev/learn/thinking-in-react) | React Team | Component decomposition and minimal state | Current learning guide; accessed 2026-07-13. |
| [Choosing State Structure](https://react.dev/learn/choosing-the-state-structure) | React Team | Avoiding contradictory, redundant, duplicated, and nested state | Current learning guide; accessed 2026-07-13. |
| [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components) | React Team | Single source of truth and controlled components | Current learning guide; accessed 2026-07-13. |
| [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) | React Team | Render derivation, event logic, and Effect avoidance | Current learning guide; accessed 2026-07-13. |
| [`useEffect`](https://react.dev/reference/react/useEffect) | React Team | External synchronization, dependencies, cleanup, SSR caveats | Current React 19.2 API; verify older installed majors; accessed 2026-07-13. |
| [`useTransition`](https://react.dev/reference/react/useTransition) | React Team | Non-blocking updates, pending UI, Action caveats | Current React 19.2 API; accessed 2026-07-13. |
| [`Suspense`](https://react.dev/reference/react/Suspense) | React Team | Supported Suspense behavior and streaming integration | Current React 19.2 API; data integration remains framework-owned; accessed 2026-07-13. |
| [`<form>`](https://react.dev/reference/react-dom/components/form) | React Team | Form Actions and progressive enhancement | Current React DOM 19.2 API; branch for older versions; accessed 2026-07-13. |
| [Server React DOM APIs](https://react.dev/reference/react-dom/server) | React Team | Node/Web streaming and legacy SSR APIs | Current React DOM 19.2 reference; accessed 2026-07-13. |
| [Server Components](https://react.dev/reference/rsc/server-components) | React Team | RSC component model and framework caveats | Current React 19.2 reference; integration APIs remain version-sensitive; accessed 2026-07-13. |
| [Error boundaries via `Component`](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) | React Team | Catch scope and fallback behavior | Current React 19.2 reference; accessed 2026-07-13. |
| [`act`](https://react.dev/reference/react/act) | React Team | Flushing React updates in tests | Current React 19.2 reference; most users should follow their test library; accessed 2026-07-13. |
| [React Performance tracks](https://react.dev/reference/dev-tools/react-performance-tracks) | React Team | React scheduling and component performance evidence | React 19.2-era DevTools feature; verify tooling support; accessed 2026-07-13. |

## Accessibility and user-centered testing

| Source | Publisher | Governs | Currentness note |
|---|---|---|---|
| [WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/) | W3C | Normative web accessibility success criteria | W3C Recommendation; accessed 2026-07-13. |
| [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) | W3C WAI | Informative widget semantics, keyboard, and focus patterns | APG is guidance, not a substitute for WCAG/ARIA conformance; accessed 2026-07-13. |
| [React Testing Library introduction](https://testing-library.com/docs/react-testing-library/intro/) | Testing Library maintainers | User-centered React DOM test philosophy | Project documentation; use only if the repository uses or selects the library; accessed 2026-07-13. |
| [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing) | Microsoft / Playwright | Automated browser accessibility checks and limitations | Project documentation; automated scans require manual checks too; accessed 2026-07-13. |
