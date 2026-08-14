$indexPath = "c:\Users\nekon\SFCCdeta\index.html"
$utf8 = New-Object System.Text.UTF8Encoding($false)
$text = [System.IO.File]::ReadAllText($indexPath, $utf8)

$lines = $text.Split("`n")
$lineNum = 0
foreach ($line in $lines) {
    $lineNum++
    if ($line.Contains("<script") -or $line.Contains("</script>")) {
        Write-Host "Line ${lineNum}: $($line.Trim())"
    }
}
