#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const CONTROL = { model: "gpt-5.6-sol", reasoning_effort: "xhigh" };

function fail(message) {
  throw new Error(message);
}

function parseArgs(argv) {
  const args = { self_test: false };
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (flag === "--self-test") args.self_test = true;
    else if (["--baseline-coding", "--baseline-routing", "--candidate-coding", "--candidate-routing", "--json-out", "--markdown-out"].includes(flag)) {
      const value = argv[++index];
      if (!value) fail(`${flag} requires a path`);
      args[flag.slice(2).replaceAll("-", "_")] = path.resolve(value);
    } else fail(`Unknown argument: ${flag}`);
  }
  if (!args.self_test) {
    for (const name of ["baseline_coding", "baseline_routing", "candidate_coding", "candidate_routing"]) {
      if (!args[name]) fail(`--${name.replaceAll("_", "-")} is required`);
    }
  }
  return args;
}

function sortedCatalog(report) {
  return [...report.task_catalog]
    .map((item) => ({
      task_id: item.task_id,
      mode: item.mode,
      allowed_changed_paths: [...(item.allowed_changed_paths || [])].sort(),
      required_skills: [...(item.required_skills || [])].sort(),
      allowed_skills: [...(item.allowed_skills || [])].sort(),
      fixture_digest: item.fixture_digest,
    }))
    .sort((a, b) => a.task_id.localeCompare(b.task_id));
}

function runKey(run) {
  return `${run.task_id}#${run.replicate}`;
}

function recomputeByTask(report) {
  const result = {};
  for (const task of report.task_catalog) {
    const runs = report.runs.filter((run) => run.task_id === task.task_id);
    result[task.task_id] = {
      completed: runs.length,
      passed: runs.filter((run) => run.passed).length,
    };
  }
  return result;
}

function validateReport(report, file, expectedVariant, expectedMode) {
  if (report.schema_version !== 1) fail(`${file} has unsupported schema_version`);
  if (report.variant !== expectedVariant || report.mode !== expectedMode) fail(`${file} must be ${expectedVariant}/${expectedMode}`);
  if (report.model !== CONTROL.model || report.reasoning_effort !== CONTROL.reasoning_effort) fail(`${file} changed the controlled model or reasoning effort`);
  if (!Array.isArray(report.task_catalog) || !Array.isArray(report.runs) || !Number.isSafeInteger(report.replicates) || report.replicates < 1) fail(`${file} has an invalid catalog, runs, or replicate count`);
  const taskIds = report.task_catalog.map((task) => task.task_id);
  if (new Set(taskIds).size !== taskIds.length) fail(`${file} has duplicate task catalog IDs`);
  const keys = report.runs.map(runKey);
  if (new Set(keys).size !== keys.length) fail(`${file} has duplicate task/replicate runs`);
  const expectedKeys = report.task_catalog.flatMap((task) => Array.from({ length: report.replicates }, (_, index) => `${task.task_id}#${index + 1}`)).sort();
  if (JSON.stringify([...keys].sort()) !== JSON.stringify(expectedKeys)) fail(`${file} is missing or adds task replicates`);
  const byTask = recomputeByTask(report);
  const passed = report.runs.filter((run) => run.passed).length;
  const scheduled = expectedKeys.length;
  if (report.summary.status === "infrastructure_blocked" || report.summary.completed !== report.runs.length || report.summary.scheduled !== scheduled || report.summary.passed !== passed) fail(`${file} summary is incomplete or inconsistent`);
  for (const [taskId, value] of Object.entries(byTask)) {
    const reported = report.summary.by_task?.[taskId];
    if (!reported || reported.completed !== value.completed || reported.passed !== value.passed) fail(`${file} has an inconsistent summary for ${taskId}`);
  }
  return report;
}

function readReport(file, expectedVariant, expectedMode) {
  return validateReport(JSON.parse(fs.readFileSync(file, "utf8")), file, expectedVariant, expectedMode);
}

function assertComparableSuite(baseline, candidate, suite) {
  if (baseline.replicates !== candidate.replicates) fail(`${suite} reports use different replicate counts`);
  if (JSON.stringify(sortedCatalog(baseline)) !== JSON.stringify(sortedCatalog(candidate))) fail(`${suite} reports use different task catalogs or fixtures`);
  const baselineKeys = baseline.runs.map(runKey).sort();
  const candidateKeys = candidate.runs.map(runKey).sort();
  if (JSON.stringify(baselineKeys) !== JSON.stringify(candidateKeys)) fail(`${suite} reports do not contain identical task replicates`);
}

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function totals(report) {
  const usage = report.runs.map((run) => run.usage || {});
  return {
    completed: report.runs.length,
    passed: report.runs.filter((run) => run.passed).length,
    pass_rate: report.runs.filter((run) => run.passed).length / report.runs.length,
    median_changed_files: median(report.runs.map((run) => run.changed_file_count)),
    median_changed_loc: median(report.runs.map((run) => run.loc_added + run.loc_deleted)),
    median_elapsed_ms: median(report.runs.map((run) => run.elapsed_ms)),
    input_tokens: usage.reduce((sum, item) => sum + (item.input_tokens || 0), 0),
    cached_input_tokens: usage.reduce((sum, item) => sum + (item.cached_input_tokens || 0), 0),
    output_tokens: usage.reduce((sum, item) => sum + (item.output_tokens || 0), 0),
    reasoning_output_tokens: usage.reduce((sum, item) => sum + (item.reasoning_output_tokens || 0), 0),
  };
}

