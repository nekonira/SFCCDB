$content = Get-Content -Path "src/app.jsx" -Raw -Encoding UTF8
$lines = $content -split "`n"
for ($i = 1619; $i -lt 1750 -and $i -lt $lines.Length; $i++) {
    Write-Host "$($i+1): $($lines[$i])"
}
