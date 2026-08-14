$inputPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\d5a8fc00-3f38-416e-a6d5-880cde2dd192\media__1785827358036.png"
$outputPath = "c:\Users\nekon\SFCCdeta\src\data\naomichiUedaImage.js"
$legacyPath = "c:\Users\nekon\SFCCdeta\src\data\uedaImage.js"

$bytes = [System.IO.File]::ReadAllBytes($inputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$dataUrl = "data:image/png;base64," + $base64

$content = "window.NAOMICHI_UEDA_IMAGE = " + (ConvertTo-Json $dataUrl) + ";`nwindow.UEDA_IMAGE = window.NAOMICHI_UEDA_IMAGE;"
[System.IO.File]::WriteAllText($outputPath, $content)
[System.IO.File]::WriteAllText($legacyPath, $content)
Write-Host "Naomichi Ueda image generated successfully!"
