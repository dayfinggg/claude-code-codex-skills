# Sources

Reviewed 2026-08-03. Prefer the current version of each living standard. Book-derived notes below use official author or publisher material and legally available excerpts; they do not imply access to closed full texts.

## Platform, accessibility, and interaction

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) — platform hierarchy, harmony, consistency, components, inputs, and accessibility.
- [Apple HIG: Layout](https://developer.apple.com/design/human-interface-guidelines/layout) — adaptable hierarchy, safe areas, text scaling, localization, RTL, and device variation.
- [Apple HIG: Typography](https://developer.apple.com/design/human-interface-guidelines/typography) — semantic text styles, legibility, hierarchy, Dynamic Type, and layout adaptation.
- [W3C: Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/) — normative accessibility success criteria.
- [W3C WAI: Page structure and headings](https://www.w3.org/WAI/tutorials/page-structure/headings/) — semantic heading hierarchy and assistive-technology navigation.
- [W3C: ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) — accessible interaction and keyboard patterns for composite widgets.
- [Material Design 3: Foundations](https://m3.material.io/foundations) — adaptive color, typography, layout, motion, and interaction foundations.
- [Microsoft Fluent 2: Design principles](https://fluent2.microsoft.design/design-principles) — platform familiarity, adaptability, and native patterns.
- [Adobe Spectrum: Principles](https://spectrum.adobe.com/page/principles/) — accessibility, honesty, respect for attention, contribution, and coherence.
- [GOV.UK Government Design Principles](https://www.gov.uk/guidance/government-design-principles) — start with user needs, do less, use data, simplify, iterate, include everyone, and be consistent rather than uniform.

## Design systems and AI-assisted design

- [Figma: Design system 102](https://www.figma.com/blog/design-systems-102-how-to-build-your-design-system/) — accessible foundations, tokens, reusable components, and shared language.
- [Figma: Add guidelines to Figma Make](https://help.figma.com/hc/en-us/articles/33665861260823-Add-guidelines-to-Figma-Make) — concise high-priority guidance, real context, and plan-first iteration.
- [Figma: Design systems and AI](https://www.figma.com/blog/design-systems-ai-mcp/) — tokens, annotations, component reuse, and design-code context as controls against generic output and drift.
- [Figma: Bringing Figma into the development workflow](https://www.figma.com/blog/introducing-figma-mcp-server/) — structured design context and code mappings compared with screenshot-only generation.
- [Apple Machine Learning Research: Improving User Interface Generation Models from Designer Feedback](https://machinelearning.apple.com/research/designer-feedback) — evidence for concrete designer annotations, sketches, and direct edits over simple preference ratings.
- [Generative AI in UX Design and Research](https://villemakela.me/wp-content/uploads/2024/05/takaffoli-et-al.-2024-genai-in-ux-design-and-research.pdf) — DIS 2024 interviews on using generative AI for drafts and ideation while retaining research and evaluation.

## Content, lists, and visual structure

- [Nielsen Norman Group: F-shaped pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/) — evidence about scanning behavior, content hierarchy, and the limits of treating the F-pattern as a universal layout rule.
- [Nielsen Norman Group: Anatomy of a list entry](https://www.nngroup.com/articles/list-entries/) — consistent information placement for scanning and comparison across repeated items.
- [Google developer style: Headings and titles](https://developers.google.com/style/headings) — descriptive, task-focused, hierarchical headings and simple punctuation.
- [Linear: A calmer interface for a product in motion](https://linear.app/now/behind-the-latest-design-refresh) — quiet hierarchy, reduced visual noise, tokens, comparison, and agents used for exploration rather than taste replacement.

## Search visibility and performance

- [Google Search Central: SEO guide for web developers](https://developers.google.com/search/docs/fundamentals/get-started-developers) — rendered DOM content, semantic HTML, titles, links, sitemaps, and inspection.
- [Google Search Central: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) — people-oriented page titles, snippets, organization, links, images, and common SEO myths.
- [Google Search Central: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) — rendering, crawlable routes and links, canonical URLs, and client-side content risks.
- [Google Search Central: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — user value and evidence over search-engine-first copy.
- [web.dev: Web Vitals](https://web.dev/articles/vitals) — current Core Web Vitals definitions, field thresholds, and measurement boundaries.
- [web.dev: Optimize Largest Contentful Paint](https://web.dev/articles/optimize-lcp), [Optimize Cumulative Layout Shift](https://web.dev/articles/optimize-cls), and [Optimize Interaction to Next Paint](https://web.dev/articles/optimize-inp) — implementation guidance for loading, stability, and responsiveness.

## Open-source agent guidance

- [Anthropic: frontend-design skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) — Apache-2.0 skill emphasizing explicit direction, product-specific choices, usable content, and avoidance of generic generated aesthetics. Repository popularity is discovery evidence, not UX validation.
- [Vercel: Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) — MIT-licensed implementation and review checks for links, forms, focus, states, content, performance, typography, and polish.
- [wshobson/agents: UI design](https://github.com/wshobson/agents/tree/main/plugins/ui-design) — MIT-licensed examples of primitive, semantic, and component token layering. Treat stack-specific examples as optional.
- [ui-craft](https://github.com/educlopez/ui-craft) — MIT-licensed discovery and constraint-management patterns. Do not inherit its aesthetic presets as universal defaults.

## Books and author materials

- Don Norman, [The Design of Everyday Things](https://jnd.org/books/the-design-of-everyday-things-revised-and-expanded-edition/) and [MIT Press edition](https://mitpress.mit.edu/9780262525671/the-design-of-everyday-things/) — discoverable actions, signifiers, mappings, constraints, feedback, and understandable system state.
- Steve Krug, [Don't Make Me Think, Revisited](https://www.pearson.com/en-us/subject-catalog/p/don-t-make-me-think-revisited-a-common-sense-approach-to-web-usability/P200000000385/9780321965516) — scannable navigation and information design, reduced copy, and focused usability testing.
- Abby Covert, [How to Make Sense of Any Mess](https://www.howtomakesenseofanymess.com/) — legally available web edition on naming intent, understanding content and reality, choosing structure, testing, and iteration.
- Erika Hall, [Just Enough Research](https://abookapart.com/products/just-enough-research.html) — match research effort to the consequential question instead of substituting stylistic assumptions for evidence.
- Luke Wroblewski, [Web Form Design](https://rosenfeldmedia.com/books/web-form-design/) and [author interview](https://rosenfeldmedia.com/luke-wroblewski-on-the-most-common-web-form-mistake/) — forms as a path to user goals, asking only necessary questions, and explaining unexpected fields.
- Adam Wathan and Steve Schoger, [Refactoring UI](https://refactoringui.com/) — public examples of using spacing, surfaces, and justified elevation before adding borders. Treat this as a contextual heuristic, not a universal ban.
