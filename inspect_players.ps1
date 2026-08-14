$mockDataPath = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$text = [System.IO.File]::ReadAllText($mockDataPath, [System.Text.Encoding]::UTF8)

# Find all player blocks using regex or name/id matching
$idMatches = [regex]::Matches($text, "id:\s*['`"]([^'`"]+)['`"]")
$nameMatches = [regex]::Matches($text, "name:\s*['`"]([^'`"]+)['`"]")

Write-Host "Total IDs found: $($idMatches.Count)"
Write-Host "Total Names found: $($nameMatches.Count)"

$higashiguchi = $nameMatches | Where-Object { $_.Groups[1].Value -like "*東口*" }
if ($higashiguchi) {
    Write-Host "FOUND Higashiguchi: $($higashiguchi.Groups[1].Value)" -ForegroundColor Green
} else {
    Write-Host "Higashiguchi (東口) is NOT found in mockData.js!" -ForegroundColor Red
}

$k1Matches = $nameMatches | Where-Object { $_.Groups[1].Value -like "*K1 BEST11*" }
Write-Host "`nTotal K1 BEST11 players: $($k1Matches.Count)" -ForegroundColor Yellow

$groupedNames = $nameMatches | Group-Object { $_.Groups[1].Value } | Where-Object { $_.Count -gt 1 }
Write-Host "`nDuplicate Player Names ($($groupedNames.Count) unique duplicated names):" -ForegroundColor Red
foreach ($g in $groupedNames) {
    Write-Host "$($g.Count)x - $($g.Name)"
}

$groupedIds = $idMatches | Group-Object { $_.Groups[1].Value } | Where-Object { $_.Count -gt 1 }
Write-Host "`nDuplicate Player IDs ($($groupedIds.Count) unique duplicated IDs):" -ForegroundColor Red
foreach ($g in $groupedIds) {
    Write-Host "$($g.Count)x - $($g.Name)"
}
