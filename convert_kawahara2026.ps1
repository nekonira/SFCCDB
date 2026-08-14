$inputPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\e536f7dd-c90e-4781-98c2-370755852efb\media__1786023667418.png"
$outputPath = "c:\Users\nekon\SFCCdeta\src\data\kawahara2026Image.js"

$bytes = [System.IO.File]::ReadAllBytes($inputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$dataUrl = "data:image/png;base64," + $base64

$content = "window.KAWAHARA_2026_IMAGE = " + (ConvertTo-Json $dataUrl) + ";"
[System.IO.File]::WriteAllText($outputPath, $content, [System.Text.Encoding]::UTF8)
Write-Host "So Kawahara (2026) image updated successfully!"
