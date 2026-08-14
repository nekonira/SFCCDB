[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$mockDataPath = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$text = [System.IO.File]::ReadAllText($mockDataPath, [System.Text.Encoding]::UTF8)

# Parse player entries using regex
$pattern = "(?s)\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)'"
$matches = [regex]::Matches($text, $pattern)

Write-Host "Total matched player objects: $($matches.Count)"

$idx = 0
foreach ($m in $matches) {
    $idx++
    $id = $m.Groups[1].Value
    $name = $m.Groups[2].Value

    if ($name -like "*東口*" -or $name -like "*K1 BEST11*" -or ($idx -ge 120 -and $idx -le 145)) {
        Write-Host "[$idx] ID: $id | Name: $name"
    }
}

Write-Host "`n--- DUPLICATED PLAYER NAMES ---"
$groups = $matches | Group-Object { $_.Groups[2].Value } | Where-Object { $_.Count -gt 1 }
foreach ($g in $groups) {
    Write-Host "$($g.Count)x : $($g.Name)"
}
