# Safe generator for mockData.js
$nodeExe = "C:\Program Files\Adobe\Adobe Photoshop 2026\node.exe"
if (-not (Test-Path $nodeExe)) { $nodeExe = "node" }

Write-Host "Rebuilding clean UTF-8 database..."
& $nodeExe "c:\Users\nekon\SFCCdeta\repair_and_rebuild_clean_db.js"

