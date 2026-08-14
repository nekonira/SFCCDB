$path = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$utf8 = [System.Text.Encoding]::UTF8
$lines = [System.IO.File]::ReadAllLines($path, $utf8)

$targetStr = [System.Text.Encoding]::UTF8.GetString([byte[]](0xE7, 0xB2, 0xBE, 0xE7, 0xB7, 0xBB, 0xE3, 0x81, 0xAA, 0xE3, 0x83, 0x91, 0xE3, 0x82, 0xB5, 0xE3, 0x83, 0xBC))

Write-Host "Searching for: $targetStr"

for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i].Contains($targetStr)) {
        $name = "Unknown"
        for ($k = $i; $k -ge 0 -and $k -ge ($i - 50); $k--) {
            if ($lines[$k] -match "id:\s*'p\d+'") {
                for ($m = $k; $m -lt ($k + 10); $m++) {
                    if ($lines[$m] -match "name:\s*'([^']+)'") {
                        $name = $Matches[1]
                        break
                    }
                }
                break
            }
        }
        Write-Host "Player: $name (line $($i+1))"
    }
}
