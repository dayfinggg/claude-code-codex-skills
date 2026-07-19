# Primary design references

Accessed 2026-07-13. Match platform, browser, framework, and model guidance to the exact project version. Do not combine values from several design systems into a universal token scale.

## OpenAI and Codex

| Source | Publisher/owner and currentness | Governed topic |
| --- | --- | --- |
| [Model guidance](https://developers.openai.com/api/docs/guides/latest-model) | OpenAI, living model-selection guidance | Current Sol, Terra, and Luna positioning; verify runtime availability rather than hard-coding a public page |
| [Prompting guidance for GPT-5.6 Sol](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6) | OpenAI, model-specific living guidance | Outcome-first prompts, instruction hierarchy, source precedence, completion criteria, and avoiding repeated scaffolding |
| [GPT-5.6 System Card](https://deploymentsafety.openai.com/gpt-5-6) | OpenAI Deployment Safety Hub, version-specific current card | Capability and risk context; it does not authorize redesign, external assets, or unrelated scope |
| [Images and vision detail](https://developers.openai.com/api/docs/guides/images-vision#choose-an-image-detail-level) | OpenAI API, living guidance | `original`, `auto`, `high`, and lower detail selection for image understanding; verify supported model behavior |
| [Build responsive front-end designs](https://learn.chatgpt.com/use-cases/frontend-designs) | OpenAI/ChatGPT, current workflow guidance | Reference-led frontend work using the repository's real components, assets, routes, data, and responsive behavior |
| [Turn Figma designs into code](https://learn.chatgpt.com/use-cases/figma-designs-to-code) | OpenAI/ChatGPT, current workflow guidance | Exact node/variant retrieval, asset reuse, and avoiding placeholder assets and unnecessary libraries |

Public model guidance does not define different UI design contracts for Sol, Terra, and Luna. Use the live runtime schema for tool, model, and image-detail support.

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
