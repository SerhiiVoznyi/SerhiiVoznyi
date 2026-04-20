<#
.SYNOPSIS
  Move a task file between lifecycle folders and update its status/updated fields.

.PARAMETER Slug
  Task slug (filename without .md).

.PARAMETER To
  Target lifecycle folder: backlog | active | done.

.EXAMPLE
  ./scripts/ai/move-task.ps1 -Slug add-dark-mode -To active
#>
[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^[a-z0-9][a-z0-9-]*$')]
  [string]$Slug,

  [Parameter(Mandatory = $true)]
  [ValidateSet('backlog', 'active', 'done')]
  [string]$To
)

$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$tasksRoot = Join-Path $repoRoot '.ai\tasks'
$folders = @('backlog', 'active', 'done')

$source = $null
foreach ($f in $folders) {
  $candidate = Join-Path $tasksRoot "$f\$Slug.md"
  if (Test-Path $candidate) {
    $source = $candidate
    $currentFolder = $f
    break
  }
}

if ($null -eq $source) {
  throw "Task not found in any lifecycle folder: $Slug"
}
if ($currentFolder -eq $To) {
  Write-Host "Task already in '$To' - no move needed."
  return
}

$targetDir = Join-Path $tasksRoot $To
if (-not (Test-Path $targetDir)) {
  throw "Target folder not found: $targetDir"
}
$target = Join-Path $targetDir "$Slug.md"
if (Test-Path $target) {
  throw "Target already exists: $target"
}

$today = (Get-Date).ToString('yyyy-MM-dd')
$content = Get-Content -Raw -Path $source
$content = [regex]::Replace($content, '(?m)^status:\s*\S+', "status: $To")
$content = [regex]::Replace($content, '(?m)^updated:\s*\S+', "updated: $today")

Set-Content -Path $source -Value $content -Encoding UTF8 -NoNewline
Move-Item -Path $source -Destination $target

Write-Host "Moved $Slug : $currentFolder -> $To"
