$logPath = "C:\Users\nekon\.gemini\antigravity-ide\brain\d5a8fc00-3f38-416e-a6d5-880cde2dd192\.system_generated\logs\transcript_full.jsonl"
$outPath = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$utf8 = New-Object System.Text.UTF8Encoding($false)

$lines = Get-Content $logPath -Encoding UTF8

$bestJs = ""
$maxLen = 0

foreach ($l in $lines) {
    if ($l.Contains('CodeContent') -or $l.Contains('ReplacementContent')) {
        # Check if it contains INITIAL_PLAYERS and p120 or p130
        if ($l.Contains('INITIAL_PLAYERS') -and ($l.Contains('p120') -or $l.Contains('p130'))) {
            # Extract JavaScript array
            $idx = $l.IndexOf('window.INITIAL_PLAYERS = [')
            if ($idx -lt 0) { $idx = $l.IndexOf('INITIAL_PLAYERS = [') }
            if ($idx -gt 0) {
                $sub = $l.Substring($idx)
                $endIdx = $sub.LastIndexOf('];')
                if ($endIdx -gt 0) {
                    $js = "window." + $sub.Substring(0, $endIdx + 2)
                    $js = $js -replace '\\n', "`n"
                    $js = $js -replace '\\"', '"'
                    $js = $js -replace '\\\\', '\'
                    if ($js.Length -gt $maxLen) {
                        $maxLen = $js.Length
                        $bestJs = $js
                    }
                }
            }
        }
    }
}

if ($bestJs.Length -gt 10000) {
    Write-Host "Found valid clean JS code! Length: $($bestJs.Length)"
    
    if (-not $bestJs.Contains("window.SAKATSUKU_DATA")) {
        $bestJs = $bestJs + "`n`nwindow.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };"
    }
    
    [System.IO.File]::WriteAllText($outPath, $bestJs, $utf8)
    Write-Host "REAL clean mockData.js restored successfully!"
} else {
    Write-Host "Best JS length: $($bestJs.Length)"
}
