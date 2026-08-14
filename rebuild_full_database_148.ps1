$logPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\d5a8fc00-3f38-416e-a6d5-880cde2dd192\.system_generated\logs\transcript_full.jsonl"
$outPath = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$utf8 = New-Object System.Text.UTF8Encoding($false)

$rawText = [System.IO.File]::ReadAllText($logPath, [System.Text.Encoding]::UTF8)
$rawText = $rawText -replace '\\n', "`n"
$rawText = $rawText -replace '\\"', '"'
$rawText = $rawText -replace '\\\\', '\'

$playerBlocks = @{}

$pattern = "(?s)\{\s*id:\s*['""](p\d+)['""].*?avatarUrl:\s*['""]['""]\s*\}"
$allMatches = [regex]::Matches($rawText, $pattern)

foreach ($m in $allMatches) {
    $val = $m.Value
    $pidMatch = [regex]::Match($val, "id:\s*['""](p\d+)['""]")
    if ($pidMatch.Success) {
        $id = $pidMatch.Groups[1].Value
        if (-not $playerBlocks.ContainsKey($id) -or $val.Length -gt $playerBlocks[$id].Length) {
            $playerBlocks[$id] = $val
        }
    }
}

Write-Host "Extracted unique player count: $($playerBlocks.Count)"

$sortedKeys = $playerBlocks.Keys | Sort-Object { [int]($_ -replace 'p', '') }

$playerListJs = "window.INITIAL_PLAYERS = [`n" + (($sortedKeys | ForEach-Object { $playerBlocks[$_] }) -join ",\n") + "`n];`n`n"
$playerListJs += "window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };"

[System.IO.File]::WriteAllText($outPath, $playerListJs, $utf8)
Write-Host "Successfully restored ALL $($sortedKeys.Count) players into mockData.js!"
