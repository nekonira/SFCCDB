$utf8 = New-Object System.Text.UTF8Encoding($false)

$files = @(
    "src/lib/react.min.js",
    "src/lib/react-dom.min.js",
    "src/lib/babel.min.js",
    "src/lib/tailwind.js",
    "src/data/mockData.js",
    "src/app.jsx"
)

Write-Host "--- 1. File Existence & Size Check ---"
foreach ($f in $files) {
    $p = Join-Path "c:\Users\nekon\SFCCdeta" $f
    if (Test-Path $p) {
        $len = (Get-Item $p).Length
        Write-Host "OK: $f ($len bytes)" -ForegroundColor Green
    } else {
        Write-Host "MISSING: $f" -ForegroundColor Red
    }
}

Write-Host "`n--- 2. app.jsx Syntax Check ---"
$appCode = [System.IO.File]::ReadAllText("c:\Users\nekon\SFCCdeta\src\app.jsx", $utf8)

$sq = ([regex]::Matches($appCode, "'")).Count
$dq = ([regex]::Matches($appCode, '"')).Count
$ob = ([regex]::Matches($appCode, '\{')).Count
$cb = ([regex]::Matches($appCode, '\}')).Count
$op = ([regex]::Matches($appCode, '\(')).Count
$cp = ([regex]::Matches($appCode, '\)')).Count

Write-Host "Braces count: { $ob vs } $cb"
Write-Host "Parens count: ( $op vs ) $cp"

if ($ob -eq $cb -and $op -eq $cp) {
    Write-Host "SUCCESS: app.jsx brackets and parens match 100%!" -ForegroundColor Green
} else {
    Write-Host "WARNING: Mismatched brackets in app.jsx!" -ForegroundColor Red
}

Write-Host "`n--- 3. index.html Wiring Check ---"
$html = [System.IO.File]::ReadAllText("c:\Users\nekon\SFCCdeta\index.html", $utf8)

if ($html.Contains('src="./src/data/mockData.js') -and $html.Contains('src="./src/app.jsx')) {
    Write-Host "SUCCESS: index.html correctly links mockData.js and app.jsx!" -ForegroundColor Green
} else {
    Write-Host "WARNING: index.html missing script links!" -ForegroundColor Red
}
