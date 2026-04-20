#!/usr/bin/env bash
# Create a new task file in .ai/tasks/backlog/ from a template.
# Usage: new-task.sh --type <feature|bugfix|spike> --slug <kebab-slug> [--title "Title"]

set -euo pipefail

TYPE=""
SLUG=""
TITLE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --type) TYPE="$2"; shift 2 ;;
    --slug) SLUG="$2"; shift 2 ;;
    --title) TITLE="$2"; shift 2 ;;
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

if [[ -z "$TYPE" || -z "$SLUG" ]]; then
  echo "Usage: $0 --type <feature|bugfix|spike> --slug <kebab-slug> [--title \"Title\"]" >&2
  exit 2
fi

case "$TYPE" in
  feature|bugfix|spike) ;;
  *) echo "Invalid --type: $TYPE (expected: feature|bugfix|spike)" >&2; exit 2 ;;
esac

if [[ ! "$SLUG" =~ ^[a-z0-9][a-z0-9-]*$ ]]; then
  echo "Invalid --slug: must be lowercase kebab-case" >&2
  exit 2
fi

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TEMPLATE="$REPO_ROOT/.ai/tasks/templates/${TYPE}.task.md"
TARGET_DIR="$REPO_ROOT/.ai/tasks/backlog"
TARGET="$TARGET_DIR/${SLUG}.md"

[[ -f "$TEMPLATE" ]] || { echo "Template not found: $TEMPLATE" >&2; exit 1; }
[[ -d "$TARGET_DIR" ]] || { echo "Target folder not found: $TARGET_DIR" >&2; exit 1; }
[[ ! -e "$TARGET" ]] || { echo "Task already exists: $TARGET" >&2; exit 1; }

[[ -z "$TITLE" ]] && TITLE="$SLUG"
TODAY="$(date +%Y-%m-%d)"

CONTENT="$(cat "$TEMPLATE")"
CONTENT="${CONTENT//<${TYPE}-slug>/$SLUG}"
CONTENT="${CONTENT//<short human-readable title>/$TITLE}"
CONTENT="${CONTENT//<short description of the bug>/$TITLE}"
CONTENT="${CONTENT//<question this spike answers>/$TITLE}"
CONTENT="${CONTENT//<YYYY-MM-DD>/$TODAY}"

printf '%s' "$CONTENT" > "$TARGET"
echo "Created $TARGET"
