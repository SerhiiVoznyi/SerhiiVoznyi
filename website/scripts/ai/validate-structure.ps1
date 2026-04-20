<#
.SYNOPSIS
  Validate the .ai/ repository layout against baseline invariants.

.DESCRIPTION
  Checks:
  - Required top-level folders under .ai/ exist.
  - Every folder requiring a README.md has one.
  - Registered agents/skills/workflows have their canonical file.
  - docs/ai-system/ and scripts/ai/ exist.
  Prints a report and exits 0 on success, non-zero on any failure.
#>
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$ai = Join-Path $repoRoot '.ai'

$errors = [System.Collections.Generic.List[string]]::new()
$checked = 0

function Assert-Path {
  param([string]$Path, [string]$Kind)
  $script:checked++
  if (-not (Test-Path $Path)) {
    $errors.Add("missing $Kind : $Path")
  }
}

# Top-level folders that must exist.
$topFolders = @(
  'agents', 'skills', 'workflows', 'tasks', 'templates',
  'memory', 'context', 'rules', 'logs', 'checklists'
)
foreach ($f in $topFolders) {
  Assert-Path -Path (Join-Path $ai $f) -Kind 'folder'
}

# Folders that must have a README.md.
$readmeFolders = @(
  $ai,
  (Join-Path $ai 'agents'),
  (Join-Path $ai 'skills'),
  (Join-Path $ai 'workflows'),
  (Join-Path $ai 'tasks'),
  (Join-Path $ai 'templates'),
  (Join-Path $ai 'memory'),
  (Join-Path $ai 'context'),
  (Join-Path $ai 'rules'),
  (Join-Path $ai 'logs'),
  (Join-Path $ai 'checklists'),
  (Join-Path $repoRoot 'docs\ai-system'),
  (Join-Path $repoRoot 'scripts\ai')
)
foreach ($f in $readmeFolders) {
  Assert-Path -Path (Join-Path $f 'README.md') -Kind 'README.md'
}

# Templates present.
$templates = @(
  'task.template.md', 'workflow.template.md', 'skill.template.md',
  'decision-record.template.md', 'prompt.template.md',
  'checklist.template.md', 'agent-instructions.template.md'
)
foreach ($t in $templates) {
  Assert-Path -Path (Join-Path $ai "templates\$t") -Kind 'template'
}

# Agents have instructions.md, prompts.md, config.yaml.
$agentsDir = Join-Path $ai 'agents'
Get-ChildItem $agentsDir -Directory -ErrorAction SilentlyContinue | Where-Object { $_.Name -notlike '_*' } | ForEach-Object {
  Assert-Path -Path (Join-Path $_.FullName 'instructions.md') -Kind 'agent instructions.md'
  Assert-Path -Path (Join-Path $_.FullName 'prompts.md') -Kind 'agent prompts.md'
  Assert-Path -Path (Join-Path $_.FullName 'config.yaml') -Kind 'agent config.yaml'
}

# Skills have SKILL.md.
$skillsDir = Join-Path $ai 'skills'
Get-ChildItem $skillsDir -Directory -ErrorAction SilentlyContinue | Where-Object { $_.Name -notlike '_*' } | ForEach-Object {
  Assert-Path -Path (Join-Path $_.FullName 'SKILL.md') -Kind 'SKILL.md'
}

# Workflows have workflow.md.
$workflowsDir = Join-Path $ai 'workflows'
Get-ChildItem $workflowsDir -Directory -ErrorAction SilentlyContinue | Where-Object { $_.Name -notlike '_*' } | ForEach-Object {
  Assert-Path -Path (Join-Path $_.FullName 'workflow.md') -Kind 'workflow.md'
}

# Task lifecycle folders.
foreach ($f in @('backlog', 'active', 'done', 'templates')) {
  Assert-Path -Path (Join-Path $ai "tasks\$f") -Kind 'tasks lifecycle folder'
}

Write-Host "Checked $checked paths."
if ($errors.Count -gt 0) {
  Write-Host "Failures:" -ForegroundColor Red
  foreach ($e in $errors) { Write-Host "  $e" -ForegroundColor Red }
  exit 1
}
Write-Host "OK: .ai/ structure is valid." -ForegroundColor Green
