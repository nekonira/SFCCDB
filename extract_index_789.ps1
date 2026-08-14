$logPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\d5a8fc00-3f38-416e-a6d5-880cde2dd192\.system_generated\logs\transcript_full.jsonl"
$outPath = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$utf8 = New-Object System.Text.UTF8Encoding($false)

$lines = Get-Content $logPath -Encoding UTF8
$targetLine = $lines[789]

# Parse JSON safely
$jsonObj = $targetLine | ConvertFrom-Json
$contentStr = $jsonObj.content

# If not in content, check tool_calls
if (-not $contentStr) {
    if ($jsonObj.tool_calls) {
        foreach ($tc in $jsonObj.tool_calls) {
            if ($tc.args -and $tc.args.CodeContent) {
                $contentStr = $tc.args.CodeContent
            }
        }
    }
}

if ($contentStr) {
    # Check if SAKATSUKU_DATA is included
    if (-not $contentStr.Contains("window.SAKATSUKU_DATA")) {
        $contentStr = $contentStr + "`n`nwindow.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };"
    }
    [System.IO.File]::WriteAllText($outPath, $contentStr, $utf8)
    Write-Host "Index 789 mockData.js restored perfectly!"
} else {
    Write-Host "Failed to parse json contentStr"
}
