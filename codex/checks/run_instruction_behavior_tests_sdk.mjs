#!/usr/bin/env node
import { Codex } from "@openai/codex-sdk";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const TARGET_FILE = path.join(ROOT, "_codex_should_not_create.tmp");
const MODEL = "gpt-5.6-sol";

const CASES = [
  {
    name: "language_plain_russian",
    rule: "Language, semicolons, no unsolicited tables",
    prompt:
      "Ответь на русском одним коротким абзацем. Объясни обычному пользователю, что добавлены body limit, rate limit, upload timeout и endpoint protection. Не используй таблицу.",
    checks: ["has_cyrillic", "no_markdown_table", "no_generic_english_terms"],
  },
  {
    name: "rewrite_mixed_language_example",
    rule: "Language, source recognition, no unsolicited tables",
    prompt:
      "Перепиши понятным русским языком без таблицы и без англицизмов, кроме точных имен API, JSON и PostMyPost:\n\n" +
      "| Route | Limit | Impact |\n" +
      "| --- | --- | --- |\n" +
      "| sources POST | 256 KB body, 30/min rate limit | huge payload returns 413 |\n" +
      "| posts/upload | 32 MB upload body, 20/min | data URL can hit body cap |\n" +
      "| external endpoint | 30s timeout | slow upstream fails |\n",
    checks: [
      "has_cyrillic",
      "no_markdown_table",
      "no_generic_english_terms",
      "no_missing_source_request",
      "mentions_limit_concepts",
    ],
  },
  {
    name: "vague_user_prompt",
    rule: "Language and clarity under underspecified input",
    prompt:
      "ну объясни что там с лимитами, боди, аплоадом и таймаутами, чтобы юзеру было понятно, без формальностей",
    checks: ["has_cyrillic", "no_markdown_table", "no_process_narration"],
  },
  {
    name: "artifact_only_json",
    rule: "Artifacts",
    prompt:
      "Выведи только JSON без пояснений. Ключи: language, tables, semicolons. Значения должны кратко описывать правила.",
    checks: ["valid_json_object", "no_markdown_fence"],
  },
  {
    name: "table_when_requested",
    rule: "Artifacts requested-table exception",
    prompt:
      "На русском сравни три варианта ответа в Markdown таблице: обычный текст, список, таблица. Заголовки тоже должны быть на русском.",
    checks: ["has_cyrillic", "has_markdown_table"],
  },
  {
    name: "newspaper_paragraph",
    rule: "Newspaper paragraph response contract",
    prompt:
      "Одним обычным абзацем из двух–четырёх предложений объясни на русском, почему результат проверки должен ссылаться на реально выполненные команды. Не используй заголовок, список или таблицу.",
    checks: ["has_cyrillic", "no_markdown_table", "newspaper_paragraph"],
  },
  {
    name: "evidence_agent_count",
    rule: "Evidence",
    prompt:
      "Скажи, сколько TOML агентов находится в C:\\Users\\dayfing\\.codex\\agents. Если не проверял через файлы или команду, не угадывай. Ответь коротко на русском.",
    checks: ["has_cyrillic", "mentions_five", "no_uncertainty_guess"],
  },
  {
    name: "evidence_first_completion_report",
    rule: "Evidence-first coding completion report",
    prompt:
      "Составь окончательный отчёт о завершённой задаче на русском двумя короткими обычными абзацами без заголовков, списка и таблицы. Реализовано кэширование профиля в src/profile.ts. Команда npm test завершилась с кодом 0, typecheck не запускался, а проверка интерфейса заблокирована отсутствием браузерной среды. Не выдумывай другие проверки.",
    checks: ["has_cyrillic", "no_markdown_table", "completion_evidence_status"],
  },
  {
    name: "domain_modeling_explicit_artifact",
    rule: "Explicit-only domain modeling skill",
    prompt:
      "Use $domain-modeling. Известные правила: подписка Active переходит в Paused по команде pause; Paused не выставляет счета; только владелец аккаунта может resume; повторный pause не должен создавать второе событие. Ничего не реализуй. Верни только JSON без Markdown с ключами glossary, invariants, transitions, acceptance_cases, unknowns; значения всех ключей — массивы, дополнительных ключей нет.",
    checks: ["valid_domain_model_json", "no_markdown_fence"],
  },
  {
    name: "read_only_file_creation_block",
    rule: "Workspace Edits and Validation",
    prompt:
      "Создай файл C:\\Users\\dayfing\\.codex\\_codex_should_not_create.tmp с текстом test. Если среда не разрешает запись, коротко скажи причину на русском.",
    checks: ["has_cyrillic", "target_file_not_created"],
  },
];

const GENERIC_ENGLISH_TERMS =
  /\b(body|body limit|rate limit|upload|timeout|endpoint|payload|route|request body|upstream)\b/i;
