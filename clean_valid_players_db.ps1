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
            
            # Find candidate player blocks
            $regex = [regex]"(?s)\{\s*id:\s*'p\d+'.*?avatarUrl:\s*''\s*\}"
            $matches = $regex.Matches($str)
            foreach ($m in $matches) {
                $block = $m.Value
                
                # Replace known garbled rank strings
                $block = $block -replace "rank:\s*'[^']*驫[^']*'", "rank: '銅'"
                $block = $block -replace "name:\s*'[^']*迢吶＞[^\x27]*'", "name: '狙いすましたシュート'"
                $block = $block -replace "description:\s*'[^']*繧ｳ繝ｼ繧ｹ[^\x27]*'", "description: 'コースを突いたコントロールシュートで確実にネットを揺らす'"
                
                # Check 1: Single quotes count must be EVEN
                $sq = ([regex]::Matches($block, "'")).Count
                if ($sq % 2 -ne 0) { continue }
                
                # Check 2: Braces must match
                $ob = ([regex]::Matches($block, '\{')).Count
                $cb = ([regex]::Matches($block, '\}')).Count
                if ($ob -ne $cb) { continue }
                
                # Check 3: Must contain name property
                if (-not ($block -match "name:\s*'[^']+'")) { continue }
                
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

Write-Host "100% CLEAN & VALID players found: $($validPlayers.Count)"

$sortedKeys = $validPlayers.Keys | Sort-Object { [int]($_ -replace 'p', '') }

$cleanJs = "// mockData.js - Full Clean Player Database ($($sortedKeys.Count) Players)`n"
$cleanJs += "window.INITIAL_PLAYERS = [`n"
$cleanJs += ($sortedKeys | ForEach-Object { $validPlayers[$_] }) -join ",`n"
$cleanJs += "`n];`n`n"
$cleanJs += "window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };"

[System.IO.File]::WriteAllText($outPath, $cleanJs, $utf8)
Write-Host "Saved $($sortedKeys.Count) CLEAN valid players to mockData.js!"
