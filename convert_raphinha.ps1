$inputPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\8fbef5d4-c2c1-40af-9e74-7558d501a053\media__1785298949816.png"
$outputPath = "c:\Users\nekon\SFCCdeta\src\data\raphinhaImage.js"

$bytes = [System.IO.File]::ReadAllBytes($inputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$dataUrl = "data:image/png;base64," + $base64

$content = "window.RAPHINHA_IMAGE = " + (ConvertTo-Json $dataUrl) + ";"
[System.IO.File]::WriteAllText($outputPath, $content)
Write-Host "Raphinha image generated successfully!"
