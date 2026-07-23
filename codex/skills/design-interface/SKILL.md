---
name: design-interface
description: Design, implement, redesign, or visually review distinctive production-quality digital interfaces. Use for websites, landing pages, web or mobile apps, dashboards, product surfaces, components, and other UI work where visual direction, usability, responsive behavior, accessibility, interaction states, or design-system quality materially affect the result. Do not use for backend-only work, purely mechanical styling changes, or non-interface artifacts with their own dedicated skill.
---

# Design Interface

Create interfaces that are useful, coherent, recognizable, accessible, and thoroughly finished. Treat visual design, interaction design, content, implementation, and verification as one product-quality workflow.

## Establish the Design Contract

Before editing, determine from the request and available evidence:

- the people using the interface and the primary task they need to complete;
- the product type, content, environment, and emotional tone;
- the platform, stack, supported devices, and technical constraints;
- existing brand rules, design tokens, components, assets, copy, and conventions;
- the required deliverable: concept, prototype, implementation, redesign, or review;
- the quality risks most likely to matter, including accessibility, dense data, trust, conversion, or performance.

Inspect the existing product before inventing a replacement. Reuse sound components and patterns. Preserve established brand and platform conventions unless the task explicitly calls for a new direction.

Do not expose this checklist or narrate routine design decisions unless the user asks for the reasoning.

## Form One Coherent Direction

Define internally:

- **Product thesis:** what the interface helps someone accomplish.
- **Visual thesis:** one sentence describing its character, material, contrast, and rhythm.
- **Interaction thesis:** how feedback, transitions, and state changes should feel.
- **Signature:** one appropriate, memorable design move that belongs to this product.

Choose a direction because it fits the audience and task, not because it is fashionable. Distinctive does not mean loud. A restrained operational tool may need density, calm surfaces, and precise typography; an editorial or brand experience may justify stronger imagery, composition, and motion.

Keep one dominant idea per view or section. Remove elements that do not improve meaning, action, orientation, trust, or atmosphere.

## Design from Content and Tasks

Use real product language and realistic content whenever available. Do not use filler text, fabricated proof, fake metrics, or placeholder assets in a finished result.

- Put the primary task or message first.
- Make the information order clear when scanning headings, labels, values, and actions.
- Give each section or region one responsibility.
- Use labels that describe the action or result, not vague words such as “Continue.”
- Keep supporting copy concise, concrete, and consistent with the product vocabulary.
- Explain errors in plain language and provide a viable recovery action.
- For product UI, prioritize workspace, status, decisions, and actions over marketing language.
- For landing pages, build a clear narrative from promise to evidence to action.

## Build a Visual System

Create or extend a small, explicit system rather than styling each element independently.

### Composition

- Establish hierarchy with scale, spacing, alignment, contrast, and placement before adding decoration.
- Use a grid and spacing rhythm, but allow deliberate breaks when they strengthen the thesis.
- Prefer meaningful regions, columns, lists, dividers, and media over a mosaic of interchangeable cards.
- Use containers only when grouping, interaction, or elevation requires them.
- Keep text measures readable and let content determine breakpoints.
- Design the smallest supported viewport first, then use available space intentionally.

### Typography

- Choose type for the product’s voice, script coverage, readability, and loading cost.
- Use the existing type system when it is established.
- Limit typefaces, weights, and styles unless additional variation has a clear role.
- Define a deliberate scale, line height, measure, and hierarchy.
- Avoid relying on font size alone; combine size, weight, spacing, and placement.

### Color and Material

- Assign semantic roles for surfaces, text, borders, actions, focus, and status.
- Use a restrained palette with clear contrast and one dominant accent unless the brand requires more.
- Never use color as the only carrier of meaning.
- Keep borders, radii, shadows, gradients, and texture consistent with one material logic.
- Prefer depth that clarifies hierarchy. Remove effects that merely decorate.

### Imagery and Icons

- Use existing approved assets first.
- Choose imagery that carries narrative or product meaning and crops well across viewports.
- Use a coherent icon family with accessible labels where meaning is not universal.
- Do not use emoji as interface icons unless the product language explicitly calls for them.
- Use image generation only when a custom raster asset materially improves the result; do not generate text-heavy UI screenshots or substitute imagery for working interface code.

