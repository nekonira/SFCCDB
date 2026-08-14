$indexPath = "c:\Users\nekon\SFCCdeta\index.html"
$text = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)

$matches = [regex]::Matches($text, '(?i)<script(.*?)>')
Write-Host "Total script tags found: $($matches.Count)"
foreach ($m in $matches) {
    Write-Host "Tag: $($m.Value)"
}

if ($text.Contains('type="text/babel"')) {
    Write-Host "FOUND type='text/babel'" -ForegroundColor Green
} else {
    Write-Host "MISSING type='text/babel' ! THIS IS WHY BABEL DOES NOT TRANSPILE JSX AND APP CANNOT LAUNCH!" -ForegroundColor Red
}
