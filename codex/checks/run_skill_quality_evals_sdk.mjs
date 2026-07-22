#!/usr/bin/env node
import { Codex } from "@openai/codex-sdk";
import crypto from "node:crypto";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";
import { pathToFileURL, fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EVAL_ROOT = path.resolve(HERE, ".eval-tmp");
const MODEL = "gpt-5.6-sol";
const REASONING_EFFORT = "xhigh";
const DEFAULT_TIMEOUT_MS = 600_000;
const DEPENDENCY_SECTIONS = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];

const codingTask = (id, title, baseFiles, prompt, allowedChangedPaths, grade) => ({
  id, title, mode: "coding", baseFiles, prompt, allowedChangedPaths, grade,
});

const CODING_TASKS = [
  codingTask(
    "next_hydration_a11y",
    "Next.js hydration and accessible interaction",
    {
      "package.json": JSON.stringify({ private: true, scripts: { test: "node --test" }, dependencies: { next: "15.3.0", react: "19.1.0", "react-dom": "19.1.0" }, devDependencies: { typescript: "5.8.3", "@types/react": "19.1.2" } }, null, 2) + "\n",
      "app/page.tsx": `"use client";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  return <main><h1>Account</h1><p>Rendered at {Date.now()}</p><div onClick={() => setOpen(!open)}>Settings</div>{open && <section>Preferences</section>}</main>;
}
`,
    },
    "Fix the hydration instability and inaccessible Settings interaction. Keep this a Client Component, render stable server/client markup, use a native keyboard-accessible control, expose its expanded state and associate it with the preferences region. Make the smallest production-ready change and do not add dependencies.",
    ["app/page.tsx"],
    async (dir) => {
      const text = await fsp.readFile(path.join(dir, "app/page.tsx"), "utf8");
      return checks([
        ["no_render_time_entropy", !/Date\.now|new\s+Date|Math\.random/.test(text), "render output has no time/random entropy"],
        ["native_button", /<button\b/i.test(text) && !/<div\b[^>]*onClick/i.test(text), "interaction uses a native button"],
        ["expanded_state", /aria-expanded\s*=/.test(text), "button exposes aria-expanded"],
        ["controls_region", /aria-controls\s*=/.test(text) && /\bid\s*=/.test(text), "button is associated with the controlled region"],
      ]);
    },
  ),
  codingTask(
    "node_api_boundaries",
    "Node API validation, timeout, and idempotency",
    {
      "package.json": "{\n  \"private\": true,\n  \"type\": \"module\"\n}\n",
      "order-handler.mjs": `export function createOrderHandler({ charge, idempotencyStore, timeoutMs = 100 }) {
  return async function handle(request) {
    const result = await charge(request.body);
    return { status: 201, body: result };
  };
}
`,
    },
    "Implement createOrderHandler without dependencies. A request body is valid only when it is a plain object with a finite positive numeric amount and a three-letter uppercase currency. Require a non-empty `idempotency-key` header. Concurrent requests with the same key must share one charge and response. Call `charge(body, { signal })`; abort it at timeoutMs and return status 504. Invalid input returns 400 and must not call charge. Unexpected charge errors return 502. Always clear timers and allow a failed attempt to be retried.",
    ["order-handler.mjs"],
    async (dir) => {
      try {
        const moduleUrl = `${pathToFileURL(path.join(dir, "order-handler.mjs")).href}?v=${crypto.randomUUID()}`;
        const probe = `const { createOrderHandler } = await import(${JSON.stringify(moduleUrl)});
const request = (body, key = "key") => ({ body, headers: { "idempotency-key": key } });
async function bounded(promise, timeoutMs = 500) {
  let timer;
  try {
    return await Promise.race([promise, new Promise((resolve) => { timer = setTimeout(() => resolve({ status: -1 }), timeoutMs); })]);
  } finally { clearTimeout(timer); }
}

let validationCalls = 0;
const validationHandler = createOrderHandler({
  idempotencyStore: new Map(),
  charge: async () => { validationCalls += 1; return { id: "invalid" }; },
});
const invalidBodies = [
  null, [], Object.assign(Object.create({ inherited: true }), { amount: 12, currency: "USD" }),
  { amount: 0, currency: "USD" }, { amount: Infinity, currency: "USD" }, { amount: Number.NaN, currency: "USD" },
  { amount: "12", currency: "USD" }, { amount: 12, currency: "usd" },
  { amount: 12, currency: "US" }, { amount: 12, currency: "USDT" }, { amount: 12, currency: "123" },
];
const invalidBodyResponses = [];
for (let index = 0; index < invalidBodies.length; index += 1) invalidBodyResponses.push(await validationHandler(request(invalidBodies[index], \`bad-\${index}\`)));
const invalidHeaderResponses = [
  await validationHandler({ body: { amount: 12, currency: "USD" }, headers: {} }),
  await validationHandler(request({ amount: 12, currency: "USD" }, "   ")),
];

let successSignal = null;
const successHandler = createOrderHandler({
  idempotencyStore: new Map(), timeoutMs: 10_000,
  charge: async (body, options) => { successSignal = options?.signal; return { id: "paid", amount: body.amount }; },
});
const success = await successHandler(request({ amount: 12, currency: "USD" }, "success"));

let concurrentCalls = 0;
const concurrentHandler = createOrderHandler({
  idempotencyStore: new Map(), timeoutMs: 1_000,
  charge: async (body) => { concurrentCalls += 1; await new Promise((resolve) => setTimeout(resolve, 10)); return { id: "shared", amount: body.amount }; },
});
const concurrentRequest = request({ amount: 7, currency: "EUR" }, "same");
const [first, second] = await Promise.all([concurrentHandler(concurrentRequest), concurrentHandler(concurrentRequest)]);

let aborted = false;
const timeoutHandler = createOrderHandler({
  idempotencyStore: new Map(), timeoutMs: 15,
  charge: (_body, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener("abort", () => { aborted = true; reject(new Error("aborted")); }, { once: true });
  }),
});
const timeout = await bounded(timeoutHandler(request({ amount: 1, currency: "GBP" }, "slow")));

const errorHandler = createOrderHandler({
  idempotencyStore: new Map(),
  charge: async () => { throw new Error("provider failed"); },
});
const unexpected = await errorHandler(request({ amount: 2, currency: "CAD" }, "error"));

let retryCalls = 0;
const retryHandler = createOrderHandler({
  idempotencyStore: new Map(),
  charge: async () => { retryCalls += 1; if (retryCalls === 1) throw new Error("first failed"); return { id: "retried" }; },
});
const retryRequest = request({ amount: 3, currency: "JPY" }, "retry");
const retryFirst = await retryHandler(retryRequest);
const retrySecond = await retryHandler(retryRequest);

console.log(JSON.stringify({
  bodyValidation: invalidBodyResponses.every((item) => item?.status === 400) && validationCalls === 0,
  headerValidation: invalidHeaderResponses.every((item) => item?.status === 400) && validationCalls === 0,
  success: success?.status === 201 && success?.body?.id === "paid",
  signal: successSignal instanceof AbortSignal,
  concurrency: concurrentCalls === 1 && first?.status === 201 && JSON.stringify(first) === JSON.stringify(second),
  timeout: timeout?.status === 504 && aborted,
  unexpected: unexpected?.status === 502,
  retry: retryFirst?.status === 502 && retrySecond?.status === 201 && retrySecond?.body?.id === "retried" && retryCalls === 2,
}));
setTimeout(() => process.exit(97), 250).unref();`;
        const result = await runLocal(process.execPath, ["--input-type=module", "-e", probe], dir);
        let value = null;
        try { value = JSON.parse(result.stdout.trim()); } catch {}
        return checks([
          ["node_probe", result.status === 0, result.status === 0 ? "probe completed" : result.stderr || result.stdout],
          ["plain_object_and_fields", value?.bodyValidation === true, "body must be a plain object with a positive finite amount and three-letter uppercase currency"],
          ["idempotency_header", value?.headerValidation === true, "idempotency-key must be present and non-empty"],
          ["success_signal", value?.success === true && value?.signal === true, "successful charge receives an AbortSignal and returns 201"],
          ["concurrent_idempotency", value?.concurrency === true, "concurrent duplicates share one charge and successful response"],
          ["timeout_abort", value?.timeout === true, "timeout aborts charge and returns 504"],
          ["unexpected_error", value?.unexpected === true, "unexpected charge errors return 502"],
          ["failed_attempt_retry", value?.retry === true, "a failed idempotent attempt can be retried"],
          ["timer_cleanup", result.status === 0 && result.elapsedMs < 2_000, "cleared success timers do not keep the probe process alive"],
        ]);
      } catch (error) {
        return checks([["module_contract", false, errorMessage(error)]]);
      }
    },
  ),
  codingTask(
    "python_async_cleanup",
    "Python async cancellation and cleanup",
    {
      "worker.py": `import asyncio

async def run_jobs(jobs, worker):
    tasks = [asyncio.create_task(worker(job)) for job in jobs]
    return await asyncio.gather(*tasks)
`,
    },
    "Fix run_jobs so it returns results in input order on success. If any worker fails or the caller is cancelled, cancel every unfinished child, await all children to completion with exceptions collected, and then re-raise the original exception. Do not leak tasks or swallow cancellation. Use only the standard library.",
    ["worker.py"],
    async (dir) => {
      const probe = `import asyncio, json, worker
async def main():
    ordered_cleaned=[]
    async def ordered_worker(value):
        try:
            return value * 2
        finally:
            ordered_cleaned.append(value)
    ordered = await worker.run_jobs([1,2,3], ordered_worker)

    failure_cleaned=[]
    async def failure_worker(value):
        try:
            if value == 'fail':
                await asyncio.sleep(0)
                raise ValueError('boom')
            await asyncio.sleep(10)
        finally:
            failure_cleaned.append(value)
    raised = False
    try: await worker.run_jobs(['slow','fail'], failure_worker)
    except ValueError: raised = True
    await asyncio.sleep(0)
    failure_dangling = [t for t in asyncio.all_tasks() if t is not asyncio.current_task() and not t.done()]

    cancellation_started=set()
    cancellation_cleaned=[]
    all_started=asyncio.Event()
    async def cancellation_worker(value):
        cancellation_started.add(value)
        if len(cancellation_started) == 3: all_started.set()
        try:
            await asyncio.sleep(0.2)
        finally:
            cancellation_cleaned.append(value)
    caller = asyncio.create_task(worker.run_jobs(['a','b','c'], cancellation_worker))
    await asyncio.wait_for(all_started.wait(), 1)
    caller.cancel()
    cancelled = False
    try: await caller
    except asyncio.CancelledError: cancelled = True
    await asyncio.sleep(0)
    dangling = [t for t in asyncio.all_tasks() if t is not asyncio.current_task() and not t.done()]
    print(json.dumps({'ordered':ordered,'ordered_cleaned':ordered_cleaned,'raised':raised,'failure_cleaned':failure_cleaned,'failure_dangling':len(failure_dangling),'cancelled':cancelled,'cancellation_cleaned':cancellation_cleaned,'dangling':len(dangling)}))
asyncio.run(main())`;
      const result = await runLocal("python", ["-c", probe], dir);
      let value = null;
      try { value = JSON.parse(result.stdout.trim()); } catch {}
      return checks([
        ["python_probe", result.status === 0, result.status === 0 ? "probe completed" : result.stderr || result.stdout],
        ["ordered_results", JSON.stringify(value?.ordered) === "[2,4,6]" && value?.ordered_cleaned?.length === 3, "success results preserve input order"],
        ["failure_cleanup", value?.raised === true && value?.failure_cleaned?.includes("slow") && value?.failure_cleaned?.includes("fail") && value?.failure_dangling === 0, "worker failure cancels and awaits all children before re-raising"],
        ["caller_cancellation", value?.cancelled === true, "caller cancellation is re-raised"],
        ["cancellation_cleanup", value?.cancellation_cleaned?.length === 3 && value?.dangling === 0, "caller cancellation cleans up every child without dangling tasks"],
      ]);
    },
  ),
  codingTask(
    "powershell_literal_paths",
    "PowerShell literal path safety and errors",
    {
      "Remove-SafeFile.ps1": `function Remove-SafeFile {
    param([string]$Root, [string]$Name)
    Remove-Item "$Root\\$Name"
}
`,
    },
    "Implement Remove-SafeFile. Resolve Root to an absolute path, treat Name as a literal child name, reject rooted names and traversal outside Root, and remove only an existing file. Use literal-path cmdlet parameters and terminating error handling. On failure, throw an error that includes safe context but not file contents. Do not recurse and do not use another shell.",
    ["Remove-SafeFile.ps1"],
    async (dir) => {
      const text = await fsp.readFile(path.join(dir, "Remove-SafeFile.ps1"), "utf8");
      const probe = `$ErrorActionPreference='Stop'; . ./Remove-SafeFile.ps1; $root=Join-Path $PWD 'probe'; New-Item -ItemType Directory -Path $root | Out-Null; $inside=Join-Path $root '[safe].txt'; $outside=Join-Path $PWD 'outside.txt'; Set-Content -LiteralPath $inside -Value x; Set-Content -LiteralPath $outside -Value y; Remove-SafeFile -Root $root -Name '[safe].txt'; $rejected=$false; try { Remove-SafeFile -Root $root -Name '..\\outside.txt' } catch { $rejected=$true }; if ((Test-Path -LiteralPath $inside) -or -not (Test-Path -LiteralPath $outside) -or -not $rejected) { exit 9 }`;
      const result = await runLocal("powershell", ["-NoProfile", "-NonInteractive", "-Command", probe], dir);
      return checks([
        ["literal_path", /-(?:LiteralPath)\b/i.test(text) && !/Remove-Item\s+["']?\$Root/i.test(text), "file cmdlets use literal paths"],
        ["terminating_errors", /-ErrorAction\s+Stop/i.test(text) && /\btry\s*\{/i.test(text) && /\bcatch\s*\{/i.test(text), "terminating errors are handled"],
        ["containment_behavior", result.status === 0, result.status === 0 ? "inside literal file removed and traversal rejected" : result.stderr || result.stdout],
      ]);
    },
  ),
  codingTask(
    "sqlite_migration",
    "SQLite transactional migration and index",
    {
      "schema.sql": `CREATE TABLE accounts (id INTEGER PRIMARY KEY, email TEXT NOT NULL, display_name TEXT NOT NULL);
INSERT INTO accounts(email, display_name) VALUES ('Ada@Example.com', 'Ada');
`,
      "migration.sql": `ALTER TABLE accounts ADD COLUMN status TEXT;
`,
    },
    "Write a SQLite migration that preserves existing rows, adds `status TEXT NOT NULL DEFAULT 'active'`, and creates a named unique expression index `accounts_email_ci_uq` on `lower(email)`. The schema changes must be enclosed in an explicit immediate transaction. Modify only migration.sql.",
    ["migration.sql"],
    async (dir) => {
      const migration = await fsp.readFile(path.join(dir, "migration.sql"), "utf8");
      const probe = `import sqlite3, json
c=sqlite3.connect(':memory:')
c.executescript(open('schema.sql', encoding='utf8').read())
c.executescript(open('migration.sql', encoding='utf8').read())
cols=c.execute('pragma table_info(accounts)').fetchall()
idx=c.execute("select name, sql from sqlite_master where type='index' and name='accounts_email_ci_uq'").fetchone()
row=c.execute('select email,display_name,status from accounts').fetchone()
dup=False
try: c.execute("insert into accounts(email,display_name) values ('ada@example.COM','Other')")
except sqlite3.IntegrityError: dup=True
print(json.dumps({'cols':cols,'idx':idx,'row':row,'dup':dup}))`;
      const result = await runLocal("python", ["-c", probe], dir);
      let value = null;
      try { value = JSON.parse(result.stdout.trim()); } catch {}
      const statusColumn = value?.cols?.find((column) => column[1] === "status");
      return checks([
        ["explicit_transaction", /BEGIN\s+IMMEDIATE/i.test(migration) && /COMMIT/i.test(migration), "migration uses an immediate transaction"],
        ["schema_and_data", result.status === 0 && statusColumn?.[2] === "TEXT" && statusColumn?.[3] === 1 && statusColumn?.[4] === "'active'" && value?.row?.[2] === "active", result.status === 0 ? "column contract and existing row verified" : result.stderr || result.stdout],
        ["unique_expression_index", value?.idx?.[0] === "accounts_email_ci_uq" && /lower\s*\(\s*email\s*\)/i.test(value.idx[1]) && value?.dup === true, "case-insensitive uniqueness is enforced"],
      ]);
    },
  ),
  codingTask(
    "mongodb_atomic_reservation",
    "MongoDB pure atomic update and index specification",
    {
      "package.json": "{\n  \"private\": true,\n  \"type\": \"module\"\n}\n",
      "reservation.mjs": `export function buildReservation({ sku, quantity }) {
  return { filter: { sku }, update: { $set: { reserved: quantity } }, options: {} };
}

export const inventoryIndexes = [];
`,
    },
    "Keep this module pure and dependency-free. Validate sku as a non-empty string and quantity as a positive integer. buildReservation must return one atomic findOneAndUpdate specification whose filter prevents stock going below zero, whose update decrements available and increments reserved, and whose options return the updated document. Export an index specification named `inventory_sku_uq` that uniquely indexes sku.",
    ["reservation.mjs"],
    async (dir) => {
      try {
        const moduleUrl = `${pathToFileURL(path.join(dir, "reservation.mjs")).href}?v=${crypto.randomUUID()}`;
        const { buildReservation, inventoryIndexes } = await import(moduleUrl);
        const value = buildReservation({ sku: "ABC", quantity: 3 });
        let rejects = false;
        try { buildReservation({ sku: "", quantity: 0 }); } catch { rejects = true; }
        const index = inventoryIndexes?.find((item) => item?.options?.name === "inventory_sku_uq");
        return checks([
          ["validation", rejects, "invalid sku and quantity are rejected"],
          ["atomic_filter_update", value?.filter?.sku === "ABC" && value?.filter?.available?.$gte === 3 && value?.update?.$inc?.available === -3 && value?.update?.$inc?.reserved === 3, "one conditional atomic increment specification is returned"],
          ["return_and_index", value?.options?.returnDocument === "after" && index?.key?.sku === 1 && index?.options?.unique === true, "updated document option and unique sku index are specified"],
        ]);
      } catch (error) {
        return checks([["module_contract", false, errorMessage(error)]]);
      }
    },
  ),
  codingTask(
    "redis_ttl_idempotency",
    "Redis mocked TTL idempotency and concurrency",
    {
      "package.json": "{\n  \"private\": true,\n  \"type\": \"module\"\n}\n",
      "idempotency.mjs": `export function createIdempotencyGuard(client, { ttlSeconds = 60 } = {}) {
  return { async claim(key) { await client.set(key, "1"); return true; } };
}
`,
    },
    "Keep this module dependency-free. Validate ttlSeconds as a positive integer and claim keys as non-empty strings. claim(key) must atomically acquire `idempotency:<key>` with Redis SET using `{ NX: true, EX: ttlSeconds }`, returning true only for the winner and false for duplicates. It must remain correct when concurrent claims race. Do not use process-local state or live Redis.",
    ["idempotency.mjs"],
    async (dir) => {
      try {
        const calls = [];
        const keys = new Set();
        const client = { async set(key, value, options) { calls.push({ key, value, options }); if (!options?.NX || !options?.EX) throw new Error("missing atomic options"); if (keys.has(key)) return null; keys.add(key); return "OK"; } };
        const moduleUrl = `${pathToFileURL(path.join(dir, "idempotency.mjs")).href}?v=${crypto.randomUUID()}`;
        const { createIdempotencyGuard } = await import(moduleUrl);
        const guard = createIdempotencyGuard(client, { ttlSeconds: 42 });
        const results = await Promise.all([guard.claim("order-1"), guard.claim("order-1"), guard.claim("order-1")]);
        let invalid = 0;
        try { createIdempotencyGuard(client, { ttlSeconds: 0 }); } catch { invalid += 1; }
        try { await guard.claim(""); } catch { invalid += 1; }
        return checks([
          ["atomic_concurrency", results.filter(Boolean).length === 1 && results.filter((item) => item === false).length === 2, "exactly one concurrent claim wins"],
          ["redis_contract", calls.every((call) => call.key === "idempotency:order-1" && call.options?.NX === true && call.options?.EX === 42), "SET uses the required key, NX, and EX TTL"],
          ["validation", invalid === 2, "invalid TTL and key are rejected"],
        ]);
      } catch (error) {
        return checks([["module_contract", false, errorMessage(error)]]);
      }
    },
  ),
  codingTask(
    "python_spec_diagnosis",
    "Python diagnosis against specification and standards",
    {
      "parser.py": `def parse_bool(value):
    return bool(value)
`,
      "test_parser.py": `import unittest
from parser import parse_bool

class ParserTests(unittest.TestCase):
    def test_boolean_values(self):
        self.assertTrue(parse_bool(True))
        self.assertFalse(parse_bool(False))

if __name__ == "__main__":
    unittest.main()
`,
      "SPEC.md": `# Boolean input contract

Accept booleans, integers 1 and 0, and strings true/false/yes/no/1/0 after trimming and case folding. Reject every other value with ValueError. In particular, reject None, other integers, floats, containers, and arbitrary non-empty strings.
`,
      "STANDARDS.md": `# Parser standards

Parsing must use explicit allowlists, preserve bool before integer handling, avoid broad truthiness, and raise ValueError without including the submitted value in its message.
`,
    },
    "Diagnose the parser defect using the repository tests, SPEC.md, and STANDARDS.md, then fix parser.py. Do not change the tests or documents. Use only the standard library.",
    ["parser.py"],
    async (dir) => {
      const probe = `import parser, json
accepted=[(True,True),(False,False),(1,True),(0,False),(' TRUE ',True),('no',False),('1',True),('0',False)]
ok=all(parser.parse_bool(v) is e for v,e in accepted)
bad=[None,2,-1,1.0,[],{},'maybe','']
rejected=0; safe=True
for v in bad:
  try: parser.parse_bool(v)
  except ValueError as e:
    rejected += 1
    safe = safe and repr(v) not in str(e)
print(json.dumps({'ok':ok,'rejected':rejected,'safe':safe}))`;
      const tests = await runLocal("python", ["-m", "unittest", "-v"], dir);
      const hidden = await runLocal("python", ["-c", probe], dir);
      let value = null;
      try { value = JSON.parse(hidden.stdout.trim()); } catch {}
      return checks([
        ["visible_tests", tests.status === 0, tests.status === 0 ? "repository tests pass" : tests.stderr || tests.stdout],
        ["full_contract", hidden.status === 0 && value?.ok === true && value?.rejected === 8, hidden.status === 0 ? "accepted and rejected values match SPEC" : hidden.stderr || hidden.stdout],
        ["safe_errors", value?.safe === true, "ValueError messages do not echo submitted values"],
      ]);
    },
  ),
];

const routingTask = (id, scenario, requiredSkills) => ({
  id,
  title: scenario,
  mode: "routing",
  baseFiles: { "README.txt": "This is an isolated skill-routing fixture. Do not edit files.\n" },
  allowedChangedPaths: [],
  requiredSkills,
  allowedSkills: requiredSkills,
  prompt: `Select the exact minimal set of Codex skills needed for this request. Return only a JSON array of skill names in alphabetical order. Do not use tools and do not modify files.\n\nRequest: ${scenario}`,
  async grade(_dir, run) {
    let parsed;
    try { parsed = JSON.parse(run.final_answer); } catch { parsed = null; }
    const actual = Array.isArray(parsed) && parsed.every((item) => typeof item === "string") ? [...new Set(parsed)].sort() : [];
    const expected = [...requiredSkills].sort();
    return checks([["exact_skill_route", JSON.stringify(actual) === JSON.stringify(expected), `expected ${JSON.stringify(expected)}; received ${JSON.stringify(actual)}`]]);
  },
});

const ROUTING_TASKS = [
  routingTask("route_next_react_ts", "Implement an already diagnosed Next.js App Router TSX hydration fix and an accessible keyboard interaction whose focus behavior and interaction quality are explicit acceptance criteria, then run focused checks; reproduction and root-cause diagnosis are complete.", ["nextjs", "react", "ui-ux-design"]),
  routingTask("route_node_api", "Implement a REST endpoint on the Node.js HTTP runtime with public input validation, authorization, idempotency, timeouts, and focused handler tests. The ordinary JavaScript needs no language semantics, and no test strategy, infrastructure, CI, browser, deployment, or cross-layer evidence changes.", ["api-design", "node-js", "web-application-security"]),
  routingTask("route_python_async", "Fix cancellation cleanup in an asynchronous Python worker and add regression tests.", ["python", "systematic-debugging"]),
  routingTask("route_powershell", "Repair a failing PowerShell cleanup script so literal paths and errors are handled safely, then test it.", ["powershell", "systematic-debugging"]),
  routingTask("route_sql", "Design and verify a transactional PostgreSQL schema migration with indexes and rollback concerns.", ["sql"]),
  routingTask("route_mongodb", "Implement and test a MongoDB atomic inventory reservation and its indexes.", ["mongodb"]),
  routingTask("route_redis", "A supplied concurrency command deterministically reproduces duplicate processing in a Redis idempotency-key flow. Isolate the TTL race, fix it, and add the regression test.", ["redis", "systematic-debugging"]),
  routingTask("route_js_bug", "Reproduce and fix a JavaScript stream cleanup regression in a Node.js CLI, then add a focused test.", ["javascript", "node-js", "systematic-debugging"]),
  routingTask("route_project_docs", "Update AGENTS.md from repository evidence and verify that its commands and paths are current.", ["project-documentation"]),
  routingTask("route_plan", "Create an evidence-backed architecture and sequencing plan for a material monolith split involving module boundaries, data ownership, failure isolation, and deployment topology; do not implement, define an external API, or design a test strategy.", ["planning", "software-engineering"]),
  routingTask("route_web_research", "Research the current Node.js release schedule with authoritative links and citations; do not change code.", ["web-research"]),
  routingTask("route_dependency_eval", "Evaluate whether to upgrade a versioned dependency by checking the installed version, official migration guide, compatibility, security advisories, license, maintenance, and a smoke-test plan.", ["web-research"]),
  routingTask("route_domain_model_explicit", "Use $domain-modeling to clarify invoice vocabulary, ownership, states, invariants, counterexamples, and acceptance cases before architecture or implementation.", ["domain-modeling"]),
  routingTask("route_grill_me_explicit", "Use $grill-me to interview me on the consequential unresolved decisions one question at a time. Inspect available facts first, recommend an answer for each question, and do not plan or implement.", ["grill-me"]),
  routingTask("route_ts_auth", "Fix a TypeScript API object-authorization flaw that changes public request validation and the authorization error-response contract, then add negative security tests; no Node process, module, package, I/O, or runtime mechanics change.", ["api-design", "typescript", "web-application-security"]),
];

const ALL_TASKS = [...CODING_TASKS, ...ROUTING_TASKS];

function checks(items) {
  const results = items.map(([id, passed, detail]) => ({ id, passed: Boolean(passed), detail: String(detail).slice(0, 4000) }));
  return { passed: results.every((item) => item.passed), checks: results };
}

function errorMessage(error) {
  return error instanceof Error ? error.stack || error.message : String(error);
}

function parseInteger(flag, raw, minimum = 1) {
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < minimum) throw new Error(`${flag} must be an integer >= ${minimum}`);
  return value;
}

function parseArgs(argv) {
  const args = { variant: null, replicates: 2, mode: "all", concurrency: 4, timeoutMs: DEFAULT_TIMEOUT_MS, jsonOut: null, markdownOut: null, keepWorkdirs: false, list: false, selfTest: false };
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (item === "--variant") args.variant = argv[++index];
    else if (item === "--replicates") args.replicates = parseInteger(item, argv[++index]);
    else if (item === "--mode") args.mode = argv[++index];
    else if (item === "--concurrency") args.concurrency = parseInteger(item, argv[++index]);
    else if (item === "--timeout-ms") args.timeoutMs = parseInteger(item, argv[++index], 1000);
    else if (item === "--json-out") args.jsonOut = path.resolve(argv[++index]);
    else if (item === "--markdown-out") args.markdownOut = path.resolve(argv[++index]);
    else if (item === "--keep-workdirs") args.keepWorkdirs = true;
    else if (item === "--list") args.list = true;
    else if (item === "--self-test") args.selfTest = true;
    else throw new Error(`Unknown argument: ${item}`);
  }
  if (!args.list && !args.selfTest && !["baseline", "candidate"].includes(args.variant)) throw new Error("--variant must be baseline or candidate");
  if (!["coding", "routing", "all"].includes(args.mode)) throw new Error("--mode must be coding, routing, or all");
  return args;
}

function listTasks() {
  process.stdout.write("task_id\tmode\tallowed_changed_paths\trequired_skills\tallowed_skills\n");
  for (const task of ALL_TASKS) {
    process.stdout.write(`${task.id}\t${task.mode}\t${task.allowedChangedPaths.join(",")}\t${(task.requiredSkills || []).join(",")}\t${(task.allowedSkills || []).join(",")}\n`);
  }
}

async function selfTest() {
  let timerTicks = 0;
  const interval = setInterval(() => { timerTicks += 1; }, 5);
  const responsive = await runLocal(
    process.execPath,
    ["-e", "setTimeout(() => process.stdout.write('ready'), 80)"],
    HERE,
    { timeoutMs: 1_000 },
  );
  clearInterval(interval);
  const terminated = await runLocal(
    process.execPath,
    ["-e", "setInterval(() => {}, 1_000)"],
    HERE,
    { timeoutMs: 30 },
  );
  const result = checks([
    ["async_timer_responsiveness", responsive.status === 0 && responsive.stdout === "ready" && timerTicks >= 5, `child completed while ${timerTicks} parent timer ticks ran`],
    ["timeout_termination", terminated.timedOut === true && terminated.elapsedMs < 1_000, `timedOut=${terminated.timedOut}; elapsedMs=${terminated.elapsedMs}; signal=${terminated.signal}`],
  ]);
  process.stdout.write(`${JSON.stringify(result)}\n`);
  if (!result.passed) process.exitCode = 1;
}

function normalizeRelative(value) {
  return value.split(path.sep).join("/");
}

async function safeRemove(target) {
  const resolvedRoot = path.resolve(EVAL_ROOT);
  const resolvedTarget = path.resolve(target);
  const relative = path.relative(resolvedRoot, resolvedTarget);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) throw new Error(`Refusing recursive delete outside a child of ${resolvedRoot}: ${resolvedTarget}`);
  await fsp.rm(resolvedTarget, { recursive: true, force: true });
}

async function writeFixture(task, target) {
  await fsp.mkdir(target, { recursive: true });
  for (const [relative, content] of Object.entries(task.baseFiles)) {
    const destination = path.resolve(target, relative);
    const containment = path.relative(target, destination);
    if (containment.startsWith("..") || path.isAbsolute(containment)) throw new Error(`Invalid fixture path: ${relative}`);
    await fsp.mkdir(path.dirname(destination), { recursive: true });
    await fsp.writeFile(destination, content, "utf8");
  }
}

async function snapshotDirectory(root) {
  const entries = new Map();
  async function visit(directory) {
    const children = await fsp.readdir(directory, { withFileTypes: true });
    children.sort((a, b) => a.name.localeCompare(b.name));
    for (const child of children) {
      const absolute = path.join(directory, child.name);
      if (child.isDirectory()) await visit(absolute);
      else if (child.isFile()) entries.set(normalizeRelative(path.relative(root, absolute)), await fsp.readFile(absolute));
    }
  }
  await visit(root);
  return entries;
}

function digestSnapshot(snapshot) {
  const hash = crypto.createHash("sha256");
  for (const [relative, content] of [...snapshot.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    hash.update(relative); hash.update("\0"); hash.update(content); hash.update("\0");
  }
  return hash.digest("hex");
}

function lineDiff(beforeBuffer, afterBuffer) {
  const before = beforeBuffer ? beforeBuffer.toString("utf8").split(/\r?\n/) : [];
  const after = afterBuffer ? afterBuffer.toString("utf8").split(/\r?\n/) : [];
  if (before.length * after.length > 1_000_000) return { added: after.length, deleted: before.length, approximate: true };
  const previous = new Uint32Array(after.length + 1);
  for (let row = 1; row <= before.length; row += 1) {
    let diagonal = 0;
    for (let column = 1; column <= after.length; column += 1) {
      const saved = previous[column];
      previous[column] = before[row - 1] === after[column - 1] ? diagonal + 1 : Math.max(previous[column], previous[column - 1]);
      diagonal = saved;
    }
  }
  const common = previous[after.length];
  return { added: after.length - common, deleted: before.length - common, approximate: false };
}

function changedFiles(before, after) {
  const paths = [...new Set([...before.keys(), ...after.keys()])].sort();
  return paths.flatMap((relative) => {
    const oldValue = before.get(relative);
    const newValue = after.get(relative);
    if (oldValue?.equals(newValue)) return [];
    const kind = oldValue === undefined ? "added" : newValue === undefined ? "deleted" : "modified";
    return [{ path: relative, kind, bytes_before: oldValue?.length || 0, bytes_after: newValue?.length || 0, loc: lineDiff(oldValue, newValue) }];
  });
}

function dependencyMap(snapshot) {
  const result = new Map();
  for (const [relative, content] of snapshot) {
    if (path.posix.basename(relative) !== "package.json") continue;
    try {
      const manifest = JSON.parse(content.toString("utf8"));
      for (const section of DEPENDENCY_SECTIONS) {
        for (const [name, version] of Object.entries(manifest[section] || {})) result.set(`${relative}:${section}:${name}`, String(version));
      }
    } catch {}
  }
  return result;
}

function addedDependencies(before, after) {
  const oldDependencies = dependencyMap(before);
  const newDependencies = dependencyMap(after);
  return [...newDependencies.entries()].filter(([key, value]) => oldDependencies.get(key) !== value).map(([key, value]) => ({ key, version: value, previous: oldDependencies.get(key) || null }));
}

function observedSkillReads(commands) {
  const observed = new Set();
  const pattern = /(?:^|[\\/\s"'])(?:skills[\\/])([a-z0-9._:-]+)[\\/]SKILL\.md\b/gi;
  for (const record of commands) {
    for (const match of record.command.matchAll(pattern)) observed.add(match[1]);
  }
  return [...observed].sort();
}

function runLocal(command, args, cwd, { timeoutMs = 15_000 } = {}) {
  return new Promise((resolve) => {
    const started = Date.now();
    let stdout = "";
    let stderr = "";
    let spawnError = null;
    let timedOut = false;
    let timeout;
    let forceKillTimeout;
    let settled = false;
    let child;

    function finish(status, signal) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      clearTimeout(forceKillTimeout);
      const errorText = spawnError ? errorMessage(spawnError) : "";
      resolve({
        status,
        signal,
        stdout,
        stderr: [stderr, errorText].filter(Boolean).join("\n"),
        timedOut,
        elapsedMs: Date.now() - started,
      });
    }

    try {
      child = spawn(command, args, {
        cwd,
        windowsHide: true,
        shell: false,
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch (error) {
      spawnError = error;
      finish(null, null);
      return;
    }

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.once("error", (error) => {
      spawnError = error;
      if (child.pid === undefined) finish(null, null);
    });
    child.once("close", (status, signal) => finish(status, signal));

    timeout = setTimeout(() => {
      timedOut = true;
      stderr += `${stderr ? "\n" : ""}Timed out after ${timeoutMs} ms`;
      if (child.exitCode !== null || child.signalCode !== null) return;
      child.kill("SIGTERM");
      forceKillTimeout = setTimeout(() => {
        if (child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
      }, 250);
    }, timeoutMs);
  });
}

function infrastructureError(message) {
  return /(?:authentication|not logged in|api key|\b401\b|\b403\b|quota|rate.?limit|model[^\n]*(?:not found|unavailable)|codex exec exited|unable to locate codex|ECONNREFUSED|ENOTFOUND|service unavailable)/i.test(message);
}

function codingPrompt(task) {
  return `Work only in the current fixture directory. Do not inspect parent directories or use external network or live services.\n\nTask: ${task.prompt}\n\nAllowed changed paths: ${task.allowedChangedPaths.map((item) => `\`${item}\``).join(", ")}. Do not change or create any other path. Inspect the fixture, implement the fix, run useful local checks, and give a concise final answer.`;
}

async function runOne(codex, task, replicate, args, runRoot, stopState) {
  const workdirName = `${task.id}-r${replicate}`;
  const runId = `${path.basename(runRoot)}:${workdirName}`;
  const workdir = path.join(runRoot, workdirName);
  await writeFixture(task, workdir);
  const before = await snapshotDirectory(workdir);
  const started = Date.now();
  const run = {
    run_id: runId, variant: args.variant, task_id: task.id, task_mode: task.mode, replicate,
    model: MODEL, reasoning_effort: REASONING_EFFORT,
    fixture_digest_before: digestSnapshot(before), fixture_digest_after: null,
    elapsed_ms: null, thread_id: null, usage: null, event_types: [], command_records: [],
    file_changes: [], observed_skill_file_reads: [], skill_activation_unavailable: true,
    final_answer: "", grader: null, changed_file_count: 0, loc_added: 0, loc_deleted: 0,
    dependencies_added: [], passed: false, failure_kind: null, error: null,
  };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(new Error(`Timed out after ${args.timeoutMs} ms`)), args.timeoutMs);
  function captureRunError(message) {
    run.error = message;
    if (infrastructureError(message)) {
      run.failure_kind = "infrastructure_blocked";
      stopState.infrastructureBlocked = true;
      stopState.infrastructureError ||= message;
    }
  }
  try {
    const thread = codex.startThread({
      model: MODEL, modelReasoningEffort: REASONING_EFFORT, workingDirectory: workdir,
      sandboxMode: "workspace-write", skipGitRepoCheck: true, approvalPolicy: "never",
      networkAccessEnabled: false, webSearchMode: "disabled",
    });
    const streamed = await thread.runStreamed(task.mode === "coding" ? codingPrompt(task) : task.prompt, { signal: controller.signal });
    for await (const event of streamed.events) {
      run.event_types.push(event.type);
      if (event.type === "thread.started") run.thread_id = event.thread_id;
      else if (event.type === "turn.completed") run.usage = event.usage;
      else if (event.type === "turn.failed") captureRunError(event.error?.message || "turn failed");
      else if (event.type === "error") captureRunError(event.message);
      else if (event.type === "item.completed" && event.item.type === "agent_message") run.final_answer = event.item.text.trim();
      else if (event.type === "item.completed" && event.item.type === "command_execution") {
        const output = event.item.aggregated_output || "";
        run.command_records.push({ command: event.item.command, status: event.item.status, exit_code: event.item.exit_code ?? null, output: output.slice(0, 20_000), output_truncated: output.length > 20_000 });
      }
    }
  } catch (error) {
    const message = errorMessage(error);
    if (controller.signal.aborted) {
      run.error = message;
      run.failure_kind = "timeout";
    } else captureRunError(message);
  } finally {
    clearTimeout(timeout);
  }

  const after = await snapshotDirectory(workdir);
  run.fixture_digest_after = digestSnapshot(after);
  run.file_changes = changedFiles(before, after);
  run.changed_file_count = run.file_changes.length;
  run.loc_added = run.file_changes.reduce((sum, item) => sum + item.loc.added, 0);
  run.loc_deleted = run.file_changes.reduce((sum, item) => sum + item.loc.deleted, 0);
  run.dependencies_added = addedDependencies(before, after);
  run.observed_skill_file_reads = observedSkillReads(run.command_records);
  const disallowed = run.file_changes.filter((item) => !task.allowedChangedPaths.includes(item.path));

  if (!run.failure_kind && run.error) run.failure_kind = "agent_error";

  if (!run.failure_kind) {
    try { run.grader = await task.grade(workdir, run); }
    catch (error) { run.grader = checks([["grader_execution", false, errorMessage(error)]]); }
    if (disallowed.length) {
      run.grader.checks.push({ id: "allowed_paths", passed: false, detail: `disallowed changes: ${disallowed.map((item) => item.path).join(", ")}` });
      run.grader.passed = false;
      run.failure_kind = "unauthorized_changes";
    } else if (run.dependencies_added.length) {
      run.grader.checks.push({ id: "no_dependencies_added", passed: false, detail: `dependency changes: ${run.dependencies_added.map((item) => item.key).join(", ")}` });
      run.grader.passed = false;
      run.failure_kind = "dependencies_added";
    } else if (!run.grader.passed) run.failure_kind = "grading_failure";
    else run.passed = true;
  }
  run.elapsed_ms = Date.now() - started;
  if (!args.keepWorkdirs) await safeRemove(workdir);
  return run;
}

function aggregate(runs, args, startedAt, stopState) {
  const byTask = {};
  for (const task of ALL_TASKS.filter((item) => args.mode === "all" || item.mode === args.mode)) {
    const selected = runs.filter((run) => run.task_id === task.id);
    byTask[task.id] = { mode: task.mode, scheduled: args.replicates, completed: selected.length, passed: selected.filter((run) => run.passed).length, pass_rate: selected.length ? selected.filter((run) => run.passed).length / selected.length : null };
  }
  const totalLocAdded = runs.reduce((sum, run) => sum + run.loc_added, 0);
  const failureKinds = {};
  for (const run of runs.filter((item) => item.failure_kind)) failureKinds[run.failure_kind] = (failureKinds[run.failure_kind] || 0) + 1;
  const scheduled = Object.keys(byTask).length * args.replicates;
  const infrastructureBlocked = stopState.infrastructureBlocked;
  return {
    status: infrastructureBlocked ? "infrastructure_blocked" : runs.length === scheduled && runs.every((run) => run.passed) ? "passed" : "failed",
    scheduled, completed: runs.length, passed: runs.filter((run) => run.passed).length,
    failed: runs.filter((run) => !run.passed).length, unscheduled: scheduled - runs.length,
    pass_rate: runs.length && !infrastructureBlocked ? runs.filter((run) => run.passed).length / runs.length : null,
    elapsed_ms: Date.now() - startedAt, average_elapsed_ms: runs.length ? Math.round(runs.reduce((sum, run) => sum + run.elapsed_ms, 0) / runs.length) : null,
    total_changed_files: runs.reduce((sum, run) => sum + run.changed_file_count, 0), total_loc_added: totalLocAdded,
    total_loc_deleted: runs.reduce((sum, run) => sum + run.loc_deleted, 0), failure_kinds: failureKinds,
    infrastructure_error: stopState.infrastructureError || null, by_task: byTask,
  };
}

async function writeReports(report, args) {
  if (args.jsonOut) {
    await fsp.mkdir(path.dirname(args.jsonOut), { recursive: true });
    await fsp.writeFile(args.jsonOut, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  }
  if (args.markdownOut) {
    const lines = [
      "# Skill quality evaluation", "",
      `Run: \`${report.run_id}\``, `Variant: \`${report.variant}\``, `Status: **${report.summary.status}**`,
      `Model: \`${report.model}\` with \`${report.reasoning_effort}\` reasoning`,
      `Mode: \`${report.mode}\`; replicates: ${report.replicates}; completed: ${report.summary.completed}/${report.summary.scheduled}; passed: ${report.summary.passed}`, "",
      "| Task | Mode | Replicate | Result | Failure kind | Changed files | LOC + / - | Elapsed ms |", "|---|---|---:|---|---|---:|---:|---:|",
    ];
    for (const run of report.runs) lines.push(`| ${run.task_id} | ${run.task_mode} | ${run.replicate} | ${run.passed ? "PASS" : "FAIL"} | ${run.failure_kind || "—"} | ${run.changed_file_count} | ${run.loc_added} / ${run.loc_deleted} | ${run.elapsed_ms} |`);
    lines.push("", "## Per-task summary", "", "| Task | Completed | Passed | Pass rate |", "|---|---:|---:|---:|");
    for (const [taskId, value] of Object.entries(report.summary.by_task)) lines.push(`| ${taskId} | ${value.completed}/${value.scheduled} | ${value.passed} | ${value.pass_rate === null ? "—" : `${(value.pass_rate * 100).toFixed(1)}%`} |`);
    if (report.summary.infrastructure_error) lines.push("", "Infrastructure blocker:", "", "```text", report.summary.infrastructure_error.slice(0, 4000), "```");
    await fsp.mkdir(path.dirname(args.markdownOut), { recursive: true });
    await fsp.writeFile(args.markdownOut, `${lines.join("\n")}\n`, "utf8");
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.list) { listTasks(); return; }
  if (args.selfTest) { await selfTest(); return; }
  const startedAt = Date.now();
  const suiteRunId = `${new Date().toISOString().replace(/[:.]/g, "-")}-${args.variant}-${crypto.randomUUID().slice(0, 8)}`;
  await fsp.mkdir(EVAL_ROOT, { recursive: true });
  const runRoot = path.join(EVAL_ROOT, suiteRunId);
  await fsp.mkdir(runRoot, { recursive: true });
  const tasks = ALL_TASKS.filter((task) => args.mode === "all" || task.mode === args.mode);
  const jobs = tasks.flatMap((task) => Array.from({ length: args.replicates }, (_, index) => ({ task, replicate: index + 1 })));
  const stopState = { infrastructureBlocked: false, infrastructureError: null };
  const codex = new Codex({ config: { sandbox_workspace_write: { network_access: false }, web_search: "disabled" } });
  const results = [];
  let cursor = 0;
  async function worker() {
    while (!stopState.infrastructureBlocked) {
      const index = cursor;
      cursor += 1;
      if (index >= jobs.length) return;
      const job = jobs[index];
      const result = await runOne(codex, job.task, job.replicate, args, runRoot, stopState);
      results.push({ index, result });
    }
  }
  await Promise.all(Array.from({ length: Math.min(args.concurrency, jobs.length) }, () => worker()));
  const runs = results.sort((a, b) => a.index - b.index).map((item) => item.result);
  const report = {
    schema_version: 1, run_id: suiteRunId, variant: args.variant, mode: args.mode, replicates: args.replicates,
    concurrency: args.concurrency, timeout_ms: args.timeoutMs, model: MODEL, reasoning_effort: REASONING_EFFORT,
    sandbox: "workspace-write", network_access: false, web_search: "disabled", approval_policy: "never",
    started_at: new Date(startedAt).toISOString(), finished_at: new Date().toISOString(),
    skill_activation_unavailable: true,
    task_catalog: tasks.map((task) => ({ task_id: task.id, mode: task.mode, allowed_changed_paths: task.allowedChangedPaths, required_skills: task.requiredSkills || [], allowed_skills: task.allowedSkills || [], fixture_digest: digestSnapshot(new Map(Object.entries(task.baseFiles).map(([name, value]) => [name, Buffer.from(value)]))) })),
    summary: aggregate(runs, args, startedAt, stopState), runs,
  };
  await writeReports(report, args);
  if (!args.keepWorkdirs) await safeRemove(runRoot);
  process.stdout.write(`${JSON.stringify(report.summary)}\n`);
  process.exitCode = report.summary.status === "passed" ? 0 : 1;
}

main().catch((error) => {
  process.stderr.write(`${errorMessage(error)}\n`);
  process.exitCode = 1;
});
