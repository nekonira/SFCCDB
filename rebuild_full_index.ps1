$nodePath = "node"
$adobeNode = "C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe"
if (Test-Path $adobeNode) { $nodePath = $adobeNode }

Write-Host "Rebuilding index.html via Node.js..."
& $nodePath "$PSScriptRoot\scratch\build_clean_utf8_index.js"
& $nodePath "$PSScriptRoot\scratch\apply_map_to_app_js.js"

