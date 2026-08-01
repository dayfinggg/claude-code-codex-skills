# Python

Follow the supported Python version and the repository's `pyproject.toml`, formatter, linter, type checker, and test runner. Use [PEP 8](https://peps.python.org/pep-0008/) naming unless the project defines a stricter convention. Prefer clear modules, explicit imports, context managers for resources, comprehensions only while readable, and standard-library facilities before dependencies.

Express contracts with type annotations at maintained boundaries and configure strictness according to the project. Avoid mutable default arguments, bare `except`, exception swallowing, implicit global state, import-time side effects, and ambiguous truth tests. Preserve exception causes and define domain-specific exceptions only when callers can act on the distinction.

Use dataclasses, enums, protocols, iterators, and asynchronous APIs when they simplify the actual model. Do not force object orientation onto procedural work. Test supported interpreters and packaging behavior where compatibility matters. Use the project's configured line length; PEP 8's values are defaults, not universal overrides.

Primary references: [Python documentation](https://docs.python.org/3/) and [Python typing](https://typing.python.org/).
