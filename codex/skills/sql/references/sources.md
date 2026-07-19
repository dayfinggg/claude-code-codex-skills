# Standards and primary vendor sources

ISO SQL is a normative baseline, not proof of vendor implementation. Vendor `/current/` and managed-service pages are rolling; select the deployed version/edition. On the access date PostgreSQL `/current/` resolved to 18 while 19 was beta, so generic rules must not assume either feature set. All sources were inspected and accessed 2026-07-13.

| Source | Publisher | Governed topic | Version or currentness | Access |
| --- | --- | --- | --- | --- |
| [ISO/IEC 9075-1:2023](https://www.iso.org/standard/76583.html) | ISO/IEC JTC 1/SC 32 | SQL framework | Sixth edition, June 2023; successor under development | 2026-07-13 |
| [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html) | PostgreSQL Global Development Group | MVCC and isolation | Rolling `/current/`, PostgreSQL 18 at inspection | 2026-07-13 |
| [PostgreSQL serialization failure handling](https://www.postgresql.org/docs/current/mvcc-serialization-failure-handling.html) | PostgreSQL Global Development Group | Retryable SQLSTATEs and full-transaction retry | PostgreSQL 18 current docs | 2026-07-13 |
| [PostgreSQL `ALTER TABLE`](https://www.postgresql.org/docs/current/sql-altertable.html) | PostgreSQL Global Development Group | DDL locks and staged validation | PostgreSQL 18 current docs | 2026-07-13 |
| [PostgreSQL row security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) | PostgreSQL Global Development Group | RLS semantics and bypass | PostgreSQL 18 current docs | 2026-07-13 |
| [PostgreSQL 18 release notes](https://www.postgresql.org/docs/current/release-18.html) | PostgreSQL Global Development Group | PG18 changes | Fixed major notes under rolling docs shell | 2026-07-13 |
| [MySQL 8.4 isolation levels](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html) | Oracle MySQL | InnoDB isolation | Versioned MySQL 8.4 LTS manual | 2026-07-13 |
| [MySQL implicit commits](https://dev.mysql.com/doc/refman/8.4/en/implicit-commit.html) | Oracle MySQL | Statements that commit implicitly | Versioned MySQL 8.4 LTS manual | 2026-07-13 |
| [MariaDB documentation](https://mariadb.com/docs/) | MariaDB | Server SQL, storage and operations | Rolling; select deployed version | 2026-07-13 |
| [SQLite isolation](https://www.sqlite.org/isolation.html) | SQLite project | Serialization, WAL and single-writer behavior | Rolling; match embedded library/build | 2026-07-13 |
| [SQL Server isolation](https://learn.microsoft.com/en-us/sql/t-sql/statements/set-transaction-isolation-level-transact-sql?view=sql-server-ver17) | Microsoft | SQL Server/Azure isolation | Versioned SQL Server 17 view; options matter | 2026-07-13 |
| [Oracle Database 26 concurrency](https://docs.oracle.com/en/database/oracle/oracle-database/26/cncpt/data-concurrency-and-consistency.html) | Oracle | MVCC, locking and isolation | Versioned Oracle Database 26 docs | 2026-07-13 |
| [BigQuery transactions](https://cloud.google.com/bigquery/docs/transactions) | Google Cloud | Multi-statement transactions | Rolling managed-service docs | 2026-07-13 |
| [BigQuery primary and foreign keys](https://cloud.google.com/bigquery/docs/primary-foreign-keys) | Google Cloud | Informational key constraints | Rolling; updated 2026-07-10 at inspection | 2026-07-13 |
| [Snowflake transactions](https://docs.snowflake.com/en/sql-reference/transactions) | Snowflake | Transactions and autocommit | Rolling managed-service docs | 2026-07-13 |
| [Snowflake table design](https://docs.snowflake.com/en/user-guide/table-considerations) | Snowflake | Constraints and physical design | Rolling; enforcement depends on table/service | 2026-07-13 |
| [Amazon Redshift documentation](https://docs.aws.amazon.com/redshift/) | Amazon Web Services | Warehouse SQL and operations | Rolling managed-service docs | 2026-07-13 |
| [DuckDB documentation](https://duckdb.org/docs/) | DuckDB Foundation | Embedded analytical SQL | Rolling docs; match library version | 2026-07-13 |
