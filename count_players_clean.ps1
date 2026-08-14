[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$text = [System.IO.File]::ReadAllText("c:\Users\nekon\SFCCdeta\src\data\mockData.js", [System.Text.Encoding]::UTF8)

$blocks = $text -split "id:\s*'"
Write-Host "Total Player Count in mockData.js: $($blocks.Count - 1)"

$list = @()
for ($i=1; $i -lt $blocks.Count; $i++) {
    $id = ($blocks[$i] -split "'")[0]
    $m = [regex]::Match($blocks[$i], "name:\s*'([^']+)'")
    if ($m.Success) {
        $list += [PSCustomObject]@{ Id = $id; Name = $m.Groups[1].Value }
    }
}

Write-Host "Extracted $($list.Count) player objects:"
$targetPlayers = $list | Where-Object { $_.Name -like "*東口*" -or $_.Name -like "*K1 BEST11*" -or $_.Name -like "*前川*" -or $_.Name -like "*小島*" }
foreach ($item in $targetPlayers) {
    Write-Host "ID: $($item.Id) | Name: $($item.Name)"
}

$dups = $list | Group-Object Name | Where-Object { $_.Count -gt 1 }
Write-Host "`nDuplicate Player Names: $($dups.Count)"
foreach ($d in $dups) {
    Write-Host "$($d.Count)x : $($d.Name)"
}
