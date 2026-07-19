---
name: web-research
description: Browse, verify, and synthesize current or high-stakes web evidence, documentation, standards, laws, products, news, datasets, and papers. Use for links, citations, quotations, recommendations, fact checks, and source conflicts.
---

# Web Research

Read [source-evaluation.md](references/source-evaluation.md) for a claim ledger, provenance signals, incentives, and conflict analysis. Read [reproducible-research.md](references/reproducible-research.md) for systematic, dataset, paper, or audit-grade research. Consult [sources.md](references/sources.md) before using a named reporting, provenance, identifier, correction, or authenticity standard; pin versions and access dates.

## Workflow

1. Define the research target: question, decision the answer supports, geography/jurisdiction, date window, required precision, acceptable source classes, and output shape.
2. Build a source plan before searching: primary sources needed, independent checks needed, likely conflict points, and what would count as enough evidence.
3. Search iteratively. Start broad only when needed, then narrow by official domains, exact phrases, date filters, file types, and version identifiers.
4. Open and inspect sources. Do not rely on snippets, generated summaries, or search-result titles for final claims.
5. Extract evidence with dates, author/publisher, URL, relevant section/table, version, and caveats.
6. Triangulate important claims across independent sources, especially if the source has commercial, political, legal, or reputational incentives.
7. Resolve conflicts explicitly. If unresolved, report the disagreement instead of forcing certainty.
8. Synthesize concisely with citations and a clear "as of" date when currentness matters.
9. Preserve a proportionate research trail for high-stakes, contested, systematic, or reproducibility-sensitive work; do not burden a simple lookup with audit ceremony.

## Query Design

- Decompose the question into concepts: entity names, exact product/library/API names, synonyms, acronyms, statute numbers, model numbers, version numbers, locations, and date ranges.
- Use the language of the source, not only the user's wording. For technical docs, search error strings, symbol names, package names, RFC/standard IDs, and release-note terms.
- Use SEO-aware phrasing both ways:
  - For primary sources: `site:official-domain`, `"exact feature name"`, `docs`, `reference`, `changelog`, `release notes`, `pricing`, `security advisory`, `filetype:pdf`.
  - For external reality checks: `review`, `benchmark`, `recall`, `complaint`, `lawsuit`, `errata`, `retraction`, `limitations`, `independent test`, `known issue`.
- Use operators deliberately: quotes for exact phrases, `site:` for domains, `filetype:` for PDFs/data sheets, `-term` to remove noise, `after:`/`before:` or tool recency filters for time windows, and domain filters for official sources.
- Iterate from evidence gaps, not from curiosity. Each new query should target a missing source type, conflict, date, version, or counterclaim.
- Keep queries short enough for the search engine to match, but specific enough to defeat generic SEO pages.

## Source Ranking

Rank sources by proximity to the fact:

1. Primary: official docs, statutes, regulations, court opinions, standards, regulatory filings, original datasets, release notes, advisories, product specs, direct statements, peer-reviewed papers, and official statistics.
2. Strong secondary: reputable news/wires, systematic reviews, clinical guidelines, academic books, independent labs, analyst reports with transparent methodology, and expert explainers that cite primary sources.
3. Tertiary: encyclopedias, indexes, aggregators, AI/search summaries, wiki pages, and general guides. Use these for orientation and leads, not final support for critical claims.
4. Low-trust: affiliate listicles, content farms, unattributed blogs, scraped pages, unverifiable social posts, undisclosed sponsored content, and AI-generated pages. Use only as leads or public-sentiment examples.

Evaluate each source for authority, author expertise, publisher incentives, methodology, date, version, jurisdiction, citations, correction history, and whether it links to primary evidence.

Avoid SEO spam by discounting pages with generic "best" phrasing, no testing method, no byline, fake precision, keyword-stuffed headings, republished press releases, excessive affiliate links, hidden sponsorship, or claims that outstrip the cited evidence.

## Currentness and Version Matching

- Record the source date, update date, access date, and event/effective date when relevant.
- For "latest" claims, verify the newest source by checking official changelogs, release notes, data feeds, filings, or agency pages. Do not assume the top search result is current.
- When currentness depends on a page, inspect the final URL after redirects and note useful freshness signals such as publish/update date, canonical version, changelog entry, `Last-Modified`, `ETag`, cache headers, or release artifact date when available.
- Match documentation to the user's exact version, platform, region, plan, language, hardware, API surface, model, package manager, or deployment target.
- Do not mix docs for different versions without saying so. If only older docs exist, say that and give the latest date found.
- Convert relative dates in the final answer to absolute dates when the user may be confused or when time matters.
- For historical claims, use date-bounded searches and archive/historical sources where needed; avoid back-projecting current docs onto old behavior.

