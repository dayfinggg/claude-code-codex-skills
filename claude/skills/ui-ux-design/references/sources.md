# Primary design references

Accessed 2026-07-13. Match platform, browser, framework, and model guidance to the exact project version. Do not combine values from several design systems into a universal token scale.

## Claude models and Claude Code

| Source | Publisher/owner and currentness | Governed topic |
| --- | --- | --- |
| [Prompting Claude Sonnet 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5) | Anthropic, current model-specific guidance | Explicit visual direction, multiple design options before implementation, accessibility, and avoiding a generic default house style |
| [Prompting Claude Fable 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5) | Anthropic, current model-specific guidance | High-fidelity vision work, long-horizon execution, minimal scaffolding, and scope control at high effort |
| [Prompting Claude Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8) | Anthropic, current model-specific guidance | Response calibration, tool use, subagent routing, code review, and frontend defaults |
| [Computer use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool) | Anthropic, current tool documentation | Supported computer-use versions, coordinate scaling, screenshot handling, and environment constraints |

Model defaults do not replace the product design contract. Use the active runtime schema for tool, model, screenshot, and computer-use support, and verify rendered behavior rather than assuming model capability proves fidelity.

## Web accessibility

| Source | Publisher/owner and currentness | Governed topic |
| --- | --- | --- |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | W3C Recommendation, revised 2024-12-12 | Normative web accessibility success criteria; use Level AA as this skill's default target unless project policy differs |
| [Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) | W3C WAI, informative understanding document for WCAG 2.2 | `4.5:1` normal text and `3:1` qualifying large text, including exceptions |
| [Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | W3C WAI, informative understanding document | Contrast for required visual information, controls, states, focus, and graphics |
| [Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) | W3C WAI, informative understanding document | `24 × 24 CSS px` minimum or defined spacing and other exceptions |
| [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow) | W3C WAI, informative understanding document | Non-exempt content reflow at `320 CSS px` without two-dimensional page scrolling |
| [Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing) | W3C WAI, informative understanding document | User text-spacing override values and no-loss behavior |
| [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) | W3C WAI, maintained informative guidance | Composite widget semantics, accessible names, keyboard interaction, and focus patterns; APG is not a normative design system |
| [Images Tutorial](https://www.w3.org/WAI/tutorials/images/) and [Complex Images](https://www.w3.org/WAI/tutorials/images/complex/) | W3C WAI, maintained tutorials | Informative, decorative, functional, and complex-image text alternatives |

Use native semantics before ARIA. Automated accessibility checks cover only a subset of WCAG and do not replace keyboard, focus, zoom, reflow, content, and assistive-technology review.

## Platform and maintained design systems

| Source | Publisher/owner and currentness | Governed topic |
| --- | --- | --- |
| [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) | Apple, living platform guidance | Apple-native layout, Dynamic Type, controls, targets, motion, icons, and accessibility |
| [Android layout basics](https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-basics) | Google Android, updated 2026-06-17 | Adaptive mobile layout, `dp`, `sp`, grids, media, system UI, and target behavior |
| [Fluent 2](https://fluent2.microsoft.design/) | Microsoft, maintained design system | Microsoft product tokens, layout, hierarchy, components, and accessibility |
| [Carbon Design System](https://carbondesignsystem.com/) | IBM, maintained design system | Enterprise components, typography, iconography, spacing, interaction, and accessibility |
| [Carbon data visualization](https://carbondesignsystem.com/data-visualization/getting-started/) | IBM Carbon, maintained guidance | Chart selection, scales, color, accessibility, and analytical interaction |
| [Polaris web components](https://shopify.dev/docs/api/polaris/using-polaris-web-components) | Shopify, current implementation documentation | Shopify commerce components; do not treat obsolete Polaris React APIs as current |
| [USWDS typography](https://designsystem.digital.gov/components/typography/) | U.S. Web Design System, maintained federal design system | Readable typography and public-service component/accessibility conventions |
| [GOV.UK layout](https://design-system.service.gov.uk/styles/layout/) | Government Digital Service, maintained design system | Mobile-first width, grid, spacing, readable line length, and tested public-service patterns |

Project tokens and platform conventions outrank cross-platform defaults. Adopt another design system only when the product actually uses it.

## Verification and usability

| Source | Publisher/owner and currentness | Governed topic |
| --- | --- | --- |
| [Playwright visual comparisons](https://playwright.dev/docs/test-snapshots) | Microsoft Playwright, versioned current documentation | Controlled screenshot baselines, environment sensitivity, and configurable difference budgets; match installed Playwright |
| [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing) | Microsoft Playwright, versioned current documentation | Automated axe integration and its coverage limits; match installed Playwright and axe rules |
| [Ten usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) | Nielsen Norman Group/Jakob Nielsen, updated 2024-01-30 | Durable heuristic review lens; not normative component implementation guidance |
