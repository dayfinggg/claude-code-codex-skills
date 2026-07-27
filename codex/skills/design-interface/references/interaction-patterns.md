# Interaction Patterns

Select patterns from the user’s task, frequency, risk, data shape, and platform. Preserve established product patterns whenever they remain usable.

## Navigation and Page Structure

Make location, scope, and next action apparent.

1. Use global navigation for stable top-level destinations.
2. Use local navigation for sections within one product area.
3. Use breadcrumbs when hierarchy and return paths matter; do not use them as history.
4. Keep page titles specific and aligned with navigation terminology.
5. Keep primary actions near the object or decision they affect.
6. Preserve selected location and user context after navigation.

Do not add tabs merely to reduce page length. Use tabs for peer views of the same context, not sequential steps or unrelated destinations.

## Forms

Use a visible label for every field. Place labels above fields unless the established platform pattern provides an equally clear alternative.

1. Ask only for information needed at that point.
2. Group related fields with a meaningful heading or fieldset.
3. Use hint text for constraints users need before answering.
4. Do not use placeholder text as the label.
5. Size a field to suggest the expected answer where practical.
6. Use the correct input type, input mode, autocomplete, and native behavior.
7. Permit copy, paste, password managers, and assistive input.
8. Validate at a time that helps correction without interrupting normal entry.
9. Preserve entered values after recoverable errors.
10. State what is wrong and how to fix it using the field’s own terminology.

For long or high-stakes flows, reduce each step to a coherent decision, show progress only when it is meaningful, and allow users to review before commitment.

## Search and Filters

Distinguish search from filtering:

1. Search locates by a query.
2. Filters constrain a known result set.
3. Sort changes order.
4. Views change representation.

Keep applied filters visible and individually removable. Show the effect on result count. Preserve query and filters when users inspect a result and return. Use immediate application for inexpensive, reversible filtering; use an explicit Apply action when changes are costly, numerous, or need review as a set.

Provide a useful zero-results state that distinguishes no data from no matches. Offer recovery such as clearing filters, correcting the query, or broadening scope.

## Lists and Tables

Use a list when items can be understood as individual objects. Use a table when comparison across consistent attributes is the primary task.

For tables:

1. Use clear column headers and meaningful units.
2. Align numbers for comparison and keep text alignment readable.
3. Keep row actions close to the row and label ambiguous icons.
4. Preserve header context for long data where practical.
5. Avoid truncating values required for decisions.
6. Support empty, loading, partial, error, and large-data states.
7. Make sorting state visible and keyboard operable.
8. Do not collapse a comparison table into unrelated cards without preserving comparability.

For narrow screens, choose deliberately among horizontal scrolling, prioritized columns, disclosure, or an alternate task-specific representation.

## Dashboards

Start with the decisions the dashboard supports, not with available chart types.

1. Put the most consequential current state first.
2. Group related measures by decision or workflow.
3. State time range, units, comparison baseline, and freshness.
4. Distinguish status from trend and trend from cause.
5. Link summaries to the details or actions they imply.
6. Do not turn every metric into an equal card.
7. Handle missing, delayed, partial, and stale data explicitly.

Use emphasis to direct attention to exceptions and decisions, not to decorate every metric.

## Dialogs, Drawers, and Inline Disclosure

Use a dialog for a short task requiring focused attention before returning. Use a drawer when preserving page context is important and space permits. Prefer inline disclosure for supporting detail that belongs to the current flow.

1. Give temporary layers a clear title and purpose.
2. Keep the primary action specific.
3. Provide an obvious cancel or close path.
4. Trap focus only in true modal dialogs and restore it on close.
5. Do not nest modal dialogs.
6. Avoid dialogs for information that can be shown safely in context.

## Destructive and Irreversible Actions

Prevent errors before confirming them:

1. Separate destructive actions from routine actions.
2. Name the affected object and consequence.
3. Require additional confirmation only in proportion to risk.
4. Prefer undo or delayed execution when feasible.
5. Do not rely on red color alone.
6. Return users to a coherent state after completion or cancellation.

Avoid confirmation fatigue. Do not confirm harmless, easily reversible actions.

## System States

Design states as part of the component contract:

| State | Required communication |
|---|---|
| Loading | What is loading and whether the user can continue |
| Empty | Why it is empty and the appropriate next action |
| No matches | Which query or filters caused it and how to recover |
| Partial | What is available, what is missing, and impact |
| Error | What failed, what remains safe, and how to retry or recover |
| Success | What changed and the useful next step |
| Stale | Data age, consequences, and refresh path |
| Offline | Available offline behavior and synchronization expectations |
| Permission denied | Missing access and a legitimate request or return path |

Use skeletons only when the eventual structure is predictable. Use progress indicators for indeterminate work and quantified progress only when the estimate is meaningful.

## Usability Heuristics

Review material flows for:

1. Visible system status.
2. Language and ordering that match users’ mental models.
3. User control, cancellation, and recovery.
4. Internal and platform consistency.
5. Error prevention.
6. Recognition instead of memory burden.
7. Efficiency for frequent users without obscuring the novice path.
8. Focus on essential content and actions.
9. Plain-language diagnosis and recovery.
10. Contextual help when the interface cannot be self-explanatory.

## Sources

1. Nielsen Norman Group: ten usability heuristics.
   https://www.nngroup.com/articles/ten-usability-heuristics/
2. GOV.UK Design System: text inputs and error messages.
   https://design-system.service.gov.uk/components/text-input/
   https://design-system.service.gov.uk/components/error-message/
3. Designing Interfaces, third edition: interaction-pattern catalog.
   https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/
