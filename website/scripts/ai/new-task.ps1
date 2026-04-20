<#
.SYNOPSIS
  Create a new task file in .ai/tasks/backlog/ from a template.

.DESCRIPTION
  Copies .ai/tasks/templates/<type>.task.md to .ai/tasks/backlog/<slug>.md and
  fills id, title, created, and updated fields. Fails if the target already exists.

.PARAMETER Type
  Task type: feature | bugfix | spike.

.PARAMETER Slug
  Kebab-case task slug; becomes the filename stem.

.PARAMETER Title
  Optional human-readable title. Defaults to the slug.

.EXAMPLE
  ./scripts/ai/new-task.ps1 -Type feature -Slug add-dark-mode -Title "Add dark mode toggle"
#>
[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('feature', 'bugfix', 'spike')]
  [string]$Type,

  [Parameter(Mandatory = $true)]
  [ValidatePattern('^[a-z0-9][a-z0-9-]*$')]
  [string]$Slug,

  [Parameter(Mandatory = $false)]
  [string]$Title
)

$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$templatePath = Join-Path $repoRoot ".ai\tasks\templates\$Type.task.md"
$targetDir = Join-Path $repoRoot '.ai\tasks\backlog'
$targetPath = Join-Path $targetDir "$Slug.md"

if (-not (Test-Path $templatePath)) {
  throw "Template not found: $templatePath"
}
if (-not (Test-Path $targetDir)) {
  throw "Target folder not found: $targetDir"
}
if (Test-Path $targetPath) {
  throw "Task already exists: $targetPath"
}

if ([string]::IsNullOrWhiteSpace($Title)) { $Title = $Slug }
$today = (Get-Date).ToString('yyyy-MM-dd')

$content = Get-Content -Raw -Path $templatePath
$content = $content -replace '<' + $Type + '-slug>', $Slug
$content = $content -replace '<short human-readable title>', $Title
$content = $content -replace '<short description of the bug>', $Title
$content = $content -replace '<question this spike answers>', $Title
$content = $content -replace '<YYYY-MM-DD>', $today

Set-Content -Path $targetPath -Value $content -Encoding UTF8 -NoNewline

Write-Host "Created $targetPath"
