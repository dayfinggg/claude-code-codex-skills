# Compatibility

Load this reference when changing a public API, library, protocol, schema, persisted format, event, command line, configuration, deployment contract, or minimum supported environment.

Identify consumers and the ecosystem's actual compatibility promise: source, binary, behavioral, wire, data, or runtime. Compare the change with language-specific SemVer and platform rules rather than assuming one universal definition.

Prefer additive evolution. For breaking data or schema transitions, use expand-migrate-contract when feasible: introduce the new form beside the old, support mixed versions, migrate and verify consumers, then remove the old form in a later controlled step.

Preserve unknown fields and tolerant readers only where the protocol expects them. Version irreversible formats, provide rollback or recovery, test old and new clients against the transition, and state minimum-version changes explicitly.
