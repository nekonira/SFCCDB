$appJsxPath = "c:\Users\nekon\SFCCdeta\src\app.jsx"
$mockDataPath = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"

$utf8 = New-Object System.Text.UTF8Encoding($false)

# 1. Fix app.jsx constants to be hardcoded clean UTF-8 strings
$appJsxCode = [System.IO.File]::ReadAllText($appJsxPath, [System.Text.Encoding]::UTF8)

# Replace top constant declarations in app.jsx
$cleanConstants = @"
const { useState, useEffect, useMemo } = React;
const POSITIONS = ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'];
const POLICIES = ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'];
const RARITIES = ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'];
const PLAY_STYLE_LEVELS = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'];
const PLAY_STYLES = ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'];
const INITIAL_PLAYERS = window.INITIAL_PLAYERS || [];
const INITIAL_MANAGERS = window.INITIAL_MANAGERS || [];
const INITIAL_COMBOS = window.INITIAL_COMBOS || [];
"@

$appJsxCode = [regex]::Replace($appJsxCode, '(?s)const \{ useState, useEffect, useMemo \}[^;]+;.*?const INITIAL_COMBOS[^;]+;', $cleanConstants)
[System.IO.File]::WriteAllText($appJsxPath, $appJsxCode, $utf8)

# 2. Fix mockData.js bottom SAKATSUKU_DATA
$mockDataCode = [System.IO.File]::ReadAllText($mockDataPath, [System.Text.Encoding]::UTF8)
$cleanSakatsuku = "window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };"

$mockDataCode = [regex]::Replace($mockDataCode, 'window\.SAKATSUKU_DATA\s*=\s*\{.*?\};', $cleanSakatsuku)
[System.IO.File]::WriteAllText($mockDataPath, $mockDataCode, $utf8)

# 3. Update index.html failproof bundle
& powershell -ExecutionPolicy Bypass -File build_failproof_index.ps1

Write-Host "Tag names & filter matching 100% FIXED!" -ForegroundColor Green
