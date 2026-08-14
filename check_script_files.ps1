$html = Get-Content "c:\Users\nekon\SFCCdeta\index.html" -Raw
$pattern = '<script[^>]+src=["'']([^"'']+)["'']'
$matches = [regex]::Matches($html, $pattern)

Write-Host "Found matches: $($matches.Count)"

foreach ($m in $matches) {
    $src = $m.Groups[1].Value
    if ($src.StartsWith("http")) { continue }
    $cleanSrc = $src.Split('?')[0]
    $rel = $cleanSrc -replace '^\./', ''
    $fullPath = Join-Path "c:\Users\nekon\SFCCdeta" $rel
    if (-not (Test-Path $fullPath)) {
        Write-Host "MISSING: $cleanSrc (Path: $fullPath)"
    }
}
Write-Host "Check completed!"
