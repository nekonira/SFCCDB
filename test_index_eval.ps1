$indexPath = "c:\Users\nekon\SFCCdeta\index.html"
$text = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)

# Count script tags
$scriptCount = ([regex]::Matches($text, '<script')).Count
Write-Host "Total script tags in index.html: $scriptCount"

# Verify INITIAL_PLAYERS presence
if ($text.Contains("window.INITIAL_PLAYERS")) {
    Write-Host "window.INITIAL_PLAYERS is INLINE inside index.html!" -ForegroundColor Green
} else {
    Write-Host "MISSING INITIAL_PLAYERS in index.html" -ForegroundColor Red
}

if ($text.Contains("function App()")) {
    Write-Host "App component is INLINE inside index.html!" -ForegroundColor Green
} else {
    Write-Host "MISSING App component in index.html" -ForegroundColor Red
}
