$path = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$utf8 = [System.Text.Encoding]::UTF8
$lines = [System.IO.File]::ReadAllLines($path, $utf8)

$updatedCount = 0
$updatedList = New-Object System.Collections.Generic.List[string]

for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    if ($line -match "playStyle:\s*'([^']+)'") {
        $style = $Matches[1]
        if ($style.Contains("セントラルAM") -or $style.Contains("セントラルDM")) {
            # Find player name
            $name = "Unknown"
            for ($k = $i; $k -ge 0 -and $k -ge ($i - 15); $k--) {
                if ($lines[$k] -match "name:\s*'([^']+)'") {
                    $name = $Matches[1]
                    break
                }
            }
            $updatedList.Add("$name ($style)")
            $updatedCount++
            
            # Update playTendencies
            for ($j = $i; $j -lt ($i + 45) -and $j -lt $lines.Length; $j++) {
                if ($lines[$j] -match "playTendencies:\s*\{") {
                    $lines[$j]   = "      playTendencies: {"
                    $lines[$j+1] = "        attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,"
                    $lines[$j+2] = "        shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,"
                    $lines[$j+3] = "        delay: 0, rushOut: -1, feint: 0, press: 0"
                    $lines[$j+4] = "      },"
                    break
                }
            }
        }
    }
}

[System.IO.File]::WriteAllLines($path, $lines, $utf8)

Write-Host "Successfully updated $updatedCount players:"
foreach ($item in $updatedList) {
    Write-Host " - $item"
}
