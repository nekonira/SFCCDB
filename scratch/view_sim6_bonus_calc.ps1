$content = Get-Content -Path "src/app.jsx" -Raw -Encoding UTF8
$lines = $content -split "`n"
for ($i = 10829; $i -lt 10920 -and $i -lt $lines.Length; $i++) {
    Write-Host "$($i+1): $($lines[$i])"
}
