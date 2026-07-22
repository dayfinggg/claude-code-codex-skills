#!/usr/bin/env python3
"""Deterministic structural checks for the user's Codex instructions and skills."""

from __future__ import annotations

import re
import sys
import json
import ast
from collections import Counter
from pathlib import Path, PurePosixPath

try:
    import tomllib
except ModuleNotFoundError:
    tomllib = None


ROOT = Path(__file__).resolve().parents[1]
SKILLS_DIR = ROOT / "skills"
DELETED_SKILLS = {"software-architecture", "delivery-verification"}
EXPECTED_CUSTOM_SKILL_COUNT = 23
EXPECTED_CUSTOM_AGENTS = {
    "bulk-scanner",
    "researcher",
    "reviewer",
    "verification-agent",
    "vulnerability-audit",
}
EXPLICIT_ONLY_SKILLS = {"domain-modeling", "grill-me"}
INITIAL_DESCRIPTION_MAX_CHARS = 6_000
SKILL_DESCRIPTION_MAX_CHARS = 350
MODEL_MIN_WORDS = 700
MODEL_MAX_WORDS = 1_000
SKILL_MAX_LINES = 500
SKILL_MAX_WORDS = 1_900
SOFTWARE_ENGINEERING_MAX_WORDS = 650
OVERLAPPING_SKILLS = {
    "full-stack-testing",
    "javascript",
    "nextjs",
    "node-js",
    "react",
    "typescript",
    "web-application-security",
}
VAGUE_RULE_PATTERNS = (
    r"\bbe helpful\b",
    r"\bbe concise\b",
    r"\bdo your best\b",
    r"\bthink carefully\b",
    r"\buse best practices\b",
    r"\bwrite high[- ]quality code\b",
    r"\bmake it production[- ]grade\b",
)


def fail(message: str) -> None:
    print(f"ERROR: {message}")
    raise SystemExit(1)


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except OSError as exc:
        fail(f"Cannot read {path}: {exc}")


def parse_owned_toml_fallback(path: Path, text: str) -> dict:
    def assignments(block: str, keys: set[str]) -> dict:
        parsed: dict[str, object] = {}
        for key in keys:
            match = re.search(rf"(?m)^{re.escape(key)}\s*=\s*(.+?)\s*$", block)
            if not match:
                continue
            raw = match.group(1)
            if raw == "true":
                parsed[key] = True
            elif raw == "false":
                parsed[key] = False
            elif re.fullmatch(r"-?\d+", raw):
                parsed[key] = int(raw)
            else:
                try:
                    parsed[key] = ast.literal_eval(raw)
                except (SyntaxError, ValueError) as exc:
                    raise ValueError(f"unsupported {key} value") from exc
        return parsed

    if path.name == "config.toml":
        top = text.split("\n[", 1)[0]
        data = assignments(top, {"model", "model_reasoning_effort", "model_instructions_file"})
        section = re.search(r"(?ms)^\[agents\]\s*(.*?)(?=^\[|\Z)", text)
        data["agents"] = assignments(section.group(1) if section else "", {"max_threads", "max_depth"})
        return data

    data = assignments(text, {"name", "description", "model", "model_reasoning_effort", "sandbox_mode"})
    instructions = re.search(r'(?ms)^developer_instructions\s*=\s*"""(.*?)"""\s*$', text)
    if instructions:
        data["developer_instructions"] = instructions.group(1)
    skill_items = []
    for block in re.findall(r"(?ms)^\[\[skills\.config\]\]\s*(.*?)(?=^\[\[|\Z)", text):
        item = assignments(block, {"path", "enabled"})
        if item:
            skill_items.append(item)
    if skill_items:
        data["skills"] = {"config": skill_items}
    return data


def load_toml(path: Path) -> dict:
    try:
        text = read_text(path)
        if tomllib is not None:
            return tomllib.loads(text)
        return parse_owned_toml_fallback(path, text)
    except (ValueError, OSError) as exc:
        fail(f"Invalid TOML at {path}: {exc}")


def words(text: str) -> list[str]:
    return re.findall(r"[A-Za-z0-9][A-Za-z0-9_'-]*", text)


