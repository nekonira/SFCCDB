$logPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\d5a8fc00-3f38-416e-a6d5-880cde2dd192\.system_generated\logs\transcript_full.jsonl"
$outPath = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$utf8 = New-Object System.Text.UTF8Encoding($false)

$lines = Get-Content $logPath -Encoding UTF8
$bestBlock = ""

foreach ($line in $lines) {
    if ($line.Contains("window.INITIAL_PLAYERS = [")) {
        # Extract the code substring
        $idx = $line.IndexOf("window.INITIAL_PLAYERS = [")
        $endIdx = $line.LastIndexOf("];")
        if ($endIdx -gt $idx) {
            $candidate = $line.Substring($idx, ($endIdx - $idx + 2))
            # Clean JSON escaped characters like \n, \", etc.
            $candidate = $candidate -replace '\\n', "`n"
            $candidate = $candidate -replace '\\"', '"'
            $candidate = $candidate -replace '\\\\', '\'
            
            if ($candidate.Length -gt $bestBlock.Length) {
                $bestBlock = $candidate
            }
        }
    }
}

if ($bestBlock.Length -gt 1000) {
    Write-Host "Found full database block! Length: $($bestBlock.Length)"
    
    # Add SAKATSUKU_DATA fallback definition at bottom
    $fullJs = $bestBlock + "`n`nwindow.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };"
    
    [System.IO.File]::WriteAllText($outPath, $fullJs, $utf8)
    Write-Host "Successfully restored all players to mockData.js!"
} else {
    Write-Host "Could not find sufficient block, searching transcript.jsonl..."
}
