$logPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\d5a8fc00-3f38-416e-a6d5-880cde2dd192\.system_generated\logs\transcript_full.jsonl"
$outPath = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$utf8 = New-Object System.Text.UTF8Encoding($false)

$rawLogs = [System.IO.File]::ReadAllText($logPath, [System.Text.Encoding]::UTF8)

$maxLen = 0
$bestJs = ""

# Search all occurrences of INITIAL_PLAYERS = [ ... ];
$pattern = '(?s)window\.INITIAL_PLAYERS\s*=\s*\[.*?\n\];'
$matches = [regex]::Matches($rawLogs, $pattern)

foreach ($m in $matches) {
    $val = $m.Value
    # Clean JSON esc
    $val = $val -replace '\\n', "`n"
    $val = $val -replace '\\"', '"'
    $val = $val -replace '\\\\', '\'
    if ($val.Length -gt $maxLen) {
        $maxLen = $val.Length
        $bestJs = $val
    }
}

if ($bestJs.Length -gt 10000) {
    Write-Host "Found mega database block! Length: $($bestJs.Length)"
    $fullJs = $bestJs + "`n`nwindow.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };"
    [System.IO.File]::WriteAllText($outPath, $fullJs, $utf8)
    Write-Host "Full database restored successfully!"
} else {
    Write-Host "Regex match length: $($bestJs.Length)"
}
