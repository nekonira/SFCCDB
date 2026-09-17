$content = Get-Content -Path "src/app.jsx" -Raw -Encoding UTF8
$lines = $content -split "`n"
for ($i = 11189; $i -lt 11220 -and $i -lt $lines.Length; $i++) {
    Write-Host "$($i+1): $($lines[$i])"
}
