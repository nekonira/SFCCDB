[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$pyPath = "c:\Users\nekon\SFCCdeta\restore_all_players.py"
$text = [System.IO.File]::ReadAllText($pyPath, [System.Text.Encoding]::UTF8)

$pattern = "(?s)id:\s*'([^']+)',\s*name:\s*'([^']+)'"
$matches = [regex]::Matches($text, $pattern)
Write-Host "Total matched in restore_all_players.py: $($matches.Count)"

$names = @()
foreach ($m in $matches) {
    $id = $m.Groups[1].Value
    $name = $m.Groups[2].Value
    $names += $name
    if ($name -like "*東口*" -or $name -like "*K1 BEST11*") {
        Write-Host "ID: $id | Name: $name" -ForegroundColor Green
    }
}

$grouped = $names | Group-Object | Where-Object { $_.Count -gt 1 }
Write-Host "`nDuplicates in restore_all_players.py: $($grouped.Count)"
foreach ($g in $grouped) {
    Write-Host "$($g.Count)x : $($g.Name)"
}
