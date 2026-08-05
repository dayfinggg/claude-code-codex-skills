#!/bin/sh
set -eu

mode="${1:---merge}"
case "$mode" in
  --merge|--replace) ;;
  *) printf 'Usage: %s [--merge|--replace]\n' "$0" >&2; exit 2 ;;
esac

repo="${CODEX_SKILLS_REPO:-dayfinggg/openai-codex-agent-skills}"
branch="${CODEX_SKILLS_BRANCH:-main}"
dest="$HOME/.codex"
stamp="$(date -u +%Y%m%dT%H%M%SZ)"
backup="$HOME/.codex-backups/$stamp"
tmp="$(mktemp -d "${TMPDIR:-/tmp}/openai-codex-agent-skills-install.XXXXXX")"
trap 'rm -rf "$tmp"' EXIT HUP INT TERM

command -v curl >/dev/null 2>&1 || { printf 'curl is required.\n' >&2; exit 1; }
command -v tar >/dev/null 2>&1 || { printf 'tar is required.\n' >&2; exit 1; }

curl -fsSL "https://codeload.github.com/$repo/tar.gz/$branch" | tar -xz -C "$tmp"
source_root="$(find "$tmp" -mindepth 1 -maxdepth 1 -type d | head -n 1)"
[ -n "$source_root" ] || { printf 'Downloaded archive is empty.\n' >&2; exit 1; }
src="$source_root/codex"
mkdir -p "$dest"

backup_path() {
  path="$1"
  [ -e "$dest/$path" ] || return 0
  mkdir -p "$backup"
  cp -Rp "$dest/$path" "$backup/"
}

if [ "$mode" = "--replace" ]; then
  for path in config.toml model-instructions.md agents skills; do
    backup_path "$path"
    rm -rf "$dest/$path"
    cp -Rp "$src/$path" "$dest/"
  done
  install_mode=replace
else
  for path in model-instructions.md agents skills; do
    backup_path "$path"
    if [ -d "$src/$path" ]; then
      mkdir -p "$dest/$path"
      cp -Rp "$src/$path/." "$dest/$path/"
    else
      cp -p "$src/$path" "$dest/$path"
    fi
  done
  backup_path config.toml
  config="$dest/config.toml"
  [ -f "$config" ] || : >"$config"
  awk '
    BEGIN { found=0; top=1 }
    /^[[:space:]]*\[/ && top { if (!found) print "model_instructions_file = \"model-instructions.md\"\n"; top=0; found=1 }
    top && /^[[:space:]]*model_instructions_file[[:space:]]*=/ { print "model_instructions_file = \"model-instructions.md\""; found=1; next }
    { print }
    END { if (!found) print "model_instructions_file = \"model-instructions.md\"" }
  ' "$config" >"$tmp/config.toml"
  cp "$tmp/config.toml" "$config"
  install_mode=merge
fi

printf '%s\n' "$install_mode" >"$dest/.openai-codex-agent-skills.install-mode"
printf 'Codex setup installed in %s mode.\n' "$install_mode"
[ ! -d "$backup" ] || printf 'Previous files were backed up to %s\n' "$backup"
printf 'Restart Codex to load the new agents and skills.\n'
