$indexPath = "c:\Users\nekon\SFCCdeta\index.html"
$mockDataPath = "c:\Users\nekon\SFCCdeta\src\data\mockData.js"

$utf8 = New-Object System.Text.UTF8Encoding($false)

$mockJsCode = [System.IO.File]::ReadAllText($mockDataPath, [System.Text.Encoding]::UTF8)
$indexHtml = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)

# Remove script tag of mockData.js
$cleanHtml = $indexHtml -replace '<script src=["'']\./src/data/mockData\.js.*?["'']></script>', ''

# Insert mockData inside <script type="text/babel"> at top
$inlineMockBlock = @"
  <!-- Inline Full Mock Database -->
  <script>
$mockJsCode
  </script>
"@

$finalHtml = $cleanHtml -replace '<!-- 6\. Inline React App Bundle for Guaranteed Local Execution -->', "$inlineMockBlock`n  <!-- 6. Inline React App Bundle for Guaranteed Local Execution -->"

[System.IO.File]::WriteAllText($indexPath, $finalHtml, $utf8)
Write-Host "Successfully embedded mockData.js INLINE into index.html!"
