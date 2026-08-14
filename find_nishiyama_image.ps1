[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$brainDir = "C:\Users\nekon\.gemini\antigravity-ide\brain"
$imgs = Get-ChildItem -Path $brainDir -Recurse -Include "*.png","*.jpg" | Sort-Object LastWriteTime -Descending | Select-Object -First 5

foreach ($i in $imgs) {
    Write-Host "$($i.LastWriteTime) -> $($i.FullName)"
}
