$indexPath = "c:\Users\nekon\SFCCdeta\index.html"
$dataDir = "c:\Users\nekon\SFCCdeta\src\data"
$utf8 = New-Object System.Text.UTF8Encoding($false)

# Get all Image.js files in src/data
$imageFiles = Get-ChildItem -Path $dataDir -Filter "*Image.js" | Sort-Object Name
$imageScriptTags = ($imageFiles | ForEach-Object { "  <script src=""./src/data/$($_.Name)""></script>" }) -join "`n"

$html = @"
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>サカつく2026 データベース & チームビルダー</title>
  
  <script></script>

  <!-- Local Libraries -->
  <script src="./src/lib/react.min.js"></script>
  <script src="./src/lib/react-dom.min.js"></script>
  <script src="./src/lib/babel.min.js"></script>
  <script src="./src/lib/tailwind.js"></script>

  <style>
    body { background-color: #070a10; color: #f1f5f9; font-family: system-ui, -apple-system, sans-serif; }
    .glass-panel { background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
    .glass-card { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px); }
  </style>
</head>
<body class="bg-[#070a10] text-slate-100 min-h-screen">
  <div id="root"></div>

  <!-- 1. Player Photos ($($imageFiles.Count) Image Files) -->
$imageScriptTags

  <!-- 2. Full Player Database -->
  <script src="./src/data/mockData.js"></script>

  <!-- 3. React Application Script -->
  <script type="text/babel" data-presets="react" src="./src/app.jsx"></script>
  <script type="text/babel" data-presets="react" src="./src/main.jsx"></script>
</body>
</html>
"@

[System.IO.File]::WriteAllText($indexPath, $html, $utf8)
Write-Host "Successfully rebuilt index.html with $($imageFiles.Count) image scripts, mockData.js, and app.jsx!"
