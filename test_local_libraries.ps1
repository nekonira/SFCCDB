$libs = @(
    "src/lib/react.min.js",
    "src/lib/react-dom.min.js",
    "src/lib/babel.min.js",
    "src/lib/tailwind.js",
    "src/data/mockData.js",
    "src/app.jsx",
    "src/main.jsx"
)

Write-Host "--- Checking Local File Integrity ---"
foreach ($l in $libs) {
    $full = Join-Path "c:\Users\nekon\SFCCdeta" $l
    if (Test-Path $full) {
        $size = (Get-Item $full).Length
        Write-Host "OK: $l ($size bytes)" -ForegroundColor Green
    } else {
        Write-Host "MISSING: $l" -ForegroundColor Red
    }
}
