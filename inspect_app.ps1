$indexPath = "c:\Users\nekon\SFCCdeta\index.html"
$utf8 = New-Object System.Text.UTF8Encoding($false)
$text = [System.IO.File]::ReadAllText($indexPath, $utf8)

Write-Host "--- Comprehensive Inspection of index.html & Script Assets ---"
Write-Host "Index.html Total Size: $($text.Length) bytes`n"

# Match script tags handling single/double quotes & multiline blocks (?is)
$scriptMatches = [regex]::Matches($text, "(?is)<script([^>]*)>(.*?)</script>")
Write-Host "Total script tags detected in index.html: $($scriptMatches.Count)"

$idx = 0
$missingCount = 0

foreach ($m in $scriptMatches) {
    $idx++
    $attr = $m.Groups[1].Value.Trim()
    $code = $m.Groups[2].Value.Trim()
    
    # Matching src attribute in both single and double quotes cleanly
    $srcMatch = [regex]::Match($attr, 'src=[\"''''`]([^\x22\x27]+)[\"''''`]')
    if (-not $srcMatch.Success) {
        $srcMatch = [regex]::Match($attr, 'src=["' + "'" + ']([^"' + "'" + ']+)["' + "'" + ']')
    }

    if ($srcMatch.Success) {
        $src = $srcMatch.Groups[1].Value
        $cleanSrc = ($src -replace '\?.*$', '') -replace '^\./', ''
        $localPath = Join-Path "c:\Users\nekon\SFCCdeta" $cleanSrc
        
        if (Test-Path $localPath) {
            $len = (Get-Item $localPath).Length
            Write-Host "Block ${idx}: Linked File -> $src ($len bytes) [OK]" -ForegroundColor Green
        }
        else {
            Write-Host "Block ${idx}: Linked File -> $src [MISSING!]" -ForegroundColor Red
            $missingCount++
        }
    }
    else {
        $snippet = if ($code.Length -gt 60) { $code.Substring(0, 60) + "..." } else { $code }
        Write-Host "Block ${idx}: Inline Script -> Length: $($code.Length) chars ('$snippet')" -ForegroundColor Cyan
    }
}

Write-Host ""
if ($missingCount -eq 0) {
    Write-Host "STATUS: ALL LINKED SCRIPT ASSETS EXIST AND ARE READY FOR EXECUTION!" -ForegroundColor Green
}
else {
    Write-Host "STATUS: DETECTED $missingCount MISSING SCRIPT ASSETS!" -ForegroundColor Red
}
