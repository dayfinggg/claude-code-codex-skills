# Reproducible research

## Define a protocol proportionate to risk

For systematic, high-stakes, contested, dataset, or paper research, record before or during the search:

- question, decision, scope, non-goals, population or entities, geography, jurisdiction, date window, and version;
- source classes, databases, domains, inclusion and exclusion criteria, languages, and access constraints;
- exact queries, operators, filters, sort, pagination, and search dates;
- deduplication, screening, extraction, conflict, and stopping rules;
- planned transformations, calculations, and synthesis method;
- corrections, retractions, bias, uncertainty, and sensitivity checks.

Use PRISMA 2020 only when conducting or reporting a systematic review that fits its scope. Do not label an ordinary web search systematic.

## Preserve a search log

Record one row per meaningful search or source decision:

| Field | Record |
| --- | --- |
| Query | Exact query, database/tool, filters, and date |
| Result | Final URL or persistent identifier and version |
| Decision | Included, excluded, background only, or unresolved |
| Reason | Relevance, authority, methodology, date, conflict, or duplicate |
| Locator | Section, page, table, field, commit, or timestamp |
| Gap | Access, language, missing data, uncertainty, or needed follow-up |

Do not copy sensitive query data, credentials, paywalled content, or copyrighted full text into the log.

## Handle papers

- Resolve title, DOI, authors, journal, year, version, correction, and retraction status.
- Distinguish preprint, accepted manuscript, version of record, correction, and later systematic review.
- Inspect methods, population, sample, outcomes, missing data, effect size, uncertainty, funding, conflicts, and limitations.
- Do not infer causation from observational association or scientific consensus from one paper.
- Use the current Cochrane Handbook or domain-specific review guidance for evidence synthesis when applicable.

## Handle datasets

- Record publisher, dataset title, persistent identifier, release/update date, license, schema, units, geography, population, collection method, revisions, suppression, and known breaks.
- Save the query parameters and raw-to-derived transformation steps. Keep source data immutable when possible.
- Validate types, missingness, duplicates, joins, denominators, time zones, currency, inflation, and unit conversions.
- Do not merge values whose definitions or collection methods differ without an explicit reconciliation.
- Provide checksums or versioned artifact identifiers when auditability requires them.

Apply FAIR principles to improve findability, accessibility, interoperability, and reuse; do not confuse FAIR with public, open, high-quality, or ethically reusable.

## Handle changing web content

- Record access date, final URL, visible update date, version, and relevant freshness headers or release artifacts.
- Prefer a stable versioned page, filing, release, DOI, or official archive.
- Use Memento-compatible or authorized web archives for historical states when available; verify that the archived timestamp matches the claim.
- Preserve only the minimum excerpt or structured evidence permitted by copyright, access controls, privacy, and source terms.

## Report reproducibility limits

State unavailable databases, inaccessible full text, language limits, dynamic personalization, deleted sources, non-exportable results, incomplete indexing, and transformations not independently checked. A transparent limitation is stronger than fabricated completeness.
