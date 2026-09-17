$content = Get-Content -Path "src/app.jsx" -Raw -Encoding UTF8
$lines = $content -split "`n"
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "toggleCardBonus") {
        Write-Host "$($i+1): $($lines[$i])"
    }
}
