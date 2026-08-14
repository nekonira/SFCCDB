[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$brainDir = "C:\Users\nekon\.gemini\antigravity-ide\brain"
$logFiles = Get-ChildItem -Path $brainDir -Recurse -Filter "transcript_full.jsonl"

foreach ($file in $logFiles) {
    Write-Host "--- Checking $($file.FullName) ---"
    $lines = Get-Content $file.FullName -Encoding UTF8
    foreach ($l in $lines) {
        if ($l -match "window\.INITIAL_PLAYERS = \[" -and $l.Length -gt 15000) {
            # Count player objects
            $raw = $l -replace '\\n', "`n" -replace '\\"', '"' -replace '\\\\', '\'
            $matches = [regex]::Matches($raw, "id:\s*['""](p\d+)['""]")
            
            $uniqueIds = $matches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
            Write-Host "Found array with Total Matches: $($matches.Count) | Unique IDs: $($uniqueIds.Count) | Line Length: $($l.Length)"
            
            # Check if Higashiguchi is in this array
            if ($raw -match "東口順昭") {
                Write-Host "  -> Contains 東口順昭!" -ForegroundColor Green
            } else {
                Write-Host "  -> NO 東口順昭" -ForegroundColor Red
            }
        }
    }
}
