$inputPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\ac89fd2a-cb35-4d55-ac69-24a7b845f8e8\.user_uploaded\media_1789462382610.jpg"
$outputPath = "c:\Users\nekon\SFCCdeta\src\data\merinoCardImage.js"

$bytes = [System.IO.File]::ReadAllBytes($inputPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$dataUrl = "data:image/jpeg;base64," + $base64

$content = "window.MERINO_CARD_IMAGE = " + (ConvertTo-Json $dataUrl) + ";"
[System.IO.File]::WriteAllText($outputPath, $content, [System.Text.Encoding]::UTF8)
Write-Host "Mikel Merino card image converted successfully!"
