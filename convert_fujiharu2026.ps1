$inputPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\0f868610-d568-48e9-8d5c-c399e8ee6f47\media__1785948366362.png"
$outputPath = "c:\Users\nekon\SFCCdeta\src\data\fujiharu2026Image.js"

$bytes = [System.IO.File]::ReadAllBytes($inputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$dataUrl = "data:image/png;base64," + $base64

$content = "window.FUJIHARU_2026_IMAGE = " + (ConvertTo-Json $dataUrl) + ";"
[System.IO.File]::WriteAllText($outputPath, $content, [System.Text.Encoding]::UTF8)
Write-Host "Hiroki Fujiharu (2026) image converted successfully!"
