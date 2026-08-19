$inputPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\0aaf2bde-14a7-4f73-8cb5-043aebe85788\.user_uploaded\media_1787113698190.png"
$outputPath = "c:\Users\nekon\SFCCdeta\src\data\akanji2026Image.js"

$bytes = [System.IO.File]::ReadAllBytes($inputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$dataUrl = "data:image/png;base64," + $base64

$content = "window.AKANJI_2026_IMAGE = " + (ConvertTo-Json $dataUrl) + ";"
[System.IO.File]::WriteAllText($outputPath, $content, [System.Text.Encoding]::UTF8)
Write-Host "Manuel Akanji (2026) image converted successfully!"
