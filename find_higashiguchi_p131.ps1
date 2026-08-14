[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$brainDir = "C:\Users\nekon\.gemini\antigravity-ide\brain"
$files = Get-ChildItem -Path $brainDir -Recurse -File

foreach ($f in $files) {
    if ($f.Length -gt 1000 -and ($f.Extension -eq ".jsonl" -or $f.Extension -eq ".js" -or $f.Extension -eq ".ps1" -or $f.Extension -eq ".py" -or $f.Extension -eq ".md")) {
        $text = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
        if ($text -match "p131" -and $text -match "東口順昭") {
            Write-Host "FOUND HIGASHIGUCHI IN: $($f.FullName) (Length: $($f.Length))"
        }
    }
}
