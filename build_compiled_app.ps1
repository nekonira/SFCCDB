$appJsxPath = "c:\Users\nekon\SFCCdeta\src\app.jsx"
$appJsPath = "c:\Users\nekon\SFCCdeta\src\app.js"
$utf8 = New-Object System.Text.UTF8Encoding($false)

$jsx = [System.IO.File]::ReadAllText($appJsxPath, [System.Text.Encoding]::UTF8)

# Convert JSX tags to React.createElement to eliminate in-browser Babel transpile dependency!
# We use Node/Babel or string replacement for clean React.createElement calls

Write-Host "Reading app.jsx for compilation..."