def parse_yaml_scalar(raw: str) -> str:
    value = raw.strip()
    if not value or value.startswith("#"):
        raise ValueError("empty or commented scalar")
    if value.startswith('"'):
        try:
            parsed = json.loads(value)
        except json.JSONDecodeError as exc:
            raise ValueError(f"invalid quoted scalar: {exc}") from exc
        if not isinstance(parsed, str) or not parsed:
            raise ValueError("quoted scalar must be a non-empty string")
        return parsed
    if value.startswith("'"):
        if len(value) < 2 or not value.endswith("'"):
            raise ValueError("unterminated single-quoted scalar")
        return value[1:-1].replace("''", "'")
    if " #" in value:
        raise ValueError("inline comments are not supported in strict metadata")
    return value


def frontmatter(path: Path, text: str) -> tuple[dict[str, str], str]:
    match = re.match(r"\A---\s*\n(.*?)\n---\s*\n(.*)\Z", text, re.DOTALL)
    if not match:
        fail(f"{path} must have YAML frontmatter delimited by ---.")
    metadata: dict[str, str] = {}
    for line in match.group(1).splitlines():
        field = re.fullmatch(r"(name|description):\s*(.+?)\s*", line)
        if not field:
            fail(f"{path} contains unsupported or malformed frontmatter line: {line!r}")
        key = field.group(1)
        if key in metadata:
            fail(f"{path} contains duplicate frontmatter key {key!r}.")
        try:
            metadata[key] = parse_yaml_scalar(field.group(2))
        except ValueError as exc:
            fail(f"{path} has invalid {key}: {exc}")
    if not metadata.get("name") or not metadata.get("description"):
        fail(f"{path} frontmatter must contain non-empty name and description.")
    return metadata, match.group(2)


def parse_openai_yaml(path: Path, text: str) -> dict[str, object]:
    section: str | None = None
    result: dict[str, object] = {"interface": {}, "policy": {}}
    seen_sections: set[str] = set()
    for line in text.splitlines():
        if not line.strip():
            continue
        section_match = re.fullmatch(r"(interface|policy):", line)
        if section_match:
            section = section_match.group(1)
            if section in seen_sections:
                fail(f"{path} contains duplicate section {section!r}.")
            seen_sections.add(section)
            continue
        field = re.fullmatch(r"  ([a-z_]+):\s*(.+?)\s*", line)
        if not field or section is None:
            fail(f"{path} contains unsupported or malformed YAML line: {line!r}")
        key, raw = field.groups()
        target = result[section]
        assert isinstance(target, dict)
        if key in target:
            fail(f"{path} contains duplicate key {section}.{key}.")
        if section == "interface":
            if key not in {"display_name", "short_description", "default_prompt"}:
                fail(f"{path} contains unsupported interface key {key!r}.")
            try:
                target[key] = parse_yaml_scalar(raw)
            except ValueError as exc:
                fail(f"{path} has invalid interface.{key}: {exc}")
        else:
            if key != "allow_implicit_invocation" or raw not in {"true", "false"}:
                fail(f"{path} supports only boolean policy.allow_implicit_invocation.")
            target[key] = raw == "true"
    interface = result["interface"]
    assert isinstance(interface, dict)
    required = {"display_name", "short_description", "default_prompt"}
    if set(interface) != required:
        fail(f"{path} interface must contain exactly {', '.join(sorted(required))}.")
    return result


def check_config() -> None:
    config = load_toml(ROOT / "config.toml")
    if config.get("model") != "gpt-5.6-sol":
        fail("config.toml must keep model = gpt-5.6-sol for controlled evaluation.")
    if config.get("model_reasoning_effort") not in {"low", "medium", "high", "xhigh", "max", "ultra"}:
        fail("config.toml must define a supported model_reasoning_effort.")
    configured_instructions = Path(config.get("model_instructions_file", ""))
    if not configured_instructions.is_absolute():
        configured_instructions = ROOT / configured_instructions
    if configured_instructions.resolve() != (ROOT / "model-instructions.md").resolve():
        fail("config.toml must point model_instructions_file at the owned model-instructions.md.")
    agents = config.get("agents", {})
    if "max_threads" in agents and (not isinstance(agents["max_threads"], int) or agents["max_threads"] < 1):
        fail("agents.max_threads must be a positive integer.")
    if "max_depth" in agents and (not isinstance(agents["max_depth"], int) or agents["max_depth"] < 0):
        fail("agents.max_depth must be a non-negative integer.")