function passCountByTask(report) {
  return Object.fromEntries(Object.entries(recomputeByTask(report)).map(([task, value]) => [task, value.passed]));
}

function taskRegressions(baseline, candidate) {
  const baselineCounts = passCountByTask(baseline);
  const candidateCounts = passCountByTask(candidate);
  return Object.keys(baselineCounts).filter((task) => candidateCounts[task] < baselineCounts[task]);
}

function routingSelections(report) {
  return report.runs.map((run) => {
    let parsed;
    try { parsed = JSON.parse(run.final_answer); } catch { parsed = null; }
    const skills = Array.isArray(parsed) && parsed.every((item) => typeof item === "string") ? [...new Set(parsed)].sort() : [];
    return { run_id: run.run_id, task_id: run.task_id, replicate: run.replicate, skills };
  });
}

function gate(id, passed, detail, hard = true) {
  return { id, passed: Boolean(passed), hard, detail };
}

function buildComparison(reports, sourceReports = {}) {
  assertComparableSuite(reports.baseline.coding, reports.candidate.coding, "coding");
  assertComparableSuite(reports.baseline.routing, reports.candidate.routing, "routing");
  const metrics = {
    baseline: { coding: totals(reports.baseline.coding), routing: totals(reports.baseline.routing) },
    candidate: { coding: totals(reports.candidate.coding), routing: totals(reports.candidate.routing) },
  };
  const codingRegressions = taskRegressions(reports.baseline.coding, reports.candidate.coding);
  const routingRegressions = taskRegressions(reports.baseline.routing, reports.candidate.routing);
  const selections = routingSelections(reports.candidate.routing);
  const deletedLeaks = selections.flatMap((selection) => selection.skills.filter((skill) => ["software-architecture", "delivery-verification"].includes(skill)).map((skill) => `${selection.task_id}#${selection.replicate}:${skill}`));
  const nextRouting = selections
    .filter((selection) => selection.task_id === "route_next_react_ts")
    .map((selection) => ({
      ...selection,
      countedSkills: selection.skills.filter((skill) => skill !== "systematic-debugging"),
    }));
  const nextOverBudget = nextRouting.filter((selection) => selection.countedSkills.length > 3);
  const candidateRuns = reports.candidate.coding.runs;
  const catalog = new Map(reports.candidate.coding.task_catalog.map((task) => [task.task_id, task]));
  const hardScopeFailures = candidateRuns.filter((run) => run.dependencies_added.length || run.file_changes.some((change) => !catalog.get(run.task_id).allowed_changed_paths.includes(change.path)));
  const scopeGrowth = metrics.candidate.coding.median_changed_loc > metrics.baseline.coding.median_changed_loc;
  const severeScopeGrowth = metrics.candidate.coding.median_changed_loc > Math.max(metrics.baseline.coding.median_changed_loc * 2, metrics.baseline.coding.median_changed_loc + 20);
  const gates = [
    gate("coding_pass_rate", metrics.candidate.coding.pass_rate >= metrics.baseline.coding.pass_rate, `${(metrics.baseline.coding.pass_rate * 100).toFixed(1)}% -> ${(metrics.candidate.coding.pass_rate * 100).toFixed(1)}%`),
    gate("no_coding_task_regression", codingRegressions.length === 0, codingRegressions.length ? codingRegressions.join(", ") : "no coding task lost a passing replicate"),
    gate("routing_pass_rate", metrics.candidate.routing.pass_rate >= metrics.baseline.routing.pass_rate, `${(metrics.baseline.routing.pass_rate * 100).toFixed(1)}% -> ${(metrics.candidate.routing.pass_rate * 100).toFixed(1)}%`),
    gate("no_routing_task_regression", routingRegressions.length === 0, routingRegressions.length ? routingRegressions.join(", ") : "no routing task lost a passing replicate"),
  gate("next_skill_budget", nextOverBudget.length === 0, nextOverBudget.length ? nextOverBudget.map((item) => `${item.task_id}#${item.replicate}:${item.countedSkills.join(",")} (all: ${item.skills.join(",")})`).join("; ") : "every Next routing run selected at most three implementation/domain skills; an explicitly relevant debugging workflow is not counted"),
    gate("deleted_skills_absent", deletedLeaks.length === 0, deletedLeaks.length ? deletedLeaks.join(", ") : "deleted skills were not selected"),
    gate("no_unrelated_changes_or_dependencies", hardScopeFailures.length === 0, hardScopeFailures.length ? hardScopeFailures.map((run) => run.run_id).join(", ") : "candidate runs stayed within fixture contracts"),
    gate("no_severe_scope_regression", !severeScopeGrowth, `${metrics.baseline.coding.median_changed_loc} -> ${metrics.candidate.coding.median_changed_loc} median changed LOC`),
    gate("scope_efficiency_review", !scopeGrowth, scopeGrowth ? `median changed LOC increased ${metrics.baseline.coding.median_changed_loc} -> ${metrics.candidate.coding.median_changed_loc}; inspect specification justification` : "median changed LOC did not increase", false),
  ];
  return {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    ...CONTROL,
    accepted: gates.filter((item) => item.hard).every((item) => item.passed),
    metrics,
    gates,
    candidate_routing: selections,
    source_reports: sourceReports,
  };
}