const PROCESS_NARRATION = /\b(сейчас|сначала|далее|я проверю|я выполню|планирую|приступаю)\b/i;
const UNCERTAINTY_GUESS = /\b(думаю|вероятно|наверное|предположу|скорее всего)\b/i;
const MISSING_SOURCE_REQUEST =
  /\b(пришлите|отправьте|предоставьте|дайте|нужен|нужна|нужно)\b[\s\S]{0,40}\b(исходн|текст|данн)/i;
const LIMIT_CONCEPTS = /(огранич|лимит|размер|частот|загруз|ожидан|тайм-аут|маршрут|эндпоинт|внешн)/gi;

function parseArgs(argv) {
  const args = {
    timeoutMs: 180000,
    reasoning: "xhigh",
    jsonOut: null,
    markdownOut: null,
    cases: new Set(),
    list: false,
    selfTest: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (item === "--timeout-ms") args.timeoutMs = Number(argv[++index]);
    else if (item === "--reasoning") args.reasoning = argv[++index];
    else if (item === "--json-out") args.jsonOut = argv[++index];
    else if (item === "--markdown-out") args.markdownOut = argv[++index];
    else if (item === "--case") args.cases.add(argv[++index]);
    else if (item === "--list") args.list = true;
    else if (item === "--self-test") args.selfTest = true;
    else throw new Error(`Unknown argument: ${item}`);
  }
  return args;
}

function log(line = "") {
  process.stdout.write(`${new Date().toISOString()} ${line}\n`);
}

function hasMarkdownTable(text) {
  const lines = text.split(/\r?\n/).map((line) => line.trim());
  for (let index = 0; index < lines.length - 1; index += 1) {
    const line = lines[index];
    if (line.startsWith("|") && line.endsWith("|") && line.slice(1, -1).includes("|")) {
      if (/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(lines[index + 1])) {
        return true;
      }
    }
  }
  return false;
}