def check_model_instructions() -> None:
    path = ROOT / "model-instructions.md"
    text = read_text(path)
    count = len(words(text))
    if not MODEL_MIN_WORDS <= count <= MODEL_MAX_WORDS:
        fail(f"{path} has {count} English words; expected {MODEL_MIN_WORDS}-{MODEL_MAX_WORDS}.")
    required = (
        "<instruction_priority>",
        "<authorization_and_scope>",
        "<skills_and_tools>",
        "smallest cohesive production-ready change",
        "Do not invent facts",
        "<response_contract>",
        "evidence-first newspaper report",
        "`passed`, `failed`, `blocked`, and `not run`",
        "screenshot or video",
        "tool transcripts",
        "<verification_and_completion>",
    )
    for marker in required:
        if marker not in text:
            fail(f"{path} is missing required contract marker: {marker}")
    forbidden = (
        "Use for every software development task",
        "load the universal software-engineering skill plus",
        "delivery-verification",
        "software-architecture",
        "Sol-only max",
        "Route by the models pinned",
    )
    for phrase in forbidden:
        if phrase.lower() in text.lower():
            fail(f"{path} retains obsolete or duplicative routing text: {phrase}")
    normalized_lines = [re.sub(r"\s+", " ", line.strip().lower()) for line in text.splitlines()]
    duplicated = [line for line, count in Counter(line for line in normalized_lines if len(line) >= 80).items() if count > 1]
    if duplicated:
        fail(f"{path} contains duplicated long rules: {duplicated[0][:120]}")
    for pattern in VAGUE_RULE_PATTERNS:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            fail(f"{path} contains an untestable no-op rule candidate: {match.group(0)!r}")

    sections = re.findall(r"<([a-z_]+)>.*?</\1>", text, re.DOTALL)
    expected_sections = {
        "instruction_priority",
        "turn_contract",
        "authorization_and_scope",
        "skills_and_tools",
        "execution_and_code",
        "planning_research_and_delegation",
        "response_contract",
        "verification_and_completion",
    }
    if set(sections) != expected_sections or len(sections) != len(expected_sections):
        fail(f"{path} must contain each owned rule section exactly once.")


def check_skill(skill_dir: Path) -> tuple[str, str, bool]:
    path = skill_dir / "SKILL.md"
    if not path.is_file():
        fail(f"Missing {path}.")
    text = read_text(path)
    metadata, body = frontmatter(path, text)
    name = metadata["name"]
    description = metadata["description"]
    if name != skill_dir.name:
        fail(f"{path} name {name!r} must match directory {skill_dir.name!r}.")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", name) or len(name) > 64:
        fail(f"{path} has an invalid skill name.")
    if len(description) > SKILL_DESCRIPTION_MAX_CHARS:
        fail(f"{path} description exceeds {SKILL_DESCRIPTION_MAX_CHARS} characters.")
    if not re.search(r"\bUse\b|\bNot for\b|\bDo not use\b|\bPrefer\b", description):
        fail(f"{path} description must state an activation or exclusion boundary.")
    if name in OVERLAPPING_SKILLS and not re.search(r"Do not use|Do not trigger|Not for|\bnot\b|Prefer the", description, re.IGNORECASE):
        fail(f"{path} description must distinguish this overlapping skill from adjacent skills.")
    line_count = len(text.splitlines())
    word_count = len(words(body))
    if line_count > SKILL_MAX_LINES:
        fail(f"{path} has {line_count} lines; maximum is {SKILL_MAX_LINES}.")
    limit = SOFTWARE_ENGINEERING_MAX_WORDS if name == "software-engineering" else SKILL_MAX_WORDS
    if word_count > limit:
        fail(f"{path} body has {word_count} words; maximum for {name} is {limit}.")
    if "Use for every software development task" in text:
        fail(f"{path} contains an unconditional activation rule.")

    yaml_path = skill_dir / "agents" / "openai.yaml"
    yaml = parse_openai_yaml(yaml_path, read_text(yaml_path))
    interface = yaml["interface"]
    assert isinstance(interface, dict)
    if f"${name}" not in str(interface["default_prompt"]):
        fail(f"{yaml_path} default prompt must invoke ${name}.")
    if not 25 <= len(str(interface["short_description"])) <= 64:
        fail(f"{yaml_path} short_description must contain 25-64 characters.")
    policy = yaml["policy"]
    assert isinstance(policy, dict)
    implicit = bool(policy.get("allow_implicit_invocation", True))
    if name in EXPLICIT_ONLY_SKILLS and implicit:
        fail(f"{yaml_path} must disable implicit invocation for explicit-only skill {name}.")
    if name not in EXPLICIT_ONLY_SKILLS and not implicit:
        fail(f"{yaml_path} unexpectedly disables implicit invocation for {name}.")

    references_dir = skill_dir / "references"
    references = sorted(references_dir.glob("*.md")) if references_dir.is_dir() else []
    linked = set(re.findall(r"\((references/[A-Za-z0-9._/-]+\.md)(?:#[^)]+)?\)", body))
    for reference in references:
        relative = reference.relative_to(skill_dir).as_posix()
        if relative not in linked:
            fail(f"{reference} is orphaned; link it directly from SKILL.md or remove it.")
    for relative in linked:
        target = skill_dir.joinpath(*PurePosixPath(relative).parts)
        if not target.is_file():
            fail(f"{path} links missing reference {target}.")
    return name, description, implicit


