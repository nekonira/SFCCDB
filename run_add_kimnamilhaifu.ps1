$nodeCandidates = @(
    "C:\Program Files\Adobe\Adobe Photoshop 2026\node.exe",
    "C:\Program Files\Adobe\Adobe Photoshop 2025\node.exe",
    "C:\Program Files\Adobe\Adobe Photoshop 2024\node.exe",
    "C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe"
)

$nodePath = $null
foreach ($cand in $nodeCandidates) {
    if (Test-Path $cand) {
        $nodePath = $cand
        break
    }
}

if ($nodePath) {
    Write-Host "Using Node: $nodePath"
    & $nodePath "c:\Users\nekon\SFCCdeta\add_kimnamilhaifu.js"
} else {
    Write-Error "Node.exe not found!"
}
