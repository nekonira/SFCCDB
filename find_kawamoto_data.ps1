[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$brainDir = "C:\Users\nekon\.gemini\antigravity-ide\brain"
$logFiles = Get-ChildItem -Path $brainDir -Recurse -Filter "transcript_full.jsonl"

foreach ($file in $logFiles) {
    $rawText = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $rawText = $rawText -replace '\\n', "`n" -replace '\\"', '"' -replace '\\\\', '\'

    $pattern = "(?s)\{\s*id:\s*['""]p111['""].*?\}"
    $matches = [regex]::Matches($rawText, $pattern)

    foreach ($m in $matches) {
        Write-Host "--- FOUND p111 in $($file.Name) ---"
        Write-Host $m.Value
    }
}
