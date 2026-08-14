[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$brainDir = "C:\Users\nekon\.gemini\antigravity-ide\brain"
$logFiles = Get-ChildItem -Path $brainDir -Recurse -Filter "transcript_full.jsonl"

Write-Host "Scanning transcript log files..."
$playerDict = @{}

foreach ($file in $logFiles) {
    $rawText = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $rawText = $rawText -replace '\\n', "`n"
    $rawText = $rawText -replace '\\"', '"'
    $rawText = $rawText -replace '\\\\', '\'

    $pattern = "(?s)\{\s*id:\s*['""](p\d+)['""].*?avatarUrl:\s*['""]['""]\s*\}"
    $matches = [regex]::Matches($rawText, $pattern)

    foreach ($m in $matches) {
        $val = $m.Value.Trim()
        $idMatch = [regex]::Match($val, "id:\s*['""](p\d+)['""]")
        if ($idMatch.Success) {
            $id = $idMatch.Groups[1].Value
            $nameMatch = [regex]::Match($val, "name:\s*['""]([^'""]+)['""]")
            $name = if ($nameMatch.Success) { $nameMatch.Groups[1].Value } else { "" }

            # Exclude corrupt or duplicate K1 names from wrong IDs
            $idNum = [int]($id -replace 'p', '')
            if ($idNum -ge 127 -and $idNum -le 137 -and $name -like "*K1 BEST11*") {
                # Skip K1 names assigned to GK slots p127-p137
                continue
            }

            if (-not $playerDict.ContainsKey($id) -or $val.Length -gt $playerDict[$id].Length) {
                $playerDict[$id] = $val
            }
        }
    }
}

# Override p127-p137 with exact objects from restore_all_players.py
$pyText = [System.IO.File]::ReadAllText("c:\Users\nekon\SFCCdeta\restore_all_players.py", [System.Text.Encoding]::UTF8)
$pyBlocks = $pyText -split "id:\s*'p"
for ($i=1; $i -lt $pyBlocks.Count; $i++) {
    $b = $pyBlocks[$i]
    $idNum = [int](($b -split "'")[0])
    $fullId = "p" + ("{0:D2}" -f $idNum)
    if ($idNum -ge 127 -and $idNum -le 137) {
        $cleanBlock = "  {\`n    id: '" + $b.Trim()
        $cleanBlock = [regex]::Replace($cleanBlock, "[\s,\r\n;]+$", "")
        $playerDict[$fullId] = $cleanBlock
    }
}

# Override p138-p148 with exact objects from fix_syntax_utf8.ps1
$fixText = [System.IO.File]::ReadAllText("c:\Users\nekon\SFCCdeta\fix_syntax_utf8.ps1", [System.Text.Encoding]::UTF8)
$fixBlocks = $fixText -split "id:\s*'p"
for ($i=1; $i -lt $fixBlocks.Count; $i++) {
    $b = $fixBlocks[$i]
    $idNum = [int](($b -split "'")[0])
    $fullId = "p" + ("{0:D2}" -f $idNum)
    if ($idNum -ge 138 -and $idNum -le 148) {
        $cleanBlock = "  {\`n    id: '" + $b.Trim()
        $cleanBlock = [regex]::Replace($cleanBlock, "[\s,\r\n;]+$", "")
        $playerDict[$fullId] = $cleanBlock
    }
}

$sortedIds = $playerDict.Keys | Sort-Object { [int]($_ -replace 'p', '') }
Write-Host "Total UNIQUE player IDs collected: $($sortedIds.Count)"

$finalBlocks = @()
foreach ($id in $sortedIds) {
    $block = $playerDict[$id]
    $mName = [regex]::Match($block, "name:\s*['""]([^'""]+)['""]")
    $name = if ($mName.Success) { $mName.Groups[1].Value } else { "Unknown" }
    Write-Host "[$id] -> $name"
    $finalBlocks += $block
}

$mockDataJs = "// mockData.js - Clean 148 Player Database\`nwindow.INITIAL_PLAYERS = [\`n" + ($finalBlocks -join ",\n") + "\`n];\`n\`nwindow.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };\`n"

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("c:\Users\nekon\SFCCdeta\src\data\mockData.js", $mockDataJs, $utf8NoBom)
Write-Host "`nPERFECT mockData.js successfully generated!"
