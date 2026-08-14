$indexPath = "c:\Users\nekon\SFCCdeta\index.html"
$utf8 = New-Object System.Text.UTF8Encoding($false)
$text = [System.IO.File]::ReadAllText($indexPath, $utf8)

Write-Host "--- Deep Static Analysis of index.html ---"
Write-Host "Total File Size: $($text.Length) bytes"

# 1. Garbled Characters Check
$garbledMatches = [regex]::Matches($text, "[繧笘繝竇]")
Write-Host "Garbled / Replacement characters count: $($garbledMatches.Count)"
if ($garbledMatches.Count -gt 0) {
    Write-Host "WARNING: Found $($garbledMatches.Count) garbled or replacement characters!" -ForegroundColor Red
}

# 2. Extract <script type="text/babel">
$m = [regex]::Match($text, '(?ms)<script type="text/babel">(.*?)</script>')
if (-not $m.Success) {
    Write-Host "CRITICAL ERROR: No <script type='text/babel'> found in index.html!" -ForegroundColor Red
    exit 1
}

$babelCode = $m.Groups[1].Value
Write-Host "Babel block size: $($babelCode.Length) characters"

# 3. Check for invalid JSX attributes or JS syntax issues
$lines = $babelCode.Split("`n")
$lineNum = 0
$errors = 0

foreach ($line in $lines) {
    $lineNum++
    
    # Check for class= instead of className=
    if ($line -match '\bclass=') {
        Write-Host "Line ${lineNum} - Found 'class=' instead of 'className='!" -ForegroundColor Yellow
        Write-Host "   Snippet: $($line.Trim())"
    }

    # Check for duplicate variable declarations like const App =
    if ($line -match '^\s*(const|let|var)\s+App\s*=') {
        Write-Host "Line ${lineNum} - App declaration -> $($line.Trim())" -ForegroundColor Green
    }
}

# 4. Check JSX tag balancing
$openDivs = ([regex]::Matches($babelCode, '<div\b')).Count
$closeDivs = ([regex]::Matches($babelCode, '</div>')).Count
Write-Host "JSX <div> tags: <div $openDivs vs </div> $closeDivs"
if ($openDivs -ne $closeDivs) {
    Write-Host "WARNING: Unbalanced <div> tags! <div $openDivs != </div> $closeDivs" -ForegroundColor Red
    $errors++
}

$openSpans = ([regex]::Matches($babelCode, '<span\b')).Count
$closeSpans = ([regex]::Matches($babelCode, '</span>')).Count
Write-Host "JSX <span> tags: <span $openSpans vs </span> $closeSpans"
if ($openSpans -ne $closeSpans) {
    Write-Host "WARNING: Unbalanced <span> tags! <span $openSpans != </span> $closeSpans" -ForegroundColor Red
    $errors++
}

# 5. Check Icon component & external icons
if ($babelCode.Contains("Icon")) {
    Write-Host "Icon component is referenced in Babel block."
    if (-not $babelCode.Contains("function Icon") -and -not $babelCode.Contains("const Icon")) {
        Write-Host "CRITICAL ERROR: 'Icon' component is used but NOT DEFINED in index.html!" -ForegroundColor Red
        $errors++
    }
}

if ($errors -eq 0) {
    Write-Host "NO CRITICAL STATIC ERRORS FOUND IN BABEL SCRIPT!" -ForegroundColor Green
} else {
    Write-Host "TOTAL ERRORS FOUND: $errors" -ForegroundColor Red
}
