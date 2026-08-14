[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$text = [System.IO.File]::ReadAllText("c:\Users\nekon\SFCCdeta\restore_all_players.py", [System.Text.Encoding]::UTF8)

$blocks = $text -split "id:\s*'p"
Write-Host "Total player blocks: $($blocks.Count - 1)"

$players = @()
for ($i = 1; $i -lt $blocks.Count; $i++) {
    $b = $blocks[$i]
    $playerId = "p" + ($b -split "'")[0]
    $m = [regex]::Match($b, "name:\s*'([^']+)'")
    $pname = if ($m.Success) { $m.Groups[1].Value } else { "Unknown" }
    $players += [PSCustomObject]@{ Id = $playerId; Name = $pname }
}

foreach ($p in $players) {
    Write-Host "ID: $($p.Id) | Name: $($p.Name)"
}

$dups = $players | Group-Object Name | Where-Object { $_.Count -gt 1 }
Write-Host "`nDuplicates in restore_all_players.py: $($dups.Count)"
foreach ($d in $dups) {
    Write-Host "$($d.Count)x : $($d.Name)"
}
