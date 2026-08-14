$logPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\d5a8fc00-3f38-416e-a6d5-880cde2dd192\.system_generated\logs\transcript_full.jsonl"
$outPath = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$utf8 = New-Object System.Text.UTF8Encoding($false)

$lines = Get-Content $logPath -Encoding UTF8
$bestLine = ""

foreach ($l in $lines) {
    if ($l.Contains("INITIAL_PLAYERS") -and $l.Contains("p123")) {
        if ($l.Length -gt $bestLine.Length) {
            $bestLine = $l
        }
    }
}

if ($bestLine.Length -gt 1000) {
    Write-Host "Found best raw line! Length: $($bestLine.Length)"
    
    # Extract CodeContent or ReplacementContent or literal array
    $start = $bestLine.IndexOf("INITIAL_PLAYERS")
    if ($start -gt 0) {
        $sub = $bestLine.Substring($start)
        $end = $sub.LastIndexOf("];")
        if ($end -gt 0) {
            $code = "window." + $sub.Substring(0, $end + 2)
            $code = $code -replace '\\n', "`n"
            $code = $code -replace '\\"', '"'
            $code = $code -replace '\\\\', '\'
            
            $fullJs = $code + "`n`nwindow.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };"
            
            [System.IO.File]::WriteAllText($outPath, $fullJs, $utf8)
            Write-Host "MEGA database restored successfully!"
        }
    }
}
