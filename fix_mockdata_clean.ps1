[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$nodeExe = "C:\Program Files\Adobe\Adobe Photoshop 2026\node.exe"
if (-not (Test-Path $nodeExe)) { $nodeExe = "node" }

Write-Host "--- Executing Database Repair & Cleaning (fix_mockdata_clean) ---"
& $nodeExe "c:\Users\nekon\SFCCdeta\repair_and_rebuild_clean_db.js"
