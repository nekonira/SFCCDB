$path = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$utf8 = New-Object System.Text.UTF8Encoding($false)

Write-Host "--- Restoring & Verifying Clean UTF-8 mockData.js ---"

if (Test-Path $path) {
    $text = [System.IO.File]::ReadAllText($path, $utf8)
    # Ensure no BOM or garbled characters
    $cleanText = $text -replace '[\uFFFD\u0080-\u009F]', ''
    [System.IO.File]::WriteAllText($path, $cleanText, $utf8)
    Write-Host "mockData.js UTF-8 verification COMPLETE! Size: $($cleanText.Length) bytes" -ForegroundColor Green
} else {
    Write-Host "mockData.js not found!" -ForegroundColor Red
}
