$path = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"

try {
    $text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    
    # Try basic regex checks or count braces
    $openBraces = ([regex]::Matches($text, '\{')).Count
    $closeBraces = ([regex]::Matches($text, '\}')).Count
    $openBracket = ([regex]::Matches($text, '\[')).Count
    $closeBracket = ([regex]::Matches($text, '\]')).Count
    
    Write-Host "Open braces: $openBraces, Close braces: $closeBraces"
    Write-Host "Open bracket: $openBracket, Close bracket: $closeBracket"
    
    if ($openBraces -ne $closeBraces) {
        Write-Host "ERROR: Mismatched curly braces { } !" -ForegroundColor Red
    }
    if ($openBracket -ne $closeBracket) {
        Write-Host "ERROR: Mismatched square brackets [ ] !" -ForegroundColor Red
    }
    
    # Check quotes balance
    $singleQuotes = ([regex]::Matches($text, "'")).Count
    Write-Host "Single quotes count: $singleQuotes"
    if ($singleQuotes % 2 -ne 0) {
        Write-Host "ERROR: Odd number of single quotes (Unterminated string literal) !" -ForegroundColor Red
    }
} catch {
    Write-Host "Error reading file: $_"
}
