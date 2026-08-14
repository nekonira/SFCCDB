$path = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"
$utf8 = New-Object System.Text.UTF8Encoding($false)
$lines = [System.IO.File]::ReadAllLines($path, $utf8)

Write-Host "Line 1830 raw bytes:"
$line1830 = $lines[1829]
Write-Host "Line 1830 text: '$line1830'"
