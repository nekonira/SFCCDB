[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$brainDir = "C:\Users\nekon\.gemini\antigravity-ide\brain"
$logFiles = Get-ChildItem -Path $brainDir -Recurse -Filter "transcript_full.jsonl"

Write-Host "--- Searching for Historical p124-p126 Definitions ---"

foreach ($file in $logFiles) {
    $rawText = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $rawText = $rawText -replace '\\n', "`n" -replace '\\"', '"' -replace '\\\\', '\'

    $pattern = "(?s)\{\s*id:\s*['""](p12[456])['""].*?name:\s*['""]([^'""]+)['""]"
    $matches = [regex]::Matches($rawText, $pattern)

    foreach ($m in $matches) {
        $id = $m.Groups[1].Value
        $name = $m.Groups[2].Value
        Write-Host "Found $id -> $name in $($file.Name)"
    }
}