def check_skills() -> None:
    skill_dirs = sorted(path for path in SKILLS_DIR.iterdir() if path.is_dir() and path.name != ".system")
    names = {path.name for path in skill_dirs}
    if len(skill_dirs) != EXPECTED_CUSTOM_SKILL_COUNT:
        fail(f"Expected {EXPECTED_CUSTOM_SKILL_COUNT} custom skills, found {len(skill_dirs)}.")
    stale = names & DELETED_SKILLS
    if stale:
        fail(f"Deleted duplicate skills still exist: {', '.join(sorted(stale))}.")
    checked = [check_skill(skill_dir) for skill_dir in skill_dirs]
    initial_description_chars = sum(len(description) for _, description, implicit in checked if implicit)
    if initial_description_chars > INITIAL_DESCRIPTION_MAX_CHARS:
        fail(
            f"Implicit skill descriptions use {initial_description_chars} characters; "
            f"maximum is {INITIAL_DESCRIPTION_MAX_CHARS}."
        )

    trigger_path = ROOT / "checks" / "skill_trigger_cases.json"
    try:
        trigger_cases = json.loads(read_text(trigger_path))
    except json.JSONDecodeError as exc:
        fail(f"Invalid JSON at {trigger_path}: {exc}")
    if set(trigger_cases) != names:
        missing = sorted(names - set(trigger_cases))
        extra = sorted(set(trigger_cases) - names)
        fail(f"{trigger_path} must cover every custom skill; missing={missing}, extra={extra}.")
    for name, cases in trigger_cases.items():
        if not isinstance(cases, dict) or set(cases) != {"positive", "negative"}:
            fail(f"{trigger_path} entry {name!r} must contain exactly positive and negative cases.")
        if not all(isinstance(cases[key], str) and len(cases[key].strip()) >= 20 for key in ("positive", "negative")):
            fail(f"{trigger_path} entry {name!r} has an empty or trivial trigger case.")
        if cases["positive"].strip() == cases["negative"].strip():
            fail(f"{trigger_path} entry {name!r} uses the same positive and negative case.")
    for name in EXPLICIT_ONLY_SKILLS:
        if f"${name}" not in trigger_cases[name]["positive"]:
            fail(f"{trigger_path} positive case for explicit-only skill {name} must invoke ${name}.")