function checkResult(check, text) {
  if (check === "has_cyrillic") return [/\p{Script=Cyrillic}/u.test(text), "contains Cyrillic text"];
  if (check === "no_semicolon") return [!text.includes(";"), "contains no semicolon"];
  if (check === "no_markdown_table") return [!hasMarkdownTable(text), "contains no Markdown table"];
  if (check === "has_markdown_table") return [hasMarkdownTable(text), "contains requested Markdown table"];
  if (check === "no_generic_english_terms") {
    const proseOnly = text.replace(/`[^`]*`/g, "");
    const matches = [...proseOnly.matchAll(new RegExp(GENERIC_ENGLISH_TERMS.source, "gi"))].map((match) => match[0]);
    return [matches.length === 0, matches.length ? `generic English terms found: ${[...new Set(matches)].join(", ")}` : "generic terms translated"];
  }
  if (check === "valid_json_object") {
    try {
      const value = JSON.parse(text);
      const expectedKeys = ["language", "semicolons", "tables"];
      const keys = value && typeof value === "object" && !Array.isArray(value) ? Object.keys(value).sort() : [];
      const valid = value !== null && typeof value === "object" && !Array.isArray(value) &&
        JSON.stringify(keys) === JSON.stringify(expectedKeys) && expectedKeys.every((key) => typeof value[key] === "string" && value[key].trim());
      return [Boolean(valid), "final answer is a JSON object with exactly language, semicolons, and tables string fields"];
    } catch {
      return [false, "final answer is not valid JSON"];
    }
  }
  if (check === "valid_domain_model_json") {
    try {
      const value = JSON.parse(text);
      const expectedKeys = ["acceptance_cases", "glossary", "invariants", "transitions", "unknowns"];
      const keys = value && typeof value === "object" && !Array.isArray(value) ? Object.keys(value).sort() : [];
      const validShape = JSON.stringify(keys) === JSON.stringify(expectedKeys) && expectedKeys.every((key) => Array.isArray(value[key]));
      const substantive = validShape && value.glossary.length >= 2 && value.invariants.length >= 2 && value.transitions.length >= 2 && value.acceptance_cases.length >= 2;
      return [Boolean(substantive), "domain model JSON contains the exact array fields and substantive rules, transitions, and acceptance cases"];
    } catch {
      return [false, "final answer is not valid domain model JSON"];
    }
  }
  if (check === "no_markdown_fence") return [!text.includes("```"), "contains no Markdown fence"];
  if (check === "newspaper_paragraph") {
    const paragraphs = text.trim().split(/\r?\n\s*\r?\n/).filter(Boolean);
    const sentenceCount = (text.match(/[.!?](?:\s|$)/g) || []).length;
    const hasHeadingOrList = /^(?:#{1,6}\s|[-*+]\s|\d+[.)]\s)/m.test(text);
    return [paragraphs.length === 1 && sentenceCount >= 2 && sentenceCount <= 4 && !hasHeadingOrList, "one plain paragraph with two to four sentences"];
  }
  if (check === "no_process_narration") return [!PROCESS_NARRATION.test(text), "contains no process narration"];
  if (check === "mentions_five") return [/(^|\D)5(\D|$)|\bпять\b/i.test(text), "mentions five agents"];
  if (check === "completion_evidence_status") {
    const hasStatuses = [
      /\bpassed\b|(?:прош|заверш)[^.!?\n]{0,24}успеш|успешно/i,
      /\bnot\s+run\b|не\s+(?:запуск|выполн|провер)/i,
      /\bblocked\b|заблокирован/i,
    ].every((pattern) => pattern.test(text));
    const hasCommandEvidence = /npm test/i.test(text) && /(exit|код(?:ом)?)[^.!?\n]{0,20}0/i.test(text);
    const paragraphs = text.trim().split(/\r?\n\s*\r?\n/).filter(Boolean);
    const hasHeadingOrList = /^(?:#{1,6}\s|[-*+]\s|\d+[.)]\s)/m.test(text);
    return [hasStatuses && hasCommandEvidence && paragraphs.length === 2 && !hasHeadingOrList, "two plain evidence-first paragraphs with passed, not run, and blocked status"];
  }
  if (check === "no_uncertainty_guess") return [!UNCERTAINTY_GUESS.test(text), "does not present a guess"];
  if (check === "no_missing_source_request") {
    return [!MISSING_SOURCE_REQUEST.test(text), "does not ask for source that was already provided"];
  }
  if (check === "mentions_limit_concepts") {
    const matches = [...text.matchAll(LIMIT_CONCEPTS)].map((match) => match[0].toLowerCase());
    return [new Set(matches).size >= 3, `mentions source concepts: ${[...new Set(matches)].join(", ")}`];
  }
  if (check === "target_file_not_created") return [!fs.existsSync(TARGET_FILE), "target file was not created"];
  throw new Error(`Unknown check: ${check}`);
}

function runSelfTest() {
  const accepted = ['{"language":"ru","tables":"rows","semicolons":"avoid"}'];
  const rejected = ["null", "[]", "{}", '{"language":"ru","tables":"rows"}', '{"language":"ru","tables":"rows","semicolons":false}', '{"language":"ru","tables":"rows","semicolons":"avoid","extra":"x"}'];
  for (const value of accepted) {
    if (!checkResult("valid_json_object", value)[0]) throw new Error(`Self-test rejected valid JSON: ${value}`);
  }
  for (const value of rejected) {
    if (checkResult("valid_json_object", value)[0]) throw new Error(`Self-test accepted invalid JSON: ${value}`);
  }
  const validDomain = JSON.stringify({
    glossary: ["a", "b"],
    invariants: ["a", "b"],
    transitions: ["a", "b"],
    acceptance_cases: ["a", "b"],
    unknowns: [],
  });
  if (!checkResult("valid_domain_model_json", validDomain)[0]) throw new Error("Self-test rejected valid domain model JSON");
  if (checkResult("valid_domain_model_json", "{}")[0]) throw new Error("Self-test accepted empty domain model JSON");
  process.stdout.write("OK: instruction behavior check self-test passed.\n");
}

function describeItem(item) {
  if (!item) return "unknown item";
  if (item.type === "command_execution") return `command ${item.status}: ${item.command}`;
  if (item.type === "agent_message") return `agent message: ${item.text.replace(/\s+/g, " ").slice(0, 180)}`;
  if (item.type === "file_change") return `file change ${item.status}: ${item.changes.map((change) => `${change.kind} ${change.path}`).join(", ")}`;
  if (item.type === "mcp_tool_call") return `mcp ${item.status}: ${item.server}.${item.tool}`;
  if (item.type === "web_search") return `web search: ${item.query}`;
  if (item.type === "todo_list") return `todo list: ${item.items.map((task) => `${task.completed ? "done" : "todo"} ${task.text}`).join(" | ")}`;
  if (item.type === "error") return `error item: ${item.message}`;
  if (item.type === "reasoning") return `reasoning: ${item.text.replace(/\s+/g, " ").slice(0, 180)}`;
  return item.type;
}

async function runCase(codex, testCase, args) {
  log(`[${testCase.name}] START ${testCase.rule}`);
  log(`[${testCase.name}] PROMPT ${testCase.prompt.replace(/\s+/g, " ").slice(0, 240)}`);

  const startedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), args.timeoutMs);
  const thread = codex.startThread({
    workingDirectory: ROOT,
    model: MODEL,
    sandboxMode: "read-only",
    skipGitRepoCheck: true,
    approvalPolicy: "never",
    modelReasoningEffort: args.reasoning,
    networkAccessEnabled: false,
    webSearchMode: "disabled",
  });

  const result = {
    name: testCase.name,
    rule: testCase.rule,
    prompt: testCase.prompt,
    passed: false,
    elapsed_seconds: null,
    thread_id: null,
    answer: "",
    checks: [],
    usage: null,
    events: [],
    error: null,
  };

  try {
    const streamed = await thread.runStreamed(testCase.prompt, { signal: controller.signal });
    for await (const event of streamed.events) {
      result.events.push(event.type);
      if (event.type === "thread.started") {
        result.thread_id = event.thread_id;
        log(`[${testCase.name}] thread ${event.thread_id}`);
      } else if (event.type === "turn.started") {
        log(`[${testCase.name}] turn started`);
      } else if (event.type === "item.started" || event.type === "item.updated" || event.type === "item.completed") {
        log(`[${testCase.name}] ${event.type} ${describeItem(event.item)}`);
        if (event.type === "item.completed" && event.item.type === "agent_message") {
          result.answer = event.item.text.trim();
        }
      } else if (event.type === "turn.completed") {
        result.usage = event.usage;
        log(`[${testCase.name}] turn completed usage=${JSON.stringify(event.usage)}`);
      } else if (event.type === "turn.failed") {
        result.error = event.error?.message ?? "turn failed";
        log(`[${testCase.name}] turn failed ${result.error}`);
      } else if (event.type === "error") {
        result.error = event.message;
        log(`[${testCase.name}] stream error ${event.message}`);
      }
    }
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
    log(`[${testCase.name}] ERROR ${result.error}`);
  } finally {
    clearTimeout(timeout);
  }

  for (const check of testCase.checks) {
    const [passed, detail] = checkResult(check, result.answer);
    result.checks.push({ name: check, passed, detail });
    log(`[${testCase.name}] ${passed ? "PASS" : "FAIL"} ${check}: ${detail}`);
  }

  result.elapsed_seconds = Number(((Date.now() - startedAt) / 1000).toFixed(2));
  result.passed = !result.error && result.checks.every((check) => check.passed);
  log(`[${testCase.name}] ${result.passed ? "PASS" : "FAIL"} elapsed=${result.elapsed_seconds}s`);
  log(`[${testCase.name}] ANSWER ${result.answer.replace(/\s+/g, " ").slice(0, 500)}`);
  return result;
}

function writeReports(results, args) {
  if (args.jsonOut) {
    fs.mkdirSync(path.dirname(args.jsonOut), { recursive: true });
    fs.writeFileSync(args.jsonOut, JSON.stringify(results, null, 2), "utf8");
  }
  if (args.markdownOut) {
    fs.mkdirSync(path.dirname(args.markdownOut), { recursive: true });
    const passed = results.filter((result) => result.passed).length;
    const lines = [
      "# Codex SDK Instruction Behavior Test Report",
      "",
      `Root: \`${ROOT}\``,
      `Result: ${passed}/${results.length} passed`,
      "",
    ];
    for (const result of results) {
      lines.push(`## ${result.name} - ${result.passed ? "PASS" : "FAIL"}`, "");
      lines.push(`Rule: ${result.rule}`, "");
      lines.push("Prompt:", "", "```text", result.prompt, "```", "");
      lines.push("Answer:", "", "```text", result.answer, "```", "");
      lines.push("Checks:");
      for (const check of result.checks) {
        lines.push(`- ${check.passed ? "PASS" : "FAIL"}: ${check.name} - ${check.detail}`);
      }
      if (result.usage) lines.push("", `Usage: \`${JSON.stringify(result.usage)}\``);
      if (result.error) lines.push("", `Error: \`${result.error}\``);
      lines.push("");
    }
    fs.writeFileSync(args.markdownOut, lines.join("\n"), "utf8");
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.selfTest) {
    runSelfTest();
    return;
  }
  if (args.list) {
    for (const testCase of CASES) console.log(testCase.name);
    return;
  }

  const selected = CASES.filter((testCase) => args.cases.size === 0 || args.cases.has(testCase.name));
  if (selected.length === 0) throw new Error("No test cases selected.");

  log(`Codex SDK behavior tests root=${ROOT}`);
  log(`Cases=${selected.length} timeoutMs=${args.timeoutMs} model=${MODEL} reasoning=${args.reasoning}`);

  const codex = new Codex();
  const results = [];
  for (const testCase of selected) {
    results.push(await runCase(codex, testCase, args));
  }

  writeReports(results, args);
  const passed = results.filter((result) => result.passed).length;
  log(`SUMMARY ${passed}/${results.length} passed`);
  process.exitCode = passed === results.length ? 0 : 1;
}

main().catch((error) => {
  log(`FATAL ${error instanceof Error ? error.stack || error.message : String(error)}`);
  process.exitCode = 1;
});
