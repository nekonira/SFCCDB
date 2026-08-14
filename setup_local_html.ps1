$indexPath = "c:\Users\nekon\SFCCdeta\index.html"
$utf8 = New-Object System.Text.UTF8Encoding($false)

$localHtml = @"
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>サカつく2026 データベース & チームビルダー</title>
  
  <script>
    try { localStorage.clear(); } catch(e) {}
  </script>

  <!-- Local & Offline Robust Libraries (Zero CDN Dependency) -->
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

  <!-- Data Database -->
  <script src="./src/data/mockData.js?v=$(Get-Date -Format 'yyyyMMddHHmmss')"></script>

  <!-- React Application -->
  <script type="text/babel" src="./src/app.jsx?v=$(Get-Date -Format 'yyyyMMddHHmmss')"></script>
  <script type="text/babel" src="./src/main.jsx?v=$(Get-Date -Format 'yyyyMMddHHmmss')"></script>
</body>
</html>
"@

[System.IO.File]::WriteAllText($indexPath, $localHtml, $utf8)
Write-Host "Index.html updated with automatic LocalStorage self-clearing logic!"
