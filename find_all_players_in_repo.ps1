$repoPath = "c:\Users\nekon\SFCCdeta"
$brainPath = "C:\Users\nekon\.gemini\antigravity-ide\brain"

Write-Host "--- Searching for Complete 148 Player Database ---"

$files = Get-ChildItem -Path $repoPath, $brainPath -Recurse -Include *.js, *.py, *.ps1, *.jsonl, *.html -ErrorAction SilentlyContinue

$bestFile = ""
$maxPlayers = 0

foreach ($f in $files) {
    if ($f.Length -lt 1000) { continue }
    try {
        $text = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
        $matches = [regex]::Matches($text, "id:\s*['""](p\d+)['""]")
        $uniqueIds = $matches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
        $count = $uniqueIds.Count
        if ($count -gt $maxPlayers) {
            $maxPlayers = $count
            $bestFile = $f.FullName
            Write-Host "Found file with $count unique players: $($f.FullName)" -ForegroundColor Green
        }
    } catch {}
}

Write-Host "`nBEST MATCH: $bestFile with $maxPlayers unique players!"
