$path = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$bytes = [System.IO.File]::ReadAllBytes($path)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)

# セ (E3 82 BB) ン (E3 83 B3) ト (E3 83 88) ラ (E3 83 A9) ル (E3 83 AB)
$bytesAM = [byte[]](0xE3, 0x82, 0xBB, 0xE3, 0x83, 0xB3, 0xE3, 0x83, 0x88, 0xE3, 0x83, 0xA9, 0xE3, 0x83, 0xAB, 0x41, 0x4D)
$bytesDM = [byte[]](0xE3, 0x82, 0xBB, 0xE3, 0x83, 0xB3, 0xE3, 0x83, 0x88, 0xE3, 0x83, 0xA9, 0xE3, 0x83, 0xAB, 0x44, 0x4D)

$strAM = [System.Text.Encoding]::UTF8.GetString($bytesAM)
$strDM = [System.Text.Encoding]::UTF8.GetString($bytesDM)

Write-Host "Searching for strAM: '$strAM' and strDM: '$strDM'"

$lines = $text -split "\r?\n"
$updatedCount = 0

for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    if ($line.Contains($strAM) -or $line.Contains($strDM)) {
        # Find player name above
        $name = "Unknown"
        for ($k = $i; $k -ge 0 -and $k -ge ($i - 15); $k--) {
            if ($lines[$k] -match "name:\s*'([^']+)'") {
                $name = $Matches[1]
                break
            }
        }
        Write-Host "Target player found: $name (line $i)"
        $updatedCount++
        
        # Replace playTendencies
        for ($j = $i; $j -lt ($i + 45) -and $j -lt $lines.Length; $j++) {
            if ($lines[$j] -match "playTendencies:") {
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

Write-Host "Total updated: $updatedCount"
$newText = $lines -join "`r`n"
$newBytes = [System.Text.Encoding]::UTF8.GetBytes($newText)
[System.IO.File]::WriteAllBytes($path, $newBytes)
