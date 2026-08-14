$path = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# Split by player object
$blocks = $text.Split("`n  {")

for ($i = 0; $i -lt $blocks.Length; $i++) {
    $b = $blocks[$i]
    $sq = ([regex]::Matches($b, "'")).Count
    if ($sq % 2 -ne 0) {
        Write-Host "Odd single quote found in block $i :"
        $pidMatch = [regex]::Match($b, "id:\s*'([^']+)'")
        if ($pidMatch.Success) {
            Write-Host "Player ID: $($pidMatch.Groups[1].Value)"
        }
        Write-Host "Block snippet: $($b.Substring(0, [Math]::Min(200, $b.Length)))"
    }
}
