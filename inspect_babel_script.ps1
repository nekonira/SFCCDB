$indexPath = "c:\Users\nekon\SFCCdeta\index.html"
$text = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)

$m = [regex]::Match($text, '(?ms)<script type="text/babel">(.*?)</script>')
if ($m.Success) {
    $babelCode = $m.Groups[1].Value
    $lines = $babelCode.Split("`n")
    Write-Host "Total lines in Babel script: $($lines.Count)"
    Write-Host "First 20 lines of Babel script:"
    for ($i = 0; $i -lt [Math]::Min(20, $lines.Count); $i++) {
        Write-Host "$($i+1): $($lines[$i])"
    }
    Write-Host "----------------------------"
    Write-Host "Last 20 lines of Babel script:"
    for ($i = [Math]::Max(0, $lines.Count - 20); $i -lt $lines.Count; $i++) {
        Write-Host "$($i+1): $($lines[$i])"
    }
}
