$inputPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\d5a8fc00-3f38-416e-a6d5-880cde2dd192\media__1785833929568.png"
$outputPath = "c:\Users\nekon\SFCCdeta\src\data\maekawaImage.js"

$bytes = [System.IO.File]::ReadAllBytes($inputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$dataUrl = "data:image/png;base64," + $base64

$content = "window.MAEKAWA_IMAGE = " + (ConvertTo-Json $dataUrl) + ";"
[System.IO.File]::WriteAllText($outputPath, $content)
Write-Host "Daiya Maekawa (2026) image generated successfully!"
