$appPath = "c:\Users\nekon\SFCCdeta\src\app.jsx"
$text = [System.IO.File]::ReadAllText($appPath, [System.Text.Encoding]::UTF8)

$matches1 = [regex]::Matches($text, "RARITY_OFFSETS")
Write-Host "RARITY_OFFSETS occurrences: $($matches1.Count)"

$matches2 = [regex]::Matches($text, "OFFSETS")
Write-Host "OFFSETS occurrences: $($matches2.Count)"
