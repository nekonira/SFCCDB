$appJsxPath = "c:\Users\nekon\SFCCdeta\src\app.jsx"
$mainJsxPath = "c:\Users\nekon\SFCCdeta\src\main.jsx"
$indexPath = "c:\Users\nekon\SFCCdeta\index.html"

$utf8 = New-Object System.Text.UTF8Encoding($false)

$appJsxCode = [System.IO.File]::ReadAllText($appJsxPath, [System.Text.Encoding]::UTF8)
$mainJsxCode = [System.IO.File]::ReadAllText($mainJsxPath, [System.Text.Encoding]::UTF8)
$indexHtml = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)

# Replace script tags at the bottom with inline <script type="text/babel">
$inlineBlock = @"
  <!-- 6. Inline React App Bundle for Guaranteed Local Execution -->
  <script type="text/babel">
$appJsxCode

$mainJsxCode
  </script>
</body>
"@

$newHtml = [regex]::Replace($indexHtml, '<!-- 6\. React Components & Entrypoint -->.*</body>', $inlineBlock, [System.Text.RegularExpressions.RegexOptions]::Singleline)

[System.IO.File]::WriteAllText($indexPath, $newHtml, $utf8)
Write-Host "Successfully converted app.jsx into Inline Babel Script inside index.html!"
