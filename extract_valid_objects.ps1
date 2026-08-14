$brainDir = "C:\Users\nekon\.gemini\antigravity-ide\brain"
$outPath = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$utf8 = New-Object System.Text.UTF8Encoding($false)

$logFiles = Get-ChildItem -Path $brainDir -Recurse -Filter "transcript_full.jsonl"
$validPlayers = @{}

foreach ($file in $logFiles) {
    Write-Host "Scanning $($file.FullName)..."
    $lines = Get-Content $file.FullName -Encoding UTF8
    foreach ($l in $lines) {
        if ($l.Contains("INITIAL_PLAYERS") -or $l.Contains("id: 'p")) {
            $str = $l -replace '\\n', "`n" -replace '\\"', '"' -replace '\\\\', '\'
            
            $regex = [regex]"(?s)\{\s*id:\s*'p\d+'.*?avatarUrl:\s*''\s*\}"
            $matches = $regex.Matches($str)
            foreach ($m in $matches) {
                $block = $m.Value
                $pidMatch = [regex]::Match($block, "id:\s*'p(\d+)'")
                if ($pidMatch.Success) {
                    $playerNumStr = "p" + $pidMatch.Groups[1].Value
                    if (-not $validPlayers.ContainsKey($playerNumStr) -or $block.Length -gt $validPlayers[$playerNumStr].Length) {
                        $validPlayers[$playerNumStr] = $block
                    }
                }
            }
        }
    }
}

Write-Host "VALID players found: $($validPlayers.Count)"

$sortedKeys = $validPlayers.Keys | Sort-Object { [int]($_ -replace 'p', '') }

$cleanJs = "window.INITIAL_PLAYERS = [`n"
$cleanJs += ($sortedKeys | ForEach-Object { $validPlayers[$_] }) -join ",\n"
$cleanJs += "`n];`n`n"
$cleanJs += "window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };"

[System.IO.File]::WriteAllText($outPath, $cleanJs, $utf8)
Write-Host "Saved $($sortedKeys.Count) valid players to mockData.js!"
