$inputPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\6ed6a2f2-fc44-4bdd-9236-0005e9e30c1f\media__1785266143213.png"
$outputPath = "c:\Users\nekon\SFCCdeta\src\data\dimarcoImage.js"

$bytes = [System.IO.File]::ReadAllBytes($inputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$dataUrl = "data:image/png;base64," + $base64

$content = "window.DIMARCO_IMAGE = " + (ConvertTo-Json $dataUrl) + ";"
[System.IO.File]::WriteAllText($outputPath, $content)
Write-Host "Federico Dimarco image generated successfully!"
