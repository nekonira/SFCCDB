$utf8 = New-Object System.Text.UTF8Encoding($false)

$indexPath = "c:\Users\nekon\SFCCdeta\index.html"
$appJsPath = "c:\Users\nekon\SFCCdeta\src\app.js"
$mainJsPath = "c:\Users\nekon\SFCCdeta\src\main.js"
$mockDataPath = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"

$indexText = [System.IO.File]::ReadAllText($indexPath, $utf8)
$appText = [System.IO.File]::ReadAllText($appJsPath, $utf8)
$mockText = [System.IO.File]::ReadAllText($mockDataPath, $utf8)
$mainText = [System.IO.File]::ReadAllText($mainJsPath, $utf8)

Write-Host "--- 1. File Size & Integrity Verification ---"
Write-Host "index.html: $($indexText.Length) bytes"
Write-Host "mockData.js: $($mockText.Length) bytes"
Write-Host "app.js:     $($appText.Length) bytes"
Write-Host "main.js:    $($mainText.Length) bytes"

Write-Host "`n--- 2. Script Links Verification in index.html ---"
$links = @("mockData.js", "app.js", "main.js", "react.min.js", "react-dom.min.js", "tailwind.js")
$allLinked = $true

foreach ($l in $links) {
    if ($indexText.Contains($l)) {
        Write-Host "OK: Linked '$l' found in index.html" -ForegroundColor Green
    } else {
        Write-Host "MISSING: Link '$l' NOT found in index.html" -ForegroundColor Red
        $allLinked = $false
    }
}

if ($allLinked) {
    Write-Host "`nVERIFICATION RESULT: ALL 6 SCRIPTS SAFELY LINKED & READY!" -ForegroundColor Green
} else {
    Write-Host "`nVERIFICATION RESULT: MISSING SCRIPT LINKS DETECTED!" -ForegroundColor Red
}
