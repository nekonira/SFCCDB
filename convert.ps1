$inputPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\b53ae5f4-8a8b-4660-846e-6b3146d6ddd1\media__1785164498264.png"
$outputPath = "c:\Users\nekon\SFCCdeta\src\data\vandijkImage.js"

$bytes = [System.IO.File]::ReadAllBytes($inputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$dataUrl = "data:image/png;base64," + $base64

$content = "window.VAN_DIJK_IMAGE = " + (ConvertTo-Json $dataUrl) + ";"
[System.IO.File]::WriteAllText($outputPath, $content)
Write-Host "Success!"
