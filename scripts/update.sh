#!/bin/sh
set -eu

repo="${CODEX_SKILLS_REPO:-dayfinggg/claude-code-codex-skills}"
branch="${CODEX_SKILLS_BRANCH:-main}"
mode="${1:---auto}"
case "$mode" in
  --auto|--codex|--claude|--all) ;;
  *)
    printf 'Usage: %s [--auto|--codex|--claude|--all]\n' "$0" >&2
    exit 2
    ;;
esac

command -v curl >/dev/null 2>&1 || {
  printf 'curl is required.\n' >&2
  exit 1
}
command -v tar >/dev/null 2>&1 || {
  printf 'tar is required.\n' >&2
  exit 1
}

tmp="$(mktemp -d "${TMPDIR:-/tmp}/claude-code-codex-skills.XXXXXX")"
trap 'rm -rf "$tmp"' EXIT HUP INT TERM
nonce="$(date +%s)"

commit="$(
  curl -fsSL -H 'Accept: application/vnd.github+json' \
    -H 'Cache-Control: no-cache' \
    -H 'User-Agent: claude-code-codex-skills-updater' \
    "https://api.github.com/repos/$repo/commits/$branch?update=$nonce" 2>/dev/null |
    tr '{,' '\n\n' |
    sed -n 's/^[[:space:]]*"sha"[[:space:]]*:[[:space:]]*"\([0-9a-f]\{40\}\)".*$/\1/p' |
    head -n 1
)" || true
[ -n "$commit" ] || commit="$branch"

curl -fsSL "https://codeload.github.com/$repo/tar.gz/$commit" |
  tar -xz -C "$tmp"
source_root="$(find "$tmp" -mindepth 1 -maxdepth 1 -type d | head -n 1)"
[ -n "$source_root" ] || {
  printf 'Downloaded archive is empty.\n' >&2
  exit 1
}

sha256_file() {
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$1" | awk '{print $1}'
  elif command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$1" | awk '{print $1}'
  else
    openssl dgst -sha256 "$1" | awk '{print $NF}'
  fi
}

updated=0
unchanged=0
removed=0
preserved=0

update_target() {
  name="$1"
  src="$2"
  dest="$3"
  shift 3
  mkdir -p "$dest"
  manifest="$dest/.claude-code-codex-skills.manifest"
  new_manifest="$tmp/$name.manifest"
  new_paths="$tmp/$name.paths"
  stamp="$(date -u +%Y%m%dT%H%M%SZ)"
  backup="$dest/.claude-code-codex-skills-backups/$stamp"
  : >"$new_manifest"
  : >"$new_paths"

  for managed in "$@"; do
    if [ -d "$src/$managed" ]; then
      find "$src/$managed" -type f
    elif [ -f "$src/$managed" ]; then
      printf '%s\n' "$src/$managed"
    fi
  done | LC_ALL=C sort | while IFS= read -r source_file; do
    rel="${source_file#"$src"/}"
    target_file="$dest/$rel"
    hash="$(sha256_file "$source_file")"
    printf '%s\t%s\n' "$hash" "$rel" >>"$new_manifest"
    printf '%s\n' "$rel" >>"$new_paths"
    previous_hash=""
    if [ -f "$manifest" ]; then
      previous_hash="$(awk -F '\t' -v path="$rel" '$2 == path { print $1; exit }' "$manifest")"
    fi
    if [ "$previous_hash" = "$hash" ]; then
      if [ -f "$target_file" ] && cmp -s "$source_file" "$target_file"; then
        unchanged=$((unchanged + 1))
        printf '%s\n' "$unchanged" >"$tmp/$name.unchanged"
      else
        preserved=$((preserved + 1))
        printf '%s\n' "$preserved" >"$tmp/$name.preserved"
        printf 'Preserved local change to upstream-unchanged file: %s\n' "$target_file"
      fi
      continue
    fi
    if [ -f "$target_file" ] && cmp -s "$source_file" "$target_file"; then
      unchanged=$((unchanged + 1))
      printf '%s\n' "$unchanged" >"$tmp/$name.unchanged"
      continue
    fi
    if [ -e "$target_file" ]; then
      mkdir -p "$backup/$(dirname "$rel")"
      cp -p "$target_file" "$backup/$rel"
    fi
    mkdir -p "$(dirname "$target_file")"
    cp -p "$source_file" "$target_file"
    updated=$((updated + 1))
    printf '%s\n' "$updated" >"$tmp/$name.updated"
  done

  if [ -f "$manifest" ]; then
    while IFS="$(printf '\t')" read -r old_hash rel; do
      [ -n "$rel" ] || continue
      grep -Fqx "$rel" "$new_paths" && continue
      target_file="$dest/$rel"
      [ -f "$target_file" ] || continue
      current_hash="$(sha256_file "$target_file")"
      if [ "$current_hash" = "$old_hash" ]; then
        mkdir -p "$backup/$(dirname "$rel")"
        cp -p "$target_file" "$backup/$rel"
        rm "$target_file"
        removed=$((removed + 1))
        printf '%s\n' "$removed" >"$tmp/$name.removed"
      else
        preserved=$((preserved + 1))
        printf '%s\n' "$preserved" >"$tmp/$name.preserved"
        printf 'Preserved locally modified retired file: %s\n' "$target_file"
      fi
    done <"$manifest"
  fi

  cp "$new_manifest" "$manifest"
  printf '%s\n' "$commit" >"$dest/.claude-code-codex-skills.version"
  target_updated="$(cat "$tmp/$name.updated" 2>/dev/null || printf 0)"
  target_unchanged="$(cat "$tmp/$name.unchanged" 2>/dev/null || printf 0)"
  target_removed="$(cat "$tmp/$name.removed" 2>/dev/null || printf 0)"
  target_preserved="$(cat "$tmp/$name.preserved" 2>/dev/null || printf 0)"
  printf '%s: updated=%s unchanged=%s removed=%s preserved=%s commit=%s\n' \
    "$name" "$target_updated" "$target_unchanged" "$target_removed" \
    "$target_preserved" "$commit"
}

run_codex=false
run_claude=false
case "$mode" in
  --codex) run_codex=true ;;
  --claude) run_claude=true ;;
  --all) run_codex=true; run_claude=true ;;
  --auto)
    [ -d "$HOME/.codex" ] && run_codex=true
    [ -d "$HOME/.claude" ] && run_claude=true
    ;;
esac

if [ "$run_codex" = false ] && [ "$run_claude" = false ]; then
  printf 'No existing ~/.codex or ~/.claude installation found. Use --codex, --claude, or --all.\n' >&2
  exit 1
fi

if [ "$run_codex" = true ]; then
  update_target Codex "$source_root/codex" "$HOME/.codex" \
    config.toml model-instructions.md agents skills
fi
if [ "$run_claude" = true ]; then
  update_target Claude "$source_root/claude" "$HOME/.claude" \
    CLAUDE.md agents skills output-styles
fi

printf 'Managed Codex config.toml is backed up before replacement. Claude settings.json is unchanged. Restart the updated application.\n'
