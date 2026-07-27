# Interface Foundations

Use existing product rules first. Apply the values below according to their label: requirement, platform convention, or starting heuristic.

## Typography

Build typography from roles:

1. Display or hero.
2. Page and section headings.
3. Title or emphasized body.
4. Body.
5. Label.
6. Supporting or metadata text.
7. Monospace data where the content requires it.

Preserve the established family. In a new system, prefer one primary family with sufficient script coverage and a small, purposeful set of weights. Add display or monospace faces only for a defined role.

Set size, weight, line height, letter spacing, measure, and placement together. Do not construct hierarchy from font size alone.

Use these values correctly:

| Value | Type | Application |
|---|---|---|
| Material `bodyLarge` 16sp with 24sp line height | Platform convention | Android or Material-based products |
| iOS body 17pt with Dynamic Type | Platform convention | Native Apple interfaces |
| 45–90 characters per line | Starting heuristic supported by established guidance | Sustained reading text |
| 200% text resize without lost content or function | WCAG requirement for applicable web content | Web interfaces |

For dense product UI, reduce visual prominence through role, weight, color, and spacing before making essential text uncomfortably small. Check real strings, long labels, localization, numeric alignment, and zoom.

## Spacing and Density

Recover the project scale before adding values. In a new system, a 4-unit base with frequent 8-unit steps is a starting heuristic, not a universal standard.

Use spacing to communicate:

1. Tight gaps for elements that form one control or phrase.
2. Moderate gaps within one component or decision group.
3. Larger gaps between responsibilities or sections.
4. Consistent outer gutters and alignment anchors.

Avoid using a unique gap for every relationship. Avoid excessive whitespace that lowers information throughput in operational tools. Preserve breathing room around high-stakes decisions, destructive actions, and dense reading.

## Layout and Responsiveness

Start from the smallest supported viewport and add structure when content needs it. Use intrinsic patterns such as stack, cluster, sidebar, switcher, and grid before accumulating device-specific breakpoints.

Choose breakpoints where:

1. Text measure becomes uncomfortable.
2. Controls collide or wrap ambiguously.
3. Columns become too narrow for their content.
4. Navigation or actions need a different disclosure pattern.
5. Data needs scrolling, reordering, grouping, or an alternate representation.

Do not hide essential functionality merely to make a narrow screenshot clean. Preserve reading order when layout changes. Allow essential two-dimensional content, such as complex data tables or maps, to scroll in its necessary axis while keeping surrounding content reflowable.

Use cards only when the content is a separable object, selectable result, independently actionable unit, or elevated layer. Do not wrap every section in a rounded container.

## Color

Express colors through semantic roles:

1. Canvas and elevated surfaces.
2. Primary, secondary, and muted text.
3. Default, strong, and subtle borders.
4. Primary and secondary actions.
5. Focus.
6. Informational, success, warning, and danger states.
7. Selection and disabled states.

Pair foreground and background roles deliberately. Do not use a primary brand color for every control. Reserve saturation and contrast for hierarchy and action. Never use color as the only indication of status, validation, or selection.

For web content, treat these as requirements:

1. Normal text contrast of at least 4.5:1.
2. Large text contrast of at least 3:1.
3. Meaningful non-text UI contrast of at least 3:1 where WCAG applies.

Check every actual state and theme. A token pair passing independently does not prove that all component compositions pass.

## Borders, Radius, and Elevation

Use one material logic:

1. Borders separate neighboring regions.
2. Surface changes group or distinguish layers.
3. Shadows communicate elevation or temporary overlay.
4. Radius expresses the product’s shape language.

Do not stack border, shadow, tinted surface, and large radius without each serving a purpose. Keep elevation levels few and recognizable. Match popovers, menus, dialogs, sticky regions, and cards to their actual spatial relationship.

## Icons, Imagery, and Data Graphics

Use one icon family with consistent stroke, fill, optical size, and alignment. Provide a text label when meaning is not broadly conventional. Do not use icons as decoration beside every label.

Use imagery when it contributes narrative, identity, explanation, or evidence. Plan crop behavior and responsive variants. Do not use generated interface screenshots as substitutes for working UI.

For charts:

1. Start with the user question.
2. Choose the simplest encoding that answers it.
3. Label units, time range, and comparison basis.
4. Do not rely on color alone.
5. Provide accessible summaries or underlying data when required.
6. Avoid decorative three-dimensional effects and misleading axes.

## Motion

Use motion to show:

1. Cause and effect.
2. Continuity between states.
3. Entry, exit, or hierarchy of temporary layers.
4. Progress or completion.
5. A single purposeful emphasis.

Keep routine motion brief and interruptible. Do not delay interaction for animation. Respect reduced-motion preferences and replace spatial movement with a simpler transition when needed.

## Platform and Product Priority

Resolve conflicts in this order:

1. Accessibility and safety requirements.
2. Explicit product requirements.
3. Established product design system.
4. Platform conventions.
5. Evidence from adjacent flows.
6. Starting heuristics.
7. Personal taste.

## Sources

1. WCAG 2.2: contrast, resize, and reflow requirements.
   https://www.w3.org/TR/WCAG22/
2. Apple Human Interface Guidelines: typography and accessibility.
   https://developer.apple.com/design/human-interface-guidelines/typography
   https://developer.apple.com/design/human-interface-guidelines/accessibility
3. Material 3 type scale and semantic theme roles.
   https://developer.android.com/develop/ui/compose/designsystems/material3
   https://developer.android.com/codelabs/m3-design-theming
4. Practical Typography: line length.
   https://practicaltypography.com/line-length.html
5. Every Layout: intrinsic layout primitives.
   https://every-layout.dev/layouts/
