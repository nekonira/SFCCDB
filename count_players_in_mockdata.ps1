[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$text = [System.IO.File]::ReadAllText("c:\Users\nekon\SFCCdeta\src\data\mockData.js", [System.Text.Encoding]::UTF8)

$matches = [regex]::Matches($text, "id:\s*'p\d+'")
Write-Host "Total players in src/data/mockData.js: $($matches.Count)"

$namesMatches = [regex]::Matches($text, "name:\s*'([^']+)'")
$names = @()
foreach ($m in $namesMatches) {
    if ($m.Groups[1].Value -notmatch "能力" -and $m.Groups[1].Value -notmatch "フィード" -and $m.Groups[1].Value -notmatch "セービング" -and $m.Groups[1].Value -notmatch "シュート" -and $m.Groups[1].Value -notmatch "パス" -and $m.Groups[1].Value -notmatch "ドリブル" -and $m.Groups[1].Value -notmatch "タックル" -and $m.Groups[1].Value -notmatch "マーク" -and $m.Groups[1].Value -notmatch "インターセプト") {
        # Check if parent block has id
    }
}

# Let's inspect duplicate IDs or Names among player objects
$blocks = $text -split "id:\s*'"
Write-Host "Split blocks count: $($blocks.Count - 1)"

$list = @()
for ($i=1; $i -lt $blocks.Count; $i++) {
    $id = ($blocks[$i] -split "'")[0]
    $m = [regex]::Match($blocks[$i], "name:\s*'([^']+)'")
    if ($m.Success) {
        $list += [PSCustomObject]@{ Id = $id; Name = $m.Groups[1].Value }
    }
}

Write-Host "`nExtracted $($list.Count) player objects:"
foreach ($item in $list) {
    if ($item.Name -like "*東口*" -or $item.Name -like "*K1 BEST11*" -or $item.Name -like "*前川*" -or $item.Name -like "*小島*") {
        Write-Host "ID: $($item.Id) | Name: $($item.Name)"
    }
}

$dups = $list | Group-Object Name | Where-Object { $_.Count -gt 1 }
Write-Host "`nDuplicate Player Names: $($dups.Count)"
foreach ($d in $dups) {
    Write-Host "$($d.Count)x : $($d.Name)"
}
