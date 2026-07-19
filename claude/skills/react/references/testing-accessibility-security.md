# Testing, Accessibility, Security, and Production Checks

## Test by risk and behavior

- Use unit tests for pure reducers, selectors, validators, and formatting logic.
- Use component tests for observable rendering, events, forms, focus, pending/error states, and custom Hooks through a component contract.
- Use integration tests for provider, router, data-cache, mutation, and error-boundary interactions.
- Use browser/end-to-end tests for critical journeys, real navigation, SSR/hydration, streaming, RSC, cookies, file input, browser APIs, and assistive interaction that a DOM emulator cannot prove.
- Prefer role, accessible name, label, visible text, and user-event queries. Use test IDs only when no user-observable locator is stable.
- Assert outcomes, not component instances, Hook call counts, internal state, class names, or exact implementation structure.
- Keep tests deterministic: control time, randomness, locale, timezone, network, storage, observers, and cleanup. Do not replace every child with a mock until the test proves nothing useful.
- Reproduce bug fixes with a failing test where practical. Cover Strict Mode, aborted/stale async work, and duplicate submission when the defect involves lifecycle or concurrency.

## Accessibility acceptance

- Prefer native semantic elements before ARIA. Use WAI-ARIA patterns only when native HTML cannot express the widget and implement their complete keyboard and focus model.
- Maintain a logical heading and landmark structure, accessible names, labels, descriptions, status messages, and validation relationships.
- Ensure all functionality works by keyboard with visible, unobscured focus and no trap. Move focus only for a user-understandable reason such as opening a modal or reporting submitted errors.
- Preserve zoom, text reflow, contrast, non-color cues, reduced motion, target size, captions/transcripts, and meaningful image alternatives according to the product's WCAG target.
- Test loading, errors, disabled controls, dialogs, menus, tabs, grids, drag alternatives, and dynamic announcements with actual keyboard behavior.
- Combine automated checks with manual keyboard, screen-reader-oriented accessibility-tree inspection, zoom/reflow, and contrast review. Automated scans cannot establish conformance.

## Security and privacy

- Rely on React escaping for text. Avoid `dangerouslySetInnerHTML`; if the product requires rich HTML, sanitize with the repository's vetted policy at a trusted boundary and test dangerous payloads.
- Validate URL schemes and origins before assigning user-controlled navigation, image, iframe, or download targets. Block `javascript:` and unexpected cross-origin redirects.
- Never expose secrets, raw session material, private environment values, database records, authorization decisions, or internal error details in client props, serialized state, source maps, or logs.
- Enforce authentication, authorization, tenant/record ownership, CSRF or origin policy, rate limiting, and input validation on every server mutation and public endpoint.
- Bound upload size and type, sanitize filenames, isolate storage, and never trust client MIME metadata alone.
- Review dependency and framework security advisories, especially for RSC-enabled stacks, before release. Apply patched supported versions rather than relying on hosting-provider mitigations.
- Collect only necessary analytics and error data. Redact form values, tokens, cookies, URLs with sensitive query parameters, and personal data.

## Completion checks

1. Run the smallest relevant typecheck and Hooks/React lint rules.
2. Run focused unit/component/integration tests, then broaden when shared behavior changed.
3. Run the production build for SSR, RSC, compiler, bundler, public API, or dependency changes.
4. Exercise the changed flow in a real browser for visual, focus, responsive, hydration, and network behavior.
5. Profile only when making a performance claim and compare the same production scenario before and after.
6. Inspect the client bundle or serialized payload when changing a server/client boundary or handling sensitive data.
