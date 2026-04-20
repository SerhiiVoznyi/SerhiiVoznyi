#!/usr/bin/env bash
# Validate the .ai/ repository layout against baseline invariants.

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
AI="$REPO_ROOT/.ai"

errors=()
checked=0

assert_path() {
  local path="$1"
  local kind="$2"
  checked=$((checked + 1))
  if [[ ! -e "$path" ]]; then
    errors+=("missing $kind : $path")
  fi
}

# Top-level folders under .ai/.
for f in agents skills workflows tasks templates memory context rules logs checklists; do
  assert_path "$AI/$f" "folder"
done

# Folders that must have a README.md.
readme_folders=(
  "$AI"
  "$AI/agents"
  "$AI/skills"
  "$AI/workflows"
  "$AI/tasks"
  "$AI/templates"
  "$AI/memory"
  "$AI/context"
  "$AI/rules"
  "$AI/logs"
  "$AI/checklists"
  "$REPO_ROOT/docs/ai-system"
  "$REPO_ROOT/scripts/ai"
)
for f in "${readme_folders[@]}"; do
  assert_path "$f/README.md" "README.md"
done

# Templates present.
for t in task.template.md workflow.template.md skill.template.md decision-record.template.md prompt.template.md checklist.template.md agent-instructions.template.md; do
  assert_path "$AI/templates/$t" "template"
done

# Per-agent canonical files.
if [[ -d "$AI/agents" ]]; then
  while IFS= read -r d; do
    name="$(basename "$d")"
    [[ "$name" == _* ]] && continue
    assert_path "$d/instructions.md" "agent instructions.md"
    assert_path "$d/prompts.md" "agent prompts.md"
    assert_path "$d/config.yaml" "agent config.yaml"
  done < <(find "$AI/agents" -mindepth 1 -maxdepth 1 -type d)
fi

# Per-skill canonical files.
if [[ -d "$AI/skills" ]]; then
  while IFS= read -r d; do
    name="$(basename "$d")"
    [[ "$name" == _* ]] && continue
    assert_path "$d/SKILL.md" "SKILL.md"
  done < <(find "$AI/skills" -mindepth 1 -maxdepth 1 -type d)
fi

# Per-workflow canonical files.
if [[ -d "$AI/workflows" ]]; then
  while IFS= read -r d; do
    name="$(basename "$d")"
    [[ "$name" == _* ]] && continue
    assert_path "$d/workflow.md" "workflow.md"
  done < <(find "$AI/workflows" -mindepth 1 -maxdepth 1 -type d)
fi

# Task lifecycle folders.
for f in backlog active done templates; do
  assert_path "$AI/tasks/$f" "tasks lifecycle folder"
done

echo "Checked $checked paths."
if [[ ${#errors[@]} -gt 0 ]]; then
  echo "Failures:"
  for e in "${errors[@]}"; do echo "  $e"; done
  exit 1
fi
echo "OK: .ai/ structure is valid."