function markdown(report) {
  const lines = [
    "# GPT-5.6 Sol instruction and skill comparison", "",
    `Decision: **${report.accepted ? "ACCEPT" : "REJECT"}**`,
    `Model control: \`${report.model}\` with \`${report.reasoning_effort}\` reasoning`, "",
    "| Suite | Variant | Passed | Pass rate | Median files | Median LOC | Input tokens | Median latency ms |",
    "|---|---|---:|---:|---:|---:|---:|---:|",
  ];
  for (const suite of ["coding", "routing"]) for (const variant of ["baseline", "candidate"]) {
    const value = report.metrics[variant][suite];
    lines.push(`| ${suite} | ${variant} | ${value.passed}/${value.completed} | ${(100 * value.pass_rate).toFixed(1)}% | ${value.median_changed_files} | ${value.median_changed_loc} | ${value.input_tokens} | ${value.median_elapsed_ms} |`);
  }
  lines.push("", "## Acceptance gates", "", "| Gate | Result | Detail |", "|---|---|---|");
  for (const item of report.gates) lines.push(`| ${item.id} | ${item.passed ? "PASS" : item.hard ? "FAIL" : "REVIEW"} | ${item.detail.replaceAll("|", "\\|")} |`);
  lines.push("", "## Candidate routing", "", "| Task | Replicate | Selected skills |", "|---|---:|---|");
  for (const item of report.candidate_routing) lines.push(`| ${item.task_id} | ${item.replicate} | ${item.skills.join(", ") || "—"} |`);
  return `${lines.join("\n")}\n`;
}

function selfTest() {
  const catalog = (ids) => ids.map((task_id) => ({ task_id, mode: "coding", allowed_changed_paths: [], required_skills: [], allowed_skills: [], fixture_digest: task_id }));
  const report = (variant, ids) => ({ replicates: 1, task_catalog: catalog(ids), runs: ids.map((task_id) => ({ task_id, replicate: 1, passed: true })) });
  let omittedRejected = false;
  try { assertComparableSuite(report("baseline", ["a", "b"]), report("candidate", ["a"]), "self-test"); } catch { omittedRejected = true; }
  if (!omittedRejected) fail("self-test failed: omitted task was accepted");
  const selectionReport = { runs: [
    { run_id: "one", task_id: "route_next_react_ts", replicate: 1, final_answer: '["a","b","c","software-architecture"]' },
    { run_id: "two", task_id: "route_next_react_ts", replicate: 2, final_answer: '["a","b","c"]' },
  ] };
  const selections = routingSelections(selectionReport);
  if (selections.length !== 2 || !selections[0].skills.includes("software-architecture")) fail("self-test failed: routing replicate was overwritten");
  const baseline = { task_catalog: catalog(["a", "b"]), runs: [{ task_id: "a", passed: true }, { task_id: "b", passed: false }] };
  const candidate = { task_catalog: catalog(["a", "b"]), runs: [{ task_id: "a", passed: false }, { task_id: "b", passed: true }] };
  if (JSON.stringify(taskRegressions(baseline, candidate)) !== '["a"]') fail("self-test failed: shifted per-task regression was hidden");
  process.stdout.write("OK: comparison self-test rejected missing tasks, preserved routing replicates, and detected shifted regressions.\n");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.self_test) { selfTest(); return; }
  const reports = {
    baseline: { coding: readReport(args.baseline_coding, "baseline", "coding"), routing: readReport(args.baseline_routing, "baseline", "routing") },
    candidate: { coding: readReport(args.candidate_coding, "candidate", "coding"), routing: readReport(args.candidate_routing, "candidate", "routing") },
  };
  const sourceReports = Object.fromEntries(Object.entries(args).filter(([key]) => key.includes("baseline") || key.includes("candidate")));
  const comparison = buildComparison(reports, sourceReports);
  if (args.json_out) { fs.mkdirSync(path.dirname(args.json_out), { recursive: true }); fs.writeFileSync(args.json_out, `${JSON.stringify(comparison, null, 2)}\n`, "utf8"); }
  if (args.markdown_out) { fs.mkdirSync(path.dirname(args.markdown_out), { recursive: true }); fs.writeFileSync(args.markdown_out, markdown(comparison), "utf8"); }
  process.stdout.write(`${JSON.stringify({ accepted: comparison.accepted, gates: comparison.gates })}\n`);
  process.exitCode = comparison.accepted ? 0 : 1;
}

try { main(); }
catch (error) { process.stderr.write(`${error instanceof Error ? error.stack || error.message : String(error)}\n`); process.exitCode = 1; }
