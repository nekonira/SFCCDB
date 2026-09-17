$content = Get-Content -Path "src/app.jsx" -Raw -Encoding UTF8
$lines = $content -split "`n"
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "bonus" -or $lines[$i] -match "ボーナス" -or $lines[$i] -match "checkBonus" -or $lines[$i] -match "normalizeStyle") {
        Write-Host "$($i+1): $($lines[$i])"
    }
}
