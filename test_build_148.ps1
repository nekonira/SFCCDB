[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# We extract all 148 player objects cleanly.
# 1. p01 to p126 from clean sources
# 2. p127 to p137 (GK 2026 players including Higashiguchi p131) from restore_all_players.py
# 3. p138 to p148 (K1 BEST11 2025 players) from fix_syntax_utf8.ps1 or restore_all_players.py

$pyText = [System.IO.File]::ReadAllText("c:\Users\nekon\SFCCdeta\restore_all_players.py", [System.Text.Encoding]::UTF8)

# Parse player objects from pyText
$blocks = $pyText -split "id:\s*'p"
Write-Host "Found $($blocks.Count - 1) blocks in restore_all_players.py"

$playersById = @{}

for ($i=1; $i -lt $blocks.Count; $i++) {
    $b = $blocks[$i]
    $idNum = ($b -split "'")[0]
    $fullId = "p" + $idNum
    
    # Extract object content
    $objContent = "  {\`n    id: '" + $b.Trim()
    if (-not $objContent.EndsWith("}")) {
        # trim trailing comma or bracket
        $objContent = [regex]::Replace($objContent, "[\s,\r\n;]+$", "")
    }
    
    $mName = [regex]::Match($b, "name:\s*'([^']+)'")
    $name = if ($mName.Success) { $mName.Groups[1].Value } else { "" }
    
    $playersById[$fullId] = @{
        Id = $fullId
        Name = $name
        Content = $objContent
    }
}

Write-Host "Keys in restore_all_players.py: $($playersById.Keys -join ', ')"
