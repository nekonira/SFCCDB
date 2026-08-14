$appPath = "c:\Users\nekon\SFCCdeta\src\app.jsx"
$text = [System.IO.File]::ReadAllText($appPath, [System.Text.Encoding]::UTF8)

$lines = $text.Split("`n")
Write-Host "Total lines in src/app.jsx: $($lines.Count)"
Write-Host "First 30 lines of src/app.jsx:"
for ($i = 0; $i -lt [Math]::Min(30, $lines.Count); $i++) {
    Write-Host "$($i+1): $($lines[$i])"
}