def check_agents() -> None:
    paths = sorted((ROOT / "agents").glob("*.toml"))
    names = {path.stem for path in paths}
    if names != EXPECTED_CUSTOM_AGENTS:
        fail(f"Custom agent catalog mismatch; expected={sorted(EXPECTED_CUSTOM_AGENTS)}, found={sorted(names)}.")
    for path in paths:
        data = load_toml(path)
        if not data.get("name") or not data.get("description") or not data.get("developer_instructions"):
            fail(f"{path} must define name, description, and developer_instructions.")
        if data["name"] != path.stem:
            fail(f"{path} name {data['name']!r} must match file stem {path.stem!r}.")
        text = read_text(path)
        if re.search(r"[\u0400-\u04FF]", text):
            fail(f"{path} contains Cyrillic; persistent instructions must stay in English.")
        for deleted in DELETED_SKILLS:
            if deleted in text:
                fail(f"{path} still references deleted skill {deleted}.")
        for item in data.get("skills", {}).get("config", []):
            target = Path(item.get("path", ""))
            if not target.is_absolute():
                target = path.parent / target
            if not target.is_file():
                fail(f"{path} references missing skill file {target}.")


def check_stale_references() -> None:
    roots = [ROOT / "model-instructions.md", *(ROOT / "agents").glob("*.toml"), *(ROOT / "checks").glob("*.py"), *(ROOT / "checks").glob("*.mjs")]
    for path in roots:
        if path.name in {"compare_skill_quality_evals.mjs", "validate_codex_rules.py"}:
            continue
        text = read_text(path)
        for deleted in DELETED_SKILLS:
            if deleted in text:
                fail(f"{path} contains stale reference to {deleted}.")
    if (ROOT / "AGENTS.override.md").exists():
        fail("Unexpected global AGENTS.override.md; keep global project guidance in the intentionally minimal AGENTS.md.")


def main() -> int:
    check_config()
    check_model_instructions()
    check_skills()
    check_agents()
    check_stale_references()
    print("OK: Codex config, lean instructions, 23 custom skills, 5 custom agents, trigger cases, references, and dependencies are valid.")
    return 0


def self_test() -> int:
    fallback_config = parse_owned_toml_fallback(
        Path("config.toml"),
        'model = "gpt-5.6-sol"\nmodel_reasoning_effort = "high"\nmodel_instructions_file = "model-instructions.md"\n\n[agents]\nmax_threads = 4\nmax_depth = 1\n',
    )
    if fallback_config.get("agents") != {"max_threads": 4, "max_depth": 1}:
        raise AssertionError("owned TOML fallback did not parse config agents")
    fallback_agent = parse_owned_toml_fallback(
        Path("reviewer.toml"),
        'name = "reviewer"\ndescription = "Review"\ndeveloper_instructions = """\nStay read-only.\n"""\n\n[[skills.config]]\npath = \'/home/example/.codex/skills/software-engineering/SKILL.md\'\nenabled = true\n',
    )
    if fallback_agent.get("name") != "reviewer" or fallback_agent.get("skills", {}).get("config", [{}])[0].get("enabled") is not True:
        raise AssertionError("owned TOML fallback did not parse agent metadata")
    bad_frontmatter = (
        "---\nname: demo\nname: duplicate\ndescription: valid\n---\nbody\n",
        "---\n# name: demo\ndescription: valid\n---\nbody\n",
        "---\nname: demo\ndescription \"missing colon\"\n---\nbody\n",
    )
    for text in bad_frontmatter:
        try:
            frontmatter(Path("self-test/SKILL.md"), text)
        except SystemExit:
            continue
        raise AssertionError("strict frontmatter self-test accepted invalid metadata")
    valid_yaml = 'interface:\n  display_name: "Demo"\n  short_description: "A sufficiently descriptive demo skill"\n  default_prompt: "Use $demo for this task."\n'
    parse_openai_yaml(Path("self-test/openai.yaml"), valid_yaml)
    for text in (
        '# display_name: "Demo"\n',
        'interface:\n  display_name: "Demo"\n  display_name: "Duplicate"\n  short_description: "A sufficiently descriptive demo skill"\n  default_prompt: "Use $demo."\n',
        'interface:\n  display_name "Missing colon"\n',
    ):
        try:
            parse_openai_yaml(Path("self-test/openai.yaml"), text)
        except SystemExit:
            continue
        raise AssertionError("strict openai.yaml self-test accepted invalid metadata")
    print("OK: strict metadata parser self-test passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(self_test() if "--self-test" in sys.argv[1:] else main())
