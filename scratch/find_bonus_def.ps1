$content = Get-Content -Path "src/app.jsx" -Raw -Encoding UTF8
$lines = $content -split "`n"
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "calculateCardBonusMult" -or $lines[$i] -match "checkBonusMatch" -or $lines[$i] -match "playstyleBonus") {
        Write-Host "$($i+1): $($lines[$i])"
    }
}
