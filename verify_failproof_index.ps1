$indexPath = "c:\Users\nekon\SFCCdeta\index.html"
$utf8 = New-Object System.Text.UTF8Encoding($false)
$text = [System.IO.File]::ReadAllText($indexPath, $utf8)

Write-Host "Index.html size: $($text.Length) bytes"

# Check script blocks
$matches = [regex]::Matches($text, "(?ms)<script(.*?)>(.*?)</script>")
Write-Host "Total script blocks: $($matches.Count)"

$idx = 0
foreach ($m in $matches) {
    $attr = $m.Groups[1].Value.Trim()
    $code = $m.Groups[2].Value
    $idx++
    Write-Host "Block ${idx} - Attr: '$attr' - Code Length: $($code.Length)"
}

# Check Babel script block
$bMatch = [regex]::Match($text, '(?ms)<script type="text/babel">(.*?)</script>')
if ($bMatch.Success) {
    $bCode = $bMatch.Groups[1].Value
    Write-Host "`n--- Babel Script Block Inspection ---"
    Write-Host "Babel Code Length: $($bCode.Length)"
    
    $ob = ([regex]::Matches($bCode, '\{')).Count
    $cb = ([regex]::Matches($bCode, '\}')).Count
    $op = ([regex]::Matches($bCode, '\(')).Count
    $cp = ([regex]::Matches($bCode, '\)')).Count
    
    Write-Host "Braces: { $ob vs } $cb"
    Write-Host "Parens: ( $op vs ) $cp"
    
    if ($ob -eq $cb -and $op -eq $cp) {
        Write-Host "SUCCESS: Babel script block brackets and parens match 100%!" -ForegroundColor Green
    } else {
        Write-Host "WARNING: Mismatched brackets in Babel script block!" -ForegroundColor Red
    }

    if ($bCode.Contains("ReactDOM.createRoot")) {
        Write-Host "SUCCESS: ReactDOM.createRoot is INLINE inside the Babel script block!" -ForegroundColor Green
    } else {
        Write-Host "WARNING: Missing ReactDOM.createRoot in Babel script block!" -ForegroundColor Red
    }
}
