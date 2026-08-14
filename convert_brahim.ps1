$inputPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\21b74cc2-e5cf-4bb4-908a-60ea28f51f24\media__1786464273297.png"
$outputPath = "c:\Users\nekon\SFCCdeta\src\data\brahimImage.js"

$bytes = [System.IO.File]::ReadAllBytes($inputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$dataUrl = "data:image/png;base64," + $base64

$content = "window.BRAHIM_IMAGE = " + (ConvertTo-Json $dataUrl) + ";"
[System.IO.File]::WriteAllText($outputPath, $content)
Write-Host "Brahim Diaz image updated successfully!"