## Evidence and Citations

- Prefer precise locators: section names, tables, line numbers, page numbers, commit hashes, filing forms, statute sections, or dataset fields.
- Preserve exact wording only when it matters legally, technically, or rhetorically. Mark paraphrase vs quote clearly.
- Include a lightweight search log for substantial, high-stakes, contested, or user-requested research: query/filter, source opened, why it was trusted or rejected, and remaining gaps.

## Triangulation and Conflict Resolution

- Triangulate core claims with at least two independent sources when the claim is important, disputed, high-stakes, commercial, or surprising.
- Prefer the source closest to the fact, but distinguish current status from interpretation. Example: an agency page may control legal/regulatory text, while expert commentary may explain practical effect.
- Resolve conflicts by checking date, jurisdiction, version, definitions, methodology, metric units, sample, source incentives, and whether one source supersedes another.
- If sources still conflict, state the conflict, cite both sides, explain which source is more authoritative for which part, and avoid false precision.
- Treat "no evidence found" as a claim requiring an adequate search log. Say "I did not find" rather than "there is none" unless the source of record proves absence.

## Task Playbooks

### Technical Documentation

- Search official docs, API references, changelogs, migration guides, source repositories, issue trackers, and release artifacts first.
- Match exact version and runtime. Check local dependency files or installed versions when available before relying on web docs.
- Prefer official docs for intended behavior, source code/tests for actual behavior, and issues/discussions for known bugs or undocumented edge cases.
- Cite docs for public API claims and cite code, commits, or release notes for implementation/version claims.

### Legal, Medical, Financial, Safety, and Security

- Treat as high-stakes. Browse unless explicitly prohibited, use current primary sources, and include jurisdiction/date/version.
- Legal: prefer statutes, regulations, court opinions, agency guidance, official registers, and authoritative legal databases. Distinguish law from commentary and do not give legal advice.
- Medical: prefer government/public-health agencies, clinical guidelines, systematic reviews, peer-reviewed research, and recognized medical organizations. State that information is not a substitute for professional care.
- Financial: prefer regulatory filings, audited statements, official market/regulator data, prospectuses, and primary company disclosures. Distinguish factual research from investment advice.
- Safety/security: prefer vendor advisories, CVEs, official mitigations, standards, and responsible-disclosure sources. Avoid operational misuse detail when safety policy requires restraint.

### Product and Service Recommendations

- Define the user's constraints first: budget, location, compatibility, must-haves, exclusions, risk tolerance, and time horizon.
- Use manufacturer specs, manuals, warranty/return terms, recall databases, independent tests, professional reviews with methodology, and credible owner feedback.
- Treat affiliate rankings and review counts as weak evidence. Watch for fake reviews, undisclosed sponsorship, review suppression, and copied product-description language.
- Report current prices and availability with dates and sellers when relevant.
- Recommend only when the evidence supports the criteria; otherwise provide a shortlist with tradeoffs.

### News and Live Events

- Establish the event date, publication/update time, timezone, and whether reporting is still developing.
- Prioritize original documents, official statements, direct video/transcripts, court filings, regulator releases, and reputable outlets with on-the-record sourcing.
- Separate confirmed facts, allegations, forecasts, and analysis. Avoid rumors and single-source social claims unless the user specifically asks for them.
- Compare multiple outlets for contested facts and update the answer if newer sources change the picture.

### Data Gathering and Market/Scientific Research

- Prefer official APIs, data portals, statistical agencies, standards bodies, registries, and original datasets.
- Capture dataset name, publisher, release/update date, geography, units, definitions, filters, query parameters, and transformations.
- For papers, search title/DOI, publisher page, preprint, corrections, retractions, dataset/code availability, and later systematic reviews.
- For papers and datasets, prefer persistent identifiers and provenance: DOI, Crossmark or correction/retraction status, publisher/version page, dataset license, code/data availability, and update history.
- Do not average or merge numbers from sources with different definitions without explaining the mismatch.