## Design Behavior, Not Just Screens

Cover the states that make the interface usable:

- default, hover, focus, active, selected, and disabled;
- loading, empty, error, success, and partial-data states;
- destructive-action confirmation and recovery;
- validation and form assistance;
- authentication, permission, offline, or stale-data states when relevant;
- long content, localization, zoom, overflow, and slow-network behavior.

Keep users informed about system status. Preserve their context, input, and navigation state. Prefer prevention, undo, and recovery over warnings alone. Make common actions efficient without hiding the understandable path for new users.

Use motion for feedback, continuity, orientation, or emphasis. Keep it brief and consistent, avoid motion that delays work, and provide a reduced-motion experience. Do not add animation solely to make the result appear more designed.

## Meet Accessibility and Performance Baselines

Treat accessibility as a design input from the start.

- Target WCAG 2.2 AA for web interfaces unless a stricter requirement applies.
- Use semantic structure and native controls before custom equivalents.
- Make every flow operable by keyboard and expose a visible, unobscured focus state.
- Provide names, labels, instructions, alternatives, and announcements where needed.
- Maintain sufficient contrast, usable target sizes, logical focus order, zoom, and reflow.
- Do not disable paste, browser zoom, or assistive input methods.
- Respect reduced motion, color preferences, text scaling, and platform accessibility settings.
- Test with keyboard navigation and available automated accessibility tools; use manual inspection for issues automation cannot prove.

Protect the experience from avoidable weight and instability.

- Reuse the existing stack before adding dependencies.
- Size and compress images, load suitable variants, and avoid unnecessary fonts.
- Prevent layout shifts and avoid expensive effects on routine surfaces.
- Measure relevant performance when the interface is substantial or performance-sensitive.
- Treat current Core Web Vitals targets as evidence, not as a substitute for real-user evaluation.

## Implement with Product Fidelity

When implementation is requested:

- follow the repository’s architecture, component system, tokens, supported versions, and naming;
- produce complete, working behavior rather than a static approximation of an interactive product;
- centralize recurring design decisions in the project’s existing token or theme mechanism;
- keep component boundaries aligned with real behavior and reuse, not arbitrary visual fragments;
- use responsive primitives and platform-native capabilities before brittle coordinates;
- preserve semantics and accessibility through component abstraction;
- avoid placeholders, dead controls, unsupported claims, and decorative functionality;
- match implementation complexity to the design: restraint requires precision, not extra machinery.

Do not replace a coherent existing design system with a personal aesthetic. Extend it through its documented mechanisms.

## Verify in the Rendered Interface

Do not judge interface quality from source code alone.

1. Run the product through its normal development path.
2. Inspect the rendered result at representative narrow, medium, and wide viewports.
3. Exercise primary flows and every material state.
4. Check hierarchy, alignment, wrapping, density, cropping, overflow, focus, contrast, touch targets, and motion.
5. Compare the result with the brief, brand, and existing product.
6. Fix visible defects and repeat the inspection.
7. Run focused accessibility, type, lint, test, build, and performance checks that fit the change.

Use screenshots or available browser tools for visual verification. For redesigns, preserve before-and-after evidence when it helps evaluate the change. Never claim visual quality or responsive behavior was verified without rendering it.

## Reject Common Failure Modes

- Generic “AI SaaS” layouts made from repeated rounded cards.
- Purple-on-white gradients, glass effects, glows, or floating blobs used without product rationale.
- A dramatic hero added to an operational workspace.
- Every section centered, equally emphasized, or decorated.
- Weak hierarchy hidden behind excessive chrome.
- Trend-driven styling that conflicts with the brand, platform, audience, or task.
- Novel controls where familiar conventions would reduce cognitive load.
- Beautiful default screens with missing error, empty, loading, focus, or mobile states.
- Motion that competes with content or ignores reduced-motion preferences.
- Design commentary, prompt language, or invented business claims appearing in the interface.

## Completion Standard

Finish only when the interface:

- serves the primary user task and communicates its state;
- has one coherent visual and interaction direction;
- feels specific to the product rather than generated from a generic template;
- remains understandable, responsive, accessible, and performant;
- includes the material states and recovery paths;
- follows the repository and platform conventions;
- has been inspected in its rendered form and refined from evidence.
