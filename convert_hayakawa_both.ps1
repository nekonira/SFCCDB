$inputPathBest11 = "C:\Users\nekon\.gemini\antigravity-ide\brain\e7c1dab5-6f9b-44e7-b1fa-a21cb50263bb\media__1785682058612.png"
$outputPathBest11 = "c:\Users\nekon\SFCCdeta\src\data\hayakawaBest11Image.js"

if (Test-Path $inputPathBest11) {
    $bytes = [System.IO.File]::ReadAllBytes($inputPathBest11)
    $base64 = [System.Convert]::ToBase64String($bytes)
    $dataUrl = "data:image/png;base64," + $base64
    $content = "window.HAYAKAWA_BEST11_IMAGE = " + (ConvertTo-Json $dataUrl) + ";"
    [System.IO.File]::WriteAllText($outputPathBest11, $content)
    Write-Host "Hayakawa BEST11 image generated successfully!"
} else {
    Write-Host "Best11 image not found at $inputPathBest11"
}

$inputPath2026 = "C:\Users\nekon\.gemini\antigravity-ide\brain\d5a8fc00-3f38-416e-a6d5-880cde2dd192\media__1785833332057.png"
$outputPath2026 = "c:\Users\nekon\SFCCdeta\src\data\hayakawa2026Image.js"
$legacyPath = "c:\Users\nekon\SFCCdeta\src\data\hayakawaImage.js"

if (Test-Path $inputPath2026) {
    $bytes = [System.IO.File]::ReadAllBytes($inputPath2026)
    $base64 = [System.Convert]::ToBase64String($bytes)
    $dataUrl = "data:image/png;base64," + $base64
    $content = "window.HAYAKAWA_2026_IMAGE = " + (ConvertTo-Json $dataUrl) + ";`nwindow.HAYAKAWA_IMAGE = window.HAYAKAWA_2026_IMAGE;"
    [System.IO.File]::WriteAllText($outputPath2026, $content)
    [System.IO.File]::WriteAllText($legacyPath, $content)
    Write-Host "Hayakawa 2026 image generated successfully!"
}
