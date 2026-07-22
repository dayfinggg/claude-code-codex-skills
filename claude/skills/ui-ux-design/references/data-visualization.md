# Data Visualization and Analytics UI

## Contents

1. Data contract gate
2. Dashboard hierarchy
3. Visualization selection
4. Scales, units, and comparisons
5. Color and accessibility
6. Interaction and states
7. Responsive behavior
8. Acceptance gate

## Data contract gate

Do not invent production metrics, dimensions, values, comparisons, targets, anomalies, forecasts, or charts.

Before designing a data-rich surface, resolve the minimum data contract:

- user question or decision the surface must support;
- metric definition, numerator and denominator where relevant, unit, aggregation, and precision;
- dimensions and permitted groupings;
- time range, granularity, comparison period, timezone, and locale;
- source, refresh cadence, freshness timestamp, and latency caveats;
- zero, null, missing, delayed, partial, estimated, and suppressed-data semantics;
- targets, thresholds, confidence, uncertainty, and anomaly definitions where relevant;
- permissions and row-level visibility;
- available drill-down or detail route.

Use actual schemas, fixtures, API contracts, and project data when available. If a missing data decision would materially change a production design, ask one targeted blocking question. For an explicitly design-only prototype, use clearly identified neutral structural placeholders; never present them as real product data.

## Dashboard hierarchy

- Organize around a user question, decision, or monitored state—not a default grid of KPI cards.
- Use an overview-to-diagnosis-to-detail flow. Show the smallest set of indicators needed to detect change, explain it, and act when action exists.
- A monitoring or exploratory dashboard may have no primary CTA. Do not invent `Create report`, `Export`, or another action to satisfy a layout pattern.
- Put context next to values: unit, time range, comparison, target, freshness, and scope.
- Distinguish current value, change, comparison baseline, target, and forecast visually and semantically.
- Keep filters visible and understandable. Preserve filter state, expose active scope, and provide a reset when useful.
- Show data freshness and source where stale or delayed data could change a decision.
- Use cards only when they define a meaningful independent module or interaction boundary. Do not place every metric in a giant card.
- Maintain useful density without shrinking text or hiding definitions.

## Visualization selection

Choose the representation from the analytical question:

- exact lookup or multi-attribute comparison: table;
- trend over ordered time: line or area only when filled magnitude matters;
- category comparison: aligned bar or dot plot;
- part-to-whole: stacked bar or another composition view with few meaningful categories;
- distribution: histogram, box plot, density, or strip plot according to sample and audience;
- relationship or correlation: scatter plot;
- progress to a target: bullet, bar, or direct value with target marker;
- geographic pattern: map only when location is analytically meaningful;
- event timing or duration: timeline or interval view.

Avoid pie or donut charts with many slices, 3D charts, decorative gauges, dual axes without strong justification, rainbow palettes, and chart types chosen for novelty. Use a table when exact values and comparison matter more than shape.

## Scales, units, and comparisons

- Label axes, units, periods, scope, and aggregation clearly.
- Start bar charts at zero unless a specialized analytical convention requires otherwise and the truncation is unmistakable.
- A line chart may use a nonzero domain when the purpose is variation, but disclose the scale and avoid exaggerating change.
- Keep comparable panels on comparable scales or make scale differences explicit.
- Sort categories by a meaningful order: value, domain sequence, chronology, or user task.
- Use locale-aware numbers, dates, currency, percentages, and timezone labels.
- Keep precision proportional to measurement accuracy and user decisions. Avoid meaningless decimals.
- Show the comparison base and direction. A percentage change without its reference period or denominator is incomplete.
- Distinguish zero from missing, unavailable, delayed, not applicable, and suppressed values.
- Represent uncertainty, estimates, and forecasts explicitly rather than as ordinary observed values.

## Color and accessibility

- Do not encode series, state, or magnitude by color alone. Add direct labels, markers, shapes, line styles, position, or patterns.
- Use semantic colors consistently. Do not reuse error or success colors for unrelated series.
- Keep categorical palettes limited and distinguishable; combine minor categories when the task permits.
- Use sequential scales for ordered magnitude, diverging scales only around a meaningful midpoint, and categorical scales for unordered groups.
- Check chart marks, axes, labels, annotations, focus, and interactive states for applicable contrast.
- Provide a concise text summary of the main pattern and an accessible data table or equivalent route to exact values for complex visualizations.
- Give charts an accessible name and description. Do not expose hundreds of raw SVG or canvas marks as an unusable accessibility tree.
- Never place essential labels or values only in hover tooltips.

## Interaction and states

- Make hover enhancements optional; all information and actions remain available by keyboard and touch.
- Tooltips remain stable long enough to read, can be dismissed, and do not obscure the selected mark.
- Provide visible focus, logical keyboard navigation, and clear selection state for interactive charts.
- Offer non-drag alternatives for range selection, reordering, and zoom.
- Preserve context during drill-down and provide a clear route back.
- Avoid auto-refresh that disrupts reading, focus, or comparison. Announce meaningful updates without forcing focus.
- Handle loading, no data, filtered-empty, partial, stale, error, permission-limited, offline, and too-much-data states distinctly.
- Empty charts do not render fabricated trends or a zero line that implies observed data.
- Explain unavailable data and the next valid action when one exists.

## Responsive behavior

- Reprioritize analysis on narrow screens; do not shrink a desktop dashboard until charts and text become illegible.
- Stack independent modules, preserve the most decision-relevant context, and keep filters usable.
- Use responsive chart geometry, label reduction, direct summaries, and tables or drill-downs where the full visual cannot fit.
- Permit local horizontal scrolling only for inherently wide tables or visualizations, with orientation and a nonvisual summary. Never make the whole page scroll horizontally.
- Keep touch targets large and prevent tooltips from depending on precise hover.
- Test long series names, large values, negative values, many categories, one data point, no variance, and localization expansion.

## Acceptance gate

Do not accept a data-rich interface unless:

- every displayed value and visualization maps to a real or explicitly placeholder data contract;
- metric definitions, units, scope, period, comparison, freshness, and missing-data meaning are available where needed;
- each chart type answers the intended user question without distortion;
- axes, scales, baselines, sorting, precision, and uncertainty are honest;
- color is not the only encoding and exact values have an accessible route;
- keyboard, touch, focus, tooltip, filter, drill-down, and update behavior are usable;
- loading, empty, partial, stale, error, permission, and offline states are covered;
- narrow and wide layouts preserve the analytical task without unreadable shrinking or lost functionality;
- no generic KPI grid, decorative chart, fabricated metric, or invented CTA remains.
