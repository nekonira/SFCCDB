$indexPath = "c:\Users\nekon\SFCCdeta\index.html"
$utf8 = New-Object System.Text.UTF8Encoding($false)

$html = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)

# Replace garbled window.SAKATSUKU_DATA string
$pattern = 'window\.SAKATSUKU_DATA\s*=\s*\{\s*INITIAL_PLAYERS:.*?\};'
$cleanSAKATSUKU = "window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };"

# Also restore mockData.js content into index.html cleanly
$mockPath = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$mockCode = [System.IO.File]::ReadAllText($mockPath, [System.Text.Encoding]::UTF8)

# Find between <!-- Inline Full Mock Database --> and </script>
$regex = [regex]"(?s)<!-- Inline Full Mock Database -->.*?<\/script>"
$replacement = @"
<!-- Inline Full Mock Database -->
  <script>
$mockCode
  </script>
"@

$html = $regex.Replace($html, $replacement, 1)

[System.IO.File]::WriteAllText($indexPath, $html, $utf8)
Write-Host "Index.html cleaned and repaired!"
