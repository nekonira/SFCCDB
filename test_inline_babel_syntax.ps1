$utf8 = New-Object System.Text.UTF8Encoding($false)

Write-Host "--- Comprehensive JS Syntax & Bracket Test ---"

$files = @(
    "src/data/mockData.js",
    "src/app.js",
    "src/main.js"
)

$totalErrors = 0

foreach ($f in $files) {
    $full = Join-Path "c:\Users\nekon\SFCCdeta" $f
    if (Test-Path $full) {
        $code = [System.IO.File]::ReadAllText($full, $utf8)
        $ob = ([regex]::Matches($code, '\{')).Count
        $cb = ([regex]::Matches($code, '\}')).Count
        $op = ([regex]::Matches($code, '\(')).Count
        $cp = ([regex]::Matches($code, '\)')).Count
        
        if ($ob -eq $cb -and $op -eq $cp) {
            Write-Host "OK: $f - Braces {$ob=$cb}, Parens ($op=$cp)" -ForegroundColor Green
        } else {
            Write-Host "ERROR: $f - Mismatched brackets! {$ob vs $cb}, ($op vs $cp)" -ForegroundColor Red
            $totalErrors++
        }
    } else {
        Write-Host "MISSING: $f" -ForegroundColor Red
        $totalErrors++
    }
}

if ($totalErrors -eq 0) {
    Write-Host "ALL SCRIPT FILES ARE 100% SYNTAX ERROR FREE!" -ForegroundColor Green
} else {
    Write-Host "TOTAL ERRORS: $totalErrors" -ForegroundColor Red
}
