$appPath = "c:\Users\nekon\SFCCdeta\src\app.jsx"
$text = [System.IO.File]::ReadAllText($appPath, [System.Text.Encoding]::UTF8)

$lines = $text.Split("`n")
Write-Host "Lines 1 to 80 of src/app.jsx:"
for ($i = 0; $i -lt [Math]::Min(80, $lines.Count); $i++) {
    Write-Host "$($i+1): $($lines[$i])"
}
