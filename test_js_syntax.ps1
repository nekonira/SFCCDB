$html = Get-Content 'c:\Users\nekon\SFCCdeta\index.html' -Raw
$matches = [regex]::Matches($html, '<script.*?src=["'']([^"'']+)["'']")

Write-Host "--- Checking Script Files Existence ---"
foreach ($m in $matches) {
    $src = $m.Groups[1].Value
    $cleanSrc = $src.Split('?')[0]
    $fullPath = Join-Path 'c:\Users\nekon\SFCCdeta' $cleanSrc
    if (Test-Path $fullPath) {
        Write-Host "OK: $cleanSrc"
    } else {
        Write-Host "MISSING: $cleanSrc (Full: $fullPath)" -ForegroundColor Red
    }
}
