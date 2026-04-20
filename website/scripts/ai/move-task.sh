#!/usr/bin/env bash
# Move a task file between lifecycle folders and update its status/updated fields.
# Usage: move-task.sh --slug <kebab-slug> --to <backlog|active|done>

set -euo pipefail

SLUG=""
TO=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --slug) SLUG="$2"; shift 2 ;;
    --to) TO="$2"; shift 2 ;;
    -h|--help)
      sed -n '2,3p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 2
      ;;
  esac
done

if [[ -z "$SLUG" || -z "$TO" ]]; then
  echo "Usage: $0 --slug <kebab-slug> --to <backlog|active|done>" >&2
  exit 2
fi

case "$TO" in
  backlog|active|done) ;;
  *) echo "Invalid --to: $TO" >&2; exit 2 ;;
esac

if [[ ! "$SLUG" =~ ^[a-z0-9][a-z0-9-]*$ ]]; then
  echo "Invalid --slug: must be lowercase kebab-case" >&2
  exit 2
fi

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TASKS_ROOT="$REPO_ROOT/.ai/tasks"

SOURCE=""
CURRENT=""
for F in backlog active done; do
  CANDIDATE="$TASKS_ROOT/$F/${SLUG}.md"
  if [[ -f "$CANDIDATE" ]]; then
    SOURCE="$CANDIDATE"
    CURRENT="$F"
    break
  fi
done

if [[ -z "$SOURCE" ]]; then
  echo "Task not found in any lifecycle folder: $SLUG" >&2
  exit 1
fi
if [[ "$CURRENT" == "$TO" ]]; then
  echo "Task already in '$TO' - no move needed."
  exit 0
fi

TARGET_DIR="$TASKS_ROOT/$TO"
TARGET="$TARGET_DIR/${SLUG}.md"
[[ -d "$TARGET_DIR" ]] || { echo "Target folder not found: $TARGET_DIR" >&2; exit 1; }
[[ ! -e "$TARGET" ]] || { echo "Target already exists: $TARGET" >&2; exit 1; }

TODAY="$(date +%Y-%m-%d)"

# Portable in-place edit using a temp file.
TMP="$(mktemp)"
awk -v status="$TO" -v updated="$TODAY" '
  BEGIN { in_fm = 0; seen_first = 0 }
  /^---[[:space:]]*$/ {
    if (!seen_first) { seen_first = 1; in_fm = 1; print; next }
    else if (in_fm) { in_fm = 0; print; next }
  }
  {
    if (in_fm && $1 == "status:") { print "status: " status; next }
    if (in_fm && $1 == "updated:") { print "updated: " updated; next }
    print
  }
' "$SOURCE" > "$TMP"

mv "$TMP" "$SOURCE"
mv "$SOURCE" "$TARGET"

echo "Moved $SLUG : $CURRENT -> $TO"
