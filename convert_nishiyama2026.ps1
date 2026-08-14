$inputPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\ffb3800f-6175-4cfd-a455-173e8f5cae42\media__1785859968445.png"
$outputPath = "c:\Users\nekon\SFCCdeta\src\data\nishiyama2026Image.js"

$bytes = [System.IO.File]::ReadAllBytes($inputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$dataUrl = "data:image/png;base64," + $base64

$content = "window.NISHIYAMA_2026_IMAGE = " + (ConvertTo-Json $dataUrl) + ";"
[System.IO.File]::WriteAllText($outputPath, $content)
Write-Host "Taiga Nishiyama (2026) image generated successfully!"
