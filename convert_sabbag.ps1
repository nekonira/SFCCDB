$inputPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\e7c1dab5-6f9b-44e7-b1fa-a21cb50263bb\media__1785682345825.png"
$outputPath = "c:\Users\nekon\SFCCdeta\src\data\sabbagImage.js"

$bytes = [System.IO.File]::ReadAllBytes($inputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$dataUrl = "data:image/png;base64," + $base64

$content = "window.SABBAG_IMAGE = " + (ConvertTo-Json $dataUrl) + ";"
[System.IO.File]::WriteAllText($outputPath, $content)
Write-Host "Pablo Sabbag image generated successfully!"
