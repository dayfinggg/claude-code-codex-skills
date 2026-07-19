# Versioning, Compiler, Framework, and Library Interoperability

## Establish the actual compatibility set

- Read the package-manager field and lockfile first. Then inspect installed package metadata or use the repository's package-manager query command without modifying dependencies.
- Record exact versions for `react`, every renderer such as `react-dom`, `@types/react`, `@types/react-dom`, framework, bundler plugin, test renderer, Hooks lint plugin, and compiler plugin.
- Treat `package.json` ranges and peer dependencies as constraints. Check workspace hoisting and `npm ls`/equivalent output for duplicate React instances when invalid Hook calls or split context occur.
- Read version-matched framework docs before React docs when the framework controls RSC, streaming, caching, Actions, or compilation.

## Stable and experimental channels

- Default to stable releases. A stable React API can still depend on version-sensitive framework or bundler integration.
- Treat Canary, Experimental, RC, `experimental_*`, and framework preview features as opt-in. Do not infer production support from documentation visibility.
- Pin experimental integrations coherently and document their upgrade owner in the repository's established decision mechanism when the user explicitly accepts the risk.
- Check the React blog, versions page, GitHub releases, and framework advisories for current patch requirements before security-sensitive work.

## React 18 and 19 migration

- Characterize current rendering, Strict Mode findings, tests, and hydration warnings before upgrading.
- For a React 18 application moving to 19, use the official upgrade guide and consider the latest 18.3 patch first to surface deprecations. Do not assume all third-party libraries accept React 19.
- Update React and its DOM renderer as a compatible pair, then align types, test utilities, framework, and compiler integration.
- Replace deprecated root, string ref, legacy context, and test-utils APIs only where the installed upgrade guide requires it; keep behavior changes reviewable.
- Inspect form Action, ref, hydration-error, and TypeScript changes explicitly. Run official codemods on a clean diff and review every result.

## React Compiler

- Verify that the repository actually enables the compiler and identify its target, compilation mode, gating, panic threshold, and framework integration.
- Use the official compatibility checker or compiler diagnostics appropriate to the installed toolchain before broad enablement.
- Adopt incrementally for an existing app, keep the Hooks lint plugin enabled, and fix Rules of React violations at their source.
- Do not assume the compiler eliminates every need for stable identity or removes semantic uses of memoization. Do not add manual memoization merely to imitate compiler output.
- For libraries, follow the official compiling-libraries guidance and preserve compatibility with the stated minimum React version.

## SSR, RSC, and frameworks

- Treat React DOM server APIs as renderer infrastructure, not routine component APIs. Let Next.js, Remix/React Router, or another framework own them when present.
- Keep React Server Components framework packages on versions approved by the framework. Their transport/bundler APIs may not follow React's normal minor-version stability.
- Audit `react-server-dom-webpack`, `react-server-dom-parcel`, and `react-server-dom-turbopack` when installed; follow the newest React and framework security advisories rather than an older fixed baseline.
- Preserve directive boundaries such as `use client`/`use server` through the bundler. Verify that library build tools do not strip them.

## Component libraries

- Declare React and renderer relationships through intentional peer dependencies; do not bundle a second React copy.
- Publish the smallest explicit export surface, correct types, supported module formats, and side-effect metadata.
- Mark only client-dependent entry points with `use client`; keep server-compatible primitives free of browser imports, Effects, and mutable singletons.
- Test the published artifact, not only source, against the minimum and current supported React/framework combinations.

## Upgrade verification

Run dependency resolution checks, typecheck, Hooks lint, focused tests, production build, SSR/hydration smoke tests, and the framework's upgrade-specific diagnostics. Compare bundle and interaction metrics when enabling the compiler or changing server/client boundaries.
