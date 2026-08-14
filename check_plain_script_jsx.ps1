$indexPath = "c:\Users\nekon\SFCCdeta\index.html"
$utf8 = New-Object System.Text.UTF8Encoding($false)
$text = [System.IO.File]::ReadAllText($indexPath, $utf8)

$lines = $text.Split("`n")

# Inspect lines between 28 and 6972
Write-Host "Checking lines 28 to 6972 for JSX or syntax errors..."
$jsxLines = 0
for ($i = 27; $i -lt 6971; $i++) {
    $line = $lines[$i]
    if ($line -match '<[a-zA-Z]+' -and -not $line.Contains("<-")) {
        $jsxLines++
        if ($jsxLines -le 5) {
            $num = $i + 1
            Write-Host "Line ${num} inside plain <script> has JSX: $($line.Trim())" -ForegroundColor Red
        }
    }
}

if ($jsxLines -gt 0) {
    Write-Host "CRITICAL FAILURE: Plain <script> tag (lines 28-6972) contains $jsxLines lines of JSX! Browser WILL THROW UNCAUGHT SYNTAX ERROR '<'!" -ForegroundColor Red
} else {
    Write-Host "Plain <script> tag contains NO JSX code." -ForegroundColor Green
}
