$html = Get-Content 'c:\Users\nekon\SFCCdeta\index.html' -Raw
$matches = [regex]::Matches($html, '<script.*?src=["'']([^"'']+)["'"]')

$missingCount = 0

Write-Host "--- Checking Script Files Existence ---"
foreach ($m in $matches) {
    $src = $m.Groups[1].Value
    $cleanSrc = $src.Split('?')[0]
    if ($cleanSrc.StartsWith("http")) { continue }
    
    $fullPath = Join-Path 'c:\Users\nekon\SFCCdeta' ($cleanSrc -replace '^\./', '')
    if (-not (Test-Path $fullPath)) {
        Write-Host "MISSING FILE: $cleanSrc (Full path: $fullPath)" -ForegroundColor Red
        $missingCount++
    }
}

if ($missingCount -eq 0) {
    Write-Host "All local script files exist!" -ForegroundColor Green
} else {
    Write-Host "Total missing files: $missingCount" -ForegroundColor Red
}
