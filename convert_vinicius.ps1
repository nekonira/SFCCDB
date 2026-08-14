$inputPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\6c4db7e4-062b-4bae-9c3b-7e6353826b0f\media__1785170793527.png"
$outputPath = "c:\Users\nekon\SFCCdeta\src\data\viniciusImage.js"

$bytes = [System.IO.File]::ReadAllBytes($inputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$dataUrl = "data:image/png;base64," + $base64

$content = "window.VINICIUS_IMAGE = " + (ConvertTo-Json $dataUrl) + ";"
[System.IO.File]::WriteAllText($outputPath, $content)
Write-Host "Vinicius image generated successfully!"
